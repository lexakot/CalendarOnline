import React, {useState} from 'react';
import IconTextInput from '../../components/IconTextInput';
import TextInput from '../../components/TextInput';
import TopBar from '../../components/TopBar';

import * as S from './styled';

import {Gift, OkIcon} from '../../assets/icons';
import http from '../../services/http/api';
import {useDispatch} from 'react-redux';
import {codeEnteredSuccess, getProfileRequest} from '../../redux/auth';
import {SubTitle, Title} from '../../components/common';

const AddProfileInfoScreen = () => {
  const dispatch = useDispatch();

  const [info, setInfo] = useState({
    FirstName: '',
    LastName: '',
    Birthday: '2021-11-28T15:31:39.8067128+03:00',
  });

  const onInputChange = (value, type) => {
    setInfo({
      ...info,
      [type]: value,
    });
  };

  const onSave = async () => {
    try {
      await http.post('/api/Profile/save', info);
      dispatch(codeEnteredSuccess());
      dispatch(getProfileRequest());
    } catch (err) {
      console.log('err', err);
    }
  };

  return (
    <S.Container>
      <TopBar title="Заполните профиль" />
      <S.MainContainer>
        <S.TitleContainer>
          <Title>Ваши данные</Title>
          <SubTitle>
            Как мы и пользователи dSync можем {'\n'} к вам обращаться
          </SubTitle>
        </S.TitleContainer>
        <S.NameInfoContainer>
          <S.NameContainer>
            <TextInput
              onInputChange={value => onInputChange(value, 'FirstName')}
              value={info.FirstName}
              placeholder="Имя"
            />
            <TextInput
              onInputChange={value => onInputChange(value, 'LastName')}
              value={info.LastName}
              placeholder="Фамилия (опционально)"
            />
          </S.NameContainer>
        </S.NameInfoContainer>
        <S.ButtonsContainer>
          <S.Button onPress={onSave}>
            <S.ButtonText>Далее</S.ButtonText>
          </S.Button>
        </S.ButtonsContainer>
      </S.MainContainer>
    </S.Container>
  );
};

export default AddProfileInfoScreen;
