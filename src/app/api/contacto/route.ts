import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

// Cliente Supabase con service role para operaciones de escritura
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Cliente Resend para envío de correos
const resend = new Resend(process.env.RESEND_API_KEY!);

// Correo destino — todos los mensajes llegan aquí
const OWNER_EMAIL = "lbatistabustillos@gmail.com";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, phone, email, business, message } = body;

        // Validación básica de campos requeridos
        if (!name || !email) {
            return NextResponse.json(
                { error: "Nombre y correo son obligatorios." },
                { status: 400 }
            );
        }

        // ── 1. Guardar lead en Supabase ──────────────────────────────────────
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
            console.error("Error al insertar lead en Supabase:", dbError.message);
            // No cortamos el flujo — seguimos intentando enviar el correo
        }

        // ── 2. Enviar correo de notificación al dueño ────────────────────────
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
    <tr>
      <td>
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;margin:0 auto;background:#0D0D18;border:1px solid rgba(200,255,0,0.2);border-top:2px solid #C8FF00;">
          <!-- Header -->
          <tr>
            <td style="padding:32px 36px 0;">
              <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#C8FF00;">AXON · Formulario web</p>
              <h1 style="margin:0;font-size:24px;font-weight:700;color:#F0EEE8;line-height:1.2;">Nuevo mensaje de contacto</h1>
            </td>
          </tr>

          <!-- Divider -->
          <tr><td style="padding:24px 36px 0;"><div style="height:1px;background:rgba(255,255,255,0.07);"></div></td></tr>

          <!-- Fields -->
          <tr>
            <td style="padding:28px 36px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                ${name ? `
                <tr>
                  <td style="padding-bottom:18px;">
                    <p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#6A6A82;">Nombre</p>
                    <p style="margin:0;font-size:16px;color:#F0EEE8;">${name}</p>
                  </td>
                </tr>` : ""}
                ${email ? `
                <tr>
                  <td style="padding-bottom:18px;">
                    <p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#6A6A82;">Correo electrónico</p>
                    <p style="margin:0;font-size:16px;color:#F0EEE8;"><a href="mailto:${email}" style="color:#C8FF00;text-decoration:none;">${email}</a></p>
                  </td>
                </tr>` : ""}
                ${phone ? `
                <tr>
                  <td style="padding-bottom:18px;">
                    <p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#6A6A82;">WhatsApp</p>
                    <p style="margin:0;font-size:16px;color:#F0EEE8;"><a href="https://wa.me/${phone.replace(/\D/g, '')}" style="color:#C8FF00;text-decoration:none;">${phone}</a></p>
                  </td>
                </tr>` : ""}
                ${business ? `
                <tr>
                  <td style="padding-bottom:18px;">
                    <p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#6A6A82;">Tipo de negocio</p>
                    <p style="margin:0;font-size:16px;color:#F0EEE8;">${business}</p>
                  </td>
                </tr>` : ""}
                ${message ? `
                <tr>
                  <td style="padding-bottom:8px;">
                    <p style="margin:0 0 8px;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#6A6A82;">Mensaje</p>
                    <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);padding:16px 18px;">
                      <p style="margin:0;font-size:15px;color:rgba(240,238,232,0.8);line-height:1.6;">${message.replace(/\n/g, "<br/>")}</p>
                    </div>
                  </td>
                </tr>` : ""}
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:0 36px 32px;">
              <div style="height:1px;background:rgba(255,255,255,0.07);margin-bottom:20px;"></div>
              <p style="margin:0;font-size:12px;color:#6A6A82;">Este correo fue enviado automáticamente desde el formulario de contacto de <strong style="color:#F0EEE8;">axon.ai</strong></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
        });

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error("Error inesperado en API /contacto:", err);
        return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
    }
}
