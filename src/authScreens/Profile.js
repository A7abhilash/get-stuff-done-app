import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {useAuth} from '../contexts/AuthContext';

export default function Profile() {
  const {user, logout} = useAuth();
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 30}}>User Profile</Text>
      <Text style={{fontSize: 20}}>{user.email}</Text>
      <Button title="Logout" color="orange" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
