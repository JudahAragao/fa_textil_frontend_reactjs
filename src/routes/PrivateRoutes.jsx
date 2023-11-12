// Em PrivateRoutes.js
import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';  // Importe Routes
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const PrivateRoutes = ({ role, element: Element, ...rest }) => {
    const [permissions, setPermissions] = useState();
    const { userLogged } = useAuth();

    useEffect(() => {
        const loadRole = async () => {
            const response = await api.get('/perfilacesso');
            const findRole = response.data.find((r) => r.nomePerfilAcesso === role);
            setPermissions(findRole.nomePerfilAcesso === userLogged().role);
            // console.log(findRole.nomePerfilAcesso === userLogged().role)
        };

        loadRole();
    }, []);

    if (!userLogged().logged) {
        return <Navigate to="/login" replace={true} />;
    }

    if (!role && userLogged().logged) {
        // Use 'element' prop instead of returning a Route directly
        return <Element {...rest} />;
    }

    return permissions ? <Element {...rest} /> : <Navigate to="/login" replace={true} />;
};

export default PrivateRoutes;
