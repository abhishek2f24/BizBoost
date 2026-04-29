"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const STATUSES = ["PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];

export default function OrderStatusButton({ orderId, currentStatus }: { orderId: string; currentStatus: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const next = STATUSES[STATUSES.indexOf(currentStatus) + 1];

  const updateStatus = async (status: string) => {
    setLoading(true);
    await fetch(`/api/orders/${orderId}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setLoading(false);
    router.refresh();
  };

  if (!next || currentStatus === "DELIVERED" || currentStatus === "CANCELLED") return null;

  return (
    <button
      onClick={() => updateStatus(next)}
      disabled={loading}
      className="text-caption font-bold text-primary hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-primary/20 border border-primary/30 hover:border-primary"
    >
      {loading ? "..." : `Mark ${next}`}
    </button>
  );
}
