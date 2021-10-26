import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCONJxh_kbqX6QqulrgKb5grmr6xOls6p4",
  authDomain: "archisurvey.firebaseapp.com",
  projectId: "archisurvey",
  storageBucket: "archisurvey.appspot.com",
  messagingSenderId: "228944202121",
  appId: "1:228944202121:web:03949f1941c266b3907958",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore();

export const fetchDb = (dbtype) =>
  getDocs(collection(db, dbtype)).then((snap) => snap.docs);
