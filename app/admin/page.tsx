'use client';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">🎉 Admin Dashboard</h1>
        <p className="text-xl text-gray-300 mb-8">
          You successfully logged in as admin!
        </p>
        
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl">
          <h2 className="text-2xl font-semibold mb-4">User Info:</h2>
          <p>Role: {localStorage.getItem('role')}</p>
          <p>Name: {localStorage.getItem('fullName')}</p>
        </div>
      </div>
    </div>
  );
}