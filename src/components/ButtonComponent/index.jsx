import React from 'react';

import * as S from './styles'

function ButtonComponent({ label, onClick, className, bgcolor, typebtn}) {
    return <S.Button className={className} onClick={onClick} bgcolor={bgcolor} typebtn={typebtn}>
        {label}
    </S.Button>
}

export default ButtonComponent;