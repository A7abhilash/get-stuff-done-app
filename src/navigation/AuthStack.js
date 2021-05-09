import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AuthDrawer from './AuthDrawer';
import NewTask from './../authScreens/NewTask';
import EditTask from './../authScreens/EditTask';
import Tags from './../authScreens/Tags';

export default function AuthStack() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="AuthDrawer" component={AuthDrawer} />
      <Stack.Screen name="New Task" component={NewTask} />
      <Stack.Screen name="Edit Task" component={EditTask} />
      <Stack.Screen name="Tags" component={Tags} />
    </Stack.Navigator>
  );
}
