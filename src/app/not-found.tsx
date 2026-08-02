import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-300">404</h1>
        <p className="text-xl mt-4">Sahifa topilmadi</p>
        <p className="text-gray-500 mt-2">Bu sahifa mavjud emas yoki o'chirilgan</p>
        <Link 
          href="/"
          className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Bosh sahifaga qaytish
        </Link>
      </div>
    </div>
  );
}
