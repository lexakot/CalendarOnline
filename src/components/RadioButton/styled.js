import styled from 'styled-components';

export const Container = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const Label = styled.Text`
  color: #16243D;
  font-size: 16px;
`;

export const DotContainer = styled.View`
  width: 20px;
  height: 20px;
  padding: 3px;
  border-radius: 20px;
  border: 1px solid rgba(22, 36, 61, 0.2);
`;

export const Dot = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${({isActive}) => (isActive ? '#4A70BF' : 'white')};
  border-radius: 20px;
`;
