"use client";

import { useState } from "react";
import { User, Bell, Shield, Trash2, CheckCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [name, setName] = useState("Demo Seller");
  const [email, setEmail] = useState("demo@bizboost.ai");
  const { toast } = useToast();

  const [toggles, setToggles] = useState<Record<string, boolean>>({
    "New order alerts": true,
    "Daily sales summary": true,
    "Festival reminders": false,
  });

  const handleToggle = (key: string) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    setSaved(true);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved.",
    });
    setTimeout(() => setSaved(false), 2000);
  };

  const handlePassword = () => {
    toast({
      title: "Password Reset Email Sent",
      description: "Check your inbox for instructions to reset your password.",
    });
  };

  const handleDelete = () => {
    toast({
      title: "Account Deletion Request",
      description: "Please contact support to permanently delete your account.",
      variant: "destructive",
    });
  };

  return (
    <div className="animate-fade-in pb-24">
      <div className="mb-12">
        <h1 className="text-display-lg mb-2">Settings</h1>
        <p className="text-lead text-ink-muted">Manage your account and preferences.</p>
      </div>

      <div className="max-w-2xl space-y-8">
        {/* Profile */}
        <div className="glass-card !p-0 overflow-hidden">
          <div className="p-6 border-b border-border-glass bg-surface-glass flex items-center gap-3">
            <User size={20} className="text-primary" />
            <h2 className="text-title font-bold">Profile</h2>
          </div>
          <div className="p-6 space-y-5">
            <div>
              <label className="block text-caption font-bold text-ink-muted mb-2">Full Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input-glass" />
            </div>
            <div>
              <label className="block text-caption font-bold text-ink-muted mb-2">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-glass" />
            </div>
            <button onClick={handleSave} className="btn-glow !py-3 !px-8">
              {saved ? <><CheckCircle size={18} /> Saved!</> : "Save Changes"}
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="glass-card !p-0 overflow-hidden">
          <div className="p-6 border-b border-border-glass bg-surface-glass flex items-center gap-3">
            <Bell size={20} className="text-primary" />
            <h2 className="text-title font-bold">Notifications</h2>
          </div>
          <div className="p-6 space-y-4 divide-y divide-border-glass">
            {[
              { label: "New order alerts", desc: "Get notified via WhatsApp when a new order arrives" },
              { label: "Daily sales summary", desc: "Receive a daily report at 9 PM" },
              { label: "Festival reminders", desc: "7-day advance notice before major festivals" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-4 first:pt-0">
                <div>
                  <p className="font-bold">{item.label}</p>
                  <p className="text-caption text-ink-muted">{item.desc}</p>
                </div>
                <button 
                  onClick={() => handleToggle(item.label)}
                  className={`w-12 h-6 rounded-full relative transition-colors ${toggles[item.label] ? "bg-primary" : "bg-surface-glass border border-border-glass"}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 shadow-md transition-all ${toggles[item.label] ? "right-1" : "left-1"}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Security */}
        <div className="glass-card !p-0 overflow-hidden">
          <div className="p-6 border-b border-border-glass bg-surface-glass flex items-center gap-3">
            <Shield size={20} className="text-primary" />
            <h2 className="text-title font-bold">Security</h2>
          </div>
          <div className="p-6">
            <button onClick={handlePassword} className="btn-glass !py-3 !px-6 text-[15px]">Change Password</button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="glass-card !p-0 overflow-hidden border-red-500/30">
          <div className="p-6 border-b border-red-500/20 bg-red-500/5 flex items-center gap-3">
            <Trash2 size={20} className="text-red-400" />
            <h2 className="text-title font-bold text-red-400">Danger Zone</h2>
          </div>
          <div className="p-6">
            <p className="text-caption text-ink-muted mb-4">Permanently delete your account and all data. This action cannot be undone.</p>
            <button onClick={handleDelete} className="btn-glass !py-3 !px-6 text-red-400 border-red-500/30 hover:bg-red-500/10 hover:border-red-500/50">
              <Trash2 size={16} /> Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
