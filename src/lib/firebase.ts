import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth, signInAnonymously } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyA_uezVSt3VtUjoGFTqWpDeq-FVgew9KdQ",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "m39-yol-yordam.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "m39-yol-yordam",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "m39-yol-yordam.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "68085950154",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:68085950154:web:d765b53ec71d7195fc3633"
};

let app;
try {
  app = initializeApp(firebaseConfig);
} catch (e) {
  app = initializeApp(firebaseConfig, 'm39-app');
}

export const db = getFirestore(app);
export const auth = getAuth(app);

if (typeof window !== 'undefined') {
  signInAnonymously(auth).catch(() => {});
}
