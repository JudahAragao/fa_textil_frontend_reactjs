import React, { useEffect, useState } from "react";

import * as S from './styles'
import RoundCheckboxComponent from "../RoundCheckboxComponent";
import InputComponent from "../InputComponent";
import ButtonComponent from "../ButtonComponent";
import api from "../../services/api";

const dataAtual = new Date();

const dia = String(dataAtual.getDate()).padStart(2, '0');
const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
const ano = String(dataAtual.getFullYear());

const FormClienteFisicoComponent = ({ onUpdateRegister, mode, dado, initialClienteType }) => {
    const [inputValuesFisico, setInputValuesFisico] = useState({
        clienteId: initialClienteType,
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

        setInputValuesFisico({
            ...inputValuesFisico,
            [name]: sanitizedValue,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataToSend = {
            ...inputValuesFisico,
            cpf: removeSpecialCharacters(inputValuesFisico.cpf),
            telefone: removeSpecialCharacters(inputValuesFisico.telefone),
            cep: removeSpecialCharacters(inputValuesFisico.cep),
        };

        if (mode === "cadastro") {
            await api.post('/clientepfisica', dataToSend);
        } else if (mode === "atualizacao") {
            await api.put(`/clientepfisica/${dado.clientePFisicaId}`, dataToSend);
        }

        await onUpdateRegister();
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/clientepfisica/${dado.clientePFisicaId}`);
                const clienteData = response.data;
                setInputValuesFisico({
                    clienteId: clienteData.clienteId,
                    nome: clienteData.nome,
                    telefone: clienteData.telefone,
                    email: clienteData.email,
                    logradouro: clienteData.logradouro,
                    numeroImovel: clienteData.numeroImovel,
                    bairro: clienteData.bairro,
                    complemento: clienteData.complemento,
                    cep: clienteData.cep,
                    cpf: clienteData.cpf,
                    ativo: clienteData.ativo,
                    dataCadastro: clienteData.dataCadastro
                });
            } catch (error) {
                console.error("Erro ao obter dados do cliente:", error);
            }
        };

        if (mode === "atualizacao" && dado.clientePFisicaId) {
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
                        value={inputValuesFisico.nome}
                        onChange={handleInputChangeFisico}
                        margin={'m-sm'}
                    />
                    <InputComponent
                        name="telefone"
                        label="Telefone:"
                        value={inputValuesFisico.telefone}
                        onChange={handleInputChangeFisico}
                        margin={'m-sm'}
                    />
                    <InputComponent
                        name="email"
                        label="E-mail:"
                        value={inputValuesFisico.email}
                        onChange={handleInputChangeFisico}
                        type={'email'}
                        margin={'m-sm'}
                    />
                    <InputComponent
                        name="cpf"
                        label="CPF:"
                        value={inputValuesFisico.cpf}
                        onChange={handleInputChangeFisico}
                        margin={'m-sm'}
                    />
                    <InputComponent
                        name="logradouro"
                        label="Logradouro:"
                        value={inputValuesFisico.logradouro}
                        onChange={handleInputChangeFisico}
                        margin={'m-sm'}
                    />

                    <div className="btn-group">
                        <ButtonComponent
                            label="Cadastrar Cliente"
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
                        value={inputValuesFisico.numeroImovel}
                        onChange={handleInputChangeFisico}
                        margin={'m-sm'}
                    />
                    <InputComponent
                        name="bairro"
                        label="Bairro:"
                        value={inputValuesFisico.bairro}
                        onChange={handleInputChangeFisico}
                        margin={'m-sm'}
                    />
                    <InputComponent
                        name="complemento"
                        label="Complemento:"
                        value={inputValuesFisico.complemento}
                        onChange={handleInputChangeFisico}
                        margin={'m-sm'}
                    />
                    <InputComponent
                        name="cep"
                        label="CEP:"
                        value={inputValuesFisico.cep}
                        onChange={handleInputChangeFisico}
                        margin={'m-sm'}
                    />
                </div>
            </div>
        </S.Container>
    );
};

const FormClienteJuridicoComponent = ({ onUpdateRegister, mode, dado, initialClienteType }) => {
    const [inputValuesJuridico, setInputValuesJuridico] = useState({
        clienteId: initialClienteType,
        razaoSocial: "",
        representante: "",
        telefone: "",
        email: "",
        site: "",
        logradouro: "",
        numeroImovel: "",
        bairro: "",
        complemento: "",
        cep: "",
        inscricaoEstadual: "",
        inscricaoMunicipal: "",
        cnpj: "",
        ativo: 1,
        dataCadastro: `${dia}/${mes}/${ano}`,
    });

    const removeSpecialCharacters = (str) => {
        return str.replace(/[.\-()\s]/g, '');
    };

    const handleInputChangeJuridico = (event) => {
        const { name, value } = event.target;

        setInputValuesJuridico((prevFormJuridico) => ({
            ...prevFormJuridico,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataToSend = {
            ...inputValuesJuridico,
            cnpj: removeSpecialCharacters(inputValuesJuridico.cnpj),
            telefone: removeSpecialCharacters(inputValuesJuridico.telefone),
            cep: removeSpecialCharacters(inputValuesJuridico.cep),
        };

        console.log(dataToSend)

        if (mode === "cadastro") {
            await api.post('/clientepjuridica', dataToSend);
        } else if (mode === "atualizacao") {
            await api.put(`/clientepjuridica/${dado.clientePJuridicaId}`, dataToSend);
        }

        await onUpdateRegister();
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/clientepjuridica/${dado.clientePJuridicaId}`);
                const clienteData = response.data;
                setInputValuesJuridico({
                    clienteId: clienteData.clienteId,
                    razaoSocial: clienteData.razaoSocial,
                    representante: clienteData.representante,
                    telefone: clienteData.telefone,
                    email: clienteData.email,
                    site: clienteData.site,
                    logradouro: clienteData.logradouro,
                    numeroImovel: clienteData.numeroImovel,
                    bairro: clienteData.bairro,
                    complemento: clienteData.complemento,
                    cep: clienteData.cep,
                    inscricaoEstadual: clienteData.inscricaoEstadual,
                    inscricaoMunicipal: clienteData.inscricaoMunicipal,
                    cnpj: clienteData.cnpj,
                    ativo: clienteData.ativo,
                    dataCadastro: clienteData.dataCadastro,
                });
            } catch (error) {
                console.error("Erro ao obter dados do cliente jurídico:", error);
            }
        };

        if (mode === "atualizacao" && dado.clientePJuridicaId) {
            fetchData();
        }
    }, [mode, dado]);

    return (
        <S.Container>
            <div className="input-forms-group">
                <div className="form-left">
                    <InputComponent
                        name="razaoSocial"
                        label="Razão Social:"
                        value={inputValuesJuridico.razaoSocial}
                        onChange={handleInputChangeJuridico}
                        margin={'m-sm'}
                    />
                    <InputComponent
                        name="representante"
                        label="Representante:"
                        value={inputValuesJuridico.representante}
                        onChange={handleInputChangeJuridico}
                        margin={'m-sm'}
                    />
                    <InputComponent
                        name="telefone"
                        label="Telefone:"
                        value={inputValuesJuridico.telefone}
                        onChange={handleInputChangeJuridico}
                        margin={'m-sm'}
                    />
                    <InputComponent
                        name="email"
                        label="E-mail:"
                        value={inputValuesJuridico.email}
                        onChange={handleInputChangeJuridico}
                        type={'email'}
                        margin={'m-sm'}
                    />
                    {/* Adicione outros campos conforme necessário */}
                </div>
                <div className="form-right">
                    <InputComponent
                        name="complemento"
                        label="Complemento:"
                        value={inputValuesJuridico.complemento}
                        onChange={handleInputChangeJuridico}
                        margin={'m-sm'}
                    />
                    <InputComponent
                        name="cep"
                        label="CEP:"
                        value={inputValuesJuridico.cep}
                        onChange={handleInputChangeJuridico}
                        margin={'m-sm'}
                    />
                    <InputComponent
                        name="inscricaoEstadual"
                        label="Inscrição Estadual:"
                        value={inputValuesJuridico.inscricaoEstadual}
                        onChange={handleInputChangeJuridico}
                        margin={'m-sm'}
                    />
                    <InputComponent
                        name="inscricaoMunicipal"
                        label="Inscrição Municipal:"
                        value={inputValuesJuridico.inscricaoMunicipal}
                        onChange={handleInputChangeJuridico}
                        margin={'m-sm'}
                    />
                    {/* Adicione outros campos conforme necessário */}
                </div>
            </div>
            <div className="input-forms-group">
                <div className="form-left">
                    <InputComponent
                        name="logradouro"
                        label="Logradouro:"
                        value={inputValuesJuridico.logradouro}
                        onChange={handleInputChangeJuridico}
                        margin={'m-sm'}
                    />
                    <InputComponent
                        name="numeroImovel"
                        label="Número Imóvel:"
                        value={inputValuesJuridico.numeroImovel}
                        onChange={handleInputChangeJuridico}
                        margin={'m-sm'}
                    />
                    <InputComponent
                        name="bairro"
                        label="Bairro:"
                        value={inputValuesJuridico.bairro}
                        onChange={handleInputChangeJuridico}
                        margin={'m-sm'}
                    />
                </div>
                <div className="form-right">
                    <InputComponent
                        name="cnpj"
                        label="CNPJ:"
                        value={inputValuesJuridico.cnpj}
                        onChange={handleInputChangeJuridico}
                        margin={'m-sm'}
                    />
                    <InputComponent
                        name="site"
                        label="Site:"
                        value={inputValuesJuridico.site}
                        onChange={handleInputChangeJuridico}
                        margin={'m-sm'}
                    />
                </div>
            </div>
            <div className="btn-group">
                <ButtonComponent
                    label="Cadastrar Cliente Jurídico"
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
        </S.Container>
    );
};

const CadastroClienteComponent = ({ onUpdateRegister, mode, dado }) => {
    const [clienteType, setClienteType] = useState(1);

    const handleCheckboxChange = (tipo) => {
        setClienteType(tipo);
    };

    return (
        <>

            <div className="checkbox-group" style={{ display: 'flex' }}>
                <RoundCheckboxComponent
                    checked={clienteType === 2}
                    onChange={() => handleCheckboxChange(2)}
                    label="Pessoa Jurídica"
                />
                <span style={{ margin: '0 15px 0 15px' }}></span>
                <RoundCheckboxComponent
                    checked={clienteType === 1}
                    onChange={() => handleCheckboxChange(1)}
                    label="Pessoa Física"
                />
            </div>

            {clienteType === 1 && (
                <FormClienteFisicoComponent onUpdateRegister={onUpdateRegister} mode={mode} dado={dado} initialClienteType={clienteType} />
            )}

            {clienteType === 2 && (
                <FormClienteJuridicoComponent onUpdateRegister={onUpdateRegister} mode={mode} dado={dado} initialClienteType={clienteType} />
            )}
        </>
    );
};

export default CadastroClienteComponent