import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT } from "@/lib/knowledge";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    const { messages }: { messages: Message[] } = await req.json();

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 });
    }

    // Historial previo (todo menos el último mensaje)
    const history = messages.slice(0, -1).map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const chat = ai.chats.create({
      model: "gemini-2.0-flash-lite",
      config: { systemInstruction: SYSTEM_PROMPT },
      history,
    });

    const lastMessage = messages[messages.length - 1].content;
    const response = await chat.sendMessage({ message: lastMessage });

    return NextResponse.json({ message: response.text });
  } catch (error: any) {
    console.error("Chat API error:", error);
    const isQuota = error?.message?.includes("RESOURCE_EXHAUSTED") || error?.status === 429;
    if (isQuota) {
      return NextResponse.json(
        { error: "Límite de peticiones alcanzado. Intenta en unos segundos." },
        { status: 429 }
      );
    }
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
