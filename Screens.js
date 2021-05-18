import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Provider} from 'react-redux';

import configureStore from './src/redux/configureStore';
import TabBar from './src/components/TabBar';

import PhoneEnterScreen from './src/screens/PhoneEnterScreen';
import CodeConfirmScreen from './src/screens/CodeConfirmScreen';
import CalendarScreen from './src/screens/CalendarScreen';
import ContactsScreen from './src/screens/ContactsScreen';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const store = configureStore();

console.disableYellowBox = true;

const TabsNavigation = () => {
  return (
    <Tabs.Navigator tabBar={props => <TabBar {...props} />} headerMode="none">
    {/* <Tabs.Navigator headerMode="none"> */}
      <Tabs.Screen name="Contacts" component={ContactsScreen} />
      <Tabs.Screen name="Calendar" component={CalendarScreen} />
    </Tabs.Navigator>
  );
};

const Screens = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Tabs" headerMode="none">
          <Stack.Screen name="PhoneEnter" component={PhoneEnterScreen} />
          <Stack.Screen name="CodeConfirm" component={CodeConfirmScreen} />
          <Stack.Screen name="Tabs" component={TabsNavigation} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default Screens;
