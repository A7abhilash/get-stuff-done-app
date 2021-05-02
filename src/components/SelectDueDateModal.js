import React from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Button} from 'react-native-paper';
import {globalColors} from '../styles/styles';

const SelectDueDateModal = ({
  date,
  setDate,
  dateModalVisible,
  setDateModalVisible,
}) => {
  return (
    <Modal visible={dateModalVisible} animationType="slide" transparent>
      <View style={styles.centeredView}>
        <View style={styles.innerView}>
          <DatePicker
            date={date}
            onDateChange={setDate}
            mode="date"
            style={{
              backgroundColor: globalColors.Gray,
              height: 100,
            }}
            textColor={globalColors.Light}
            fadeToColor="none"
          />
          <Button
            mode="contained"
            color={globalColors.Info}
            style={{marginTop: 10}}
            onPress={() => setDateModalVisible(false)}>
            Select due date
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default SelectDueDateModal;

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
});
