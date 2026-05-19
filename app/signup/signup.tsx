"use client";

import React, { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    // Connect to your PHP signup script here
    console.log("Signing up...", { fullName, email, password });
    // navigate('/dashboard');
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
        <h2 className="text-[26px] font-extrabold text-slate-900 mb-1">Create your account</h2>
        <p className="text-slate-500 text-[15px] mb-8">Start your journey to financial clarity.</p>

        <form onSubmit={handleSignup} className="space-y-5">
          {/* Full Name Field */}
          <div>
            <label className="block text-slate-700 text-sm font-semibold mb-2">Full name</label>
            <input 
              type="text" 
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[#6366f1]/10 focus:border-[#6366f1] outline-none transition-all" 
              required
            />
          </div>

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
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-slate-700 text-sm font-semibold mb-2">Create password</label>
            <div className="relative">
              <input 
                type="password" 
                placeholder="••••••••"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[#6366f1]/10 focus:border-[#6366f1] outline-none transition-all" 
                required
              />
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-start gap-2">
            <input type="checkbox" className="mt-1 w-4 h-4 rounded border-slate-300 text-[#6366f1] focus:ring-[#6366f1]" id="terms" required />
            <label htmlFor="terms" className="text-slate-600 text-[13px] leading-tight">
              I agree to the <a href="#" className="text-[#6366f1] font-medium hover:underline">Terms & Conditions</a>
            </label>
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full bg-[#6366f1] hover:bg-[#4f46e5] text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-100 transition-all transform active:scale-[0.98]">
            Create Account
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-slate-500 text-sm mt-10">
          Already have an account? <Link to="/" className="text-[#6366f1] font-bold hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;