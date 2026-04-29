"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function ProductActions({ productId, isActive }: { productId: string; isActive: boolean }) {
  const router = useRouter();
  const [active, setActive] = useState(isActive);
  const [loading, setLoading] = useState(false);

  const toggleActive = async () => {
    setLoading(true);
    await fetch(`/api/products/${productId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !active }),
    });
    setActive(!active);
    setLoading(false);
    router.refresh();
  };

  const handleDelete = async () => {
    if (!confirm("Delete this product? This cannot be undone.")) return;
    await fetch(`/api/products/${productId}`, { method: "DELETE" });
    router.refresh();
  };

  return (
    <div className="flex items-center justify-end gap-2">
      <button
        onClick={toggleActive}
        disabled={loading}
        title={active ? "Hide product" : "Show product"}
        className="p-2 rounded-lg hover:bg-surface-glass text-ink-muted hover:text-white transition-colors"
      >
        {active ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
      <Link href={`/dashboard/products/${productId}/edit`} className="p-2 rounded-lg hover:bg-surface-glass text-ink-muted hover:text-primary transition-colors">
        <Edit size={16} />
      </Link>
      <button onClick={handleDelete} className="p-2 rounded-lg hover:bg-red-500/10 text-ink-muted hover:text-red-400 transition-colors">
        <Trash2 size={16} />
      </button>
    </div>
  );
}
