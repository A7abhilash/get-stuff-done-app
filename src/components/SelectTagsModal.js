import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button} from 'react-native-paper';
import {globalColors, globalStyles} from '../styles/styles';

const SelectTagsModal = ({
  tags,
  setTags,
  tagsModalVisible,
  setTagsModalVisible,
}) => {
  const options = [
    '1sadas',
    '2asdas',
    '3asdas',
    '1sadasdas',
    '2adsdas',
    '3adsdas',
  ];
  return (
    <Modal visible={tagsModalVisible} animationType="slide" transparent>
      <View style={styles.centeredView}>
        <View style={styles.innerView}>
          <View style={styles.displayTags}>
            {options.map(item =>
              tags.includes(item) ? (
                <TouchableOpacity
                  key={item}
                  onPress={() =>
                    setTags(prev => prev.filter(tag => tag !== item))
                  }
                  style={styles.selected}>
                  <Text
                    style={{
                      ...globalStyles.textSubTitle,
                      color: globalColors.Light,
                    }}>
                    {item}
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  key={item}
                  onPress={() => setTags(prev => [...prev, item])}
                  style={styles.notSelected}>
                  <Text
                    style={{
                      ...globalStyles.textSubTitle,
                      color: globalColors.Light,
                    }}>
                    {item}
                  </Text>
                </TouchableOpacity>
              ),
            )}
          </View>
          <Button
            mode="contained"
            color={globalColors.Info}
            style={{marginTop: 10}}
            onPress={() => setTagsModalVisible(false)}>
            Select Tags
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default SelectTagsModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  innerView: {
    marginHorizontal: 10,
    padding: 20,
    backgroundColor: globalColors.Card,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  displayTags: {flexDirection: 'row', flexWrap: 'wrap'},
  selected: {
    backgroundColor: globalColors.Primary,
    margin: 5,
    padding: 5,
    borderRadius: 10,
  },
  notSelected: {
    margin: 5,
    padding: 5,
    borderRadius: 10,
  },
});
