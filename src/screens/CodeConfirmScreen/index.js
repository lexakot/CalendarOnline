import React from 'react';
import {Keyboard, StyleSheet, Text, View} from 'react-native';
import CountDown from 'react-native-countdown-component';
import {connect} from 'react-redux';

import {
  loginRequest,
  codeEnteredSuccess,
  getProfileRequest,
} from '../../redux/auth';

import {Title, SubTitle} from '../../components/common';
import TopBar from '../../components/TopBar';

import * as S from './styled';
import http from '../../services/http/api';

const CodeConfirmScreen = ({
  navigation,
  route,
  code: codeFromStore,
  loginRequest,
  codeEnteredSuccess,
  getProfileRequest,
}) => {
  const [keyboardShow, setKeyboardShow] = React.useState(false);
  const [isResendActive, setResendActive] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [code, setCode] = React.useState('');

  const {phone} = route.params;

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

  const goTabNavigation = async () => {
    if (code !== codeFromStore) {
      setError(true);
      return;
    }
    try {
      await http.get('/api/Profile');
      getProfileRequest();
      codeEnteredSuccess();
    } catch (err) {
      navigation.navigate('Profile');
    }
    setError(false);
  };

  const resendCode = () => {
    loginRequest(phone);
    setError(false);
    setResendActive(false);
  };

  return (
    <>
      {!keyboardShow && <TopBar withBackButton title={`+375 ${phone}`} />}
      <S.Container>
        <Title>SMS-подтверждение</Title>
        <SubTitle>
          Мы отправили на ваш номер SMS с кодом подтверждения. Введите его в
          поле ниже.
        </SubTitle>

        <S.CodeInput
          value={code}
          onChangeText={text => setCode(text)}
          error={error}
          maxLength={6}
          keyboardType="phone-pad"
        />
        {error && <S.ErrorText>Неправильный код подтверждения</S.ErrorText>}
        {!isResendActive ? (
          <>
            <Text style={{...styles.digitTxtStyle, marginTop: 16}}>
              Отправить код повторно
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.digitTxtStyle}>через</Text>
              <CountDown
                until={10}
                onFinish={() => setResendActive(true)}
                size={15}
                digitTxtStyle={styles.digitTxtStyle}
                digitStyle={styles.digitStyle}
                timeToShow={['S']}
                timeLabelStyle={styles.labelTxtStyle}
                timeLabels={{s: ''}}
              />
              <Text style={styles.digitTxtStyle}>сек.</Text>
            </View>
          </>
        ) : (
          <S.Button onPress={resendCode} style={{marginTop: 16}}>
            <S.ResendText>Отправить код повторно</S.ResendText>
          </S.Button>
        )}
        <S.ButtonsContainer>
          <S.Button onPress={goTabNavigation}>
            <S.ButtonText>Далее</S.ButtonText>
          </S.Button>
        </S.ButtonsContainer>
      </S.Container>
    </>
  );
};

const styles = StyleSheet.create({
  digitTxtStyle: {
    color: '#16243D',
    fontSize: 14,
    opacity: 0.4,
    fontWeight: '400',
  },
  labelTxtStyle: {
    color: 'blue',
    fontSize: 10,
    fontWeight: '400',
  },
  separatorStyle: {
    color: 'blue',
    fontSize: 15,
    fontWeight: '400',
  },
  digitStyle: {
    marginTop: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    height: 15,
    width: 24,
  },
});

const mapDispatchToProps = {
  loginRequest,
  codeEnteredSuccess,
  getProfileRequest,
};

const mapStateToProps = ({auth}) => ({
  code: auth.code,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CodeConfirmScreen);
