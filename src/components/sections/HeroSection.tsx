"use client";

import { useRef } from "react";
import Link from "next/link";
import { useParticles } from "@/hooks/useParticles";

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useParticles(canvasRef);

  return (
    <section className="min-h-screen flex flex-col justify-end px-12 pb-20 relative overflow-hidden">
      {/* Canvas de partículas animadas — fondo */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Destellos radiales de luz verde lima */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 70% 60% at 80% 20%, rgba(200,255,0,0.07) 0%, transparent 60%)"
        }} />
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 50% 50% at 20% 80%, rgba(200,255,0,0.04) 0%, transparent 60%)"
        }} />
      </div>

      {/* Cuadrícula de fondo sutil */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Texto de fondo enorme decorativo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[48%] font-display text-[clamp(180px,26vw,380px)] text-white/[0.02] whitespace-nowrap pointer-events-none z-[1] tracking-[0.05em]">
        AXION INC
      </div>

      {/* Badge de disponibilidad */}
      <div className="absolute top-[110px] right-12 z-10 animate-[fadeInRight_1s_0.8s_both] flex items-center gap-2 bg-[rgba(200,255,0,0.08)] border border-[rgba(200,255,0,0.2)] text-[#C8FF00] px-[18px] py-2 rounded-none text-[11px] font-bold tracking-[0.12em] uppercase">
        <span className="w-[6px] h-[6px] rounded-none bg-[#C8FF00] animate-[blink_2s_infinite]" />
        ✦ Disponible ahora · LATAM
      </div>

      {/* Contenido principal del hero */}
      <div className="relative z-[5]">
        <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#C8FF00] mb-6 flex items-center gap-3 animate-[fadeUp_0.8s_0.2s_both]">
          <span className="block w-8 h-px bg-[#C8FF00]" />
          Agencia de desarrollo web · LATAM
        </p>

        <h1 className="font-display text-[clamp(72px,12vw,160px)] leading-[0.92] tracking-[0.01em] animate-[fadeUp_0.8s_0.3s_both] max-w-[1000px]">
          Tu negocio,
          <em className="font-serif italic text-[#C8FF00] block not-italic">en internet.</em>
          Bien hecho.
        </h1>

        <div className="flex items-end justify-between mt-16 animate-[fadeUp_0.8s_0.5s_both]">
          <p className="text-[17px] text-[#6A6A82] max-w-[480px] leading-[1.65] font-light">
            Diseñamos y desarrollamos{" "}
            <strong className="text-[#F0EEE8] font-medium">
              sitios web profesionales, tiendas online y soluciones a medida
            </strong>{" "}
            para micro y pequeñas empresas. También implementamos IA cuando el proyecto lo necesita.
          </p>

          <div className="flex flex-col items-end gap-4">
            <Link
              href="#contacto"
              className="bg-[#C8FF00] text-[#05050A] px-10 py-4 rounded-none text-[15px] font-bold uppercase tracking-[0.08em] transition-all duration-200 hover:scale-[1.04] hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(200,255,0,0.4)]"
            >
              Cuéntanos tu proyecto →
            </Link>
            <Link
              href="#servicios"
              className="text-[#6A6A82] text-[13px] flex items-center gap-2 hover:text-[#F0EEE8] transition-colors after:content-['↓'] after:text-base"
            >
              Ver servicios
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
