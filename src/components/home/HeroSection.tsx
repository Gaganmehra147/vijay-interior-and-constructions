"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowDown } from "lucide-react";

export default function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 10;
      const y = (clientY / innerHeight - 0.5) * 10;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] w-full flex flex-col justify-between pt-24 sm:pt-28 lg:pt-32 pb-6 sm:pb-10 overflow-hidden bg-[#181614] text-[#FBF9F5]"
    >
      {/* Editorial High-Resolution Background Photography with Next.js LCP Priority Preload */}
      <div
        className="absolute inset-0 transition-transform duration-1000 ease-out will-change-transform scale-105"
        style={{
          transform: `scale(1.03) translate3d(${mousePos.x * -0.3}px, ${mousePos.y * -0.3}px, 0)`,
        }}
      >
        <Image
          src="/images/hero-editorial.jpg"
          alt="Vijay Interior & Construction Architectural Studio"
          fill
          priority
          sizes="100vw"
          quality={80}
          className="object-cover object-center"
        />
      </div>

      {/* Atmospheric Editorial Vignette & Warm Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/40 pointer-events-none" />

      {/* Subtle organic light bloom */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-[#C5A880]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top spacer */}
      <div className="relative z-10 w-full" />

      {/* Main Editorial Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full my-auto py-2 sm:py-4">
        <div className="max-w-3xl space-y-4 sm:space-y-6">
          {/* Studio Tagline Eyebrow */}
          <div className="inline-flex items-center gap-3">
            <span className="w-6 sm:w-8 h-px bg-[#C5A880]" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.28em] font-mono-tech text-[#EAE4DC] font-light">
              VIJAY STUDIO • CIVIL CONSTRUCTION & BESPOKE INTERIORS
            </span>
          </div>

          {/* High-Impact Architectural Title: BUILD. Interiors. TRANSFORM. */}
          <h1 className="text-white text-4xl sm:text-6xl md:text-7xl lg:text-[5.4rem] xl:text-[6.2rem] tracking-tight leading-[0.92] select-none">
            <span className="block font-serif tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)] text-white">
              BUILD.
            </span>
            <span className="block font-editorial-quote italic font-normal text-[#F4EFEA] tracking-wide -my-1 sm:-my-2 drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
              Interiors.
            </span>
            <span className="block font-serif tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)] text-white">
              TRANSFORM.
            </span>
          </h1>

          {/* Clean Understated Architectural Descriptor - Tailored to Construction & Interiors */}
          <p className="text-stone-200/95 text-xs sm:text-sm md:text-base font-light leading-relaxed max-w-xl pt-1 sm:pt-2 drop-shadow-sm">
            From turnkey civil construction & structural excellence to bespoke luxury interiors and complete renovations — we build and transform residential & commercial spaces with precision engineering, master craftsmanship, and timeless design.
          </p>

          {/* Clean Minimalist Action Links */}
          <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-6 sm:gap-8">
            {/* Primary Underlined Minimalist Link: GET IN TOUCH → */}
            <Link
              href="/#enquire"
              className="group inline-flex items-center gap-2.5 text-xs sm:text-sm uppercase tracking-[0.25em] text-white font-medium hover:text-[#C5A880] transition-colors pb-1 border-b border-white/50 hover:border-[#C5A880]"
            >
              <span>GET IN TOUCH</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5 text-[#C5A880]" />
            </Link>

            {/* Secondary Minimalist Link: EXPLORE PORTFOLIO */}
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-[0.25em] text-stone-300 hover:text-white transition-colors pb-1 border-b border-transparent hover:border-white/30"
            >
              <span>EXPLORE PORTFOLIO</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Editorial Hairline Bar & Scroll Indicator */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full pt-4 sm:pt-6 border-t border-white/15 flex items-center justify-between text-[10px] sm:text-[11px] font-mono-tech text-stone-300 tracking-[0.2em] uppercase">
        <div className="hidden sm:flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse" />
          <span>JABALPUR (M.P.) • ARCHITECTURE & BESPOKE INTERIORS</span>
        </div>

        <a
          href="#manifesto"
          className="mx-auto sm:mx-0 inline-flex items-center gap-2 text-stone-300 hover:text-white transition-colors cursor-pointer group"
        >
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown className="w-3.5 h-3.5 text-[#C5A880] transition-transform group-hover:translate-y-1" />
        </a>

        <div className="hidden md:block text-stone-400">
          <span>EST. 2012 • BESPOKE CRAFT</span>
        </div>
      </div>
    </section>
  );
}
