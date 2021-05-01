import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AuthDrawer from './AuthDrawer';
import {Text, TouchableOpacity} from 'react-native';
import {useAuth} from '../contexts/AuthContext';

export default function AuthStack() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        headerTitle: 'Get Stuff Done',
        headerRight: () => <Logout />,
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
      <Text>Logout</Text>
    </TouchableOpacity>
  );
};
