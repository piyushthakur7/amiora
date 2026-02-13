<?php
/**
 * Plugin Name: Amiora Razorpay + Shiprocket Integration
 * Description: Headless WooCommerce + Razorpay payments + Shiprocket shipping automation
 * Version: 2.0.0
 * Author: Amiora Team
 * 
 * INSTALLATION:
 * 1. Create a folder: wp-content/plugins/amiora-razorpay/
 * 2. Save this file as: wp-content/plugins/amiora-razorpay/amiora-razorpay.php
 * 3. Activate the plugin in WordPress Admin > Plugins
 * 4. Add your API keys to wp-config.php:
 * 
 *    // Razorpay Keys
 *    define('RAZORPAY_KEY_ID', 'rzp_live_SEQPYmvrjRzVAv');
 *    define('RAZORPAY_KEY_SECRET', 'Plf2TMdZhU2K8IcpkJapRO7q');
 * 
 *    // Shiprocket Keys (for automatic shipping)
 *    define('SHIPROCKET_EMAIL', 'tpiyush300@gmail.com');
 *    define('SHIPROCKET_PASSWORD', 'kG4^UXK5lMW@duI6iR*qkIANcY$OExWB');
 * 
 * ARCHITECTURE:
 * - /wp-json/amiora/v1/create-order - Creates WC order + Razorpay order
 * - /wp-json/amiora/v1/razorpay-webhook - Confirms payment, creates Shiprocket shipment
 * - /wp-json/amiora/v1/order-status/{id} - Check order status
 * - /wp-json/amiora/v1/tracking/{id} - Get shipment tracking
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

    // Order Status endpoint (for frontend polling)
    register_rest_route('amiora/v1', '/order-status/(?P<order_id>\d+)', [
        'methods' => 'GET',
        'callback' => 'amiora_get_order_status',
        'permission_callback' => '__return_true', // Public endpoint for order status
        'args' => [
            'order_id' => [
                'required' => true,
                'validate_callback' => function ($param) {
                    return is_numeric($param);
                }
            ]
        ]
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
    $payment_method = $params['payment_method'] ?? 'razorpay'; // Default to razorpay if not set

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
        $order->save(); // Save to ensure totals are updated

        $order_total = $order->get_total();

        // Handle specific payment methods
        // If COD or if Order Total is 0 (Free Order), skip Razorpay
        if ($payment_method === 'cod' || $order_total <= 0) {
            // Cash on Delivery or Free Order
            $order->set_payment_method($order_total <= 0 ? 'free_checkout' : 'cod');
            $order->set_payment_method_title($order_total <= 0 ? 'Free Checkout' : 'Cash on Delivery');

            // Set status to processing (ready to ship)
            $order->set_status('processing', 'Order created via ' . ($order_total <= 0 ? 'Free Checkout' : 'COD'));
            $order->save();

            $wc_order_id = $order->get_id();

            // Return success directly
            return new WP_REST_Response([
                'success' => true,
                'wc_order_id' => $wc_order_id,
                'payment_method' => $order_total <= 0 ? 'free_checkout' : 'cod',
                'status' => 'processing',
                'total' => $order_total
            ], 200);

        } else {
            // Razorpay (Default) for non-zero orders
            $order->set_payment_method('razorpay');
            $order->set_payment_method_title('Razorpay');

            // Set status to pending (waiting for payment)
            $order->set_status('pending', 'Order created via headless checkout');
            $order->save();

            $wc_order_id = $order->get_id();

            // 2. Create Razorpay Order
            $razorpay_key_id = defined('RAZORPAY_KEY_ID') ? RAZORPAY_KEY_ID : '';
            $razorpay_key_secret = defined('RAZORPAY_KEY_SECRET') ? RAZORPAY_KEY_SECRET : '';

            if (empty($razorpay_key_id) || empty($razorpay_key_secret)) {
                throw new Exception('Razorpay API keys not configured');
            }

            // Amount in paise (smallest currency unit)
            $amount_paise = intval($order_total * 100);

            if ($amount_paise <= 0) {
                throw new Exception('Invalid order amount for Razorpay');
            }

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
        }

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

        // 🚀 AUTO-CREATE SHIPROCKET SHIPMENT
        // This happens automatically after payment is confirmed
        if (defined('SHIPROCKET_EMAIL') && defined('SHIPROCKET_PASSWORD')) {
            error_log('Amiora Shiprocket: Creating shipment for order #' . $order->get_id());
            amiora_create_shiprocket_order($order);
        } else {
            error_log('Amiora Shiprocket: Credentials not configured, skipping auto-shipment');
            $order->add_order_note('Shiprocket: Auto-shipment skipped (API credentials not configured)');
        }

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
 * Get Order Status Handler
 * 
 * Used by frontend to poll for payment confirmation.
 * Returns order status so thank-you page can update in real-time.
 */
