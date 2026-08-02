'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="text-6xl">😕</div>
        <h2 className="text-xl font-bold mt-4">Xatolik yuz berdi</h2>
        <p className="text-gray-500 mt-2">Iltimos, qayta urinib ko'ring</p>
        <button
          onClick={reset}
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Qayta urinish
        </button>
      </div>
    </div>
  );
}
