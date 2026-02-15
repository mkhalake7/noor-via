import React, { useState, useRef } from 'react';
import { useProducts } from '../../context/ProductContext';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { Upload, X, ImagePlus } from 'lucide-react';
import { productAPI, orderAPI, contentAPI } from '../../services/api';

const AdminDashboard = () => {
    const { products, addProduct, updateProduct, deleteProduct } = useProducts();
    const { logout } = useAuth();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [activeTab, setActiveTab] = useState('products');
    const [orders, setOrders] = useState([]);
    const [ordersLoading, setOrdersLoading] = useState(false);
    const [siteContent, setSiteContent] = useState([]);
    const [contentLoading, setContentLoading] = useState(false);
    const [editingContent, setEditingContent] = useState(null);

    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        category: 'Signature',
        image: '',
        description: '',
        scent: '',
        isFeatured: false
    });
    const [editingId, setEditingId] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [useUrl, setUseUrl] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/admin');
    };

    const fetchOrders = async () => {
        try {
            setOrdersLoading(true);
            const data = await orderAPI.getAll();
            setOrders(data);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        } finally {
            setOrdersLoading(false);
        }
    };

    const fetchContent = async () => {
        try {
            setContentLoading(true);
            const data = await contentAPI.getAll();
            setSiteContent(data);
            // Default select first section for editing if none selected
            if (data.length > 0 && !editingContent) {
                setEditingContent(data[0]);
            }
        } catch (error) {
            console.error('Failed to fetch site content:', error);
        } finally {
            setContentLoading(false);
        }
    };

    React.useEffect(() => {
        if (activeTab === 'orders') {
            fetchOrders();
        } else if (activeTab === 'content') {
            fetchContent();
        }
    }, [activeTab]);

    const handleContentChange = (e) => {
        const { name, value } = e.target;
        setEditingContent(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdateContent = async (e) => {
        e.preventDefault();
        try {
            await contentAPI.updateSection(editingContent.section, editingContent);
            alert('Content updated successfully!');
            fetchContent();
        } catch (error) {
            alert('Failed to update content: ' + error.message);
        }
    };

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            await orderAPI.updateStatus(orderId, newStatus);
            fetchOrders(); // Refresh list
        } catch (error) {
            alert('Failed to update status: ' + error.message);
        }
    };

    const [selectedFile, setSelectedFile] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewProduct(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file (JPG, PNG, WebP, etc.)');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert('Image must be smaller than 5MB');
            return;
        }

        setSelectedFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const clearImage = () => {
        setImagePreview('');
        setSelectedFile(null);
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
            scent: product.scent,
            isFeatured: product.isFeatured || false
        });
        setImagePreview(product.image);
        setSelectedFile(null);
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
            scent: '',
            isFeatured: false
        });
        setImagePreview('');
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let imageUrl = newProduct.image;

        // If a new file was selected, upload it first
        if (selectedFile) {
            try {
                const formData = new FormData();
                formData.append('image', selectedFile);
                const uploadRes = await productAPI.uploadImage(formData);
                imageUrl = uploadRes.url;
            } catch (error) {
                alert('Failed to upload image: ' + error.message);
                return;
            }
        }

        if (!imageUrl) {
            alert('Please upload an image or provide an image URL.');
            return;
        }

        const productData = {
            ...newProduct,
            image: imageUrl,
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
                    <div className="flex gap-4">
                        <div className="bg-stone-100 p-1 rounded-lg flex mr-4">
                            <button
                                onClick={() => setActiveTab('products')}
                                className={`px-4 py-2 rounded-md text-sm transition-all ${activeTab === 'products' ? 'bg-white shadow-sm text-charcoal' : 'text-text/60 hover:text-charcoal'}`}
                            >
                                Products
                            </button>
                            <button
                                onClick={() => setActiveTab('orders')}
                                className={`px-4 py-2 rounded-md text-sm transition-all ${activeTab === 'orders' ? 'bg-white shadow-sm text-charcoal' : 'text-text/60 hover:text-charcoal'}`}
                            >
                                Orders
                            </button>
                            <button
                                onClick={() => setActiveTab('content')}
                                className={`px-4 py-2 rounded-md text-sm transition-all ${activeTab === 'content' ? 'bg-white shadow-sm text-charcoal' : 'text-text/60 hover:text-charcoal'}`}
                            >
                                Site Content
                            </button>
                        </div>
                        <Button onClick={handleLogout} variant="outline">Logout</Button>
                    </div>
                </div>

                {activeTab === 'products' ? (
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
                                                <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                                                    <img
                                                        src={imagePreview}
                                                        alt="Preview"
                                                        className="w-full h-40 object-cover rounded border border-stone-200 group-hover:opacity-75 transition-opacity"
                                                    />
                                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <div className="bg-white/90 rounded-full p-2 shadow-sm text-accent">
                                                            <Upload size={20} />
                                                        </div>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={(e) => { e.stopPropagation(); clearImage(); }}
                                                        className="absolute top-2 right-2 bg-white/80 rounded-full p-1 hover:bg-white shadow-sm z-10"
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

                                <div className="flex items-center space-x-2 py-2">
                                    <input
                                        type="checkbox"
                                        id="isFeatured"
                                        name="isFeatured"
                                        checked={newProduct.isFeatured}
                                        onChange={handleChange}
                                        className="w-4 h-4 text-accent border-stone-200 rounded focus:ring-accent"
                                    />
                                    <label htmlFor="isFeatured" className="text-sm font-medium text-charcoal">
                                        Show in Curated Collections (Home Page)
                                    </label>
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
                                            <th className="p-4 text-sm font-medium text-text/60">Featured</th>
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
                                                    {product.isFeatured ? (
                                                        <span className="bg-accent/10 text-accent text-[10px] uppercase tracking-wider px-2 py-1 rounded">Featured</span>
                                                    ) : (
                                                        <span className="text-text/30 text-[10px] uppercase tracking-wider">—</span>
                                                    )}
                                                </td>
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
                ) : activeTab === 'orders' ? (
                    <div className="space-y-6">
                        <h2 className="text-xl font-serif">Customer Orders</h2>
                        {ordersLoading ? (
                            <div className="py-20 text-center">Loading orders...</div>
                        ) : orders.length === 0 ? (
                            <div className="bg-white p-20 text-center rounded-lg border border-stone-200">
                                <p className="text-text/60">No orders placed yet.</p>
                            </div>
                        ) : (
                            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                                <table className="w-full text-left">
                                    <thead className="bg-stone-50 border-b border-stone-200">
                                        <tr>
                                            <th className="p-4 text-sm font-medium text-text/60">Order ID</th>
                                            <th className="p-4 text-sm font-medium text-text/60">Customer</th>
                                            <th className="p-4 text-sm font-medium text-text/60">Date</th>
                                            <th className="p-4 text-sm font-medium text-text/60">Total</th>
                                            <th className="p-4 text-sm font-medium text-text/60">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((order) => (
                                            <tr key={order._id} className="border-b border-stone-100 last:border-0 hover:bg-stone-50 transition-colors">
                                                <td className="p-4 font-mono text-xs text-accent">#{order._id.slice(-8).toUpperCase()}</td>
                                                <td className="p-4">
                                                    <p className="font-medium">{order.user?.name || 'Guest'}</p>
                                                    <p className="text-[10px] text-text/40">{order.shippingAddress?.city}</p>
                                                </td>
                                                <td className="p-4 text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
                                                <td className="p-4 font-medium">₹{order.totalPrice.toFixed(2)}</td>
                                                <td className="p-4">
                                                    <select
                                                        value={order.status}
                                                        onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                                                        className={`text-xs px-2 py-1 rounded border-none focus:ring-1 focus:ring-accent ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                                            order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                                                                order.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                                                                    'bg-amber-100 text-amber-700'
                                                            }`}
                                                    >
                                                        <option value="Processing">Processing</option>
                                                        <option value="Shipped">Shipped</option>
                                                        <option value="Delivered">Delivered</option>
                                                        <option value="Cancelled">Cancelled</option>
                                                    </select>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="space-y-8">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-serif">Manage Site Content</h2>
                        </div>

                        {contentLoading ? (
                            <div className="py-20 text-center">Loading content...</div>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Navigation / List of sections */}
                                <div className="lg:col-span-1 space-y-2">
                                    {siteContent.map((section) => (
                                        <button
                                            key={section._id}
                                            onClick={() => setEditingContent(section)}
                                            className={`w-full text-left p-4 rounded-lg border transition-all ${editingContent?.section === section.section
                                                ? 'bg-white border-accent shadow-sm'
                                                : 'bg-stone-50 border-stone-200 text-text/60 hover:border-stone-300'
                                                }`}
                                        >
                                            <p className="font-medium text-charcoal capitalize">
                                                {section.section.replace('-', ' ')}
                                            </p>
                                            <p className="text-xs mt-1 truncate">{section.title}</p>
                                        </button>
                                    ))}
                                </div>

                                {/* Edit Form */}
                                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
                                    {editingContent ? (
                                        <form onSubmit={handleUpdateContent} className="space-y-6">
                                            <div className="flex justify-between items-center mb-4">
                                                <h3 className="font-serif text-lg capitalize">
                                                    Section: {editingContent.section.replace('-', ' ')}
                                                </h3>
                                            </div>

                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-sm text-text/60 mb-1">Section Title</label>
                                                    <input
                                                        type="text"
                                                        name="title"
                                                        value={editingContent.title || ''}
                                                        onChange={handleContentChange}
                                                        className="w-full border border-stone-200 p-2 rounded focus:outline-none focus:border-accent"
                                                    />
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm text-text/60 mb-1">Link URL</label>
                                                        <input
                                                            type="text"
                                                            name="link"
                                                            value={editingContent.link || ''}
                                                            onChange={handleContentChange}
                                                            className="w-full border border-stone-200 p-2 rounded focus:outline-none focus:border-accent"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm text-text/60 mb-1">Link Text</label>
                                                        <input
                                                            type="text"
                                                            name="linkText"
                                                            value={editingContent.linkText || ''}
                                                            onChange={handleContentChange}
                                                            className="w-full border border-stone-200 p-2 rounded focus:outline-none focus:border-accent"
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-sm text-text/60 mb-1">Image URL</label>
                                                    <input
                                                        type="text"
                                                        name="image"
                                                        value={editingContent.image || ''}
                                                        onChange={handleContentChange}
                                                        className="w-full border border-stone-200 p-2 rounded focus:outline-none focus:border-accent"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm text-text/60 mb-1">Description Paragraph 1</label>
                                                    <textarea
                                                        name="description1"
                                                        value={editingContent.description1 || ''}
                                                        onChange={handleContentChange}
                                                        className="w-full border border-stone-200 p-2 rounded focus:outline-none focus:border-accent"
                                                        rows="4"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm text-text/60 mb-1">Description Paragraph 2</label>
                                                    <textarea
                                                        name="description2"
                                                        value={editingContent.description2 || ''}
                                                        onChange={handleContentChange}
                                                        className="w-full border border-stone-200 p-2 rounded focus:outline-none focus:border-accent"
                                                        rows="4"
                                                    />
                                                </div>
                                            </div>

                                            <div className="pt-4 border-t border-stone-100 flex justify-end">
                                                <Button type="submit">save changes</Button>
                                            </div>
                                        </form>
                                    ) : (
                                        <div className="py-20 text-center text-text/40">
                                            Select a section to edit its content.
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
