import styled from 'styled-components';

export const Container = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 96px;
  background: #4a70bf;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  justify-content: flex-end;
  padding-bottom: 20px;
  align-items: center;
`;

export const Title = styled.Text`
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  text-align: center;
  color: #ffffff;
`;

export const BackButton = styled.TouchableOpacity`
  width: 28px;
  z-index: 1111;
  height: 28px;
  left: 20px;
  bottom: 20px;
  justify-content: center;
  align-items: center;
  position: absolute;
`;

export const RightButton = styled.TouchableOpacity`
  width: 28px;
  z-index: 1111;
  height: 28px;
  right: 20px;
  bottom: 20px;
  justify-content: center;
  align-items: center;
  position: absolute;
`;
