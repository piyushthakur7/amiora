<?php
/**
 * Plugin Name: Amiora Razorpay Integration
 * Description: Custom REST API endpoint for headless WooCommerce + Razorpay payments
 * Version: 1.0.0
 * Author: Amiora Team
 * 
 * INSTALLATION:
 * 1. Create a folder: wp-content/plugins/amiora-razorpay/
 * 2. Save this file as: wp-content/plugins/amiora-razorpay/amiora-razorpay.php
 * 3. Activate the plugin in WordPress Admin > Plugins
 * 4. Add your Razorpay keys to wp-config.php:
 *    define('RAZORPAY_KEY_ID', 'rzp_live_xxxxx');
 *    define('RAZORPAY_KEY_SECRET', 'your_secret_key');
 * 
 * ARCHITECTURE:
 * - This plugin creates a REST API endpoint: /wp-json/amiora/v1/create-order
 * - Frontend calls this endpoint with cart + customer data
 * - This plugin creates WooCommerce order (pending) + Razorpay order
 * - Returns Razorpay order details to frontend
 * - Webhook endpoint verifies payment and updates WC order status
 */

if (!defined('ABSPATH')) {
    exit;
}

// Check if WooCommerce is active
function amiora_check_woocommerce()
{
    if (!class_exists('WooCommerce')) {
        add_action('admin_notices', function () {
            echo '<div class="error"><p>Amiora Razorpay requires WooCommerce to be installed and active.</p></div>';
        });
        return false;
    }
    return true;
}
add_action('plugins_loaded', 'amiora_check_woocommerce');

/**
 * Register REST API Routes
 */
add_action('rest_api_init', function () {
    // Create Order endpoint (called from frontend)
    register_rest_route('amiora/v1', '/create-order', [
        'methods' => 'POST',
        'callback' => 'amiora_create_order',
        'permission_callback' => '__return_true', // Public endpoint
    ]);

    // Razorpay Webhook endpoint
    register_rest_route('amiora/v1', '/razorpay-webhook', [
        'methods' => 'POST',
        'callback' => 'amiora_razorpay_webhook',
        'permission_callback' => '__return_true', // Razorpay needs to access this
    ]);
});

/**
 * Create Order Handler
 * 
 * 1. Creates WooCommerce order with status 'pending'
 * 2. Calls Razorpay API to create a Razorpay order
 * 3. Saves razorpay_order_id in WC order meta
 * 4. Returns order details to frontend
 */
