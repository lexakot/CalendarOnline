import React from 'react';

import moment from 'moment';
import TopBar from '../../components/TopBar';

import {
  ClockIcon,
  DescriptionIcon,
  ContactsIcon,
  RepeatIcon,
  BellColorIcon,
  PlusColorIcon,
  HelpIcon,
} from '../../assets/icons';

import * as S from './styled';

const statuses = {
  None: <HelpIcon />,
};

const ViewEventScreen = ({route}) => {
  const {
    params: {event},
  } = route;
  console.log('event', event);
  return (
    <S.Container>
      <TopBar title="Событие" withBackButton />
      <S.Content>
        <S.TitleRow>
          <S.Name>{event.Name}</S.Name>
          <S.ColorBox color={event.Color} />
        </S.TitleRow>
        <S.TimeRow>
          <S.TimeInfoContainer>
            <ClockIcon />
            <S.TimeContainer>
              <S.Date>{moment(event.StartDate).format('D MMMM, dddd')}</S.Date>
              <S.Time>
                {moment(event.StartDate).format('HH.mm')} -{' '}
                {moment(event.EndDate).format('HH.mm')}
              </S.Time>
            </S.TimeContainer>
          </S.TimeInfoContainer>
          <S.TimeActionsContainer>
            <S.TouchableIcon>
              <RepeatIcon />
            </S.TouchableIcon>
            <S.TouchableIcon>
              <BellColorIcon />
            </S.TouchableIcon>
          </S.TimeActionsContainer>
        </S.TimeRow>
        <S.InfoRow>
          <DescriptionIcon />
          <S.BorderedRow>
            <S.Label>{event.Description}</S.Label>
          </S.BorderedRow>
        </S.InfoRow>
        <S.InfoRow>
          <ContactsIcon width={20} height={20} />
          <S.BorderedRow style={{paddingRight: 32}}>
            <S.ContactContainer>
              {/* {event.Invites.map(c => (
                <>
                  <S.Label style={{marginHorizontal: 10}}>Вероника</S.Label>
                  {statuses[c.Status]}
                </>
              ))} */}
            </S.ContactContainer>
            <S.TouchableIcon>
              <PlusColorIcon />
            </S.TouchableIcon>
          </S.BorderedRow>
        </S.InfoRow>
      </S.Content>
    </S.Container>
  );
};

export default ViewEventScreen;
