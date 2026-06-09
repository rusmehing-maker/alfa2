import React from "react";
import { ArrowUp, Instagram, Send, Disc, ShieldCheck } from "lucide-react";

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="relative bg-black border-t border-white/5 py-16 font-sans">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 text-left">
        
        {/* Col 1: Brand & Desc */}
        <div className="md:col-span-4 space-y-4">
          <a href="#" className="flex items-center gap-2 group">
            <span className="font-display text-2xl font-bold tracking-widest text-white group-hover:text-gold-accent transition-colors">
              3dvisual<span className="text-gold-accent">AP</span>
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-gold-main"></span>
          </a>
          <p className="text-gray-500 text-xs leading-relaxed max-w-sm">
            Абсолютная точность, фотореалистичная глубина кадра и безупречные светотехнические сценарии. Студия премиальной 3D визуализации и архитектурного рендеринга.
          </p>
        </div>

        {/* Col 2: Services Quicklinks */}
        <div className="md:col-span-2.5 space-y-4 text-xs font-mono">
          <span className="text-[10px] uppercase text-gray-500 font-bold tracking-widest block">Наши Направления</span>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#services" className="hover:text-gold-accent transition-colors">Экстерьерная визуализация</a></li>
            <li><a href="#services" className="hover:text-gold-accent transition-colors">Интерьерный рендеринг</a></li>
            <li><a href="#services" className="hover:text-gold-accent transition-colors">Высокополигональное моделирование</a></li>
            <li><a href="#services" className="hover:text-gold-accent transition-colors">Анимационный облет камер</a></li>
          </ul>
        </div>

        {/* Col 3: Navigation Quicklinks */}
        <div className="md:col-span-2.5 space-y-4 text-xs font-mono">
          <span className="text-[10px] uppercase text-gray-500 font-bold tracking-widest block">Студия</span>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#projects" className="hover:text-gold-accent transition-colors">Авторские Проекты</a></li>
            <li><a href="#process" className="hover:text-gold-accent transition-colors">Рабочий процесс (Workflow)</a></li>
            <li><a href="#showroom" className="hover:text-gold-accent transition-colors">Кастомизатор Showroom</a></li>
            <li><a href="#calculator" className="hover:text-gold-accent transition-colors">Сметный калькулятор</a></li>
          </ul>
        </div>

        {/* Col 4: Address coordinates & Scroll To Top */}
        <div className="md:col-span-3 space-y-4 text-xs font-mono flex flex-col justify-between h-full">
          <div>
            <span className="text-[10px] uppercase text-gray-500 font-bold tracking-widest block">Координаты</span>
            <p className="text-gray-400 mt-2">
              Москва, Пресненская набережная 12, Башня Федерация Восток. <br />
              <span className="text-gray-600 block mt-1 font-mono text-[9px]">GCP Node: 55.7485° N, 37.5356° E</span>
            </p>
          </div>

          {/* Social icons row */}
          <div className="flex gap-4 items-center">
            <a href="#" className="p-2 border border-white/5 bg-zinc-950 hover:border-gold-main/20 text-gray-500 hover:text-gold-accent rounded-lg transition-all" title="Instagram">
              <Instagram size={14} />
            </a>
            <a href="#" className="p-2 border border-white/5 bg-zinc-950 hover:border-gold-main/20 text-gray-500 hover:text-gold-accent rounded-lg transition-all" title="Telegram">
              <Send size={14} />
            </a>
            <a href="#" className="p-2 border border-white/5 bg-zinc-950 hover:border-gold-main/20 text-gray-500 hover:text-gold-accent rounded-lg transition-all" title="Discord">
              <Disc size={14} />
            </a>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 border-t border-white/5 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-gray-500 font-mono">
        <div className="flex items-center gap-2">
          <ShieldCheck size={12} className="text-gold-main" />
          <span>&copy; {new Date().getFullYear()} 3dvisualAP. Все права защищены.</span>
        </div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-gold-accent">Политика конфиденциальности</a>
          <span>&bull;</span>
          <a href="#" className="hover:text-gold-accent">Условия предоставления услуг</a>
        </div>
        <button
          onClick={handleScrollToTop}
          className="p-2 border border-white/10 hover:border-gold-main hover:bg-gold-main/10 text-white hover:text-gold-accent rounded-full transition-all focus:outline-hidden"
          title="Наверх"
        >
          <ArrowUp size={14} />
        </button>
      </div>
    </footer>
  );
}
