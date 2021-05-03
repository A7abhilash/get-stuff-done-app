import React, {useState} from 'react';
import {View, Text} from 'react-native';
import TaskPost from '../components/TaskPost';
import {useDB} from '../contexts/DBContext';
import {useMsg} from '../contexts/MsgContext';
import {globalStyles, globalColors} from '../styles/styles';

export default function NewTask({navigation}) {
  const {setAlert} = useMsg();
  const {addNewTask} = useDB();
  const [name, setName] = useState('');
  const [due, setDue] = useState(new Date());
  const [tags, setTags] = useState([]);
  const [done, setDone] = useState(false);

  const handlePress = async () => {
    if (name && tags.length) {
      let newTask = {
        name,
        due: due.toString(),
        tags,
        done,
        uid: new Date().getTime().toString(),
      };
      await addNewTask(newTask);
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
        Add New Task
      </Text>
      <TaskPost
        name={name}
        setName={setName}
        due={due}
        done={done}
        setDue={setDue}
        setDone={setDone}
        tags={tags}
        setTags={setTags}
        handlePress={handlePress}
        btnText="Add"
      />
    </View>
  );
}
