import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    category: { type: String, required: true, enum: ['Signature', 'Fresh', 'Floral', 'Woody'] },
    image: { type: String, required: true },
    description: { type: String, required: true },
    scent: { type: String, required: true }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;
