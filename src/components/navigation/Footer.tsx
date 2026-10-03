import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import InstagramIcon from "@/components/icons/InstagramIcon";

interface FooterProps {
  settings?: Record<string, string>;
}

export default function Footer({ settings = {} }: FooterProps) {
  const businessName = settings.business_name || "Vijay Interior & Construction";
  const phone = settings.phone || "+91 97543 95862, +91 62634 34513";
  const whatsapp = settings.whatsapp || "+91 70003 01077";
  const email = settings.email || "Vijaykumarahirwar743@gmail.com";
  const address = settings.address || "Shop No. 10, Sanjeevani Nagar, Garha, Jabalpur (M.P.)";
  const workingHours = settings.working_hours || "Monday – Saturday: 9:30 AM – 7:00 PM";
  const mapsUrl = settings.google_maps_url || "https://maps.google.com/?q=Shop+No+10+Sanjeevani+Nagar+Garha+Jabalpur";
  const instagramUrl = settings.instagram || "https://www.instagram.com/vijayconstruction86?stkn=MXgwMHQwdWt3aXJxeA==";

  return (
    <footer className="bg-[#121212] text-[#FBF9F5] border-t border-white/10 relative overflow-hidden">
      {/* Subtle blueprint grid overlay */}
      <div className="absolute inset-0 architectural-grid-dark opacity-40 pointer-events-none" />

      {/* Top Editorial Banner */}
      <div className="relative border-b border-white/10 max-w-7xl mx-auto px-6 sm:px-8 py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <span className="text-[11px] font-mono-tech uppercase tracking-[0.28em] text-[#C5A880] block mb-3">
              [ INITIATE ARCHITECTURAL DIALOGUE ]
            </span>
            <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl tracking-tight max-w-2xl leading-[1.15]">
              Let us build something timeless together.
            </h2>
          </div>
          <div>
            <Link
              href="/#enquire"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#C5A880] text-[#121212] font-semibold text-xs uppercase tracking-[0.2em] transition-all hover:bg-white"
            >
              <span>Schedule Studio Consultation</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Content */}
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 text-sm text-stone-400">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-3">
            <Link href="/" className="inline-block group">
              <Image
                src="/logo-transparent.png"
                alt={businessName}
                width={240}
                height={147}
                className="h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_4px_16px_rgba(218,165,32,0.3)]"
              />
            </Link>
          </div>
          <p className="text-stone-400 leading-relaxed text-xs max-w-sm">
            {settings.footer_bio ||
              "Vijay Interior & Construction is a multidisciplinary architecture, interior design, and civil construction studio crafting enduring environments built around the way you live."}
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#25D366]/30 text-[#25D366] text-xs hover:bg-[#25D366]/10 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Direct WhatsApp</span>
            </a>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#E1306C]/40 text-[#E1306C] text-xs hover:bg-[#E1306C]/10 transition-colors"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
              <span>Instagram</span>
            </a>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-white/20 text-white text-xs hover:bg-white/10 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Studio Map</span>
            </a>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="space-y-4">
          <h3 className="text-white text-xs uppercase tracking-[0.2em] font-semibold">
            Index
          </h3>
          <ul className="space-y-2.5 text-xs">
            <li>
              <Link href="/" className="hover:text-[#C5A880] transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-[#C5A880] transition-colors">
                Studio Philosophy
              </Link>
            </li>
            <li>
              <Link href="/#founder" className="hover:text-[#C5A880] transition-colors">
                Founder&apos;s Profile
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-[#C5A880] transition-colors">
                Disciplines & Services
              </Link>
            </li>
            <li>
              <Link href="/projects" className="hover:text-[#C5A880] transition-colors">
                Selected Works
              </Link>
            </li>
            <li>
              <Link href="/process" className="hover:text-[#C5A880] transition-colors">
                Architectural Process
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[#C5A880] transition-colors">
                Contact & Studio
              </Link>
            </li>
          </ul>
        </div>

        {/* Services Showcase */}
        <div className="space-y-4">
          <h3 className="text-white text-xs uppercase tracking-[0.2em] font-semibold">
            Disciplines
          </h3>
          <ul className="space-y-2.5 text-xs">
            <li>
              <Link href="/services/interior-design" className="hover:text-[#C5A880] transition-colors">
                Interior Design
              </Link>
            </li>
            <li>
              <Link href="/services/turnkey-projects" className="hover:text-[#C5A880] transition-colors">
                Turnkey Execution
              </Link>
            </li>
            <li>
              <Link href="/services/civil-construction" className="hover:text-[#C5A880] transition-colors">
                Civil Construction
              </Link>
            </li>
            <li>
              <Link href="/services/modular-kitchen" className="hover:text-[#C5A880] transition-colors">
                Modular Kitchens
              </Link>
            </li>
            <li>
              <Link href="/services/renovation-and-remodeling" className="hover:text-[#C5A880] transition-colors">
                Renovation & Remodeling
              </Link>
            </li>
            <li>
              <Link href="/services/commercial-interiors" className="hover:text-[#C5A880] transition-colors">
                Commercial Interiors
              </Link>
            </li>
          </ul>
        </div>

        {/* Studio Contacts */}
        <div className="space-y-4">
          <h3 className="text-white text-xs uppercase tracking-[0.2em] font-semibold">
            Studio
          </h3>
          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
              <span>{address}</span>
            </div>
            <div className="flex items-start gap-2.5">
              <Phone className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1">
                {phone.split(",").map((p) => {
                  const clean = p.trim();
                  return (
                    <a
                      key={clean}
                      href={`tel:${clean.replace(/\D/g, "")}`}
                      className="hover:text-white transition-colors"
                    >
                      {clean}
                    </a>
                  );
                })}
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#C5A880] shrink-0" />
              <a href={`mailto:${email}`} className="hover:text-white transition-colors">
                {email}
              </a>
            </div>
            <div className="flex items-start gap-2.5 pt-1">
              <Clock className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
              <span className="text-[11px] text-stone-400">{workingHours}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Meta Bar - pb-24 on mobile clears the sticky bottom CTA bar */}
      <div className="relative border-t border-white/10 max-w-7xl mx-auto px-6 sm:px-8 py-6 pb-24 lg:pb-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-4">
        <div>
          © {new Date().getFullYear()} {businessName}. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <Link href="/about" className="hover:text-stone-300 transition-colors">
            Privacy Policy
          </Link>
          <Link href="/about" className="hover:text-stone-300 transition-colors">
            Terms of Engagement
          </Link>
          <Link
            href="/admin/login"
            className="text-stone-600 hover:text-[#C5A880] transition-colors font-mono-tech"
          >
            [ Studio Portal ]
          </Link>
        </div>
      </div>
    </footer>
  );
}
