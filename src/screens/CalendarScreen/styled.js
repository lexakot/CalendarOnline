import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  background-color: #4A70BF;
`;

export const TopHandle = styled.View`
  width: 32px;
  height: 2px;
  background-color: #16243D;
  align-self: center;
  border-radius: 2px;
  opacity: 0.1;
  margin-top: 8px;
`;

export const AddButton = styled.TouchableOpacity`
  width: 44px;
  height: 44px;
  background-color: #4A70BF;
  position: absolute;
  bottom: 28px;
  right: 28px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;
