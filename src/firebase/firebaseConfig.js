import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCvhw-a-ssj_M5v2ecIqAvJJ5okEziIdA0",
  authDomain: "my-kitchen-d54b1.firebaseapp.com",
  projectId: "my-kitchen-d54b1",
  storageBucket: "my-kitchen-d54b1.appspot.com",
  messagingSenderId: "1090799622914",
  appId: "1:1090799622914:web:50e2add50e2d6db5c6401b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// auth
export const auth = getAuth(app);

// db
export const db = getFirestore(app);
