import React from 'react';
import moment from 'moment';
import {
  ClockIcon,
  Declined,
  Accepted,
  Decline,
  Accept,
} from '../../../assets/icons';

import * as S from './styled';
import {Fragment} from 'react';

const NotificationCard = ({notification, onAcceptInvite, onDeclineInvite}) => {
  const getNotificationStatus = () => {
    if (notification.InviteStatus === 'Accepted') {
      return null;
    }
    if (notification.InviteStatus === 'Declined') {
      return null;
    }
    return (
      <Fragment>
        <S.AcceptButton onPress={() => onAcceptInvite(notification.InviteId)}>
          <Accept />
        </S.AcceptButton>
        <S.DeclineButton onPress={() => onDeclineInvite(notification.InviteId)}>
          <Decline />
        </S.DeclineButton>
      </Fragment>
    );
  };

  const renderStatus = () => {
    if (notification.InviteStatus === 'Accepted') {
      return (
        <S.IconContainer>
          <Accepted />
        </S.IconContainer>
      );
    }
    if (notification.InviteStatus === 'Declined') {
      return (
        <S.IconContainer>
          <Declined />
        </S.IconContainer>
      );
    }
    return null;
  };

  return (
    <S.Container>
      <S.Tint
        notDisplayed={
          notification.InviteStatus === 'Accepted' ||
          notification.InviteStatus === 'Declined'
        }
      />
      <S.InfoContainer>
        <S.Title>{notification.Name}</S.Title>
        {renderStatus()}
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
          <S.ButtonsContainer>{getNotificationStatus()}</S.ButtonsContainer>
        </S.BottomContainer>
      </S.InfoContainer>
    </S.Container>
  );
};

export default NotificationCard;
