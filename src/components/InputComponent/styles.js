import styled from "styled-components";

export const Container = styled.div`

    display: flex;
    flex-direction: column;

    label {
        margin: 10px 0 0 20px;
        color: #10317A;
        font-size: 16px;
        font-weight: 700;
    }

    input {
        width: calc(100% - 40px);
        height: 35px;
        padding: 5px 10px;
        margin: 10px 20px;
        background-color: #CBD1DC;
        box-sizing: border-box;
        border-radius: 10px;
        border: none;
        outline: none;
    }

`