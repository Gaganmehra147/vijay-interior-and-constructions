"use client";

import { MessageCircle } from "lucide-react";

interface FloatingWhatsAppProps {
  whatsapp?: string;
}

export default function FloatingWhatsApp({
  whatsapp = "+91 70003 01077",
}: FloatingWhatsAppProps) {
  const cleanWa = whatsapp.replace(/[^0-9]/g, "");

  return (
    <div className="fixed bottom-36 right-4 sm:bottom-24 sm:right-6 z-40 group">
      <a
        href={`https://wa.me/${cleanWa}?text=Hello%20Vijay%20Interior%20%26%20Construction,%20I%20have%20an%20inquiry%20regarding%20interior%20or%20construction%20work.`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Chat with Vijay Interior & Construction"
        className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white shadow-[0_6px_24px_rgba(37,211,102,0.45)] transition-all duration-300 hover:scale-110 hover:shadow-[0_8px_30px_rgba(37,211,102,0.6)] active:scale-95"
      >
        {/* Subtle Ambient Pulse Ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none" />

        {/* WhatsApp Icon */}
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-white relative z-10" />

        {/* Floating Tooltip Label on Hover (opens to the left) */}
        <span className="absolute right-full mr-3 px-3 py-1.5 bg-[#141414] text-white text-[11px] font-medium tracking-wide whitespace-nowrap rounded-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-xl hidden sm:block">
          WhatsApp Us: {whatsapp}
        </span>
      </a>
    </div>
  );
}
