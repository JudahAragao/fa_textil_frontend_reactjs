import React from "react";

import * as S from './styles'
import logoHorizontal from '../../assets/img/logo-horizontal.png'
import profile from '../../assets/img/profile.png'
import { useAuth } from "../../context/AuthContext";

const NavMenu = () => {

    const { logout } = useAuth()

    return <S.Container>
        <div className="logo">
            <img src={logoHorizontal} alt="Logo Horizontal" />
        </div>
        <div className="bell-profile" onClick={logout}>
            <S.NotificationIcon />
            <img src={profile} alt="Profile" />
        </div>
    </S.Container>
}

export default NavMenu