import dotenv from 'dotenv';
dotenv.config();

const storageConfig = {
    type: process.env.STORAGE_TYPE || 'local',
    local: {
        uploadDir: 'uploads',
        publicPath: '/uploads'
    },
    // Placeholder for future cloud storage
    cloudinary: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET
    }
};

export default storageConfig;
