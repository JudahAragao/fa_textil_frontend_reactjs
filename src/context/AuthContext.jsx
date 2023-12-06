import { createContext, useCallback, useContext, useEffect, useState } from "react";
import api from '../services/api'
import { jwtDecode } from "jwt-decode";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const history = useHistory();

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

    // const checkToken = useCallback( async () => {
    //     const storedToken = localStorage.getItem('@PermissionYT:token');
    //     try {
    //         const response = await api.get("/token/" + token.token);
    //         return response.data.token === storedToken;
    //     } catch (error) {
    //         localStorage.removeItem('@PermissionYT:token');
    //         return false
    //     }
    // }, [token.token, setToken]);

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const storedToken = localStorage.getItem('@PermissionYT:token');
                const response = await api.get("/token/" + storedToken);

                if (response.data.token !== storedToken) {
                    localStorage.removeItem('@PermissionYT:token');
                    history.push('/login')
                }

            } catch (error) {
                localStorage.removeItem('@PermissionYT:token');
                history.push('/login')
            }
        };

        verifyToken();
    }, []);

    const hasPermission = (roleNecessary) => {

        const role = token.decodedToken.perfilAcesso

        if (!role) {
            return false;
        }

        if (!roleNecessary) {
            return true;
        }

        return role === roleNecessary
    }

    return <AuthContext.Provider value={{ token, signIn, userLogged, hasPermission, /*checkToken*/ }}>
        {children}
    </AuthContext.Provider>
}

const useAuth = () => {
    const context = useContext(AuthContext)
    return context
}

export { AuthProvider, useAuth }