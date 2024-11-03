import React, { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Authenticated route component
const AuthRoute = ({ role }) => {
    const [token] = useState(() =>
        localStorage.getItem('token'))
    const [role_id] = useState(() =>
        localStorage.getItem('role_id'))

    return token && role <= role_id ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AuthRoute;