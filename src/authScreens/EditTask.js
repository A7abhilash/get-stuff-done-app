import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const EditTask = ({navigation, route}) => {
  const {task} = route.params;
  return (
    <View>
      <Text>{task.name}</Text>
    </View>
  );
};

export default EditTask;

const styles = StyleSheet.create({});
