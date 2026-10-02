"use client";

import dynamic from "next/dynamic";
import FloatingWhatsApp from "@/components/shared/FloatingWhatsApp";

// Dynamically load AIChatbot on client without blocking initial SSR or hydration
const AIChatbot = dynamic(() => import("@/components/shared/AIChatbot"), {
  ssr: false,
});

interface GlobalWidgetsProps {
  whatsapp?: string;
}

export default function GlobalWidgets({ whatsapp = "+91 70003 01077" }: GlobalWidgetsProps) {
  return (
    <>
      <FloatingWhatsApp whatsapp={whatsapp} />
      <AIChatbot />
    </>
  );
}
