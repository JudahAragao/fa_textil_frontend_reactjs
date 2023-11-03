import React from 'react';

import * as S from './styles'

function InputComponent({ name, type, label, placeholder, value, onChange }) {

  return (
    <S.Container>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        name={name}
        type={type || 'text'}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
      />
    </S.Container>
  );
}

export default InputComponent;