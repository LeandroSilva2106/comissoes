import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

async function run() {
  const { data, error } = await supabase.auth.signUp({
    email: 'admin@unidas.org.br',
    password: 'SenhaForte123!'
  });

  if (error) {
    console.error('❌ Erro ao cadastrar usuário:', error.message);
  } else {
    console.log('✅ Usuário criado com sucesso:', data);
  }
}

run();
