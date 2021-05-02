import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Button, Switch, TextInput} from 'react-native-paper';
import SelectDueDateModal from '../components/SelectDueDateModal';
import SelectTagsModal from '../components/SelectTagsModal';
import {useDB} from '../contexts/DBContext';
import {useMsg} from '../contexts/MsgContext';
import {globalStyles, globalColors} from '../styles/styles';

export default function NewTask({navigation}) {
  const {setAlert} = useMsg();
  const {allTags, addNewTask} = useDB();
  const [name, setName] = useState('');
  const [due, setDue] = useState(new Date());
  const [tags, setTags] = useState([]);
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [tagsModalVisible, setTagsModalVisible] = useState(false);
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
      <Text style={{...globalStyles.textTitle, color: globalColors.Warning}}>
        Add New Task
      </Text>
      <ScrollView style={{marginVertical: 5}}>
        <TextInput
          mode="flat"
          label="Name"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        <View style={styles.horizontalView}>
          <Text
            style={{...globalStyles.textSubTitle, color: globalColors.Light}}>
            Due Date:
          </Text>
          <TouchableOpacity
            onPress={() => setDateModalVisible(true)}
            style={{
              marginLeft: 'auto',
              marginRight: 5,
            }}>
            <Text style={styles.textRight}>{new Date(due).toDateString()}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.horizontalView}>
          <Text
            style={{
              ...globalStyles.textSubTitle,
              color: globalColors.Light,
              flex: 0.2,
            }}>
            Tags:
          </Text>
          <TouchableOpacity
            onPress={() => setTagsModalVisible(true)}
            style={{
              marginRight: 5,
              flexDirection: 'row',
              flexWrap: 'wrap',
              flex: 0.8,
              justifyContent: 'flex-end',
            }}>
            {tags.length ? (
              tags.map(item => (
                <Text style={styles.textTags} key={item}>
                  {item}
                </Text>
              ))
            ) : (
              <Text
                style={{
                  color: globalColors.Danger,
                  ...globalStyles.textSubTitle,
                }}>
                No tags selected
              </Text>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.horizontalView}>
          <Text
            style={{...globalStyles.textSubTitle, color: globalColors.Light}}>
            Done?
          </Text>
          <View
            style={{
              ...styles.textRight,
              marginLeft: 'auto',
              marginRight: 5,
              backgroundColor: globalColors.Card,
              paddingHorizontal: 5,
              borderRadius: 5,
            }}>
            <Switch
              value={done}
              onValueChange={() => {
                setDone(!done);
              }}
              color={globalColors.Primary}
            />
          </View>
        </View>
        <Button
          style={{marginVertical: 10}}
          color={globalColors.Success}
          mode="contained"
          onPress={handlePress}>
          Add
        </Button>
      </ScrollView>
      <SelectDueDateModal
        date={due}
        setDate={setDue}
        dateModalVisible={dateModalVisible}
        setDateModalVisible={setDateModalVisible}
      />
      <SelectTagsModal
        allTags={allTags}
        tags={tags}
        setTags={setTags}
        tagsModalVisible={tagsModalVisible}
        setTagsModalVisible={setTagsModalVisible}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginVertical: 5,
    height: 60,
    fontSize: 18,
  },
  btn: {
    marginVertical: 10,
  },
  horizontalView: {
    marginVertical: 10,
    flexDirection: 'row',
  },
  textRight: {
    ...globalStyles.textSubTitle,
    color: globalColors.Light,
  },
  textTags: {
    color: globalColors.Light,
    margin: 3,
    backgroundColor: globalColors.Primary,
    paddingVertical: 2,
    paddingHorizontal: 4,
    fontSize: 16,
    borderRadius: 5,
  },
});
