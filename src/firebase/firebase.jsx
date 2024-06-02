// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore} from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJVlj6NjFwis8gO0JetuYXpxMKCc4mDYg",
  authDomain: "workable-web-app.firebaseapp.com",
  projectId: "workable-web-app",
  storageBucket: "workable-web-app.appspot.com",
  messagingSenderId: "579092697976",
  appId: "1:579092697976:web:69b250cc7b41a9944e6e8d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
// const analytics = getAnalytics(app);

export { app, auth }; 