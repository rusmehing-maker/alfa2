import React from "react";
import { Calculator, CheckSquare, Plus, Mail, ArrowRight, ClipboardCheck } from "lucide-react";

interface QuoteCalculatorProps {
  onPreFillContact: (calcDetails: {
    projectType: string;
    description: string;
    budget: string;
  }) => void;
}

export default function QuoteCalculator({ onPreFillContact }: QuoteCalculatorProps) {
  const [projectType, setProjectType] = React.useState("exterior");
  const [area, setArea] = React.useState(150); // sqm or objects
  const [qualityGrade, setQualityGrade] = React.useState("standard"); // draft, standard, ultra
  const [isUrgent, setIsUrgent] = React.useState(false);
  const [include360Panorama, setInclude360Panorama] = React.useState(false);

  // Computed results
  const calculateCost = () => {
    let basePricePerSqm = 15; // default interior
    if (projectType === "exterior") basePricePerSqm = 20;
    else if (projectType === "modeling") basePricePerSqm = 150; // price per model/object
    else if (projectType === "animation") basePricePerSqm = 40; // price per second

    let scaleFactor = area;
    let cost = basePricePerSqm * scaleFactor;

    // Quality modifier
    if (qualityGrade === "draft") cost *= 0.8;
    if (qualityGrade === "ultra") cost *= 1.35;

    // Panorama addon
    if (include360Panorama) {
      cost += projectType === "exterior" ? 400 : 250;
    }

    // Urgency modifier
    if (isUrgent) cost *= 1.25;

    return Math.round(cost);
  };

  const getUnit = () => {
    if (projectType === "modeling") return "моделей/объектов";
    if (projectType === "animation") return "секунд видео";
    return "кв. метров (площадь)";
  };

  const getMaxRange = () => {
    if (projectType === "modeling") return 20;
    if (projectType === "animation") return 120;
    return 1000;
  };

  const getMinRange = () => {
    if (projectType === "modeling") return 1;
    if (projectType === "animation") return 5;
    return 20;
  };

  // Keep area in bounds when switching types
  React.useEffect(() => {
    const min = getMinRange();
    const max = getMaxRange();
    if (area < min) setArea(min);
    if (area > max) setArea(max);
  }, [projectType]);

  const totalCost = calculateCost();

  const handlePreFill = () => {
    const typeLabel = 
      projectType === "exterior" ? "Визуализация Экстерьера" :
      projectType === "interior" ? "Визуализация Интерьера" :
      projectType === "modeling" ? "Сложное 3D Моделирование" : "Анимация & Прогулки (Walkthrough)";

    const detailsStr = `Калькулятор: Проект "${typeLabel}", Объём: ${area} ${getUnit()}, Качество: ${qualityGrade}, Срочно: ${isUrgent ? "Да" : "Нет"}, Панорама 360°: ${include360Panorama ? "Да" : "Нет"}.`;

    onPreFillContact({
      projectType: typeLabel,
      description: detailsStr,
      budget: `$ ${totalCost}`,
    });

    // Scroll to contact form
    const elem = document.getElementById("contact");
    if (elem) {
      window.scrollTo({
        top: elem.getBoundingClientRect().top + window.pageYOffset - 80,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="calculator" className="relative py-24 bg-black border-t border-b border-white/5 overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-gold-main/3 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono text-gold-accent uppercase tracking-[0.3em] block mb-3">
            ИНСТРУМЕНТ ОЦЕНКИ
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            КАЛЬКУЛЯТОР СТОИМОСТИ ПРОЕКТА
          </h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto leading-relaxed">
            Получите прозрачный, предварительный расчет сметы на 3D визуализацию в течение 10 секунд! Настройте формат и объем под ваши требования.
          </p>
        </div>

        {/* Dynamic Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-5xl mx-auto bg-zinc-950/50 border border-white/5 rounded-2xl p-6 lg:p-10">
          
          {/* Left panel: Controls (Size 7) */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* 1. Project Type Selector */}
            <div className="space-y-3 font-sans">
              <span className="text-[10px] uppercase font-mono tracking-wider text-gray-500 block font-semibold">
                1. Тип проекта / Услуги:
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setProjectType("exterior")}
                  className={`p-3.5 rounded-lg border text-xs font-semibold uppercase tracking-wider transition-all text-center ${
                    projectType === "exterior" ? "bg-gold-main/10 border-gold-main text-gold-accent" : "bg-black border-white/5 text-gray-400 hover:border-white/15"
                  }`}
                >
                  Экстерьер
                </button>
                <button
                  onClick={() => setProjectType("interior")}
                  className={`p-3.5 rounded-lg border text-xs font-semibold uppercase tracking-wider transition-all text-center ${
                    projectType === "interior" ? "bg-gold-main/10 border-gold-main text-gold-accent" : "bg-black border-white/5 text-gray-400 hover:border-white/15"
                  }`}
                >
                  Интерьер
                </button>
                <button
                  onClick={() => setProjectType("modeling")}
                  className={`p-3.5 rounded-lg border text-xs font-semibold uppercase tracking-wider transition-all text-center ${
                    projectType === "modeling" ? "bg-gold-main/10 border-gold-main text-gold-accent" : "bg-black border-white/5 text-gray-400 hover:border-white/15"
                  }`}
                >
                  3D Модель
                </button>
                <button
                  onClick={() => setProjectType("animation")}
                  className={`p-3.5 rounded-lg border text-xs font-semibold uppercase tracking-wider transition-all text-center ${
                    projectType === "animation" ? "bg-gold-main/10 border-gold-main text-gold-accent" : "bg-black border-white/5 text-gray-400 hover:border-white/15"
                  }`}
                >
                  Анимация (сек)
                </button>
              </div>
            </div>

            {/* 2. Volume slider */}
            <div className="space-y-4 font-sans">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="uppercase text-gray-500 font-semibold">2. Выберите объём работы:</span>
                <span className="text-gold-accent font-bold text-sm">{area} {getUnit().split(" ")[0]}</span>
              </div>
              
              <input
                type="range"
                min={getMinRange()}
                max={getMaxRange()}
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-gold-main"
              />

              <div className="flex justify-between items-center text-[10px] font-mono text-gray-600">
                <span>Мин: {getMinRange()}</span>
                <span>Макс: {getMaxRange()}</span>
              </div>
            </div>

            {/* 3. Render Quality Grade options */}
            <div className="space-y-3 font-sans">
              <span className="text-[10px] uppercase font-mono tracking-wider text-gray-500 block font-semibold">
                3. Категория / Детализация:
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setQualityGrade("draft")}
                  className={`p-3 rounded-lg border text-[10px] font-bold tracking-wider uppercase transition-all ${
                    qualityGrade === "draft" ? "border-gold-main/50 bg-gold-main/10 text-gold-accent" : "border-white/5 bg-black text-gray-500 hover:border-white/10"
                  }`}
                >
                  Draft (Быстрый)
                </button>
                <button
                  onClick={() => setQualityGrade("standard")}
                  className={`p-3 rounded-lg border text-[10px] font-bold tracking-wider uppercase transition-all ${
                    qualityGrade === "standard" ? "border-gold-main/50 bg-gold-main/10 text-gold-accent" : "border-white/5 bg-black text-gray-500 hover:border-white/10"
                  }`}
                >
                  Standard (PBR)
                </button>
                <button
                  onClick={() => setQualityGrade("ultra")}
                  className={`p-3 rounded-lg border text-[10px] font-bold tracking-wider uppercase transition-all ${
                    qualityGrade === "ultra" ? "border-gold-main/50 bg-gold-main/10 text-gold-accent" : "border-white/5 bg-black text-gray-500 hover:border-white/10"
                  }`}
                >
                  Ultra Cinematic
                </button>
              </div>
            </div>

            {/* 4. Addons */}
            <div className="pt-4 border-t border-white/5 flex flex-wrap gap-4 font-sans text-xs">
              <label className="flex items-center gap-3 cursor-pointer select-none text-gray-400 hover:text-white">
                <input
                  type="checkbox"
                  checked={isUrgent}
                  onChange={(e) => setIsUrgent(e.target.checked)}
                  className="rounded border-zinc-800 bg-black text-gold-main focus:ring-1 focus:ring-gold-main w-4 h-4 cursor-pointer"
                />
                <span className="font-medium">Срочный проект (сдача х2 быстрее)</span>
              </label>

              {(projectType === "interior" || projectType === "exterior") && (
                <label className="flex items-center gap-3 cursor-pointer select-none text-gray-400 hover:text-white">
                  <input
                    type="checkbox"
                    checked={include360Panorama}
                    onChange={(e) => setInclude360Panorama(e.target.checked)}
                    className="rounded border-zinc-800 bg-black text-gold-main focus:ring-1 focus:ring-gold-main w-4 h-4 cursor-pointer"
                  />
                  <span className="font-medium">Экспорт панорамы 360° для VR</span>
                </label>
              )}
            </div>

          </div>

          {/* Right panel: Cost Summary Card (Size 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 lg:p-8 rounded-xl bg-black border border-white/10 text-center relative overflow-hidden h-full min-h-[350px]">
            {/* Visual shine inside summary */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold-main/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="p-3.5 bg-gold-main/5 rounded-full border border-gold-main/20">
                  <Calculator className="text-gold-accent" size={24} />
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-gray-500 block">Предварительный расчёт:</span>
                <div className="text-4xl lg:text-5xl font-mono font-extrabold text-gold-accent mt-3 select-all">
                  ${totalCost.toLocaleString()}
                </div>
                <span className="text-[10px] text-gray-500 font-mono mt-1 block">*Окончательная смета после бриф ТЗ</span>
              </div>

              {/* Itemized list */}
              <div className="space-y-2.5 pt-4 text-xs font-mono border-t border-white/5 text-left text-gray-400">
                <div className="flex justify-between">
                  <span>Объём:</span>
                  <span className="text-white">{area} {projectType === "modeling" ? "мод." : projectType === "animation" ? "сек." : "кв.м"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Уровень рендера:</span>
                  <span className="text-white uppercase">{qualityGrade}</span>
                </div>
                <div className="flex justify-between">
                  <span>Коэффициент срочности:</span>
                  <span className="text-white">{isUrgent ? "+25%" : "0% (Стандарт)"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Дополнительные опции:</span>
                  <span className="text-white">{include360Panorama ? "VR Панорама" : "Нет"}</span>
                </div>
              </div>
            </div>

            {/* Form injection action button */}
            <button
              onClick={handlePreFill}
              className="w-full mt-8 py-4 rounded-xl bg-linear-to-r from-gold-main to-gold-accent hover:from-gold-accent hover:to-gold-main text-black font-header text-xs uppercase font-bold tracking-widest transition-all shadow-lg hover:shadow-gold-main/20 flex items-center justify-center gap-2"
            >
              <span>Экспортировать в форму</span>
              <ArrowRight size={13} />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
