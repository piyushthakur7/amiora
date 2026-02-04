const Seven = require('node-7z');
const { path7za } = require('7zip-bin');

console.log("Using 7za from:", path7za);

const myStream = Seven.list('product 1_45.rar', {
    $bin: path7za,
    $defer: false // start immediately
});

myStream.on('data', function (entry) {
    if (!entry.attributes || !entry.attributes.includes('D')) { // Filter directories if possible, usually checking attribute string like 'D....'
        // entry structure depends on 7z output parsing
        // usually: { file: 'path', ... }
        console.log(JSON.stringify(entry));
    }
});

myStream.on('end', function () {
    console.log("Done");
});

myStream.on('error', (err) => {
    console.error("Error:", err);
});
