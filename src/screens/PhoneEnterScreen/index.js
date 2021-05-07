import React from 'react';
import {Title, SubTitle} from '../../components/common';
import TopBar from '../../components/TopBar';

import * as S from './styled';
const PhoneEnterScreen = () => {
  return (
    <>
      <TopBar />
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
          <S.PhoneInput keyboardType="phone-pad" />
        </S.InputContainer>
      </S.Container>
    </>
  );
};

export default PhoneEnterScreen;
