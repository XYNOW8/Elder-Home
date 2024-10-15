// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAjCdr63ChlPY4_Fwj9zMPo67KSqoZh_JY",
    authDomain: "week7-xiao.firebaseapp.com",
    projectId: "week7-xiao",
    storageBucket: "week7-xiao.appspot.com",
    messagingSenderId: "1016133987190",
    appId: "1:1016133987190:web:7bad046f1aa27c9ea3e857"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Cloud Functions and connect to the local emulator
export const functions = getFunctions(app);
connectFunctionsEmulator(functions, "127.0.0.1", 5001);
