import firebase from 'firebase/compat'
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAzEotkJbY5v_hwm8BhcTpzX7Bwx6YPS34",
  authDomain: "register-crud-ec6af.firebaseapp.com",
  projectId: "register-crud-ec6af",
  storageBucket: "register-crud-ec6af.appspot.com",
  messagingSenderId: "748921823337",
  appId: "1:748921823337:web:654f9ee4051439f86f42f8"
};

// Initialize Firebase
var firebaseDB = firebase.initializeApp(firebaseConfig);

export default firebaseDB.database().ref();