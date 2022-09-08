import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyC-lb5B2_22ymGUdx9VqAsuZIF3c9BCDTk",
    authDomain: "ionic-bf1a1.firebaseapp.com",
    projectId: "ionic-bf1a1",
    storageBucket: "ionic-bf1a1.appspot.com",
    messagingSenderId: "1004608108411",
    appId: "1:1004608108411:web:3a89e2c76042179e636fde",
    measurementId: "G-D0EWT9VN3E"
  
  }
};

const app = initializeApp(environment.firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore();

