import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Award, Hammer, Compass, Quote } from "lucide-react";
import InstagramIcon from "@/components/icons/InstagramIcon";

interface FoundersProfileProps {
  instagramUrl?: string;
  phone?: string;
}

export default function FoundersProfile({
  instagramUrl = "https://www.instagram.com/vijayconstruction86?stkn=MXgwMHQwdWt3aXJxeA==",
  phone = "+91 97543 95862",
}: FoundersProfileProps) {
  return (
    <section
      id="founder"
      className="py-24 sm:py-32 bg-[#161413] text-[#FBF9F5] relative overflow-hidden border-b border-white/10 scroll-mt-20"
    >
      {/* Subtle blueprint grid overlay */}
      <div className="absolute inset-0 architectural-grid-dark opacity-35 pointer-events-none" />

      {/* Warm ambient light accents */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Category Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-14 text-[10px] sm:text-[11px] font-mono-tech uppercase tracking-[0.25em] text-[#C5A880]">
          <span>[ 05 // LEADERSHIP & VISION ]</span>
          <span className="hidden sm:inline">FOUNDER&apos;S PROFILE</span>
          <span className="text-stone-400">EST. 2012</span>
        </div>

        {/* Main Grid: Portrait on Left, Editorial Story on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Founder's Portrait with Architectural Framing */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative architectural frame */}
              <div className="absolute -inset-3 sm:-inset-4 border border-[#C5A880]/30 -rotate-1 rounded-sm pointer-events-none" />

              {/* Main Image Container */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#201C19] border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.7)] group">
                <Image
                  src="/images/founder.jpg"
                  alt="Vijay Ahirwar — Founder of Vijay Interior & Construction"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 480px"
                  quality={85}
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Subtle gradient overlay at bottom of photo for text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                {/* Name & Title Badge overlayed on bottom of photo */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="inline-block px-2.5 py-1 bg-[#C5A880] text-[#121212] text-[9px] font-mono-tech uppercase tracking-widest font-semibold mb-2">
                    FOUNDER & PRINCIPAL
                  </div>
                  <h3 className="font-serif-heading text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
                    Vijay Ahirwar
                  </h3>
                  <p className="text-xs text-stone-300 font-light mt-0.5 font-mono-tech tracking-wide">
                    Vijay Interior & Construction
                  </p>
                </div>
              </div>

              {/* Floating Quote Stamp */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-[#201D1A] border border-[#C5A880]/50 p-4 max-w-[240px] shadow-2xl hidden sm:block">
                <Quote className="w-5 h-5 text-[#C5A880] mb-1.5 opacity-80" />
                <p className="text-[11px] text-stone-300 italic font-editorial-quote leading-snug">
                  &ldquo;Dreams become reality when hard work meets consistency and courage.&rdquo;
                </p>
                <span className="block text-[9px] font-mono-tech uppercase text-[#C5A880] tracking-widest mt-2 font-medium">
                  — Vijay Ahirwar
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Inspiring Journey & Story */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7">
            {/* Tagline & Subhead */}
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.25em] font-mono-tech text-[#C5A880]">
                <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
                THE JOURNEY OF RESILIENCE
              </span>
              <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.12]">
                Vijay Ahirwar — <br />
                <span className="italic font-editorial-quote text-[#C5A880] font-normal">
                  From Humble Beginnings to Building Dreams
                </span>
              </h2>
            </div>

            {/* Accent divider line */}
            <div className="w-20 h-0.5 bg-[#C5A880]" />

            {/* Exact Founder Story Narrative */}
            <div className="space-y-4 text-stone-300 text-sm sm:text-base leading-relaxed font-light">
              <p>
                Vijay Ahirwar&apos;s journey is a story of determination, hard work, and perseverance. He started his career with very humble beginnings, taking on small projects and gradually building his skills, reputation, and vision.
              </p>
              <p>
                With every challenge, he moved one step forward. Today, he has established himself in the interior and construction industry, successfully turning his small beginnings into a growing business.
              </p>
              <p className="text-white font-medium bg-[#1F1C1A] border-l-2 border-[#C5A880] p-4 text-xs sm:text-sm">
                His journey reflects a simple belief: <span className="text-[#C5A880] italic">dreams become reality when hard work meets consistency and courage.</span>
              </p>
            </div>

            {/* Key Pillars Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[#C5A880]">
                  <Hammer className="w-4 h-4" />
                  <span className="font-mono-tech text-xs uppercase tracking-wider font-semibold">
                    Hands-On
                  </span>
                </div>
                <p className="text-[11px] text-stone-400 font-light">
                  On-site civil execution and rigorous daily supervision.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[#C5A880]">
                  <Compass className="w-4 h-4" />
                  <span className="font-mono-tech text-xs uppercase tracking-wider font-semibold">
                    Visionary
                  </span>
                </div>
                <p className="text-[11px] text-stone-400 font-light">
                  Translating client aspirations into luxurious reality.
                </p>
              </div>

              <div className="space-y-1 col-span-2 sm:col-span-1">
                <div className="flex items-center gap-1.5 text-[#C5A880]">
                  <Award className="w-4 h-4" />
                  <span className="font-mono-tech text-xs uppercase tracking-wider font-semibold">
                    Trust First
                  </span>
                </div>
                <p className="text-[11px] text-stone-400 font-light">
                  Transparent costing, quality materials, and timely delivery.
                </p>
              </div>
            </div>

            {/* Social & Action Links */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              {/* Instagram Profile Link */}
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 px-5 py-3 rounded-none bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white text-xs uppercase tracking-[0.18em] font-semibold hover:opacity-95 transition-all shadow-lg active:scale-95"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>Follow on Instagram</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              {/* Consult / Contact Link */}
              <Link
                href="/#enquire"
                className="inline-flex items-center gap-2 px-5 py-3 border border-white/25 text-white text-xs uppercase tracking-[0.18em] font-medium hover:border-[#C5A880] hover:text-[#C5A880] transition-colors"
              >
                <span>Discuss Your Project</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
