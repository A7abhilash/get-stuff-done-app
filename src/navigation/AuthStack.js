import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AuthDrawer from './AuthDrawer';
import NewTask from './../authScreens/NewTask';
import EditTask from './../authScreens/EditTask';
import Tags from './../authScreens/Tags';
import {Text, TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useAuth} from '../contexts/AuthContext';
import {globalColors, globalStyles} from '../styles/styles';

export default function AuthStack() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        headerTitle: () => <Profile />,
        headerRight: () => <Logout />,
        headerStyle: {
          backgroundColor: globalColors.Gray,
        },
        headerTintColor: globalColors.Light,
      }}>
      <Stack.Screen name="AuthDrawer" component={AuthDrawer} />
      <Stack.Screen name="New Task" component={NewTask} />
      <Stack.Screen name="Edit Task" component={EditTask} />
      <Stack.Screen name="Tags" component={Tags} />
    </Stack.Navigator>
  );
}

const Logout = () => {
  const {logout} = useAuth();

  return (
    <TouchableOpacity onPress={logout} style={{marginRight: 10}}>
      <MaterialIcons name="logout" size={24} color={globalColors.Info} />
    </TouchableOpacity>
  );
};

const Profile = () => {
  const {user} = useAuth();

  return (
    <View style={{marginLeft: 0}}>
      <Text
        style={{
          ...globalStyles.textSubTitle,
          color: globalColors.Info,
        }}>
        Get Stuff Done
      </Text>
      <Text
        style={{
          color: globalColors.Light,
        }}>
        {user.email}
      </Text>
    </View>
  );
};
