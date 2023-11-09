import { createContext, useCallback } from "react";

import api from '../services/api'


const AuthContext = createContext()

const AuthProvider = ({children}) => {

    const signIn = useCallback( async ({login, senha}) => {
        try {
            const response = await api.post('/login', {
                login,
                senha
            });
            // Manipule a resposta de sucesso aqui
            console.log("Resposta de sucesso:", response.data);
        } catch (error) {
            // Lidar com erros aqui
            console.error("Erro na solicitação:", error);
        }
    }, [])

    return <AuthContext.Provider value={{token: 'sfsfsdf', signIn}}>
        {children}
    </AuthContext.Provider> 
}

export { AuthContext, AuthProvider }