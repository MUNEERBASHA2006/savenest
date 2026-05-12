import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
apiKey: "AIzaSyAR3g1HWlWWR-9klI4sf2OCNicbDleQwpM",
authDomain: "savenest-40a7c.firebaseapp.com",
projectId: "savenest-40a7c",
storageBucket: "savenest-40a7c.firebasestorage.app",
messagingSenderId: "111395944124",
appId: "1:111395944124:web:405e590242bb308dbac2b9"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
