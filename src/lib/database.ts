// Ma'lumotlar qo'lda kiritilgan (Firebase o'rniga)
// Keyinchalik Firebase qo'shamiz

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
  createdAt: string;
}

export interface Workshop {
  id: string;
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
  id: string;
  location: {
    lat: number;
    lng: number;
  };
  type: 'stationary' | 'mobile';
  speedLimit: number;
  direction: string;
  lastReported: string;
}

// Test ma'lumotlar
const workshops: Workshop[] = [
  {
    id: '1',
    name: "M39 Avto Service",
    location: { lat: 40.7128, lng: 64.5761 },
    address: "M39, 145-km, Navoiy viloyati",
    phone: "+998901234567",
    services: ["Dvigatel", "Shina", "Elektrik"],
    rating: 4.5,
    isOpen: true
  },
  {
    id: '2',
    name: "Yo'l Bo'yi Texnik Xizmat",
    location: { lat: 40.8128, lng: 64.6761 },
    address: "M39, 189-km, Buxoro viloyati",
    phone: "+998907654321",
    services: ["Shina", "Yonilg'i", "Evakuator"],
    rating: 4.8,
    isOpen: true
  },
  {
    id: '3',
    name: "Master Service M39",
    location: { lat: 40.6128, lng: 64.4761 },
    address: "M39, 98-km, Samarqand viloyati",
    phone: "+998905556677",
    services: ["To'liq diagnoz", "Dvigatel", "Kuzov"],
    rating: 4.2,
    isOpen: false
  },
  {
    id: '4',
    name: "Tez Yordam Auto",
    location: { lat: 40.7528, lng: 64.5861 },
    address: "M39, 120-km, Navoiy",
    phone: "+998909876543",
    services: ["Shina", "Evakuator", "Elektrik"],
    rating: 4.6,
    isOpen: true
  }
];

const radars: Radar[] = [
  {
    id: '1',
    location: { lat: 40.7528, lng: 64.5861 },
    type: "stationary",
    speedLimit: 90,
    direction: "Toshkent-Samarqand",
    lastReported: "2024-01-15T10:30:00Z"
  },
  {
    id: '2',
    location: { lat: 40.8228, lng: 64.6461 },
    type: "mobile",
    speedLimit: 70,
    direction: "Samarqand-Buxoro",
    lastReported: "2024-01-15T11:00:00Z"
  },
  {
    id: '3',
    location: { lat: 40.6828, lng: 64.5261 },
    type: "stationary",
    speedLimit: 110,
    direction: "Ikkala yo'nalish",
    lastReported: "2024-01-15T09:00:00Z"
  },
  {
    id: '4',
    location: { lat: 40.7728, lng: 64.6061 },
    type: "stationary",
    speedLimit: 60,
    direction: "Buxoro-Toshkent",
    lastReported: "2024-01-14T15:00:00Z"
  }
];

// SOS yordam so'rash (hozircha localStorage'ga saqlaymiz)
export async function sendEmergencyRequest(data: Omit<EmergencyRequest, 'id' | 'status' | 'createdAt'>) {
  const request: EmergencyRequest = {
    ...data,
    id: Date.now().toString(),
    status: 'waiting',
    createdAt: new Date().toISOString()
  };
  
  // localStorage'ga saqlash
  const requests = JSON.parse(localStorage.getItem('emergency_requests') || '[]');
  requests.push(request);
  localStorage.setItem('emergency_requests', JSON.stringify(requests));
  
  // Telegram'ga yuborish (ixtiyoriy)
  const message = `🆘 YANGI YORDAM SO'ROVI:
📱 Tel: ${data.phone}
🚗 Mashina: ${data.carModel}
📍 Manzil: ${data.location.address}
🔧 Muammo: ${data.description}
🗺 Koordinatalar: ${data.location.lat}, ${data.location.lng}`;
  
  console.log('Yordam so\'rovi:', message);
  
  return request.id;
}

// Ustaxonalarni olish
export async function getWorkshops() {
  return workshops;
}

// Radarlarni olish
export async function getRadars() {
  return radars;
}

// Yaqin yordam so'rash
export async function findNearbyHelp(lat: number, lng: number) {
  return workshops.filter(workshop => {
    const distance = calculateDistance(lat, lng, workshop.location.lat, workshop.location.lng);
    return distance < 50;
  });
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}
