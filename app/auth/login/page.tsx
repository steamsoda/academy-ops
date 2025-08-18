'use client';
import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage(){
  const [email,setEmail]=useState('admin@dfmonterrey.mx');
  const [password,setPassword]=useState('admin123');
  const [err,setErr]=useState<string|undefined>();
  const router=useRouter();

  async function onSubmit(e:FormEvent){
    e.preventDefault();
    const res = await signIn('credentials',{ redirect:false, email, password });
    if (res?.ok) router.push('/dashboard');
    else setErr('Invalid email or password.');
  }

  return (
    <main className="min-h-screen grid place-items-center p-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm bg-[#0f1320] border border-[#1b2233] rounded-2xl p-6 grid gap-3">
        <h1 className="text-2xl font-semibold">Sign in</h1>
        <label className="text-sm">Email
          <input className="mt-1 w-full bg-[#0b0e14] border border-[#1b2233] rounded-lg p-2" value={email} onChange={e=>setEmail(e.target.value)} />
        </label>
        <label className="text-sm">Password
          <input type="password" className="mt-1 w-full bg-[#0b0e14] border border-[#1b2233] rounded-lg p-2" value={password} onChange={e=>setPassword(e.target.value)} />
        </label>
        {err && <div className="text-red-400 text-sm">{err}</div>}
        <button className="mt-2 py-2 rounded-xl border border-[#1b2233] hover:bg-[#111827]">Sign in</button>
      </form>
    </main>
  );
}
