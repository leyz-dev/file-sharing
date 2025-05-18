// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvWHwHipgYQv4p-v1XtNYB2elnrJrrZ7g",
  authDomain: "file-sharing-6a3f4.firebaseapp.com",
  projectId: "file-sharing-6a3f4",
  storageBucket: "file-sharing-6a3f4.appspot.com",
  messagingSenderId: "256177573084",
  appId: "1:256177573084:web:8ebe97c1baeb8ff1aab819",
  measurementId: "G-ZR1S3VZ6B6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
