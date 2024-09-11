// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// get firestore is a function that Returns an existing Firestore instance and
//Initializes a new instance
//and Provides access to database operations
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBSvhtUotbd8d0Y_gnN0rolc5y3t65GZk",
  authDomain: "realtor-app-react-26b12.firebaseapp.com",
  projectId: "realtor-app-react-26b12",
  storageBucket: "realtor-app-react-26b12.appspot.com",
  messagingSenderId: "102710604703",
  appId: "1:102710604703:web:c005f9033f8dd735fd43aa"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db =getFirestore();