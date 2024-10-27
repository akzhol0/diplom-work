import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBTncB0BpcyPle6NStXKZazPMDBoziGRO4',
  authDomain: 'diplom-work-477e6.firebaseapp.com',
  projectId: 'diplom-work-477e6',
  storageBucket: 'diplom-work-477e6.appspot.com',
  messagingSenderId: '406241106714',
  appId: '1:406241106714:web:4c60608a58ee91140beaa3',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
