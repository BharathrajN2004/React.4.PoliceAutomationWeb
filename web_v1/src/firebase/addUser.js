import { setDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { firestore, storage } from './initializer';

const addUser = async (email, name, password, profile, accessLevel, station) => {
  try {
    const userRef = doc(firestore, 'users', email);
    const imageUrl = await addProfileImage(profile, email);
    const userData = {
      email: email,
      name: name,
      password: password,
      profile: imageUrl,
      accessLevel: accessLevel,
      station: station
    };
    await setDoc(userRef, userData);
    console.log('User added successfully.');
    return true;
  } catch (error) {
    console.error('Error adding user:', error);
    return false;
  }
};

const addProfileImage = async (profile, email) => {
  const storageRef = ref(storage, 'profile/' + email);
  let imageurl = '';
  try {
    const snapshot = await uploadBytes(storageRef, profile);
    imageurl = await getDownloadURL(snapshot.ref);
    return imageurl;
  } catch (error) {
    throw error;
  }
};

export { addUser };



