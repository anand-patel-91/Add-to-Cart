import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBSy2LQX-8-4Bui2NDVTBL7WJtaa-N_bNI",
    authDomain: "playground-3f040.firebaseapp.com",
    databaseURL:
        "https://playground-3f040-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "playground-3f040",
    storageBucket: "playground-3f040.appspot.com",
    messagingSenderId: "741556035131",
    appId: "1:741556035131:web:47313ed6a133516888061e",
};

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
