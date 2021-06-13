import styled from 'styled-components';

export const Container = styled.TouchableOpacity`
  width: 100%;
  height: 74px;
  margin-bottom: 15px;
  border: 1px solid rgba(22, 36, 61, 0.1);
  border-radius: 8px;
  padding: 0 16px 0 24px;
  justify-content: center;
`;

export const EventColor = styled.View`
  position: absolute;
  left: 0;
  height: 58px;
  width: 8px;
  top: 8px;
  bottom: 8px;
  background-color: ${({color}) => (color ? color : 'red')};
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
`;

export const Name = styled.Text`
  font-weight: bold;
  font-size: 18px;
  color: #16243D;
`;

export const Time = styled.Text`
  font-size: 16px;
  color: #16243D;
  margin-top: 3px;
`;
