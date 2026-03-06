"use client";

import { useState, useRef } from "react";
import { SITE_CONFIG } from "@/lib/constants";
import { toast } from "sonner";

// ── Constantes de validación ───────────────────────────────────────────────────
const MAX_NAME = 80;
const MAX_EMAIL = 254;
const MAX_PHONE = 20;
const MAX_MESSAGE = 1000;

// Mismo listado que el backend — cualquier valor fuera de aquí es rechazado
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

// ── Helpers de validación ──────────────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[\d\s\-().]{7,20}$/;

function validate(form: typeof INITIAL_FORM): Partial<typeof INITIAL_FORM> {
  const e: Partial<typeof INITIAL_FORM> = {};
  if (!form.name.trim()) e.name = "El nombre es obligatorio.";
  else if (form.name.trim().length < 2) e.name = "Mínimo 2 caracteres.";
  else if (form.name.length > MAX_NAME) e.name = `Máximo ${MAX_NAME} caracteres.`;

  if (!form.email.trim()) e.email = "El correo es obligatorio.";
  else if (!EMAIL_RE.test(form.email)) e.email = "Correo no válido.";
  else if (form.email.length > MAX_EMAIL) e.email = "Correo demasiado largo.";

  if (form.phone && !PHONE_RE.test(form.phone)) e.phone = "Solo dígitos, +, espacios o guiones.";

  if (form.message.length > MAX_MESSAGE) e.message = `Máximo ${MAX_MESSAGE} caracteres.`;

  return e;
}

const INITIAL_FORM = { name: "", phone: "", email: "", business: "", message: "" };

