import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Store Settings",
};

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
