import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  width: 100%;
`;

export const TabsContainer = styled.View`
  flex-direction: row;
  align-self: center;
  margin-top: 24px;
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

export const SearchInputContainer = styled.View`
  width: 100%;
  padding: 0 28px;
  margin-top: 24px;
  margin-bottom: 8px;
  align-items: center;
  justify-content: center;
`;

export const SearchInput = styled.TextInput`
  width: 100%;
  align-self: center;
  height: 32px;
  background-color: rgba(22, 36, 61, 0.1);
  border-radius: 8px;
  font-size: 14px;
  line-height: 14px;
  padding: 0 0 0 40px;
`;

export const SearchIconContainer = styled.View`
  position: absolute;
  left: 40px;
`;

export const ListContacts = styled.ScrollView`
  padding: 0 28px;
`;

export const ContactContainer = styled.TouchableOpacity`
  width: 100%;
  height: 51px;
  flex-direction: row;
  border-bottom-width: 1px;
  border-color: rgba(22, 36, 61, 0.1);
  margin-top: 16px;
`;

export const ContactAvatar = styled.Image`
  width: 32px;
  height: 32px;
  background-color: rgba(74, 112, 191, 0.15);
  border-radius: 32px;
  margin-right: 16px;
  align-self: center;
`;

export const ContactInfoContainer = styled.View``;

export const ContactNameContainer = styled.View`
  flex-direction: row;
`;

export const ContactLastname = styled.Text`
  color: #16243D;
  font-weight: bold;
  font-size: 16px;
`;

export const ContactFirstname = styled.Text`
  font-size: 16px;
`;

export const ContactNumber = styled.Text`
  color: rgba(22, 36, 61, 0.5);
  font-size: 14px;
`;

export const BookingButton = styled.View`
  position: absolute;
  right: 0;
  align-self: center;
  width: 20px;
  height: 20px;
  border: 1px solid #E8E9EC;
  border-radius: 20px;
  background-color: ${({isChecked}) => isChecked ? '#4A70BF' : 'transparent'};
  align-items: center;
  justify-content: center;
`;

export const BookingText = styled.Text`
  color: #4A70BF;
  font-size: 14px;
  font-weight: 600;
  margin-right: 5px;
`;

export const ErrorText = styled.Text`
  text-align: center;
`;
