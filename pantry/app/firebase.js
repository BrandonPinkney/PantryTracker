// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.g oogle.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcUU9-P8D9_1P1ZpotEbiFOrhMUQUccsA",
  authDomain: "pantryex-a95e7.firebaseapp.com",
  projectId: "pantryex-a95e7",
  storageBucket: "pantryex-a95e7.appspot.com",
  messagingSenderId: "757000913135",
  appId: "1:757000913135:web:b9812129f35d5d84311b1a",
  measurementId: "G-DRKXGN58SW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };