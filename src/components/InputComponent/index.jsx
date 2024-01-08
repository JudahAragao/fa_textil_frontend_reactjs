import React from 'react';

import * as S from './styles'

function InputComponent({ name, label, value, onChange, margin, type = 'text', placeholder, options }) {
  const isSelect = type === 'select';

  return (
    <S.Container margin={margin}>
      {label && <label htmlFor={name}>{label}</label>}
      {isSelect ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
        >
          {options && options.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}
    </S.Container>
  );
}

export default InputComponent;