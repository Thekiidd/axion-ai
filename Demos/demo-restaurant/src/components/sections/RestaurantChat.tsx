"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { RESTAURANT_CONFIG, MENU_HIGHLIGHTS, QUICK_ACTIONS, SUGGESTED_QUESTIONS } from "@/lib/restaurant";
import type { Message } from "@/app/api/reservas/route";

function TypingIndicator() {
  return (
    <div className="flex gap-1.5 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <span key={i} className="w-2 h-2 rounded-full bg-[#7A6F65] dot-bounce"
          style={{ animationDelay: `${i * 0.2}s` }} />
      ))}
    </div>
  );
}

function MessageBubble({ msg, isNew }: { msg: Message; isNew?: boolean }) {
  const isUser = msg.role === "user";
  const fmt = (t: string) => t
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#F5F0EA] font-semibold">$1</strong>')
    .replace(/\n/g, "<br />");

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"} ${isNew ? "animate-fade-up" : ""}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-[#FF9500] flex items-center justify-center text-[#0C0A08] font-bold text-sm flex-shrink-0 mt-1">
          🌮
        </div>
      )}
      <div className={`max-w-[78%] flex flex-col gap-1 ${isUser ? "items-end" : "items-start"}`}>
        {!isUser && <span className="text-[11px] text-[#7A6F65] font-medium ml-1">{RESTAURANT_CONFIG.name}</span>}
        <div className={`px-4 py-3 rounded-2xl text-sm leading-[1.65] ${
          isUser
            ? "bg-[#FF9500] text-[#0C0A08] font-medium rounded-tr-sm"
            : "bg-[#1E1A16] border border-white/[0.06] text-[rgba(245,240,234,0.9)] rounded-tl-sm"
        }`} dangerouslySetInnerHTML={{ __html: fmt(msg.content) }} />
      </div>
    </div>
  );
}

