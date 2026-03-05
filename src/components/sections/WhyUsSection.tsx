import { WHY_US } from "@/lib/constants";

export function WhyUsSection() {
    return (
        <section id="nosotros" className="px-12 py-[120px]">
            <div className="flex justify-between items-end mb-16">
                <div>
                    <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#C8FF00] mb-7 flex items-center gap-2.5 reveal">
                        <span className="w-5 h-px bg-[#C8FF00]" />
                        Por qué elegirnos
                    </p>
                    <h2 className="font-display text-[clamp(48px,6vw,84px)] leading-[0.95] tracking-[0.02em] reveal">
                        No somos<br />
                        <span className="text-[#C8FF00]">otra agencia</span>
                    </h2>
                </div>
                <p className="hidden md:block reveal text-[#6A6A82] text-[15px] max-w-[320px] leading-[1.65] text-right">
                    Agencias lentas, cobros ocultos y promesas incumplidas. Nosotros somos lo contrario.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px] bg-white/[0.07] rounded-none overflow-hidden reveal">
                {WHY_US.map((item, i) => (
                    <div
                        key={i}
                        className="group bg-[#05050A] px-9 py-10 relative hover:bg-[#0a0a15] transition-colors duration-300"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(200,255,0,0.04)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="text-3xl mb-5 block">{item.icon}</span>
                        <h3 className="font-display text-[22px] tracking-[0.03em] mb-3 text-[#F0EEE8]">
                            {item.title}
                        </h3>
                        <p className="text-sm text-[#6A6A82] leading-[1.7]">{item.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
