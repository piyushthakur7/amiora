import { useEffect, useState } from "react";
import { Link, useSearch } from "wouter";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle2, Package, Mail, XCircle, Loader2 } from "lucide-react";
import { pollOrderStatus, type OrderStatusResponse } from "@/lib/razorpay";

type PaymentState = "verifying" | "confirmed" | "failed" | "timeout";

export default function ThankYou() {
    const searchStr = useSearch();
    const params = new URLSearchParams(searchStr);
    const orderId = params.get("order");
    const paymentId = params.get("payment_id");

    const [paymentState, setPaymentState] = useState<PaymentState>("verifying");
    const [orderStatus, setOrderStatus] = useState<OrderStatusResponse | null>(null);

    // Poll for order status when page loads
    useEffect(() => {
        if (!orderId) return;

        const orderIdNum = parseInt(orderId, 10);
        if (isNaN(orderIdNum)) return;

        const checkStatus = async () => {
            try {
                // Poll for up to 60 seconds (30 attempts, 2 seconds apart)
                const status = await pollOrderStatus(orderIdNum, 30, 2000);

                if (status) {
                    setOrderStatus(status);

                    if (status.is_paid || status.status === "processing" || status.status === "completed") {
                        setPaymentState("confirmed");
                    } else if (status.status === "failed" || status.status === "cancelled") {
                        setPaymentState("failed");
                    } else {
                        // Still pending after timeout
                        setPaymentState("timeout");
                    }
                } else {
                    // Polling timed out
                    setPaymentState("timeout");
                }
            } catch (error) {
                console.error("Error checking order status:", error);
                setPaymentState("timeout");
            }
        };

        checkStatus();
    }, [orderId]);

    // Render different content based on payment state
    const renderStatusIcon = () => {
        switch (paymentState) {
            case "verifying":
                return (
                    <div className="relative">
                        <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center animate-pulse">
                            <Loader2 className="h-10 w-10 text-amber-600 animate-spin" />
                        </div>
                    </div>
                );
            case "confirmed":
                return (
                    <div className="relative">
                        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                            <CheckCircle2 className="h-10 w-10 text-green-600" />
                        </div>
                    </div>
                );
            case "failed":
                return (
                    <div className="relative">
                        <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
                            <XCircle className="h-10 w-10 text-red-600" />
                        </div>
                    </div>
                );
            case "timeout":
                return (
                    <div className="relative">
                        <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center">
                            <Clock className="h-10 w-10 text-amber-600" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center border-2 border-white">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                        </div>
                    </div>
                );
        }
    };

    const renderTitle = () => {
        switch (paymentState) {
            case "verifying":
                return "Verifying Payment...";
            case "confirmed":
                return "Payment Successful!";
            case "failed":
                return "Payment Failed";
            case "timeout":
                return "Order Received";
        }
    };

    const renderMessage = () => {
        switch (paymentState) {
            case "verifying":
                return "Please wait while we confirm your payment with Razorpay. This usually takes a few seconds.";
            case "confirmed":
                return "Your payment has been confirmed! We'll start processing your order right away.";
            case "failed":
                return "Unfortunately, your payment could not be processed. Please try again or contact support.";
            case "timeout":
                return "Your order has been placed. Payment verification is taking longer than expected - you'll receive an email confirmation shortly.";
        }
    };

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 bg-secondary/30">
            <div className="bg-card p-8 md:p-12 rounded-2xl shadow-xl max-w-lg w-full border">

                {/* Status Icon - Dynamic based on payment state */}
                <div className="flex justify-center mb-6">
                    {renderStatusIcon()}
                </div>

                {/* Main Message - Dynamic */}
                <h1 className="text-2xl md:text-3xl font-serif text-primary text-center mb-3">
                    {renderTitle()}
                </h1>

                <p className="text-center text-muted-foreground mb-6">
                    {renderMessage()}
                </p>

                {/* Order Details */}
                {orderId && (
                    <div className="bg-secondary/50 rounded-lg p-4 mb-6">
                        <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-muted-foreground">Order Number</span>
                            <span className="font-mono font-semibold">#{orderId}</span>
                        </div>
                        {paymentId && (
                            <div className="flex items-center justify-between text-sm mb-2">
                                <span className="text-muted-foreground">Payment Reference</span>
                                <span className="font-mono text-xs">{paymentId.slice(0, 20)}...</span>
                            </div>
                        )}
                        {orderStatus && (
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Status</span>
                                <span className={`font-semibold capitalize ${paymentState === "confirmed" ? "text-green-600" :
                                        paymentState === "failed" ? "text-red-600" :
                                            "text-amber-600"
                                    }`}>
                                    {orderStatus.status}
                                </span>
                            </div>
                        )}
                    </div>
                )}

                {/* What Happens Next - Show only for confirmed/timeout */}
                {(paymentState === "confirmed" || paymentState === "timeout") && (
                    <div className="space-y-4 mb-8">
                        <h3 className="font-medium text-sm text-center text-primary">What happens next?</h3>

                        <div className="flex items-start gap-3 text-sm">
                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-xs font-semibold text-primary">1</span>
                            </div>
                            <div>
                                <p className="font-medium">
                                    {paymentState === "confirmed" ? "Payment Confirmed ✓" : "Payment Verification"}
                                </p>
                                <p className="text-muted-foreground text-xs">
                                    {paymentState === "confirmed"
                                        ? "Your payment has been successfully verified."
                                        : "We're confirming your payment with our payment partner. This is automatic."}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 text-sm">
                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Mail className="h-3 w-3 text-primary" />
                            </div>
                            <div>
                                <p className="font-medium">Confirmation Email</p>
                                <p className="text-muted-foreground text-xs">
                                    You'll receive an email once your order is confirmed.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 text-sm">
                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Package className="h-3 w-3 text-primary" />
                            </div>
                            <div>
                                <p className="font-medium">Order Processing</p>
                                <p className="text-muted-foreground text-xs">
                                    Our team will carefully prepare your jewelry for shipping.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Failed state - retry button */}
                {paymentState === "failed" && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
                        <p className="text-xs text-red-800 text-center">
                            <strong>Don't worry!</strong> Your cart items are still saved.
                            Please try the payment again or choose a different payment method.
                        </p>
                    </div>
                )}

                {/* Verifying state - patience note */}
                {paymentState === "verifying" && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
                        <p className="text-xs text-blue-800 text-center">
                            <strong>Please wait...</strong> Do not close this page while we verify your payment.
                        </p>
                    </div>
                )}

                {/* Note about pending - only for timeout */}
                {paymentState === "timeout" && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6">
                        <p className="text-xs text-amber-800 text-center">
                            <strong>Note:</strong> If your payment was successful, confirmation typically arrives within 2-3 minutes.
                            Check your email (including spam folder).
                        </p>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                    {paymentState === "failed" ? (
                        <>
                            <Link href="/checkout">
                                <Button className="w-full bg-primary hover:bg-primary/90 text-white py-5">
                                    Retry Payment
                                </Button>
                            </Link>
                            <Link href="/">
                                <Button variant="outline" className="w-full py-5">
                                    Continue Shopping
                                </Button>
                            </Link>
                        </>
                    ) : paymentState === "verifying" ? (
                        <Button disabled className="w-full bg-primary/50 text-white py-5">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Verifying Payment...
                        </Button>
                    ) : (
                        <>
                            <Link href="/">
                                <Button className="w-full bg-primary hover:bg-primary/90 text-white py-5">
                                    Continue Shopping
                                </Button>
                            </Link>
                            <Link href="/info/track-order">
                                <Button variant="outline" className="w-full py-5">
                                    Track Your Order
                                </Button>
                            </Link>
                        </>
                    )}
                </div>

                {/* Contact Support */}
                <p className="text-xs text-center text-muted-foreground mt-6">
                    Questions? Contact us at{" "}
                    <a href="mailto:support@amiora.com" className="text-primary hover:underline">
                        support@amiora.com
                    </a>
                </p>
            </div>
        </div>
    );
}
