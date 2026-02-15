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
    getAll: () => apiFetch('/products'),
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
};

// Auth API
export const authAPI = {
    login: (email, password) => apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    }),
    register: (name, email, password) => apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
    }),
    getMe: () => apiFetch('/auth/me'),
};
