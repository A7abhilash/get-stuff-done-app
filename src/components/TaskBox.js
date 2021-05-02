import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {globalColors} from '../styles/styles';

const TaskBox = ({task}) => {
  return (
    <TouchableOpacity style={styles.taskBox}>
      <Text style={styles.name}>{task.name}</Text>
      <View style={styles.tags}>
        {task.tags.map(item => (
          <Text style={styles.textTags} key={item}>
            {item}
          </Text>
        ))}
      </View>
      <Text
        onPress={() => console.log(new Date(task.due.seconds).toDateString())}
        style={styles.date}>
        {new Date(task.due).toDateString()}
      </Text>
    </TouchableOpacity>
  );
};

export default TaskBox;

const styles = StyleSheet.create({
  taskBox: {
    backgroundColor: globalColors.Card,
    marginVertical: 5,
    padding: 5,
    borderRadius: 10,
  },
  name: {
    color: globalColors.Light,
    fontSize: 20,
  },
  tags: {
    marginVertical: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  textTags: {
    color: globalColors.Light,
    margin: 3,
    backgroundColor: globalColors.Primary,
    paddingHorizontal: 3,
    fontSize: 14,
    borderRadius: 5,
  },
  date: {
    color: globalColors.Success,
    fontSize: 16,
  },
});
