/**
 * WooCommerce API Connection Test Script
 * 
 * Run with: node test-api.cjs
 * 
 * This script tests all critical API endpoints needed for the Amiora frontend.
 */

const https = require('https');

// Configuration - Update these if needed
const CONFIG = {
    WC_URL: 'https://darkgray-rail-803191.hostingersite.com',
    CONSUMER_KEY: 'ck_c0c1ee75433be353855c13e87a825cdaa3c7ce0d',
    CONSUMER_SECRET: 'cs_70b4400d3519791db3f220c1c183e5966474c8f2'
};

// Helper to make API requests
function makeRequest(endpoint, method = 'GET') {
    return new Promise((resolve, reject) => {
        const url = new URL(endpoint, CONFIG.WC_URL);

        // Add auth for WC endpoints
        if (endpoint.includes('/wc/v3/')) {
            url.searchParams.set('consumer_key', CONFIG.CONSUMER_KEY);
            url.searchParams.set('consumer_secret', CONFIG.CONSUMER_SECRET);
        }

        const options = {
            hostname: url.hostname,
            path: url.pathname + url.search,
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Amiora-API-Test/1.0'
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                resolve({
                    status: res.statusCode,
                    statusMessage: res.statusMessage,
                    headers: res.headers,
                    data: data
                });
            });
        });

        req.on('error', (e) => reject(e));
        req.end();
    });
}

// Test functions
async function testProducts() {
    console.log('\n📦 Testing: GET /wp-json/wc/v3/products');
    try {
        const res = await makeRequest('/wp-json/wc/v3/products?per_page=5');
        if (res.status === 200) {
            const products = JSON.parse(res.data);
            console.log(`   ✅ SUCCESS - Found ${products.length} products`);
            if (products.length > 0) {
                console.log(`   📝 Sample: "${products[0].name}" - ${products[0].price}`);
            }
            return true;
        } else {
            console.log(`   ❌ FAILED - Status ${res.status}: ${res.statusMessage}`);
            console.log(`   📝 Response: ${res.data.substring(0, 200)}`);
            return false;
        }
    } catch (e) {
        console.log(`   ❌ ERROR: ${e.message}`);
        return false;
    }
}

async function testCategories() {
    console.log('\n📁 Testing: GET /wp-json/wc/v3/products/categories');
    try {
        const res = await makeRequest('/wp-json/wc/v3/products/categories?per_page=50');
        if (res.status === 200) {
            const categories = JSON.parse(res.data);
            console.log(`   ✅ SUCCESS - Found ${categories.length} categories`);

            // Check for expected parent categories
            const parentCats = categories.filter(c => c.parent === 0 && c.slug !== 'uncategorized');
            const expected = ['rings', 'earrings', 'necklaces', 'bracelets', 'bangles', 'pendants', 'mangalsutra', 'nosepins', 'kids', 'mens'];

            console.log(`   📝 Parent categories found: ${parentCats.map(c => c.slug).join(', ')}`);

            const missing = expected.filter(e => !parentCats.some(c => c.slug === e));
            if (missing.length > 0) {
                console.log(`   ⚠️  Missing categories: ${missing.join(', ')}`);
            }
            return true;
        } else {
            console.log(`   ❌ FAILED - Status ${res.status}`);
            return false;
        }
    } catch (e) {
        console.log(`   ❌ ERROR: ${e.message}`);
        return false;
    }
}

async function testJWTAuth() {
    console.log('\n🔐 Testing: JWT Authentication Endpoint');
    try {
        const res = await makeRequest('/wp-json/jwt-auth/v1/token', 'POST');
        // We expect 403 (no credentials) or 200 - both mean endpoint exists
        if (res.status === 403 || res.status === 200 || res.status === 401) {
            console.log(`   ✅ JWT Auth plugin is INSTALLED (got ${res.status})`);
            return true;
        } else if (res.status === 404) {
            console.log(`   ❌ JWT Auth plugin NOT INSTALLED`);
            console.log(`   📝 Install: "JWT Authentication for WP REST API" plugin`);
            return false;
        } else {
            console.log(`   ⚠️  Unexpected status: ${res.status}`);
            return false;
        }
    } catch (e) {
        console.log(`   ❌ ERROR: ${e.message}`);
        return false;
    }
}

