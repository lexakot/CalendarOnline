import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  background-color: white;
`;

export const MainContainer = styled.View`
  margin-top: 100px;
`;

export const NameInfoContainer = styled.View`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`;

export const AvatarContainer = styled.View`
  width: 30%;
  border-bottom-width: 1px;
  border-color: rgba(22, 36, 61, 0.1);
  justify-content: center;
  align-items: center;
`;

export const NameContainer = styled.View`
  width: 70%;
`;

export const Avatar = styled.TouchableOpacity`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  background-color: red;
`;

export const ButtonContainer = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`;

export const LogoutButton = styled.TouchableOpacity`
  width: 319px;
  height: 40px;
  border: 1px solid #16243d;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text``;
