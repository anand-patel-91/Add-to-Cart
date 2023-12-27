import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCMZjFh5rYuHTUSWsGYxMyRw-QBs5qY0-0",
    authDomain: "add-to-cart-fd487.firebaseapp.com",
    databaseURL:
        "https://add-to-cart-fd487-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "add-to-cart-fd487",
    storageBucket: "add-to-cart-fd487.appspot.com",
    messagingSenderId: "356297981192",
    appId: "1:356297981192:web:649e23c569fb6fc43880bd",
};

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
