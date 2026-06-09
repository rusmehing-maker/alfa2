import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, Eye, Layers, Maximize2, Sparkles } from "lucide-react";
import { PORTFOLIO } from "../data";

interface PortfolioSectionProps {
  onOpenConsultant: () => void;
}

export default function PortfolioSection({ onOpenConsultant }: PortfolioSectionProps) {
  const [selectedCategory, setSelectedCategory] = React.useState("Все");
  const [activeProjectIdx, setActiveProjectIdx] = React.useState(0);
  const [lightingMode, setLightingMode] = React.useState<"day" | "sunset" | "night">("sunset");
  const [customMaterial, setCustomMaterial] = React.useState<string>("");

  const categories = ["Все", "Exterior Visualization", "Interior Visualization"];

  const filteredProjects = selectedCategory === "Все"
    ? PORTFOLIO
    : PORTFOLIO.filter((p) => p.category === selectedCategory);

  const activeProject = filteredProjects[activeProjectIdx] || filteredProjects[0] || PORTFOLIO[0];

  // Sync default material when project shifts
  React.useEffect(() => {
    if (activeProject) {
      setCustomMaterial(activeProject.materialsPossible[0]);
    }
  }, [activeProject]);

  const handleNext = () => {
    setActiveProjectIdx((prev) => (prev + 1) % filteredProjects.length);
  };

  const handlePrev = () => {
    setActiveProjectIdx((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  // Simulated material details helper
  const getMaterialDescription = (material: string) => {
    switch (material) {
      case "Лиственница": return "Высокая влагостойкость, благородная древесная текстура золотистого оттенка.";
      case "Кедр": return "Элитная порода с антисептическими свойствами и насыщенной коричнево-красной гаммой.";
      case "Золотая сталь": return "Полированные пластины нержавеющего металла с титаново-золотым напылением для хай-тек акцентов.";
      case "Маренная сосна": return "Темные глубокие древесные волокна для придания зданию винтажного, сурового шарма.";
      case "Микроцемент": return "Бесшовная текстура шлифованного серого бетона матовой шелковистой фактуры.";
      case "Кортен-сталь": return "Элегантный слой бархатистой ржавчины, создающий контраст с дикой природой.";
      case "Травертин": return "Натуральный пористый известняк теплых песочных тонов для классических фасадов.";
      case "Sahara Noir": return "Превосходный черный лакированный мрамор с геометрическими бело-золотыми прожилками.";
      default: return "Материал премиум класса с физически корректным светоотражением (PBR).";
    }
  };

  return (
    <section id="projects" className="relative py-24 bg-neutral-950/80 border-t border-b border-white/5 overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gold-main/2 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div className="text-left">
            <span className="text-xs font-mono text-gold-accent uppercase tracking-[0.3em] block mb-3">
              ПОРТФОЛИО
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              ИСКУССТВО В КАЖДОМ КАДРЕ
            </h2>
          </div>

          {/* Filtering Tabs */}
          <div className="flex flex-wrap items-center gap-2 border-b border-white/5 pb-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setActiveProjectIdx(0);
                }}
                className={`px-4 py-2 rounded-full text-xs font-header uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? "bg-gold-main text-black font-semibold"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {cat === "Все" ? "Все работы" : cat.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Project Stage Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left Column: Huge render display config */}
          <div className="lg:col-span-8 flex flex-col justify-start">
            <div className="relative aspect-16/10 rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeProject.id}_${lightingMode}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0"
                >
                  <img
                    src={activeProject.image}
                    alt={activeProject.title}
                    className="w-full h-full object-cover transition-transform duration-700 pointer-events-none"
                    referrerPolicy="no-referrer"
                  />
                  {/* Real-time filters representing lighting conditions */}
                  {lightingMode === "sunset" && (
                    <div className="absolute inset-0 bg-orange-600/10 mix-blend-color-burn pointer-events-none"></div>
                  )}
                  {lightingMode === "night" && (
                    <div className="absolute inset-0 bg-blue-950/30 mix-blend-multiply pointer-events-none"></div>
                  )}
                  {lightingMode === "night" && (
                    <div className="absolute inset-0 bg-amber-500/5 mix-blend-color-dodge pointer-events-none"></div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Day/Night/Sunset toggle badge left top */}
              <div className="absolute top-4 left-4 p-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 flex items-center gap-1 z-20">
                <button
                  onClick={() => setLightingMode("day")}
                  className={`px-3 py-1 rounded-full text-[10px] font-mono tracking-wider transition-all ${
                    lightingMode === "day" ? "bg-white text-black font-semibold" : "text-gray-400 hover:text-white"
                  }`}
                >
                  День
                </button>
                <button
                  onClick={() => setLightingMode("sunset")}
                  className={`px-3 py-1 rounded-full text-[10px] font-mono tracking-wider transition-all ${
                    lightingMode === "sunset" ? "bg-amber-600 text-white font-semibold" : "text-gray-400 hover:text-white"
                  }`}
                >
                  Закат
                </button>
                <button
                  onClick={() => setLightingMode("night")}
                  className={`px-3 py-1 rounded-full text-[10px] font-mono tracking-wider transition-all ${
                    lightingMode === "night" ? "bg-blue-900 text-white font-semibold" : "text-gray-400 hover:text-white"
                  }`}
                >
                  Ночь
                </button>
              </div>

              {/* Overlay with active camera specs */}
              <div className="absolute bottom-4 left-4 flex gap-4 text-[10px] font-mono tracking-wider text-gray-400 backdrop-blur-md bg-black/60 px-3 py-1.5 rounded-lg border border-white/5">
                <span>Камера: F/4.0</span>
                <span>ISO: 100</span>
                <span>Фокус: 35mm</span>
                <span>Рендер: Octane 2026</span>
              </div>

              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none"></div>
            </div>

            {/* Slider navigations */}
            <div className="flex justify-between items-center mt-6">
              <div className="flex gap-2">
                <button
                  onClick={handlePrev}
                  className="p-3 rounded-full border border-white/10 bg-black/40 hover:border-gold-main/50 hover:bg-gold-main/10 text-white hover:text-gold-accent transition-all"
                >
                  <ArrowLeft size={16} />
                </button>
                <button
                  onClick={handleNext}
                  className="p-3 rounded-full border border-white/10 bg-black/40 hover:border-gold-main/50 hover:bg-gold-main/10 text-white hover:text-gold-accent transition-all"
                >
                  <ArrowRight size={16} />
                </button>
              </div>

              {/* Slider Dots */}
              <div className="flex gap-2">
                {filteredProjects.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveProjectIdx(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeProjectIdx === idx ? "w-8 bg-gold-main" : "w-2 bg-neutral-700"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Project configuration info specs */}
          <div className="lg:col-span-4 flex flex-col justify-between text-left h-full">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono text-gold-accent uppercase tracking-widest block mb-2 font-semibold">
                  {activeProject.category}
                </span>
                <h3 className="font-display text-2xl font-bold tracking-tight text-white mb-4">
                  {activeProject.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {activeProject.description}
                </p>
              </div>

              {/* Dynamic properties card */}
              <div className="p-5 rounded-xl bg-zinc-950 border border-white/5 space-y-4">
                <div className="flex justify-between items-center text-xs pb-3 border-b border-white/5 font-mono">
                  <span className="text-gray-500">Год реализации:</span>
                  <span className="text-white font-bold">{activeProject.year}</span>
                </div>
                {activeProject.sqm && (
                  <div className="flex justify-between items-center text-xs pb-3 border-b border-white/5 font-mono">
                    <span className="text-gray-500">Общая площадь:</span>
                    <span className="text-gold-accent font-bold">{activeProject.sqm} кв.м</span>
                  </div>
                )}

                {/* Materials Selection Configurator */}
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-gray-500 block mb-2.5">
                    Кастомизация материалов (Выбрано: {customMaterial}):
                  </span>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {activeProject.materialsPossible.map((mat) => (
                      <button
                        key={mat}
                        onClick={() => setCustomMaterial(mat)}
                        className={`px-3 py-1.5 rounded-md text-[10px] uppercase tracking-wider font-header font-bold transition-all border ${
                          customMaterial === mat
                            ? "bg-gold-main/20 text-gold-accent border-gold-main"
                            : "bg-black text-gray-400 border-white/10 hover:border-gray-500"
                        }`}
                      >
                        {mat}
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-gray-500 leading-relaxed bg-black/40 p-2.5 rounded border border-white/5 italic">
                    {getMaterialDescription(customMaterial)}
                  </p>
                </div>
              </div>
            </div>

            {/* Action buttons list */}
            <div className="space-y-3 mt-8">
              <a
                href="#contact"
                className="w-full py-4 rounded-xl bg-gold-main hover:bg-gold-accent text-black font-header text-xs uppercase font-bold tracking-widest transition-colors flex items-center justify-center gap-2 shadow-lg shadow-gold-main/5"
              >
                <span>Запросить расчет проекта</span>
                <Eye size={14} />
              </a>

              <button
                onClick={onOpenConsultant}
                className="w-full py-3 rounded-xl border border-white/10 hover:border-gold-main/30 bg-white/5 text-xs text-white hover:text-gold-accent font-header uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <Sparkles size={11} className="text-gold-accent animate-pulse" />
                <span>Спросить ИИ о стиле этого проекта</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
