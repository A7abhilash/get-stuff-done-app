import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AuthDrawer from './AuthDrawer';

export default function AuthStack() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        headerTitle: 'Get Stuff Done',
      }}>
      <Stack.Screen name="AuthDrawer" component={AuthDrawer} />
    </Stack.Navigator>
  );
}
