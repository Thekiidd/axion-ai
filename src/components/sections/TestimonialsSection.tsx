"use client";

import { TESTIMONIALS } from "@/lib/constants";

function StarRating({ count }: { count: number }) {
    return (
        <div className="flex gap-[3px] mb-5">
            {Array.from({ length: count }).map((_, i) => (
                <span key={i} className="text-[#C8FF00] text-sm">★</span>
            ))}
        </div>
    );
}

export function TestimonialsSection() {
    // No se muestran testimonios hasta tener clientes reales
    if (TESTIMONIALS.length === 0) return null;

    return (
        <section id="testimonios" className="px-12 py-[120px] bg-[#0D0D18]">
            <div className="flex justify-between items-end mb-16">
                <div>
                    <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#C8FF00] mb-7 flex items-center gap-2.5 reveal">
                        <span className="w-5 h-px bg-[#C8FF00]" />
                        Clientes reales, resultados reales
                    </p>
                    <h2 className="font-display text-[clamp(48px,6vw,84px)] leading-[0.95] tracking-[0.02em] reveal">
                        Lo que dicen<br />
                        <span className="text-[#C8FF00]">nuestros clientes</span>
                    </h2>
                </div>
                <p className="hidden md:block reveal text-[#6A6A82] text-[15px] max-w-[300px] leading-[1.65] text-right">
                    Negocios reales de LATAM que ya trabajan con sistemas de IA.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {TESTIMONIALS.map((t, i) => (
                    <div
                        key={t.name}
                        className="reveal bg-[#05050A] border border-white/[0.07] rounded-3xl px-9 py-10 hover:border-white/[0.14] transition-colors duration-300"
                        style={{ transitionDelay: `${i * 0.1}s` }}
                    >
                        <StarRating count={t.stars} />
                        <p className="text-[16px] text-[rgba(240,238,232,0.8)] leading-[1.7] mb-8 italic">
                            &ldquo;{t.quote}&rdquo;
                        </p>
                        <div className="flex items-center gap-4 pt-6 border-t border-white/[0.06]">
                            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[rgba(200,255,0,0.3)] to-[rgba(200,255,0,0.05)] flex items-center justify-center text-[#C8FF00] text-[13px] font-bold flex-shrink-0">
                                {t.avatar}
                            </div>
                            <div>
                                <p className="text-[14px] font-semibold text-[#F0EEE8]">{t.name}</p>
                                <p className="text-[12px] text-[#6A6A82]">
                                    {t.role} · {t.company} · {t.city}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
