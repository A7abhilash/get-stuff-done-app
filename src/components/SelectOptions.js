import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {globalColors} from '../styles/styles';

export default function SelectOptions({
  selectOptions,
  selectedOption,
  loading,
}) {
  const options = ['Today', 'This Week', 'Later', 'Pending', 'Completed'];

  return (
    <View style={styles.optionContainer}>
      {options.map(option =>
        option === selectedOption ? (
          <TouchableOpacity
            key={option}
            onPress={() => selectOptions('')}
            disabled={loading}>
            <Text key={option} style={styles.selectedTitle}>
              {option}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            key={option}
            onPress={() => selectOptions(option)}
            disabled={loading}>
            <Text style={styles.unselectedTitle}>{option}</Text>
          </TouchableOpacity>
        ),
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  optionContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingVertical: 10,
  },
  selectedTitle: {
    color: globalColors.Danger,
    borderBottomColor: globalColors.Danger,
    borderBottomWidth: 1,
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  unselectedTitle: {
    color: globalColors.Secondary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
