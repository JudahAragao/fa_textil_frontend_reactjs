import React, { useEffect } from "react";

import * as S from './styles'
import { useApiRequestContext } from "../../context/ApiRequestContextProvider";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import TableComponent from "../../components/TableComponent";
import ButtonComponent from "../../components/ButtonComponent";

const PedidosVenda = () => {

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

export default PedidosVenda