import React, { useCallback, useState } from "react";

import ButtonComponent from "../../components/ButtonComponent";

import * as S from './styles'
import { useEffect } from "react";
import api from "../../services/api";
import TableComponent from "../../components/TableComponent";
import FormFuncionarioComponent from "../../components/FormFuncionarioComponent";
import FormProdutoComponent from "../../components/FormProdutoComponent";
import { useApiRequestContext } from "../../context/ApiRequestContextProvider";

const Produtos = () => {

    const {
        getDados,
        openModal,
        routeApi,
        setRouteApi,
        setMode,
        dataClear,
        dados,
        setDadosMesclados
    } = useApiRequestContext()

    const [produtos, setProdutos] = useState([])
    const [tamanhos, setTamanhos] = useState([])

    useEffect(() => {
    
        setRouteApi('/produto')
        routeApi && getDados()
        setProdutos(dados)
        dataClear()
        setRouteApi('/tamanhoproduto')
        routeApi && getDados()
        setTamanhos(dados)


        

    }, [routeApi])

    useEffect(() => {
        const produtosTamanhosAssociados = [];

        produtos.map((produto) => {
            tamanhos.filter((t) => console.log({'id tamanho:':t.codProduto, 'id Produto':produto.id}))
            tamanhos.filter((t) => t.codProduto === produto.id)
                .map((t) => {
                    produtosTamanhosAssociados.push({
                        codigoProduto: produto.id,
                        descricaoProduto: produto.descricaoProduto,
                        tamanho: t.tamanho,
                    });
                });
        });

        setDadosMesclados(produtosTamanhosAssociados);
    }, [produtos, tamanhos]);

    return <S.Container>
        <S.HeaderContainer>
            <S.BtnContent>
                <ButtonComponent
                    label="Novo Orçamento"
                    onClick={() => {
                        setMode('cadastro')
                        dataClear()
                        openModal(<FormProdutoComponent onUpdateRegister={getDados} mode={'cadastro'} />)
                    }}
                    className="custom-button"
                    typebtn="small"
                    bgcolor="linear-gradient(85deg, #10317A 6.37%, #0065BA 73.64%)"
                />
            </S.BtnContent>
        </S.HeaderContainer>

        <S.BodyContainer>
            <TableComponent
                columns={[
                    { key: 'id', title: 'Código' },
                    { key: 'descricaoProduto', title: 'Descrição' },
                    { key: 'tamanho', title: 'Tamanho' },
                    { key: 'valorProduto', title: 'Preço de Venda' },
                    { key: 'acao', title: 'Ação' }
                ]}
                component={FormProdutoComponent}
            />
        </S.BodyContainer>
    </S.Container>

}

export default Produtos