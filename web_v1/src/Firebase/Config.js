import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA9bNV1VWfpewQ43al3ZYxvVgtMFzjIMPM",
    authDomain: "automationweb-e08b5.firebaseapp.com",
    projectId: "automationweb-e08b5",
    storageBucket: "automationweb-e08b5.appspot.com",
    messagingSenderId: "560563663258",
    appId: "1:560563663258:web:6b75db6e634fc5922f8a23",
    measurementId: "G-6CYFVD3TR8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

export { app, firestore, auth };