import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAsT6DSwENlqMWuu24o0QitNODVV37zXNo",
  authDomain: "code-compiler-f2ef2.firebaseapp.com",
  projectId: "code-compiler-f2ef2",
  storageBucket: "code-compiler-f2ef2.appspot.com",
  messagingSenderId: "513317939250",
  appId: "1:513317939250:web:c8e396b97d29f3fd6e342b",
  measurementId: "G-QTQVGGMNE4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {auth, db};