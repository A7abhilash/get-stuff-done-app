import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Todos from '../authScreens/Todos';
import {globalColors} from '../styles/styles';

export default function AuthDrawer() {
  const Drawer = createDrawerNavigator();

  const times = ['Today', 'This Week', 'Later', 'Pending', 'Completed'];

  return (
    <Drawer.Navigator
      drawerStyle={{
        backgroundColor: globalColors.Gray,
      }}
      drawerContentOptions={{
        activeTintColor: globalColors.Warning,
        inactiveTintColor: globalColors.Light,
        activeBackgroundColor: globalColors.Secondary,
      }}>
      {times.map(time => (
        <Drawer.Screen
          name={time}
          key={time}
          options={{
            headerStyle: {
              marginVertical: 0,
            },
          }}>
          {props => <Todos {...props} type={time} />}
        </Drawer.Screen>
      ))}
    </Drawer.Navigator>
  );
}
