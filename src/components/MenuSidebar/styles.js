import styled from "styled-components";

import { LuMountainSnow } from "react-icons/lu";
import { PiGear } from "react-icons/pi";
import { GoPeople } from "react-icons/go";
import { BsPersonGear } from "react-icons/bs";
import { LuBellRing } from "react-icons/lu";
import { LuCalculator } from "react-icons/lu";
import { LuPackageSearch } from "react-icons/lu";

export const Container = styled.div`

    width: 240px;
    height: calc(100vh - 60px);
    background-color: #EBEBEB;

    ul {
        padding: 0;
        margin-top: 60px;
    }

    li {
        height: 50px;
        font-family: Jaldi;
        font-size: 20px;
        font-weight: bold;
        display: flex;
        align-items: center;
    }

    li.active {
        background: linear-gradient(
        89deg,
        #10317a -7.34%,
        #0065ba 52.69%,
        #ff6e00 109.09%
        );

        a {
            color: white;

            svg {
                color: white;
            }
        }
    }

    a {
        text-decoration: none;
        color: #10317A;
        margin-left: 27px;
        display: flex;
        align-items: center;
    }

`
const styledIcons = `
    color: #10317A;
    font-size: 26px;
    margin-right: 15px;
`

export const DashboardIcon = styled(LuMountainSnow)`
    ${styledIcons}
`
export const FabricacaoIcon = styled(PiGear)`
    ${styledIcons}
`
export const ClientesIcon = styled(GoPeople)`
    ${styledIcons}
`
export const FuncionariosIcon = styled(BsPersonGear)`
    ${styledIcons}
`
export const PedidoVendaIcon = styled(LuBellRing)`
    ${styledIcons}
`
export const OrcamentosIcon = styled(LuCalculator)`
    ${styledIcons}
`
export const ProdutosIcon = styled(LuPackageSearch)`
    ${styledIcons}
`
