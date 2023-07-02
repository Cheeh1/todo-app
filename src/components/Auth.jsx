// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIR94yAPeTPah1jzJr7R-BlBYxLhm52cM",
  authDomain: "todoapp-5a24f.firebaseapp.com",
  projectId: "todoapp-5a24f",
  storageBucket: "todoapp-5a24f.appspot.com",
  messagingSenderId: "814757070552",
  appId: "1:814757070552:web:d6cbf20e312802f0bbb9ad",
  measurementId: "G-76R84H23FK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);