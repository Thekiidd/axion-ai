import type { Metadata } from "next";
import "@/styles/globals.css";
import { Cursor } from "@/components/ui/Cursor";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "AXON AI — Soluciones de Inteligencia Artificial para tu negocio",
  description:
    "Creamos webs, chatbots, encuestas inteligentes y automatizaciones para restaurantes, coaches, tiendas y clínicas. Entrega en 3–7 días.",
  keywords: "agencia IA, chatbot restaurante, web con IA, automatización LATAM, soluciones inteligencia artificial México",
  openGraph: {
    title: "AXON AI",
    description: "Soluciones de IA para tu negocio. Entrega en 3–7 días.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Instrument+Serif:ital@0;1&family=Figtree:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#05050A] text-[#F0EEE8] font-sans antialiased">
        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{
            className: "rounded-none border border-white/[0.07] bg-[#05050A] text-[#F0EEE8] font-sans",
            style: { borderRadius: "0px" }
          }}
        />
        <Cursor />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
