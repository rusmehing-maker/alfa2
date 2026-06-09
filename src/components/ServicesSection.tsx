import { motion } from "motion/react";
import { Building, Home, Box, Video, ArrowUpRight, Clock, Tag } from "lucide-react";
import { SERVICES } from "../data";

interface ServicesSectionProps {
  onSelectService: (serviceTitle: string) => void;
  exteriorImage: string;
  interiorImage: string;
}

export default function ServicesSection({ onSelectService, exteriorImage, interiorImage }: ServicesSectionProps) {
  // Map icons dynamically
  const getIcon = (id: string) => {
    switch (id) {
      case "exterior":
        return <Building className="text-gold-accent" size={24} />;
      case "interior":
        return <Home className="text-gold-accent" size={24} />;
      case "modeling":
        return <Box className="text-gold-accent" size={24} />;
      case "animation":
        return <Video className="text-gold-accent" size={24} />;
      default:
        return <Building className="text-gold-accent" size={24} />;
    }
  };

  // Map background premium images for card back or previews
  const getImg = (id: string) => {
    switch (id) {
      case "exterior":
        return exteriorImage;
      case "interior":
        return interiorImage;
      case "modeling":
        return "https://picsum.photos/seed/modeling/800/600";
      case "animation":
        return "https://picsum.photos/seed/animation/800/600";
      default:
        return "https://picsum.photos/seed/service/800/600";
    }
  };

  return (
    <section id="services" className="relative py-24 bg-black overflow-hidden border-t border-white/5">
      {/* Visual luxury ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-gold-main/2 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-end">
          <div className="lg:col-span-7 text-left">
            <span className="text-xs font-mono text-gold-accent uppercase tracking-[0.3em] block mb-3">
              ЧТО МЫ ДЕЛАЕМ
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              СОЗДАЁМ ВИЗУАЛЬНЫЕ РЕШЕНИЯ <br />
              ДЛЯ АРХИТЕКТУРЫ И ДИЗАЙНА
            </h2>
          </div>
          <div className="lg:col-span-5 text-left lg:text-right">
            <p className="text-gray-400 text-sm max-w-md ml-auto leading-relaxed">
              Объединяем высокое художественное видение, безупречную техническую точность и фанатичное внимание к мельчайшим деталям, чтобы каждый проект выглядел безупречно на любом носителе.
            </p>
          </div>
        </div>

        {/* Services Grid (4 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ y: -8 }}
              className="group relative h-[480px] rounded-2xl overflow-hidden border border-white/10 bg-zinc-950/40 flex flex-col justify-between p-6 transition-all duration-300"
            >
              {/* Card background preview zoomable */}
              <div className="absolute inset-0 z-0">
                <img
                  src={getImg(service.id)}
                  alt={service.title}
                  className="w-full h-full object-cover opacity-20 group-hover:scale-110 group-hover:opacity-30 transition-all duration-700 pointer-events-none"
                  referrerPolicy="no-referrer"
                />
                {/* Edge gradients inside */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent"></div>
              </div>

              {/* Top part: Icon & Header */}
              <div className="relative z-10">
                <div className="flex justify-between items-start">
                  <div className="p-3.5 rounded-xl bg-black/80 border border-white/10 group-hover:border-gold-main/30 group-hover:bg-gold-main/5 transition-all">
                    {getIcon(service.id)}
                  </div>
                  <motion.div
                    whileHover={{ rotate: 45 }}
                    onClick={() => onSelectService(service.title)}
                    className="p-2 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gold-main/10 text-white cursor-pointer"
                  >
                    <ArrowUpRight size={18} className="text-gold-accent" />
                  </motion.div>
                </div>

                <h3 className="font-display text-xl font-bold tracking-wide text-white mt-8 group-hover:text-gold-accent transition-colors">
                  {service.title}
                </h3>
              </div>

              {/* Middle/Bottom: Description, Price, Period */}
              <div className="relative z-10 font-sans text-left mt-auto">
                <p className="text-gray-400 text-xs leading-relaxed mb-6 group-hover:text-gray-200 transition-colors">
                  {service.description}
                </p>

                {/* Specs row */}
                <div className="space-y-2 pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2 text-xs text-gold-accent font-semibold">
                    <Tag size={12} className="text-gold-main/60" />
                    <span>{service.price}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-gray-500 font-mono">
                    <Clock size={11} />
                    <span>Срок: {service.timeline}</span>
                  </div>
                </div>

                {/* Submittal CTA on hover */}
                <button
                  onClick={() => onSelectService(service.title)}
                  className="w-full mt-6 py-2.5 rounded-lg border border-white/10 bg-black/60 group-hover:border-gold-main/40 group-hover:bg-gold-main group-hover:text-black font-header text-[10px] font-bold uppercase tracking-wider transition-all duration-300"
                >
                  Обсудить проект
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
