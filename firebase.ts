import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import explore from "./app/(tabs)/explore";

const firebaseConfig = {
  apiKey: "AIzaSyBczuk8K7wAF356cmj_U-DHgOtCu9UBE1A",
  authDomain: "skyconnect-59e61.firebaseapp.com",
  projectId: "skyconnect-59e61",
  storageBucket: "skyconnect-59e61.firebasestorage.app",  
  messagingSenderId: "618533311227",
  appId: "1:618533311227:web:3cabc5d8312dfd3858d65e"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);