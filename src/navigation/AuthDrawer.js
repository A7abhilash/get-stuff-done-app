import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Todos from '../authScreens/Todos';

export default function AuthDrawer() {
  const Drawer = createDrawerNavigator();

  const times = ['Today', 'This Week', 'Later', 'Pending', 'Completed'];

  return (
    <Drawer.Navigator drawerPosition="left">
      {times.map(time => (
        <Drawer.Screen name={time} key={time}>
          {props => <Todos {...props} type={time} />}
        </Drawer.Screen>
      ))}
    </Drawer.Navigator>
  );
}
