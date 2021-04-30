import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../authScreens/Home';
import Profile from '../authScreens/Profile';
import AuthDrawer from './AuthDrawer';

export default function AuthBottomTabs() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={AuthDrawer} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
