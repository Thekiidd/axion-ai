"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { COMPANY_CONFIG, SUGGESTED_QUESTIONS, QUICK_ACTIONS } from "@/lib/knowledge";
import type { Message } from "@/app/api/chat/route";

function TypingIndicator() {
  return (
    <div className="flex gap-1.5 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-2 h-2 rounded-full bg-[#6A6A82] dot-bounce"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  );
}

function MessageBubble({ msg, isNew }: { msg: Message; isNew?: boolean }) {
  const isUser = msg.role === "user";

  const formatContent = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#F0EEE8] font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-white/10 px-1.5 py-0.5 rounded text-[#C8FF00] text-[13px] font-mono">$1</code>')
      .replace(/\n/g, "<br />");
  };

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"} ${isNew ? "animate-fade-up" : ""}`}>
      {/* Avatar */}
      {!isUser && (
        <div className="w-8 h-8 rounded-xl bg-[#C8FF00] flex items-center justify-center text-[#05050A] font-bold text-sm flex-shrink-0 mt-1">
          A
        </div>
      )}

      <div className={`max-w-[75%] ${isUser ? "items-end" : "items-start"} flex flex-col gap-1`}>
        {!isUser && (
          <span className="text-[11px] text-[#6A6A82] font-medium ml-1">
            {COMPANY_CONFIG.assistantName}
          </span>
        )}
        <div
          className={`px-4 py-3 rounded-2xl text-sm leading-[1.65] ${
            isUser
              ? "bg-[#C8FF00] text-[#05050A] font-medium rounded-tr-sm"
              : "bg-[#111120] border border-white/[0.07] text-[rgba(240,238,232,0.9)] rounded-tl-sm"
          }`}
          dangerouslySetInnerHTML={{ __html: formatContent(msg.content) }}
        />
      </div>
    </div>
  );
}

