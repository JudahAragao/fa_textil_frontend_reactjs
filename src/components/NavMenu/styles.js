import styled from "styled-components";
import { FaBell } from "react-icons/fa";

export const Container = styled.div`

    width: 100%;
    height: 60px;
    background-color: #EBEBEB;
    display: flex;
    align-items: center;

    div.logo {
        width: 50%;
        display: flex;
        
        img {
            margin-left: 58px;
            cursor: pointer;
        }
    }

    div.bell-profile {
        width: 50%;
        display: flex;
        justify-content: flex-end;

        img {
            cursor: pointer;
            margin-right: 58px;
        }
    }

`

export const NotificationIcon = styled(FaBell)`
    color: #10317A;
    font-size: 36px;
    margin-right: 25px;
`