'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface LeaderboardEntry {
  rank: number;
  userId: string;
  displayName: string;
  email: string;
  totalSpent: number;
  transactionCount: number;
}

export default function Dashboard() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(true);
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'add-expense'>('leaderboard');
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setLoadingLeaderboard(true);
      const response = await fetch('/api/leaderboard');
      const data = await response.json();
      setLeaderboard(data.leaderboard || []);
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error);
    } finally {
      setLoadingLeaderboard(false);
    }
  };

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSubmitting(true);
    setMessage('');

    try {
      const { session } = await (await fetch('/api/auth/session')).json();
      
      const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token || ''}`,
        },
        body: JSON.stringify({
          amount: parseFloat(formData.amount),
          description: formData.description || 'Grad Club meal',
          date: formData.date,
        }),
      });

      if (response.ok) {
        setMessage('✅ Expense added successfully!');
        setFormData({ amount: '', description: '', date: new Date().toISOString().split('T')[0] });
        setTimeout(() => {
          setMessage('');
          setActiveTab('leaderboard');
          fetchLeaderboard();
        }, 1500);
      } else {
        const error = await response.json();
        setMessage(`❌ ${error.error}`);
      }
    } catch (error: any) {
      setMessage(`❌ ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <p className="text-gray-800 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-800">
                🍽️ Grad Club Tracker
              </h1>
              <p className="text-gray-600 mt-2">
                Welcome, {user?.email?.split('@')[0]}!
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg transition duration-200"
            >
              Log Out
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`px-6 py-3 font-bold rounded-lg transition duration-200 ${
              activeTab === 'leaderboard'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-800 hover:bg-gray-100'
            }`}
          >
            🏆 Leaderboard
          </button>
          <button
            onClick={() => setActiveTab('add-expense')}
            className={`px-6 py-3 font-bold rounded-lg transition duration-200 ${
              activeTab === 'add-expense'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-800 hover:bg-gray-100'
            }`}
          >
            ➕ Add Expense
          </button>
        </div>

        {/* Content */}
        {activeTab === 'leaderboard' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Spending Leaderboard
            </h2>

            {loadingLeaderboard ? (
              <p className="text-gray-600 text-center py-8">Loading leaderboard...</p>
            ) : leaderboard.length === 0 ? (
              <p className="text-gray-600 text-center py-8">
                No spending data yet. Add your first expense!
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="text-left py-3 px-4 font-bold text-gray-700">Rank</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-700">Name</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-700">Total Spent</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-700">Transactions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((entry, index) => {
                      const isCurrentUser = user?.email === entry.email;
                      return (
                        <tr
                          key={entry.userId}
                          className={`border-b border-gray-200 hover:bg-gray-50 ${
                            isCurrentUser ? 'bg-blue-50' : ''
                          }`}
                        >
                          <td className="py-3 px-4">
                            <span className="text-2xl">
                              {entry.rank === 1
                                ? '🥇'
                                : entry.rank === 2
                                ? '🥈'
                                : entry.rank === 3
                                ? '🥉'
                                : `#${entry.rank}`}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-semibold text-gray-800">
                            {entry.displayName}
                            {isCurrentUser && (
                              <span className="ml-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                                You
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-lg font-bold text-indigo-600">
                            ${entry.totalSpent.toFixed(2)}
                          </td>
                          <td className="py-3 px-4 text-gray-600">{entry.transactionCount}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'add-expense' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Log Your Spending
            </h2>

            {message && (
              <div className={`mb-4 p-4 rounded-lg ${
                message.startsWith('✅')
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}>
                {message}
              </div>
            )}

            <form onSubmit={handleAddExpense} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Amount ($) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-600"
                  placeholder="0.00"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Description
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-600"
                  placeholder="What did you have? (optional)"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-600"
                />
              </div>

              <button
                type="submit"
                disabled={submitting || !formData.amount}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
              >
                {submitting ? 'Adding...' : '✅ Add Expense'}
              </button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-700">
                💡 <strong>Pro tip:</strong> Keep track of every meal at the Grad Club to compete with your friends on the leaderboard!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
