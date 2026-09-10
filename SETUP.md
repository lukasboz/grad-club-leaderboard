# Quick Setup Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Create Supabase Project
1. Go to https://supabase.com
2. Click "Start your project" 
3. Sign up with email
4. Create a new project (pick any region)
5. Wait 2-3 minutes for initialization

### Step 2: Setup Database
1. In Supabase dashboard, go to "SQL Editor"
2. Click "New Query"
3. Copy and paste the entire content of `schema.sql` from this folder
4. Click "Run"
5. Done! ✅

### Step 3: Get Your API Keys
1. In Supabase, go to "Settings" (bottom left)
2. Click "API"
3. Under "Project Configuration", find:
   - **Project URL**
   - **Publishable Key** (use this, not the deprecated Anon key)
   - **Secret Key** (use this, not the deprecated Service Role key)
4. Copy these values

### Step 4: Configure Environment
1. In the project folder, create a file called `.env.local`
2. Paste this (replace with YOUR actual values from Supabase):
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key-here
SUPABASE_SECRET_KEY=your-secret-key-here
```

### Step 5: Run Locally
```bash
# Install dependencies (one time)
npm install

# Start development server
npm run dev
```

Open http://localhost:3000 and start using!

### Step 6: Deploy to Vercel
1. Create a GitHub account (if you don't have one)
2. Push this project to GitHub
3. Go to https://vercel.com
4. Click "Add New Project"
5. Select your GitHub repo
6. Add the same environment variables from Step 4
7. Click "Deploy"

Your app is now live! 🎉

---

## 🧪 Testing

1. **Sign Up**: Click "Sign Up" and create an account
2. **Add Expense**: Go to "Add Expense" tab
3. **Log Expense**: Enter amount (e.g., 15.50) and click "Add Expense"
4. **View Leaderboard**: Go back to "Leaderboard" tab
5. **Invite Friends**: Share your Vercel URL with friends
6. **Watch Rankings**: Add more expenses and watch the leaderboard update!

---

## 🆘 Troubleshooting

### "Can't connect to database"
- Check your .env.local file has the correct URL and keys
- Make sure Supabase project is initialized
- Restart `npm run dev`

### "Sign up doesn't work"
- Make sure you ran the schema.sql in Supabase
- Check email password auth is enabled in Supabase Auth settings
- Try a different email address

### "Expenses not showing"
- Refresh the page (sometimes React state gets out of sync)
- Log out and back in
- Check Supabase SQL Editor to see if data was saved

---

**That's it!** You're all set to track Grad Club spending! 🍽️
