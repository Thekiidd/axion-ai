"use client";

import { useState, useRef, useEffect } from "react";
import { CHATBOT_RESPONSES } from "@/lib/constants";

interface Message {
  text: string;
  type: "bot" | "user";
}

const SUGGESTIONS = [
  "Necesito un sitio web",
  "Busco hosting",
  "¿Cuánto cuesta?",
  "Quiero integrar IA",
];

function getResponse(msg: string): string {
  const m = msg.toLowerCase();
  if (m.includes("hosting") || m.includes("mantenimiento") || m.includes("dominio") || m.includes("alojamiento"))
    return CHATBOT_RESPONSES.hosting;
  if (m.includes("ia") || m.includes("inteligencia") || m.includes("chatbot") || m.includes("automatiz"))
    return CHATBOT_RESPONSES.ia;
  if (m.includes("precio") || m.includes("costo") || m.includes("cuánto") || m.includes("cuanto"))
    return CHATBOT_RESPONSES.precio;
  if (m.includes("tiempo") || m.includes("tarda") || m.includes("días") || m.includes("rapido") || m.includes("rápido"))
    return CHATBOT_RESPONSES.tiempo;
  if (m.includes("web") || m.includes("sitio") || m.includes("pagina") || m.includes("página") || m.includes("tienda"))
    return CHATBOT_RESPONSES.web;
  return CHATBOT_RESPONSES.default;
}



function MessageBubble({ msg }: { msg: Message }) {
  return (
    <div
      className={`max-w-[80%] px-[18px] py-3 rounded-[18px] text-sm leading-[1.55] ${msg.type === "bot"
        ? "bg-white/[0.06] border border-white/[0.07] self-start rounded-bl-[4px]"
        : "bg-[#C8FF00] text-[#05050A] font-medium self-end rounded-br-[4px]"
        }`}
      dangerouslySetInnerHTML={{
        __html: msg.text
          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
          .replace(/\n/g, "<br />"),
      }}
    />
  );
}

export function ChatbotDemo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "¡Hola! 👋 Soy el asistente de **Axion Inc**. Estoy aquí para resolver tus dudas sobre cómo podemos ayudar a tu negocio con IA. ¿Qué tipo de negocio tienes?",
      type: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Solo hacer scroll si hay interacción (más del mensaje inicial) o si el bot está escribiendo
    if (messages.length > 1 || typing) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [messages, typing]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { text, type: "user" }]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { text: getResponse(text), type: "bot" }]);
    }, 1200 + Math.random() * 800);
  };

  return (
    <section id="demo" className="px-12 py-[120px] grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
      {/* Columna izquierda — texto descriptivo */}
      <div>
        <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#C8FF00] mb-7 flex items-center gap-2.5 reveal">
          <span className="w-5 h-px bg-[#C8FF00]" />
          Pruébalo ahora
        </p>
        <h2 className="font-display text-[clamp(48px,6vw,84px)] leading-[0.95] tracking-[0.02em] mb-6 reveal">
          Así se ve un<br />
          <span className="text-[#C8FF00]">chatbot</span><br />
          de Axion Inc
        </h2>
        <p className="text-[17px] text-[#6A6A82] leading-[1.75] font-light reveal">
          Esto es exactamente lo que instalaríamos en tu web o WhatsApp.{" "}
          <strong className="text-[#F0EEE8] font-medium">Entrenado con tu información</strong>,
          respondiendo preguntas frecuentes, agendando citas y cerrando ventas.
        </p>
        <p className="text-[13px] text-[#6A6A82] mt-4 reveal">
          💡 Escribe algo o toca una sugerencia →
        </p>
      </div>

      {/* Ventana del chatbot interactivo */}
      <div className="bg-[#0D0D18] border border-white/[0.07] rounded-none overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.5)] reveal">
        {/* Barra superior del chat con avatar */}
        <div className="bg-white/[0.04] px-6 py-4 flex items-center gap-3 border-b border-white/[0.07]">
          <div className="flex gap-[6px]">
            <div className="w-[10px] h-[10px] rounded-none bg-[#ff5f57]" />
            <div className="w-[10px] h-[10px] rounded-none bg-[#febc2e]" />
            <div className="w-[10px] h-[10px] rounded-none bg-[#28c840]" />
          </div>
          <div className="w-8 h-8 rounded-none bg-[#C8FF00] flex items-center justify-center text-sm font-bold text-[#05050A] ml-2">
            A
          </div>
          <div>
            <div className="text-sm font-semibold">Axion Inc Asistente</div>
            <div className="text-[11px] text-[#C8FF00]">● En línea</div>
          </div>
        </div>

        {/* Área de mensajes del chat */}
        <div className="p-6 min-h-[280px] max-h-[280px] overflow-y-auto flex flex-col gap-4">
          {messages.map((msg, i) => (
            <MessageBubble key={i} msg={msg} />
          ))}
          {typing && (
            <div className="bg-white/[0.06] border border-white/[0.07] self-start px-5 py-4 rounded-[18px] rounded-bl-[4px]">
              <div className="flex gap-[5px]">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-[7px] h-[7px] rounded-none bg-[#6A6A82] animate-[dotBounce_1.2s_infinite]"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Sugerencias rápidas de preguntas frecuentes */}
        <div className="flex flex-wrap gap-2 px-5 pb-4">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => sendMessage(s)}
              className="bg-[rgba(200,255,0,0.06)] border border-[rgba(200,255,0,0.15)] text-[#C8FF00] px-[14px] py-[7px] rounded-none text-xs hover:bg-[rgba(200,255,0,0.12)] transition-colors"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Campo de entrada del usuario */}
        <div className="px-5 pb-5 flex gap-3 items-center border-t border-white/[0.07] pt-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            placeholder="Escribe tu pregunta..."
            className="flex-1 bg-white/[0.04] border border-white/[0.07] rounded-none px-[18px] py-[10px] text-sm text-[#F0EEE8] placeholder-[#6A6A82] outline-none focus:border-[rgba(200,255,0,0.35)] transition-colors font-sans"
          />
          <button
            onClick={() => sendMessage(input)}
            className="w-10 h-10 rounded-none bg-[#C8FF00] flex items-center justify-center text-[#05050A] font-bold hover:scale-110 hover:shadow-[0_0_20px_rgba(200,255,0,0.4)] transition-all"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
