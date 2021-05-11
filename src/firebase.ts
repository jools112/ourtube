import firebase from "firebase/app";

import "firebase/firestore"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALGgez8M7bTDPXSgS1LnPqVr1zcPDkC68",
  authDomain: "iprog-1cb90.firebaseapp.com",
  databaseURL: "https://iprog-1cb90-default-rtdb.firebaseio.com",
  projectId: "iprog-1cb90",
  storageBucket: "iprog-1cb90.appspot.com",
  messagingSenderId: "313590510534",
  appId: "1:313590510534:web:f55182a9da02fe457eb8c7",
  measurementId: "G-J0SVR5PEMP"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
export const firestore = firebase.firestore();