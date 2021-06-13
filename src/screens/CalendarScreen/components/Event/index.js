import React from 'react';
import moment from 'moment';
import * as S from './styled';

const Event = ({event}) => {
  return (
    <S.Container>
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
