"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { HeroSection } from "@/components/sections/HeroSection";
import { TickerSection, StatsSection } from "@/components/sections/TickerSection";
import { TechStackSection } from "@/components/sections/TechStackSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { DemosSection } from "@/components/sections/DemosSection";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { ProcessSection, CasesSection } from "@/components/sections/ProcessSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ChatbotDemo } from "@/components/sections/ChatbotDemo";
import { FAQSection } from "@/components/sections/FAQSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { ContactSection } from "@/components/sections/ContactSection";


export default function Home() {
  useScrollReveal();

  return (
    <>
      <HeroSection />
      <TickerSection />
      <StatsSection />
      <TechStackSection />
      <ServicesSection />
      <DemosSection />
      <WhyUsSection />
      <ProcessSection />
      <CasesSection />
      <TestimonialsSection />
      <ChatbotDemo />
      <FAQSection />
      <PricingSection />
      <ContactSection />
    </>
  );
}
