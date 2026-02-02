/**
 * Razorpay Payment Integration
 * 
 * Architecture:
 * - Frontend (this file): UI only - collects data, opens Razorpay popup
 * - WordPress Backend: Creates WC orders, creates Razorpay orders, verifies webhooks
 * - Razorpay: Handles actual payment processing
 * 
 * IMPORTANT: Payment success is ONLY confirmed via webhooks on the backend.
 * The frontend callback is for UX only (redirect to thank-you page).
 */

// Types
export interface CustomerDetails {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
}

export interface CartLineItem {
    product_id: number;
    quantity: number;
    name?: string;
    price?: number;
}

export interface CreateOrderResponse {
    success: boolean;
    wc_order_id: number;
    razorpay_order_id: string;
    amount: number; // in paise (INR smallest unit)
    currency: string;
    key_id: string; // Razorpay Key ID (public, safe to expose)
    error?: string;
}

export interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    order_id: string;
    prefill: {
        name: string;
        email: string;
        contact: string;
    };
    notes: {
        wc_order_id: string;
    };
    theme: {
        color: string;
    };
    handler: (response: RazorpaySuccessResponse) => void;
    modal?: {
        ondismiss?: () => void;
    };
}

export interface RazorpaySuccessResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
}

// Extend Window for Razorpay
declare global {
    interface Window {
        Razorpay: new (options: RazorpayOptions) => {
            open: () => void;
            on: (event: string, callback: () => void) => void;
        };
    }
}

// Config
const WP_API_BASE = import.meta.env.VITE_WC_URL || "";

/**
 * Step 1: Call WordPress backend to create WooCommerce order + Razorpay order
 * 
 * This endpoint should:
 * 1. Create a WooCommerce order with status 'pending'
 * 2. Call Razorpay Orders API to create a Razorpay order
 * 3. Save razorpay_order_id in WC order meta
 * 4. Return Razorpay order details to frontend
 */
export async function createPaymentOrder(
    lineItems: CartLineItem[],
    customer: CustomerDetails,
    total: number
): Promise<CreateOrderResponse> {
    const endpoint = `${WP_API_BASE}/wp-json/amiora/v1/create-order`;

    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            line_items: lineItems,
            billing: {
                first_name: customer.firstName,
                last_name: customer.lastName,
                email: customer.email,
                phone: customer.phone,
                address_1: customer.address,
                city: customer.city,
                state: customer.state,
                postcode: customer.pincode,
                country: "IN",
            },
            shipping: {
                first_name: customer.firstName,
                last_name: customer.lastName,
                address_1: customer.address,
                city: customer.city,
                state: customer.state,
                postcode: customer.pincode,
                country: "IN",
            },
            total: total,
        }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Server error: ${response.status}`);
    }

    const data: CreateOrderResponse = await response.json();

    if (!data.success) {
        throw new Error(data.error || "Failed to create order");
    }

    return data;
}

/**
 * Step 2: Load Razorpay Checkout.js script dynamically
 */
export function loadRazorpayScript(): Promise<boolean> {
    return new Promise((resolve) => {
        // Check if already loaded
        if (window.Razorpay) {
            resolve(true);
            return;
        }

        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
}

/**
 * Step 3: Open Razorpay Checkout popup
 * 
 * IMPORTANT: The handler callback is for UX only (e.g., redirect to thank-you).
 * Actual payment verification happens via webhook on the backend.
 * Do NOT mark order as paid here.
 */
export function openRazorpayCheckout(
    orderData: CreateOrderResponse,
    customer: CustomerDetails,
    onSuccess: (response: RazorpaySuccessResponse) => void,
    onDismiss?: () => void
): void {
    if (!window.Razorpay) {
        throw new Error("Razorpay SDK not loaded");
    }

    const options: RazorpayOptions = {
        key: orderData.key_id,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Amiora Diamonds",
        description: `Order #${orderData.wc_order_id}`,
        order_id: orderData.razorpay_order_id,
        prefill: {
            name: `${customer.firstName} ${customer.lastName}`,
            email: customer.email,
            contact: customer.phone,
        },
        notes: {
            wc_order_id: String(orderData.wc_order_id),
        },
        theme: {
            color: "#0E2220", // Brand color
        },
        handler: onSuccess,
        modal: {
            ondismiss: onDismiss,
        },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
}

/**
 * Complete payment flow orchestrator
 * 
 * Combines all steps:
 * 1. Create order on backend
 * 2. Load Razorpay script
 * 3. Open checkout popup
 */
export async function initiatePayment(
    lineItems: CartLineItem[],
    customer: CustomerDetails,
    total: number,
    callbacks: {
        onSuccess: (response: RazorpaySuccessResponse, wcOrderId: number) => void;
        onDismiss?: () => void;
        onError: (error: Error) => void;
    }
): Promise<void> {
    try {
        // Step 1: Create order on backend
        const orderData = await createPaymentOrder(lineItems, customer, total);

        // Step 2: Load Razorpay script
        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) {
            throw new Error("Failed to load payment gateway. Please try again.");
        }

        // Step 3: Open checkout
        openRazorpayCheckout(
            orderData,
            customer,
            (response) => callbacks.onSuccess(response, orderData.wc_order_id),
            callbacks.onDismiss
        );
    } catch (error) {
        callbacks.onError(error instanceof Error ? error : new Error(String(error)));
    }
}
