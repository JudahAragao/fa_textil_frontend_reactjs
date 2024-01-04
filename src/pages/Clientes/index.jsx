import React, { useCallback, useState } from "react";

import ButtonComponent from "../../components/ButtonComponent";

import * as S from './styles'
import { useEffect } from "react";
import api from "../../services/api";
import CadastroClienteComponent from "../../components/CadastroClienteComponent";

const Clientes = ({ onOpen, onClose }) => {

    const [page, setPage] = useState(1);

    // todos os clientes
    const [dados, setDados] = useState([]);

    // somente um cliente
    const [dado, setDado] = useState({})

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

    useEffect(() => {
        if (dado && Object.keys(dado).length > 0 && onOpen) {
            onOpen(<CadastroClienteComponent mode={'atualizacao'} dado={dado} />);
        } else if (Object.keys(dado).length === 0 && onClose) {
            onClose();
        }
    }, [dado]);

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
            <S.TableWrapper>
                <S.TableHeader>
                    <S.TableHeaderCell style={{ textAlign: 'left' }}>Cliente</S.TableHeaderCell>
                    <S.TableHeaderCell style={{ width: '150px' }}>Telefone</S.TableHeaderCell>
                    <S.TableHeaderCell style={{ textAlign: 'left' }}>E-mail</S.TableHeaderCell>
                    <S.TableHeaderCell style={{ textAlign: 'left', width: '400px' }}>Endereço</S.TableHeaderCell>
                    <S.TableHeaderCell style={{ width: '80px' }}>Situação</S.TableHeaderCell>
                    <S.TableHeaderCell style={{ width: '150px' }}>Data Cadastro</S.TableHeaderCell>
                    <S.TableHeaderCell style={{ width: '90px' }}>Ver Mais</S.TableHeaderCell>
                </S.TableHeader>

                <S.TableBody>
                    {dados.slice((page - 1) * 10, page * 10).map((row, index) => (
                        <S.TableRow key={index}>
                            <S.TableCell>{row.nome}</S.TableCell>
                            <S.TableCell style={{ textAlign: 'center', width: '150px' }}>{row.telefone}</S.TableCell>
                            <S.TableCell>{row.email}</S.TableCell>
                            <S.TableCell style={{ width: '400px' }}>{row.logradouro}, N° {row.numeroImovel}, {row.bairro}</S.TableCell>
                            <S.TableCell style={{ textAlign: 'center', width: '80px' }}>{row.ativo > 0 && row.ativo === 1 ? 'Ativo' : 'Inativo'}</S.TableCell>
                            <S.TableCell style={{ textAlign: 'center', width: '150px' }}>{row.dataCadastro}</S.TableCell>
                            <S.TableHeaderCell style={{ width: '90px' }}>
                                <ButtonComponent
                                    label="+"
                                    onClick={() => {
                                        onOpen(<CadastroClienteComponent onUpdateRegister={atualizarListaCliente} mode={'atualizacao'} dado={row} />);
                                    }}
                                    className="custom-button"
                                    typebtn="small"
                                    bgcolor="linear-gradient(85deg, #10317A 6.37%, #0065BA 73.64%)"
                                />
                            </S.TableHeaderCell>
                        </S.TableRow>
                    ))}
                </S.TableBody>

                <S.TablePagination
                    page={page}
                    setPage={setPage}
                    total={dados.length}
                />
            </S.TableWrapper>
        </S.BodyContainer>
    </S.Container>

}

export default Clientes