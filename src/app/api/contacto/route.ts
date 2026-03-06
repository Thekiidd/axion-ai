import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

// ── Clientes externos ──────────────────────────────────────────────────────────
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);
const resend = new Resend(process.env.RESEND_API_KEY!);

const OWNER_EMAIL = "lbatistabustillos@gmail.com";

// ── Whitelist de tipo de negocio ───────────────────────────────────────────────
const ALLOWED_BUSINESS = new Set([
    "Restaurante / Bar / Café",
    "Coach / Consultor",
    "Tienda / E-commerce",
    "Clínica / Salud",
    "Salón / Spa / Estética",
    "Otro",
    "",            // campo opcional, puede llegar vacío
]);

// ── Rate limiting en memoria ───────────────────────────────────────────────────
// Máximo 3 envíos por IP cada 10 minutos
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 min en ms

const ipMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const entry = ipMap.get(ip);

    if (!entry || now > entry.resetAt) {
        ipMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
        return false;
    }
    if (entry.count >= RATE_LIMIT_MAX) return true;

    entry.count++;
    return false;
}

// ── Sanitización ───────────────────────────────────────────────────────────────
// Elimina etiquetas HTML/JS y recorta espacios
function sanitize(value: unknown, maxLen: number): string {
    if (typeof value !== "string") return "";
    return value
        .slice(0, maxLen)
        .replace(/<[^>]*>/g, "")          // strip HTML tags
        .replace(/[\u0000-\u001F\u007F]/g, "") // strip control chars
        .trim();
}

// Escapa caracteres especiales HTML para el template del correo
function escHtml(str: string): string {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;")
        .replace(/\n/g, "<br/>");
}

// ── Validación ─────────────────────────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[\d\s\-().]{7,20}$/;

// ── Handler ────────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
    try {
        // ── 0. Rate limiting por IP ──────────────────────────────────────────
        const ip =
            req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
            req.headers.get("x-real-ip") ??
            "unknown";

        if (isRateLimited(ip)) {
            return NextResponse.json(
                { error: "Demasiados intentos. Espera unos minutos e inténtalo de nuevo." },
                { status: 429 }
            );
        }

        // ── 1. Leer y sanitizar body ─────────────────────────────────────────
        let body: Record<string, unknown>;
        try {
            body = await req.json();
        } catch {
            return NextResponse.json({ error: "Cuerpo de petición inválido." }, { status: 400 });
        }

        const name = sanitize(body.name, 80);
        const email = sanitize(body.email, 254).toLowerCase();
        const phone = sanitize(body.phone, 20);
        const business = sanitize(body.business, 60);
        const message = sanitize(body.message, 1000);
        const honeypot = sanitize(body._hp, 10);

        // ── 2. Honeypot — si tiene valor, es un bot ──────────────────────────
        if (honeypot) {
            // Respondemos 200 para no revelar la detección al bot
            return NextResponse.json({ ok: true });
        }

        // ── 3. Validaciones estrictas ────────────────────────────────────────
        if (!name || name.length < 2) {
            return NextResponse.json({ error: "Nombre inválido." }, { status: 400 });
        }

        if (!email || !EMAIL_RE.test(email)) {
            return NextResponse.json({ error: "Correo electrónico inválido." }, { status: 400 });
        }

        if (phone && !PHONE_RE.test(phone)) {
            return NextResponse.json({ error: "Número de teléfono inválido." }, { status: 400 });
        }

        if (business && !ALLOWED_BUSINESS.has(business)) {
            return NextResponse.json({ error: "Tipo de negocio no permitido." }, { status: 400 });
        }

        // ── 4. Guardar lead en Supabase ──────────────────────────────────────
        const { error: dbError } = await supabase.from("leads").insert([
            {
                nombre: name,
                whatsapp: phone || null,
                email,
                tipo_negocio: business || null,
                mensaje: message || null,
                estado: "nuevo",
                origen: "formulario_web",
            },
        ]);

        if (dbError) {
            console.error("[contacto] Supabase insert error:", dbError.message);
            // No cortamos el flujo — intentamos enviar el correo igual
        }

        // ── 5. Enviar correo al dueño ────────────────────────────────────────
        const safeName = escHtml(name);
        const safeEmail = escHtml(email);
        const safePhone = escHtml(phone);
        const safeBusiness = escHtml(business);
        const safeMessage = escHtml(message);

        await resend.emails.send({
            from: "AXON Contacto <onboarding@resend.dev>",
            to: OWNER_EMAIL,
            replyTo: email,
            subject: `📬 Nuevo lead: ${name}${business ? ` · ${business}` : ""}`,
            html: `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#05050A;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#05050A;padding:48px 24px;">
    <tr><td>
      <table width="100%" cellpadding="0" cellspacing="0"
        style="max-width:520px;margin:0 auto;background:#0D0D18;border:1px solid rgba(200,255,0,0.2);border-top:2px solid #C8FF00;">
        <!-- Header -->
        <tr>
          <td style="padding:32px 36px 0;">
            <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#C8FF00;">
              AXON · Formulario web</p>
            <h1 style="margin:0;font-size:24px;font-weight:700;color:#F0EEE8;line-height:1.2;">
              Nuevo mensaje de contacto</h1>
          </td>
        </tr>
        <!-- Divider -->
        <tr><td style="padding:24px 36px 0;">
          <div style="height:1px;background:rgba(255,255,255,0.07);"></div>
        </td></tr>
        <!-- Fields -->
        <tr>
          <td style="padding:28px 36px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr><td style="padding-bottom:18px;">
                <p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#6A6A82;">Nombre</p>
                <p style="margin:0;font-size:16px;color:#F0EEE8;">${safeName}</p>
              </td></tr>
              <tr><td style="padding-bottom:18px;">
                <p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#6A6A82;">Correo electrónico</p>
                <p style="margin:0;font-size:16px;color:#F0EEE8;">
                  <a href="mailto:${safeEmail}" style="color:#C8FF00;text-decoration:none;">${safeEmail}</a></p>
              </td></tr>
              ${safePhone ? `<tr><td style="padding-bottom:18px;">
                <p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#6A6A82;">WhatsApp</p>
                <p style="margin:0;font-size:16px;color:#F0EEE8;">
                  <a href="https://wa.me/${phone.replace(/\D/g, "")}" style="color:#C8FF00;text-decoration:none;">${safePhone}</a></p>
              </td></tr>` : ""}
              ${safeBusiness ? `<tr><td style="padding-bottom:18px;">
                <p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#6A6A82;">Tipo de negocio</p>
                <p style="margin:0;font-size:16px;color:#F0EEE8;">${safeBusiness}</p>
              </td></tr>` : ""}
              ${safeMessage ? `<tr><td style="padding-bottom:8px;">
                <p style="margin:0 0 8px;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#6A6A82;">Mensaje</p>
                <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);padding:16px 18px;">
                  <p style="margin:0;font-size:15px;color:rgba(240,238,232,0.8);line-height:1.6;">${safeMessage}</p>
                </div>
              </td></tr>` : ""}
            </table>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:0 36px 32px;">
            <div style="height:1px;background:rgba(255,255,255,0.07);margin-bottom:20px;"></div>
            <p style="margin:0;font-size:12px;color:#6A6A82;">
              Enviado automáticamente desde el formulario de <strong style="color:#F0EEE8;">axon.ai</strong> · IP: ${ip}</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
        });

        return NextResponse.json({ ok: true });

    } catch (err) {
        console.error("[contacto] Error inesperado:", err);
        return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
    }
}
