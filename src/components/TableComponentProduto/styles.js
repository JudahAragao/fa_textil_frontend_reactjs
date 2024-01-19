import styled from "styled-components";

export const Button = styled.button`
    width: 30px;
    height: 30px;
    border-radius: 5px;
    background: ${props => props.bg};
    color: white;
    border: none;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    transition-duration: 0.4s;

    &:nth-child(1) {
        margin-right: 5px;
    }

    &:nth-child(2) {
        margin-left: 5px;
    }

    &:hover {
        background: ${props => props.bgHover};
    }
`;