import React, { useCallback, useState, useEffect } from "react";
import { useApiRequestContext } from "../../context/ApiRequestContextProvider";

import * as S from './styles'
import api from "../../services/api";
import CadastroClienteComponent from "../../components/CadastroClienteComponent";
import TableComponent from "../../components/TableComponent";
import RoundCheckboxComponent from "../../components/RoundCheckboxComponent";
import ButtonComponent from "../../components/ButtonComponent";
import FormComponent from '../../components/FormComponent'
import { clienteFisicoFields, clienteJuridicoFields } from "../../helpers/formFields";

const Clientes = () => {

    const {
        getDados,
        openModal,
        routeApi,
        setRouteApi,
        setMode,
        dataClear,
        swapeForm,
        formChanger
    } = useApiRequestContext()

    const [statusCliente, setStatusCliente] = useState({
        juridica: null,
        fisica: null,
        ativo: null,
        inativo: null,
        frequentes: null,
        total: null
    })

    const statusWidget = [
        {
            nome: 'Pessoa Jurídica',
            qtde: statusCliente.juridica,
            bg: 'linear-gradient(85deg, #10317A 6.37%, #0065BA 73.64%)'
        },
        {
            nome: 'Pessoa Física',
            qtde: statusCliente.fisica,
            bg: 'linear-gradient(85deg, #10317A 6.37%, #0065BA 73.64%)'
        },
        {
            nome: 'Clientes Ativos',
            qtde: statusCliente.ativo,
            bg: '#07BC2F'
        },
        {
            nome: 'Clientes Inativos',
            qtde: statusCliente.inativo,
            bg: '#D80000'
        },
        {
            nome: 'Clientes Frequentes',
            qtde: statusCliente.frequentes,
            bg: '#0084F3'
        },
        {
            nome: 'Total',
            qtde: statusCliente.total,
            bg: 'linear-gradient(89deg, #10317A -7.34%, #0065BA 52.69%, #FF6E00 109.09%)'
        }
    ]

    const fields = swapeForm === 1 ? clienteFisicoFields : clienteJuridicoFields;


    const getCliente = async () => {
        const responsePessoaFisica = await api.get("/clientepfisica")
        const responsePessoaJuridica = await api.get("/clientepjuridica")

        setStatusCliente(oldStatus => ({
            ...oldStatus,
            juridica: responsePessoaJuridica.data.filter(item => item.clienteId === 2).length,
            fisica: responsePessoaFisica.data.filter(item => item.clienteId === 1).length,
            ativo: responsePessoaFisica.data.filter(item => item.ativo === 1).length,
            inativo: responsePessoaFisica.data.filter(item => item.ativo === 0).length,
            frequentes: 0,
            total: responsePessoaFisica.data.length
        }))
    }

    useEffect(() => {
        if (swapeForm === 1) {
            setRouteApi('/clientepfisica')
        } else if (swapeForm === 2) {
            setRouteApi('/clientepjuridica')
        }
        
        routeApi && getDados()
    }, [routeApi, swapeForm])

    useEffect(() => {
        getCliente()
    }, [])

    const formComponent = () => <FormComponent
        fields={fields}
    />

    return <S.Container>
        <S.HeaderContainer>
            <S.BtnContent>
                <ButtonComponent
                    label="Novo Orçamento"
                    onClick={() => {
                        setMode('cadastro')
                        dataClear()
                        openModal(formComponent)
                    }}
                    className="custom-button"
                    typebtn="small"
                    bgcolor="linear-gradient(85deg, #10317A 6.37%, #0065BA 73.64%)"
                />
            </S.BtnContent>

            <S.StatusContent>
                {
                    statusWidget.map((widget, index) => (
                        <div className="status" style={{ background: `${widget.bg}` }} key={index}>
                            <p>{widget.nome}</p>
                            <h4>{widget.qtde}</h4>
                        </div>
                    ))
                }

            </S.StatusContent>
        </S.HeaderContainer>

        <S.BodyContainer>
            <div className="checkbox-group" style={{ display: 'flex' }}>
                <RoundCheckboxComponent
                    checked={swapeForm === 2}
                    onChange={() => formChanger(2)}
                    label="Pessoa Jurídica"
                />
                <span style={{ margin: '0 15px 0 15px' }}></span>
                <RoundCheckboxComponent
                    checked={swapeForm === 1}
                    onChange={() => formChanger(1)}
                    label="Pessoa Física"
                />
            </div>
            <TableComponent
                columns={
                    swapeForm === 1
                        ? [
                            { key: 'nome', title: 'Nome' },
                            { key: 'telefone', title: 'Telefone' },
                            { key: 'email', title: 'E-mail' },
                            { key: 'logradouro', title: 'Logradouro' },
                            { key: 'bairro', title: 'Bairro' },
                            { key: 'numeroImovel', title: 'N°' },
                            { key: 'ativo', title: 'Situação' },
                            { key: 'dataCadastro', title: 'Data Cadastro' },
                            { key: 'acao', title: 'Ação' },
                        ]
                        : [
                            { key: 'razaoSocial', title: 'Razão Social' },
                            { key: 'representante', title: 'Representante' },
                            { key: 'telefone', title: 'Telefone' },
                            { key: 'email', title: 'E-mail' },
                            { key: 'logradouro', title: 'Logradouro' },
                            { key: 'bairro', title: 'Bairro' },
                            { key: 'numeroImovel', title: 'N°' },
                            { key: 'ativo', title: 'Situação' },
                            { key: 'dataCadastro', title: 'Data Cadastro' },
                            { key: 'acao', title: 'Ação' },
                        ]
                }
                component={formComponent}
            />
        </S.BodyContainer>
    </S.Container>

}

export default Clientes