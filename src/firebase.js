import firebase from "firebase";

const firebaseConfig = {
  // apiKey: "AIzaSyDAvYzo61o7Y5VH0Tz48Ohs6b1dDgOYIDQ",
  // authDomain: "clone-80d8d.firebaseapp.com",
  // projectId: "clone-80d8d",
  // storageBucket: "clone-80d8d.appspot.com",
  // messagingSenderId: "103190326603",
  // appId: "1:103190326603:web:6e1d7e8add761b7c33ccce",
  apiKey: "AIzaSyDAvYzo61o7Y5VH0Tz48Ohs6b1dDgOYIDQ",
  authDomain: "clone-80d8d.firebaseapp.com",
  databaseURL: "https://clone-80d8d-default-rtdb.firebaseio.com",
  projectId: "clone-80d8d",
  storageBucket: "clone-80d8d.appspot.com",
  messagingSenderId: "103190326603",
  appId: "1:103190326603:web:6e1d7e8add761b7c33ccce",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };