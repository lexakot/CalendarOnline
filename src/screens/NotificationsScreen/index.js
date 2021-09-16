import {useFocusEffect} from '@react-navigation/native';
import React from 'react';
import {FlatList} from 'react-native';

import TopBar from '../../components/TopBar';
import http from '../../services/http/api';
import NotificationCard from './NotificationCard';

import * as S from './styled';

const NotificationsScreen = props => {
  const [tabSelected, setTabSelected] = React.useState(0);
  const [notifications, setNotifications] = React.useState([]);

  React.useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  const getNotifications = React.useCallback(async () => {
    const {data} = await http.get('/api/Invites');
    console.log('data', data);
    setNotifications(data);
  }, []);

  const renderNotificationsList = () => {
    return (
      <FlatList
        data={notifications}
        renderItem={({item, index}) => (
          <NotificationCard notification={item} key={index} />
        )}
        contentContainerStyle={{
          paddingHorizontal: 20,
        }}
      />
    );
  };
  return (
    <S.Container>
      <TopBar title="Уведомления" />
      <S.TabsContainer>
        <S.Tab onPress={() => setTabSelected(0)} isSelected={tabSelected === 0}>
          <S.TabText isSelected={tabSelected === 0}>Контакты</S.TabText>
        </S.Tab>
        <S.Tab onPress={() => setTabSelected(1)} isSelected={tabSelected === 1}>
          <S.TabText isSelected={tabSelected === 1}>Мои</S.TabText>
        </S.Tab>
        <S.Tab onPress={() => setTabSelected(2)} isSelected={tabSelected === 2}>
          <S.TabText isSelected={tabSelected === 2}>Архив</S.TabText>
        </S.Tab>
      </S.TabsContainer>
      {renderNotificationsList()}
    </S.Container>
  );
};

export default NotificationsScreen;
