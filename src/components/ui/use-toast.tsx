"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

type ToastProps = {
  id: string;
  title: string;
  description?: string;
  variant?: "default" | "destructive";
};

let toastCount = 0;
let observers: ((toasts: ToastProps[]) => void)[] = [];
let toasts: ToastProps[] = [];

const notify = () => {
  observers.forEach((obs) => obs(toasts));
};

export function toast(props: Omit<ToastProps, "id">) {
  const id = (++toastCount).toString();
  toasts = [...toasts, { ...props, id }];
  notify();

  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== id);
    notify();
  }, 3000);
}

export function useToast() {
  return { toast };
}

export function Toaster() {
  const [currentToasts, setCurrentToasts] = useState<ToastProps[]>([]);

  useEffect(() => {
    const observer = (t: ToastProps[]) => setCurrentToasts(t);
    observers.push(observer);
    return () => {
      observers = observers.filter((o) => o !== observer);
    };
  }, []);

  if (currentToasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {currentToasts.map((t) => (
        <div 
          key={t.id} 
          className={`glass-card !p-4 flex items-start gap-3 w-80 animate-fade-in shadow-2xl ${
            t.variant === "destructive" ? "border-red-500/50 bg-red-500/10" : "border-primary/50 bg-surface-glass"
          }`}
        >
          {t.variant === "destructive" ? (
            <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
          ) : (
            <CheckCircle2 className="text-primary flex-shrink-0" size={20} />
          )}
          <div className="flex-1">
            <h4 className={`font-bold text-[14px] ${t.variant === "destructive" ? "text-red-500" : "text-white"}`}>
              {t.title}
            </h4>
            {t.description && (
              <p className="text-[12px] text-ink-muted mt-1 leading-snug">
                {t.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
