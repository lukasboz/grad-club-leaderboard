# Grad Club Leaderboard - Spending Tracker

A modern web application for tracking spending at The Grad Club with friend leaderboard competition. Built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## 🚀 Features

- **User Authentication**: Sign up and log in securely
- **Expense Tracking**: Log your spending with descriptions and dates
- **Live Leaderboard**: See who's spending the most at Grad Club
- **Real-time Updates**: Instant leaderboard rankings
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Vercel Ready**: One-click deployment to Vercel

## 📋 Prerequisites

- Node.js 18+ and npm
- A Supabase account (free tier available at https://supabase.com)

## 🛠️ Setup Instructions

### 1. Create a Supabase Project

1. Go to https://supabase.com and sign up for a free account
2. Create a new project (choose any region)
3. Wait for the project to initialize
4. Go to the SQL Editor and run the SQL from `schema.sql` file in this project

### 2. Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Find your Supabase credentials:
   - Go to your Supabase project settings
   - Click "API" in the left sidebar
   - Find your **Project URL**, **Publishable Key**, and **Secret Key**
   - Copy these values to the `.env.local` file

3. Your `.env.local` should look like:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key-here
   SUPABASE_SECRET_KEY=your-secret-key-here
   ```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Locally

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### 5. Test the App

1. Create a new account
2. Log in with your credentials
3. Add an expense in the dashboard
4. Check the leaderboard to see your spending
5. Invite friends to join and track their spending too!

## 🌐 Deploy to Vercel

The easiest way to deploy is with Vercel:

1. Push your code to GitHub, GitLab, or Bitbucket
2. Go to https://vercel.com and sign in
3. Click "Add New" → "Project"
4. Import your repository
5. Add your environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - `SUPABASE_SECRET_KEY`
6. Click "Deploy"

Your app will be live at a URL like `https://your-app.vercel.app`

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── login/
│   │       ├── signup/
│   │       └── session/
│   │   ├── expenses/
│   │   └── leaderboard/
│   ├── login/
│   ├── signup/
│   ├── dashboard/
│   ├── page.tsx (home)
│   ├── layout.tsx
│   └── globals.css
└── lib/
    ├── supabase.ts
    └── auth-context.tsx
```

## 🔐 Security Features

- Passwords are encrypted by Supabase Auth
- Row Level Security (RLS) policies on database tables
- Users can only see their own expenses (in data)
- All other users can view the leaderboard with public data

## 🎨 Tech Stack

- **Frontend**: React, Next.js 15, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth
- **Hosting**: Vercel

## 📝 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user
- `POST /api/auth/login` - Log in user
- `GET /api/auth/session` - Get current session

### Expenses
- `POST /api/expenses` - Add new expense (requires auth)
- `GET /api/expenses` - Get all expenses

### Leaderboard
- `GET /api/leaderboard` - Get spending leaderboard

## 🤝 Contributing

Feel free to fork this project and submit pull requests for improvements!

## 📄 License

MIT License - feel free to use this project for any purpose.

## 💡 Ideas for Future Features

- Monthly spending summaries
- Spending categories
- Export spending data as CSV
- Expense history charts
- Friend groups/teams
- Push notifications for new leaders
- Mobile app version

## 🐛 Troubleshooting

### "Missing Supabase environment variables"
- Make sure you've created `.env.local` file
- Verify your Supabase URL and keys are correct
- Restart the development server

### "Authentication failed"
- Check that your Supabase project allows email/password auth
- Verify user credentials are correct
- Check Supabase authentication settings

### "Can't see expenses after adding"
- Make sure you ran the SQL schema from `schema.sql` in Supabase
- Check Row Level Security policies are enabled
- Verify you're logged in with the same account

---

**Questions?** Create an issue or reach out!

Happy tracking! 🍽️ 💰
