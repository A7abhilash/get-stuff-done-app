import React, {useContext, useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useAuth} from './AuthContext';
import {useMsg} from './MsgContext';

export const DBContext = React.createContext();

export const useDB = () => {
  return useContext(DBContext);
};

export function DBProvider({children}) {
  const {user} = useAuth();
  const {setToast} = useMsg();
  const [allTags, setAllTags] = useState(null);
  const [allTasks, setAllTasks] = useState(null);

  const fetchInfo = async () => {
    try {
      let res = await firestore().collection('gsd').doc(user.uid).get();
      //   console.log(res.data());
      let {tags, tasks} = res.data();
      setAllTags(tags);
      setAllTasks(tasks);
    } catch (error) {
      console.log(error.message);
      setToast(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchInfo();
    }
  }, []);

  const saveTags = async tags => {
    try {
      await firestore().collection('gsd').doc(user.uid).update({
        tags,
      });
      // let {tags, tasks} = res.data();
      setAllTags(tags);
      setToast('Tags saved');
    } catch (error) {
      console.log(error.message);
      setToast(error.message);
    }
  };

  const saveTasks = async tasks => {
    try {
      await firestore().collection('gsd').doc(user.uid).update({
        tasks,
      });
      // let {tags, tasks} = res.data();
      setAllTasks(tasks);
      setToast('Tasks saved');
    } catch (error) {
      console.log(error.message);
      setToast(error.message);
    }
  };

  return (
    <DBContext.Provider value={{allTags, allTasks, saveTags, saveTasks}}>
      {children}
    </DBContext.Provider>
  );
}
