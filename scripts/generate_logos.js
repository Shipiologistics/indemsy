
const fs = require('fs');
const path = require('path');

const svgs = {
    'lessentiel.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60">
  <path fill="#FF6600" d="M10 10h180v40H10z" opacity="0"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="28" fill="#FF6600">L'essentiel</text>
</svg>`,
    'virgule.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60">
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="32" fill="#000000">Virgule</text>
  <circle cx="155" cy="20" r="3" fill="#FFD700" />
</svg>`,
    'lequotidien.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60">
    <text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" font-family="Times New Roman, serif" font-weight="bold" font-size="30" fill="#003399">Le Quotidien</text>
    <text x="50%" y="75%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="#666">INDEPENDANT LUXEMBOURGEOIS</text>
</svg>`,
    'paperjam.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60">
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="32" fill="#000000">PAPERJAM</text>
</svg>`,
    'rtl.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60">
  <rect x="50" y="10" width="30" height="40" fill="#E2001A"/>
  <rect x="85" y="10" width="30" height="40" fill="#FABE00"/>
  <rect x="120" y="10" width="30" height="40" fill="#002F6C"/>
  <text x="65" y="38" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="24" fill="white">R</text>
  <text x="100" y="38" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="24" fill="black">T</text>
  <text x="135" y="38" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="24" fill="white">L</text>
</svg>`
};

const mediaDir = path.join('public', 'media');
if (!fs.existsSync(mediaDir)) {
    fs.mkdirSync(mediaDir, { recursive: true });
}

Object.entries(svgs).forEach(([filename, content]) => {
    fs.writeFileSync(path.join(mediaDir, filename), content);
    console.log(`Generated ${filename}`);
});
