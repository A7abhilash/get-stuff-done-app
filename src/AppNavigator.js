import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Text, View} from 'react-native';
import {useAuth} from './contexts/AuthContext';
import AuthStack from './navigation/AuthStack';
import GuestStack from './navigation/GuestStack';

const AppNavigator = () => {
  const {user, loading} = useAuth();

  if (loading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 20}}>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <AuthStack /> : <GuestStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
