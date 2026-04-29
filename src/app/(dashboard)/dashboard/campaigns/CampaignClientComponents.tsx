"use client";

import { Rocket } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export function CampaignButton({ festival }: { festival: string }) {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    toast({
      title: `Generating ${festival} Campaign...`,
      description: "AI is creating WhatsApp blasts, social posts, and ad copies. Please wait.",
    });

    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "Campaign Generated!",
        description: `Your marketing assets for ${festival} are ready to review.`,
        variant: "default",
      });
    }, 2500);
  };

  return (
    <button 
      onClick={handleGenerate}
      disabled={isGenerating}
      className="text-caption font-bold text-ink-muted hover:text-white transition-colors group-hover:text-primary flex items-center gap-1 z-20 relative disabled:opacity-50"
    >
      {isGenerating ? (
        <span className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin"></span>
      ) : (
        <Rocket size={14} />
      )}
      {isGenerating ? "Generating..." : "Generate Campaign"}
    </button>
  );
}

export function NewCampaignButton() {
  const { toast } = useToast();
  return (
    <button 
      onClick={() => toast({ title: "Coming Soon", description: "Custom campaign generation will be available next week." })}
      className="btn-glow !py-3 !px-6"
    >
      New Campaign
    </button>
  );
}
