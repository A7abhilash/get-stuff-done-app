import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AuthBottomTabs from './AuthBottomTabs';

export default function AuthStack() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        headerTitle: 'Get Stuff Done',
      }}>
      <Stack.Screen name="AuthBottomTabs" component={AuthBottomTabs} />
    </Stack.Navigator>
  );
}
