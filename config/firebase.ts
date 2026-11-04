// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfvdG_qzvWfVvDRoNb43tWyJYPvmN67ek",
  authDomain: "fix-forge-d73a0.firebaseapp.com",
  projectId: "fix-forge-d73a0",
  storageBucket: "fix-forge-d73a0.firebasestorage.app",
  messagingSenderId: "112013762581",
  appId: "1:112013762581:web:22cb6bcd3c857485f52e1c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 

const db = getFirestore(app);
export{db}