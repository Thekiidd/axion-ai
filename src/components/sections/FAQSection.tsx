"use client";

import { useState } from "react";
import { FAQ } from "@/lib/constants";

export function FAQSection() {
    const [open, setOpen] = useState<number | null>(null);

    return (
        <section id="faq" className="px-12 py-[120px] bg-[#0D0D18]">
            <div className="max-w-[780px] mx-auto">
                <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#C8FF00] mb-7 flex items-center gap-2.5 reveal">
                    <span className="w-5 h-px bg-[#C8FF00]" />
                    Preguntas frecuentes
                </p>
                <h2 className="font-display text-[clamp(48px,6vw,84px)] leading-[0.95] tracking-[0.02em] mb-16 reveal">
                    Todo lo que<br />
                    <span className="text-[#C8FF00]">querías saber</span>
                </h2>

                <div className="flex flex-col gap-[2px]">
                    {FAQ.map((item, i) => {
                        const isOpen = open === i;
                        return (
                            <div
                                key={i}
                                className="reveal bg-[#05050A] rounded-2xl overflow-hidden border border-white/[0.04] hover:border-white/[0.1] transition-colors duration-200"
                            >
                                <button
                                    onClick={() => setOpen(isOpen ? null : i)}
                                    className="w-full flex items-center justify-between px-8 py-6 text-left group"
                                >
                                    <span className="text-[16px] font-semibold text-[#F0EEE8] group-hover:text-white transition-colors pr-8">
                                        {item.q}
                                    </span>
                                    <span
                                        className={`text-[#C8FF00] text-2xl flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                                    >
                                        +
                                    </span>
                                </button>

                                <div
                                    className="overflow-hidden transition-all duration-300"
                                    style={{ maxHeight: isOpen ? "300px" : "0px", opacity: isOpen ? 1 : 0 }}
                                >
                                    <p className="px-8 pb-7 text-[15px] text-[#6A6A82] leading-[1.75]">
                                        {item.a}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
