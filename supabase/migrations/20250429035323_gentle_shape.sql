/*
  # Initial Schema Setup

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `name` (text)
      - `phone` (text)
      - `company` (text)
      - `state` (text)
      - `role` (text)
      - `join_date` (timestamptz)
      - `avatar_url` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `commissions`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `commission_members`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users)
      - `commission_id` (uuid, references commissions)
      - `join_date` (timestamptz)
      - `created_at` (timestamptz)
    
    - `meetings`
      - `id` (uuid, primary key)
      - `commission_id` (uuid, references commissions)
      - `title` (text)
      - `date` (date)
      - `time` (time)
      - `location` (text)
      - `agenda` (text)
      - `status` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `meeting_attendance`
      - `id` (uuid, primary key)
      - `meeting_id` (uuid, references meetings)
      - `user_id` (uuid, references users)
      - `present` (boolean)
      - `justification` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  phone text,
  company text,
  state text,
  role text NOT NULL DEFAULT 'viewer',
  join_date timestamptz DEFAULT now(),
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create commissions table
CREATE TABLE IF NOT EXISTS commissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create commission_members table
CREATE TABLE IF NOT EXISTS commission_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users ON DELETE CASCADE,
  commission_id uuid REFERENCES commissions ON DELETE CASCADE,
  join_date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, commission_id)
);

-- Create meetings table
CREATE TABLE IF NOT EXISTS meetings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  commission_id uuid REFERENCES commissions ON DELETE CASCADE,
  title text NOT NULL,
  date date NOT NULL,
  time time NOT NULL,
  location text,
  agenda text,
  status text NOT NULL DEFAULT 'scheduled',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create meeting_attendance table
CREATE TABLE IF NOT EXISTS meeting_attendance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  meeting_id uuid REFERENCES meetings ON DELETE CASCADE,
  user_id uuid REFERENCES users ON DELETE CASCADE,
  present boolean NOT NULL DEFAULT false,
  justification text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(meeting_id, user_id)
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE commissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE commission_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE meeting_attendance ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can view all users"
  ON users
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create policies for commissions table
CREATE POLICY "Users can view all commissions"
  ON commissions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins and coordinators can manage commissions"
  ON commissions
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('admin', 'coordinator')
    )
  );

-- Create policies for commission_members table
CREATE POLICY "Users can view all commission members"
  ON commission_members
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins and coordinators can manage commission members"
  ON commission_members
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('admin', 'coordinator')
    )
  );

-- Create policies for meetings table
CREATE POLICY "Users can view all meetings"
  ON meetings
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins and coordinators can manage meetings"
  ON meetings
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('admin', 'coordinator')
    )
  );

-- Create policies for meeting_attendance table
CREATE POLICY "Users can view all meeting attendance"
  ON meeting_attendance
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins and coordinators can manage meeting attendance"
  ON meeting_attendance
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('admin', 'coordinator')
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_commission_members_user_id ON commission_members(user_id);
CREATE INDEX IF NOT EXISTS idx_commission_members_commission_id ON commission_members(commission_id);
CREATE INDEX IF NOT EXISTS idx_meetings_commission_id ON meetings(commission_id);
CREATE INDEX IF NOT EXISTS idx_meeting_attendance_meeting_id ON meeting_attendance(meeting_id);
CREATE INDEX IF NOT EXISTS idx_meeting_attendance_user_id ON meeting_attendance(user_id);