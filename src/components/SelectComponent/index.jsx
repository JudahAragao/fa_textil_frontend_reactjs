import React from "react";

import * as S from './styles'

const SelectComponent = ({ options, ...props }) => {
    return <S.Container {...props}>
        {
            options.map(option => (
                <S.Option key={option.value} value={option.value}>
                    {option.label}
                </S.Option>
            ))
        }
    </S.Container>
}

export default SelectComponent