function amiora_get_order_status(WP_REST_Request $request)
{
    $order_id = intval($request->get_param('order_id'));

    if ($order_id <= 0) {
        return new WP_REST_Response([
            'success' => false,
            'error' => 'Invalid order ID'
        ], 400);
    }

    try {
        $order = wc_get_order($order_id);

        if (!$order) {
            return new WP_REST_Response([
                'success' => false,
                'error' => 'Order not found'
            ], 404);
        }

        $status = $order->get_status();
        $is_paid = $order->is_paid();
        $date_paid = $order->get_date_paid();

        return new WP_REST_Response([
            'success' => true,
            'order_id' => $order_id,
            'status' => $status,
            'is_paid' => $is_paid,
            'payment_method' => $order->get_payment_method(),
            'total' => $order->get_total(),
            'currency' => $order->get_currency(),
            'date_created' => $order->get_date_created() ? $order->get_date_created()->format('c') : null,
            'date_paid' => $date_paid ? $date_paid->format('c') : null,
            'razorpay_payment_id' => $order->get_meta('_razorpay_payment_id'),
        ], 200);

    } catch (Exception $e) {
        return new WP_REST_Response([
            'success' => false,
            'error' => $e->getMessage()
        ], 500);
    }
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

// ============================================================================
// SHIPROCKET INTEGRATION
// ============================================================================

/**
 * Get Shiprocket Auth Token
 * 
 * Tokens are cached in WordPress transients for 24 hours
 */
function amiora_get_shiprocket_token()
{
    // Check cache first
    $cached_token = get_transient('shiprocket_auth_token');
    if ($cached_token) {
        return $cached_token;
    }

    $email = defined('SHIPROCKET_EMAIL') ? SHIPROCKET_EMAIL : '';
    $password = defined('SHIPROCKET_PASSWORD') ? SHIPROCKET_PASSWORD : '';

    if (empty($email) || empty($password)) {
        error_log('Amiora Shiprocket: API credentials not configured');
        return false;
    }

    $response = wp_remote_post('https://apiv2.shiprocket.in/v1/external/auth/login', [
        'headers' => [
            'Content-Type' => 'application/json',
        ],
        'body' => json_encode([
            'email' => $email,
            'password' => $password,
        ]),
        'timeout' => 30,
    ]);

    if (is_wp_error($response)) {
        error_log('Amiora Shiprocket: Auth failed - ' . $response->get_error_message());
        return false;
    }

    $body = json_decode(wp_remote_retrieve_body($response), true);

    if (empty($body['token'])) {
        error_log('Amiora Shiprocket: No token in response');
        return false;
    }

    // Cache token for 23 hours (tokens last 24 hours)
    set_transient('shiprocket_auth_token', $body['token'], 23 * HOUR_IN_SECONDS);

    return $body['token'];
}

/**
 * Create Shiprocket Order after payment is confirmed
 * 
 * @param WC_Order $order WooCommerce order object
 * @return array|false Shiprocket order data or false on failure
 */
function amiora_create_shiprocket_order($order)
{
    $token = amiora_get_shiprocket_token();
    if (!$token) {
        $order->add_order_note('Shiprocket: Could not authenticate. Please create shipment manually.');
        return false;
    }

    // Get order items
    $items = [];
    foreach ($order->get_items() as $item) {
        $product = $item->get_product();
        $items[] = [
            'name' => $item->get_name(),
            'sku' => $product ? $product->get_sku() : 'SKU-' . $item->get_product_id(),
            'units' => $item->get_quantity(),
            'selling_price' => $order->get_item_total($item, false, true),
            'discount' => 0,
            'tax' => $order->get_item_tax($item),
            'hsn' => '7113', // HSN code for jewelry
        ];
    }

    // Prepare shipment data
    $shipping_data = [
        'order_id' => (string) $order->get_id(),
        'order_date' => $order->get_date_created()->format('Y-m-d H:i'),
        'pickup_location' => 'Primary', // Configure in Shiprocket dashboard
        'channel_id' => '', // Optional: your channel ID
        'comment' => 'Amiora Jewelry Order',
        'billing_customer_name' => $order->get_billing_first_name(),
        'billing_last_name' => $order->get_billing_last_name(),
        'billing_address' => $order->get_billing_address_1(),
        'billing_address_2' => $order->get_billing_address_2(),
        'billing_city' => $order->get_billing_city(),
        'billing_pincode' => $order->get_billing_postcode(),
        'billing_state' => $order->get_billing_state(),
        'billing_country' => $order->get_billing_country() ?: 'India',
        'billing_email' => $order->get_billing_email(),
        'billing_phone' => preg_replace('/\D/', '', $order->get_billing_phone()),
        'shipping_is_billing' => true,
        'shipping_customer_name' => $order->get_shipping_first_name() ?: $order->get_billing_first_name(),
        'shipping_last_name' => $order->get_shipping_last_name() ?: $order->get_billing_last_name(),
        'shipping_address' => $order->get_shipping_address_1() ?: $order->get_billing_address_1(),
        'shipping_address_2' => $order->get_shipping_address_2() ?: $order->get_billing_address_2(),
        'shipping_city' => $order->get_shipping_city() ?: $order->get_billing_city(),
        'shipping_pincode' => $order->get_shipping_postcode() ?: $order->get_billing_postcode(),
        'shipping_country' => $order->get_shipping_country() ?: 'India',
        'shipping_state' => $order->get_shipping_state() ?: $order->get_billing_state(),
        'shipping_email' => $order->get_billing_email(),
        'shipping_phone' => preg_replace('/\D/', '', $order->get_billing_phone()),
        'order_items' => $items,
        'payment_method' => 'Prepaid', // Already paid via Razorpay
        'shipping_charges' => 0,
        'giftwrap_charges' => 0,
        'transaction_charges' => 0,
        'total_discount' => $order->get_total_discount(),
        'sub_total' => $order->get_subtotal(),
        'length' => 10, // Default dimensions for jewelry box (cm)
        'breadth' => 10,
        'height' => 5,
        'weight' => 0.1, // Default weight in kg
    ];

    // Create order in Shiprocket
    $response = wp_remote_post('https://apiv2.shiprocket.in/v1/external/orders/create/adhoc', [
        'headers' => [
            'Content-Type' => 'application/json',
            'Authorization' => 'Bearer ' . $token,
        ],
        'body' => json_encode($shipping_data),
        'timeout' => 30,
    ]);

    if (is_wp_error($response)) {
        $order->add_order_note('Shiprocket: Order creation failed - ' . $response->get_error_message());
        error_log('Amiora Shiprocket: Order creation failed - ' . $response->get_error_message());
        return false;
    }

    $body = json_decode(wp_remote_retrieve_body($response), true);

    if (!empty($body['order_id'])) {
        // Save Shiprocket data to order meta
        $order->update_meta_data('_shiprocket_order_id', $body['order_id']);
        $order->update_meta_data('_shiprocket_shipment_id', $body['shipment_id'] ?? '');
        $order->update_meta_data('_shiprocket_status', $body['status'] ?? 'created');
        $order->save();

        $order->add_order_note(sprintf(
            'Shiprocket order created! Order ID: %s, Shipment ID: %s',
            $body['order_id'],
            $body['shipment_id'] ?? 'pending'
        ));

        error_log('Amiora Shiprocket: Order created - ' . $body['order_id']);

        // Optionally auto-assign courier (AWB generation)
        if (!empty($body['shipment_id'])) {
            amiora_assign_shiprocket_courier($order, $body['shipment_id'], $token);
        }

        return $body;
    } else {
        $error_msg = $body['message'] ?? json_encode($body);
        $order->add_order_note('Shiprocket: Order creation failed - ' . $error_msg);
        error_log('Amiora Shiprocket: Order creation failed - ' . $error_msg);
        return false;
    }
}

/**
 * Auto-assign the cheapest courier and generate AWB
 */
function amiora_assign_shiprocket_courier($order, $shipment_id, $token)
{
    // Get available couriers
    $pickup_postcode = '400001'; // Your pickup location pincode - UPDATE THIS
    $delivery_postcode = $order->get_shipping_postcode() ?: $order->get_billing_postcode();
    $weight = 0.1; // kg
    $cod = 0; // Prepaid

    $courier_url = sprintf(
        'https://apiv2.shiprocket.in/v1/external/courier/serviceability/?pickup_postcode=%s&delivery_postcode=%s&weight=%s&cod=%s',
        $pickup_postcode,
        $delivery_postcode,
        $weight,
        $cod
    );

    $response = wp_remote_get($courier_url, [
        'headers' => [
            'Authorization' => 'Bearer ' . $token,
        ],
        'timeout' => 30,
    ]);

    if (is_wp_error($response)) {
        $order->add_order_note('Shiprocket: Could not fetch couriers - ' . $response->get_error_message());
        return false;
    }

    $body = json_decode(wp_remote_retrieve_body($response), true);
    $couriers = $body['data']['available_courier_companies'] ?? [];

    if (empty($couriers)) {
        $order->add_order_note('Shiprocket: No couriers available for this pincode');
        return false;
    }

    // Pick the cheapest courier
    usort($couriers, function ($a, $b) {
        return $a['rate'] <=> $b['rate'];
    });

    $selected_courier = $couriers[0];

    // Assign courier (generate AWB)
    $assign_response = wp_remote_post('https://apiv2.shiprocket.in/v1/external/courier/assign/awb', [
        'headers' => [
            'Content-Type' => 'application/json',
            'Authorization' => 'Bearer ' . $token,
        ],
        'body' => json_encode([
            'shipment_id' => $shipment_id,
            'courier_id' => $selected_courier['courier_company_id'],
        ]),
        'timeout' => 30,
    ]);

    if (is_wp_error($assign_response)) {
        $order->add_order_note('Shiprocket: AWB assignment failed - ' . $assign_response->get_error_message());
        return false;
    }

    $assign_body = json_decode(wp_remote_retrieve_body($assign_response), true);

    if (!empty($assign_body['response']['data']['awb_code'])) {
        $awb = $assign_body['response']['data']['awb_code'];
        $courier_name = $selected_courier['courier_name'];

        $order->update_meta_data('_shiprocket_awb', $awb);
        $order->update_meta_data('_shiprocket_courier', $courier_name);
        $order->save();

        $order->add_order_note(sprintf(
            'Shiprocket AWB Generated! AWB: %s, Courier: %s, Rate: ₹%s',
            $awb,
            $courier_name,
            $selected_courier['rate']
        ));

        error_log('Amiora Shiprocket: AWB assigned - ' . $awb);
        return true;
    } else {
        $order->add_order_note('Shiprocket: AWB generation pending - assign manually in dashboard');
        return false;
    }
}

/**
 * REST API: Get shipment tracking
 */
add_action('rest_api_init', function () {
    register_rest_route('amiora/v1', '/tracking/(?P<order_id>\d+)', [
        'methods' => 'GET',
        'callback' => 'amiora_get_tracking',
        'permission_callback' => '__return_true',
    ]);
});

function amiora_get_tracking(WP_REST_Request $request)
{
    $order_id = intval($request->get_param('order_id'));
    $order = wc_get_order($order_id);

    if (!$order) {
        return new WP_REST_Response(['error' => 'Order not found'], 404);
    }

    $awb = $order->get_meta('_shiprocket_awb');
    $shipment_id = $order->get_meta('_shiprocket_shipment_id');
    $courier = $order->get_meta('_shiprocket_courier');

    if (empty($awb) && empty($shipment_id)) {
        return new WP_REST_Response([
            'success' => true,
            'status' => 'pending',
            'message' => 'Shipment not yet created',
        ], 200);
    }

    // If we have AWB, get tracking from Shiprocket
    if (!empty($awb)) {
        $token = amiora_get_shiprocket_token();
        if ($token) {
            $response = wp_remote_get(
                'https://apiv2.shiprocket.in/v1/external/courier/track/awb/' . $awb,
                [
                    'headers' => ['Authorization' => 'Bearer ' . $token],
                    'timeout' => 30,
                ]
            );

            if (!is_wp_error($response)) {
                $body = json_decode(wp_remote_retrieve_body($response), true);
                $tracking = $body['tracking_data'] ?? [];

                return new WP_REST_Response([
                    'success' => true,
                    'awb' => $awb,
                    'courier' => $courier,
                    'status' => $tracking['shipment_status'] ?? 'In Transit',
                    'tracking_url' => "https://shiprocket.co/tracking/" . $awb,
                    'activities' => $tracking['shipment_track_activities'] ?? [],
                ], 200);
            }
        }
    }

    // Fallback response
    return new WP_REST_Response([
        'success' => true,
        'awb' => $awb,
        'courier' => $courier,
        'status' => 'Processing',
        'tracking_url' => $awb ? "https://shiprocket.co/tracking/" . $awb : null,
    ], 200);
}

