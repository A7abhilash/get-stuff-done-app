import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Tasks from '../authScreens/Tasks';
import {globalColors} from '../styles/styles';
import {useDB} from '../contexts/DBContext';
import {Text, View} from 'react-native';

export default function AuthDrawer({navigation: stackNavigation}) {
  const {allTags} = useDB();
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      drawerType="slide"
      drawerStyle={{
        backgroundColor: globalColors.Gray,
      }}
      drawerContentOptions={{
        activeTintColor: globalColors.Warning,
        inactiveTintColor: globalColors.Light,
        activeBackgroundColor: globalColors.Secondary,
      }}>
      <Drawer.Screen
        name="All"
        options={{
          drawerLabel: ({focused}) => (
            <View
              style={{
                borderBottomColor: globalColors.Info,
                borderBottomWidth: !focused ? 1 : 0,
                paddingBottom: !focused ? 10 : 0,
              }}>
              <Text
                style={{
                  color: focused ? globalColors.Info : globalColors.Light,
                  fontWeight: 'bold',
                }}>
                All Tasks
              </Text>
            </View>
          ),
        }}>
        {props => (
          <Tasks {...props} stackNavigation={stackNavigation} type="all" />
        )}
      </Drawer.Screen>
      {allTags !== null &&
        allTags.map(tag => (
          <Drawer.Screen
            name={tag}
            key={tag}
            options={{
              headerStyle: {},
            }}>
            {props => <Tasks {...props} type={tag} />}
          </Drawer.Screen>
        ))}
    </Drawer.Navigator>
  );
}
