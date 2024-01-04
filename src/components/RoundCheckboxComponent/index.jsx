import React from "react";

import * as S from './styles'

const RoundCheckboxComponent = ({ name, checked, onChange, label }) => {
    return <S.CheckboxContainer>
        <S.HiddenCheckbox checked={checked} onChange={(e) => onChange(name, e.target.value)} name={name}/>
        <S.StyledCheckbox />
        {label && <span>{label}</span>}
    </S.CheckboxContainer>
}

export default RoundCheckboxComponent