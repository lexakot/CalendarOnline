import React, {Fragment} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import TabBar from './src/components/TabBar';

import PhoneEnterScreen from './src/screens/PhoneEnterScreen';
import CodeConfirmScreen from './src/screens/CodeConfirmScreen';
import CalendarScreen from './src/screens/CalendarScreen';
import ContactsScreen from './src/screens/ContactsScreen';
import AddEventScreen from './src/screens/AddEventScreen';
import ViewEventScreen from './src/screens/ViewEventScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';

import TokenStorage from './src/services/storage/token';
import { codeEnteredSuccess, getProfileRequest } from './src/redux/auth';
import ProfileScreen from './src/screens/ProfileScreen';
import AddProfileInfoScreen from './src/screens/AddProfileInfoScreen';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

console.disableYellowBox = true;

const TabsNavigation = () => {
  return (
    <Tabs.Navigator tabBar={props => <TabBar {...props} />} headerMode="none">
      <Tabs.Screen name="Contacts" component={ContactsScreen} />
      <Tabs.Screen name="Calendar" component={CalendarScreen} />
      <Tabs.Screen name="Notifications" component={NotificationsScreen} />
      <Tabs.Screen name="Settings" component={ProfileScreen} />
    </Tabs.Navigator>
  );
};

const Screens = () => {
  const store = useSelector(state => state.auth);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      const token = await TokenStorage.get();
      if (token) {
        dispatch(getProfileRequest());
        dispatch(codeEnteredSuccess());
      }
    };
    bootstrapAsync();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {!store.authenticated ? (
          <Fragment>
            <Stack.Screen name="PhoneEnter" component={PhoneEnterScreen} />
            <Stack.Screen name="CodeConfirm" component={CodeConfirmScreen} />
            <Stack.Screen name="Profile" component={AddProfileInfoScreen} />
          </Fragment>
        ) : (
          <Fragment>
            <Stack.Screen name="Tabs" component={TabsNavigation} />
            <Stack.Screen name="AddEvent" component={AddEventScreen} />
            <Stack.Screen name="ViewEvent" component={ViewEventScreen} />
          </Fragment>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Screens;
