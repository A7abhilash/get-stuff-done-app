import React, {useState} from 'react';
import {View, Text} from 'react-native';
import TaskPost from '../components/TaskPost';
import {useDB} from '../contexts/DBContext';
import {useMsg} from '../contexts/MsgContext';
import {globalStyles, globalColors} from '../styles/styles';

const EditTask = ({navigation, route}) => {
  const {task} = route.params;
  const {setAlert} = useMsg();
  const {editTask} = useDB();
  const [name, setName] = useState(task.name);
  const [due, setDue] = useState(task.due);
  const [tags, setTags] = useState(task.tags);
  const [done, setDone] = useState(task.done);

  const handlePress = async () => {
    if (name && tags.length) {
      let newTask = {
        name,
        due: due.toString(),
        tags,
        done,
        uid: task.uid,
      };
      await editTask(newTask);
      navigation.goBack();
    } else {
      setAlert({
        title: 'Invalid',
        msg: 'Blank fields are not allowed!',
        text: 'Understood',
      });
    }
  };

  return (
    <View style={globalStyles.component}>
      <Text
        style={{
          ...globalStyles.textTitle,
          color: globalColors.Warning,
          marginVertical: 5,
        }}>
        Edit Task
      </Text>
      <TaskPost
        name={name}
        setName={setName}
        // due={typeof due === 'string' ? new Date(due) : due}
        due={new Date(due)}
        done={done}
        setDue={setDue}
        setDone={setDone}
        tags={tags}
        setTags={setTags}
        handlePress={handlePress}
        btnText="Edit"
      />
    </View>
  );
};

export default EditTask;
