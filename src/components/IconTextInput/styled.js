import styled from 'styled-components';

export const Container = styled.View`
  flex-direction: row;
  margin-left: 20px;
  align-items: center;
  border-bottom-width: 1px;
  border-color: rgba(22, 36, 61, 0.1);
`;

export const Input = styled.TextInput`
  width: 100%;
  margin-left: 15px;
`;

export const TouchableContainer = styled.TouchableOpacity`
  height: 50px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-left: 15px;
  width: 100%;
  padding-left: 4px;
`;

export const Label = styled.Text`
  color: #16243D;
  font-size: 14px;
`;
