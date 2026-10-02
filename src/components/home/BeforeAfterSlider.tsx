"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { ArrowLeftRight, Sparkles } from "lucide-react";

interface TransformationItem {
  id: string;
  title: string;
  location: string;
  scope: string;
  beforeImage: string;
  afterImage: string;
  initialPos?: number;
}

const TRANSFORMATIONS: TransformationItem[] = [
  {
    id: "living-suite",
    title: "Master Living Lounge",
    location: "Vasant Vihar, New Delhi",
    scope: "Damp Plaster Shell to Monolithic Limewash Living Suite",
    beforeImage: "/images/transformations/living-before.jpg",
    afterImage: "/images/transformations/living-after.jpg",
    initialPos: 45,
  },
  {
    id: "kitchen-dining",
    title: "Architectural Kitchen & Dining",
    location: "Golf Links, New Delhi",
    scope: "Outdated Enclosed Kitchen to Open Calacatta Marble Suite",
    beforeImage: "/images/transformations/kitchen-before.jpg",
    afterImage: "/images/transformations/kitchen-after.jpg",
    initialPos: 50,
  },
];

function SingleBeforeAfterCard({ item }: { item: TransformationItem }) {
  const [sliderPos, setSliderPos] = useState(item.initialPos ?? 50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  const handleEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleEnd);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleEnd);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, handleMouseMove, handleTouchMove, handleEnd]);

  return (
    <div className="flex flex-col space-y-3 group">
      {/* Card Header Meta */}
      <div className="flex items-baseline justify-between gap-2 border-b border-[#141414]/10 pb-2">
        <div>
          <h3 className="font-serif-heading text-lg sm:text-xl font-bold text-[#141414]">
            {item.title}
          </h3>
          <p className="text-[10px] sm:text-xs font-mono-tech uppercase tracking-wider text-[#8C827A]">
            {item.location}
          </p>
        </div>
        <span className="text-[9px] sm:text-[10px] uppercase font-mono-tech tracking-wider text-[#8B6F57] bg-[#EFE9DF] px-2 py-0.5 border border-[#141414]/5 shrink-0">
          TRANSFORMATION
        </span>
      </div>

      {/* Interactive Slider Frame - Compact 16:10 Aspect Ratio */}
      <div
        ref={containerRef}
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
        style={{ touchAction: "none" }}
        className="relative w-full aspect-[16/10] overflow-hidden select-none cursor-ew-resize border border-[#141414]/15 shadow-md bg-[#181614] rounded-sm touch-none transition-shadow group-hover:shadow-xl"
      >
        {/* AFTER Image (Full background) */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${item.afterImage}')` }}
        />
        <div className="absolute top-2.5 right-2.5 z-20 px-2 py-1 bg-[#141414]/85 text-[#FBF9F5] backdrop-blur-md text-[8px] sm:text-[9px] font-mono-tech uppercase tracking-wider border border-white/20">
          AFTER • COMPLETED
        </div>

        {/* BEFORE Image (Clipped overlay) */}
        <div
          className="absolute inset-0 bg-cover bg-center overflow-hidden"
          style={{
            backgroundImage: `url('${item.beforeImage}')`,
            clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
          }}
        />
        <div className="absolute top-2.5 left-2.5 z-20 px-2 py-1 bg-[#141414]/85 text-[#C5A880] backdrop-blur-md text-[8px] sm:text-[9px] font-mono-tech uppercase tracking-wider border border-[#C5A880]/40">
          BEFORE • RAW
        </div>

        {/* Vertical Divider Line */}
        <div
          className="absolute top-0 bottom-0 z-30 pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="w-[2px] h-full bg-[#C5A880] shadow-[0_0_8px_rgba(197,168,128,0.7)]" />

          {/* Circular Drag Handle */}
          <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#141414] border-2 border-[#C5A880] text-white flex items-center justify-center shadow-lg transition-transform active:scale-95 pointer-events-auto">
            <ArrowLeftRight className="w-3 h-3 text-[#C5A880]" />
          </div>
        </div>

        {/* Subtle Bottom Instruction */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 pointer-events-none bg-[#141414]/80 backdrop-blur-sm px-2.5 py-0.5 text-[8px] font-mono-tech uppercase tracking-wider text-stone-300 border border-white/10 whitespace-nowrap opacity-80 group-hover:opacity-100 transition-opacity">
          DRAG TO REVEAL
        </div>
      </div>

      {/* Scope Caption */}
      <p className="text-xs text-[#57534E] font-light leading-relaxed pt-1">
        {item.scope}
      </p>
    </div>
  );
}

export default function BeforeAfterSlider() {
  return (
    <section className="py-20 sm:py-28 bg-[#F8F5F0] text-[#141414] relative overflow-hidden border-b border-[#141414]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#141414]/10 pb-6 mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-mono-tech uppercase tracking-[0.25em] text-[#8C827A] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>TRANSFORMATION EVIDENCE</span>
            </div>
            <h2 className="font-serif-heading text-2xl sm:text-4xl tracking-tight text-[#141414]">
              Before & After
            </h2>
          </div>
          <p className="text-stone-500 text-xs sm:text-sm font-light max-w-md">
            Drag the interactive dividers below to examine the dramatic before & after structural transformations executed by our team.
          </p>
        </div>

        {/* 2-Column Side-by-Side Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
          {TRANSFORMATIONS.map((item) => (
            <SingleBeforeAfterCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
