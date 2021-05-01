import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {globalColors, globalStyles} from '../styles/styles';

const NewTag = () => {
  const [name, setName] = useState('');
  const [tags, setTags] = useState([
    '1sadas',
    '2asdas',
    '3asdas',
    '1sadasdas',
    '2adsdas',
    '3adsdas',
  ]);

  return (
    <View style={globalStyles.component}>
      <View style={styles.topView}>
        <Text style={{...globalStyles.textTitle, color: globalColors.Warning}}>
          Tags
        </Text>
        <Button
          style={{marginLeft: 'auto', marginRight: 5}}
          color={globalColors.Success}>
          Save
        </Button>
      </View>
      <View style={{marginVertical: 5}}>
        <TextInput
          mode="flat"
          label="Name"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
      </View>
      <View>
        <Text
          style={{...globalStyles.textSubTitle, color: globalColors.Warning}}>
          Your Tags
        </Text>
        <View style={styles.innerView}>
          {tags.map(item => (
            <Text
              key={item}
              style={{
                ...globalStyles.textSubTitle,
                ...styles.textWrapper,
                color: globalColors.Dark,
              }}>
              {item}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
};

export default NewTag;

const styles = StyleSheet.create({
  topView: {flexDirection: 'row', alignItems: 'center', marginVertical: 5},
  input: {
    marginVertical: 5,
    height: 60,
    fontSize: 18,
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
