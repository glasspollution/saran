-- Complete RBAC Setup for Fresh Supabase Project
-- Run this entire script in your Supabase SQL Editor

-- 1. Create the user role enum
CREATE TYPE user_role AS ENUM ('teacher', 'student');

-- 2. Create user_profiles table
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role user_role NOT NULL DEFAULT 'student',
  school_name TEXT,
  grade_level TEXT, -- For students
  subject_specialization TEXT, -- For teachers
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  
  -- Constraints
  CONSTRAINT email_not_empty CHECK (email <> ''),
  CONSTRAINT role_not_null CHECK (role IS NOT NULL)
);

-- 3. Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS Policies
-- Users can view their own profile
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

-- Teachers can view student profiles (optional - for class management)
CREATE POLICY "Teachers can view student profiles" ON user_profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_profiles teacher_profile 
      WHERE teacher_profile.id = auth.uid() 
      AND teacher_profile.role = 'teacher'
    ) AND role = 'student'
  );

-- 5. Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 6. Create trigger for updated_at
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 7. Create indexes for performance
CREATE INDEX idx_user_profiles_role ON user_profiles(role);
CREATE INDEX idx_user_profiles_school ON user_profiles(school_name);
CREATE INDEX idx_user_profiles_email ON user_profiles(email);

-- 8. Grant permissions to authenticated users
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON user_profiles TO authenticated;
GRANT USAGE ON TYPE user_role TO authenticated;

-- 9. Optional: Create a function to handle new user signup (manual approach)
CREATE OR REPLACE FUNCTION create_user_profile(
  user_id UUID,
  user_email TEXT,
  user_name TEXT DEFAULT NULL,
  user_role user_role DEFAULT 'student'
)
RETURNS user_profiles AS $$
DECLARE
  new_profile user_profiles;
BEGIN
  INSERT INTO user_profiles (id, email, full_name, role)
  VALUES (user_id, user_email, COALESCE(user_name, user_email), user_role)
  RETURNING * INTO new_profile;
  
  RETURN new_profile;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 10. Verification queries
SELECT 'Setup Complete!' as status;

-- Check table structure
SELECT 
  column_name, 
  data_type, 
  is_nullable 
FROM information_schema.columns 
WHERE table_name = 'user_profiles' 
ORDER BY ordinal_position;

-- Check enum values
SELECT enumlabel as role_options 
FROM pg_enum e
JOIN pg_type t ON e.enumtypid = t.oid
WHERE t.typname = 'user_role';

-- Check policies
SELECT policyname, cmd FROM pg_policies WHERE tablename = 'user_profiles'; 