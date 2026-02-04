const fs = require('fs');
const Unrar = require('unrar-js');

try {
    const filePath = 'product 1_45.rar';
    console.log("Reading file...");
    const data = fs.readFileSync(filePath);
    const buf = Uint8Array.from(data).buffer;
    console.log("File read.");

    // Inspect unrarSync
    console.log("Calling unrarSync...");
    // It might take the buffer directly
    const result = Unrar.unrarSync(buf);

    // Check what result is
    console.log("Result keys:", Object.keys(result || {}));

    // It might return an array of entries?
    if (Array.isArray(result)) {
        console.log("Result is array of length:", result.length);
        if (result.length > 0) {
            console.log("First item:", result[0]);
        }
    } else {
        // Maybe it returns files map?
        // Let's assume it returns { file1: content, file2: content } ? NO that would crash memory.
        // If it returns content, unrarSync is bad for large files.
    }

} catch (e) {
    console.error("Error:", e);
}
