// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCuI0nLudeG5yKtNDkwmv5nzFhfY04teE",
  authDomain: "codeforces-handler.firebaseapp.com",
  projectId: "codeforces-handler",
  storageBucket: "codeforces-handler.appspot.com",
  messagingSenderId: "479721348948",
  appId: "1:479721348948:web:233970529808550ac4b2c1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth