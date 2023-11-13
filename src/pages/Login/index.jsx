// import de dependencias
import React, { useState } from "react";

// import de components
import InputComponent from "../../components/InputComponent";
import ButtonComponent from "../../components/ButtonComponent";

// import de estilo e outros
import * as S from './styles'
import logoHorizontal from '../../assets/img/logo-horizontal.png'
import { useAuth } from "../../context/AuthContext";


const Login = () => {

    const [inputValues, setInputValues] = useState({
        login: '',
        senha: '',
    });

    const { signIn } = useAuth()

    const handleInputChange = (name, value) => {
        setInputValues({
            ...inputValues,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { login, senha } = inputValues

        await signIn({login, senha})
    };

    return <S.Container>
        <S.BodyForm>

            <S.ContainerImage>
                <img src={logoHorizontal} alt="Logo Horizontal" />
            </S.ContainerImage>

            <InputComponent
                name="login"
                label="Login:"
                placeholder="Digite seu nome de usuário"
                value={inputValues.login}
                onChange={handleInputChange}
            />

            <InputComponent
                name="senha"
                label="Senha:"
                type="password"
                placeholder="Digite sua senha"
                value={inputValues.senha}
                onChange={handleInputChange}
            />

            <ButtonComponent
                label="Entrar!"
                onClick={handleSubmit}
                className="custom-button"
                bgcolor="linear-gradient(89deg, #10317A -7.34%, #0065BA 52.69%, #FF6E00 109.09%)"
            />
        </S.BodyForm>
    </S.Container>
}

export default Login;