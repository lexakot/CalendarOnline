import styled from 'styled-components';

export const RadioButtonContainer = styled.View`
  padding: 18px 28px;
  width: 100%;
  border-bottom-width: 1px;
  border-color: ${({withoutBorder}) => withoutBorder ? 'rgba(22, 36, 61, 0)' : 'rgba(22, 36, 61, 0.1)'};
`;
