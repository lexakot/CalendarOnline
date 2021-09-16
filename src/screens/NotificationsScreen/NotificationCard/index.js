import React from 'react';
import moment from 'moment';
import {ClockIcon} from '../../../assets/icons';

import * as S from './styled';

const NotificationCard = ({notification}) => {
  return (
    <S.Container>
      <S.Tint />
      <S.InfoContainer>
        <S.Title>{notification.Name}</S.Title>
        <S.DescriptionText>{notification.Description}</S.DescriptionText>
        <S.BottomContainer>
          <S.DateContainer>
            <ClockIcon />
            <S.TimeContainer>
              <S.Date>
                {moment(notification.StartDate).format('DD MMM, dd')}
              </S.Date>
              <S.Time>
                {moment(notification.StartDate).format('HH.mm')} -{' '}
                {moment(notification.EndDate).format('HH.mm')}
              </S.Time>
            </S.TimeContainer>
          </S.DateContainer>
          <S.ButtonsContainer>
            <S.AcceptButton />
            <S.DeclineButton />
          </S.ButtonsContainer>
        </S.BottomContainer>
      </S.InfoContainer>
    </S.Container>
  );
};

export default NotificationCard;
