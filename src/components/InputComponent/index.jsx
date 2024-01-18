import React from 'react';

import * as S from './styles'

function InputComponent({
  name,
  label,
  value,
  onChange,
  margin,
  type = 'text',
  placeholder,
  options,
  hidden
}) {
  return (
    <S.Container margin={margin}>
      {label && name !== 'clienteId' && name !== 'ativo' && name !== 'dataCadastro' && <label htmlFor={name}>{label}</label>}
      {options ? (
        <select id={name} name={name} value={value} onChange={onChange}>
          <option key={0} value=''>
            Selecione uma opção
          </option>
          {options &&
            options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.nome}
              </option>
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
