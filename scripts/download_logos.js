
const fs = require('fs');
const https = require('https');
const path = require('path');

const downloadFile = (url, filename) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(path.join('public/media', filename));
        https.get(url, (response) => {
            if (response.statusCode === 200) {
                response.pipe(file);
                file.on('finish', () => {
                    file.close();
                    console.log(`Downloaded ${filename}`);
                    resolve(true);
                });
            } else {
                fs.unlink(path.join('public/media', filename), () => { }); // Delete empty file
                console.log(`Failed to download ${filename} from ${url} (Status: ${response.statusCode})`);
                resolve(false);
            }
        }).on('error', (err) => {
            fs.unlink(path.join('public/media', filename), () => { });
            console.log(`Error downloading ${filename}: ${err.message}`);
            resolve(false);
        });
    });
};

const logos = [
    { name: 'lessentiel.png', urls: ['https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/L%27essentiel_Logo.svg/500px-L%27essentiel_Logo.svg.png'] },
    { name: 'virgule.png', urls: ['https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/4a/01/5e/4a015e57-2c35-a6e5-4f68-5452fc3b927a/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/230x0w.webp'] },
    { name: 'lequotidien.png', urls: ['https://lequotidien.lu/wp-content/uploads/2016/06/logo-lequotidien.png'] },
    { name: 'paperjam.png', urls: ['https://paperjam.lu/img/logo_paperjam.svg', 'https://pbs.twimg.com/profile_images/1542426993132748801/T46Zz2dG_400x400.jpg'] },
    { name: 'rtl.png', urls: ['https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/RTL_L%C3%ABtzebuerg_Logo_2024.svg/320px-RTL_L%C3%ABtzebuerg_Logo_2024.svg.png'] }
];

async function fetchLogos() {
    for (const logo of logos) {
        let success = false;
        for (const url of logo.urls) {
            if (success) break;
            success = await downloadFile(url, logo.name);
        }
    }
}

fetchLogos();
