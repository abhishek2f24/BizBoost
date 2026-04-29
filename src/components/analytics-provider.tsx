"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  initClickTracker,
  initScrollTracker,
  initStuckDetector,
  initSessionTracking,
  trackPageView,
} from "@/lib/analytics";

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      initClickTracker();
      initScrollTracker();
      initStuckDetector();
      initSessionTracking();
    }
  }, []);

  useEffect(() => {
    trackPageView();
  }, [pathname]);

  return <>{children}</>;
}
