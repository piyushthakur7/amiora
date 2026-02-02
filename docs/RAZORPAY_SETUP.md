# Razorpay Payment Integration Setup Guide

## Architecture Overview

```
┌─────────────────┐     ┌─────────────────────┐     ┌─────────────┐
│   Frontend      │     │   WordPress/WC      │     │  Razorpay   │
│   (Vite/React)  │────▶│   Backend           │────▶│  API        │
│                 │     │                     │     │             │
│   • Checkout UI │     │   • Order Creation  │     │   • Orders  │
│   • Razorpay    │     │   • Razorpay API    │     │   • Payments│
│     Popup       │     │   • Webhook Handler │◀────│   • Webhooks│
└─────────────────┘     └─────────────────────┘     └─────────────┘
```

**Key Principle**: Frontend NEVER decides payment success. Only webhooks from Razorpay → WordPress are trusted.

---

## Setup Steps

### Step 1: Razorpay Account Setup

1. Sign up at [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Complete KYC verification
3. Go to **Settings → API Keys**
4. Generate API keys (you'll get Key ID and Key Secret)
5. **Save both keys securely** - Key Secret is shown only once

### Step 2: Install WordPress Plugin

1. Create folder: `wp-content/plugins/amiora-razorpay/`
2. Copy `docs/amiora-razorpay-plugin.php` to that folder as `amiora-razorpay.php`
3. Add to **wp-config.php** (before "That's all, stop editing!"):

```php
// Razorpay API Keys
define('RAZORPAY_KEY_ID', 'rzp_live_xxxxxxxxxx');     // Your Key ID
define('RAZORPAY_KEY_SECRET', 'xxxxxxxxxxxxxxxx');    // Your Key Secret
```

4. Activate the plugin in **WordPress Admin → Plugins**

### Step 3: Configure Razorpay Webhooks

1. Go to [Razorpay Dashboard → Webhooks](https://dashboard.razorpay.com/app/webhooks)
2. Click **Add New Webhook**
3. Set Webhook URL: `https://your-wordpress-site.com/wp-json/amiora/v1/razorpay-webhook`
4. Select Events:
   - `payment.captured`
   - `payment.failed`
5. Generate Webhook Secret and save it (optional, for extra security)

### Step 4: Update CORS Origins (WordPress Plugin)

In `amiora-razorpay.php`, update the allowed origins:

```php
$allowed_origins = [
    'http://localhost:5173',                    // Local dev
    'https://your-vercel-app.vercel.app',      // Vercel preview
    'https://amiora.com',                       // Production domain
];
```

### Step 5: Frontend Environment

Add to `client/.env`:

```env
VITE_WC_URL=https://your-wordpress-site.com
```

---

## Payment Flow

1. **Customer fills checkout form** (name, address, phone, email)
2. **Click "Pay ₹X"** button
3. **Frontend calls** `/wp-json/amiora/v1/create-order` with cart + customer data
4. **WordPress creates**:
   - WooCommerce order (status: pending)
   - Razorpay order via API
   - Saves `razorpay_order_id` in WC order meta
5. **Frontend receives** Razorpay order details
6. **Razorpay Checkout popup** opens
7. **Customer pays** (UPI/Card/NetBanking)
8. **Razorpay sends webhook** to WordPress
9. **WordPress verifies** signature & amount, marks order as paid
10. **Customer redirected** to Thank You page

---

## Testing

### Test Mode

1. Use Razorpay **Test Mode** keys (start with `rzp_test_`)
2. Test card: `4111 1111 1111 1111` (any future expiry, any CVV)
3. Test UPI: `success@razorpay` for success, `failure@razorpay` for failure

### Local Development

Since webhooks need a public URL, use [ngrok](https://ngrok.com/) for local testing:

```bash
ngrok http 80  # Replace 80 with your WordPress port
```

Then use the ngrok URL as your webhook endpoint.

---

## Security Notes

1. **Never expose** `RAZORPAY_KEY_SECRET` to frontend
2. **Always verify** webhook signatures
3. **Always verify** payment amount matches order total
4. **Frontend callback is for UX only** - never mark order as paid from frontend
5. **Use HTTPS** in production

---

## Troubleshooting

### "Razorpay API keys not configured"
- Check `wp-config.php` has the correct `define()` statements
- Ensure they're placed BEFORE the "stop editing" line

### CORS Errors
- Update `$allowed_origins` in the plugin
- Clear any caching plugins

### Webhook Not Received
- Verify webhook URL is correct
- Check WordPress error logs: `wp-content/debug.log`
- Ensure firewall allows Razorpay IPs

### Order Created But Payment Failed
- Check Razorpay Dashboard for payment status
- Review order notes in WooCommerce admin

---

## Files Reference

| File | Purpose |
|------|---------|
| `client/src/lib/razorpay.ts` | Frontend payment SDK |
| `client/src/pages/Checkout.tsx` | Checkout UI with form |
| `docs/amiora-razorpay-plugin.php` | WordPress plugin (copy to WP) |

---

## Support

- Razorpay Docs: https://razorpay.com/docs/
- WooCommerce REST API: https://woocommerce.github.io/woocommerce-rest-api-docs/
