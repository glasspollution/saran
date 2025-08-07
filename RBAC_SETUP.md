# Role-Based Access Control (RBAC) Setup

This document explains the role-based access control system implemented for teachers and students.

## Database Setup

1. **Run the SQL migration** in your Supabase dashboard or CLI:
   ```sql
   -- Execute the contents of sql/01_create_user_profiles.sql
   ```

   This creates:
   - `user_profiles` table with role, school info, and other profile data
   - Row Level Security (RLS) policies
   - Automatic profile creation trigger
   - Proper indexes for performance

## System Overview

### User Roles
- **Teacher**: Can create lesson plans, assessments, and educational content
- **Student**: Can access course materials, take assessments, and track progress

### Authentication Flow
1. User signs up/logs in via email/password or Google OAuth
2. System checks if user has a profile with role assigned
3. If no profile exists, user is redirected to `/auth/setup-profile`
4. After profile setup, user is redirected to role-appropriate dashboard

### Route Protection
- **Public routes**: `/`, `/auth/*` (except setup-profile)
- **Teacher routes**: `/teacher/*`, `/dashboard/teacher`
- **Student routes**: `/student/*`, `/dashboard/student`
- **General protected**: `/protected` (redirects to role-specific dashboard)

## Key Files

### Database
- `sql/01_create_user_profiles.sql` - Database schema and policies

### Authentication & Authorization
- `src/lib/auth.ts` - User profile management utilities
- `src/lib/middleware.ts` - Session and role-based route protection
- `src/middleware.ts` - Next.js middleware entry point

### Pages
- `src/app/auth/setup-profile/page.tsx` - Role selection for new users
- `src/app/teacher/dashboard/page.tsx` - Teacher dashboard
- `src/app/student/dashboard/page.tsx` - Student dashboard
- `src/app/protected/page.tsx` - Redirects to appropriate dashboard

### Components
- `src/components/setup-profile-form.tsx` - Profile setup form with role selection

## Usage Examples

### Check User Role
```typescript
import { getUserProfile, getUserRole } from '@/lib/auth'

// Get full profile
const profile = await getUserProfile()

// Get just the role
const role = await getUserRole()

// Check if user has specific role
const isTeacher = await hasRole('teacher')
```

### Client-side Profile Access
```typescript
import { getUserProfileClient } from '@/lib/auth'

const profile = await getUserProfileClient()
```

### Update Profile
```typescript
import { upsertUserProfile } from '@/lib/auth'

const result = await upsertUserProfile({
  role: 'teacher',
  full_name: 'John Doe',
  subject_specialization: 'Mathematics'
})
```

## Security Features

1. **Row Level Security (RLS)**: Users can only access their own profiles
2. **Role-based route protection**: Middleware enforces role-specific access
3. **Automatic profile creation**: Triggers create profiles on user signup
4. **Teacher access to students**: Teachers can view student profiles for their classes

## Database Policies

- Users can view/edit their own profile
- Teachers can view student profiles (for class management)
- All operations are secured through Supabase RLS

## Adding New Roles

To add new roles (e.g., 'admin'):

1. Update the enum in SQL:
   ```sql
   ALTER TYPE user_role ADD VALUE 'admin';
   ```

2. Update TypeScript types in `src/lib/auth.ts`:
   ```typescript
   export type UserRole = 'teacher' | 'student' | 'admin'
   ```

3. Add route patterns in middleware
4. Create dashboard page for new role
5. Update redirect logic in auth flow

## Environment Variables

Ensure these are set in your `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Testing the System

1. Sign up a new user
2. Verify redirect to profile setup
3. Select teacher/student role
4. Complete profile
5. Verify redirect to appropriate dashboard
6. Test role-based route protection
7. Test OAuth flow with Google 