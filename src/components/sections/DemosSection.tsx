import Link from "next/link";

const DEMOS = [
    {
        id: "assistant",
        badge: "Asistente empresarial",
        emoji: "🤖",
        title: "ChatGPT privado para tu empresa",
        description:
            "Asistente con IA entrenado con la información interna de un negocio. Responde políticas de RH, contactos del equipo, información de productos y redacta emails o resúmenes en segundos.",
        subdomain: "assistant.demo.axon.ai",
        href: "https://assistant.demo.axon.ai",
        tags: ["Anthropic Claude", "Conocimiento privado", "Acceso por equipo"],
        accent: "#C8FF00",
        useCases: ["Consultas de RH", "Redacción de emails", "Precios y catálogo", "Documentos internos"],
    },
    {
        id: "restaurant",
        badge: "Bot de reservas",
        emoji: "🍽️",
        title: "Asistente para restaurante 24/7",
        description:
            "Bot que atiende reservas, muestra el menú con precios y responde preguntas frecuentes del restaurante. Opera sin intervención humana, en cualquier horario.",
        subdomain: "restaurante.demo.axon.ai",
        href: "https://restaurante.demo.axon.ai",
        tags: ["WhatsApp-ready", "Menú dinámico", "Reservas automáticas"],
        accent: "#C8FF00",
        useCases: ["Tomar reservas", "Mostrar menú y precios", "Horarios y ubicación", "Preguntas frecuentes"],
    },
];

export function DemosSection() {
    return (
        <section id="demos" className="px-12 py-[120px] bg-[#0D0D18]">
            {/* Encabezado de la sección */}
            <div className="flex justify-between items-end mb-16">
                <div>
                    <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#C8FF00] mb-7 flex items-center gap-2.5 reveal">
                        <span className="w-5 h-px bg-[#C8FF00]" />
                        Proyectos en vivo
                    </p>
                    <h2 className="font-display text-[clamp(48px,6vw,84px)] leading-[0.95] tracking-[0.02em] reveal">
                        Demos que puedes<br />
                        <span className="text-[#C8FF00]">probar ahora</span>
                    </h2>
                </div>
                <p className="hidden md:block reveal text-[#6A6A82] text-[15px] max-w-[320px] leading-[1.65] text-right">
                    Cada demo muestra un tipo de solución real. Así luce lo que construiríamos para tu negocio.
                </p>
            </div>

            {/* Grid de tarjetas de demo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {DEMOS.map((demo, i) => (
                    <div
                        key={demo.id}
                        className="reveal group bg-[#05050A] border border-white/[0.07] rounded-none overflow-hidden hover:border-[rgba(200,255,0,0.25)] transition-all duration-300"
                        style={{ transitionDelay: `${i * 0.1}s` }}
                    >
                        {/* Barra superior simulando ventana de navegador */}
                        <div className="bg-white/[0.03] border-b border-white/[0.06] px-6 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="flex gap-[5px]">
                                    <span className="w-[9px] h-[9px] rounded-none bg-[#ff5f57]" />
                                    <span className="w-[9px] h-[9px] rounded-none bg-[#febc2e]" />
                                    <span className="w-[9px] h-[9px] rounded-none bg-[#28c840]" />
                                </div>
                                <span className="text-[11px] text-[#6A6A82] ml-3 font-mono">{demo.subdomain}</span>
                            </div>
                            <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-[#C8FF00] bg-[rgba(200,255,0,0.08)] border border-[rgba(200,255,0,0.2)] px-3 py-1 rounded-none">
                                {demo.badge}
                            </span>
                        </div>

                        {/* Contenido de la tarjeta */}
                        <div className="px-9 py-10">
                            <span className="text-4xl mb-5 block">{demo.emoji}</span>

                            <h3 className="font-display text-[32px] tracking-[0.03em] mb-4 text-[#F0EEE8] leading-tight">
                                {demo.title}
                            </h3>

                            <p className="text-[15px] text-[#6A6A82] leading-[1.7] mb-7">
                                {demo.description}
                            </p>

                            {/* Lista de casos de uso */}
                            <div className="mb-8">
                                <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#6A6A82] mb-3">
                                    Qué puede hacer
                                </p>
                                <ul className="flex flex-col gap-2">
                                    {demo.useCases.map((uc) => (
                                        <li key={uc} className="flex items-center gap-2.5 text-[13px] text-[rgba(240,238,232,0.6)]">
                                            <span className="text-[#C8FF00] text-xs">✓</span>
                                            {uc}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Etiquetas de tecnología */}
                            <div className="flex flex-wrap gap-2 mb-9">
                                {demo.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-[11px] text-[#6A6A82] border border-white/[0.07] rounded-none px-[10px] py-[3px]"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Botón de llamada a la acción */}
                            <Link
                                href={demo.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 bg-[#C8FF00] text-[#05050A] px-7 py-3.5 rounded-none text-[13px] font-bold uppercase tracking-[0.07em] transition-all duration-200 hover:scale-[1.04] hover:shadow-[0_8px_32px_rgba(200,255,0,0.35)] hover:-translate-y-0.5"
                            >
                                Probar demo en vivo
                                <span className="text-base">↗</span>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Nota al pie con invitación a personalizar el demo */}
            <p className="text-center text-[13px] text-[#6A6A82] mt-12 reveal">
                ¿Quieres un demo personalizado con el nombre y datos de tu negocio?{" "}
                <Link href="#contacto" className="text-[#C8FF00] hover:underline">
                    Contáctanos →
                </Link>
            </p>
        </section>
    );
}
