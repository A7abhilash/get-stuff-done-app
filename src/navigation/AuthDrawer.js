import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Tasks from '../authScreens/Tasks';
import {globalColors} from '../styles/styles';

export default function AuthDrawer() {
  const Drawer = createDrawerNavigator();

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
      {/* {times.map(time => (
        <Drawer.Screen
          name={time}
          key={time}
          options={{
            headerStyle: {
              marginVertical: 0,
            },
          }}>
          {props => <Tasks {...props} type={time} />}
        </Drawer.Screen>
      ))} */}
      <Drawer.Screen
        name="All"
        options={{
          headerStyle: {
            marginVertical: 0,
          },
        }}>
        {props => <Tasks {...props} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}
