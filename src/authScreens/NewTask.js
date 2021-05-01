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
          <TouchableOpacity
            onPress={() => setStatusModalVisible(true)}
            style={{
              marginLeft: 'auto',
              marginRight: 5,
            }}>
            <Text
              style={{...styles.textRight, marginLeft: 'auto', marginRight: 5}}>
              {status}
            </Text>
          </TouchableOpacity>
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
        dateModalVisible={dateModalVisible}
        setDateModalVisible={setDateModalVisible}
      />
      <SelectStatusModal
        status={status}
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
