import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, signInAnonymously, connectAuthEmulator } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA_uezVSt3VtUjoGFTqWpDeq-FVgew9KdQ",
  authDomain: "m39-yol-yordam.firebaseapp.com",
  projectId: "m39-yol-yordam",
  storageBucket: "m39-yol-yordam.firebasestorage.app",
  messagingSenderId: "68085950154",
  appId: "1:68085950154:web:d765b53ec71d7195fc3633"
};

// Firebase faqat bir marta initialize qilinsin
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
export const auth = getAuth(app);

// Auth boshlanganda anonim kirish
if (typeof window !== 'undefined') {
  signInAnonymously(auth).catch((error) => {
    console.error("Auth error:", error);
  });
}
