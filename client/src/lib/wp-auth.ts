/**
 * WordPress/WooCommerce Authentication API
 * 
 * IMPORTANT: For this to work, you need to install the "JWT Authentication for WP REST API" 
 * plugin on your WordPress site: https://wordpress.org/plugins/jwt-authentication-for-wp-rest-api/
 * 
 * After installing, add these lines to your wp-config.php:
 * define('JWT_AUTH_SECRET_KEY', 'your-top-secret-key');
 * define('JWT_AUTH_CORS_ENABLE', true);
 * 
 * And add this to your .htaccess:
 * RewriteEngine on
 * RewriteCond %{HTTP:Authorization} ^(.*)
 * RewriteRule ^(.*) - [E=HTTP_AUTHORIZATION:%1]
 */

const WP_URL = import.meta.env.VITE_WC_URL || "https://darkgray-rail-803191.hostingersite.com";

export interface WPUser {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    displayName: string;
}

export interface AuthResponse {
    success: boolean;
    user?: WPUser;
    token?: string;
    error?: string;
}

const AUTH_TOKEN_KEY = "wp_auth_token";
const USER_DATA_KEY = "wp_user_data";

/**
 * Get stored authentication token
 */
export function getStoredToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN_KEY);
}

/**
 * Get stored user data
 */
export function getStoredUser(): WPUser | null {
    const userData = localStorage.getItem(USER_DATA_KEY);
    if (userData) {
        try {
            return JSON.parse(userData);
        } catch {
            return null;
        }
    }
    return null;
}

/**
 * Store authentication data
 */
function storeAuthData(token: string, user: WPUser): void {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
}

/**
 * Clear authentication data
 */
export function clearAuthData(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_DATA_KEY);
}

/**
 * Login with WordPress/WooCommerce
 * Uses JWT Authentication plugin
 */
export async function wpLogin(username: string, password: string): Promise<AuthResponse> {
    try {
        const response = await fetch(`${WP_URL}/wp-json/jwt-auth/v1/token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                error: data.message || "Login failed. Please check your credentials.",
            };
        }

        // JWT plugin returns: token, user_email, user_nicename, user_display_name
        const user: WPUser = {
            id: 0, // Will be fetched separately if needed
            username: data.user_nicename || username,
            email: data.user_email || "",
            firstName: "",
            lastName: "",
            displayName: data.user_display_name || username,
        };

        storeAuthData(data.token, user);

        return {
            success: true,
            user,
            token: data.token,
        };
    } catch (error) {
        console.error("Login error:", error);
        return {
            success: false,
            error: "Network error. Please try again.",
        };
    }
}

/**
 * Register new user with WordPress/WooCommerce
 * Uses WooCommerce Customers API
 */
export async function wpRegister(
    email: string,
    password: string,
    firstName: string,
    lastName: string
): Promise<AuthResponse> {
    const WC_CONSUMER_KEY = import.meta.env.VITE_WC_CONSUMER_KEY || "";
    const WC_CONSUMER_SECRET = import.meta.env.VITE_WC_CONSUMER_SECRET || "";

    try {
        // Create customer via WooCommerce API
        const response = await fetch(`${WP_URL}/wp-json/wc/v3/customers`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${btoa(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`)}`,
            },
            body: JSON.stringify({
                email,
                password,
                first_name: firstName,
                last_name: lastName,
                username: email.split("@")[0], // Use email prefix as username
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                error: data.message || "Registration failed. Please try again.",
            };
        }

        // After successful registration, log the user in
        const loginResult = await wpLogin(email, password);

        if (loginResult.success && loginResult.user) {
            // Update user with full details from registration
            loginResult.user.id = data.id;
            loginResult.user.firstName = firstName;
            loginResult.user.lastName = lastName;
            loginResult.user.email = email;
            loginResult.user.displayName = `${firstName} ${lastName}`.trim();

            // Update stored data
            if (loginResult.token) {
                storeAuthData(loginResult.token, loginResult.user);
            }
        }

        return loginResult;
    } catch (error) {
        console.error("Registration error:", error);
        return {
            success: false,
            error: "Network error. Please try again.",
        };
    }
}

/**
 * Validate stored token
 */
export async function validateToken(): Promise<boolean> {
    const token = getStoredToken();
    if (!token) return false;

    try {
        const response = await fetch(`${WP_URL}/wp-json/jwt-auth/v1/token/validate`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            clearAuthData();
            return false;
        }

        return true;
    } catch {
        return false;
    }
}

/**
 * Get current user profile
 */
export async function getCurrentUser(): Promise<WPUser | null> {
    const token = getStoredToken();
    if (!token) return null;

    try {
        const response = await fetch(`${WP_URL}/wp-json/wp/v2/users/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            return null;
        }

        const data = await response.json();

        return {
            id: data.id,
            username: data.slug,
            email: data.email || "",
            firstName: data.first_name || "",
            lastName: data.last_name || "",
            displayName: data.name || data.slug,
        };
    } catch {
        return null;
    }
}

/**
 * Logout
 */
export function wpLogout(): void {
    clearAuthData();
}

/**
 * Get auth headers for authenticated API requests
 */
export function getAuthHeaders(): Record<string, string> {
    const token = getStoredToken();
    if (token) {
        return {
            Authorization: `Bearer ${token}`,
        };
    }
    return {};
}
