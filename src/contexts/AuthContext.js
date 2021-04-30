import React, {createContext, useContext, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {useMsg} from './MsgContext';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({children}) {
  const {setToast} = useMsg();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
      setToast(error.message);
    }
  };

  const register = async (email, password) => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
      setToast(error.message);
    }
  };

  const logout = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      console.log(error);
      setToast(error.message);
    }
  };

  const authStateChanged = user => {
    // console.log('USER: ' + user?.email);
    setUser(user);
    if (loading) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(authStateChanged);
    return subscriber;
  }, []);

  return (
    <AuthContext.Provider value={{user, loading, login, register, logout}}>
      {children}
    </AuthContext.Provider>
  );
}
