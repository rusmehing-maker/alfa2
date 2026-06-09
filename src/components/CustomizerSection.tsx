import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { RefreshCw, Check, Lightbulb, Grid, Shuffle } from "lucide-react";

export default function CustomizerSection() {
  const [wallMaterial, setWallMaterial] = React.useState("dark-venetian");
  const [floorMaterial, setFloorMaterial] = React.useState("white-marble");
  const [lightColor, setLightColor] = React.useState("warm-amber");

  const wallOptions = [
    { id: "dark-venetian", name: "Венецианская штукатурка", color: "bg-zinc-800", texture: "Текстурированный матовый сланец" },
    { id: "raw-concrete", name: "Индустриальный бетон", color: "bg-neutral-600", texture: "Бруталистский опалубочный бетон" },
    { id: "gold-panels", name: "Латунные панели", color: "bg-amber-700", texture: "Шлифованная премиальная латунь" }
  ];

  const floorOptions = [
    { id: "white-marble", name: "Calacatta Мрамор", color: "bg-stone-100", texture: "Полированные плиты с серыми и золотыми прожилками" },
    { id: "belgian-oak", name: "Бельгийский Дуб", color: "bg-orange-950", texture: "Матовый мореный паркет с глубокими фасками" },
    { id: "dark-granite", name: "Абсолютный Гранит", color: "bg-zinc-900", texture: "Черные мелкозернистые плиты с зеркальным отражением" }
  ];

  const lightOptions = [
    { id: "warm-amber", name: "Теплый янтарь (2700К)", color: "bg-amber-400 font-bold shadow-amber-500/50", glowCode: "from-amber-600/30 via-amber-900/10 to-transparent" },
    { id: "natural-white", name: "Нейтральный студийный (4000К)", color: "bg-stone-200 font-bold shadow-white/50", glowCode: "from-stone-300/20 via-neutral-900/10 to-transparent" },
    { id: "neon-cyber", name: "Неоновый киберпанк", color: "bg-purple-500 font-bold shadow-purple-500/50", glowCode: "from-purple-800/30 via-purple-950/10 to-transparent" }
  ];

  // Randomize configuration helper
  const handleRandomize = () => {
    const wallIdx = Math.floor(Math.random() * wallOptions.length);
    const floorIdx = Math.floor(Math.random() * floorOptions.length);
    const lightIdx = Math.floor(Math.random() * lightOptions.length);
    setWallMaterial(wallOptions[wallIdx].id);
    setFloorMaterial(floorOptions[floorIdx].id);
    setLightColor(lightOptions[lightIdx].id);
  };

  const currentWall = wallOptions.find(o => o.id === wallMaterial) || wallOptions[0];
  const currentFloor = floorOptions.find(o => o.id === floorMaterial) || floorOptions[0];
  const currentLight = lightOptions.find(o => o.id === lightColor) || lightOptions[0];

  return (
    <section id="showroom" className="relative py-24 bg-black border-t border-white/5 overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-gold-main/2 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono text-gold-accent uppercase tracking-[0.3em] block mb-3">
            ИНТЕРАКТИВНЫЙ ШОУРУМ
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            КАСТОМИЗАТОР МАТЕРИАЛОВ И СЦЕН
          </h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto leading-relaxed">
            Почувствуйте себя архитектором. Меняйте отделку стен, пола и светильники премиум-лофта в реальном времени, тестируя безупречную реакцию физического света.
          </p>
        </div>

        {/* Customizer workspace widget layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Virtual 3D rendered viewport mockup */}
          <div className="lg:col-span-7 relative flex flex-col items-center">
            <div className="relative w-full aspect-16/10 rounded-2xl overflow-hidden border border-white/10 bg-neutral-900 shadow-2xl flex items-center justify-center">
              
              {/* Wall background visual node */}
              <div className={`absolute inset-x-0 top-0 h-[65%] transition-all duration-700 ${
                wallMaterial === "dark-venetian" ? "bg-zinc-850" :
                wallMaterial === "raw-concrete" ? "bg-stone-700" : "bg-solar-900 bg-amber-950/90"
              }`} style={{
                backgroundImage: wallMaterial === "raw-concrete" 
                  ? "repeating-linear-gradient(45deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 2px, transparent 2px, transparent 10px)"
                  : wallMaterial === "gold-panels"
                  ? "linear-gradient(90deg, rgba(184,142,61,0.2) 1px, transparent 1px)"
                  : "radial-gradient(circle, rgba(255,255,255,0.02) 1px, transparent 1px)",
                backgroundSize: wallMaterial === "gold-panels" ? "60px 100%" : "30px 30px"
              }}>
                {/* Simulated luxury chandelier on the wall */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className={`w-8 h-24 rounded-b-md border transition-all duration-500 bg-linear-to-b from-neutral-800 to-black ${
                    lightColor === "warm-amber" ? "border-amber-500/30" :
                    lightColor === "natural-white" ? "border-stone-400/30" : "border-purple-500/30"
                  }`}></div>
                  {/* Chandelier lamp block */}
                  <div className={`w-16 h-10 -mt-1 rounded-full filter blur-[2px] transition-all duration-500 animate-pulse ${
                    lightColor === "warm-amber" ? "bg-amber-400/80 shadow-lg shadow-amber-500" :
                    lightColor === "natural-white" ? "bg-white/80 shadow-lg shadow-stone-200" : "bg-purple-400/80 shadow-lg shadow-purple-500"
                  }`}></div>
                </div>
              </div>

              {/* Floor background visual node */}
              <div className={`absolute inset-x-0 bottom-0 h-[35%] transition-all duration-700 ${
                floorMaterial === "white-marble" ? "bg-stone-200" :
                floorMaterial === "belgian-oak" ? "bg-amber-950" : "bg-neutral-900"
              }`} style={{
                backgroundImage: floorMaterial === "belgian-oak"
                  ? "repeating-linear-gradient(90deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 15px, rgba(255,255,255,0.05) 15px, rgba(255,255,255,0.05) 30px)"
                  : floorMaterial === "white-marble"
                  ? "linear-gradient(135deg, rgba(80,80,80,0.1) 0%, rgba(80,80,80,0.05) 50%, transparent 100%)"
                  : "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
                backgroundSize: floorMaterial === "belgian-oak" ? "120px 100%" : "40px 40px"
              }}></div>

              {/* Shadow Perspective Room Layer */}
              <div className="absolute inset-0 bg-radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.8) 100%) pointer-events-none"></div>

              {/* Light glow overlay representing dynamic ambiance */}
              <div className={`absolute inset-0 bg-gradient-to-t transition-all duration-700 mix-blend-color-dodge opacity-80 pointer-events-none ${currentLight.glowCode}`}></div>

              {/* Decorative premium minimal sofa object in the center */}
              <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-3/5 h-[30%] bg-zinc-950 border border-white/10 rounded-xl shadow-2xl p-4 flex flex-col justify-end transition-transform hover:scale-103 duration-300">
                <div className="w-full h-4/5 bg-zinc-900 rounded-md border border-white/5 flex gap-1 p-1">
                  <div className="w-1/3 bg-neutral-850 rounded-xs"></div>
                  <div className="w-1/3 bg-neutral-850 rounded-xs"></div>
                  <div className="w-1/3 bg-neutral-850 rounded-xs"></div>
                </div>
                <div className="w-full h-1/5 flex justify-between px-4 mt-2">
                  <div className="w-4 h-1.5 bg-neutral-700 rounded-full"></div>
                  <div className="w-4 h-1.5 bg-neutral-700 rounded-full"></div>
                </div>
              </div>

              {/* Spec badge top right of rendering */}
              <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 bg-black/80 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-mono select-none">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-gray-400">PBR Рендеринг активен</span>
              </div>
            </div>

            {/* Quick action details bar */}
            <div className="w-full mt-4 flex justify-between items-center bg-zinc-950 border border-white/5 rounded-xl p-4 text-xs">
              <div className="flex gap-4 items-center">
                <div className="flex flex-col text-left font-mono">
                  <span className="text-gray-500 text-[10px]">Отделка Стен:</span>
                  <span className="text-white font-medium">{currentWall.name}</span>
                </div>
                <div className="h-6 w-[1px] bg-white/10"></div>
                <div className="flex flex-col text-left font-mono">
                  <span className="text-gray-500 text-[10px]">Покрытие Пола:</span>
                  <span className="text-white font-medium">{currentFloor.name}</span>
                </div>
              </div>

              <button
                onClick={handleRandomize}
                className="p-2 bg-white/5 rounded-lg border border-white/10 text-gray-400 hover:text-gold-accent hover:bg-white/10 transition-all flex items-center gap-1 font-mono text-[10px]"
              >
                <Shuffle size={12} />
                <span>Случайно</span>
              </button>
            </div>
          </div>

          {/* Right Column: Customizer Selector controls */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-8 text-left">
            
            {/* 1. Wall Configuration */}
            <div className="space-y-3 font-sans">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-gray-400 tracking-wider">
                <Grid size={14} className="text-gold-main" />
                <span>1. Выберите отделку стен</span>
              </div>
              <div className="flex flex-col gap-2">
                {wallOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setWallMaterial(opt.id)}
                    className={`w-full p-4 rounded-xl border flex items-center justify-between transition-all ${
                      wallMaterial === opt.id
                        ? "border-gold-main bg-gold-main/5 text-white"
                        : "border-white/10 bg-zinc-950/40 text-gray-400 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg ${opt.color} border border-white/20`}></div>
                      <div className="flex flex-col text-left">
                        <span className="font-semibold text-xs text-white">{opt.name}</span>
                        <span className="text-[10px] text-gray-500">{opt.texture}</span>
                      </div>
                    </div>
                    {wallMaterial === opt.id && <Check size={16} className="text-gold-accent" />}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Floor Configuration */}
            <div className="space-y-3 font-sans">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-gray-400 tracking-wider">
                <Grid size={14} className="text-gold-main" />
                <span>2. Выберите покрытие пола</span>
              </div>
              <div className="flex flex-col gap-2">
                {floorOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setFloorMaterial(opt.id)}
                    className={`w-full p-4 rounded-xl border flex items-center justify-between transition-all ${
                      floorMaterial === opt.id
                        ? "border-gold-main bg-gold-main/5 text-white"
                        : "border-white/10 bg-zinc-950/40 text-gray-400 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg ${opt.color} border border-white/20`}></div>
                      <div className="flex flex-col text-left">
                        <span className="font-semibold text-xs text-white">{opt.name}</span>
                        <span className="text-[10px] text-gray-500">{opt.texture}</span>
                      </div>
                    </div>
                    {floorMaterial === opt.id && <Check size={16} className="text-gold-accent" />}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Light Ambiance Configuration */}
            <div className="space-y-3 font-sans">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-gray-400 tracking-wider">
                <Lightbulb size={14} className="text-gold-main" />
                <span>3. Световые сценарии</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {lightOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setLightColor(opt.id)}
                    className={`p-3 rounded-lg text-[10px] font-mono tracking-wider text-center uppercase border transition-all ${
                      lightColor === opt.id
                        ? "border-gold-main bg-gold-main/10 text-gold-accent"
                        : "border-white/10 bg-zinc-950/40 text-gray-500 hover:border-white/20"
                    }`}
                  >
                    <div>{opt.name.split(" ")[0]}</div>
                    <div className="text-[8px] text-gray-500 mt-1">{opt.name.split(" ")[1] || ""}</div>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