export default function AssistantChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newMessageIndex, setNewMessageIndex] = useState<number | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: text.trim() };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);
    setError(null);
    setNewMessageIndex(updatedMessages.length - 1);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error ?? "Error al conectar con el asistente");

      const assistantMsg: Message = { role: "assistant", content: data.message };
      setMessages((prev) => {
        const newMsgs = [...prev, assistantMsg];
        setNewMessageIndex(newMsgs.length - 1);
        return newMsgs;
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  }, [messages, isLoading]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="flex flex-col h-screen bg-[#05050A]">
      {/* ── TOPBAR ── */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/[0.07] bg-[#0D0D18] flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#C8FF00] flex items-center justify-center text-[#05050A] font-bold text-base">
            A
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[15px]">{COMPANY_CONFIG.assistantName}</span>
              <span className="text-[10px] bg-[rgba(200,255,0,0.1)] border border-[rgba(200,255,0,0.2)] text-[#C8FF00] px-2 py-0.5 rounded-full font-semibold">
                IA
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8FF00] animate-[blink_2s_infinite]" />
              <span className="text-[11px] text-[#6A6A82]">Activa · {COMPANY_CONFIG.name}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => { setMessages([]); setError(null); }}
            className="text-xs text-[#6A6A82] hover:text-[#F0EEE8] transition-colors px-3 py-1.5 rounded-lg hover:bg-white/[0.05] border border-transparent hover:border-white/[0.07]"
          >
            Nueva conversación
          </button>
          <div className="text-xs text-[#6A6A82] px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.07]">
            {COMPANY_CONFIG.name}
          </div>
        </div>
      </header>

      {/* ── MESSAGES AREA ── */}
      <div className="flex-1 overflow-y-auto chat-scroll px-4 py-6">
        <div className="max-w-3xl mx-auto flex flex-col gap-5">

          {/* Empty state */}
          {isEmpty && (
            <div className="animate-fade-up">
              {/* Welcome */}
              <div className="text-center mb-10 pt-8">
                <div className="w-16 h-16 rounded-2xl bg-[#C8FF00] flex items-center justify-center text-[#05050A] text-3xl font-bold mx-auto mb-4">
                  A
                </div>
                <h1 className="text-2xl font-semibold mb-2">
                  Hola, soy {COMPANY_CONFIG.assistantName} 👋
                </h1>
                <p className="text-[#6A6A82] text-sm max-w-sm mx-auto leading-relaxed">
                  Tu asistente interna de IA. Estoy entrenada con la información de{" "}
                  <strong className="text-[#F0EEE8]">{COMPANY_CONFIG.name}</strong>. ¿En qué te ayudo hoy?
                </p>
              </div>

              {/* Quick actions */}
              <div className="mb-8">
                <p className="text-[11px] text-[#6A6A82] uppercase tracking-[0.1em] font-semibold mb-3 px-1">
                  Acciones rápidas
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {QUICK_ACTIONS.map((action) => (
                    <button
                      key={action.label}
                      onClick={() => sendMessage(action.prompt)}
                      className="flex items-center gap-3 p-3.5 rounded-xl bg-[#111120] border border-white/[0.07] hover:border-[rgba(200,255,0,0.25)] hover:bg-[rgba(200,255,0,0.04)] transition-all text-left group"
                    >
                      <span className="text-xl">{action.icon}</span>
                      <div>
                        <div className="text-sm font-medium group-hover:text-[#C8FF00] transition-colors">
                          {action.label}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Suggested questions */}
              <div>
                <p className="text-[11px] text-[#6A6A82] uppercase tracking-[0.1em] font-semibold mb-3 px-1">
                  Preguntas frecuentes
                </p>
                <div className="flex flex-col gap-2">
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="flex items-center justify-between p-3 rounded-xl bg-[#111120] border border-white/[0.07] hover:border-[rgba(200,255,0,0.25)] hover:bg-[rgba(200,255,0,0.04)] transition-all text-left text-sm text-[rgba(240,238,232,0.7)] hover:text-[#F0EEE8] group"
                    >
                      <span>{q}</span>
                      <span className="text-[#6A6A82] group-hover:text-[#C8FF00] transition-colors text-base ml-3">→</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Messages */}
          {messages.map((msg, i) => (
            <MessageBubble key={i} msg={msg} isNew={i === newMessageIndex} />
          ))}

          {/* Typing */}
          {isLoading && (
            <div className="flex gap-3 animate-fade-up">
              <div className="w-8 h-8 rounded-xl bg-[#C8FF00] flex items-center justify-center text-[#05050A] font-bold text-sm flex-shrink-0 mt-1">
                A
              </div>
              <div className="bg-[#111120] border border-white/[0.07] rounded-2xl rounded-tl-sm">
                <TypingIndicator />
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-sm text-red-400 animate-fade-up">
              <strong>Error:</strong> {error}
              {error.includes("API") && (
                <p className="mt-1 text-xs opacity-70">
                  Asegúrate de configurar tu ANTHROPIC_API_KEY en el archivo .env.local
                </p>
              )}
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* ── INPUT AREA ── */}
      <div className="px-4 pb-4 pt-3 border-t border-white/[0.07] bg-[#0D0D18] flex-shrink-0">
        <div className="max-w-3xl mx-auto">
          {/* Context chips */}
          {!isEmpty && messages.length < 4 && (
            <div className="flex gap-2 mb-3 flex-wrap">
              {SUGGESTED_QUESTIONS.slice(0, 3).map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-xs text-[#6A6A82] border border-white/[0.07] rounded-full px-3 py-1 hover:border-[rgba(200,255,0,0.3)] hover:text-[#C8FF00] transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          <div className="flex gap-3 items-end">
            <div className="flex-1 bg-[#111120] border border-white/[0.07] rounded-2xl focus-within:border-[rgba(200,255,0,0.35)] transition-colors px-4 py-3">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Escribe tu pregunta... (Enter para enviar, Shift+Enter para nueva línea)"
                rows={1}
                className="w-full bg-transparent text-sm text-[#F0EEE8] placeholder-[#6A6A82] outline-none resize-none leading-relaxed"
                style={{ minHeight: "24px", maxHeight: "120px" }}
                onInput={(e) => {
                  const t = e.currentTarget;
                  t.style.height = "auto";
                  t.style.height = Math.min(t.scrollHeight, 120) + "px";
                }}
              />
            </div>
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isLoading}
              className="w-11 h-11 rounded-xl bg-[#C8FF00] text-[#05050A] flex items-center justify-center font-bold text-lg transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(200,255,0,0.3)] disabled:opacity-30 disabled:scale-100 disabled:shadow-none flex-shrink-0"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-[#05050A]/30 border-t-[#05050A] rounded-full animate-spin" />
              ) : "↑"}
            </button>
          </div>

          <p className="text-[11px] text-[#6A6A82]/60 mt-2 text-center">
            Axia está entrenada con la información interna de {COMPANY_CONFIG.name} · Demo por AXON AI
          </p>
        </div>
      </div>
    </div>
  );
}
