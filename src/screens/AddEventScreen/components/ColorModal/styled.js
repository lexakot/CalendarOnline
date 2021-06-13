import styled from 'styled-components';

export const ColorsRow = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: center;
  margin-top: 24px;
`;

export const ColorBox = styled.TouchableOpacity`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  margin: 0 12px;
  background-color: ${({color}) => color};
`;
