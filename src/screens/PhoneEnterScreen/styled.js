import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 28px;
`;

export const InputContainer = styled.View`
  margin-top: 40px;
  width: 100%;
  flex-direction: row;
  justify-content: center;
`;

export const CountryPicker = styled.TouchableOpacity`
  border-bottom-width: 1px;
  padding-bottom: 8px;
  border-color: 'rgba(22,36,61, 0.1)';
  justify-content: flex-end;
`;

export const InputText = styled.Text`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  color: #16243d;
`;

export const CodeInput = styled.View`
  border-bottom-width: 1px;
  padding-bottom: 8px;
  border-color: 'rgba(22,36,61, 0.1)';
  margin-left: 8px;
  justify-content: flex-end;
`;

export const PhoneInput = styled.TextInput`
  border-bottom-width: 1px;
  border-color: 'rgba(22,36,61, 0.1)';
  margin-left: 8px;
  padding-bottom: 8px;
  width: 128px;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  color: #16243d;
  justify-content: flex-end;
`;

export const ButtonsContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 50px;
`;

export const Button = styled.TouchableOpacity``;

export const ButtonText = styled.Text`
  color: #4A70BF;
  font-weight: 700;
`;
