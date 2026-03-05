"use client";

import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

const NAV_LINKS = [
  { href: "#servicios", label: "Servicios" },
  { href: "#demos", label: "Demos" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#proceso", label: "Proceso" },
  { href: "#precios", label: "Precios" },
  { href: "#faq", label: "FAQ" },
];



export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-12 py-5 flex items-center justify-between border-b border-white/[0.07] backdrop-blur-xl bg-[#05050A]/85">
      <Link href="/" className="font-display text-[28px] tracking-widest text-[#F0EEE8]">
        AX<span className="text-[#C8FF00]">O</span>N
      </Link>

      <ul className="hidden md:flex gap-9 list-none">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-[13px] font-medium text-[#6A6A82] uppercase tracking-[0.05em] hover:text-[#F0EEE8] transition-colors duration-200"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href="#contacto"
        className="bg-[#C8FF00] text-[#05050A] px-6 py-[10px] rounded-full text-[13px] font-bold uppercase tracking-[0.06em] transition-all duration-200 hover:scale-[1.04] hover:shadow-[0_0_30px_rgba(200,255,0,0.35)]"
      >
        Hablemos →
      </Link>
    </nav>
  );
}
