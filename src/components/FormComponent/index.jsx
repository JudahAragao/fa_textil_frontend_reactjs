import React from "react";
import InputComponent from '../../components/InputComponent'

import * as S from './styles'
import ButtonComponent from "../ButtonComponent";
import { useApiRequestContext } from "../../context/ApiRequestContextProvider";

const FormComponent = ({ fields, ...otherProps }) => {

    const {
        mode,
        values,
        handleChange,
        getDados,
        handleSubmit,
        closeModal
    } = useApiRequestContext()

    return (
        <S.Container>

            <div className="inputs-group">
                {fields.map((field, index) => (
                    <div className="input-group" style={(field.name === 'clienteId' || field.name === 'ativo' || field.name === 'dataCadastro') ? { gap: '0' } : {}}>
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