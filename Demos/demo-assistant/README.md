# AXON AI — Demos de Productos

Dos proyectos independientes listos para mostrar a clientes potenciales.

---

## 📁 Estructura

```
demos/
├── demo-assistant/     → Asistente interno empresarial (puerto 3001)
└── demo-restaurant/    → Bot de reservas para restaurante (puerto 3002)
```

---

## ⚡ Setup rápido (ambos proyectos)

### 1. Configura tu API key de Anthropic

En cada carpeta, crea un archivo `.env.local`:

```bash
# demo-assistant/.env.local
ANTHROPIC_API_KEY=sk-ant-api03-tu-key-aqui

# demo-restaurant/.env.local  
ANTHROPIC_API_KEY=sk-ant-api03-tu-key-aqui
```

Obtén tu key en: https://console.anthropic.com

### 2. Instala y corre

```bash
# Demo 1 — Asistente empresarial
cd demo-assistant
npm install
npm run dev
# → http://localhost:3001

# Demo 2 — Bot de restaurante
cd demo-restaurant
npm install
npm run dev
# → http://localhost:3002
```

---

## 🎯 Para qué sirve cada demo

### demo-assistant — Asistente interno empresarial
Muestra cómo una empresa puede tener su propio ChatGPT privado, entrenado con su información interna.

**El cliente puede preguntar:**
- Políticas de RH, vacaciones, home office
- Contactos del equipo
- Información de productos y precios
- Pedir que redacte emails, resúmenes, plantillas

**Para personalizar para un cliente real:**
Edita `src/lib/knowledge.ts` y cambia:
- `COMPANY_CONFIG` → nombre, colores, logo
- `SYSTEM_PROMPT` → información real de la empresa
- `SUGGESTED_QUESTIONS` → preguntas relevantes para ese negocio
- `QUICK_ACTIONS` → acciones frecuentes del equipo

### demo-restaurant — Bot de reservas
Muestra cómo un restaurante puede tener un bot que toma reservas, muestra el menú y responde preguntas 24/7.

**El bot puede:**
- Tomar reservas con todos los datos
- Mostrar el menú con precios
- Informar horarios y ubicación
- Responder FAQs del restaurante

**Para personalizar para un restaurante real:**
Edita `src/lib/restaurant.ts` y cambia:
- `RESTAURANT_CONFIG` → nombre, dirección, teléfono, horarios
- `MENU_HIGHLIGHTS` → menú real con precios
- `SYSTEM_PROMPT` → políticas de reservas específicas

---

## 🚀 Deploy en Vercel (subdominios de AXON)

```bash
# Instala Vercel CLI
npm i -g vercel

# Deploy demo-assistant
cd demo-assistant
vercel --prod
# Configura el dominio: assistant.demo.axon.ai

# Deploy demo-restaurant
cd demo-restaurant
vercel --prod
# Configura el dominio: restaurante.demo.axon.ai
```

**Variables de entorno en Vercel:**
En el dashboard de Vercel → Settings → Environment Variables:
```
ANTHROPIC_API_KEY = sk-ant-api03-tu-key
```

---

## 💼 Cómo usar estos demos para vender

1. **Muéstralos en vivo** durante la llamada de diagnóstico
2. **Personaliza en 10 minutos** con el nombre y datos del prospecto antes de la llamada
3. **Entrégalo** como parte del proyecto — el cliente ya vio cómo funciona
4. **Usa la URL** `demo.axon.ai/restaurante` en materiales de marketing

---

## 🛠️ Stack

- **Next.js 15** + TypeScript + Tailwind CSS
- **Claude Sonnet** via Anthropic SDK (IA real)
- **App Router** con API Routes
- Deploy en **Vercel**
