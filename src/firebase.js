import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAWULbA8p8K4hfsdVYA0ZwxIcXf5ysl7fw",
  authDomain: "clone-project-f8143.firebaseapp.com",
  databaseURL: "https://clone-project-f8143.firebaseio.com",
  projectId: "clone-project-f8143",
  storageBucket: "clone-project-f8143.appspot.com",
  messagingSenderId: "878273068248",
  appId: "1:878273068248:web:cf7ee8da4421f945de6bad",
  measurementId: "G-FNF4LYEYE8",
};

//App initilization
const firebaseApp = firebase.initializeApp(firebaseConfig);

//DB initilization
const db = firebaseApp.firestore();

//Authentication variable
const auth = firebase.auth();

export { db, auth };
