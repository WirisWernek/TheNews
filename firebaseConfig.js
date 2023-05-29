import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAFz4MJNgcLSbNYz_BcpPyRzuX12rRzWpQ",
  authDomain: "thenews-1d5b6.firebaseapp.com",
  projectId: "thenews-1d5b6",
  storageBucket: "thenews-1d5b6.appspot.com",
  messagingSenderId: "469353727431",
  appId: "1:469353727431:web:e06ded8b4b6de72fcd45e2",
  measurementId: "G-6M8Z8JDNBM"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);
