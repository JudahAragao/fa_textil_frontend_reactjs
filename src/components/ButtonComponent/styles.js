import styled from "styled-components";

export const Button = styled.button`

    background: ${props => props.bgcolor};
    ${props => props.typebtn === 'small' && `
        width: 170; 
        height: 30px;
        padding: 5px 24px;
    `}

    ${props => props.typebtn === 'large' && `
        width: calc(100% - 40px);
        height: 35px;
        padding: 5px 10px;
    `}
    margin: 10px 20px;
    border-radius: 10px;
    border: none;
    color: white;
    font-weight: 700;
    font-size: 16px;
    cursor: pointer;

`