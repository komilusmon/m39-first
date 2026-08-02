'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

export default function Home() {
  const [location, setLocation] = useState<{lat: number; lng: number} | null>(null);
  const [showSOS, setShowSOS] = useState(false);
  const [formData, setFormData] = useState({
    phone: '',
    carModel: '',
    description: ''
  });

  useEffect(() => {
    // Geolokatsiyani so'rash
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Geolokatsiya xatosi:', error);
          // M39 yo'lining markaziy nuqtasi
          setLocation({ lat: 40.7128, lng: 64.5761 });
        }
      );
    }
  }, []);

  const handleSOS = () => {
    if (!formData.phone || !formData.carModel || !formData.description) {
      toast.error('Iltimos, barcha maydonlarni to\'ldiring!');
      return;
    }

    // Bu yerda yordam chaqiruv funksiyasi
    toast.success('Yordam so\'rovingiz qabul qilindi! Tez orada aloqaga chiqamiz.');
    setShowSOS(false);
    setFormData({ phone: '', carModel: '', description: '' });
  };

  const handleShareLocation = () => {
    if (location) {
      const text = `Menga yordam kerak! Manzil: https://www.google.com/maps?q=${location.lat},${location.lng}`;
      
      // Telegram orqali ulashish
      window.open(`https://t.me/share/url?url=${encodeURIComponent(text)}`, '_blank');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">🚗 M39 Yo'l Yordam</h1>
            <p className="text-sm opacity-90">Tezkor yordam xizmati - 24/7</p>
          </div>
          <div className="text-right">
            <p className="font-bold">📞 1033</p>
            <p className="text-xs">Tezkor aloqa</p>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4">
        {/* SOS Tugma */}
        <div className="text-center my-8">
          <button
            onClick={() => setShowSOS(true)}
            className="btn-emergency text-2xl px-12 py-6 rounded-full shadow-2xl"
          >
            🆘 SOS - Yordam kerak!
          </button>
          <p className="mt-2 text-gray-600 text-sm">
            Faqat favqulotda holatlarda bosing
          </p>
        </div>

        {/* Tezkor xizmatlar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
          <div className="card">
            <div className="text-4xl mb-2">🔧</div>
            <h3 className="font-bold text-lg">Ustaxonalar</h3>
            <p className="text-gray-600 text-sm">Yaqin ustaxonalarni topish</p>
            <button className="btn-primary mt-3 w-full">Ko'rish</button>
          </div>

          <div className="card">
            <div className="text-4xl mb-2">📡</div>
            <h3 className="font-bold text-lg">Radarlar</h3>
            <p className="text-gray-600 text-sm">Yo'l radarlari xaritasi</p>
            <button className="btn-primary mt-3 w-full">Xaritada ko'rish</button>
          </div>

          <div className="card">
            <div className="text-4xl mb-2">📍</div>
            <h3 className="font-bold text-lg">Manzil ulashish</h3>
            <p className="text-gray-600 text-sm">Joylashuvingizni yuborish</p>
            <button 
              onClick={handleShareLocation}
              className="btn-primary mt-3 w-full bg-green-600 hover:bg-green-700"
            >
              Ulashish
            </button>
          </div>
        </div>

        {/* Reklama joyi */}
        <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 my-8 text-center">
          <p className="text-gray-500 text-sm">📢 Reklama uchun joy</p>
          <p className="text-gray-400 text-xs mt-1">Google AdSense kodi shu yerga</p>
        </div>
      </div>

      {/* SOS Modal */}
      {showSOS && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-red-600">🆘 Tezkor yordam</h2>
              <button 
                onClick={() => setShowSOS(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">📱 Telefon raqamingiz</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="+998 XX XXX XX XX"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">🚗 Mashina modeli</label>
                <input
                  type="text"
                  value={formData.carModel}
                  onChange={(e) => setFormData({...formData, carModel: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Masalan: Nexia 3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">📝 Muammo tavsifi</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2"
                  rows={3}
                  placeholder="Nima bo'ldi? Qanday yordam kerak?"
                />
              </div>

              {location && (
                <div className="bg-green-50 p-3 rounded-lg text-sm">
                  <p className="font-medium">📍 Sizning joylashuvingiz:</p>
                  <p className="text-gray-600">{location.lat.toFixed(4)}, {location.lng.toFixed(4)}</p>
                </div>
              )}

              <button
                onClick={handleSOS}
                className="btn-emergency w-full text-lg"
              >
                🆘 Yordam chaqirish
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
