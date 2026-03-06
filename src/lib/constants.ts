export const SITE_CONFIG = {
  name: "AXON",
  tagline: "Desarrollo web, hosting y soluciones a medida con IA.",
  description:
    "Diseñamos y desarrollamos sitios web profesionales, damos hosting y construimos soluciones digitales a medida para micro y pequeñas empresas. También implementamos inteligencia artificial cuando el proyecto lo requiere.",
  phone: "+52 614 356 8323",
  email: "lbatistabustillos@gmail.com",
  location: "Chihuahua, México · Servimos todo LATAM",
  social: {
    instagram: "https://instagram.com/axon.ai",
    linkedin: "https://linkedin.com/company/axon-ai",
  },
};

export const STATS = [
  { value: "3–7", label: "Días de entrega\ngarantizada por escrito", static: true },
  { value: "100%", label: "Precio fijo\nsin costos ocultos", static: true },
  { value: "0", label: "Contratos anuales\nCancela cuando quieras", static: true },
  { value: "24/7", label: "Hosting activo\nsin interrupciones", static: true },
];

export const SERVICES = [
  {
    num: "01",
    emoji: "🌐",
    title: "Diseño y desarrollo web",
    description:
      "Sitios web profesionales hechos a la medida de tu negocio: landing pages, sitios corporativos, portafolios y blogs. Diseño moderno, rápido y optimizado para Google desde el día uno.",
    cta: "Cotización gratuita",
    tags: ["Diseño personalizado", "SEO on-page", "Mobile-first"],
  },
  {
    num: "02",
    emoji: "🖥️",
    title: "Hosting y mantenimiento",
    description:
      "Alojamos tu web en servidores de alta disponibilidad con dominio incluido, certificado SSL, copias de seguridad automáticas y soporte técnico. Sin complicaciones técnicas de tu parte.",
    cta: "Cotización gratuita",
    tags: ["Uptime 99.9%", "SSL incluido", "Backups diarios"],
  },
  {
    num: "03",
    emoji: "🛒",
    title: "Tiendas online y e-commerce",
    description:
      "Tu tienda en internet con catálogo de productos, carrito de compras, pagos en línea (tarjeta, PayPal, transferencia) y gestión de pedidos. Lista para vender desde el primer día.",
    cta: "Cotización gratuita",
    tags: ["Pagos integrados", "Gestión de pedidos", "Entrega en 5–7 días"],
  },
  {
    num: "04",
    emoji: "⚙️",
    title: "Soluciones a medida",
    description:
      "Cuando los templates no alcanzan. Desarrollamos sistemas personalizados: portales de clientes, sistemas de reservas, CRMs simples, intranets o cualquier herramienta interna que tu negocio necesite.",
    cta: "Cuéntanos tu proyecto",
    tags: ["100% a medida", "Documentación incluida", "Escalable"],
  },
  {
    num: "05",
    emoji: "🤖",
    title: "Implementación de IA",
    description:
      "Integramos inteligencia artificial en tus procesos: chatbots de atención al cliente, generación de contenido automático, análisis de datos y automatización de tareas repetitivas.",
    cta: "Cotización gratuita",
    tags: ["Gemini / OpenAI", "WhatsApp + Web", "Setup en 3–4 días"],
  },
  {
    num: "06",
    emoji: "🎨",
    title: "Identidad digital y branding",
    description:
      "Logotipo, paleta de colores, tipografías y guía de estilo básica para que tu negocio tenga una imagen coherente en web y redes sociales. Base sólida para cualquier proyecto digital.",
    cta: "Cotización gratuita",
    tags: ["Logo vectorial", "Guía de marca", "Entrega en 3–5 días"],
  },
];

export const PROCESS_STEPS = [
  {
    num: "01",
    title: "Llamada de diagnóstico",
    description:
      "30 minutos por Zoom. Escuchamos qué necesitas, qué tienes actualmente y qué resultado esperas. Sin compromiso de tu parte.",
  },
  {
    num: "02",
    title: "Propuesta en 24 horas",
    description:
      "Recibes un documento con el alcance exacto, precio fijo y fecha de entrega por escrito. Sin letra chica.",
  },
  {
    num: "03",
    title: "Diseño y desarrollo",
    description:
      "Construimos tu proyecto con revisiones en tiempo real. Ves el avance por WhatsApp o email y puedes pedir ajustes antes de la entrega.",
  },
  {
    num: "04",
    title: "Entrega y soporte",
    description:
      "Proyecto en vivo con todos los accesos organizados. Incluye capacitación básica y soporte técnico los primeros 30 días sin costo adicional.",
  },
];

