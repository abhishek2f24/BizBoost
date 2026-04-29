import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `BB-${timestamp}-${random}`;
}

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
    .substring(0, 50);
}

export function timeAgo(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return "just now";
}

export const FESTIVALS = [
  { name: "Diwali", date: "2025-10-20", emoji: "🪔", color: "#FF6B00" },
  { name: "Holi", date: "2026-03-01", emoji: "🎨", color: "#FF1493" },
  { name: "Navratri", date: "2025-10-02", emoji: "💃", color: "#FF6B00" },
  { name: "Eid", date: "2025-03-30", emoji: "🌙", color: "#00C896" },
  { name: "Christmas", date: "2025-12-25", emoji: "🎄", color: "#22C55E" },
  { name: "New Year", date: "2026-01-01", emoji: "🎉", color: "#6366F1" },
  { name: "Raksha Bandhan", date: "2025-08-09", emoji: "🪢", color: "#F59E0B" },
  { name: "Ganesh Chaturthi", date: "2025-08-27", emoji: "🐘", color: "#FF6B00" },
  { name: "Durga Puja", date: "2025-10-01", emoji: "🌺", color: "#EF4444" },
  { name: "Baisakhi", date: "2026-04-13", emoji: "🌾", color: "#EAB308" },
  { name: "Independence Day", date: "2025-08-15", emoji: "🇮🇳", color: "#FF6B00" },
  { name: "Republic Day", date: "2026-01-26", emoji: "🇮🇳", color: "#3B82F6" },
];

export function getUpcomingFestivals(count = 3) {
  const now = new Date();
  return FESTIVALS.filter((f) => new Date(f.date) > now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, count);
}
