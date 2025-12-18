import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ES module equivalents for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Configure Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadImages = async () => {
    try {
        console.log('📤 Starting image upload to Cloudinary...');
        
        // Path to client assets
        const assetsPath = path.join(__dirname, '../client/src/assets');
        
        // Get all product images (p_img*.png)
        const files = fs.readdirSync(assetsPath)
            .filter(file => file.startsWith('p_img') && file.endsWith('.png'))
            .sort((a, b) => {
                // Sort by number: p_img1, p_img2, etc.
                const numA = parseInt(a.match(/\d+/)[0]);
                const numB = parseInt(b.match(/\d+/)[0]);
                return numA - numB;
            });

        console.log(`Found ${files.length} product images`);

        const uploadedUrls = {};

        // Upload first 20 images (for sample products)
        for (let i = 0; i < Math.min(20, files.length); i++) {
            const file = files[i];
            const filePath = path.join(assetsPath, file);
            
            console.log(`Uploading ${file}...`);
            
            const result = await cloudinary.v2.uploader.upload(filePath, {
                folder: 'ecommerce-products',
                public_id: file.replace('.png', ''),
                overwrite: true
            });
            
            uploadedUrls[file] = result.secure_url;
            console.log(`✅ Uploaded: ${file} -> ${result.secure_url}`);
        }

        // Save URLs to a JSON file
        const outputPath = path.join(__dirname, 'uploadedImageUrls.json');
        fs.writeFileSync(outputPath, JSON.stringify(uploadedUrls, null, 2));
        
        console.log('\n🎉 Upload completed!');
        console.log(`📄 URLs saved to: ${outputPath}`);
        console.log(`\nSample URLs:`);
        Object.entries(uploadedUrls).slice(0, 3).forEach(([name, url]) => {
            console.log(`  ${name}: ${url}`);
        });

    } catch (error) {
        console.error('❌ Error uploading images:', error);
    }
};

uploadImages();
