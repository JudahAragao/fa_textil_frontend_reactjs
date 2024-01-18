import styled from "styled-components";

export const Container = styled.div`

    display: flex;
    flex-direction: column;

    label {
        margin: ${props => props.margin === 'm-lg' ? '10px 0 0 20px' : props.margin === 'm-sm' && '10px 0 0 0'};
        color: #10317A;
        font-size: 16px;
        font-weight: 700;
    }

    input, select {

        ${
            props => props.margin?
            `
                width: ${props => props.margin === 'm-lg' ? 'calc(100% - 40px)' : props.margin === 'm-sm' && '100%'};
                height: 35px;`
            : `
                max-width: 550px;
                min-width: 450px;
            `
        }
        height: 35px;
        padding: 5px 10px;
        margin: ${props => props.margin === 'm-lg' ? '10px 20px' : props.margin === 'm-sm' && '5px 0'};
        background-color: #CBD1DC;
        box-sizing: border-box;
        border-radius: 10px;
        border: none;
        outline: none;
    }

    input[name="clienteId"], input[name="ativo"], input[name="dataCadastro"] {
        display: none;
    }
`