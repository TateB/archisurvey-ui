import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./fbconfig";

const app = initializeApp(firebaseConfig);
export const db = getFirestore();

export const fetchDb = (dbtype) =>
  getDocs(collection(db, dbtype)).then((snap) => snap.docs);
