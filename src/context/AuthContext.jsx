import { createContext, useCallback, useContext, useState } from "react";
import api from '../services/api'
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(() => {
        const storedToken = localStorage.getItem('@PermissionYT:token')

        if (storedToken) {
            const decodedToken = jwtDecode(storedToken);
            api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;

            return { token: storedToken, decodedToken };
        }
        return { token: '', decodedToken: '' };
    });

    const signIn = useCallback(async ({ login, senha }) => {
        const response = await api.post('/login', {
            login,
            senha
        });

        const newToken = response.data;
        const decodedToken = jwtDecode(newToken);

        if (decodedToken && decodedToken.exp > Date.now() / 1000) {
            setToken({ token: newToken, decodedToken });
        } else {
            return null;
        }

        localStorage.setItem('@PermissionYT:token', newToken);
    }, []);

    // const userLogged = useCallback(() => {
    //     const token = localStorage.getItem('@PermissionYT:token')
    //     if (token)
    //         return true;

    //     return false
    // }, [])

    const userLogged = useCallback(() => {
        const storedToken = localStorage.getItem('@PermissionYT:token');
        const decodedToken = storedToken ? jwtDecode(storedToken) : null;

        if (storedToken) {
            return { isAuthenticated: true, decodedToken };
        } else {
            return {isAuthenticated: false, decodedToken: null}
        }

        
    }, []);

    return <AuthContext.Provider value={{ token, signIn, userLogged }}>
        {children}
    </AuthContext.Provider>
}

const useAuth = () => {
    const context = useContext(AuthContext)
    return context
}

export { AuthProvider, useAuth }