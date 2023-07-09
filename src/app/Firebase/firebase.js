// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCa0_zeLHVaDM1lCLtTVBQ7ZJKUDiBbcqs",
  authDomain: "chat-app-61a87.firebaseapp.com",
  projectId: "chat-app-61a87",
  storageBucket: "chat-app-61a87.appspot.com",
  messagingSenderId: "969473806217",
  appId: "1:969473806217:web:ce1fce03c8947d7a961b58",
  measurementId: "G-E8G1CMKLCS",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);
