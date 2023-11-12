import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';

const RoutesControl = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={
                                                <PrivateRoutes role="ROLE_VENDEDOR" element={<Dashboard />} />
                                            } />
        </Routes>
    );
};

export default RoutesControl;