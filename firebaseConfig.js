// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSJnfC29h8dKcPrfF3lEivDoRm1653aQk",
  authDomain: "sakura-f9829.firebaseapp.com",
  projectId: "sakura-f9829",
  storageBucket: "sakura-f9829.firebasestorage.app",
  messagingSenderId: "1086014402145",
  appId: "1:1086014402145:web:be38eba41007c2e6530420"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);