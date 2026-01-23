const fs = require('fs');
const path = require('path');

const rootDir = __dirname + '/../';
const extensions = ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.scss', '.md', '.html'];
const excludeDirs = ['node_modules', '.next', '.git', 'scripts', 'build', 'dist', '.vscode', '.idea'];

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            if (!excludeDirs.includes(file)) {
                arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
            }
        } else {
            if (extensions.includes(path.extname(file))) {
                arrayOfFiles.push(path.join(dirPath, "/", file));
            }
        }
    });

    return arrayOfFiles;
}

const files = getAllFiles(rootDir);
let count = 0;

files.forEach(file => {
    // Skip package.json and package-lock.json (updates there usually manual or via npm)
    if (file.endsWith('package.json') || file.endsWith('package-lock.json')) return;

    // Skip the script itself if it ends up in the list
    if (file.includes('global_rename.js')) return;

    let content = fs.readFileSync(file, 'utf8');
    let originalContent = content;
    let modified = false;

    // Strategies
    // 1. Literal "Indemsy" -> "FlyCompense"
    if (content.includes('Indemsy')) {
        content = content.replace(/Indemsy/g, 'FlyCompense');
        modified = true;
    }

    // 2. Literal "INDEMSY" -> "FLYCOMPENSE"
    if (content.includes('INDEMSY')) {
        content = content.replace(/INDEMSY/g, 'FLYCOMPENSE');
        modified = true;
    }

    // 3. Literal "indemsy" -> "flycompense"
    // Be careful with common words? "indemsy" is unique enough.
    if (content.includes('indemsy')) {
        // Special case: don't break existing updated emails if any (e.g. contact@flycompense)
        // But here we are replacing 'indemsy', so 'admin@indemsy.lu' -> 'admin@flycompense.lu'
        content = content.replace(/indemsy/g, 'flycompense');
        modified = true;
    }

    if (modified && content !== originalContent) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated: ${file}`);
        count++;
    }
});

console.log(`Total files updated: ${count}`);
