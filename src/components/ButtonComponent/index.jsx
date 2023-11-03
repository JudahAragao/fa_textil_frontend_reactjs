import React from 'react';

import * as S from './styles'

function ButtonComponent({ label, onClick, className, bgcolor }) {
    return <S.Button className={className} onClick={onClick} bgcolor={bgcolor}>
        {label}
    </S.Button>
}

export default ButtonComponent;