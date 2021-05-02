import React, {useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {globalColors, globalStyles} from '../styles/styles';
import {useMsg} from '../contexts/MsgContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const NewTag = () => {
  const {setAlert} = useMsg();
  const [name, setName] = useState('');
  const [tags, setTags] = useState([
    '1sadas',
    '2asdas',
    '3asdas',
    '1sadasdas',
    '2adsdas',
    '3adsdas',
  ]);

  const addTag = () => {
    if (name) {
      if (tags.includes(name)) {
        setAlert({
          title: 'Error',
          msg: 'Tag already exists',
          text: 'Understood',
        });
      } else {
        setTags(prev => [name, ...prev]);
        setName('');
      }
    }
  };

  const deleteTag = tag => {
    Alert.alert('Confirm', `Are you sure to delete the tag: ${tag}?`, [
      {
        text: 'Cancel',
      },
      {
        text: 'Yes',
        onPress: () => setTags(tags.filter(item => item !== tag)),
      },
    ]);
  };

  const handleSave = async () => {
    console.log(tags);
  };

  return (
    <View style={globalStyles.component}>
      <View style={styles.topView}>
        <Text style={{...globalStyles.textTitle, color: globalColors.Warning}}>
          Tags
        </Text>
        <Button
          style={{marginLeft: 'auto', marginRight: 5}}
          color={globalColors.Success}
          onPress={handleSave}>
          Save
        </Button>
      </View>
      <View style={styles.midView}>
        <TextInput
          mode="flat"
          label="Name"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        <TouchableOpacity onPress={addTag} style={styles.addBtn}>
          <MaterialIcons name="add" size={30} />
        </TouchableOpacity>
      </View>
      <View style={{marginVertical: 5}}>
        <Text
          style={{...globalStyles.textSubTitle, color: globalColors.Warning}}>
          Your Tags
        </Text>
        <View style={styles.innerView}>
          {tags.map(item => (
            <TouchableOpacity key={item} onPress={() => deleteTag(item)}>
              <Text
                style={{
                  ...globalStyles.textSubTitle,
                  ...styles.textWrapper,
                  color: globalColors.Dark,
                }}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View
        style={{
          bottom: 0,
          position: 'absolute',
        }}>
        <Text
          style={{
            color: globalColors.Danger,
          }}>
          *Press on tag to delete it.
        </Text>
      </View>
    </View>
  );
};

export default NewTag;

const styles = StyleSheet.create({
  topView: {flexDirection: 'row', alignItems: 'center', marginVertical: 5},
  midView: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {flex: 0.85, height: 50, fontSize: 18},
  addBtn: {
    flex: 0.15,
    marginLeft: 10,
    backgroundColor: globalColors.Primary,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  innerView: {
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  textWrapper: {
    backgroundColor: globalColors.Warning,
    margin: 5,
    padding: 5,
    borderRadius: 10,
  },
});
