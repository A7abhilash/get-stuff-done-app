import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../authScreens/Home';

export default function AuthStack() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}
