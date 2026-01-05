"use client";

import Link from "next/link";
import { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Optionally redirect or show success
      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setError("");
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(err.message || "Google login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="bg-[#F8F9FA] min-h-screen font-sans flex items-center justify-center">
      <div className="auth-container max-w-md w-full px-4 py-12 mx-auto">
        <div className="auth-card bg-white p-10 rounded-2xl shadow-xl">
          <h2 className="auth-title text-3xl font-sora font-bold text-[#2D5F7E] mb-8 text-center">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-group">
              <label className="form-label block font-semibold mb-2">Email:</label>
              <input type="email" className="form-input w-full px-4 py-3 border-2 border-[#E0E4E8] rounded-lg focus:outline-none focus:border-[#2D5F7E] bg-[#F8F9FA]" placeholder="Enter your email" required value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label block font-semibold mb-2">Password:</label>
              <input type="password" className="form-input w-full px-4 py-3 border-2 border-[#E0E4E8] rounded-lg focus:outline-none focus:border-[#2D5F7E] bg-[#F8F9FA]" placeholder="Enter your password" required value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary btn-full w-full py-3 bg-gradient-to-r from-[#2D5F7E] to-[#4A7FA0] text-white rounded-lg font-semibold shadow hover:scale-105 transition" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <div className="divider text-center my-6 relative">
            <span className="bg-white px-4 text-[#8E8E8E] relative z-10">OR</span>
            <div className="absolute left-0 right-0 top-1/2 h-px bg-[#E0E4E8] -z-0" />
          </div>
          <button type="button" className="btn btn-secondary btn-full w-full py-3 bg-[#F8F9FA] text-[#1A1A1A] border-2 border-[#E0E4E8] rounded-lg font-semibold hover:bg-white hover:border-[#2D5F7E] transition mb-2" onClick={handleGoogleLogin} disabled={loading}>
            {loading ? "Please wait..." : "Continue with Google"}
          </button>
          {error && <div className="text-red-600 text-center mt-4">{error}</div>}
          <div className="auth-link text-center mt-6 text-[#5A5A5A]">
            Don't have an account?{' '}
            <Link href="/register" className="text-[#2D5F7E] font-semibold hover:underline">Register account</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
