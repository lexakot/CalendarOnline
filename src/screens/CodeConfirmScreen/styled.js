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
`;

export const InputText = styled.Text`
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  color: #16243d;
`;

export const CodeInput = styled.View`
  border-bottom-width: 1px;
  padding-bottom: 8px;
  border-color: 'rgba(22,36,61, 0.1)';
  margin-left: 8px;
`;

export const PhoneInput = styled.TextInput`
  border-bottom-width: 1px;
  padding-bottom: 8px;
  border-color: 'rgba(22,36,61, 0.1)';
  margin-left: 8px;
  width: 128px;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  color: #16243d;
`;
