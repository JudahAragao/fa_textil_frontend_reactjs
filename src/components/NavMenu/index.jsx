import React from "react";

import * as S from './styles'
import logoHorizontal from '../../assets/img/logo-horizontal.png'
import profile from '../../assets/img/profile.png'

const NavMenu = () => {
    return <S.Container>
        <div className="logo">
            <img src={logoHorizontal} alt="Logo Horizontal" />
        </div>
        <div className="bell-profile">
            <S.NotificationIcon />
            <img src={profile} alt="Profile" />
        </div>
    </S.Container>
}

export default NavMenu