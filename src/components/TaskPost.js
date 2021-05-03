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
import {globalStyles, globalColors} from '../styles/styles';

export default function TaskPost({
  name,
  setName,
  due,
  setDue,
  tags,
  setTags,
  done,
  setDone,
  handlePress,
  btnText,
}) {
  const {allTags} = useDB();
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [tagsModalVisible, setTagsModalVisible] = useState(false);

  return (
    <View>
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
          {btnText}
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
