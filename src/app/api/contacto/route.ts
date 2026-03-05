import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Cliente con service role para operaciones de escritura desde el servidor
// Usar SUPABASE_SERVICE_ROLE_KEY (nunca la anon key del server) para bypasear RLS
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

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

        // Insertar lead en la tabla 'leads' de Supabase
        const { error } = await supabase.from("leads").insert([
            {
                nombre: name,
                whatsapp: phone || null,
                email,
                tipo_negocio: business || null,
                mensaje: message || null,
                estado: "nuevo",         // Estado inicial del lead
                origen: "formulario_web", // Fuente de captación
            },
        ]);

        if (error) {
            console.error("Error al insertar lead en Supabase:", error.message);
            return NextResponse.json(
                { error: "No se pudo guardar tu información. Intenta de nuevo." },
                { status: 500 }
            );
        }

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error("Error inesperado en API /contacto:", err);
        return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
    }
}
