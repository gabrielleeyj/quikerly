import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth';

//your config
const firebaseConfig = {
};

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({
    timestampsInSnapshots: true
});
const storage = firebase.storage();
const timeStamp = firebase.firestore.FieldValue.serverTimestamp;
export { timeStamp, storage, firebaseConfig };
export default firebase;