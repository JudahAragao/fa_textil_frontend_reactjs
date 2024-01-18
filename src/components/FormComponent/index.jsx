import React from "react";
import InputComponent from '../../components/InputComponent'
import { useLocation } from "react-router-dom";

import * as S from './styles'
import ButtonComponent from "../ButtonComponent";
import { useApiRequestContext } from "../../context/ApiRequestContextProvider";
import RoundCheckboxComponent from "../RoundCheckboxComponent";
import { clienteFisicoFields, clienteJuridicoFields } from "../../helpers/formFields";


const FormComponent = ({ fields, ...otherProps }) => {

    const {
        mode,
        values,
        handleChange,
        getDados,
        handleSubmit,
        closeModal,
        swapeForm,
        formChanger
    } = useApiRequestContext()

    const location = useLocation()

    if (swapeForm === 1 && location.pathname === '/clientes' ) {
        fields = clienteFisicoFields
    } else if (swapeForm === 2 && location.pathname === '/clientes') {
        fields = clienteJuridicoFields
    }

    return (
        <S.Container>

            {
                mode === 'cadastro' && location.pathname === '/clientes' && <div className="checkbox-group" style={{ display: 'flex' }}>
                    <RoundCheckboxComponent
                        checked={swapeForm === 2}
                        onChange={() => formChanger(2)}
                        label="Pessoa Jurídica"
                    />
                    <span style={{ margin: '0 15px 0 15px' }}></span>
                    <RoundCheckboxComponent
                        checked={swapeForm === 1}
                        onChange={() => formChanger(1)}
                        label="Pessoa Física"
                    />
                </div>
            }

            <div className="inputs-group">
                {fields.map((field, index) => (
                    <div className="input-group" style={(field.name === 'clienteId' && field.name === 'ativo' && field.name === 'dataCadastro') ? { gap: '0' } : {}}>
                        <InputComponent
                            key={index}
                            name={field.name}
                            label={field.label}
                            value={values[field.name]}
                            options={field.options}
                            onChange={handleChange}
                            hidden={field.hidden}
                            {...field.props}
                        />
                    </div>
                ))}
            </div>

            <div className="btn-group">
                <ButtonComponent
                    label={mode === "cadastro" ? "Cadastrar" : "Atualizar"}
                    onClick={async (e) => {
                        await handleSubmit(e, values)
                        await getDados()
                        closeModal()
                    }}
                    className="custom-button"
                    typebtn="small"
                    bgcolor="#107A3A"
                />

                <ButtonComponent
                    label="Cancelar"
                    onClick={() => closeModal()}
                    className="custom-button"
                    typebtn="small"
                    bgcolor="#D80000"
                />
            </div>
        </S.Container>
    );
};

export default FormComponent;