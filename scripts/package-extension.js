#!/usr/bin/env node

/**
 * NEXUS Extension Packaging Script
 *
 * Simple script to create a distributable ZIP file of the extension
 * without any build process - just clean packaging of source files.
 */

const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

// Helper function to copy directories recursively
function copyDirectorySync(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }

    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            copyDirectorySync(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

// Helper function to create ZIP file
function createZipFile(sourceDir, outputPath) {
    return new Promise((resolve, reject) => {
        const output = fs.createWriteStream(outputPath);
        const archive = archiver('zip', { zlib: { level: 9 } });

        output.on('close', () => {
            console.log(`📦 ZIP created: ${archive.pointer()} bytes`);
            resolve();
        });

        archive.on('error', err => {
            reject(err);
        });

        archive.pipe(output);
        archive.directory(sourceDir, false);
        archive.finalize();
    });
}

const PACKAGE_NAME = 'NEXUS-New-Tab';
const VERSION = require('../package.json').version;
const OUTPUT_FILE = `${PACKAGE_NAME}-v${VERSION}.zip`;

// Optimized packaging - only include essential files for production

console.log(`📦 Packaging NEXUS Extension v${VERSION}...`);
console.log(`📁 Including: manifest.json, src/**, essential assets only`);
console.log(`🚫 Excluding: SVG icons, screenshots, development files`);
console.log(`⚡ Optimized: Only PNG icons and required assets included`);
console.log('');

(async () => {
    try {
        // Use Node.js archiver for cross-platform compatibility
        console.log('📦 Using Node.js archiver for packaging');

        // Create temporary directory with only needed files
        const tempDir = 'temp-package';
        if (fs.existsSync(tempDir)) {
            fs.rmSync(tempDir, { recursive: true, force: true });
        }
        fs.mkdirSync(tempDir);

        // Copy files to temp directory (optimized for production)
        const filesToCopy = ['manifest.json', 'src', 'LICENSE', 'README.md'];

        // Copy specific asset files (exclude unnecessary SVGs)
        const assetsToCopy = [
            { src: 'assets/icons/nexus-16.png', dest: 'assets/icons/nexus-16.png' },
            { src: 'assets/icons/nexus-32.png', dest: 'assets/icons/nexus-32.png' },
            { src: 'assets/icons/nexus-48.png', dest: 'assets/icons/nexus-48.png' },
            { src: 'assets/icons/nexus-128.png', dest: 'assets/icons/nexus-128.png' },
            { src: 'assets/icons/favicon.ico', dest: 'assets/icons/favicon.ico' },
            { src: 'assets/fonts', dest: 'assets/fonts' },
            { src: 'assets/search-engines', dest: 'assets/search-engines' }
        ];

        // Copy main files
        filesToCopy.forEach(file => {
            if (fs.existsSync(file)) {
                const stat = fs.statSync(file);
                const targetPath = path.join(tempDir, file);

                if (stat.isDirectory()) {
                    // Copy directory recursively
                    copyDirectorySync(file, targetPath);
                } else {
                    // Copy single file
                    const targetDir = path.dirname(targetPath);
                    if (!fs.existsSync(targetDir)) {
                        fs.mkdirSync(targetDir, { recursive: true });
                    }
                    fs.copyFileSync(file, targetPath);
                }
            }
        });

        // Copy optimized assets (only what's needed)
        assetsToCopy.forEach(asset => {
            if (fs.existsSync(asset.src)) {
                const targetPath = path.join(tempDir, asset.dest);
                const targetDir = path.dirname(targetPath);

                if (!fs.existsSync(targetDir)) {
                    fs.mkdirSync(targetDir, { recursive: true });
                }

                const stat = fs.statSync(asset.src);
                if (stat.isDirectory()) {
                    copyDirectorySync(asset.src, targetPath);
                } else {
                    fs.copyFileSync(asset.src, targetPath);
                }
            }
        });

        // Create ZIP from temp directory
        await createZipFile(tempDir, OUTPUT_FILE);

        // Clean up temp directory
        fs.rmSync(tempDir, { recursive: true, force: true });

        // Check if file was created successfully
        if (fs.existsSync(OUTPUT_FILE)) {
            const stats = fs.statSync(OUTPUT_FILE);
            const fileSizeInMB = (stats.size / (1024 * 1024)).toFixed(2);

            console.log(`✅ Package created successfully!`);
            console.log(`📁 File: ${OUTPUT_FILE}`);
            console.log(`📊 Size: ${fileSizeInMB} MB`);
            console.log(`🚀 Ready for Chrome Web Store or manual installation`);

            // Show installation instructions
            console.log('\n📋 Installation Instructions:');
            console.log('1. Extract the ZIP file to a folder');
            console.log('2. Open Chrome → chrome://extensions/');
            console.log('3. Enable "Developer mode"');
            console.log('4. Click "Load unpacked" → Select the extracted folder');
        } else {
            throw new Error('Package file was not created');
        }
    } catch (error) {
        console.error('❌ Packaging failed:', error.message);
        process.exit(1);
    }
})();
