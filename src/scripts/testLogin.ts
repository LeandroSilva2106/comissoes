// src/scripts/testLogin.ts
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_ANON_KEY!
);

async function testLogin() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'ti@unidas.org.br',
    password: '123456789' // ✅ troque se for outra senha
  });

  if (error) {
    console.error('❌ Falha no login:', error.message);
  } else {
    console.log('✅ Login OK!');
    console.log(data);
  }
}

testLogin();
