import { motion } from "motion/react";
import { Play, ArrowRight, MousePointer } from "lucide-react";

interface HeroSectionProps {
  onExploreShowroom: () => void;
  castleImage: string;
}

export default function HeroSection({ onExploreShowroom, castleImage }: HeroSectionProps) {
  const stats = [
    { value: "120+", label: "Реализованных проектов" },
    { value: "5", label: "Лет в индустрии 3D визуализации" },
    { value: "98%", label: "Клиентов возвращаются с проектами" },
    { value: "0.1%", label: "Уровень качества в каждой детали" }
  ];

  const handleScrollDown = () => {
    const nextElem = document.getElementById("services");
    if (nextElem) {
      const offset = 80;
      window.scrollTo({
        top: nextElem.getBoundingClientRect().top + window.pageYOffset - offset,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen bg-black flex flex-col justify-between pt-24 pb-8 overflow-hidden z-10">
      {/* Background glow effects */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gold-main/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Vertical 'SCROLL DOWN' label for desktop */}
      <div className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col items-center gap-4 z-20">
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-gray-500 origin-center -rotate-90 select-none translate-y-8">
          Scroll Down
        </span>
        <div className="w-[1px] h-20 bg-linear-to-b from-gray-500 to-transparent animate-pulse mt-8"></div>
      </div>

      {/* Main hero grid content */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto w-full z-10">
        {/* Left column: Text */}
        <div className="lg:col-span-5 flex flex-col text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-4"
          >
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-gold-accent border-b border-gold-main/20 pb-1 inline-block">
              АРХИТЕКТУРА. ИНТЕРЬЕРЫ. 3D МОДЕЛИ.
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight mb-6"
          >
            ПРЕМИАЛЬНАЯ <br />
            <span className="text-gold-accent">3D ВИЗУАЛИЗАЦИЯ</span> <br />И МОДЕЛИРОВАНИЕ
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-400 text-sm sm:text-base leading-relaxed mb-8 max-w-lg"
          >
            Мы создаем абсолютно фотореалистичные визуализации и 3D модели высочайшей детализации, которые с первого взгляда продают ваши идеи и вдохновляют на безупречную реализацию.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap items-center gap-6"
          >
            <a
              href="#contact"
              className="px-8 py-4 rounded-full bg-linear-to-r from-gold-main to-gold-accent hover:from-gold-accent hover:to-gold-main text-black font-header text-sm font-semibold uppercase tracking-wider transition-all duration-300 transform hover:scale-105 shadow-xl shadow-gold-main/10 flex items-center gap-3"
            >
              <span>Заказать проект</span>
              <ArrowRight size={16} />
            </a>

            <button
              onClick={onExploreShowroom}
              className="group flex items-center gap-3 text-white hover:text-gold-accent transition-colors py-3"
            >
              <span className="p-3 rounded-full border border-white/20 bg-white/5 group-hover:border-gold-main group-hover:bg-gold-main/15 transition-all duration-300">
                <Play size={14} className="fill-white group-hover:fill-gold-accent" />
              </span>
              <span className="font-header text-xs uppercase tracking-widest font-semibold">Смотреть шоурум</span>
            </button>
          </motion.div>
        </div>

        {/* Right column: Image showcase */}
        <div className="lg:col-span-7 relative flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative w-full aspect-16/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/90 group"
          >
            <img
              src={castleImage}
              alt="Elite 3D Visual Castle"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
              referrerPolicy="no-referrer"
            />
            {/* Dark overlay framing */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

            {/* Quick action card at bottom-right of image */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              onClick={onExploreShowroom}
              className="absolute bottom-6 right-6 max-w-xs p-4 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 hover:border-gold-main/40 transition-colors shadow-xl cursor-pointer z-20 flex items-center gap-4 group/card"
            >
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/10 shrink-0 border border-white/15">
                <img
                  src={castleImage}
                  alt="Thumbnail"
                  className="w-full h-full object-cover brightness-95"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-left font-sans">
                <div className="text-[11px] font-mono uppercase tracking-wider text-gold-accent">3D Интерактив</div>
                <div className="text-xs font-semibold text-white mt-0.5 group-hover/card:text-gold-accent transition-colors">Выбор материалов в реальом времени</div>
                <div className="flex items-center gap-1.5 text-[10px] text-gray-400 mt-1">
                  <span>Открыть</span>
                  <MousePointer size={10} className="animate-bounce" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom stats row */}
      <div className="w-full border-t border-white/10 bg-black/60 backdrop-blur-xs py-8 mt-12 z-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="flex flex-col items-center md:items-start text-center md:text-left"
            >
              <span className="font-mono text-3xl sm:text-4xl font-bold text-gold-accent tracking-tight">
                {stat.value}
              </span>
              <span className="font-header text-[11px] sm:text-xs text-gray-500 tracking-wider uppercase mt-2">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
