'use client';

import { useState, useEffect } from 'react';
import { getRadars, Radar } from '@/lib/database';
import { toast } from 'react-hot-toast';

export default function RadarsPage() {
  const [radars, setRadars] = useState<Radar[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRadars();
  }, []);

  const loadRadars = async () => {
    try {
      const data = await getRadars();
      setRadars(data);
    } catch (error) {
      toast.error('Radarlarni yuklashda xatolik');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-yellow-600 text-white p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">📡 Radarlar</h1>
            <p className="text-sm opacity-90">Tezlikni oshirmang!</p>
          </div>
          <a href="/" className="text-white underline">← Orqaga</a>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin text-4xl">📡</div>
            <p className="mt-2">Yuklanmoqda...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {radars.map((radar) => (
              <div key={radar.id} className="card hover:shadow-xl transition-shadow border-l-4 border-yellow-500">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-lg">
                    {radar.type === 'stationary' ? '📸 Statsionar' : '🚗 Mobil'} Radar
                  </h3>
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-bold">
                    {radar.speedLimit} km/h
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-2">
                  📍 Koordinatalar: {radar.location.lat.toFixed(4)}, {radar.location.lng.toFixed(4)}
                </p>
                
                <p className="text-gray-600 text-sm mb-3">
                  🛣️ Yo'nalish: {radar.direction}
                </p>
                
                <div className="text-xs text-gray-400">
                  Oxirgi yangilanish: {new Date(radar.lastReported).toLocaleString('uz-UZ')}
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800 text-sm">
            ⚠️ Ogohlantirish: Tezlikni me'yorida saqlang! Yo'l harakati qoidalariga rioya qiling.
          </p>
        </div>
        
        {/* Reklama */}
        <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 my-8 text-center">
          <p className="text-gray-500">📢 Reklama uchun joy</p>
        </div>
      </div>
    </div>
  );
}
