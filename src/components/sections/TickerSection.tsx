"use client";

import { useEffect, useRef } from "react";
import { STATS } from "@/lib/constants";

const TICKER_ITEMS = [
  "Desarrollo web profesional",
  "Hosting y mantenimiento",
  "Tiendas online",
  "Soluciones a medida",
  "Implementación de IA",
  "Identidad digital",
];


export function TickerSection() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="bg-[#C8FF00] overflow-hidden py-[14px]">
      <div className="flex gap-[60px] whitespace-nowrap animate-ticker">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-display text-[18px] tracking-[0.1em] text-[#05050A] flex items-center gap-6"
          >
            {item}
            <span className="w-2 h-2 rounded-none bg-[#05050A]/30" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function StatsSection() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 border-b border-white/[0.07]">
      {STATS.map((stat, i) => (
        <div
          key={i}
          className="px-10 py-12 border-r border-white/[0.07] last:border-r-0 reveal"
          style={{ transitionDelay: `${i * 0.1}s` }}
        >
          <div className="font-display text-[64px] text-[#C8FF00] leading-none mb-2">
            {stat.value}
          </div>
          <div className="text-sm text-[#6A6A82] leading-relaxed whitespace-pre-line">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
