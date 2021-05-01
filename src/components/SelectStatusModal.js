import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {globalColors, globalStyles} from '../styles/styles';

const SelectStatusModal = ({
  setStatus,
  statusModalVisible,
  setStatusModalVisible,
}) => {
  const options = ['Today', 'This Week', 'Later', 'Pending', 'Completed'];
  return (
    <Modal visible={statusModalVisible} animationType="slide" transparent>
      <View style={styles.centeredView}>
        <View style={styles.innerView}>
          {options.map(item => (
            <TouchableOpacity
              key={item}
              onPress={() => {
                setStatus(item);
                setStatusModalVisible(false);
              }}
              style={styles.outerText}>
              <Text
                style={{
                  ...globalStyles.textSubTitle,
                  color: globalColors.Light,
                }}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};

export default SelectStatusModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    // alignItems: 'center',
  },
  innerView: {
    marginHorizontal: 10,
    padding: 20,
    alignItems: 'center',
    backgroundColor: globalColors.Card,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  outerText: {
    backgroundColor: globalColors.Primary,
    margin: 5,
    padding: 5,
    borderRadius: 10,
  },
});
