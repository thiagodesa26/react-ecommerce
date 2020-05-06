import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDDTg8ATFrxQ4LVacMUMY-V2k7p0wF0Pj8",
  authDomain: "crwn-db-35e6c.firebaseapp.com",
  databaseURL: "https://crwn-db-35e6c.firebaseio.com",
  projectId: "crwn-db-35e6c",
  storageBucket: "crwn-db-35e6c.appspot.com",
  messagingSenderId: "882831589780",
  appId: "1:882831589780:web:e2397ad7689aae35aa0f81",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("Error creating user: ", error.message);
    }
  }
  return userRef;
};

firebase.default.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
