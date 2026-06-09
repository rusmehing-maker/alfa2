import React from "react";
import { Sparkles, Database, Menu, X, Rocket } from "lucide-react";

interface HeaderProps {
  onOpenCrm: () => void;
  onOpenAi: () => void;
  crmCount: number;
}

export default function Header({ onOpenCrm, onOpenAi, crmCount }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      id="app-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/90 backdrop-blur-md border-b border-white/10 py-4 shadow-lg shadow-black/80"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <span className="font-display text-2xl font-bold tracking-widest text-white group-hover:text-gold-accent transition-colors">
            3dvisual<span className="text-gold-accent">AP</span>
          </span>
          <span className="h-2 w-2 rounded-full bg-gold-main animate-pulse"></span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#projects"
            onClick={(e) => handleLinkClick(e, "projects")}
            className="font-header text-sm tracking-wider text-gray-400 hover:text-white transition-colors"
          >
            Проекты
          </a>
          <a
            href="#services"
            onClick={(e) => handleLinkClick(e, "services")}
            className="font-header text-sm tracking-wider text-gray-400 hover:text-white transition-colors"
          >
            Услуги
          </a>
          <a
            href="#process"
            onClick={(e) => handleLinkClick(e, "process")}
            className="font-header text-sm tracking-wider text-gray-400 hover:text-white transition-colors"
          >
            Процесс
          </a>
          <a
            href="#showroom"
            onClick={(e) => handleLinkClick(e, "showroom")}
            className="font-header text-sm tracking-wider text-gray-400 hover:text-white transition-colors"
          >
            Шоурум
          </a>
          <a
            href="#calculator"
            onClick={(e) => handleLinkClick(e, "calculator")}
            className="font-header text-sm tracking-wider text-gray-400 hover:text-white transition-colors"
          >
            Калькулятор
          </a>
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, "contact")}
            className="font-header text-sm tracking-wider text-gray-400 hover:text-white transition-colors"
          >
            Контакты
          </a>
        </nav>

        {/* Action Controls */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            id="btn-ai-consult"
            onClick={onOpenAi}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-gold-main/30 bg-gold-main/5 text-gold-accent hover:bg-gold-main/20 text-xs font-header uppercase tracking-wider transition-all hover:scale-105 duration-300"
          >
            <Sparkles size={14} className="animate-pulse" />
            ИИ-Консультант
          </button>

          <button
            id="btn-crm-panel"
            onClick={onOpenCrm}
            className="relative flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white text-xs font-header uppercase tracking-wider transition-all"
          >
            <Database size={14} />
            <span>CRM Панель</span>
            {crmCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gold-main text-black font-bold font-mono text-[10px] w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                {crmCount}
              </span>
            )}
          </button>

          <a
            id="cta-order-render"
            href="#contact"
            onClick={(e) => handleLinkClick(e, "contact")}
            className="px-6 py-2 rounded-full bg-linear-to-r from-gold-main to-gold-accent hover:from-gold-accent hover:to-gold-main text-black text-xs font-header font-semibold uppercase tracking-wider transition-all shadow-lg hover:shadow-gold-main/20 hover:scale-105 duration-300 flex items-center gap-2"
          >
            <span>Заказать визуализацию</span>
            <Rocket size={13} />
          </a>
        </div>

        {/* Mobile controls bar */}
        <div className="flex lg:hidden items-center gap-3">
          <button
            onClick={onOpenAi}
            className="p-2 rounded-full bg-gold-main/10 text-gold-accent border border-gold-main/20"
            title="ИИ-Консультант"
          >
            <Sparkles size={16} />
          </button>
          <button
            onClick={onOpenCrm}
            className="p-2 rounded-full bg-white/5 text-white border border-white/10 relative"
            title="CRM Панель"
          >
            <Database size={16} />
            {crmCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gold-main text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {crmCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white hover:text-gold-accent transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-lg border-b border-white/10 py-6 px-6 flex flex-col gap-4 animate-fadeIn duration-200">
          <a
            href="#projects"
            onClick={(e) => handleLinkClick(e, "projects")}
            className="font-header text-lg tracking-wider text-gray-300 py-2 border-b border-white/5"
          >
            Проекты
          </a>
          <a
            href="#services"
            onClick={(e) => handleLinkClick(e, "services")}
            className="font-header text-lg tracking-wider text-gray-300 py-2 border-b border-white/5"
          >
            Услуги
          </a>
          <a
            href="#process"
            onClick={(e) => handleLinkClick(e, "process")}
            className="font-header text-lg tracking-wider text-gray-300 py-2 border-b border-white/5"
          >
            Процесс
          </a>
          <a
            href="#showroom"
            onClick={(e) => handleLinkClick(e, "showroom")}
            className="font-header text-lg tracking-wider text-gray-300 py-2 border-b border-white/5"
          >
            Шоурум
          </a>
          <a
            href="#calculator"
            onClick={(e) => handleLinkClick(e, "calculator")}
            className="font-header text-lg tracking-wider text-gray-300 py-2 border-b border-white/5"
          >
            Калькулятор
          </a>
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, "contact")}
            className="font-header text-lg tracking-wider text-gray-300 py-2 border-b border-white/5"
          >
            Контакты
          </a>

          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, "contact")}
            className="mt-4 px-6 py-3 rounded-full bg-gold-main hover:bg-gold-accent text-black text-center font-header text-sm font-semibold uppercase tracking-wider transition-colors"
          >
            Заказать визуализацию
          </a>
        </div>
      )}
    </header>
  );
}
