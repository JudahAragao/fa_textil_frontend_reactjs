// Em PrivateRoutes.js
import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';  // Importe Routes
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const PrivateRoutes = ({ role, children }) => {

    const { userLogged } = useAuth();
    let [permissions, setPermissions] = useState('');

    const loadRole = async () => {
        const userAuthorities = userLogged().decodedToken?.perfilAcessoId;
        const response = await api.get(`/perfilacesso/${userAuthorities}`);

        const findRole = response.data.nomePerfilAcesso;

        setPermissions(findRole);
        console.log(permissions)
    };

    useEffect(() => {

        loadRole();
    }, [userLogged]);


    if (userLogged().isAuthenticated === false) {
        return <Navigate to="/login" />;
    }

    if (!role || permissions) {
        return children;
    }

    return permissions ? children : <Navigate to="/login" />
};

export default PrivateRoutes;
