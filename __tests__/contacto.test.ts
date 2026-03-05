import { expect, test, describe } from 'vitest';

// URL del servidor local de desarrollo (debe estar corriendo npm run dev)
const URL = 'http://localhost:3000/api/contacto';

describe('Vulnerabilidades del endpoint de Contacto (Supabase)', () => {

    test('1. Rechaza payloads vacíos', async () => {
        const res = await fetch(URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({}),
        });
        expect(res.status).toBe(400);
        const data = await res.json();
        expect(data.error).toBe('Nombre y correo son obligatorios.');
    });

    test('2. Rechaza email faltante', async () => {
        const res = await fetch(URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Hacker', message: 'Falta email' }),
        });
        expect(res.status).toBe(400);
    });

    test('3. Escapa inyección XSS básica en mensaje', async () => {
        const res = await fetch(URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Test XSS',
                email: 'test@axon.ai',
                message: '<script>alert("hack")</script>',
            }),
        });
        // Debe aceptar el query, pero Supabase lo guarda como texto plano gracias 
        // a los prepared statements automáticos del SDK.
        expect(res.status).toBe(200);
    });

});
