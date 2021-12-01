import React, {useEffect, useState} from 'react';
import IconTextInput from '../../components/IconTextInput';
import TextInput from '../../components/TextInput';
import TopBar from '../../components/TopBar';

import * as S from './styled';

import {Gift, OkIcon} from '../../assets/icons';
import {useDispatch, useSelector} from 'react-redux';
import http from '../../services/http/api';
import {getProfileRequest, logoutRequest} from '../../redux/auth';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const [info, setInfo] = useState({});
  const userData = useSelector(state => state.auth.userData);

  useEffect(() => {
    setInfo(userData);
  }, [userData]);

  const onInputChange = (value, type) => {
    setInfo({
      ...info,
      [type]: value,
    });
  };

  const onSave = async () => {
    try {
      await http.post('/api/Profile/save', info);
      dispatch(getProfileRequest());
    } catch (err) {
      console.log('err', err);
    }
  };

  return (
    <S.Container>
      <TopBar
        withRightButton
        renderRightButton={() => <OkIcon />}
        onRightButtonPress={onSave}
        title="Профиль"
      />
      <S.MainContainer>
        <S.NameInfoContainer>
          <S.AvatarContainer>
            <S.Avatar />
          </S.AvatarContainer>
          <S.NameContainer>
            <TextInput
              onInputChange={value => onInputChange(value, 'FirstName')}
              value={info.FirstName}
              placeholder="Имя"
            />
            <TextInput
              onInputChange={value => onInputChange(value, 'LastName')}
              value={info.LastName}
              placeholder="Фамилия"
            />
          </S.NameContainer>
        </S.NameInfoContainer>
        {/* <IconTextInput placeholder="Номер телефона" icon={<Phone />} /> */}
        <IconTextInput
          isTouchable
          placeholder="Дата рождения"
          icon={<Gift />}
        />
        <S.ButtonContainer>
          <S.LogoutButton onPress={() => dispatch(logoutRequest())}>
            <S.ButtonText>Выйти</S.ButtonText>
          </S.LogoutButton>
        </S.ButtonContainer>
      </S.MainContainer>
    </S.Container>
  );
};

export default ProfileScreen;
