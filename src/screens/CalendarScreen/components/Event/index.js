import React from 'react';
import moment from 'moment';
import * as S from './styled';
import {useNavigation} from '@react-navigation/native';

const Event = ({event}) => {
  const navigation = useNavigation();
  const onPress = () =>
    navigation.navigate('ViewEvent', {
      event,
    });
  return (
    <S.Container onPress={onPress}>
      <S.EventColor color={event.Color} />
      <S.Name>{event.Name}</S.Name>
      <S.Time>
        {moment(event.StartDate).format('HH:mm')} -{' '}
        {moment(event.EndDate).format('HH:mm')}
      </S.Time>
    </S.Container>
  );
};

export default Event;
