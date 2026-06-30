import { HeroSection } from "@/components/hero-section";
import TechStackSection from "@/components/sections/tech-stack";
import ServicesSection from "@/components/sections/services";
import TeamSection from "@/components/sections/team";
import CtaSection from "@/components/sections/cta";
import FaqSection from "@/components/sections/faq";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Senior Software Engineer and Web Developer portfolio showcasing premium interactive web applications, offline sync protocols, and backend microservices.",
  openGraph: {
    title: "Alex Gonzalez | Senior Software Engineer & Designer",
    description: "Senior Software Engineer and Web Developer portfolio showcasing premium interactive web applications.",
    type: "website",
  }
};

import { JsonLd, getPersonSchema } from "@/components/json-ld";

export default function Home() {
  return (
    <div className="flex min-h-screen h-full flex-col items-center justify-center">
      <JsonLd schema={getPersonSchema()} />
      <HeroSection />
      <TechStackSection />
      <ServicesSection />
      <TeamSection />
      <CtaSection />
      <FaqSection />
    </div>
  );
}
