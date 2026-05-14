'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUser, getUserRole, logout } from '@/lib/auth';

export default function AdminDashboard() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({
    role: '',
    fullName: '',
    email: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { user }, error } = await getUser();

        if (error || !user) {
          console.error('User not found:', error);
          router.push('/login');
          return;
        }

        const role = await getUserRole(user.id);

        if (!role || role !== 'admin') {
          console.error('User is not an admin');
          router.push('/dashboard');
          return;
        }

        setUserInfo({
          role: role,
          fullName: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Admin User',
          email: user.email || 'N/A'
        });
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        router.push('/login');
      }
    };

    fetchUserData();
  }, [router]);

  const handleLogout = async () => {
    await logout();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white mx-auto"></div>
          <p className="mt-6 text-xl text-gray-300">Loading Admin Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">🎉 Admin Dashboard</h1>
            <p className="text-xl text-gray-300">
              Welcome back, {userInfo.fullName}!
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Logout
          </button>
        </div>
        
        {/* User Info Card */}
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 mb-8">
          <h2 className="text-2xl font-semibold mb-4">👤 User Information</h2>
          <div className="space-y-3">
            <div className="flex items-center">
              <span className="font-semibold text-gray-300 w-32">Role:</span>
              <span className="bg-green-600 px-4 py-1 rounded-full text-sm font-bold uppercase">
                {userInfo.role}
              </span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-gray-300 w-32">Name:</span>
              <span className="text-lg">{userInfo.fullName}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-gray-300 w-32">Email:</span>
              <span className="text-lg">{userInfo.email}</span>
            </div>
          </div>
        </div>

        {/* Admin Controls */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">🛠️ Admin Controls</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button
              onClick={() => router.push('/admin/users')}
              className="bg-white/10 backdrop-blur-md p-6 rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40 hover:scale-105 text-left"
            >
              <div className="text-4xl mb-3">👥</div>
              <h3 className="text-xl font-semibold mb-2">Manage Users</h3>
              <p className="text-gray-300">View and manage all users</p>
            </button>
            
            <button
              onClick={() => router.push('/admin/courses')}
              className="bg-white/10 backdrop-blur-md p-6 rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40 hover:scale-105 text-left"
            >
              <div className="text-4xl mb-3">📚</div>
              <h3 className="text-xl font-semibold mb-2">Manage Courses</h3>
              <p className="text-gray-300">Add, edit or remove courses</p>
            </button>
            
            <button
              onClick={() => router.push('/admin/settings')}
              className="bg-white/10 backdrop-blur-md p-6 rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40 hover:scale-105 text-left"
            >
              <div className="text-4xl mb-3">⚙️</div>
              <h3 className="text-xl font-semibold mb-2">Settings</h3>
              <p className="text-gray-300">Configure system settings</p>
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">📊 Quick Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-xl">
              <div className="text-3xl font-bold mb-2">150</div>
              <div className="text-blue-200">Total Users</div>
            </div>
            
            <div className="bg-gradient-to-br from-green-600 to-green-800 p-6 rounded-xl">
              <div className="text-3xl font-bold mb-2">45</div>
              <div className="text-green-200">Active Courses</div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-6 rounded-xl">
              <div className="text-3xl font-bold mb-2">1,234</div>
              <div className="text-purple-200">Enrollments</div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-600 to-orange-800 p-6 rounded-xl">
              <div className="text-3xl font-bold mb-2">89%</div>
              <div className="text-orange-200">Completion Rate</div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">📝 Recent Activity</h2>
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-white/10">
                <div>
                  <p className="font-semibold">New user registered</p>
                  <p className="text-sm text-gray-400">john.doe@example.com</p>
                </div>
                <span className="text-sm text-gray-400">2 hours ago</span>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-white/10">
                <div>
                  <p className="font-semibold">Course completed</p>
                  <p className="text-sm text-gray-400">Introduction to React</p>
                </div>
                <span className="text-sm text-gray-400">5 hours ago</span>
              </div>
              
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-semibold">New course published</p>
                  <p className="text-sm text-gray-400">Advanced TypeScript Patterns</p>
                </div>
                <span className="text-sm text-gray-400">1 day ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}