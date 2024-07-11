// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMyPbw3s3hNAQFo0WEbQ-bPqYRJFw6_U0",
  authDomain: "blogging-app-4f3b2.firebaseapp.com",
  projectId: "blogging-app-4f3b2",
  storageBucket: "blogging-app-4f3b2.appspot.com",
  messagingSenderId: "715368593562",
  appId: "1:715368593562:web:80930f3c4b93787a828723"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);