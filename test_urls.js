const https = require('https');

const urls = [
    "https://media.tenor.com/EBV7OT7ACfwAAAAj/u-u-qua-qua-u-quaa.gif",
    "https://media.tenor.com/c4T2Zp6x_lUAAAAi/tkthao219-bubududu.gif",
    "https://tenor.com/view/chibi-cat-mochi-cat-white-cat-mushy-cat-gif-23262675",
    "https://media.tenor.com/swA_gXJz3S8AAAAi/cute-sad.gif",
    "https://media.tenor.com/Z4k_N7_s9eMAAAAi/peach-and-goma-peach-cat.gif",
    "https://media.tenor.com/HnKmsD1vEwcAAAAi/peach-cat.gif"
];

urls.forEach(url => {
    https.get(url, (res) => {
        console.log(`${url}: ${res.statusCode}`);
    }).on('error', (e) => {
        console.error(`${url}: ${e.message}`);
    });
});
