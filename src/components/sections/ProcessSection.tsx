import { PROCESS_STEPS, CASES } from "@/lib/constants";

export function ProcessSection() {
  return (
    <section id="proceso" className="px-12 py-[120px]">
      <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#C8FF00] mb-7 flex items-center gap-2.5 reveal">
        <span className="w-5 h-px bg-[#C8FF00]" />
        Cómo trabajamos
      </p>
      <h2 className="font-display text-[clamp(48px,6vw,84px)] leading-[0.95] tracking-[0.02em] mb-20 reveal">
        Simple, rápido,<br />
        <span className="text-[#C8FF00]">efectivo</span>
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-0 relative">
        {/* Línea conectora vertical entre pasos */}
        <div className="absolute top-7 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-[#C8FF00] to-[rgba(200,255,0,0.1)] hidden md:block" />

        {PROCESS_STEPS.map((step, i) => (
          <div
            key={step.num}
            className="pt-20 px-5 pb-5 relative text-center reveal"
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            {/* Punto decorativo del paso */}
            <div
              className={`absolute top-5 left-1/2 -translate-x-1/2 w-[18px] h-[18px] rounded-none border-2 border-[#C8FF00] z-10 ${i === 0 ? "bg-[#C8FF00] shadow-[0_0_24px_rgba(200,255,0,0.4)]" : "bg-[#05050A]"
                }`}
            />
            {/* Número grande de fondo decorativo */}
            <div className="font-display text-[64px] text-[rgba(200,255,0,0.06)] leading-none absolute top-12 left-1/2 -translate-x-1/2">
              {step.num}
            </div>
            <h4 className="font-display text-[22px] tracking-[0.05em] mb-3">{step.title}</h4>
            <p className="text-[13px] text-[#6A6A82] leading-[1.65]">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function CasesSection() {
  return (
    <section id="casos" className="px-12 py-[120px] bg-[#0D0D18]">
      <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#C8FF00] mb-7 flex items-center gap-2.5 reveal">
        <span className="w-5 h-px bg-[#C8FF00]" />
        Casos de éxito
      </p>
      <h2 className="font-display text-[clamp(48px,6vw,84px)] leading-[0.95] tracking-[0.02em] mb-16 reveal">
        Negocios que<br />
        <span className="text-[#C8FF00]">ya crecen</span> con IA
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-5">
        {CASES.map((c, i) => (
          <div
            key={i}
            className={`group bg-[#05050A] border border-white/[0.07] rounded-none p-10 relative overflow-hidden hover:border-[rgba(200,255,0,0.25)] hover:-translate-y-1.5 transition-all duration-300 reveal ${c.big ? "row-span-2 flex flex-col justify-end" : ""
              }`}
            style={{ transitionDelay: `${i * 0.1}s` }}
            data-cursor-hover
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(200,255,0,0.04)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#C8FF00] mb-4">
              {c.industry}
            </p>
            <h3 className="text-[22px] font-semibold mb-3 leading-[1.3]">{c.title}</h3>
            <p className="text-sm text-[#6A6A82] leading-[1.65] mb-6">{c.description}</p>

            <div className="flex items-center gap-3">
              <div className="font-display text-[48px] text-[#C8FF00] leading-none">
                {c.result}
              </div>
              <div className="text-xs text-[#6A6A82] leading-[1.4] whitespace-pre-line">
                {c.resultLabel}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
