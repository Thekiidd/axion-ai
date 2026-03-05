import Link from "next/link";
import { PRICING_PLANS } from "@/lib/constants";

export function PricingSection() {
  return (
    <section id="precios" className="px-12 py-[120px]">
      <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#C8FF00] mb-7 flex items-center gap-2.5 reveal">
        <span className="w-5 h-px bg-[#C8FF00]" />
        Planes mensuales
      </p>
      <h2 className="font-display text-[clamp(48px,6vw,84px)] leading-[0.95] tracking-[0.02em] reveal">
        Inversión<br />
        <span className="text-[#C8FF00]">sin sorpresas</span>
      </h2>
      <p className="text-[#6A6A82] text-[15px] max-w-[480px] mt-5 mb-16 leading-[1.65] reveal">
        Cada proyecto tiene un costo de setup único. Estos son los planes de mantenimiento y crecimiento mensual.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PRICING_PLANS.map((plan, i) => (
          <div
            key={plan.tier}
            className={`rounded-none px-9 py-12 relative overflow-hidden hover:-translate-y-2 transition-transform duration-300 reveal border ${
              plan.featured
                ? "border-[#C8FF00] bg-gradient-to-br from-[rgba(200,255,0,0.06)] to-[#0D0D18]"
                : "border-white/[0.07] bg-[#0D0D18]"
            }`}
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            {plan.featured && (
              <span className="absolute top-6 right-6 bg-[#C8FF00] text-[#05050A] text-[10px] font-extrabold tracking-[0.1em] uppercase px-3 py-1 rounded-none">
                Popular
              </span>
            )}

            <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#6A6A82] mb-5">
              {plan.tier}
            </p>
            <div className="font-display text-[72px] text-[#F0EEE8] leading-none mb-1 flex items-start gap-1">
              <sup className="text-[28px] text-[#C8FF00] pt-3">$</sup>
              {plan.price}
            </div>
            <p className="text-[13px] text-[#6A6A82] mb-9">{plan.period}</p>

            <div className="h-px bg-white/[0.07] mb-8" />

            <ul className="flex flex-col gap-3 mb-9">
              {plan.features.map((f) => (
                <li key={f.text} className="text-sm flex gap-[10px] items-start">
                  <span className={`flex-shrink-0 text-[15px] mt-[1px] ${f.included ? "text-[#C8FF00]" : "text-white/20"}`}>
                    {f.included ? "✓" : "✗"}
                  </span>
                  <span className={f.included ? "text-[rgba(240,238,232,0.65)]" : "text-white/20"}>
                    {f.text}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href="#contacto"
              className={`block text-center py-[14px] rounded-none text-sm font-bold uppercase tracking-[0.07em] transition-all duration-300 ${
                plan.featured
                  ? "bg-[#C8FF00] text-[#05050A] hover:shadow-[0_8px_32px_rgba(200,255,0,0.4)] hover:-translate-y-0.5"
                  : "border border-white/[0.07] text-[#F0EEE8] hover:border-[#C8FF00] hover:text-[#C8FF00]"
              }`}
            >
              Comenzar
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
