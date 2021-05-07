import React from 'react';
import {Title, SubTitle} from '../../components/common';
import TopBar from '../../components/TopBar';

import * as S from './styled';

const CodeConfirmScreen = () => {
  return (
    <>
      <TopBar />
      <S.Container>
        <Title>SMS-подтверждение</Title>
        <SubTitle>
          Мы отправили на ваш номер SMS с кодом подтверждения. Введите его в
          поле ниже.
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

export default CodeConfirmScreen;
