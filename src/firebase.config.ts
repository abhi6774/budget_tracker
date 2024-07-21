import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBCXe7ww5TSx04r77Hg-ZOGsRx9ZDRmQcM",
  authDomain: "lostfound-b1470.firebaseapp.com",
  projectId: "lostfound-b1470",
  storageBucket: "lostfound-b1470.appspot.com",
  messagingSenderId: "1089289092678",
  appId: "1:1089289092678:web:3429f3bb51c7617c485447"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);