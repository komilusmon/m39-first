import { db } from './firebase';
import { collection, addDoc, getDocs, query, where, serverTimestamp } from 'firebase/firestore';

export interface EmergencyRequest {
  id?: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  phone: string;
  description: string;
  carModel: string;
  status: 'waiting' | 'accepted' | 'completed';
  createdAt: any;
  helpers: string[];
}

export interface Workshop {
  id?: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  address: string;
  phone: string;
  services: string[];
  rating: number;
  isOpen: boolean;
}

export interface Radar {
  id?: string;
  location: {
    lat: number;
    lng: number;
  };
  type: 'stationary' | 'mobile';
  speedLimit: number;
  direction: string;
  lastReported: any;
}

// SOS yordam so'rash
export async function sendEmergencyRequest(data: Omit<EmergencyRequest, 'id' | 'status' | 'createdAt' | 'helpers'>) {
  try {
    const docRef = await addDoc(collection(db, 'emergency_requests'), {
      ...data,
      status: 'waiting',
      createdAt: serverTimestamp(),
      helpers: []
    });
    return docRef.id;
  } catch (error) {
    console.error('Error sending emergency:', error);
    throw error;
  }
}

// Ustaxonalarni olish
export async function getWorkshops() {
  const querySnapshot = await getDocs(collection(db, 'workshops'));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Workshop[];
}

// Radarlarni olish
export async function getRadars() {
  const querySnapshot = await getDocs(collection(db, 'radars'));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Radar[];
}

// Yaqin yordam so'rash
export async function findNearbyHelp(lat: number, lng: number) {
  const workshops = await getWorkshops();
  // Masofani hisoblash funksiyasi
  const nearby = workshops.filter(workshop => {
    const distance = calculateDistance(lat, lng, workshop.location.lat, workshop.location.lng);
    return distance < 50; // 50 km ichida
  });
  return nearby;
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Yer radiusi km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}
