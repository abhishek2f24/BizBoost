"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await fetch("/api/auth/signout", { method: "POST" });
    router.push("/auth/signin");
    router.refresh();
  };

  return (
    <button
      onClick={handleSignOut}
      className="text-ink-muted hover:text-red-400 transition-colors"
      title="Sign out"
    >
      <LogOut size={18} />
    </button>
  );
}
