import React, { useState } from "react";

import * as S from './styles'
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const links = [
    {
        route: '/dashboard',
        icon: <S.DashboardIcon />,
        name: 'Dashboard'
    },
    {
        route: '/fabricacao',
        icon: <S.FabricacaoIcon />,
        name: 'Fabricação'
    },
    {
        route: '/clientes',
        icon: <S.ClientesIcon />,
        name: 'Clientes'
    },
    {
        route: '/funcionarios',
        icon: <S.FuncionariosIcon />,
        name: 'Funcionários'
    },
    {
        route: '/pedidosvenda',
        icon: <S.PedidoVendaIcon />,
        name: 'Pedidos Venda'
    },
    {
        route: '/orçamento',
        icon: <S.OrcamentosIcon />,
        name: 'Orçamentos'
    },
    {
        route: '/produtos',
        icon: <S.ProdutosIcon />,
        name: 'Produtos'
    }
]

const MenuSidebar = () => {
    const [activeItem, setActiveItem] = useState(0);


    const handleClickLink = (index) => {
        setActiveItem(index);
    };

    return <S.Container>
        <ul>
            {
                links.map((link, index) => (
                    <li key={index} onClick={()=>handleClickLink(index)} className={index === activeItem ? "active" : ""}>
                        <Link to={link.route}>{link.icon}{link.name}</Link>
                    </li>
                ))
            }
        </ul>
    </S.Container>
}

export default MenuSidebar