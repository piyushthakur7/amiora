const fs = require('fs');
const Unrar = require('unrar-js');

try {
    const filePath = 'product 1_45.rar';
    console.log("Reading file...");
    const data = fs.readFileSync(filePath);
    const buf = Uint8Array.from(data).buffer;
    console.log("File read.");

    console.log("Unrar typeof:", typeof Unrar);
    console.log("Unrar keys:", Object.keys(Unrar));

} catch (e) {
    console.error("Error:", e);
}
