import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

const FOOTER_LINKS = [
  { href: "#servicios", label: "Servicios" },
  { href: "#proceso", label: "Proceso" },
  { href: "#precios", label: "Precios" },
  { href: "#contacto", label: "Contacto" },
];

export function Footer() {
  return (
    <footer className="px-12 py-10 border-t border-white/[0.07] flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="font-display text-2xl tracking-widest">
        AX<span className="text-[#C8FF00]">I</span>ON INC
      </div>

      <div className="flex gap-7">
        {FOOTER_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-xs text-[#6A6A82] uppercase tracking-[0.08em] hover:text-[#F0EEE8] transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>

      <p className="text-xs text-[#6A6A82]">
        © 2026 {SITE_CONFIG.name} AI. {SITE_CONFIG.location.split("·")[0].trim()}.
      </p>
    </footer>
  );
}
