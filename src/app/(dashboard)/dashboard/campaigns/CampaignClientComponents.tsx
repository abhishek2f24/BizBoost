"use client";

import { Rocket } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export function CampaignButton({ festival }: { festival: string }) {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    toast({
      title: `Generating ${festival} Campaign...`,
      description: "AI is creating WhatsApp blasts, social posts, and ad copies. Please wait.",
    });

    try {
      // 1. Generate the campaign using AI
      const genRes = await fetch("/api/ai/generate-campaign", {
        method: "POST",
        body: JSON.stringify({
          productName: festival + " Special Collection",
          price: "Varies",
          category: "Festive"
        }),
      });

      if (!genRes.ok) throw new Error("Failed to generate campaign assets");
      const campaignData = await genRes.json();

      // 2. Save to database
      const saveRes = await fetch("/api/campaigns/save", {
        method: "POST",
        body: JSON.stringify({
          name: `${festival} 2025 Campaign`,
          festival: festival,
          message: campaignData.whatsappCaption,
          imageUrl: null, // AI image generation would happen here in a full flow
        }),
      });

      if (!saveRes.ok) throw new Error("Failed to save campaign");

      setIsGenerating(false);
      toast({
        title: "Campaign Generated!",
        description: `Your marketing assets for ${festival} are ready to review in the Campaigns tab.`,
        variant: "default",
      });
      
      // Refresh the page to show the new campaign
      window.location.reload();
    } catch (error) {
      console.error(error);
      setIsGenerating(false);
      toast({
        title: "Generation Failed",
        description: "There was an issue creating your campaign. Please check your API keys.",
        variant: "destructive",
      });
    }
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
