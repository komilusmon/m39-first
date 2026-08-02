import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA_uezVSt3VtUjoGFTqWpDeq-FVgew9KdQ",
  authDomain: "m39-yol-yordam.firebaseapp.com",
  projectId: "m39-yol-yordam",
  storageBucket: "m39-yol-yordam.firebasestorage.app",
  messagingSenderId: "68085950154",
  appId: "1:68085950154:web:d765b53ec71d7195fc3633"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Avtomatik anonim kirish
signInAnonymously(auth).catch((error) => {
  console.error("Auth error:", error);
});
