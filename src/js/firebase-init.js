import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/functions'
import 'firebase/storage'

export default function initializeFirebase () {
  const firebaseConfig = {
    apiKey: "AIzaSyA8ppkrYQVZ0VL9u2jpnjarDk3-C9tWqVY",
    authDomain: "staging-prodigie.firebaseapp.com",
    databaseURL: "https://staging-prodigie.firebaseio.com",
    projectId: "staging-prodigie",
    storageBucket: "staging-prodigie.appspot.com",
    messagingSenderId: "478218619325",
    appId: "1:478218619325:web:b3fa068c42450849"
  };
  firebase.initializeApp(firebaseConfig)
  if (window.location.hostname === 'localhost') {
    const db = firebase.firestore()
    db.settings({
      host: 'localhost:8080',
      ssl: false,
    })
    firebase.auth().useEmulator('http://localhost:9099/')
    firebase.functions().useEmulator("localhost", 5001);
    firebase.storage().useEmulator("localhost", 9199);
  }
  console.log('initalizing app')
}


window.firebase = firebase