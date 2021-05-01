import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, FAB} from 'react-native-paper';
import SelectOptions from '../components/SelectOptions';
import {globalStyles, globalColors} from '../styles/styles';

export default function Tasks({tasks, stackNavigation}) {
  const [selectedOption, setSelectedOption] = useState('Today');
  const [displayTasks, setDisplayTasks] = useState(null);

  const setSelection = id => {
    setSelectedOption(id);

    // if (id === 'All') {
    //   setDisplayTasks(tasks);
    // } else {
    //   setDisplayTasks(tasks.filter(blog => blog.status === id));
    // }
  };

  return (
    <View style={globalStyles.component}>
      <View style={styles.topView}>
        <Text style={{...globalStyles.textTitle, color: globalColors.Warning}}>
          Tasks
        </Text>
        <Button
          style={{marginLeft: 'auto', marginRight: 5}}
          color={globalColors.Success}>
          Save
        </Button>
      </View>
      <SelectOptions
        selectedOption={selectedOption}
        selectOptions={setSelection}
      />
      <FAB
        style={styles.newTag}
        onPress={() => stackNavigation.navigate('New Tag')}
        label="New Tag"
        color={globalColors.Warning}
      />
      <FAB
        style={styles.newTask}
        onPress={() => stackNavigation.navigate('New Task')}
        label="New Task"
        color={globalColors.Warning}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  topView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  newTask: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: globalColors.Gray,
  },
  newTag: {
    position: 'absolute',
    margin: 16,
    left: 0,
    bottom: 0,
    backgroundColor: globalColors.Gray,
  },
});
