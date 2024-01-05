import React, { useCallback, useMemo, useState } from "react";

import ButtonComponent from "../../components/ButtonComponent";

import * as S from './styles'
import { useEffect } from "react";
import api from "../../services/api";
import CadastroClienteComponent from "../../components/CadastroClienteComponent";
import TableComponent from "../../components/TableComponent";

const Clientes = ({ onOpen, onClose }) => {

    const [page, setPage] = useState(1);

    // todos os clientes
    const [dados, setDados] = useState([]);

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

    const getCliente = async (mode, id) => {
        const response = await api.get("/clientepfisica")

        setDados(response.data)
        setStatusCliente(oldStatus => ({
            ...oldStatus,
            juridica: response.data.filter(item => item.clienteId === 2).length,
            fisica: response.data.filter(item => item.clienteId === 1).length,
            ativo: response.data.filter(item => item.ativo === 1).length,
            inativo: response.data.filter(item => item.ativo === 0).length,
            frequentes: 0,
            total: response.data.length
        }))
    }

    const atualizarListaCliente = useCallback(() => {
        getCliente()
    }, [])

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
            <TableComponent
                data={dados}
                columns={[
                    { key: 'nome', title: 'Nome' },
                    { key: 'telefone', title: 'Telefone' },
                    { key: 'email', title: 'E-mail' },
                    { key: 'logradouro', title: 'Logradouro' },
                    { key: 'bairro', title: 'Bairro' },
                    { key: 'numeroImovel', title: 'N°' },
                    { key: 'ativo', title: 'Situação' },
                    { key: 'dataCadastro', title: 'Data Cadastro'},
                    { key: 'verMais', title: 'Ver Mais' },
                ]}
                onOpen={onOpen}
                onUpdateRegister={atualizarListaCliente}
                component={CadastroClienteComponent}
            />
        </S.BodyContainer>
    </S.Container>

}

export default Clientes