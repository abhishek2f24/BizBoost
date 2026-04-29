"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Zap, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/demo-signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push("/dashboard");
        router.refresh();
      } else {
        const d = await res.json();
        setError(d.error || "Invalid credentials");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/demo-signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "demo@bizboost.ai", password: "demo123" }),
      });
      if (res.ok) {
        router.push("/dashboard");
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md animate-fade-in relative z-10">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2 font-display font-bold text-[28px]">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white shadow-[0_0_20px_rgba(255,92,0,0.5)]">
              <Zap size={18} className="fill-white" />
            </div>
            BizBoost<span className="text-primary">.ai</span>
          </Link>
          <p className="text-ink-muted mt-3 text-[16px]">Sign in to your Seller OS</p>
        </div>

        {/* Card */}
        <div className="glass-card !rounded-3xl !p-8 border-border-glass shadow-[0_0_60px_rgba(0,0,0,0.5)]">
          <h1 className="text-[28px] font-display font-bold mb-8">Welcome back</h1>

          <form onSubmit={handleSignIn} className="space-y-5">
            <div>
              <label className="block text-caption font-bold text-ink-muted mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-glass"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-caption font-bold text-ink-muted mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-glass pr-12"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-muted hover:text-white transition-colors"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-caption font-bold px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-glow w-full !py-4 text-[16px] mt-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>Sign In <ArrowRight size={18} /></>
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border-glass"></div>
            </div>
            <div className="relative flex justify-center text-caption">
              <span className="bg-surface-card px-4 text-ink-muted font-medium">or</span>
            </div>
          </div>

          <button
            onClick={handleDemoLogin}
            disabled={loading}
            className="btn-glass w-full !py-4 text-[16px] border-primary/30 text-primary hover:bg-primary hover:text-white hover:border-primary"
          >
            <Zap size={18} /> Try Demo Account
          </button>

          <p className="text-center text-caption text-ink-muted mt-8">
            New here?{" "}
            <Link href="/auth/signup" className="text-primary font-bold hover:underline">
              Create free account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
