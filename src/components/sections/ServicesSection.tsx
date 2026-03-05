import { SERVICES } from "@/lib/constants";

export function ServicesSection() {
  return (
    <section id="servicios" className="px-12 py-[120px] bg-[#0D0D18]">
      <div className="flex justify-between items-end mb-16">
        <div>
          <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#C8FF00] mb-7 flex items-center gap-2.5 reveal">
            <span className="w-5 h-px bg-[#C8FF00]" />
            Lo que hacemos
          </p>
          <h2 className="font-display text-[clamp(48px,6vw,84px)] leading-[0.95] tracking-[0.02em] reveal">
            Nuestros<br />
            <span className="text-[#C8FF00]">servicios</span>
          </h2>
        </div>
        <p className="hidden md:block reveal text-[#6A6A82] text-[15px] max-w-[320px] leading-[1.65] text-right">
          Cada solución es construida con IA y ajustada a tu negocio específico.
        </p>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-[2px] bg-white/[0.07] rounded-none overflow-hidden reveal"
      >
        {SERVICES.map((svc) => (
          <div
            key={svc.num}
            className="group bg-[#05050A] px-9 py-12 relative overflow-hidden hover:bg-[#0a0a15] transition-colors duration-300"
            data-cursor-hover
          >
            {/* Capa de degradado que aparece al hacer hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(200,255,0,0.05)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Flecha diagonal — indica interactividad */}
            <span className="absolute top-10 right-9 text-[#C8FF00] text-xl opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300">
              ↗
            </span>

            <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#C8FF00] mb-8">
              {svc.num}
            </p>
            <span className="text-4xl mb-5 block">{svc.emoji}</span>
            <h3 className="font-display text-[28px] tracking-[0.04em] mb-3 text-[#F0EEE8]">
              {svc.title}
            </h3>
            <p className="text-sm text-[#6A6A82] leading-[1.7] mb-7">{svc.description}</p>

            <a
              href="#contacto"
              className="inline-flex items-center gap-2 bg-[rgba(200,255,0,0.08)] border border-[rgba(200,255,0,0.2)] text-[#C8FF00] px-4 py-[7px] rounded-none text-[13px] font-semibold hover:bg-[rgba(200,255,0,0.15)] transition-colors"
            >
              {svc.cta} →
            </a>

            <div className="flex flex-wrap gap-2 mt-5">
              {svc.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] text-[#6A6A82] border border-white/[0.07] rounded-none px-[10px] py-[3px]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
