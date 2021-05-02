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
      console.log(res.data().tasks);
      let {tags, tasks} = res.data();
      if (tags) {
        setAllTags(tags);
      } else {
        setAllTags([]);
      }
      if (tasks) {
        setAllTasks(tasks);
      } else {
        setAllTasks([]);
      }
    } catch (error) {
      console.log(error.message);
      setToast(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchInfo();
    }
  }, [user]);

  const saveTags = async tags => {
    try {
      await firestore().collection('gsd').doc(user.uid).update({
        tags,
      });
      setAllTags(tags);
      setToast('Tags saved');
    } catch (error) {
      console.log(error.message);
      setToast(error.message);
    }
  };

  const addNewTask = async task => {
    try {
      let tasks = [task, ...allTasks];
      console.log(tasks);
      await firestore().collection('gsd').doc(user.uid).update({
        tasks,
      });
      setAllTasks(tasks);
      setToast('New Task Added!');
    } catch (error) {
      console.log(error.message);
      setToast(error.message);
    }
  };

  return (
    <DBContext.Provider value={{allTags, allTasks, saveTags, addNewTask}}>
      {children}
    </DBContext.Provider>
  );
}
