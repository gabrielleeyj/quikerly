import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCqrFY2XX0Ys92lxNqwmHt5FgqcMVl6-BI",
  authDomain: "quikerly-auth.firebaseapp.com",
  projectId: "quikerly-auth",
  storageBucket: "quikerly-auth.appspot.com",
  messagingSenderId: "84797213970",
  appId: "1:84797213970:web:f37208d0abe669b431b7cb"
};

try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error("Firebase initialization error", err.stack);
  }
}
const fire = firebase;
export default fire;

const googleProvider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  fire
    .auth()
    .signInWithPopup(googleProvider)
    .then(res => {
      console.log(res.user);
    })
    .catch(error => {
      console.log(error.message);
    });
};

const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const signInWithFacebook = () => {
  fire
    .auth()
    .signInWithPopup(facebookProvider)
    .then(res => {
      console.log(res.user);
    })
    .catch(error => {
      console.log(error.message);
    });
};
