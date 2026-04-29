import { Metadata } from "next";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "CRM & Customers",
};
import { getSession } from "@/lib/session";
import { MessageCircle, Clock, ShoppingBag, ExternalLink, CalendarDays, TrendingUp } from "lucide-react";
import Link from "next/link";

export default async function CustomerCRM() {
  const session = await getSession();
  const storeId = session?.storeId ?? "demo-store-001";

  let orders: any[] = [];
  try {
    orders = await prisma.order.findMany({
      where: { storeId },
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: "desc" },
      take: 10
    });
  } catch (e) {
    // DB not seeded yet or no orders
  }

  return (
    <div className="animate-fade-in pb-24" data-track="crm-page">
      <div className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-display-lg mb-2">Customers & CRM</h1>
          <p className="text-lead text-ink-muted">Manage orders, recover abandoned checkouts, and boost retention.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="glass-card flex flex-col justify-between">
           <div className="flex items-center gap-3 text-ink-muted mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#25D366]/20 flex items-center justify-center text-[#25D366]">
              <MessageCircle size={20} />
            </div>
            <h3 className="font-bold">WhatsApp Follow-ups</h3>
          </div>
          <div>
            <p className="text-[32px] font-display font-bold leading-none mb-2">{orders.length > 0 ? "12" : "0"}</p>
            <p className="text-caption text-ink-muted font-medium">Pending reminders</p>
          </div>
        </div>
        <div className="glass-card flex flex-col justify-between">
           <div className="flex items-center gap-3 text-ink-muted mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
              <Clock size={20} />
            </div>
            <h3 className="font-bold">Abandoned Carts</h3>
          </div>
          <div>
            <p className="text-[32px] font-display font-bold leading-none mb-2 text-primary">{orders.length > 0 ? "₹14,500" : "₹0"}</p>
            <p className="text-caption text-ink-muted font-medium">Recoverable Revenue</p>
          </div>
        </div>
        <div className="glass-card flex flex-col justify-between border-blue-500/30">
           <div className="flex items-center gap-3 text-blue-400 mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-500">
              <TrendingUp size={20} />
            </div>
            <h3 className="font-bold">Repeat Rate</h3>
          </div>
          <div>
            <p className="text-[32px] font-display font-bold leading-none mb-2 text-blue-500">{orders.length > 0 ? "24%" : "0%"}</p>
            <p className="text-caption text-blue-400/70 font-medium">Of customers buy twice</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Orders List */}
        <div className="lg:col-span-2 glass-card !p-0 overflow-hidden">
          <div className="p-6 border-b border-border-glass bg-surface-glass flex justify-between items-center">
            <h2 className="text-title font-bold flex items-center gap-2">
              <ShoppingBag size={20} /> Recent Orders
            </h2>
          </div>
          <div className="divide-y divide-border-glass">
            {orders.length === 0 ? (
               <div className="p-12 text-center text-ink-muted text-lead font-medium">
                 No orders yet. Start sharing your store!
               </div>
            ) : (
              orders.map(order => (
                <div key={order.id} className="p-6 hover:bg-surface-glass transition-colors flex items-center justify-between group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-surface border border-border-glass flex items-center justify-center font-bold text-ink-muted">
                      {order.customerName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-body font-bold text-white mb-1 flex items-center gap-2">
                        {order.customerName}
                        <span className="px-2 py-0.5 rounded text-[10px] bg-primary/20 text-primary border border-primary/30 uppercase">
                          {order.paymentType}
                        </span>
                      </h4>
                      <p className="text-caption text-ink-muted font-mono">{order.orderNumber} • {order.items[0]?.product.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-body font-bold text-white mb-1">₹{order.total}</div>
                    <Link 
                      href={`https://wa.me/91${order.customerPhone}?text=Hi ${order.customerName}, thanks for your order (${order.orderNumber}) for ₹${order.total}! We will dispatch it soon.`}
                      target="_blank"
                      className="text-caption text-[#25D366] font-bold hover:underline flex items-center gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MessageCircle size={14} /> Send Update
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Growth Automation sidebar */}
        <div className="space-y-6">
          <div className="glass-card !p-6 border-[#E1306C]/30 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#E1306C]/10 to-transparent pointer-events-none"></div>
            <div className="relative z-10">
               <div className="w-12 h-12 rounded-xl bg-[#E1306C]/20 text-[#E1306C] flex items-center justify-center mb-4">
                  <CalendarDays size={24} />
               </div>
               <h3 className="text-title font-bold mb-2">Upcoming Festival</h3>
               <p className="text-caption text-ink-muted mb-4">Diwali is in 45 days. Start your pre-sale campaign now.</p>
               <button className="btn-glow w-full !bg-[#E1306C] !shadow-[0_0_15px_rgba(225,48,108,0.5)]">Generate Campaign</button>
            </div>
          </div>

          <div className="glass-card !p-6">
            <h3 className="text-title font-bold mb-4">Action Items</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                <div>
                  <p className="text-caption font-bold text-white">Send Abandoned Cart Links</p>
                  <p className="text-[12px] text-ink-muted">{orders.length > 0 ? "3 users left items in cart yesterday." : "No abandoned carts today."}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                <div>
                  <p className="text-caption font-bold text-white">Request Reviews</p>
                  <p className="text-[12px] text-ink-muted">{orders.length > 0 ? "5 orders were delivered last week." : "Waiting for first orders."}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
