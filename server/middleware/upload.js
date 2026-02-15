import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

// Configure multer for memory storage
const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|webp/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only JPEG, JPG, PNG and WEBP images are allowed'));
    }
});

import storageConfig from '../config/storage.js';

// Middleware to process and compress image
export const processImage = async (req, res, next) => {
    if (!req.file) return next();

    const fileName = `product-${Date.now()}.webp`;

    try {
        if (storageConfig.type === 'local') {
            const outputPath = path.join(storageConfig.local.uploadDir, fileName);

            await sharp(req.file.buffer)
                .resize(800, 800, {
                    fit: 'inside',
                    withoutEnlargement: true
                })
                .webp({ quality: 80 })
                .toFile(outputPath);

            // Store the public URL in req.file.path
            req.file.filename = fileName;
            req.file.destinationPath = `${storageConfig.local.publicPath}/${fileName}`;
        } else {
            // Future cloud implementation would go here
            console.log('Cloud storage not yet implemented, falling back to local simulation');
            req.file.destinationPath = `https://future-cloud-storage.com/${fileName}`;
        }

        next();
    } catch (error) {
        console.error('Sharp processing error:', error);
        next(error);
    }
};

export default upload;
