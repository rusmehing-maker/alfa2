import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, Clock, FileText, ArrowRight, Activity } from "lucide-react";
import { PROCESS_STEPS } from "../data";

export default function ProcessSection() {
  const [activeStep, setActiveStep] = React.useState(0);

  const stepDetails = [
    {
      deliverables: ["Согласованное детальное ТЗ", "Индивидуальное коммерческое предложение", "Подписанный договор"],
      clientAction: "Предоставить DWG-чертежи, планы, высоты и референсы ожидаемой стилистики.",
      duration: "1-2 рабочих дня",
      completeness: "20%"
    },
    {
      deliverables: ["Мудборд с текстурными палитрами", "Фронтальные эскизы ракурсов камер", "Схема расстановки мебели"],
      clientAction: "Утвердить ракурсы съемки (камеры) и общую концепцию отделки.",
      duration: "2-3 рабочих дня",
      completeness: "40%"
    },
    {
      deliverables: ["Точная трехмерная сцена (clay-render)", "Базовое распределение крупных объемов", "Геометрия ландшафта"],
      clientAction: "Внести первые корректировки по расположению объектов и геометрии.",
      duration: "3-5 рабочих дней",
      completeness: "60%"
    },
    {
      deliverables: ["Цветные превью-рендеры в низком качестве", "Расстановка света и отражения металлов", "Партикулярные эффекты"],
      clientAction: "Утвердить материалы отделки, декор, флористику и световые решения.",
      duration: "4-6 рабочих дней",
      completeness: "80%"
    },
    {
      deliverables: ["Финальные PBR-рендеры в разрешении 4К / 8К", "Панорамные панорамы 360° (при заказе)", "Цветокоррекция DaVinci"],
      clientAction: "Подписать акт выполненных работ, получить ссылку на облачное хранилище.",
      duration: "2 рабочих дня",
      completeness: "100%"
    }
  ];

  return (
    <section id="process" className="relative py-24 bg-neutral-950/80 border-t border-b border-white/5 overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gold-main/2 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono text-gold-accent uppercase tracking-[0.3em] block mb-3">
            ПРОЦЕСС РАБОТЫ
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            ПРОЗРАЧНОСТЬ НА КАЖДОМ ЭТАПЕ
          </h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto leading-relaxed">
            Мы не работаем вслепую. Каждая фаза визуализации проходит строгий двусторонний этап согласования, исключая ошибки и гарантируя безупречный результат.
          </p>
        </div>

        {/* Horizontal Timeline Steps Row */}
        <div className="relative flex flex-col md:flex-row justify-between items-center gap-6 mb-16 px-4">
          
          {/* Horizontal Line connector (Desktop only) */}
          <div className="hidden md:block absolute top-[50%] left-8 right-8 h-[1px] bg-zinc-800 z-0"></div>
          {/* Active progress color filling line */}
          <div 
            className="hidden md:block absolute top-[50%] left-8 h-[1.5px] bg-gold-main/40 transition-all duration-500 z-0"
            style={{ width: `${(activeStep / (PROCESS_STEPS.length - 1)) * 90}%` }}
          />

          {PROCESS_STEPS.map((step, idx) => {
            const isActive = activeStep === idx;
            const isCompleted = idx < activeStep;

            return (
              <button
                key={step.step}
                onClick={() => setActiveStep(idx)}
                className="relative z-10 flex flex-col items-center flex-1 focus:outline-hidden"
              >
                {/* Visual Circle */}
                <span className={`w-12 h-12 rounded-full border flex items-center justify-center font-mono text-sm font-bold transition-all ${
                  isActive 
                    ? "bg-gold-main border-gold-main text-black scale-110 shadow-lg shadow-gold-main/20 font-bold"
                    : isCompleted
                    ? "bg-black border-gold-main text-gold-accent"
                    : "bg-zinc-950 border-zinc-800 text-gray-500 hover:border-gray-500 hover:text-white"
                }`}>
                  {isCompleted ? <CheckCircle size={18} /> : step.step}
                </span>

                {/* Step Subtitle */}
                <span className={`font-header text-xs uppercase tracking-wider mt-4 transition-all ${
                  isActive ? "text-white font-bold" : "text-gray-500"
                }`}>
                  {step.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Detailed Step Display Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-zinc-950/60 border border-white/5 rounded-2xl p-6 lg:p-10 text-left"
          >
            {/* Left Col inside card: Step overview */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-2 font-mono text-xs text-gold-accent uppercase tracking-widest font-bold">
                  <Activity size={14} className="stroke-[2.5]" />
                  <span>Шаг {PROCESS_STEPS[activeStep].step} из 05</span>
                </div>
                <h3 className="font-display text-2xl lg:text-3xl font-extrabold text-white mb-4">
                  {PROCESS_STEPS[activeStep].title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {PROCESS_STEPS[activeStep].description}
                </p>
              </div>

              {/* Stats / Duration row */}
              <div className="flex gap-8 border-t border-white/5 pt-6">
                <div>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Длительностьфазы:</span>
                  <div className="flex items-center gap-1.5 text-white font-semibold text-sm mt-1">
                    <Clock size={14} className="text-gold-accent" />
                    <span>{stepDetails[activeStep].duration}</span>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Общая готовность:</span>
                  <div className="flex items-center gap-1.5 text-white font-semibold text-sm mt-1">
                    <span className="text-gold-accent text-base font-bold">{stepDetails[activeStep].completeness}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col inside card: Deliverables / Client input requirement */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6 lg:border-l lg:border-white/5 lg:pl-10">
              
              {/* Deliverables lists */}
              <div className="space-y-4">
                <span className="text-[10px] uppercase font-mono tracking-wider text-gold-accent block font-bold">
                  Результат этапа (deliverables):
                </span>
                <ul className="space-y-2.5">
                  {stepDetails[activeStep].deliverables.map((item, idx) => (
                    <li key={idx} className="flex gap-2.5 items-start text-xs text-gray-300">
                      <FileText size={14} className="text-gold-main/60 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Customer Actions required */}
              <div className="p-4 rounded-xl bg-black border border-white/5 space-y-2">
                <span className="text-[10px] uppercase font-mono tracking-wider text-rose-400 block font-bold">
                  Что требуется от вас:
                </span>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {stepDetails[activeStep].clientAction}
                </p>
              </div>

              {/* Next step teaser */}
              {activeStep < PROCESS_STEPS.length - 1 && (
                <button
                  onClick={() => setActiveStep(activeStep + 1)}
                  className="group flex items-center gap-2 text-xs text-gold-accent font-header uppercase tracking-wider font-semibold self-start hover:text-white transition-colors"
                >
                  <span>Перейти к этапу "{PROCESS_STEPS[activeStep + 1].title}"</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
                </button>
              )}
            </div>

          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
