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

    const userLogged = useCallback(() => {
        const storedToken = localStorage.getItem('@PermissionYT:token');

        if (storedToken) {
            return { isAuthenticated: true }
        } else {
            return { isAuthenticated: false }
        }


    }, []);

    const hasPermission = (roleNecessary) => {
        const storedToken = localStorage.getItem('@PermissionYT:token');
        const decodedToken = jwtDecode(storedToken);
        const role = decodedToken.perfilAcesso

        console.log("hasPermission: " + decodedToken.perfilAcesso)

        if (!role) {
            return false;
        }

        if (!roleNecessary) {
            return true;
        }

        return role === roleNecessary
    }

    return <AuthContext.Provider value={{ token, signIn, userLogged, hasPermission }}>
        {children}
    </AuthContext.Provider>
}

const useAuth = () => {
    const context = useContext(AuthContext)
    return context
}

export { AuthProvider, useAuth }