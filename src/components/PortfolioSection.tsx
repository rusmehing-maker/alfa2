import React from "react";
import { motion } from "motion/react";

interface PortfolioSectionProps {
  onOpenConsultant: (prompt?: string) => void;
}

type TimeOfDay = "day" | "sunset" | "night";
type Material = "larch" | "cedar" | "steel" | "pine";

export default function PortfolioSection({ onOpenConsultant }: PortfolioSectionProps) {
  const [timeOfDay, setTimeOfDay] = React.useState<TimeOfDay>("day");
  const [material, setMaterial] = React.useState<Material>("larch");
  const [activeTab, setActiveTab] = React.useState<"all" | "exterior" | "interior">("all");

  // ФИКС: Путь ведет напрямую в папку public/images/portfolio/. 
  // Если у вас под каждый материал есть отдельный рендер, можно сделать так: `/images/portfolio/terem_${material}_${timeOfDay}.jpg`
  // Если картинок всего 3 (по времени суток), оставляем зависимость только от времени:
  const currentImage = `/images/portfolio/terem_${timeOfDay}.jpg`;

  const translateMaterial = (mat: Material) => {
    if (mat === "larch") return "Лиственница";
    if (mat === "cedar") return "Кедр";
    if (mat === "steel") return "Золотая сталь";
    return "Мареная сосна";
  };

  const translateTime = (time: TimeOfDay) => {
    if (time === "day") return "День";
    if (time === "sunset") return "Закат";
    return "Ночь";
  };

  return (
    <section id="portfolio" className="py-20 px-6 max-w-7xl mx-auto border-t border-neutral-900">
      {/* Заголовок секции */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="text-gold-accent font-mono text-xs uppercase tracking-widest block mb-2">Портфолио</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-wider text-white">
            Искусство в каждом кадре
          </h2>
        </div>
        
        {/* Фильтры категорий (Все работы, Exterior, Interior) */}
        <div className="flex bg-neutral-950 p-1 rounded-full border border-neutral-900 text-xs font-mono">
          {(["all", "exterior", "interior"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full uppercase tracking-wider transition-all ${
                activeTab === tab
                  ? "bg-gold-main text-black font-semibold shadow-md"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {tab === "all" ? "Все работы" : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Основной интерактивный грид */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* ЛЕВАЯ ЧАСТЬ: Интерактивный интерактивный плеер изображений */}
        <div className="lg:col-span-7 bg-neutral-950 rounded-2xl border border-neutral-900 p-2 overflow-hidden shadow-2xl">
          <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black group">
            
            {/* Оверлей управления внутри картинки */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 pointer-events-auto">
              <span className="text-white text-sm font-medium bg-black/40 backdrop-blur-md px-3 py-1 rounded-md border border-white/10 w-max">
                Ажурный Терем XXI века
              </span>
              
              {/* Переключатель День / Закат / Ночь */}
              <div className="bg-black/60 backdrop-blur-md p-1 rounded-full flex gap-1 border border-neutral-800 text-[11px] font-mono">
                {(["day", "sunset", "night"] as const).map((time) => (
                  <button
                    key={time}
                    onClick={() => setTimeOfDay(time)}
                    className={`px-3 py-1 rounded-full transition-all uppercase ${
                      timeOfDay === time
                        ? "bg-white text-black font-medium"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    {translateTime(time)}
                  </button>
                ))}
              </div>
            </div>

            {/* Сама картинка с красивым плавным исчезновением/появлением при смене стейта */}
            <motion.img
              key={currentImage}
              src={currentImage}
              alt="Ажурный Терем XXI века"
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full h-full object-cover select-none"
              onError={(e) => {
                // Если картинка не найдена в public/, заменяем заглушкой, чтобы экран не был просто черным
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80";
              }}
            />
          </div>
        </div>

        {/* ПРАВАЯ ЧАСТЬ: Описание проекта и кастомизатор */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full lg:pt-4">
          <div>
            <span className="text-gold-accent font-mono text-xs uppercase tracking-widest block mb-1">
              Exterior Visualization
            </span>
            <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              Ажурный Терем XXI века
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed mb-8 font-sans">
              Инновационная деревянная резиденция, объединяющая исконно русские узоры терема с 
              современными тенденциями эко-архитектуры и светового дизайна.
            </p>

            {/* Спецификации проекта */}
            <div className="border-t border-b border-neutral-900 py-4 mb-8 space-y-3 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-neutral-500">Год реализации:</span>
                <span className="text-neutral-200">2026</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Общая площадь:</span>
                <span className="text-neutral-200">450 кв.м</span>
              </div>
            </div>

            {/* Кастомизатор материалов */}
            <div className="mb-8">
              <span className="text-neutral-500 font-mono text-[10px] uppercase tracking-wider block mb-3">
                Кастомизация материалов (Фасад / Кровля):
              </span>
              <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                {(["larch", "cedar", "steel", "pine"] as const).map((mat) => (
                  <button
                    key={mat}
                    onClick={() => setMaterial(mat)}
                    className={`border p-3 rounded text-left uppercase tracking-wider transition-all duration-200 ${
                      material === mat
                        ? "border-gold-accent text-gold-accent bg-gold-dark/10 font-medium"
                        : "border-neutral-900 text-neutral-400 hover:border-neutral-800 hover:text-white bg-transparent"
                    }`}
                  >
                    {translateMaterial(mat)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Интеграция с ИИ-консультантом из App.tsx */}
          <button
            onClick={() => 
              onOpenConsultant(
                `Пользователь изучает проект "Ажурный Терем XXI века". Выбранный материал отделки: ${translateMaterial(material)}, время суток на рендере: ${translateTime(timeOfDay)}.`
              )
            }
            className="w-full mt-4 py-4 rounded-xl border border-gold-main/30 hover:border-gold-main text-gold-accent font-mono text-xs uppercase tracking-widest transition-all duration-300 bg-neutral-950/40 hover:bg-gold-main hover:text-black"
          >
            Обсудить этот проект с ИИ →
          </button>
        </div>

      </div>
    </section>
  );
}
