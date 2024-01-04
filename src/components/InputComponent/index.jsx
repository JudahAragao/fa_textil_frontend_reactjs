import React from 'react';

import * as S from './styles'

function InputComponent({ name, label, value, onChange, margin, type = 'text', placeholder }) {

  return (
    <S.Container margin={margin}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </S.Container>
  );
}

export default InputComponent;