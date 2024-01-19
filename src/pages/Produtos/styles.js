import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: calc(100vh -60px);
    display: flex;
    margin: 25px 65px;
    flex-direction: column;
`

// Cabeçalho da página
export const HeaderContainer = styled.div`
    height: 100px;
    display: flex;
    flex-direction: column;
`

// Conteudo dos status
export const StatusContent = styled.div`
    height: 140px;
    display: flex;

    div.status {
        height: 140px;
        width: 200px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0 13px 0 13px;
        font-family: Roboto;
        border-radius: 10px;
        color: white;

        p {
            font-size: 20px;
            margin: 0;
            font-weight: bold;
        }

        h4 {
            font-size: 80px;
            margin: 0;
            font-weight: bolder;
        }
    }

    div.status:nth-child(1) {
        margin-left: 0;
    }

    div.status:last-child {
        margin-right: 0;
    }
`

// Contaudo Botão
export const BtnContent = styled.div`
    display: flex;
    justify-content: flex-end;

    button {
        margin: 0 0 20px 0;
    }
`


//Corpo da página
export const BodyContainer = styled.div`
    width: 100%;
`