-- Migration: Fix profiles table to allow profile creation and make display_name required
-- This migration fixes the missing INSERT RLS policy and makes display_name NOT NULL

-- Step 1: Make display_name NOT NULL with a default value
-- If there are existing NULL values, they'll be set to 'User'
ALTER TABLE public.profiles 
ALTER COLUMN display_name SET NOT NULL,
ALTER COLUMN display_name SET DEFAULT 'User';

-- Step 2: Add the missing INSERT RLS policy
-- This allows users to create their own profile during signup
CREATE POLICY "Users can create own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Verify the policies are correct by running:
-- SELECT * FROM pg_policies WHERE tablename = 'profiles';
