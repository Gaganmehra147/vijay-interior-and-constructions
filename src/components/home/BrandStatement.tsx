import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function BrandStatement() {
  return (
    <section
      id="manifesto"
      className="py-24 sm:py-36 bg-[#F8F5F0] text-[#141414] relative overflow-hidden border-b border-[#141414]/10 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Subtle Category Header */}
        <div className="flex items-center justify-between border-b border-[#141414]/10 pb-4 mb-16 text-[10px] sm:text-[11px] font-mono-tech uppercase tracking-[0.25em] text-[#8C827A]">
          <span>STUDIO PHILOSOPHY & MANIFESTO</span>
          <span className="hidden sm:inline">SINGLE-SOURCE ARCHITECTURAL DELIVERY</span>
          <span>EST. 2012</span>
        </div>

        {/* Split Screen Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left Column: Bold Editorial Vision Statement */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[11px] font-mono-tech uppercase tracking-[0.25em] text-[#C5A880] block font-medium">
              RAW MATERIALITY • QUIET REFINEMENT
            </span>

            <h2 className="font-serif-heading text-3xl sm:text-5xl md:text-6xl tracking-tight leading-[1.08] text-[#141414]">
              We don&apos;t just build spaces. <br />
              <span className="italic font-editorial-quote text-[#8B6F57] font-normal">
                We craft living permanence.
              </span>
            </h2>

            <div className="w-20 h-[1.5px] bg-[#C5A880] my-6" />

            <p className="text-stone-600 text-base sm:text-lg font-light leading-relaxed max-w-xl">
              Architecture that breathes with the landscape. Interiors sculpted with honesty, warm tactile surfaces, and timeless architectural proportion.
            </p>
          </div>

          {/* Right Column: Narrative & Key Pillars */}
          <div className="lg:col-span-5 space-y-8 lg:pt-4 text-sm sm:text-base text-[#57534E] leading-relaxed font-light">
            <p>
              At <strong className="text-[#141414] font-medium">Vijay Interior & Construction</strong>, we believe every built sanctuary begins with thoughtful dialogue and material integrity. Too often, visionary design gets lost in fragmented handoffs.
            </p>
            <p>
              We bring spatial architecture, bespoke interior joinery, and heavy civil execution under a single, accountable studio roof—ensuring unwavering craftsmanship from first sketch to final turnkey handover.
            </p>

            {/* Quick Studio Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#141414]/10">
              <div>
                <div className="font-serif-heading text-2xl sm:text-3xl font-semibold text-[#141414]">
                  15+
                </div>
                <div className="text-[10px] font-mono-tech uppercase tracking-wider text-[#8C827A] mt-1">
                  Years Practice
                </div>
              </div>
              <div>
                <div className="font-serif-heading text-2xl sm:text-3xl font-semibold text-[#141414]">
                  180+
                </div>
                <div className="text-[10px] font-mono-tech uppercase tracking-wider text-[#8C827A] mt-1">
                  Private Works
                </div>
              </div>
              <div>
                <div className="font-serif-heading text-2xl sm:text-3xl font-semibold text-[#141414]">
                  100%
                </div>
                <div className="text-[10px] font-mono-tech uppercase tracking-wider text-[#8C827A] mt-1">
                  In-House Build
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] font-medium text-[#141414] hover:text-[#C5A880] transition-colors pb-1 border-b border-[#141414]/30 hover:border-[#C5A880] group"
              >
                <span>Read Studio Monograph</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
