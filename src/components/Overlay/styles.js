import styled from "styled-components";

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: rgba(30, 90, 223, 0.50);
    backdrop-filter: blur(2px);
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
`

export const ContainerModel = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #EBEBEB;
    border-radius: 15px;
    padding: 38px;
`

export const ModelHeader = styled.div`
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: flex-end;

    button {
        height: 30px;
        width: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        border: none;
        box-sizing: border-box;
        background-color: transparent;
        cursor: pointer;

        svg {
            color: #10317A;
            font-size: 34px;
        }
    }    
`

export const ModalBody = styled.div`
    width: 100%;
`