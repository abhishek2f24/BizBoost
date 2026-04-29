import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Package, Clock, CheckCircle, Truck, XCircle, ShoppingBag } from "lucide-react";
import OrderStatusButton from "./OrderStatusButton";

const STATUS_CONFIG: Record<string, { color: string; icon: any }> = {
  PENDING: { color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20", icon: Clock },
  CONFIRMED: { color: "text-blue-400 bg-blue-500/10 border-blue-500/20", icon: CheckCircle },
  PROCESSING: { color: "text-purple-400 bg-purple-500/10 border-purple-500/20", icon: Package },
  SHIPPED: { color: "text-primary bg-primary/10 border-primary/20", icon: Truck },
  DELIVERED: { color: "text-green-400 bg-green-500/10 border-green-500/20", icon: CheckCircle },
  CANCELLED: { color: "text-red-400 bg-red-500/10 border-red-500/20", icon: XCircle },
};

export default async function OrdersPage() {
  const session = await getSession();
  if (!session) redirect("/auth/signin");

  const orders = await prisma.order.findMany({
    where: { storeId: session.storeId },
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
  });

  const totalRevenue = orders.filter(o => o.status === "DELIVERED").reduce((sum, o) => sum + o.total, 0);
  const pendingCount = orders.filter(o => o.status === "PENDING").length;

  return (
    <div className="animate-fade-in">
      <div className="mb-10">
        <h1 className="text-display-lg mb-1">Orders</h1>
        <p className="text-ink-muted">{orders.length} total orders</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        <div className="glass-card text-center">
          <p className="text-caption text-ink-muted mb-1">Total Revenue</p>
          <p className="text-display-md font-bold text-primary">₹{totalRevenue.toLocaleString()}</p>
        </div>
        <div className="glass-card text-center">
          <p className="text-caption text-ink-muted mb-1">Total Orders</p>
          <p className="text-display-md font-bold">{orders.length}</p>
        </div>
        <div className="glass-card text-center">
          <p className="text-caption text-ink-muted mb-1">Pending</p>
          <p className="text-display-md font-bold text-yellow-400">{pendingCount}</p>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="glass-card flex flex-col items-center justify-center py-24 text-center border-dashed">
          <ShoppingBag size={48} className="text-ink-muted mb-6" />
          <h2 className="text-display-md mb-3 text-ink-muted">No orders yet</h2>
          <p className="text-ink-muted">When customers place orders from your store, they will appear here.</p>
        </div>
      ) : (
        <div className="glass-card !p-0 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-glass bg-surface-glass">
                <th className="text-left px-6 py-4 text-caption font-bold text-ink-muted">Order</th>
                <th className="text-left px-6 py-4 text-caption font-bold text-ink-muted">Customer</th>
                <th className="text-left px-6 py-4 text-caption font-bold text-ink-muted">Items</th>
                <th className="text-left px-6 py-4 text-caption font-bold text-ink-muted">Total</th>
                <th className="text-left px-6 py-4 text-caption font-bold text-ink-muted">Status</th>
                <th className="text-right px-6 py-4 text-caption font-bold text-ink-muted">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-glass">
              {orders.map((order) => {
                const cfg = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.PENDING;
                const Icon = cfg.icon;
                return (
                  <tr key={order.id} className="hover:bg-surface-glass/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-[15px]">{order.orderNumber}</p>
                      <p className="text-caption text-ink-muted">{new Date(order.createdAt).toLocaleDateString("en-IN")}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold">{order.customerName}</p>
                      <p className="text-caption text-ink-muted">{order.customerPhone}</p>
                    </td>
                    <td className="px-6 py-4 text-caption text-ink-muted">
                      {order.items.map(i => `${i.product?.name} ×${i.quantity}`).join(", ")}
                    </td>
                    <td className="px-6 py-4 font-bold text-primary">₹{order.total.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-micro-legal font-bold border ${cfg.color}`}>
                        <Icon size={12} /> {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <OrderStatusButton orderId={order.id} currentStatus={order.status} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
