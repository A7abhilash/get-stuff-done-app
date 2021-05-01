import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {baseProps} from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlers';
import {useAuth} from '../contexts/AuthContext';
import {globalStyles, globalColors} from '../styles/styles';

export default function Todos({type}) {
  const {user} = useAuth();
  return (
    <View style={globalStyles.container}>
      <Text style={{color: globalColors.Light, fontSize: 30}}>Todos</Text>
      <Text style={{color: globalColors.Light, fontSize: 30}}>{type}</Text>
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
