import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyCQj-qVBJqVtD3yvMh5u0waoFufIlDGBMI",
  authDomain: "aiq-test-b05dd.firebaseapp.com",
  projectId: "aiq-test-b05dd",
  storageBucket: "aiq-test-b05dd.firebasestorage.app",
  messagingSenderId: "929529266190",
  appId: "1:929529266190:web:8fa5631d1e92e7c7c57c5f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
