export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-bounce text-6xl">🚗</div>
        <p className="mt-4 text-lg text-gray-600">Yuklanmoqda...</p>
        <div className="mt-4 w-48 h-2 bg-gray-200 rounded-full mx-auto">
          <div className="h-full bg-blue-600 rounded-full animate-pulse" style={{width: '60%'}}></div>
        </div>
      </div>
    </div>
  );
}
