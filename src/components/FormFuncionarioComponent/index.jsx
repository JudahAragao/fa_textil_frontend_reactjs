import React from "react";

import InputComponent from "../InputComponent";
import ButtonComponent from "../ButtonComponent";
import api from "../../services/api";

import * as S from './styles'
import { useEffect } from "react";
import { useState } from "react";

const dataAtual = new Date();

const dia = String(dataAtual.getDate()).padStart(2, '0');
const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
const ano = String(dataAtual.getFullYear());

const FormFuncionarioComponent = ({ onUpdateRegister, mode, dado }) => {

    const [inputValuesFuncionario, setInputFuncionario] = useState({
        nome: "",
        telefone: "",
        email: "",
        logradouro: "",
        numeroImovel: "",
        bairro: "",
        complemento: "",
        cep: "",
        cpf: "",
        ativo: 1,
        dataCadastro: `${dia}/${mes}/${ano}`
    });

    const removeSpecialCharacters = (str) => {
        return str.replace(/[.\-()\s]/g, '');
    };

    const handleInputChangeFisico = (event) => {
        const { name, value } = event.target;

        const sanitizedValue =
            name === 'cpf' ? removeSpecialCharacters(value) :
                name === 'telefone' ? removeSpecialCharacters(value) :
                    name === 'cep' ? removeSpecialCharacters(value) :
                        value;

        setInputFuncionario({
            ...inputValuesFuncionario,
            [name]: sanitizedValue,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataToSend = {
            ...inputValuesFuncionario,
            cpf: removeSpecialCharacters(inputValuesFuncionario.cpf),
            telefone: removeSpecialCharacters(inputValuesFuncionario.telefone),
            cep: removeSpecialCharacters(inputValuesFuncionario.cep),
        };

        console.log(dataToSend)

        if (mode === "cadastro") {
            await api.post('/funcionario', dataToSend)
        } else if (mode === "atualizacao") {
            await api.put(`/funcionario/${dado.funcionarioId}`, dataToSend);
        }

        await onUpdateRegister();
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/funcionario/${dado.funcionarioId}`);
                const funcionarioData = response.data;
                setInputFuncionario({
                    nome: funcionarioData.nome,
                    telefone: funcionarioData.telefone,
                    email: funcionarioData.email,
                    logradouro: funcionarioData.logradouro,
                    numeroImovel: funcionarioData.numeroImovel,
                    bairro: funcionarioData.bairro,
                    complemento: funcionarioData.complemento,
                    cep: funcionarioData.cep,
                    cpf: funcionarioData.cpf,
                    ativo: funcionarioData.ativo,
                    dataCadastro: funcionarioData.dataCadastro
                });
            } catch (error) {
                console.error("Erro ao obter dados do funcionario:", error);
            }
        };

        if (mode === "atualizacao" && dado.funcionarioId) {
            fetchData();
        }
    }, [mode, dado]);

    return (
        <S.Container>
            <div className="input-forms-group">
                <div className="form-left">
                    <InputComponent
                        name="nome"
                        label="Nome Completo:"
                        value={inputValuesFuncionario.nome}
                        onChange={handleInputChangeFisico}
                        margin={'m-sm'}
                    />
                    <InputComponent
                        name="telefone"
                        label="Telefone:"
                        value={inputValuesFuncionario.telefone}
                        onChange={handleInputChangeFisico}
                        margin={'m-sm'}
                    />
                    <InputComponent
                        name="email"
                        label="E-mail:"
                        value={inputValuesFuncionario.email}
                        onChange={handleInputChangeFisico}
                        type={'email'}
                        margin={'m-sm'}
                    />
                    <InputComponent
                        name="cpf"
                        label="CPF:"
                        value={inputValuesFuncionario.cpf}
                        onChange={handleInputChangeFisico}
                        margin={'m-sm'}
                    />
                    <InputComponent
                        name="logradouro"
                        label="Logradouro:"
                        value={inputValuesFuncionario.logradouro}
                        onChange={handleInputChangeFisico}
                        margin={'m-sm'}
                    />

                    <div className="btn-group">
                        <ButtonComponent
                            label="Cadastrar Funcionário"
                            onClick={(e) => handleSubmit(e)}
                            className="custom-button"
                            typebtn="small"
                            bgcolor="linear-gradient(85deg, #107A3A 6.37%, #1ABA00 73.64%)"
                        />

                        <ButtonComponent
                            label="Cancelar"
                            onClick={(e) => handleSubmit(e)}
                            className="custom-button"
                            typebtn="small"
                            bgcolor="linear-gradient(89deg, #710000 3.74%, #D80000 73.59%)"
                        />
                    </div>
                </div>
                <div className="form-right">
                    <InputComponent
                        name="numeroImovel"
                        label="Número Imóvel:"
                        value={inputValuesFuncionario.numeroImovel}
                        onChange={handleInputChangeFisico}
                        margin={'m-sm'}
                    />
                    <InputComponent
                        name="bairro"
                        label="Bairro:"
                        value={inputValuesFuncionario.bairro}
                        onChange={handleInputChangeFisico}
                        margin={'m-sm'}
                    />
                    <InputComponent
                        name="complemento"
                        label="Complemento:"
                        value={inputValuesFuncionario.complemento}
                        onChange={handleInputChangeFisico}
                        margin={'m-sm'}
                    />
                    <InputComponent
                        name="cep"
                        label="CEP:"
                        value={inputValuesFuncionario.cep}
                        onChange={handleInputChangeFisico}
                        margin={'m-sm'}
                    />
                </div>
            </div>
        </S.Container>
    );
}

export default FormFuncionarioComponent