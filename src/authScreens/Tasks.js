import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {Button, FAB} from 'react-native-paper';
import Loading from '../components/Loading';
import SelectOptions from '../components/SelectOptions';
import TaskBox from '../components/TaskBox';
import {useDB} from '../contexts/DBContext';
import {globalStyles, globalColors} from '../styles/styles';

export default function Tasks({type, stackNavigation}) {
  const {loading, allTasks} = useDB();
  const [selectedOption, setSelectedOption] = useState('Today');
  const [displayTasks, setDisplayTasks] = useState();

  const setSelection = id => {
    setSelectedOption(id);
  };

  useEffect(() => {
    if (allTasks !== null) {
      if (type === 'All') {
        setDisplayTasks(allTasks);
      } else {
        let data = [];
        allTasks.forEach(task => {
          if (task.tags.includes(type)) {
            data.unshift(task);
          }
        });
        setDisplayTasks(data);
      }
    }
  }, [allTasks, type]);

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
      {loading && <Loading />}
      {displayTasks &&
        (displayTasks.length ? (
          <FlatList
            data={displayTasks}
            keyExtractor={item => item.uid}
            renderItem={({item}) => <TaskBox task={item} />}
            style={{marginBottom: 10}}
            onRefresh={() => console.log('refresh')}
            refreshing={false}
          />
        ) : (
          <Text style={{color: globalColors.Light, textAlign: 'center'}}>
            No tasks found...
          </Text>
        ))}
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
