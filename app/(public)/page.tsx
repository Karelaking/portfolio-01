import { HeroSection } from "@/components/hero-section";
import TechStackSection from "@/components/sections/tech-stack";
import ServicesSection from "@/components/sections/services";
import TeamSection from "@/components/sections/team";
import CtaSection from "@/components/sections/cta";
import FaqSection from "@/components/sections/faq";

export default function Home() {
  return (
    <div className="flex min-h-screen h-full flex-col items-center justify-center">
      <HeroSection />
      <TechStackSection />
      <ServicesSection />
      <TeamSection />
      <CtaSection />
      <FaqSection />
    </div>
  );
}
