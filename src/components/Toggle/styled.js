import styled from 'styled-components';

export const Container = styled.TouchableOpacity`
  width: 36px;
  height: 20px;
  background-color: ${({isActive}) => isActive ? 'rgba(74, 112, 191, 0.9)' : 'rgba(22, 36, 61, 0.15)'};
  border-radius: 8px;
  justify-content: center;
`;

export const Round = styled.View`
  width: 16px;
  height: 16px;
  background: #FFFFFF;
  border-radius: 16px;
  position: absolute;
`;
