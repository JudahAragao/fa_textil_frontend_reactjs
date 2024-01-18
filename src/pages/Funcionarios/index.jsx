import React, { useCallback, useState } from "react";

import ButtonComponent from "../../components/ButtonComponent";

import * as S from './styles'
import { useEffect } from "react";
import TableComponent from "../../components/TableComponent";
import FormFuncionarioComponent from "../../components/FormFuncionarioComponent";
import { funcionarioFields } from "../../helpers/formFields";
import FormComponent from "../../components/FormComponent";
import { useApiRequestContext } from "../../context/ApiRequestContextProvider";

const Funcionarios = () => {

    const {
        getDados,
        openModal,
        routeApi,
        setRouteApi,
        setMode,
        dataClear,
    } = useApiRequestContext()

    const fields = funcionarioFields;

    useEffect(() => {
        setRouteApi('/funcionario')
        
        routeApi && getDados()
    }, [routeApi])

    const formComponent = () => <FormComponent
        fields={fields}
    />

    return <S.Container>
        <S.HeaderContainer>
            <S.BtnContent>
                <ButtonComponent
                    label="Novo Orçamento"
                    onClick={() => {
                        setMode('cadastro')
                        dataClear()
                        openModal(formComponent)
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
                    { key: 'nome', title: 'Nome' },
                    { key: 'telefone', title: 'Telefone' },
                    { key: 'email', title: 'E-mail' },
                    { key: 'logradouro', title: 'Logradouro' },
                    { key: 'bairro', title: 'Bairro' },
                    { key: 'numeroImovel', title: 'N°' },
                    { key: 'ativo', title: 'Situação' },
                    { key: 'dataCadastro', title: 'Data Cadastro' },
                    { key: 'acao', title: 'Ação' },
                ]}
                component={formComponent}
            />
        </S.BodyContainer>
    </S.Container>

}

export default Funcionarios