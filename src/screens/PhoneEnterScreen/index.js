import React from 'react';
import {Keyboard} from 'react-native';

import {Title, SubTitle} from '../../components/common';
import TopBar from '../../components/TopBar';

import * as S from './styled';

const PhoneEnterScreen = ({navigation}) => {
  const [keyboardShow, setKeyboardShow] = React.useState(false);
  const [phone, setPhone] = React.useState('');

  React.useEffect(() => {
    Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    return () => {
      Keyboard.removeListener('keyboardDidShow', keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', keyboardDidHide);
    };
  }, []);

  const keyboardDidHide = () => setKeyboardShow(false);
  const keyboardDidShow = () => setKeyboardShow(true);

  const goToCodeConfirm = () => {
    if (phone.length === 9) {
      navigation.navigate('CodeConfirm');
    }
  };

  return (
    <>
      {!keyboardShow && <TopBar title="Online calendar" />}
      <S.Container>
        <Title>Ваш телефон</Title>
        <SubTitle>
          Пожалуйста, укажите код своей страны и введите номер своего телефона.
        </SubTitle>
        <S.InputContainer>
          <S.CountryPicker>
            <S.InputText>Беларусь</S.InputText>
          </S.CountryPicker>
          <S.CodeInput>
            <S.InputText>+375</S.InputText>
          </S.CodeInput>
          <S.PhoneInput
            onChangeText={text => setPhone(text)}
            value={phone}
            maxLength={9}
            keyboardType="phone-pad"
          />
        </S.InputContainer>
        <S.ButtonsContainer>
          <S.Button onPress={goToCodeConfirm}>
            <S.ButtonText>Далее</S.ButtonText>
          </S.Button>
        </S.ButtonsContainer>
      </S.Container>
    </>
  );
};

export default PhoneEnterScreen;
