import mongoose from 'mongoose';

const storeContentSchema = new mongoose.Schema({
    section: {
        type: String,
        required: true,
        unique: true
    },
    title: { type: String },
    subtitle: { type: String },
    description1: { type: String },
    description2: { type: String },
    image: { type: String },
    link: { type: String },
    linkText: { type: String }
}, {
    timestamps: true
});

const StoreContent = mongoose.model('StoreContent', storeContentSchema);

export default StoreContent;
