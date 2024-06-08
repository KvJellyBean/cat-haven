// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, inMemoryPersistence } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDj9SN8STF-xfwIggjsbjXlntBw-lMOAzQ",
  authDomain: "cat-fire-fc1a6.firebaseapp.com",
  projectId: "cat-fire-fc1a6",
  storageBucket: "cat-fire-fc1a6.appspot.com",
  messagingSenderId: "354962456166",
  appId: "1:354962456166:web:495dce0facd989e91977a7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: inMemoryPersistence
});