import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {Button, FAB} from 'react-native-paper';
import Loading from '../components/Loading';
import SelectOptions from '../components/SelectOptions';
import TaskBox from '../components/TaskBox';
import {useDB} from '../contexts/DBContext';
import {globalStyles, globalColors} from '../styles/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function Tasks({tag, stackNavigation}) {
  const {loading, allTasks, fetchInfo} = useDB();
  const [selectedOption, setSelectedOption] = useState('');
  const [currentTasks, setCurrentTasks] = useState(null);
  const [displayTasks, setDisplayTasks] = useState(null);

  const getStatus = due => {
    let today = new Date().getTime();
    let dueDate = new Date(due).getTime();
    let diff = dueDate - today;
    let dayDiff = Math.ceil(diff / (1000 * 60 * 60 * 24));
    // console.log(dayDiff);

    if (new Date().toDateString() === new Date(due).toDateString()) {
      return 'Today';
    } else if (dayDiff > 7) {
      return 'Later';
    } else if (dayDiff > 0) {
      return 'This Week';
    } else {
      return 'Pending';
    }
  };

  const setSelection = id => {
    setSelectedOption(id);

    if (id === 'Completed') {
      setDisplayTasks(currentTasks.filter(task => task.done));
    } else if (id) {
      setDisplayTasks(
        currentTasks.filter(task => !task.done && getStatus(task.due) === id),
      );
    } else {
      setDisplayTasks(currentTasks);
    }

    // switch (id) {
    //   case 'Today':
    //     setDisplayTasks(allTasks.filter(task => getStatus(task.due) === 'Today'));
    // }
  };

  useEffect(() => {
    if (allTasks !== null) {
      setSelectedOption('');
      if (tag === 'All') {
        setCurrentTasks(allTasks);
      } else {
        let data = [];
        allTasks.forEach(task => {
          if (task.tags.includes(tag)) {
            data.unshift(task);
          }
        });
        setCurrentTasks(data);
      }
    }
  }, [allTasks, tag]);

  useEffect(() => {
    setDisplayTasks(currentTasks);
  }, [currentTasks]);

  return (
    <View style={globalStyles.component}>
      <View style={styles.topView}>
        <Text style={{...globalStyles.textTitle, color: globalColors.Warning}}>
          Tasks
        </Text>
        {tag !== 'All' && <Text style={styles.tag}>{tag}</Text>}
        <Button
          style={{marginLeft: 'auto', marginRight: 5}}
          color={globalColors.Success}
          onPress={() => {
            fetchInfo();
            setDisplayTasks(null);
          }}
          disabled={loading}>
          <MaterialIcons name="refresh" size={24} />
        </Button>
      </View>
      <SelectOptions
        selectedOption={selectedOption}
        selectOptions={setSelection}
        loading={loading}
      />
      {loading && <Loading />}
      {displayTasks &&
        (displayTasks.length ? (
          <FlatList
            data={displayTasks}
            keyExtractor={item => item.uid}
            renderItem={({item}) => (
              <TaskBox task={item} stackNavigation={stackNavigation} />
            )}
            style={{marginBottom: 50}}
          />
        ) : (
          <Text style={{color: globalColors.Light, textAlign: 'center'}}>
            No tasks found...
          </Text>
        ))}
      <FAB
        style={styles.newTag}
        onPress={() => stackNavigation.navigate('Tags')}
        label="Tags"
        color={globalColors.Warning}
        disabled={loading}
      />
      <FAB
        style={styles.newTask}
        onPress={() => stackNavigation.navigate('New Task')}
        label="New Task"
        color={globalColors.Warning}
        disabled={loading}
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
    marginRight: 16,
    right: 0,
    bottom: 0,
    backgroundColor: globalColors.Gray,
  },
  newTag: {
    position: 'absolute',
    marginLeft: 16,
    left: 0,
    bottom: 0,
    backgroundColor: globalColors.Gray,
  },
  tag: {
    color: globalColors.Light,
    margin: 3,
    backgroundColor: globalColors.Primary,
    paddingHorizontal: 3,
    fontSize: 14,
    borderRadius: 5,
  },
});
