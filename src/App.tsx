import React from "react";
import { AnimatePresence } from "motion/react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import PortfolioSection from "./components/PortfolioSection";
import CustomizerSection from "./components/CustomizerSection";
import ProcessSection from "./components/ProcessSection";
import QuoteCalculator from "./components/QuoteCalculator";
import ContactSection from "./components/ContactSection";
import CrmSection from "./components/CrmSection";
import AiConsultant from "./components/AiConsultant";
import Footer from "./components/Footer";
import { Lead } from "./types";

// Фикс: Импортируем изображения как модули, чтобы Vite корректно обработал и захэшировал их при сборке
import castleImage from "./assets/images/hero_3d_castle_1781009950794.png";
import exteriorModernVillaImage from "./assets/images/exterior_modern_villa_1781009969887.png";
import interiorLuxuryLoftImage from "./assets/images/interior_luxury_loft_1781009986606.png";

export default function App() {
  const [leads, setLeads] = React.useState<Lead[]>([]);
  const [isCrmOpen, setIsCrmOpen] = React.useState(false);
  const [isAiOpen, setIsAiOpen] = React.useState(false);
  
  // Стейт для хранения контекста запроса к ИИ
  const [aiContext, setAiContext] = React.useState<string | null>(null);
  
  // Storage for Quotation Calculator results exported to form
  const [preFilledVals, setPreFilledVals] = React.useState<{
    projectType: string;
    description: string;
    budget: string;
  } | null>(null);

  // Sync leads from Express CRM API
  const syncLeads = async () => {
    try {
      const res = await fetch("/api/leads");
      if (res.ok) {
        const data = await res.json();
        if (data.leads) {
          setLeads(data.leads);
        }
      }
    } catch (err) {
      console.warn("Express leads sync failed (running in offline/demo local state):", err);
    }
  };

  React.useEffect(() => {
    syncLeads();
    // Intermittent polling for fresh submissions
    const interval = setInterval(syncLeads, 15000);
    return () => clearInterval(interval);
  }, []);

  const handlePreFill = (calcDetails: {
    projectType: string;
    description: string;
    budget: string;
  }) => {
    setPreFilledVals(calcDetails);
  };

  // Фикс: Теперь контекст сохраняется в стейт и может быть передан внутрь ИИ-компонента
  const handleOpenAiWithContext = (contextPrompt?: string) => {
    setAiContext(contextPrompt || null);
    setIsAiOpen(true);
  };

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* 1. Header (Navigation & actions toggle indicators) */}
      <Header
        onOpenCrm={() => setIsCrmOpen(true)}
        onOpenAi={() => handleOpenAiWithContext()}
        crmCount={leads.filter((l) => l.status === "Новый").length}
      />

      {/* 2. Hero Screen (Completed with stats) */}
      <HeroSection
        onExploreShowroom={() => {
          const showroomElem = document.getElementById("showroom");
          if (showroomElem) {
            showroomElem.scrollIntoView({ behavior: "smooth" });
          }
        }}
        castleImage={castleImage}
      />

      {/* 3. Services Screen (What we do grid cards) */}
      <ServicesSection
        onSelectService={(serviceTitle) => {
          setPreFilledVals({
            projectType: serviceTitle,
            description: `Здравствуйте! Меня интересует услуга "${serviceTitle}". Хотелось бы обсудить потенциал сотрудничества и рассчитать смету.`,
            budget: ""
          });
          const contactElem = document.getElementById("contact");
          if (contactElem) {
            contactElem.scrollIntoView({ behavior: "smooth" });
          }
        }}
        exteriorImage={exteriorModernVillaImage}
        interiorImage={interiorLuxuryLoftImage}
      />

      {/* 4. Portfolio Showcase Screen (Interactive carousel + materials config) */}
      <PortfolioSection onOpenConsultant={(prompt) => handleOpenAiWithContext(prompt)} />

      {/* 5. Showroom Floor Material Customizer Screen */}
      <CustomizerSection />

      {/* 6. Transparency Process Steps Timeline */}
      <ProcessSection />

      {/* 7. Pricing Estimation Quotation Calculator */}
      <QuoteCalculator onPreFillContact={handlePreFill} />

      {/* 8. CRM Contact Submission Intake form */}
      <ContactSection
        preFilledVals={preFilledVals}
        onLeadSubmitted={syncLeads}
        onOpenAi={() => handleOpenAiWithContext("Пользователь запрашивает помощь из формы контактов.")}
      />

      {/* 9. Elegant Footer area */}
      <Footer />

      {/* Overlays / Slideouts (Handled under AnimatePresence) */}
      <AnimatePresence>
        {isCrmOpen && (
          <CrmSection
            isOpen={isCrmOpen}
            onClose={() => setIsCrmOpen(false)}
            leads={leads}
            onRefreshLeads={syncLeads}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isAiOpen && (
          <AiConsultant
            isOpen={isAiOpen}
            onClose={() => {
              setIsAiOpen(false);
              setAiContext(null); // Очищаем контекст при закрытии
            }}
            initialContext={aiContext} // Пропс для вашего компонента ИИ
          />
        )}
      </AnimatePresence>
    </div>
  );
}
