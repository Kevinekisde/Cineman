// Import the functions you need from the SDKs you need
// import firebase from 'firebase/compat/app'
import { initializeApp } from 'firebase/app'
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDF2zjlZxFk6a_sAuaS78lkNtFfwxXIgnQ",
  authDomain: "cineman-477dc.firebaseapp.com",
  projectId: "cineman-477dc",
  storageBucket: "cineman-477dc.appspot.com",
  messagingSenderId: "69750634177",
  appId: "1:69750634177:web:5af159c0e6830d6f2f0640"
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig)
const fire = firebase.initializeApp(firebaseConfig);
const auth = fire.auth();
const google = new firebase.auth.GoogleAuthProvider();


export const authentication = getAuth(FirebaseApp)


export { auth, google, FirebaseApp };
