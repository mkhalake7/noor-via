import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!user) {
        const redirectTo = requireAdmin ? '/admin' : '/login';
        return <Navigate to={redirectTo} state={{ from: location }} replace />;
    }

    if (requireAdmin && user.role !== 'admin') {
        return <div className="min-h-screen flex items-center justify-center p-4">Access Denied. Admin privileges required.</div>;
    }

    return children;
};

export default ProtectedRoute;
