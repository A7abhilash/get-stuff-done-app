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
      // let {tags, tasks} = res.data();
      if (res.data()) {
        if (res.data().tags) {
          setAllTags(res.data().tags);
        } else {
          setAllTags([]);
        }
        if (res.data().tasks) {
          setAllTasks(res.data().tasks);
        } else {
          setAllTasks([]);
        }
      } else {
        setAllTags([]);
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
    } else {
      setAllTags(null);
      setAllTasks(null);
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

  const saveTasks = async (tasks, msg) => {
    try {
      await firestore().collection('gsd').doc(user.uid).update({
        tasks,
      });
      setAllTasks(tasks);
      setToast(msg);
    } catch (error) {
      console.log(error.message);
      setToast(error.message);
    }
  };

  const addNewTask = async task => {
    let tasks = [task, ...allTasks];
    saveTasks(tasks, 'New Task Added!');
  };

  const editTask = async task => {
    let tasks = allTasks.filter(item => item.uid !== task.uid);
    tasks.unshift(task);
    saveTasks(tasks, 'Task Edited!');
  };

  const deleteTask = async task => {
    let tasks = allTasks.filter(item => item.uid !== task.uid);
    saveTasks(tasks, 'Task Deleted!');
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
