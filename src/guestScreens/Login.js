import React, {useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useAuth} from '../contexts/AuthContext';
import {useMsg} from '../contexts/MsgContext';

export default function Login({navigation}) {
  const {login} = useAuth();
  const {setAlert} = useMsg();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email && password) {
      login(email, password);
    } else {
      setAlert({
        title: 'Invalid',
        msg: "Empty fields aren't allowed",
        text: 'Understood',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{...styles.text, fontSize: 20}}>Login</Text>
      <View style={{marginVertical: 10}}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <View style={styles.btn}>
        <Button title="Sign In" onPress={handleLogin} />
      </View>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.replace('Register')}>
        <Text style={styles.text}>Register new account...</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 50,
    // alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#333',
    borderStyle: 'solid',
    padding: 5,
    marginVertical: 5,
  },
  btn: {
    marginVertical: 10,
  },
  text: {
    textAlign: 'center',
  },
});
