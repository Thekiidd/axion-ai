"use client";

import { useState } from "react";
import { SITE_CONFIG } from "@/lib/constants";

const BUSINESS_TYPES = [
  "Restaurante / Bar / Café",
  "Coach / Consultor",
  "Tienda / E-commerce",
  "Clínica / Salud",
  "Salón / Spa / Estética",
  "Otro",
];

const CONTACT_ITEMS = [
  { icon: "💬", label: "WhatsApp", value: SITE_CONFIG.phone },
  { icon: "✉️", label: "Email", value: SITE_CONFIG.email },
  { icon: "📍", label: "Ubicación", value: SITE_CONFIG.location },
];

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", phone: "", email: "", business: "", message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contacto"
      className="px-12 py-[120px] bg-[#0D0D18] grid grid-cols-1 md:grid-cols-2 gap-20"
    >
      {/* Left */}
      <div>
        <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#C8FF00] mb-7 flex items-center gap-2.5 reveal">
          <span className="w-5 h-px bg-[#C8FF00]" />
          Hablemos
        </p>
        <h2 className="font-display text-[clamp(48px,6vw,84px)] leading-[0.95] tracking-[0.02em] reveal">
          Empieza<br />
          <span className="text-[#C8FF00]">hoy</span> mismo
        </h2>
        <p className="text-[16px] text-[#6A6A82] mt-6 leading-[1.7] reveal">
          Cuéntanos sobre tu negocio. En menos de 24 horas tendrás una propuesta personalizada en tu bandeja.
        </p>

        <div className="mt-12 flex flex-col">
          {CONTACT_ITEMS.map((item, i) => (
            <div
              key={item.label}
              className="py-7 border-b border-white/[0.07] flex gap-5 items-start reveal"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <span className="text-[22px]">{item.icon}</span>
              <div>
                <p className="text-[11px] uppercase tracking-[0.1em] text-[#6A6A82] mb-1">{item.label}</p>
                <p className="text-[16px] font-medium">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="reveal">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold tracking-[0.08em] uppercase text-[#6A6A82]">
                  Nombre
                </label>
                <input
                  type="text"
                  required
                  placeholder="Tu nombre completo"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="bg-white/[0.04] border border-white/[0.07] rounded-xl px-[18px] py-[14px] text-[#F0EEE8] text-[15px] placeholder-[#6A6A82] outline-none focus:border-[rgba(200,255,0,0.4)] transition-colors font-sans"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold tracking-[0.08em] uppercase text-[#6A6A82]">
                  WhatsApp
                </label>
                <input
                  type="tel"
                  placeholder="+52 614 000 0000"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="bg-white/[0.04] border border-white/[0.07] rounded-xl px-[18px] py-[14px] text-[#F0EEE8] text-[15px] placeholder-[#6A6A82] outline-none focus:border-[rgba(200,255,0,0.4)] transition-colors font-sans"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold tracking-[0.08em] uppercase text-[#6A6A82]">
                Correo electrónico
              </label>
              <input
                type="email"
                required
                placeholder="tu@correo.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="bg-white/[0.04] border border-white/[0.07] rounded-xl px-[18px] py-[14px] text-[#F0EEE8] text-[15px] placeholder-[#6A6A82] outline-none focus:border-[rgba(200,255,0,0.4)] transition-colors font-sans"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold tracking-[0.08em] uppercase text-[#6A6A82]">
                Tipo de negocio
              </label>
              <select
                value={form.business}
                onChange={(e) => setForm({ ...form, business: e.target.value })}
                className="bg-white/[0.04] border border-white/[0.07] rounded-xl px-[18px] py-[14px] text-[#F0EEE8] text-[15px] outline-none focus:border-[rgba(200,255,0,0.4)] transition-colors font-sans appearance-none"
                style={{ color: form.business ? "#F0EEE8" : "#6A6A82" }}
              >
                <option value="" disabled style={{ background: "#1a1a2e" }}>
                  Selecciona tu industria...
                </option>
                {BUSINESS_TYPES.map((t) => (
                  <option key={t} value={t} style={{ background: "#1a1a2e" }}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold tracking-[0.08em] uppercase text-[#6A6A82]">
                ¿Qué necesitas?
              </label>
              <textarea
                rows={4}
                placeholder="Cuéntanos brevemente qué problema quieres resolver con IA..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="bg-white/[0.04] border border-white/[0.07] rounded-xl px-[18px] py-[14px] text-[#F0EEE8] text-[15px] placeholder-[#6A6A82] outline-none focus:border-[rgba(200,255,0,0.4)] transition-colors font-sans resize-none"
              />
            </div>

            <button
              type="submit"
              className="self-start bg-[#C8FF00] text-[#05050A] px-10 py-4 rounded-full text-[15px] font-bold uppercase tracking-[0.08em] hover:scale-[1.04] hover:shadow-[0_8px_40px_rgba(200,255,0,0.4)] transition-all duration-300"
            >
              Enviar → Respuesta en 24h
            </button>
          </form>
        ) : (
          <div className="bg-[rgba(200,255,0,0.06)] border border-[rgba(200,255,0,0.3)] rounded-2xl p-8 text-center text-[#C8FF00] font-semibold text-lg">
            ✅ ¡Recibido! Te contactaremos en las próximas 24 horas por WhatsApp. ¡Prepárate para crecer! 🚀
          </div>
        )}
      </div>
    </section>
  );
}
