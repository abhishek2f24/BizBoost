"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Store,
  Sparkles,
  Calendar,
  Users,
  BarChart3,
  Settings,
  Zap,
  ChevronRight,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Products",
    href: "/dashboard/products",
    icon: Package,
  },
  {
    label: "Storefront",
    href: "/dashboard/storefront",
    icon: Store,
  },
  {
    label: "AI Creatives",
    href: "/dashboard/creatives",
    icon: Sparkles,
  },
  {
    label: "Campaigns",
    href: "/dashboard/campaigns",
    icon: Calendar,
  },
  {
    label: "Leads & Orders",
    href: "/dashboard/leads",
    icon: Users,
  },
  {
    label: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
    badge: "Live",
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="p-4 pb-2">
        <Link href="/dashboard" className="flex items-center gap-2.5 px-2 py-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #FF6B00, #D45800)",
              boxShadow: "0 4px 12px rgba(255, 107, 0, 0.4)",
            }}
          >
            <Zap size={16} fill="white" color="white" />
          </div>
          <div>
            <span
              className="text-sm font-800 tracking-tight"
              style={{ color: "var(--text-primary)", fontWeight: 800 }}
            >
              BizBoost
            </span>
            <span
              className="text-sm font-800"
              style={{ color: "var(--saffron)", fontWeight: 800 }}
            >
              {" "}
              AI
            </span>
          </div>
        </Link>
      </div>

      <div className="divider mx-4 my-1" />

      {/* Plan badge */}
      <div className="px-4 py-2">
        <div
          className="flex items-center justify-between px-3 py-2 rounded-lg"
          style={{ background: "rgba(255, 107, 0, 0.08)", border: "1px solid rgba(255, 107, 0, 0.2)" }}
        >
          <div>
            <p style={{ fontSize: "0.7rem", color: "var(--saffron)", fontWeight: 700, letterSpacing: "0.06em" }}>
              STARTER PLAN
            </p>
            <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>5 / 5 products used</p>
          </div>
          <ChevronRight size={14} style={{ color: "var(--saffron)" }} />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              data-track={`sidebar-${item.label.toLowerCase()}`}
              className={cn("sidebar-item", isActive && "active")}
            >
              <item.icon
                size={17}
                className="sidebar-icon flex-shrink-0"
                style={{ color: isActive ? "var(--saffron)" : "var(--text-muted)" }}
              />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span
                  className="text-xs px-1.5 py-0.5 rounded-full font-semibold"
                  style={{
                    background: "rgba(0, 200, 150, 0.15)",
                    color: "var(--emerald-light)",
                    fontSize: "0.6875rem",
                  }}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom user section */}
      <div className="divider mx-4" />
      <div className="p-4">
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg" style={{ cursor: "pointer" }}>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
            style={{ background: "linear-gradient(135deg, #FF6B00, #D45800)", color: "white" }}
          >
            S
          </div>
          <div className="flex-1 min-w-0">
            <p
              style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.2 }}
              className="truncate"
            >
              Seller Name
            </p>
            <p style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>seller@email.com</p>
          </div>
          <Bell size={15} style={{ color: "var(--text-muted)" }} />
        </div>
      </div>
    </aside>
  );
}