function amiora_create_order(WP_REST_Request $request)
{
    // Get request data
    $params = $request->get_json_params();

    $line_items = $params['line_items'] ?? [];
    $billing = $params['billing'] ?? [];
    $shipping = $params['shipping'] ?? [];
    $total = floatval($params['total'] ?? 0);

    // Validate required fields
    if (empty($line_items)) {
        return new WP_REST_Response([
            'success' => false,
            'error' => 'No items in cart'
        ], 400);
    }

    if (empty($billing['email']) || empty($billing['phone'])) {
        return new WP_REST_Response([
            'success' => false,
            'error' => 'Email and phone are required'
        ], 400);
    }

    try {
        // 1. Create WooCommerce Order
        $order = wc_create_order();

        // Add line items
        foreach ($line_items as $item) {
            $product_id = intval($item['product_id']);
            $quantity = intval($item['quantity']);

            $product = wc_get_product($product_id);
            if ($product) {
                $order->add_product($product, $quantity);
            }
        }

        // Set billing address
        $order->set_billing_first_name(sanitize_text_field($billing['first_name'] ?? ''));
        $order->set_billing_last_name(sanitize_text_field($billing['last_name'] ?? ''));
        $order->set_billing_email(sanitize_email($billing['email'] ?? ''));
        $order->set_billing_phone(sanitize_text_field($billing['phone'] ?? ''));
        $order->set_billing_address_1(sanitize_text_field($billing['address_1'] ?? ''));
        $order->set_billing_city(sanitize_text_field($billing['city'] ?? ''));
        $order->set_billing_state(sanitize_text_field($billing['state'] ?? ''));
        $order->set_billing_postcode(sanitize_text_field($billing['postcode'] ?? ''));
        $order->set_billing_country(sanitize_text_field($billing['country'] ?? 'IN'));

        // Set shipping address
        $order->set_shipping_first_name(sanitize_text_field($shipping['first_name'] ?? $billing['first_name'] ?? ''));
        $order->set_shipping_last_name(sanitize_text_field($shipping['last_name'] ?? $billing['last_name'] ?? ''));
        $order->set_shipping_address_1(sanitize_text_field($shipping['address_1'] ?? $billing['address_1'] ?? ''));
        $order->set_shipping_city(sanitize_text_field($shipping['city'] ?? $billing['city'] ?? ''));
        $order->set_shipping_state(sanitize_text_field($shipping['state'] ?? $billing['state'] ?? ''));
        $order->set_shipping_postcode(sanitize_text_field($shipping['postcode'] ?? $billing['postcode'] ?? ''));
        $order->set_shipping_country(sanitize_text_field($shipping['country'] ?? 'IN'));

        // Calculate totals
        $order->calculate_totals();

        // Set payment method
        $order->set_payment_method('razorpay');
        $order->set_payment_method_title('Razorpay');

        // Set status to pending
        $order->set_status('pending', 'Order created via headless checkout');

        // Save order
        $order->save();

        $wc_order_id = $order->get_id();
        $order_total = $order->get_total();

        // 2. Create Razorpay Order
        $razorpay_key_id = defined('RAZORPAY_KEY_ID') ? RAZORPAY_KEY_ID : '';
        $razorpay_key_secret = defined('RAZORPAY_KEY_SECRET') ? RAZORPAY_KEY_SECRET : '';

        if (empty($razorpay_key_id) || empty($razorpay_key_secret)) {
            throw new Exception('Razorpay API keys not configured');
        }

        // Amount in paise (smallest currency unit)
        $amount_paise = intval($order_total * 100);

        $razorpay_order = amiora_create_razorpay_order([
            'amount' => $amount_paise,
            'currency' => 'INR',
            'receipt' => 'order_' . $wc_order_id,
            'notes' => [
                'wc_order_id' => $wc_order_id,
            ],
        ], $razorpay_key_id, $razorpay_key_secret);

        if (isset($razorpay_order['error'])) {
            throw new Exception($razorpay_order['error']['description'] ?? 'Razorpay order creation failed');
        }

        // 3. Save Razorpay Order ID to WC Order Meta
        $order->update_meta_data('_razorpay_order_id', $razorpay_order['id']);
        $order->save();

        // 4. Return success response
        return new WP_REST_Response([
            'success' => true,
            'wc_order_id' => $wc_order_id,
            'razorpay_order_id' => $razorpay_order['id'],
            'amount' => $amount_paise,
            'currency' => 'INR',
            'key_id' => $razorpay_key_id,
        ], 200);

    } catch (Exception $e) {
        return new WP_REST_Response([
            'success' => false,
            'error' => $e->getMessage()
        ], 500);
    }
}

/**
 * Create Razorpay Order via API
 */
function amiora_create_razorpay_order($data, $key_id, $key_secret)
{
    $url = 'https://api.razorpay.com/v1/orders';

    $response = wp_remote_post($url, [
        'headers' => [
            'Authorization' => 'Basic ' . base64_encode($key_id . ':' . $key_secret),
            'Content-Type' => 'application/json',
        ],
        'body' => json_encode($data),
        'timeout' => 30,
    ]);

    if (is_wp_error($response)) {
        return ['error' => ['description' => $response->get_error_message()]];
    }

    return json_decode(wp_remote_retrieve_body($response), true);
}

/**
 * Razorpay Webhook Handler
 * 
 * IMPORTANT: This is the ONLY trusted source for payment verification.
 * Do NOT trust frontend callbacks.
 */
