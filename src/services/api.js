const API_URL = import.meta.env.VITE_API_URL || '/api';

// Helper for making API requests
const apiFetch = async (endpoint, options = {}) => {
    const token = localStorage.getItem('token');

    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers,
        },
        ...options,
    };

    const res = await fetch(`${API_URL}${endpoint}`, config);
    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || 'API request failed');
    }

    return data;
};

// Product API
export const productAPI = {
    getAll: (params = {}) => {
        const query = new URLSearchParams(params).toString();
        return apiFetch(`/products${query ? `?${query}` : ''}`);
    },
    getById: (id) => apiFetch(`/products/${id}`),
    create: (product) => apiFetch('/products', {
        method: 'POST',
        body: JSON.stringify(product),
    }),
    update: (id, product) => apiFetch(`/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(product),
    }),
    delete: (id) => apiFetch(`/products/${id}`, { method: 'DELETE' }),
    uploadImage: (formData) => {
        const token = localStorage.getItem('token');
        return fetch(`${API_URL}/products/upload`, {
            method: 'POST',
            headers: {
                ...(token && { Authorization: `Bearer ${token}` }),
                // Content-Type is intentionally omitted for FormData
            },
            body: formData,
        }).then(res => {
            if (!res.ok) throw new Error('Upload failed');
            return res.json();
        });
    },
};

// Cart API
export const cartAPI = {
    get: () => apiFetch('/cart'),
    addItem: (productId, quantity) => apiFetch('/cart', {
        method: 'POST',
        body: JSON.stringify({ productId, quantity })
    }),
    updateItem: (productId, quantity) => apiFetch(`/cart/item/${productId}`, {
        method: 'PUT',
        body: JSON.stringify({ quantity })
    }),
    deleteItem: (productId) => apiFetch(`/cart/item/${productId}`, {
        method: 'DELETE'
    }),
    clear: () => apiFetch('/cart', {
        method: 'DELETE'
    }),
};

// Order API
export const orderAPI = {
    create: (orderData) => apiFetch('/orders', {
        method: 'POST',
        body: JSON.stringify(orderData)
    }),
    getMine: () => apiFetch('/orders/myorders'),
    getById: (id) => apiFetch(`/orders/${id}`),
    getAll: () => apiFetch('/orders'),
    updateStatus: (id, status) => apiFetch(`/orders/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status })
    }),
};

// Auth API
export const authAPI = {
    login: (email, password) => apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    }),
    register: (name, email, phone, password) => apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, phone, password }),
    }),
    getMe: () => apiFetch('/auth/me'),
    updateProfile: (data) => apiFetch('/auth/profile', {
        method: 'PUT',
        body: JSON.stringify(data),
    }),
};

// Site Content API
export const contentAPI = {
    getAll: () => apiFetch('/content'),
    getBySection: (section) => apiFetch(`/content/${section}`),
    updateSection: (section, data) => apiFetch(`/content/${section}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    })
};

// Wishlist API
export const wishlistAPI = {
    get: () => apiFetch('/wishlist'),
    add: (productId) => apiFetch(`/wishlist/add/${productId}`, {
        method: 'POST'
    }),
    remove: (productId) => apiFetch(`/wishlist/remove/${productId}`, {
        method: 'DELETE'
    })
};
