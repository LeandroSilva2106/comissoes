/*
  # Create initial users
  
  1. Creates three users with different roles:
    - Admin user (Maria Silva)
    - Coordinator user (João Santos)
    - Viewer user (Ana Costa)
  
  2. Sets up auth identities and user profiles
*/

-- Insert users into auth.users
INSERT INTO auth.users (id, email, created_at, updated_at)
VALUES 
  ('d0d7747b-883c-4930-9702-ddc1b1016271', 'admin@unidas.org.br', now(), now()),
  ('e89c35a4-6fab-4ae4-9062-ea3b368c96b2', 'coordinator@unidas.org.br', now(), now()),
  ('f12a45b6-7c89-4de0-ab12-34cd56ef7890', 'viewer@unidas.org.br', now(), now());

-- Insert identities with provider_id
INSERT INTO auth.identities (
  id,
  user_id,
  identity_data,
  provider,
  provider_id,
  last_sign_in_at,
  created_at,
  updated_at
)
VALUES
  (
    'd0d7747b-883c-4930-9702-ddc1b1016271',
    'd0d7747b-883c-4930-9702-ddc1b1016271',
    '{"sub":"d0d7747b-883c-4930-9702-ddc1b1016271","email":"admin@unidas.org.br"}',
    'email',
    'admin@unidas.org.br',
    now(),
    now(),
    now()
  ),
  (
    'e89c35a4-6fab-4ae4-9062-ea3b368c96b2',
    'e89c35a4-6fab-4ae4-9062-ea3b368c96b2',
    '{"sub":"e89c35a4-6fab-4ae4-9062-ea3b368c96b2","email":"coordinator@unidas.org.br"}',
    'email',
    'coordinator@unidas.org.br',
    now(),
    now(),
    now()
  ),
  (
    'f12a45b6-7c89-4de0-ab12-34cd56ef7890',
    'f12a45b6-7c89-4de0-ab12-34cd56ef7890',
    '{"sub":"f12a45b6-7c89-4de0-ab12-34cd56ef7890","email":"viewer@unidas.org.br"}',
    'email',
    'viewer@unidas.org.br',
    now(),
    now(),
    now()
  );

-- Insert user profiles
INSERT INTO public.users (
  id,
  email,
  name,
  phone,
  company,
  state,
  role,
  avatar_url
)
VALUES
  (
    'd0d7747b-883c-4930-9702-ddc1b1016271',
    'admin@unidas.org.br',
    'Maria Silva',
    '(11) 98765-4321',
    'UNIDAS',
    'SP',
    'admin',
    'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150'
  ),
  (
    'e89c35a4-6fab-4ae4-9062-ea3b368c96b2',
    'coordinator@unidas.org.br',
    'João Santos',
    '(21) 98765-1234',
    'Localiza',
    'RJ',
    'coordinator',
    'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'
  ),
  (
    'f12a45b6-7c89-4de0-ab12-34cd56ef7890',
    'viewer@unidas.org.br',
    'Ana Costa',
    '(31) 99876-5432',
    'Movida',
    'MG',
    'viewer',
    'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
  );