function amiora_razorpay_webhook(WP_REST_Request $request)
{
    $body = $request->get_body();
    $signature = $request->get_header('X-Razorpay-Signature');

    $razorpay_key_secret = defined('RAZORPAY_KEY_SECRET') ? RAZORPAY_KEY_SECRET : '';

    if (empty($razorpay_key_secret)) {
        error_log('Amiora Razorpay: Webhook received but secret not configured');
        return new WP_REST_Response(['status' => 'error'], 500);
    }

    // Verify webhook signature
    $expected_signature = hash_hmac('sha256', $body, $razorpay_key_secret);

    if (!hash_equals($expected_signature, $signature ?? '')) {
        error_log('Amiora Razorpay: Invalid webhook signature');
        return new WP_REST_Response(['status' => 'invalid signature'], 400);
    }

    $payload = json_decode($body, true);
    $event = $payload['event'] ?? '';

    // Handle payment.captured event
    if ($event === 'payment.captured') {
        $payment = $payload['payload']['payment']['entity'] ?? [];
        $razorpay_order_id = $payment['order_id'] ?? '';
        $razorpay_payment_id = $payment['id'] ?? '';
        $amount_paise = $payment['amount'] ?? 0;
        $currency = $payment['currency'] ?? '';

        if (empty($razorpay_order_id)) {
            error_log('Amiora Razorpay: Webhook missing order_id');
            return new WP_REST_Response(['status' => 'missing order_id'], 400);
        }

        // Find WooCommerce order by Razorpay order ID
        $orders = wc_get_orders([
            'meta_key' => '_razorpay_order_id',
            'meta_value' => $razorpay_order_id,
            'limit' => 1,
        ]);

        if (empty($orders)) {
            error_log('Amiora Razorpay: No WC order found for Razorpay order ' . $razorpay_order_id);
            return new WP_REST_Response(['status' => 'order not found'], 404);
        }

        $order = $orders[0];

        // IDEMPOTENCY CHECK: If order is already paid, return success without re-processing
        // This handles duplicate webhooks gracefully
        if ($order->is_paid()) {
            error_log('Amiora Razorpay: Order #' . $order->get_id() . ' already paid. Ignoring duplicate webhook.');
            return new WP_REST_Response(['status' => 'already processed'], 200);
        }

        // CURRENCY CHECK: Ensure payment is in INR
        if (strtoupper($currency) !== 'INR') {
            error_log('Amiora Razorpay: Currency mismatch. Expected INR, Got: ' . $currency);
            $order->add_order_note('Payment currency mismatch! Expected INR, Received ' . $currency);
            return new WP_REST_Response(['status' => 'currency mismatch'], 400);
        }

        // AMOUNT CHECK: Verify amount matches order total
        $expected_amount = intval($order->get_total() * 100);
        if ($amount_paise !== $expected_amount) {
            error_log('Amiora Razorpay: Amount mismatch. Expected: ' . $expected_amount . ', Got: ' . $amount_paise);
            $order->add_order_note('Payment amount mismatch! Expected ₹' . ($expected_amount / 100) . ', Received ₹' . ($amount_paise / 100));
            return new WP_REST_Response(['status' => 'amount mismatch'], 400);
        }

        // All checks passed - mark order as paid
        $order->update_meta_data('_razorpay_payment_id', $razorpay_payment_id);
        $order->payment_complete($razorpay_payment_id);
        $order->add_order_note('Payment completed via Razorpay. Payment ID: ' . $razorpay_payment_id);
        $order->save();

        error_log('Amiora Razorpay: Order #' . $order->get_id() . ' marked as paid');

        return new WP_REST_Response(['status' => 'success'], 200);
    }

    // Handle payment.failed event
    if ($event === 'payment.failed') {
        $payment = $payload['payload']['payment']['entity'] ?? [];
        $razorpay_order_id = $payment['order_id'] ?? '';
        $error_reason = $payment['error_reason'] ?? 'Unknown error';

        if (!empty($razorpay_order_id)) {
            $orders = wc_get_orders([
                'meta_key' => '_razorpay_order_id',
                'meta_value' => $razorpay_order_id,
                'limit' => 1,
            ]);

            if (!empty($orders)) {
                $order = $orders[0];
                $order->add_order_note('Payment failed via Razorpay. Reason: ' . $error_reason);
                $order->set_status('failed');
                $order->save();
            }
        }

        return new WP_REST_Response(['status' => 'noted'], 200);
    }

    // Other events - just acknowledge
    return new WP_REST_Response(['status' => 'ok'], 200);
}

/**
 * Add CORS headers for headless frontend
 */
add_action('rest_api_init', function () {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function ($value) {
        $origin = get_http_origin();

        // Allow your frontend origins (customize these)
        $allowed_origins = [
            'http://localhost:5173',
            'http://localhost:3000',
            'https://your-frontend-domain.com', // Replace with your Vercel domain
        ];

        if (in_array($origin, $allowed_origins) || empty($origin)) {
            header('Access-Control-Allow-Origin: ' . ($origin ?: '*'));
            header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Allow-Headers: Authorization, Content-Type, X-Requested-With');
        }

        return $value;
    });
}, 15);

/**
 * Handle OPTIONS preflight requests
 */
add_action('init', function () {
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
        header('Access-Control-Allow-Headers: Authorization, Content-Type, X-Requested-With');
        header('Access-Control-Max-Age: 86400');
        exit(0);
    }
});
