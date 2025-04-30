// src/pages/LoginTest.tsx
import React, { useState } from 'react';
import { supabase } from '../supabase/supabaseClient';

export default function LoginTest() {
  const [email, setEmail] = useState('tieni@unidas.org.br');
  const [password, setPassword] = useState('123456');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setMessage(`❌ Erro: ${error.message}`);
    } else {
      setMessage(`✅ Login OK! Bem-vindo ${data.user?.email}`);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🔐 Teste de Login Supabase</h2>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Senha" />
      <button onClick={handleLogin}>Testar Login</button>
      <p>{message}</p>
    </div>
  );
}
