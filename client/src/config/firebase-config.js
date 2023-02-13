// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyButDD0j5V5eMJ_FtF4RgVuCi5dpXMH0Lg",
  authDomain: "find-doctor7976.firebaseapp.com",
  projectId: "find-doctor7976",
  storageBucket: "find-doctor7976.appspot.com",
  messagingSenderId: "517754787570",
  appId: "1:517754787570:web:1127474cbd5b9a4302a26b",
  measurementId: "G-3HHT1LW095",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
