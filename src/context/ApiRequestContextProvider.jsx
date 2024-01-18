// imports pacotes
import React, { createContext, useContext, useState } from 'react';

// imports metodos próprios
import api from '../services/api';
import { formateDate } from '../utils/formatData';

const ApiRequestContext = createContext();

export const useApiRequestContext = () => {
    const context = useContext(ApiRequestContext);
    if (!context) {
        throw new Error('useApiRequestContext must be used within a OrcamentoProvider');
    }
    return context;
};

export const ApiRequestProvider = ({ children }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [mode, setMode] = useState()
    const [dadosMescalados, setDadosMesclados] = useState([]);
    const [dados, setDados] = useState([]);
    const [dado, setDado] = useState({})
    const [id, setId] = useState();
    const [values, setValues] = useState({});
    const [routeApi, setRouteApi] = useState()
    const [swapeForm, setSwapeForm] = useState(1)

    const getDados = async () => {
        const response = await api.get(`${routeApi}`)
        setDados(response.data)
    };

    const dataClear = () => {
        setValues({})
    }

    const getDadosCRotas = (rota) => {
        return api.get(`${rota}`).then(response => {
            setDado(response.data);
            return response.data;
        });
    };

    const getDado = async (id) => {
        const response = await api.get(`${routeApi}/${id}`)
        setDados(response.data)
    };

    const formChanger = () => {
        if (swapeForm === 1) {
            setSwapeForm(2)
        } else if (swapeForm === 2) {
            setSwapeForm(1)
        }
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        const currentDate = formateDate();

        if (mode === 'cadastro') {
            setValues((prevValues) => ({
                ...prevValues,
                dataCadastro: currentDate,
                ativo: 1,
                clienteId: swapeForm
            }));
        }

        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = async (e, valuesForm) => {
        e.preventDefault();

        // // Função para converter um valor para número, se for uma string que representa um número
        // const convertToNumberIfNeeded = (value) => {
        //     return !isNaN(Number(value)) ? Number(value) : value;
        // };

        // // Converter todos os campos para números, se necessário
        // const numericValues = {};
        // Object.entries(values).forEach(([key, value]) => {
        //     numericValues[key] = convertToNumberIfNeeded(value);
        // });

        // console.log(numericValues)

        if (mode === 'cadastro') {
            await api.post(`${routeApi}`, valuesForm);
        } else if (mode === 'atualizacao') {
            await api.put(`${routeApi}/${id}`, valuesForm);
        }
    };

    const handleDelete = async (id) => {
        await api.delete(`${routeApi}/${id}`)
    };

    const openModal = (content) => {
        setModalContent(content);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalContent(null);
        setModalIsOpen(false);
    };

    const contextValue = {
        modalIsOpen,
        modalContent,
        dados,
        setDados,
        mode,
        setMode,
        id,
        setId,
        values,
        setValues,
        dado,
        getDado,
        getDados,
        getDadosCRotas,
        handleChange,
        handleSubmit,
        handleDelete,
        openModal,
        closeModal,
        routeApi,
        setRouteApi,
        dataClear,
        swapeForm,
        formChanger,
        dadosMescalados,
        setDadosMesclados
    };

    return (
        <ApiRequestContext.Provider value={contextValue}>
            {children}
        </ApiRequestContext.Provider>
    );
};