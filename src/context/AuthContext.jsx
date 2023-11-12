import { createContext, useCallback, useContext, useState } from "react";

import api from '../services/api'


const AuthContext = createContext()

const AuthProvider = ({children}) => {

    const [token, setToken] = useState(() => {
        const token = localStorage.getItem('@PermissionYT:token')

        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            return {token}
        }
        return {}

    })

    const signIn = useCallback( async ({login, senha}) => {
        const response = await api.post('/login', {
            login,
            senha
        });
        
        const token = response.data.token

        
        setToken(token)

        localStorage.setItem('@PermissionYT:token', token)

    }, [])

    const userLogged = useCallback(() => {
        const token = localStorage.getItem('@PermissionYT:token')
        if (token)
            return true;

        return false
    }, [])

    return <AuthContext.Provider value={{token, signIn, userLogged}}>
        {children}
    </AuthContext.Provider>
}

const useAuth = () => {
    const context = useContext(AuthContext)
    return context
}

export { AuthProvider, useAuth }