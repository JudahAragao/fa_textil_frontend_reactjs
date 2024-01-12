import React, { useCallback, useMemo, useState } from "react";

import ButtonComponent from "../../components/ButtonComponent";

import * as S from './styles'
import { useEffect } from "react";
import api from "../../services/api";
import CadastroClienteComponent from "../../components/CadastroClienteComponent";
import TableComponent from "../../components/TableComponent";
import RoundCheckboxComponent from "../../components/RoundCheckboxComponent";

const Clientes = ({ onOpen, onClose }) => {

    const [page, setPage] = useState(1);

    // todos os clientes
    const [dadosPFisica, setDadosPFisica] = useState([]);
    const [dadosPJuridica, setDadosJuridica] = useState([]);
    const [clienteType, setClienteType] = useState(1);

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

    const getCliente = async () => {
        const responsePessoaFisica = await api.get("/clientepfisica")
        const responsePessoaJuridica = await api.get("/clientepjuridica")

        setDadosPFisica(responsePessoaFisica.data)
        setDadosJuridica(responsePessoaJuridica.data)
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

    const atualizarListaCliente = useCallback(() => {
        getCliente()
    }, [])

    const handleCheckboxChange = (tipo) => {
        setClienteType(tipo);
    };

    useEffect(() => {
        getCliente()
    }, [])

    return <S.Container>
        <S.HeaderContainer>
            <S.BtnContent>
                <ButtonComponent
                    label="Novo Orçamento"
                    onClick={() => onOpen(<CadastroClienteComponent onUpdateRegister={atualizarListaCliente} mode={'cadastro'} />)}
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
            <TableComponent
                data={clienteType === 1 ? dadosPFisica : clienteType === 2 ? dadosPJuridica : null}
                columns={
                    clienteType === 1
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
                        : clienteType === 2 
                            ? [
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
                            : null
                }
                onOpen={onOpen}
                onUpdateRegister={atualizarListaCliente}
                component={CadastroClienteComponent}
            />
        </S.BodyContainer>
    </S.Container>

}

export default Clientes