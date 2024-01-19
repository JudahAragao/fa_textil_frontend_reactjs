import React, { useCallback, useEffect, useState } from "react";

import * as S from './styles'
import ButtonComponent from "../../components/ButtonComponent";
import api from "../../services/api";
import FormFuncionarioComponent from "../../components/FormFuncionarioComponent";
import TableComponent from "../../components/TableComponent";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useApiRequestContext } from "../../context/ApiRequestContextProvider";

const Orcamentos = () => {

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

    const history = useHistory();

    // const [statusCliente, setStatusCliente] = useState({
    //     juridica: null,
    //     fisica: null,
    //     ativo: null,
    //     inativo: null,
    //     frequentes: null,
    //     total: null
    // })

    const RedirectCadastroPedido = () => {
        history.push('/cadastropedido')
    }

    // const getCliente = async () => {
    //     const response = await api.get("/pedido")

    //     setDados(response.data)
    // }

    // const atualizarListaCliente = useCallback(() => {
    //     getCliente()
    // }, [])

    // const statusWidget = [
    //     {
    //         nome: 'Fechados',
    //         qtde: 196,
    //         bg: '#07BC2F'
    //     },
    //     {
    //         nome: 'Em Aberto',
    //         qtde: 30,
    //         bg: '#0084F3'
    //     },
    //     {
    //         nome: 'Vencido',
    //         qtde: 13,
    //         bg: '#FFC700'
    //     },
    //     {
    //         nome: 'Suspenso',
    //         qtde: 9,
    //         bg: '#D80000'
    //     },
    //     {
    //         nome: 'Total',
    //         qtde: 248,
    //         bg: 'linear-gradient(89deg, #10317A -7.34%, #0065BA 52.69%, #FF6E00 109.09%)'
    //     }
    // 

    useEffect(() => {
        setRouteApi('/pedido/pedidostatuscliente')
        
        routeApi && getDados()
    }, [routeApi])
    


    return <S.Container>
        <S.HeaderContainer>

            <S.BtnContent>
                <ButtonComponent
                    label="Novo Orçamento"
                    onClick={RedirectCadastroPedido}
                    className="custom-button"
                    typebtn="small"
                    bgcolor="linear-gradient(85deg, #10317A 6.37%, #0065BA 73.64%)"
                />
            </S.BtnContent>
            {/* <S.StatusContent>
                {
                    statusWidget.map(widget => (
                        <div className="status" style={{ background: `${widget.bg}` }}>
                            <p>{widget.nome}</p>
                            <h4>{widget.qtde}</h4>
                        </div>
                    ))
                }

            </S.StatusContent> */}
        </S.HeaderContainer>

        <S.BodyContainer>
            <TableComponent
                columns={[
                    { key: 'codPedido', title: 'Código' },
                    { key: 'descricao', title: 'Descrição do Pedido' },
                    { key: 'status', title: 'Status' },
                    { key: 'nomeClienteFisico', title: 'Cliente' },
                    { key: 'nomeClienteJuridica', title: 'Cliente' },
                    { key: 'acao', title: 'Ação' },
                ]}
            />
        </S.BodyContainer>
    </S.Container>
}

export default Orcamentos