import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/functions'

export async function googleLogin () {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
}

export function getCurrentUser () {
  return firebase.auth().currentUser.uid;
}