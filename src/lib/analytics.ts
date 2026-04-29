"use client";

import { nanoid } from "nanoid";

// ─── Session Management ────────────────────────────────────────────────────

let sessionId: string | null = null;

function getSessionId(): string {
  if (sessionId) return sessionId;

  if (typeof window !== "undefined") {
    sessionId = sessionStorage.getItem("bb_session_id");
    if (!sessionId) {
      sessionId = nanoid(16);
      sessionStorage.setItem("bb_session_id", sessionId);
    }
  }
  return sessionId || nanoid(16);
}

// ─── Event Queue & Batching ────────────────────────────────────────────────

interface TrackEvent {
  event: string;
  page: string;
  element?: string;
  elementText?: string;
  x?: number;
  y?: number;
  scrollDepth?: number;
  duration?: number;
  metadata?: Record<string, unknown>;
}

const eventQueue: TrackEvent[] = [];
let flushTimer: ReturnType<typeof setTimeout> | null = null;

async function flushEvents() {
  if (eventQueue.length === 0) return;
  const batch = eventQueue.splice(0, eventQueue.length);

  try {
    await fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: getSessionId(),
        events: batch,
        userAgent: navigator.userAgent,
      }),
      keepalive: true,
    });
  } catch {
    // silently fail — never break user experience
  }
}

function scheduleFlush() {
  if (flushTimer) clearTimeout(flushTimer);
  flushTimer = setTimeout(flushEvents, 2000);
}

function queueEvent(event: TrackEvent) {
  eventQueue.push(event);
  if (eventQueue.length >= 10) {
    flushEvents();
  } else {
    scheduleFlush();
  }
}

// ─── Core Track Function ──────────────────────────────────────────────────

export function track(event: string, data?: Partial<TrackEvent>) {
  if (typeof window === "undefined") return;

  queueEvent({
    event,
    page: window.location.pathname,
    ...data,
  });
}

// ─── Click Tracker ────────────────────────────────────────────────────────

interface ClickState {
  element: Element;
  count: number;
  lastTime: number;
}

const recentClicks: ClickState[] = [];
const RAGE_CLICK_THRESHOLD = 3;
const RAGE_CLICK_WINDOW = 1000;

export function initClickTracker() {
  if (typeof window === "undefined") return;

  document.addEventListener("click", (e) => {
    const target = e.target as Element;
    const element = getElementLabel(target);
    const elementText = getElementText(target);
    const now = Date.now();

    // Track normal click
    track("click", {
      element,
      elementText,
      x: e.clientX,
      y: e.clientY,
    });

    // Rage click detection
    const existing = recentClicks.find((c) => c.element === target);
    if (existing) {
      if (now - existing.lastTime < RAGE_CLICK_WINDOW) {
        existing.count++;
        existing.lastTime = now;
        if (existing.count >= RAGE_CLICK_THRESHOLD) {
          track("rage_click", {
            element,
            elementText,
            x: e.clientX,
            y: e.clientY,
            metadata: { count: existing.count },
          });
          existing.count = 0;
        }
      } else {
        existing.count = 1;
        existing.lastTime = now;
      }
    } else {
      recentClicks.push({ element: target, count: 1, lastTime: now });
      if (recentClicks.length > 20) recentClicks.shift();
    }
  }, true);
}

// ─── Scroll Depth Tracker ─────────────────────────────────────────────────

export function initScrollTracker() {
  if (typeof window === "undefined") return;

  let maxScroll = 0;
  const milestones = new Set<number>();

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = Math.round((scrollTop / docHeight) * 100);

    if (percent > maxScroll) maxScroll = percent;

    [25, 50, 75, 90, 100].forEach((milestone) => {
      if (percent >= milestone && !milestones.has(milestone)) {
        milestones.add(milestone);
        track("scroll_depth", { scrollDepth: milestone });
      }
    });
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
}

// ─── Time-on-Section Tracker ──────────────────────────────────────────────

const sectionTimers: Map<string, number> = new Map();

export function trackSectionEnter(sectionId: string) {
  sectionTimers.set(sectionId, Date.now());
}

export function trackSectionLeave(sectionId: string) {
  const startTime = sectionTimers.get(sectionId);
  if (startTime) {
    const duration = Date.now() - startTime;
    track("time_on_section", {
      element: sectionId,
      duration,
    });
    sectionTimers.delete(sectionId);
  }
}

// ─── Stuck Detection ─────────────────────────────────────────────────────

export function initStuckDetector() {
  if (typeof window === "undefined") return;

  let lastActivity = Date.now();
  let stuckTimer: ReturnType<typeof setTimeout> | null = null;
  let currentPath = window.location.pathname;

  const resetStuckTimer = () => {
    lastActivity = Date.now();
    if (stuckTimer) clearTimeout(stuckTimer);

    stuckTimer = setTimeout(() => {
      const idleDuration = Date.now() - lastActivity;
      if (idleDuration >= 30000 && window.location.pathname === currentPath) {
        track("user_stuck", {
          duration: idleDuration,
          metadata: {
            page: currentPath,
            scrollY: window.scrollY,
          },
        });
      }
    }, 30000);
  };

  ["mousemove", "keydown", "scroll", "click", "touchstart"].forEach((event) => {
    document.addEventListener(event, resetStuckTimer, { passive: true });
  });

  resetStuckTimer();
}

// ─── Funnel Tracking ─────────────────────────────────────────────────────

export function trackFunnelStep(step: string, data?: Record<string, unknown>) {
  track("funnel_step", {
    element: step,
    metadata: data,
  });

  // Also send to funnel API
  fetch("/api/analytics/funnel", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sessionId: getSessionId(),
      step,
      ...data,
    }),
  }).catch(() => {});
}

// ─── Page View ────────────────────────────────────────────────────────────

export function trackPageView() {
  if (typeof window === "undefined") return;

  track("pageview", {
    metadata: {
      referrer: document.referrer,
      title: document.title,
    },
  });
}

// ─── Helpers ─────────────────────────────────────────────────────────────

function getElementLabel(el: Element): string {
  const id = el.id ? `#${el.id}` : "";
  const dataTrack = el.getAttribute("data-track");
  const ariaLabel = el.getAttribute("aria-label");
  const role = el.getAttribute("role");
  const tagName = el.tagName.toLowerCase();
  const classes = Array.from(el.classList)
    .filter((c) => !c.startsWith("text-") && !c.startsWith("bg-") && !c.startsWith("p-") && !c.startsWith("m-"))
    .slice(0, 2)
    .join(".");

  return dataTrack || ariaLabel || id || `${tagName}${classes ? `.${classes}` : ""}` || tagName;
}

function getElementText(el: Element): string {
  const text = el.textContent?.trim() || "";
  return text.substring(0, 100);
}

// ─── Session End ─────────────────────────────────────────────────────────

export function initSessionTracking() {
  if (typeof window === "undefined") return;

  const startTime = Date.now();

  // Flush on page hide (more reliable than unload)
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      const duration = Date.now() - startTime;

      // Use sendBeacon for reliability
      navigator.sendBeacon(
        "/api/analytics/session-end",
        JSON.stringify({
          sessionId: getSessionId(),
          duration,
        })
      );

      flushEvents();
    }
  });
}
