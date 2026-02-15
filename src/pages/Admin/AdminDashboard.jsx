import React, { useState, useRef } from 'react';
import { useProducts } from '../../context/ProductContext';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { Upload, X, ImagePlus } from 'lucide-react';

const AdminDashboard = () => {
    const { products, addProduct, updateProduct, deleteProduct } = useProducts();
    const { logout } = useAuth();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        category: 'Signature',
        image: '',
        description: '',
        scent: ''
    });
    const [editingId, setEditingId] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [useUrl, setUseUrl] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/admin');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file (JPG, PNG, WebP, etc.)');
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            alert('Image must be smaller than 2MB');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
            setNewProduct(prev => ({ ...prev, image: reader.result }));
        };
        reader.readAsDataURL(file);
    };

    const clearImage = () => {
        setImagePreview('');
        setNewProduct(prev => ({ ...prev, image: '' }));
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleEdit = (product) => {
        setEditingId(product._id || product.id);
        setNewProduct({
            name: product.name,
            price: product.price.toString(),
            category: product.category,
            image: product.image,
            description: product.description,
            scent: product.scent
        });
        setImagePreview(product.image);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setNewProduct({
            name: '',
            price: '',
            category: 'Signature',
            image: '',
            description: '',
            scent: ''
        });
        setImagePreview('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newProduct.image) {
            alert('Please upload an image or provide an image URL.');
            return;
        }

        const productData = {
            ...newProduct,
            price: parseFloat(newProduct.price)
        };

        try {
            if (editingId) {
                await updateProduct(editingId, productData);
                alert('Product updated successfully!');
            } else {
                await addProduct(productData);
                alert('Product added successfully!');
            }
            cancelEdit();
        } catch (error) {
            alert(error.message || 'Failed to save product');
        }
    };

    return (
        <div className="min-h-screen bg-primary p-8 pt-24">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-3xl font-serif text-charcoal">Admin Dashboard</h1>
                    <Button onClick={handleLogout} variant="outline">Logout</Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Add/Edit Product Form */}
                    <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-sm h-fit">
                        <h2 className="text-xl font-serif mb-6">
                            {editingId ? 'Edit Product' : 'Add New Product'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm text-text/60 mb-1">Product Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={newProduct.name}
                                    onChange={handleChange}
                                    className="w-full border border-stone-200 p-2 rounded focus:outline-none focus:border-accent"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-text/60 mb-1">Price (₹)</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={newProduct.price}
                                    onChange={handleChange}
                                    className="w-full border border-stone-200 p-2 rounded focus:outline-none focus:border-accent"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-text/60 mb-1">Category</label>
                                <select
                                    name="category"
                                    value={newProduct.category}
                                    onChange={handleChange}
                                    className="w-full border border-stone-200 p-2 rounded focus:outline-none focus:border-accent"
                                >
                                    <option value="Signature">Signature</option>
                                    <option value="Fresh">Fresh</option>
                                    <option value="Floral">Floral</option>
                                    <option value="Woody">Woody</option>
                                </select>
                            </div>

                            {/* Image Section */}
                            <div>
                                <div className="flex items-center justify-between mb-1">
                                    <label className="block text-sm text-text/60">Product Image</label>
                                    <button
                                        type="button"
                                        onClick={() => { setUseUrl(!useUrl); clearImage(); }}
                                        className="text-xs text-accent hover:underline"
                                    >
                                        {useUrl ? 'Upload file instead' : 'Use URL instead'}
                                    </button>
                                </div>

                                {useUrl ? (
                                    <input
                                        type="url"
                                        name="image"
                                        value={newProduct.image}
                                        onChange={(e) => {
                                            handleChange(e);
                                            setImagePreview(e.target.value);
                                        }}
                                        className="w-full border border-stone-200 p-2 rounded focus:outline-none focus:border-accent"
                                        placeholder="https://..."
                                    />
                                ) : (
                                    <>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                        />
                                        {imagePreview ? (
                                            <div className="relative">
                                                <img
                                                    src={imagePreview}
                                                    alt="Preview"
                                                    className="w-full h-40 object-cover rounded border border-stone-200"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={clearImage}
                                                    className="absolute top-2 right-2 bg-white/80 rounded-full p-1 hover:bg-white shadow-sm"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => fileInputRef.current?.click()}
                                                className="w-full h-40 border-2 border-dashed border-stone-300 rounded flex flex-col items-center justify-center text-text/40 hover:border-accent hover:text-accent transition-colors cursor-pointer"
                                            >
                                                <ImagePlus size={32} className="mb-2" />
                                                <span className="text-sm">Click to upload image</span>
                                                <span className="text-xs mt-1">JPG, PNG, WebP (max 2MB)</span>
                                            </button>
                                        )}
                                    </>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm text-text/60 mb-1">Description</label>
                                <textarea
                                    name="description"
                                    value={newProduct.description}
                                    onChange={handleChange}
                                    className="w-full border border-stone-200 p-2 rounded focus:outline-none focus:border-accent"
                                    rows="3"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-text/60 mb-1">Scent Notes</label>
                                <input
                                    type="text"
                                    name="scent"
                                    value={newProduct.scent}
                                    onChange={handleChange}
                                    className="w-full border border-stone-200 p-2 rounded focus:outline-none focus:border-accent"
                                    placeholder="e.g. Vanilla, Oak"
                                    required
                                />
                            </div>

                            <div className="flex gap-4">
                                <Button type="submit" className="flex-grow">
                                    {editingId ? 'Update Product' : 'Add Product'}
                                </Button>
                                {editingId && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={cancelEdit}
                                        className="w-fit"
                                    >
                                        Cancel
                                    </Button>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* Product List */}
                    <div className="lg:col-span-2">
                        <h2 className="text-xl font-serif mb-6">Current Products</h2>
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-stone-50 border-b border-stone-200">
                                    <tr>
                                        <th className="p-4 text-sm font-medium text-text/60">Image</th>
                                        <th className="p-4 text-sm font-medium text-text/60">Name</th>
                                        <th className="p-4 text-sm font-medium text-text/60">Price</th>
                                        <th className="p-4 text-sm font-medium text-text/60">Category</th>
                                        <th className="p-4 text-sm font-medium text-text/60">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (
                                        <tr key={product._id || product.id} className="border-b border-stone-100 last:border-0 hover:bg-stone-50">
                                            <td className="p-4">
                                                <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded" />
                                            </td>
                                            <td className="p-4 font-medium">{product.name}</td>
                                            <td className="p-4">₹{product.price}</td>
                                            <td className="p-4 text-sm text-text/60">{product.category}</td>
                                            <td className="p-4">
                                                <div className="flex gap-3">
                                                    <button
                                                        onClick={() => handleEdit(product)}
                                                        className="text-accent hover:text-accent/80 text-sm"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => deleteProduct(product._id || product.id)}
                                                        className="text-red-500 hover:text-red-700 text-sm"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
