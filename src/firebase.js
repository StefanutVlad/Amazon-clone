import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDtt55dGwOEmRh8ULvp7PlaVK98iQB5HFg",
  authDomain: "clone-60a7f.firebaseapp.com",
  databaseURL:
    "https://clone-60a7f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "clone-60a7f",
  storageBucket: "clone-60a7f.appspot.com",
  messagingSenderId: "256307519173",
  appId: "1:256307519173:web:abfa3f9d6f2c597f75daac",
  measurementId: "G-T4X03EBTCJ",
};

//App initilization
const firebaseApp = firebase.initializeApp(firebaseConfig);

//DB initilization
const db = firebaseApp.firestore();

//Authentication variable
const auth = firebase.auth();

export { db, auth };
