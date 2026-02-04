const { execSync } = require('child_process');
const fs = require('fs');

try {
    console.log("Listing files...");
    // Use tar to list files. It works on windows if tar is available (which we confirmed).
    // We assume 'products.rar' exists.
    const output = execSync('tar -tf products.rar').toString();
    const lines = output.split(/[\r\n]+/);

    const products = {};

    lines.forEach(line => {
        line = line.trim();
        if (!line) return;

        // Match pattern: folder/filename (e.g. 20/1.jpg)
        // We handle both slash types
        const parts = line.replace(/\\/g, '/').split('/');

        if (parts.length === 2) {
            const folder = parts[0];
            const file = parts[1];

            // Check if it's an image
            if (file.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
                if (!products[folder]) {
                    products[folder] = [];
                }
                products[folder].push(line); // Store relative path '20/1.jpg'
            }
        }
    });

    console.log(`Found ${Object.keys(products).length} products.`);

    // CSV Header (WooCommerce Standard)
    const header = [
        "Type", "SKU", "Name", "Published", "Is featured?", "Visibility in catalog",
        "Short description", "Description", "Date sale price ends", "Tax status", "Tax class",
        "In stock?", "Stock", "Backorders allowed?", "Sold individually?", "Weight (kg)",
        "Length (cm)", "Width (cm)", "Height (cm)", "Allow customer reviews?", "Purchase note",
        "Sale price", "Regular price", "Categories", "Tags", "Shipping class", "Images",
        "Download limit", "Download expiry days", "Parent", "Grouped products", "Upsells",
        "Cross-sells", "External URL", "Button text", "Position"
    ];

    const rows = [header.join(',')];

    // Sort folders numerically if possible
    const folderKeys = Object.keys(products).sort((a, b) => parseInt(a) - parseInt(b));

    folderKeys.forEach(folder => {
        const images = products[folder].join(', '); // WooCommerce separates images by comma
        const name = `Product ${folder}`;
        const sku = `PROD-${folder.padStart(3, '0')}`;
        const category = `Category ${folder}`; // Placeholder

        // Minimal fields content
        const row = [
            "simple", // Type
            sku, // SKU
            name, // Name
            "1", // Published
            "0", // Is featured?
            "visible", // Visibility
            `Description for ${name}`, // Short desc
            `Full description for ${name}`, // Description
            "", // Date sale price ends
            "taxable", // Tax status
            "", // Tax class
            "1", // In stock?
            "100", // Stock
            "0", // Backorders
            "0", // Sold individually
            "", // Weight
            "", // Length
            "", // Width
            "", // Height
            "1", // Allow reviews
            "", // Purchase note
            "", // Sale price
            "100", // Regular price (Placeholder)
            category, // Categories
            "", // Tags
            "", // Shipping class
            images, // Images (e.g. "20/1.jpg, 20/2.jpg")
            "", // Download limit
            "", // Download expiry
            "", // Parent
            "", // Grouped
            "", // Upsells
            "", // Cross-sells
            "", // External
            "", // Button text
            "0"  // Position
        ];

        // CSV escape logic (simple)
        const escapedRow = row.map(field => {
            const str = String(field);
            if (str.includes(',') || str.includes('"') || str.includes('\n')) {
                return `"${str.replace(/"/g, '""')}"`;
            }
            return str;
        });

        rows.push(escapedRow.join(','));
    });

    fs.writeFileSync('wc_products_import.csv', rows.join('\n'));
    console.log("CSV generated: wc_products_import.csv");

} catch (e) {
    console.error("Error:", e);
}
