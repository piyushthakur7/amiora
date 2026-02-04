<?php
/**
 * Plugin Name: Amiora JWT Auth Helper
 * Description: Enables JWT Authentication for headless WooCommerce frontend
 * Version: 1.0.0
 * Author: Amiora Team
 * 
 * INSTALLATION:
 * 1. First, install the "JWT Authentication for WP REST API" plugin from WordPress.org
 * 2. Create folder: wp-content/plugins/amiora-jwt-helper/
 * 3. Save this file as: wp-content/plugins/amiora-jwt-helper/amiora-jwt-helper.php
 * 4. Activate both plugins in WordPress Admin > Plugins
 * 
 * REQUIRED wp-config.php additions:
 * define('JWT_AUTH_SECRET_KEY', 'your-top-secret-key-here-make-it-long-and-random');
 * define('JWT_AUTH_CORS_ENABLE', true);
 * 
 * REQUIRED .htaccess additions (for Apache):
 * RewriteEngine on
 * RewriteCond %{HTTP:Authorization} ^(.*)
 * RewriteRule ^(.*) - [E=HTTP_AUTHORIZATION:%1]
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Add CORS headers for headless frontend authentication
 */
add_action('rest_api_init', function () {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function ($value) {
        $origin = get_http_origin();

        // Allow your frontend origins (customize these)
        $allowed_origins = [
            'http://localhost:5173',
            'http://localhost:3000',
            'https://your-vercel-domain.vercel.app', // Replace with your Vercel domain
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

/**
 * Allow customer registration via REST API without authentication
 * WooCommerce by default requires OAuth for customer creation
 * This filter allows public registration while still requiring auth for other customer operations
 */
add_filter('woocommerce_rest_check_permissions', function ($permission, $context, $object_id, $post_type) {
    // Allow creating customers without authentication
    if ($post_type === 'customer' && $context === 'create') {
        return true;
    }
    return $permission;
}, 10, 4);

/**
 * Extend JWT token data with user info
 */
add_filter('jwt_auth_token_before_dispatch', function ($data, $user) {
    // Add additional user data to the token response
    $data['user_id'] = $user->ID;
    $data['user_roles'] = $user->roles;
    $data['first_name'] = get_user_meta($user->ID, 'first_name', true);
    $data['last_name'] = get_user_meta($user->ID, 'last_name', true);

    return $data;
}, 10, 2);

/**
 * Allow email as username for login
 */
add_filter('jwt_auth_username_jwt_login', function ($username) {
    // Check if the username is an email
    if (is_email($username)) {
        $user = get_user_by('email', $username);
        if ($user) {
            return $user->user_login;
        }
    }
    return $username;
});
