import {StyleSheet} from 'react-native';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  component: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 20,
  },
  textTitle: {
    fontSize: 30,
  },
  textSubTitle: {
    fontSize: 18,
  },
});

const globalColors = {
  Dark: '#343a40',
  Secondary: '#6c757d',
  Gray: '#50555a',
  Card: '#2E2F33',
  Light: '#f8f9fa',
  Danger: '#dc3545',
  Success: '#28a745',
  Warning: '#ffc107',
  Primary: '#0275d8',
  Info: '#5bc0de',
};

export {globalStyles, globalColors};
