// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtVBhwJ8fYJsSexmBS_Iam3kAyvirUdKE",
  authDomain: "my--students.firebaseapp.com",
  projectId: "my--students",
  storageBucket: "my--students.appspot.com",
  messagingSenderId: "818331859407",
  appId: "1:818331859407:web:00f0cad42109dbc1fe7aba",
  measurementId: "G-ETWFR7G46N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
export {db , storage}