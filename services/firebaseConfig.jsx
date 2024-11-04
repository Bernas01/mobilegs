// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Importa o Firestore

const firebaseConfig = {
  apiKey: "AIzaSyA7TSS34tVQd3bVJK8HOxe4hG-cv1W50tI",
  authDomain: "challenge-2-887b4.firebaseapp.com",
  projectId: "challenge-2-887b4",
  storageBucket: "challenge-2-887b4.appspot.com",
  messagingSenderId: "983561455217",
  appId: "1:983561455217:web:95dd19e19358ad35a3fdd0",
  measurementId: "G-DGWCT6ELQ7"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app); // Inicializa o Firestore e exporta
