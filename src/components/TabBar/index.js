import React from 'react';
import ContactsIcon from '../../assets/icons/contacts.svg';
import CalendarIcon from '../../assets/icons/calendar.svg';
import NotificationIcon from '../../assets/icons/notification.svg';
import SettingsIcon from '../../assets/icons/settings.svg';

import * as S from './styled';

const TabBar = () => {
  return (
    <S.Container>
      <S.Button>
        <ContactsIcon />
      </S.Button>
      <S.Button>
        <CalendarIcon />
      </S.Button>
      <S.Button>
        <NotificationIcon />
      </S.Button>
      <S.Button>
        <SettingsIcon />
      </S.Button>
    </S.Container>
  );
};

export default TabBar;
