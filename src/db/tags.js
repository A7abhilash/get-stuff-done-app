import firestore from '@react-native-firebase/firestore';

export async function fetchTags() {
  try {
    let res = await firestore().collection('gsd');
  } catch (error) {
    return {error: error.message};
  }
}
