import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyC-Zb9LGrpObvkTNHFZowJhaJuYn7be3ns",
	authDomain: "quikerly-5492e.firebaseapp.com",
	projectId: "quikerly-5492e",
	storageBucket: "quikerly-5492e.appspot.com",
	messagingSenderId: "248450128862",
	appId: "1:248450128862:web:35b22be8c52bd16e341b4f",
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
