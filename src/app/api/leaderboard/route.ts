import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { data: expenses, error: expensesError } = await supabase
      .from('expenses')
      .select('user_id, amount, profiles(display_name, email)');

    if (expensesError) {
      return NextResponse.json(
        { error: expensesError.message },
        { status: 400 }
      );
    }

    // Calculate total spending per user
    const leaderboard = new Map<string, any>();

    expenses?.forEach((expense: any) => {
      const userId = expense.user_id;
      const displayName = expense.profiles?.display_name || 'Unknown';
      const email = expense.profiles?.email || '';

      if (!leaderboard.has(userId)) {
        leaderboard.set(userId, {
          userId,
          displayName,
          email,
          totalSpent: 0,
          transactionCount: 0,
        });
      }

      const user = leaderboard.get(userId);
      user.totalSpent += parseFloat(expense.amount);
      user.transactionCount += 1;
    });

    // Convert to array and sort by total spent (descending)
    const leaderboardArray = Array.from(leaderboard.values())
      .sort((a, b) => b.totalSpent - a.totalSpent)
      .map((user, index) => ({
        ...user,
        rank: index + 1,
        totalSpent: parseFloat(user.totalSpent.toFixed(2)),
      }));

    return NextResponse.json({ leaderboard: leaderboardArray }, { status: 200 });
  } catch (error) {
    console.error('Leaderboard error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
