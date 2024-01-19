import React, { useCallback, useState } from "react";

import ButtonComponent from "../../components/ButtonComponent";

import * as S from './styles'
import { useEffect } from "react";
import FormProdutoComponent from "../../components/FormProdutoComponent";
import { useApiRequestContext } from "../../context/ApiRequestContextProvider";
import TableComponentProduto from "../../components/TableComponentProduto";

const Produtos = () => {

    const {
        getDados,
        openModal,
        routeApi,
        setRouteApi,
        setMode,
        dataClear
    } = useApiRequestContext()
    
    useEffect(() => {
    
        setRouteApi('/produto/comtamanho')
        routeApi && getDados()
        
    }, [routeApi])

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
            <TableComponentProduto
                columns={[
                    { key: 'codProduto', title: 'Código' },
                    { key: 'descricao', title: 'Descrição' },
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