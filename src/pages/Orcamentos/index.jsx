import React, { useState } from "react";

import * as S from './styles'
import ButtonComponent from "../../components/ButtonComponent";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Orcamentos = () => {

    const history = useHistory();

    const RedirectCadastroPedido = () => {
        history.push('/cadastropedido')
    }

    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);

    const statusWidget = [
        {
            nome: 'Fechados',
            qtde: 196,
            bg: '#07BC2F'
        },
        {
            nome: 'Em Aberto',
            qtde: 30,
            bg: '#0084F3'
        },
        {
            nome: 'Vencido',
            qtde: 13,
            bg: '#FFC700'
        },
        {
            nome: 'Suspenso',
            qtde: 9,
            bg: '#D80000'
        },
        {
            nome: 'Total',
            qtde: 248,
            bg: 'linear-gradient(89deg, #10317A -7.34%, #0065BA 52.69%, #FF6E00 109.09%)'
        }
    ]


    return <S.Container>
        <S.HeaderContainer>
            <S.StatusContent>
                {
                    statusWidget.map(widget => (
                        <div className="status" style={{ background: `${widget.bg}` }}>
                            <p>{widget.nome}</p>
                            <h4>{widget.qtde}</h4>
                        </div>
                    ))
                }

            </S.StatusContent>

            <S.BtnContent>
                <ButtonComponent
                    label="Novo Orçamento"
                    onClick={RedirectCadastroPedido}
                    className="custom-button"
                    typebtn="small"
                    bgcolor="linear-gradient(85deg, #10317A 6.37%, #0065BA 73.64%)"
                />
            </S.BtnContent>
        </S.HeaderContainer>

        <S.BodyContainer>
            <S.TableWrapper>
                <S.TableHeader>
                    <S.TableHeaderCell>Código</S.TableHeaderCell>
                    <S.TableHeaderCell>Desc. do Pedido</S.TableHeaderCell>
                    <S.TableHeaderCell>Qtde Itens</S.TableHeaderCell>
                    <S.TableHeaderCell>Val. do Pedido</S.TableHeaderCell>
                    <S.TableHeaderCell>Val. de Custo</S.TableHeaderCell>
                    <S.TableHeaderCell>Status</S.TableHeaderCell>
                    <S.TableHeaderCell>Cliente</S.TableHeaderCell>
                    <S.TableHeaderCell>Ver Mais</S.TableHeaderCell>
                </S.TableHeader>

                <S.TableBody>
                    {data.slice((page - 1) * 10, page * 10).map((row, index) => (
                        <S.TableRow key={index}>
                            <S.TableCell>{row.id}</S.TableCell>
                            <S.TableCell>{row.description}</S.TableCell>
                            <S.TableCell>{row.quantity}</S.TableCell>
                            <S.TableCell>{row.price}</S.TableCell>
                            <S.TableCell>{row.cost}</S.TableCell>
                            <S.TableCell>{row.status}</S.TableCell>
                            <S.TableCell>{row.customer}</S.TableCell>
                            <S.TableHeaderCell>+</S.TableHeaderCell>
                        </S.TableRow>
                    ))}
                </S.TableBody>

                <S.TablePagination
                    page={page}
                    setPage={setPage}
                    total={data.length}
                />
            </S.TableWrapper>
        </S.BodyContainer>
    </S.Container>
}

export default Orcamentos