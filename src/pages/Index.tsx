import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutMUNSection } from "@/components/AboutMUNSection";
import { AboutOrdaMUNSection } from "@/components/AboutOrdaMUNSection";
import { CommitteesSection } from "@/components/CommitteesSection";
import { RegistrationSection } from "@/components/RegistrationSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutMUNSection />
      <AboutOrdaMUNSection />
      <CommitteesSection />
      <RegistrationSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
