import React, { useCallback, useMemo, useState } from "react";

import ButtonComponent from "../../components/ButtonComponent";

import * as S from './styles'
import { useEffect } from "react";
import api from "../../services/api";
import TableComponent from "../../components/TableComponent";
import FormFuncionarioComponent from "../../components/FormFuncionarioComponent";

const Funcionarios = ({ onOpen, onClose }) => {

    // todos os clientes
    const [dados, setDados] = useState([]);

    const getCliente = async (mode, id) => {
        const response = await api.get("/funcionario")

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
                    onClick={() => onOpen(<FormFuncionarioComponent onUpdateRegister={atualizarListaCliente} mode={'cadastro'} />)}
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
                    { key: 'nome', title: 'Nome' },
                    { key: 'telefone', title: 'Telefone' },
                    { key: 'email', title: 'E-mail' },
                    { key: 'logradouro', title: 'Logradouro' },
                    { key: 'bairro', title: 'Bairro' },
                    { key: 'numeroImovel', title: 'N°' },
                    { key: 'ativo', title: 'Situação' },
                    { key: 'dataCadastro', title: 'Data Cadastro' },
                    { key: 'verMais', title: 'Ver Mais' },
                ]}
                onOpen={onOpen}
                onUpdateRegister={atualizarListaCliente}
                component={FormFuncionarioComponent}
            />
        </S.BodyContainer>
    </S.Container>

}

export default Funcionarios