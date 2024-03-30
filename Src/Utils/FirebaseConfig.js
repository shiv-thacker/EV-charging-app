// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoqRekf5EbA0M5dgSy9ApzUvOj6eClQ_I",
  authDomain: "ev-charging-app-708d0.firebaseapp.com",
  projectId: "ev-charging-app-708d0",
  storageBucket: "ev-charging-app-708d0.appspot.com",
  messagingSenderId: "70900027177",
  appId: "1:70900027177:web:b31e67d4677bc89d7a3138",
  measurementId: "G-426N3MZLPR",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);
