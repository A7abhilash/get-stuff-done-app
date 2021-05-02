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
  const [loading, setLoading] = useState(true);
  const [allTags, setAllTags] = useState(null);
  const [allTasks, setAllTasks] = useState(null);

  const fetchInfo = async () => {
    try {
      setLoading(true);
      let res = await firestore().collection('gsd').doc(user.uid).get();
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
    } finally {
      setLoading(false);
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

  const editTask = async task => {
    try {
      let tasks = allTasks.filter(item => item.uid !== task.uid);
      tasks.unshift(task);
      await firestore().collection('gsd').doc(user.uid).update({
        tasks,
      });
      setAllTasks(tasks);
      setToast('Task Edited!');
    } catch (error) {
      console.log(error.message);
      setToast(error.message);
    }
  };

  const deleteTask = async task => {
    try {
      let tasks = allTasks.filter(item => item.uid !== task.uid);
      await firestore().collection('gsd').doc(user.uid).update({
        tasks,
      });
      setAllTasks(tasks);
      setToast('Task Deleted!');
    } catch (error) {
      console.log(error.message);
      setToast(error.message);
    }
  };

  return (
    <DBContext.Provider
      value={{
        loading,
        allTags,
        allTasks,
        saveTags,
        addNewTask,
        editTask,
        deleteTask,
        fetchInfo,
      }}>
      {children}
    </DBContext.Provider>
  );
}
