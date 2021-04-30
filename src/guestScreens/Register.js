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

export default function Register({navigation}) {
  const {register} = useAuth();
  const {setAlert} = useMsg();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');

  const handleRegister = () => {
    if (email && password && cPassword) {
      if (cPassword === password) {
        register(email, password);
      } else {
        setAlert({
          title: 'Invalid',
          msg: "Password doesn't match",
          text: 'Understood',
        });
      }
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
      <Text style={{...styles.text, fontSize: 20}}>Register</Text>
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
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={cPassword}
          onChangeText={setCPassword}
          secureTextEntry
        />
      </View>
      <View style={styles.btn}>
        <Button title="Register" onPress={handleRegister} />
      </View>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.replace('Login')}>
        <Text style={styles.text}>Login with existing account...</Text>
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