export const CASES = [
  {
    industry: "🍽️ Negocios de hospitalidad",
    title: "Presencia digital que trabaja incluso cuando cierras",
    description:
      "Sitio web con menú digital actualizable, integración de reservas y sección de reseñas. Tus clientes encuentran toda la información que necesitan antes de llegar.",
    result: "24/7",
    resultLabel: "Información\ndisponible",
    big: true,
  },
  {
    industry: "� Comercio y retail",
    title: "Catálogo o tienda online lista para vender",
    description:
      "Desde un catálogo digital con WhatsApp integrado hasta una tienda completa con pagos en línea. Tu inventario visible y accesible para cualquier cliente, desde cualquier dispositivo.",
    result: "3–5",
    resultLabel: "Días para\nestar en vivo",
  },
  {
    industry: "� Servicios y profesionales independientes",
    title: "Porfolio o sitio corporativo que genera confianza",
    description:
      "Diseño profesional que transmite credibilidad, muestra tus servicios con claridad y convierte visitantes en prospectos a través de un formulario o chat integrado.",
    result: "$0",
    resultLabel: "Costo de\nmantenimiento oculto",
  },
];

export const PRICING_PLANS = [
  {
    tier: "Mantenimiento",
    price: "59",
    period: "USD / mes",
    featured: false,
    features: [
      { text: "Hosting + dominio incluido", included: true },
      { text: "Certificado SSL activo", included: true },
      { text: "Backups automáticos diarios", included: true },
      { text: "2 actualizaciones de contenido/mes", included: true },
      { text: "Soporte técnico WhatsApp (Lun–Vie)", included: true },
      { text: "Reportes de rendimiento", included: false },
    ],
  },
  {
    tier: "Crecimiento",
    price: "129",
    period: "USD / mes",
    featured: true,
    features: [
      { text: "Todo del plan Mantenimiento", included: true },
      { text: "Actualizaciones ilimitadas de contenido", included: true },
      { text: "Reporte mensual de métricas web", included: true },
      { text: "Optimización SEO mensual", included: true },
      { text: "1 sección nueva o mejora/mes", included: true },
      { text: "Integraciones y automatizaciones", included: false },
    ],
  },
  {
    tier: "Escala",
    price: "299",
    period: "USD / mes",
    featured: false,
    features: [
      { text: "Todo del plan Crecimiento", included: true },
      { text: "Chatbot IA activo 24/7", included: true },
      { text: "1 automatización o integración/mes", included: true },
      { text: "Dashboard de métricas en tiempo real", included: true },
      { text: "Soporte prioritario < 4h hábiles", included: true },
      { text: "Consultoría digital mensual (1h)", included: true },
    ],
  },
];

export const TECH_STACK = [
  { name: "Next.js", icon: "⚛️" },
  { name: "React", icon: "�" },
  { name: "Tailwind CSS", icon: "🎨" },
  { name: "Supabase", icon: "🗄️" },
  { name: "Vercel", icon: "▲" },
  { name: "Stripe", icon: "�" },
  { name: "OpenAI GPT-4", icon: "🧠" },
  { name: "WhatsApp Business API", icon: "�" },
  { name: "n8n", icon: "⚙️" },
  { name: "Figma", icon: "🖌️" },
  { name: "TypeScript", icon: "📘" },
  { name: "Resend", icon: "📧" },
];

export const TESTIMONIALS: {
  name: string;
  role: string;
  company: string;
  city: string;
  avatar: string;
  quote: string;
  stars: number;
}[] = [];

export const WHY_US = [
  {
    icon: "🎯",
    title: "Precio fijo por escrito",
    description:
      "Antes de empezar recibes una propuesta con el costo total. Si el proyecto se extiende por nuestra parte, el precio no cambia. Sin sorpresas al final.",
  },
  {
    icon: "⚡",
    title: "Entrega en 3–7 días hábiles",
    description:
      "No gestionamos proyectos de meses. Entregamos sitios y soluciones funcionales en días. La fecha exacta queda confirmada por escrito en la propuesta.",
  },
  {
    icon: "🤝",
    title: "Sin contratos de permanencia",
    description:
      "El hosting y soporte se pueden cancelar cuando quieras con 15 días de aviso. No usamos contratos anuales para retenerte.",
  },
  {
    icon: "🇲🇽",
    title: "Equipo en LATAM, soporte en español",
    description:
      "Operamos en horario de México. Soporte por WhatsApp, respuesta el mismo día en horario hábil. Sin bots de soporte ni barreras de idioma.",
  },
  {
    icon: "🔒",
    title: "Revisiones incluidas",
    description:
      "7 días de revisiones después de la entrega sin costo adicional. Si algo no coincide con lo acordado, lo corregimos.",
  },
  {
    icon: "📋",
    title: "Accesos organizados y documentados",
    description:
      "Entregamos todos los accesos (hosting, dominio, panel de control) organizados. Tu negocio tiene control total de lo que construimos para ti.",
  },
];

