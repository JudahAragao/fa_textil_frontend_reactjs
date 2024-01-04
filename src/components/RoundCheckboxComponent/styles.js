import styled from "styled-components";

// Estilos para o checkbox
export const CheckboxContainer = styled.label`
  display: inline-block;
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  color: #10317A;
  font-weight: 600;
  font-size: 20px;
`;

export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  cursor: pointer;
`;

export const StyledCheckbox = styled.div`
  width: 20px;
  height: 20px;
  box-sizing: border-box;
  border: 3px solid #CBD1DC;
  border-radius: 50%;
  transition: background 0.3s;
  margin-right: 10px;

  ${HiddenCheckbox}:checked + & {
    background: #10317A;
  }
`;