export default function RestaurantDemo() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newIdx, setNewIdx] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"chat" | "menu">("chat");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isLoading]);

  const send = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;
    const userMsg: Message = { role: "user", content: text.trim() };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setIsLoading(true);
    setError(null);
    setNewIdx(updated.length - 1);
    setActiveTab("chat");

    try {
      const res = await fetch("/api/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error");
      setMessages(prev => {
        const n = [...prev, { role: "assistant" as const, content: data.message }];
        setNewIdx(n.length - 1);
        return n;
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  }, [messages, isLoading]);

  const isEmpty = messages.length === 0;

  return (
    <div className="flex flex-col h-screen bg-[#0C0A08] md:flex-row">

      {/* ── SIDEBAR (desktop) ── */}
      <aside className="hidden md:flex flex-col w-72 bg-[#161410] border-r border-white/[0.06] flex-shrink-0">
        {/* Restaurant header */}
        <div className="p-6 border-b border-white/[0.06]">
          <div className="w-12 h-12 rounded-2xl bg-[#FF9500] flex items-center justify-center text-2xl mb-4">
            🌮
          </div>
          <h1 className="font-display text-xl text-[#F5F0EA] mb-1">{RESTAURANT_CONFIG.name}</h1>
          <p className="text-sm text-[#7A6F65] italic">{RESTAURANT_CONFIG.tagline}</p>
          <div className="mt-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF9500] animate-[blink_2s_infinite]" />
            <span className="text-xs text-[#7A6F65]">Bot de reservas activo</span>
          </div>
        </div>

        {/* Info */}
        <div className="p-5 border-b border-white/[0.06]">
          <h3 className="text-[10px] uppercase tracking-[0.12em] text-[#7A6F65] font-semibold mb-3">Información</h3>
          <div className="flex flex-col gap-2.5">
            <div className="flex items-start gap-2 text-xs text-[rgba(245,240,234,0.6)]">
              <span className="text-[#FF9500] mt-0.5">📍</span>
              {RESTAURANT_CONFIG.address}
            </div>
            <div className="flex items-center gap-2 text-xs text-[rgba(245,240,234,0.6)]">
              <span className="text-[#FF9500]">📞</span>
              {RESTAURANT_CONFIG.phone}
            </div>
            <div className="flex items-center gap-2 text-xs text-[rgba(245,240,234,0.6)]">
              <span className="text-[#FF9500]">📱</span>
              {RESTAURANT_CONFIG.instagram}
            </div>
          </div>
        </div>

        {/* Hours */}
        <div className="p-5 border-b border-white/[0.06]">
          <h3 className="text-[10px] uppercase tracking-[0.12em] text-[#7A6F65] font-semibold mb-3">Horarios</h3>
          {Object.entries(RESTAURANT_CONFIG.hours).map(([day, hours]) => (
            <div key={day} className="flex justify-between text-xs mb-2">
              <span className="text-[#7A6F65]">{day}</span>
              <span className="text-[rgba(245,240,234,0.7)]">{hours}</span>
            </div>
          ))}
        </div>

        {/* Quick reserve */}
        <div className="p-5 mt-auto">
          <button
            onClick={() => send("Quiero hacer una reserva para cenar esta noche")}
            className="w-full bg-[#FF9500] text-[#0C0A08] font-bold text-sm py-3 rounded-xl hover:bg-[#FFa520] transition-colors"
          >
            📅 Reservar mesa →
          </button>
        </div>
      </aside>

      {/* ── MAIN AREA ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Mobile header */}
        <header className="flex items-center justify-between px-4 py-3.5 border-b border-white/[0.06] bg-[#161410] flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FF9500] flex items-center justify-center text-lg">🌮</div>
            <div>
              <div className="font-display text-base text-[#F5F0EA]">{RESTAURANT_CONFIG.name}</div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF9500] animate-[blink_2s_infinite]" />
                <span className="text-[11px] text-[#7A6F65]">Reservas en línea</span>
              </div>
            </div>
          </div>

          {/* Mobile tabs */}
          <div className="flex md:hidden gap-1 bg-[#0C0A08] rounded-lg p-1">
            {(["chat", "menu"] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all capitalize ${
                  activeTab === tab ? "bg-[#FF9500] text-[#0C0A08]" : "text-[#7A6F65]"
                }`}>
                {tab === "chat" ? "💬 Chat" : "🍽️ Menú"}
              </button>
            ))}
          </div>
        </header>

        {/* Mobile menu tab */}
        {activeTab === "menu" && (
          <div className="flex-1 overflow-y-auto chat-scroll p-4 md:hidden">
            <h2 className="font-display text-2xl text-[#F5F0EA] mb-5">Nuestra carta</h2>
            {MENU_HIGHLIGHTS.map(cat => (
              <div key={cat.category} className="mb-6">
                <h3 className="text-[11px] uppercase tracking-[0.1em] text-[#FF9500] font-bold mb-3">{cat.category}</h3>
                {cat.items.map(item => {
                  const [name, price] = item.split(" — ");
                  return (
                    <div key={item} className="flex justify-between items-center py-2.5 border-b border-white/[0.04]">
                      <span className="text-sm text-[rgba(245,240,234,0.8)]">{name ?? item}</span>
                      {price && <span className="text-sm text-[#FF9500] font-medium">{price}</span>}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}

        {/* Chat area */}
        {(activeTab === "chat") && (
          <>
            <div className="flex-1 overflow-y-auto chat-scroll px-4 py-5">
              <div className="max-w-2xl mx-auto flex flex-col gap-4">

                {isEmpty && (
                  <div className="animate-fade-up">
                    {/* Welcome card */}
                    <div className="bg-[#1E1A16] border border-[rgba(255,149,0,0.15)] rounded-2xl p-6 mb-6 text-center">
                      <div className="text-4xl mb-3">🌮</div>
                      <h2 className="font-display text-xl text-[#F5F0EA] mb-1">¡Bienvenido a {RESTAURANT_CONFIG.name}!</h2>
                      <p className="text-sm text-[#7A6F65] italic mb-4">{RESTAURANT_CONFIG.tagline}</p>
                      <p className="text-sm text-[rgba(245,240,234,0.6)] leading-relaxed">
                        Puedo ayudarte a hacer una reserva, consultar el menú o resolver tus dudas.
                      </p>
                    </div>

                    {/* Quick actions */}
                    <div className="grid grid-cols-2 gap-2 mb-5">
                      {QUICK_ACTIONS.map(a => (
                        <button key={a.label} onClick={() => send(a.prompt)}
                          className="flex items-center gap-2.5 p-3.5 rounded-xl bg-[#1E1A16] border border-white/[0.06] hover:border-[rgba(255,149,0,0.3)] hover:bg-[rgba(255,149,0,0.05)] transition-all text-left group">
                          <span className="text-xl">{a.icon}</span>
                          <span className="text-sm font-medium group-hover:text-[#FF9500] transition-colors">{a.label}</span>
                        </button>
                      ))}
                    </div>

                    {/* Suggested */}
                    <p className="text-[11px] text-[#7A6F65] uppercase tracking-[0.1em] font-semibold mb-2 px-1">Preguntas frecuentes</p>
                    {SUGGESTED_QUESTIONS.map(q => (
                      <button key={q} onClick={() => send(q)}
                        className="w-full text-left flex items-center justify-between p-3 mb-2 rounded-xl bg-[#1E1A16] border border-white/[0.06] hover:border-[rgba(255,149,0,0.3)] text-sm text-[rgba(245,240,234,0.65)] hover:text-[#F5F0EA] transition-all group">
                        <span>{q}</span>
                        <span className="text-[#7A6F65] group-hover:text-[#FF9500] transition-colors">→</span>
                      </button>
                    ))}
                  </div>
                )}

                {messages.map((msg, i) => (
                  <MessageBubble key={i} msg={msg} isNew={i === newIdx} />
                ))}

                {isLoading && (
                  <div className="flex gap-3 animate-fade-up">
                    <div className="w-8 h-8 rounded-full bg-[#FF9500] flex items-center justify-center text-sm flex-shrink-0 mt-1">🌮</div>
                    <div className="bg-[#1E1A16] border border-white/[0.06] rounded-2xl rounded-tl-sm">
                      <TypingIndicator />
                    </div>
                  </div>
                )}

                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-sm text-red-400 animate-fade-up">
                    {error.includes("API") ? "⚠️ Configura ANTHROPIC_API_KEY en .env.local para activar el bot." : error}
                  </div>
                )}

                <div ref={bottomRef} />
              </div>
            </div>

            {/* Input */}
            <div className="px-4 pb-4 pt-3 border-t border-white/[0.06] bg-[#161410] flex-shrink-0">
              <div className="max-w-2xl mx-auto flex gap-2 items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && send(input)}
                  placeholder="Escribe aquí... (ej: Quiero reservar para 4 personas mañana)"
                  className="flex-1 bg-[#1E1A16] border border-white/[0.07] rounded-xl px-4 py-3 text-sm text-[#F5F0EA] placeholder-[#7A6F65] outline-none focus:border-[rgba(255,149,0,0.4)] transition-colors"
                />
                <button
                  onClick={() => send(input)}
                  disabled={!input.trim() || isLoading}
                  className="w-11 h-11 rounded-xl bg-[#FF9500] text-[#0C0A08] flex items-center justify-center font-bold text-lg transition-all hover:scale-105 disabled:opacity-30 disabled:scale-100 flex-shrink-0"
                >
                  {isLoading
                    ? <div className="w-4 h-4 border-2 border-[#0C0A08]/30 border-t-[#0C0A08] rounded-full animate-spin" />
                    : "↑"}
                </button>
              </div>
              <p className="text-[11px] text-[#7A6F65]/50 mt-2 text-center">
                Demo de bot de reservas · Powered by AXON AI
              </p>
            </div>
          </>
        )}
      </div>

      {/* ── MENU SIDEBAR (desktop) ── */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#161410] border-l border-white/[0.06] flex-shrink-0 overflow-y-auto">
        <div className="p-5 border-b border-white/[0.06]">
          <h2 className="font-display text-lg text-[#F5F0EA]">Nuestra carta</h2>
          <p className="text-xs text-[#7A6F65] mt-0.5">Precios en MXN · IVA incluido</p>
        </div>
        <div className="p-4 flex flex-col gap-5">
          {MENU_HIGHLIGHTS.map(cat => (
            <div key={cat.category}>
              <h3 className="text-[10px] uppercase tracking-[0.1em] text-[#FF9500] font-bold mb-2.5">{cat.category}</h3>
              {cat.items.map(item => {
                const parts = item.split(" — ");
                const name = parts[0];
                const price = parts[1];
                return (
                  <div key={item} className="flex justify-between items-center py-2 border-b border-white/[0.04]">
                    <span className="text-xs text-[rgba(245,240,234,0.65)]">{name}</span>
                    {price && <span className="text-xs text-[#FF9500] font-medium ml-2 flex-shrink-0">{price}</span>}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
