import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  background-color: white;
`;

export const TitleContainer = styled.View`
  align-items: center;
  padding: 0 20px;
  margin-bottom: 40px;
`;

export const MainContainer = styled.View`
  margin-top: 100px;
  padding-right: 24px;
  padding-left: 24px;
  flex: 1;
  justify-content: center;
  padding-bottom: 40px;
`;

export const NameInfoContainer = styled.View`
  display: flex;
  flex-direction: row;
`;

export const NameContainer = styled.View`
  width: 100%;
`;

export const ButtonsContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 50px;
`;

export const Button = styled.TouchableOpacity``;

export const ButtonText = styled.Text`
  color: #4a70bf;
  font-weight: 700;
`;
