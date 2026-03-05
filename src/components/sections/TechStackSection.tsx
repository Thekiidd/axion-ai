"use client";

import { TECH_STACK } from "@/lib/constants";

export function TechStackSection() {
    const doubled = [...TECH_STACK, ...TECH_STACK];

    return (
        <section className="py-14 border-y border-white/[0.06] overflow-hidden bg-[#05050A]">
            <p className="text-center text-[11px] font-bold tracking-[0.2em] uppercase text-[#6A6A82] mb-8">
                Tecnologías que usamos para construir tus soluciones
            </p>

            <div className="relative">
                {/* Degradados en los bordes para el efecto de desvanecimiento */}
                <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-[#05050A] to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-[#05050A] to-transparent pointer-events-none" />

                <div className="flex gap-12 animate-[ticker_30s_linear_infinite] w-max">
                    {doubled.map((tech, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-3 text-[#6A6A82] hover:text-[#F0EEE8] transition-colors duration-200 cursor-default flex-shrink-0"
                        >
                            <span className="text-xl">{tech.icon}</span>
                            <span className="text-[13px] font-semibold tracking-wide whitespace-nowrap">
                                {tech.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
