import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDMOU-pL0eYGrfkwpM-NZ1BLB1QeUs41jg",
  authDomain: "react-fbprj1.firebaseapp.com",
  projectId: "react-fbprj1",
  storageBucket: "react-fbprj1.firebasestorage.app",
  messagingSenderId: "22513855960",
  appId: "1:22513855960:web:049ed42d859ae155ca16ad"
};

const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth }