import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  authDomain: "footwear-3b4a0.firebaseapp.com",
  projectId: "footwear-68242",
  apiKey: "AIzaSyAzPdJg0DVENI7nL-04ERWmmyD_hKLgv-o",
  storageBucket: "footwear-3b4a0.appspot.com",
  databaseURL: "https://footwear-3b4a0-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