async function testAmioraOrderEndpoint() {
    console.log('\n💳 Testing: Amiora Order Creation Endpoint');
    try {
        const res = await makeRequest('/wp-json/amiora/v1/create-order', 'POST');
        // We expect 400 (bad request - no data) or 200 - both mean endpoint exists
        if (res.status === 400 || res.status === 200 || res.status === 401) {
            console.log(`   ✅ Amiora Razorpay plugin is INSTALLED (got ${res.status})`);
            return true;
        } else if (res.status === 404) {
            console.log(`   ❌ Amiora Razorpay plugin NOT INSTALLED`);
            console.log(`   📝 You need to install the custom Razorpay plugin for payments`);
            return false;
        } else {
            console.log(`   ⚠️  Status: ${res.status} - ${res.data.substring(0, 100)}`);
            return false;
        }
    } catch (e) {
        console.log(`   ❌ ERROR: ${e.message}`);
        return false;
    }
}

async function testCORS() {
    console.log('\n🌐 Testing: CORS Headers');
    try {
        const res = await makeRequest('/wp-json/wc/v3/products?per_page=1');
        const corsHeader = res.headers['access-control-allow-origin'];
        if (corsHeader) {
            console.log(`   ✅ CORS enabled: ${corsHeader}`);
            return true;
        } else {
            console.log(`   ⚠️  No CORS headers detected`);
            console.log(`   📝 Frontend may have issues calling API from browser`);
            console.log(`   📝 Add CORS headers in WordPress functions.php`);
            return false;
        }
    } catch (e) {
        console.log(`   ❌ ERROR: ${e.message}`);
        return false;
    }
}

// Main test runner
async function runTests() {
    console.log('═══════════════════════════════════════════════════════════');
    console.log('     🔍 AMIORA - WooCommerce API Connection Test');
    console.log('═══════════════════════════════════════════════════════════');
    console.log(`\n🌐 Testing against: ${CONFIG.WC_URL}`);

    const results = {
        products: await testProducts(),
        categories: await testCategories(),
        jwt: await testJWTAuth(),
        razorpay: await testAmioraOrderEndpoint(),
        cors: await testCORS()
    };

    console.log('\n═══════════════════════════════════════════════════════════');
    console.log('                      📊 SUMMARY');
    console.log('═══════════════════════════════════════════════════════════');

    console.log(`\n   Products API:      ${results.products ? '✅ Working' : '❌ Not Working'}`);
    console.log(`   Categories API:    ${results.categories ? '✅ Working' : '❌ Not Working'}`);
    console.log(`   JWT Auth:          ${results.jwt ? '✅ Installed' : '❌ Not Installed'}`);
    console.log(`   Razorpay Plugin:   ${results.razorpay ? '✅ Installed' : '❌ Not Installed'}`);
    console.log(`   CORS Headers:      ${results.cors ? '✅ Configured' : '⚠️  Check Needed'}`);

    const critical = results.products && results.categories;
    const payment = results.razorpay;
    const auth = results.jwt;

    console.log('\n───────────────────────────────────────────────────────────');

    if (critical && payment && auth) {
        console.log('   🎉 ALL SYSTEMS GO! Your WordPress is fully configured.');
    } else if (critical) {
        console.log('   ✅ Basic e-commerce will work (browsing, cart)');
        if (!payment) console.log('   ⚠️  Payments will NOT work until Razorpay plugin is installed');
        if (!auth) console.log('   ⚠️  User login/registration will NOT work until JWT plugin is installed');
    } else {
        console.log('   ❌ CRITICAL: Products or Categories API not working!');
        console.log('   📝 Check your WooCommerce API keys and permissions');
    }

    console.log('\n═══════════════════════════════════════════════════════════\n');
}

// Run
runTests();
