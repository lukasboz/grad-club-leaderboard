import { getSupabaseAdminClient } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const supabaseAdmin = getSupabaseAdminClient();
    
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Server not properly configured' },
        { status: 500 }
      );
    }

    // Fetch expenses with profiles using admin client (bypasses RLS)
    const { data: expenses, error: expensesError } = await supabaseAdmin
      .from('expenses')
      .select('user_id, amount, date, created_at, profiles(display_name, email)');

    if (expensesError) {
      return NextResponse.json(
        { error: expensesError.message },
        { status: 400 }
      );
    }

    // If no expenses, return empty leaderboard
    if (!expenses || expenses.length === 0) {
      return NextResponse.json({ leaderboard: [] }, { status: 200 });
    }

    // Calculate total spending per user and track most recent purchase
    const leaderboard = new Map<string, any>();

    expenses.forEach((expense: any) => {
      const userId = expense.user_id;
      const displayName = expense.profiles?.display_name || 'Unknown User';
      const email = expense.profiles?.email || '';
      const expenseDate = expense.date || expense.created_at;

      if (!leaderboard.has(userId)) {
        leaderboard.set(userId, {
          userId,
          displayName,
          email,
          totalSpent: 0,
          transactionCount: 0,
          mostRecentPurchaseDate: null,
          mostRecentPurchaseAmount: 0,
        });
      }

      const user = leaderboard.get(userId);
      user.totalSpent += parseFloat(expense.amount);
      user.transactionCount += 1;

      // Track most recent purchase (by date, then by created_at)
      if (!user.mostRecentPurchaseDate || expenseDate > user.mostRecentPurchaseDate) {
        user.mostRecentPurchaseDate = expenseDate;
        user.mostRecentPurchaseAmount = parseFloat(expense.amount);
      }
    });

    // Convert to array and sort by total spent (descending)
    const leaderboardArray = Array.from(leaderboard.values())
      .sort((a, b) => b.totalSpent - a.totalSpent)
      .map((user, index) => ({
        ...user,
        rank: index + 1,
        totalSpent: parseFloat(user.totalSpent.toFixed(2)),
        mostRecentPurchaseAmount: parseFloat(user.mostRecentPurchaseAmount.toFixed(2)),
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
