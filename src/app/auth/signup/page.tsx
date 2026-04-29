"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Zap, Eye, EyeOff, ArrowRight, Store } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [storeName, setStoreName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, storeName, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        router.push("/dashboard");
        router.refresh();
      } else {
        setError(data.error || "Could not create account.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="w-full max-w-md animate-fade-in relative z-10">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2 font-display font-bold text-[28px]">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white shadow-[0_0_20px_rgba(255,92,0,0.5)]">
              <Zap size={18} className="fill-white" />
            </div>
            BizBoost<span className="text-primary">.ai</span>
          </Link>
          <p className="text-ink-muted mt-3 text-[16px]">Create your free seller account</p>
        </div>

        <div className="glass-card !rounded-3xl !p-8 border-border-glass shadow-[0_0_60px_rgba(0,0,0,0.5)]">
          <h1 className="text-[28px] font-display font-bold mb-8">Get started free</h1>
          <form onSubmit={handleSignUp} className="space-y-5">
            <div>
              <label className="block text-caption font-bold text-ink-muted mb-2">Your Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} className="input-glass" placeholder="Rahul Kumar" required />
            </div>
            <div>
              <label className="block text-caption font-bold text-ink-muted mb-2">Store Name</label>
              <div className="relative">
                <Store size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted" />
                <input type="text" value={storeName} onChange={e => setStoreName(e.target.value)} className="input-glass !pl-10" placeholder="Rahul Silk House" required />
              </div>
              {storeName && (
                <p className="text-micro-legal text-ink-muted mt-1 ml-1">
                  Your store: /store/{storeName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                </p>
              )}
            </div>
            <div>
              <label className="block text-caption font-bold text-ink-muted mb-2">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="input-glass" placeholder="you@example.com" required />
            </div>
            <div>
              <label className="block text-caption font-bold text-ink-muted mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="input-glass pr-12"
                  placeholder="••••••••"
                  minLength={6}
                  required
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-muted hover:text-white transition-colors">
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-caption font-bold px-4 py-3 rounded-xl">{error}</div>}
            <button type="submit" disabled={loading} className="btn-glow w-full !py-4 text-[16px] mt-2">
              {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <>Create Account <ArrowRight size={18} /></>}
            </button>
          </form>
          <p className="text-center text-caption text-ink-muted mt-8">
            Already have an account?{" "}
            <Link href="/auth/signin" className="text-primary font-bold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