// ── Componente ─────────────────────────────────────────────────────────────────
export function ContactSection() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<typeof INITIAL_FORM>>({});
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(false); // anti-spam: 30 s tras envío

  // Campo invisible honeypot — si tiene valor, es un bot
  const honeypot = useRef<HTMLInputElement>(null);

  // ── Helpers de campo ────────────────────────────────────────────────────────
  const field = (key: keyof typeof INITIAL_FORM) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm(prev => ({ ...prev, [key]: e.target.value }));
      // Borra el error del campo al empezar a corregirlo
      if (errors[key]) setErrors(prev => ({ ...prev, [key]: undefined }));
    },
  });

  // Teléfono: solo permite escribir dígitos, +, espacios, guiones y paréntesis
  const phoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^\d+\s\-().]/g, "");
    if (raw.length > MAX_PHONE) return;
    setForm(prev => ({ ...prev, phone: raw }));
    if (errors.phone) setErrors(prev => ({ ...prev, phone: undefined }));
  };

  // ── Submit ──────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (honeypot.current?.value) return;

    // Cooldown anti-spam
    if (cooldown) {
      toast.error("Espera unos segundos antes de volver a enviar.");
      return;
    }

    // Validación cliente
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      toast.error("Revisa los campos marcados en rojo.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, _hp: honeypot.current?.value ?? "" }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Ocurrió un error. Intenta de nuevo.");
        return;
      }

      toast.success("¡Recibido! Te contactaremos vía WhatsApp en menos de 24 h.");
      setForm(INITIAL_FORM);
      setErrors({});

      // Cooldown 30 s para evitar reenvíos accidentales
      setCooldown(true);
      setTimeout(() => setCooldown(false), 30_000);
    } catch {
      toast.error("No se pudo enviar. Verifica tu conexión e intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  // ── Estilos reutilizables ────────────────────────────────────────────────────
  const inputClass = (key: keyof typeof INITIAL_FORM) =>
    `bg-white/[0.04] border rounded-none px-[18px] py-[14px] text-[#F0EEE8] text-[15px] placeholder-[#6A6A82] outline-none transition-colors font-sans w-full ${errors[key]
      ? "border-red-500/60 focus:border-red-400"
      : "border-white/[0.07] focus:border-[rgba(200,255,0,0.4)]"
    }`;

  return (
    <section
      id="contacto"
      className="px-12 py-[120px] bg-[#0D0D18] grid grid-cols-1 md:grid-cols-2 gap-20"
    >
      {/* ── Columna izquierda — información de contacto ─────────────────────── */}
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

      {/* ── Formulario de contacto ───────────────────────────────────────────── */}
      <div className="reveal">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>

          {/* Campo honeypot oculto — los bots lo rellenan, los humanos no */}
          <input
            ref={honeypot}
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }}
          />

          {/* ── Nombre + WhatsApp ─────────────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-4">
            {/* Nombre */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold tracking-[0.08em] uppercase text-[#6A6A82]">
                Nombre <span className="text-red-400">*</span>
              </label>
              <input
                id="contact-name"
                type="text"
                autoComplete="name"
                placeholder="Tu nombre completo"
                maxLength={MAX_NAME}
                {...field("name")}
                className={inputClass("name")}
              />
              {errors.name && (
                <span className="text-[11px] text-red-400 mt-0.5">{errors.name}</span>
              )}
            </div>

            {/* WhatsApp — solo acepta caracteres de teléfono */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold tracking-[0.08em] uppercase text-[#6A6A82]">
                WhatsApp
              </label>
              <input
                id="contact-phone"
                type="tel"
                autoComplete="tel"
                placeholder="+52 614 000 0000"
                value={form.phone}
                onChange={phoneChange}
                className={inputClass("phone")}
              />
              {errors.phone && (
                <span className="text-[11px] text-red-400 mt-0.5">{errors.phone}</span>
              )}
            </div>
          </div>

          {/* ── Correo ───────────────────────────────────────────────────── */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold tracking-[0.08em] uppercase text-[#6A6A82]">
              Correo electrónico <span className="text-red-400">*</span>
            </label>
            <input
              id="contact-email"
              type="email"
              autoComplete="email"
              placeholder="tu@correo.com"
              maxLength={MAX_EMAIL}
              {...field("email")}
              className={inputClass("email")}
            />
            {errors.email && (
              <span className="text-[11px] text-red-400 mt-0.5">{errors.email}</span>
            )}
          </div>

          {/* ── Tipo de negocio ───────────────────────────────────────────── */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold tracking-[0.08em] uppercase text-[#6A6A82]">
              Tipo de negocio
            </label>
            <select
              id="contact-business"
              value={form.business}
              onChange={field("business").onChange}
              className="bg-white/[0.04] border border-white/[0.07] rounded-none px-[18px] py-[14px] text-[#F0EEE8] text-[15px] outline-none focus:border-[rgba(200,255,0,0.4)] transition-colors font-sans appearance-none w-full"
              style={{ color: form.business ? "#F0EEE8" : "#6A6A82" }}
            >
              <option value="" style={{ background: "#1a1a2e" }}>
                Selecciona tu industria...
              </option>
              {BUSINESS_TYPES.map((t) => (
                <option key={t} value={t} style={{ background: "#1a1a2e" }}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* ── Mensaje con contador de caracteres ───────────────────────── */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold tracking-[0.08em] uppercase text-[#6A6A82]">
                ¿Qué necesitas?
              </label>
              <span
                className="text-[11px] font-mono tabular-nums"
                style={{
                  color: form.message.length > MAX_MESSAGE * 0.9
                    ? form.message.length >= MAX_MESSAGE ? "#ef4444" : "#febc2e"
                    : "#6A6A82",
                }}
              >
                {form.message.length}/{MAX_MESSAGE}
              </span>
            </div>
            <textarea
              id="contact-message"
              rows={4}
              placeholder="Cuéntanos brevemente qué problema quieres resolver con IA..."
              maxLength={MAX_MESSAGE}
              {...field("message")}
              className={`${inputClass("message")} resize-none`}
            />
            {errors.message && (
              <span className="text-[11px] text-red-400 mt-0.5">{errors.message}</span>
            )}
          </div>

          {/* ── Botón submit con cooldown ─────────────────────────────────── */}
          <button
            type="submit"
            disabled={loading || cooldown}
            className="self-start bg-[#C8FF00] text-[#05050A] px-10 py-4 rounded-none text-[15px] font-bold uppercase tracking-[0.08em] hover:scale-[1.04] hover:shadow-[0_8px_40px_rgba(200,255,0,0.4)] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading
              ? "Enviando…"
              : cooldown
                ? "Enviado ✓ — espera unos segundos"
                : "Enviar → Respuesta en 24h"}
          </button>

          <p className="text-[11px] text-[#6A6A82] -mt-1">
            <span className="text-red-400">*</span> Campos obligatorios. Tu información es confidencial y nunca se comparte con terceros.
          </p>
        </form>
      </div>
    </section>
  );
}
