'use client';

import { useState, useEffect } from 'react';
import { getWorkshops, Workshop } from '@/lib/database';
import { toast } from 'react-hot-toast';

export default function WorkshopsPage() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWorkshops();
  }, []);

  const loadWorkshops = async () => {
    try {
      const data = await getWorkshops();
      setWorkshops(data);
    } catch (error) {
      toast.error('Ustaxonalarni yuklashda xatolik');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-green-600 text-white p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">🔧 Ustaxonalar</h1>
            <p className="text-sm opacity-90">M39 yo'li bo'ylab</p>
          </div>
          <a href="/" className="text-white underline">← Orqaga</a>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin text-4xl">⚙️</div>
            <p className="mt-2">Yuklanmoqda...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {workshops.map((workshop) => (
              <div key={workshop.id} className="card hover:shadow-xl transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-lg">{workshop.name}</h3>
                  <span className={`px-2 py-1 rounded text-xs ${
                    workshop.isOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {workshop.isOpen ? '🟢 Ochiq' : '🔴 Yopiq'}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-2">📍 {workshop.address}</p>
                <p className="text-gray-600 text-sm mb-3">📞 {workshop.phone}</p>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {workshop.services.map((service, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                      {service}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-yellow-500">★ {workshop.rating}</span>
                  <a 
                    href={`tel:${workshop.phone}`}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                  >
                    📞 Qo'ng'iroq
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Reklama */}
        <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 my-8 text-center">
          <p className="text-gray-500">📢 Reklama uchun joy</p>
        </div>
      </div>
    </div>
  );
}
