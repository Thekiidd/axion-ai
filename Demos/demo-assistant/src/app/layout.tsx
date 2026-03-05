import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Axia — Asistente Interno de IA | Demo por AXON AI",
  description: "Demo de asistente interno empresarial con inteligencia artificial. Construido por AXON AI.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Bebas+Neue&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
