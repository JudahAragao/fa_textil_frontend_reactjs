import React, { useCallback, useState } from "react";

import ButtonComponent from "../../components/ButtonComponent";

import * as S from './styles'
import { useEffect } from "react";
import api from "../../services/api";
import TableComponent from "../../components/TableComponent";
import FormFuncionarioComponent from "../../components/FormFuncionarioComponent";
import FormProdutoComponent from "../../components/FormProdutoComponent";

const Produtos = ({ onOpen, onClose }) => {

    // todos os clientes
    const [dados, setDados] = useState([]);

    const getCliente = async () => {
        const response = await api.get("/produto")

        setDados(response.data)
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
                    onClick={() => onOpen(<FormProdutoComponent onUpdateRegister={atualizarListaCliente} mode={'cadastro'} />)}
                    className="custom-button"
                    typebtn="small"
                    bgcolor="linear-gradient(85deg, #10317A 6.37%, #0065BA 73.64%)"
                />
            </S.BtnContent>
        </S.HeaderContainer>

        <S.BodyContainer>
            <TableComponent
                data={dados}
                columns={[
                    { key: 'produtoId', title: 'Código' },
                    { key: 'descricaoProduto', title: 'Descrição' },
                    { key: 'tamanho', title: 'Tamanho' },
                    { key: 'precoCusto', title: 'Preç. de Custo' },
                    { key: 'valorProduto', title: 'Preço de Venda' },
                    { key: 'acao', title: 'Ação' }
                ]}
                onOpen={onOpen}
                onUpdateRegister={atualizarListaCliente}
                component={FormProdutoComponent}
            />
        </S.BodyContainer>
    </S.Container>

}

export default Produtos