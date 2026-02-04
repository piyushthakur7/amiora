const fs = require('fs');
const Unrar = require('unrar-js');

try {
    const filePath = 'product 1_45.rar';
    console.log("Reading file...");
    // Read file synchronously (might be heavy)
    const data = fs.readFileSync(filePath);
    const buf = Uint8Array.from(data).buffer;
    console.log("File read. Creating extractor...");

    // Unrar-js usage might vary by version. 
    // This is a common pattern for 'unrar-js' from npm (which is often the wasm one or pure js)
    // If it's the 'node-unrar-js', usage is different. 
    // Let's assume 'unrar-js' creates a global or default export.

    // Check if Unrar has createExtractorFromData
    const extractor = Unrar.createExtractorFromData(buf);

    console.log("Extractor created. Getting file list...");
    const list = extractor.getFileList();

    const plainList = [];
    for (const header of list.fileHeaders) {
        if (!header.flags.directory) {
            plainList.push(header.name);
        }
    }

    console.log(JSON.stringify(plainList));

} catch (e) {
    console.error("Error:", e);
}
