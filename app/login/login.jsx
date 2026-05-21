"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Basic validation
    if (!email.includes('@')) {
      setError('Please enter a valid email');
      setLoading(false);
      return;
    }
    if (!password) {
      setError('Password is required');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost/projects/api/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: email.trim().toLowerCase(), 
          password: password 
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Store user data in localStorage (optional)
        if (result.user) {
          localStorage.setItem('user', JSON.stringify(result.user));
        }
        router.push('/dashboard');
      } else {
        setError(result.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Cannot connect to server. Make sure your backend server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans text-[#1e1b4b]">
      <div className="bg-white p-8 rounded-[24px] shadow-sm w-full max-w-[420px] border border-slate-100">
        
        {/* Logo Section */}
        <div className="flex items-center gap-2 mb-10">
          <div className="bg-[#6366f1] p-2 rounded-xl">
             <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1-1 0 001 1h3m10-11l2 2m-2-2v10a1-1 0 01-1 1h-3m-6 0a1-1 0 001-1v-4a1-1 0 011-1h2a1-1 0 011 1v4a1-1 0 001 1m-6 0h6" />
             </svg>
          </div>
          <span className="text-xl font-bold tracking-tight">MoneyFlow</span>
        </div>

        {/* Header Section */}
        <h2 className="text-[26px] font-extrabold text-slate-900 mb-1">Welcome back 👋</h2>
        <p className="text-slate-500 text-[15px] mb-8">Log in to continue to your account.</p>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-5 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-slate-700 text-sm font-semibold mb-2">Email address</label>
            <input 
              type="email" 
              placeholder="you@example.com"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[#6366f1]/10 focus:border-[#6366f1] outline-none transition-all" 
              required
              disabled={loading}
            />
          </div>

          {/* Password Field */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-slate-700 text-sm font-semibold">Password</label>
              <button type="button" className="text-[#6366f1] text-[13px] font-bold hover:underline">Forgot password?</button>
            </div>
            <div className="relative">
              <input 
                type="password" 
                placeholder="Enter your password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[#6366f1]/10 focus:border-[#6366f1] outline-none transition-all" 
                required
                disabled={loading}
              />
              <button type="button" className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-[#6366f1] focus:ring-[#6366f1]" id="remember" disabled={loading} />
            <label htmlFor="remember" className="text-slate-600 text-[14px]">Remember me</label>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#6366f1] hover:bg-[#4f46e5] text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-100 transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-slate-500 text-sm mt-10">
          Don't have an account? <Link href="/signup" className="text-[#6366f1] font-bold hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
