import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 28px;
`;

export const CodeInput = styled.TextInput`
  border-bottom-width: 1px;
  padding-bottom: 8px;
  border-color: ${({error}) =>
    !error ? 'rgba(22,36,61, 0.1)' : 'rgba(242, 84, 73, 0.5)'};
  margin-left: 8px;
  width: 108px;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  color: #16243d;
`;

export const ErrorText = styled.Text`
  margin-top: 16px;
  color: #f25449;
  font-size: 14px;
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

export const ResendText = styled.Text`
  color: #4a70bf;
  font-size: 14px;
`;
