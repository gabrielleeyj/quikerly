import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyCqrFY2XX0Ys92lxNqwmHt5FgqcMVl6-BI",
	authDomain: "quikerly-auth.firebaseapp.com",
	projectId: "quikerly-auth",
	storageBucket: "quikerly-auth.appspot.com",
	messagingSenderId: "84797213970",
	appId: "1:84797213970:web:f37208d0abe669b431b7cb",
};

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({
	timestampsInSnapshots: true,
});
const fire = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const timeStamp = firebase.firestore.FieldValue.serverTimestamp;
export { timeStamp, storage, fire, auth, firebaseConfig };
export default firebase;
