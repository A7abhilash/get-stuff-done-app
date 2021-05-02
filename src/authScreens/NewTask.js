import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import SelectDueDateModal from '../components/SelectDueDateModal';
import SelectStatusModal from '../components/SelectStatusModal';
import {globalStyles, globalColors} from '../styles/styles';

export default function NewTask({tasks, navigation}) {
  const [name, setName] = useState('');
  const [due, setDue] = useState(new Date());
  const [tags, setTags] = useState([]);
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [status, setStatus] = useState('Today');

  const selectDate = () => {
    let today = new Date().getTime();
    let dueDate = new Date(due).getTime();
    let diff = dueDate - today;
    let dayDiff = Math.ceil(diff / (1000 * 60 * 60 * 24));
    // console.log(dayDiff);

    if (dayDiff === 0) {
      setStatus('Today');
    } else if (dayDiff > 7) {
      setStatus('Later');
    } else if (dayDiff > 1) {
      setStatus('This Week');
    } else {
      setStatus('Pending');
    }
  };

  const handlePress = () => {
    // console.log(due);
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
            style={{...globalStyles.textSubTitle, color: globalColors.Light}}>
            Status:
          </Text>
          <Text
            style={{...styles.textRight, marginLeft: 'auto', marginRight: 5}}>
            {status}
          </Text>
        </View>
        <View style={styles.horizontalView}>
          <Text
            style={{...globalStyles.textSubTitle, color: globalColors.Light}}>
            Tags:
          </Text>
          <TouchableOpacity
            onPress={() => setDateModalVisible(true)}
            style={{
              marginLeft: 'auto',
              marginRight: 5,
            }}>
            {tags.length ? (
              tags.map(item => (
                <Text style={styles.textRight} key={item}>
                  {new Date(due).toDateString()}
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
        selectDate={selectDate}
        dateModalVisible={dateModalVisible}
        setDateModalVisible={setDateModalVisible}
      />
      <SelectStatusModal
        setStatus={setStatus}
        statusModalVisible={statusModalVisible}
        setStatusModalVisible={setStatusModalVisible}
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
});
