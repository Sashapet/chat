import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyD_bVWFtEUigwovFVdjW8ggkfj7KRD15-E",
    authDomain: "chat-app-3ab90.firebaseapp.com",
    projectId: "chat-app-3ab90",
    storageBucket: "chat-app-3ab90.appspot.com",
    messagingSenderId: "806867913508",
    appId: "1:806867913508:web:912e060ac28284bca0c1b1",
    measurementId: "G-YH3F9R0FJR"
  };

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const database = firebase.database();
export const storage = firebase.storage();

export default firebase;