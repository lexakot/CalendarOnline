import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  background-color: white;
`;

export const TabsContainer = styled.View`
  flex-direction: row;
  margin-top: 120px;
  align-self: center;
`;

export const Tab = styled.TouchableOpacity`
  width: 80px;
  border-bottom-width: 2px;
  border-color: ${({isSelected}) => isSelected ? '#4A70BF' : 'rgba(22, 36, 61, 0.1)'};
  padding-bottom: 4px;
`;

export const TabText = styled.Text`
  color: ${({isSelected}) => isSelected ? '#4A70BF' : 'rgba(22, 36, 61, 0.4)'};
  font-weight: 600;
  font-size: 14px;
  text-align: center;
`;
