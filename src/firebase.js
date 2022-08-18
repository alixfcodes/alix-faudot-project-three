// firebase.js
import { initializeApp } from "firebase/app";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAQ-WXUTXwxPIXURNwWDnGH3A8pUfmLk-Q",
    authDomain: "grocery-list-f6e3e.firebaseapp.com",
    projectId: "grocery-list-f6e3e",
    storageBucket: "grocery-list-f6e3e.appspot.com",
    messagingSenderId: "693808609301",
    appId: "1:693808609301:web:ac3dfcc2855d067f97f61c",
    measurementId: "G-H7NN3K424B",
};

// Initialize Firebase
// setting a variable that initializes our application
const firebase = initializeApp(firebaseConfig);

// this exports the CONFIGURED version of firebase
export default firebase;
