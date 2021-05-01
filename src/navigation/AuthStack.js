import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AuthDrawer from './AuthDrawer';
import {TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useAuth} from '../contexts/AuthContext';
import {globalColors, globalStyles} from '../styles/styles';

export default function AuthStack() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        headerTitle: 'Get Stuff Done',
        headerRight: () => <Logout />,
        headerStyle: {
          backgroundColor: globalColors.Gray,
        },
        headerTintColor: globalColors.Light,
      }}>
      <Stack.Screen name="AuthDrawer" component={AuthDrawer} />
    </Stack.Navigator>
  );
}

const Logout = () => {
  const {logout} = useAuth();

  return (
    <TouchableOpacity onPress={logout} style={{marginRight: 10}}>
      {/* <Image
        source={require("./../assets/icons/logout.png")}
        style={{ width: 24, height: 24, resizeMode: "center" }}
      /> */}
      <MaterialIcons name="logout" size={24} color={globalColors.Info} />
    </TouchableOpacity>
  );
};
