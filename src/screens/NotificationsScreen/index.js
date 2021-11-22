/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {FlatList, ActivityIndicator} from 'react-native';

import TopBar from '../../components/TopBar';
import http from '../../services/http/api';
import NotificationCard from './NotificationCard';

import * as S from './styled';

const NotificationsScreen = props => {
  const [loading, setLoading] = React.useState(false);
  const [tabSelected, setTabSelected] = React.useState(0);
  const [notifications, setNotifications] = React.useState([]);

  React.useEffect(() => {
    getNotifications();
  }, [tabSelected]);

  const getNotifications = async () => {
    console.log('getNotifications')
    let data = [];
    setLoading(true);
    if (tabSelected === 0) {
      const {data: data0} = await http.get('/api/Invites');
      data = data0;
    }

    if (tabSelected === 2) {
      const {data: data2} = await http.get('/api/Invites/history');
      data = data2;
    }
    console.log('data', data);
    setLoading(false);
    setNotifications(data);
  };

  // const getNotifications = React.useCallback(async () => {
  //   let data = [];
  //   setLoading(true);
  //   if (tabSelected === 0) {
  //     const {data: data0} = await http.get('/api/Invites');
  //     data = data0;
  //   }

  //   if (tabSelected === 2) {
  //     const {data: data2} = await http.get('/api/Invites/history');
  //     data = data2;
  //   }
  //   console.log('data', data);
  //   setNotifications(data);
  //   setLoading(false);
  // }, [tabSelected]);

  const onAcceptInvite = async inviteId => {
    const {data} = await http.put(`/api/Invites/${inviteId}/accept`);
    console.log('onAcceptInvite', data);
    getNotifications();
  };

  const onDeclineInvite = async inviteId => {
    const {data} = await http.put(`/api/Invites/${inviteId}/decline`);
    console.log('onDeclineInvite', data);
    getNotifications();
  };

  const renderNotificationsList = () => {
    if (loading) {
      return <ActivityIndicator style={{marginTop: 20}} />;
    } else {
      return (
        <FlatList
          data={notifications}
          renderItem={({item, index}) => (
            <NotificationCard
              onAcceptInvite={onAcceptInvite}
              onDeclineInvite={onDeclineInvite}
              notification={item}
              key={index}
            />
          )}
          contentContainerStyle={{
            paddingHorizontal: 20,
          }}
        />
      );
    }
  };

  console.log('loading', loading);
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
