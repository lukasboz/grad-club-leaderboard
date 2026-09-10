'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🍽️ Grad Club
          </h1>
          <p className="text-gray-600 text-lg">Spending Tracker</p>
          <p className="text-gray-500 text-sm mt-2">
            Track your spending and compete on the leaderboard
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/login"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 block text-center"
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg transition duration-200 block text-center"
          >
            Sign Up
          </Link>
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-2">Features:</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>✅ Log your spending at Grad Club</li>
            <li>✅ View all your transactions</li>
            <li>✅ Compete on the leaderboard</li>
            <li>✅ See who spends the most!</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
