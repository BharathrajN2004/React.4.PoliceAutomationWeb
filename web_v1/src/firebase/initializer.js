import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAQS02U4PBV0c6m8GWWBI7MSTxgpfqJThI",
    authDomain: "caseautomationweb.firebaseapp.com",
    projectId: "caseautomationweb",
    storageBucket: "caseautomationweb.appspot.com",
    messagingSenderId: "704883526161",
    appId: "1:704883526161:web:ea23619de7c43002487fb0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, firestore, auth, storage};