export const FAQ = [
  {
    q: "¿Necesito saber de tecnología para trabajar con ustedes?",
    a: "No. Nos encargamos de toda la parte técnica. Solo necesitas contarnos qué necesitas y nosotros te guiamos. Al final te entregamos todo con instrucciones claras para el uso diario.",
  },
  {
    q: "¿Cuánto tiempo tarda en estar listo mi sitio web?",
    a: "Sitios de hasta 5 páginas: 3–5 días hábiles. Tiendas online: 5–7 días. Proyectos a medida más complejos: se define en la propuesta. La fecha exacta queda confirmada antes de que pagues.",
  },
  {
    q: "¿Qué incluye el hosting?",
    a: "Dominio (.com, .mx o similar), alojamiento en servidor de alta disponibilidad, certificado SSL (candado de seguridad), backups automáticos diarios y soporte técnico. Todo en el plan mensual.",
  },
  {
    q: "¿Puedo actualizar el contenido de mi sitio yo mismo?",
    a: "Depende del tipo de sitio. Para actualizaciones simples (texto, imágenes, precios) sí podemos darte acceso. Para cambios de diseño o nuevas secciones, lo hacemos nosotros dentro del plan de mantenimiento.",
  },
  {
    q: "¿Qué pasa si necesito algo que no está en la lista de servicios?",
    a: "Lo cotizamos. Si es algo que podemos hacer, te mandamos propuesta en 24h. Somos una agencia de desarrollo a medida, así que evaluamos cada necesidad de forma individual.",
  },
  {
    q: "¿Trabajan solo en México o también en otros países?",
    a: "Trabajamos con negocios en todo LATAM. Las reuniones son por Zoom, los pagos se procesan en USD y el soporte es en español. Hemos atendido clientes en México, Colombia, Argentina y Chile.",
  },
];

export const CHATBOT_RESPONSES: Record<string, string> = {
  web:
    "Para desarrollo web trabajamos con:\n\n🌐 **Landing pages y sitios corporativos**\n🛒 **Tiendas online con pagos integrados**\n📱 **Sitios con diseño personalizado** — en 3–7 días\n\nTodos incluyen hosting el primer mes y SEO básico. ¿Me cuentas qué tipo de proyecto tienes en mente?",
  hosting:
    "Ofrecemos hosting con mantenimiento mensual:\n\n🖥️ **Dominio + SSL + backups automáticos**\n🛠️ **Actualizaciones de contenido incluidas**\n💬 **Soporte técnico en español**\n\n¿Ya tienes sitio web o lo desarrollaríamos desde cero?",
  precio:
    "Cada proyecto es diferente, por eso cotizamos de forma personalizada y gratuita 👇\n\n📋 Cuéntanos qué necesitas y te mandamos una propuesta con alcance, tiempo de entrega y precio fijo — sin letra chica.\n\n¿Te gustaría agendar una llamada de 30 min sin costo?",
  tiempo:
    "Nuestros tiempos de entrega por escrito:\n\n• Sitio de hasta 5 páginas: **3–5 días hábiles**\n• Tienda online: **5–7 días hábiles**\n• Chatbot / integración IA: **3–4 días hábiles**\n• Proyecto a medida: se define en propuesta\n\n¿Tienes alguna fecha límite?",
  ia:
    "Implementamos IA en negocios de cualquier tamaño:\n\n🤖 **Chatbot de atención** — WhatsApp, Instagram, Web\n📝 **Generación de contenido** — posts, emails, descripciones\n⚙️ **Automatización de procesos** — flujos de trabajo sin código\n\n¿Para qué área lo necesitas? Te hacemos una cotización gratuita.",
  default:
    "Hola 👋 Somos AXON — desarrollamos sitios web, damos hosting y construimos soluciones digitales a medida.\n\n¿En qué te puedo ayudar?\n\n💬 Necesito un sitio web\n🖥️ Busco hosting para mi web actual\n🤖 Quiero integrar IA en mi negocio\n⚙️ Tengo un proyecto a medida",
};
