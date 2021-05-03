import React, {useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {globalColors} from '../styles/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SelectActionModal from './SelectActionModal';
import {useDB} from '../contexts/DBContext';

const TaskBox = ({task, stackNavigation}) => {
  const {deleteTask} = useDB();
  const [actionModalOpen, setActionModalOpen] = useState(false);

  const handleEdit = async () => {
    // console.log('Edit: ', task.name);
    setActionModalOpen(false);
    stackNavigation.navigate('Edit Task', {task});
  };
  const handleDelete = () => {
    // console.log('Delete: ', task.name);
    Alert.alert('Confirm', `Are you sure to delete the task: ${task.name}?`, [
      {
        text: 'Cancel',
      },
      {
        text: 'Yes',
        onPress: async () => {
          await deleteTask(task);
        },
      },
    ]);
    setActionModalOpen(false);
  };

  return (
    <View style={styles.taskBox}>
      <View style={styles.topView}>
        <Text style={styles.name}>{task.name}</Text>
        <TouchableOpacity
          style={{flex: 0.1}}
          onPress={() => setActionModalOpen(true)}>
          <MaterialIcons name="menu-open" size={24} color={globalColors.Info} />
        </TouchableOpacity>
      </View>
      <View style={styles.tags}>
        {task.tags.map(item => (
          <Text style={styles.textTags} key={item}>
            {item}
          </Text>
        ))}
      </View>
      <Text style={styles.date}>{new Date(task.due).toDateString()}</Text>
      <SelectActionModal
        actionModalVisible={actionModalOpen}
        setActionModalVisible={setActionModalOpen}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </View>
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
  topView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    color: globalColors.Light,
    fontSize: 20,
    flex: 0.9,
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
