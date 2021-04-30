import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {baseProps} from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlers';
import {useAuth} from '../contexts/AuthContext';

export default function Home({type}) {
  const {user} = useAuth();
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 30}}>Home</Text>
      <Text style={{fontSize: 30}}>{type}</Text>
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
