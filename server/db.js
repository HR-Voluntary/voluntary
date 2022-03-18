import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBUK5G4AtY1cSec_P_mCORsNJXMvPV2xg",
  authDomain: "voluntary-a8b0a.firebaseapp.com",
  projectId: "voluntary-a8b0a",
  storageBucket: "voluntary-a8b0a.appspot.com",
  messagingSenderId: "745379644506",
  appId: "1:745379644506:web:3b0489090e670ecb78c463"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Connect to Firestore:
const db = getFirestore(app);

// collectionRef:
const userRef = collection(db, 'users');

// get data
getDocs(userRef)
  .then((snapshot) => {
    console.log(snapshot)
  });