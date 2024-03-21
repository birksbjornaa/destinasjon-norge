import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBu_-Oya6M9bSJYVSnFGMMaOdlTj2iV-Oc",
  authDomain: "tdt4140.firebaseapp.com",
  projectId: "tdt4140",
  storageBucket: "tdt4140.appspot.com",
  messagingSenderId: "434938957780",
  appId: "1:434938957780:web:8f0390a31c8856e0b79041",
};

// Initialize Firebase
export const auth = initializeApp(firebaseConfig);
export const db = getFirestore(auth);

