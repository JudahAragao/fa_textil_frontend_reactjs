import React, { useEffect, useState } from "react";

import * as S from './styles'
import { NavLink, useLocation } from "react-router-dom/cjs/react-router-dom.min";

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
        route: '/orcamento',
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
    const location = useLocation();

    const handleClickLink = (index) => {
        setActiveItem(index);
    };

    useEffect(() => {
        // Encontrar o índice do link cuja rota coincide com a rota atual
        const foundIndex = links.findIndex((link) => link.route === location.pathname);

        // Atualizar o estado apenas se encontrarmos a correspondência
        if (foundIndex !== -1) {
            setActiveItem(foundIndex);
        }
    }, [location.pathname]);

    return <S.Container>
        <ul>
            {links.map((link, index) => (
                <li key={index} onClick={() => handleClickLink(index)} className={index === activeItem ? "active" : ""}>
                    <NavLink to={link.route} activeClassName="active">
                        {link.icon}
                        {link.name}
                    </NavLink>
                </li>
            ))}
        </ul>
    </S.Container>
}

export default MenuSidebar