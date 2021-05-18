import React from 'react';
import ContactsIcon from '../../assets/icons/contacts.svg';
import ContactsActiveIcon from '../../assets/icons/contacts-active.svg';
import CalendarIcon from '../../assets/icons/calendar.svg';
import CalendarActiveIcon from '../../assets/icons/calendar-active.svg';
import NotificationIcon from '../../assets/icons/notification.svg';
import SettingsIcon from '../../assets/icons/settings.svg';

import * as S from './styled';

const config = [
  {
    name: 'Поиск',
    icon: <ContactsIcon />,
    activeIcon: <ContactsActiveIcon />,
    route: 'Contacts',
    id: 0,
  },
  {
    name: 'Мои поездки',
    icon: <CalendarIcon />,
    activeIcon: <CalendarActiveIcon />,
    route: 'Calendar',
    id: 1,
  },
  {
    name: 'Контакты',
    icon: <NotificationIcon />,
    activeIcon: <NotificationIcon />,
    route: 'Contacts',
    id: 2,
  },
  {
    name: 'Профиль',
    icon: <SettingsIcon />,
    activeIcon: <SettingsIcon />,
    route: 'Contacts',
    id: 3,
  },
];

const TabBar = props => {
  async function onRoutePress(route) {
    props.navigation.navigate(route.route);
  }
  return (
    <S.Container>
      {config.map((route, index) => (
        <S.Button onPress={() => onRoutePress(route)}>
          {props.state.index === index && route.icon
            ? route.activeIcon
            : route.icon}
        </S.Button>
      ))}
    </S.Container>
  );
};

export default TabBar;
