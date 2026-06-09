import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Phone, Mail, MapPin, CheckCircle, Loader2, Sparkles, HelpCircle } from "lucide-react";

interface ContactSectionProps {
  preFilledVals: {
    projectType: string;
    description: string;
    budget: string;
  } | null;
  onLeadSubmitted: () => void;
  onOpenAi: () => void;
}

export default function ContactSection({ preFilledVals, onLeadSubmitted, onOpenAi }: ContactSectionProps) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [projectType, setProjectType] = React.useState("Визуализация Экстерьера");
  const [budget, setBudget] = React.useState("");
  const [description, setDescription] = React.useState("");

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  // Sync pre-fills from Calculator
  React.useEffect(() => {
    if (preFilledVals) {
      setProjectType(preFilledVals.projectType);
      setDescription(preFilledVals.description);
      setBudget(preFilledVals.budget);
    }
  }, [preFilledVals]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setErrorMsg("Пожалуйста, введите Ваше имя и адрес электронной почты.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          projectType,
          budget,
          description,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Произошла ошибка при отправке заявки.");
      }

      setSuccess(true);
      onLeadSubmitted(); // Trigger App header badge count refresh

      // Reset form fields
      setName("");
      setEmail("");
      setPhone("");
      setBudget("");
      setDescription("");
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Ошибка подключения к CRM серверу.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 bg-black overflow-hidden border-t border-white/5">
      <div className="absolute top-1/2 left-0 w-[450px] h-[450px] bg-gold-main/2 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Agency Information Cards (Size 5) */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div>
              <span className="text-xs font-mono text-gold-accent uppercase tracking-[0.3em] block mb-3">
                СВЯЗАТЬСЯ С НАМИ
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
                НАЧНЁМ СВОЙ <br />ПРЕМИУМ ПРОЕКТ
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                Мы беремся за задачи любой сложности по всему миру. Напишите нам, и мы подготовим бесплатный детальный расчет сметы в течение 24 часов.
              </p>
            </div>

            {/* Direct Contacts Info cards */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-zinc-950/60 border border-white/5 font-sans">
                <div className="p-3 bg-gold-main/5 text-gold-accent border border-gold-main/20 rounded-lg">
                  <Phone size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Контактный телефон</span>
                  <a href="tel:+79998887766" className="text-white font-semibold text-sm hover:text-gold-accent transition-colors">+7 (999) 888-77-66</a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-zinc-950/60 border border-white/5 font-sans">
                <div className="p-3 bg-gold-main/5 text-gold-accent border border-gold-main/20 rounded-lg">
                  <Mail size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Электронная почта</span>
                  <a href="mailto:info@3dvisualap.ru" className="text-white font-semibold text-sm hover:text-gold-accent transition-colors">info@3dvisualap.com</a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-zinc-950/60 border border-white/5 font-sans">
                <div className="p-3 bg-gold-main/5 text-gold-accent border border-gold-main/20 rounded-lg">
                  <MapPin size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Локация студии</span>
                  <span className="text-white font-semibold text-sm">Москва, Центр Сити, Башня Федерация</span>
                </div>
              </div>
            </div>

            {/* Premium Callout to AI Helper */}
            <div className="p-5 rounded-2xl bg-gold-main/5 border border-gold-main/15 space-y-3 font-sans text-xs">
              <div className="flex items-center gap-2 text-gold-accent font-bold">
                <Sparkles size={14} className="animate-spin" />
                <span>Не уверены, какой выбрать стиль или формат?</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Спросите нашего встроенного ИИ-консультанта прямо сейчас. Он порекомендует подходящую стилистику, материалы и смету для вашего дома или интерьера!
              </p>
              <button
                onClick={onOpenAi}
                className="text-xs font-semibold text-gold-accent border-b border-gold-main hover:text-white hover:border-white transition-all pb-0.5"
              >
                Запустить ИИ-Консультацию &rarr;
              </button>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form (Size 7) */}
          <div className="lg:col-span-7 bg-zinc-950/40 border border-white/10 rounded-2xl p-6 lg:p-10 relative overflow-hidden">
            
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-12 text-center space-y-6 font-sans flex flex-col items-center"
                >
                  <div className="p-4 bg-gold-main/10 text-gold-accent rounded-full border border-gold-main/20 animate-bounce">
                    <CheckCircle size={42} />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-white mb-2">ЗАЯВКА УСПЕШНО ОТПРАВЛЕНА</h3>
                    <p className="text-gray-400 text-sm max-w-sm mx-auto leading-relaxed mt-2">
                      Большое спасибо за доверие! Наш ведущий менеджер CRM-студии 3dvisualAP свяжется с вами по телефону или почте в течение 20 минут.
                    </p>
                  </div>
                  <button
                    onClick={() => setSuccess(false)}
                    className="px-6 py-2 border border-white/15 hover:border-gold-main rounded-full text-xs uppercase tracking-wider text-white hover:text-gold-accent transition-colors"
                  >
                    Отправить ещё одну заявку
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6 font-sans"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                    {/* Name */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-[10px] text-gray-500 uppercase tracking-widest font-mono font-semibold">Ваше Имя *</label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Александр"
                        className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-hidden focus:border-gold-main focus:bg-zinc-900 transition-colors"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-[10px] text-gray-500 uppercase tracking-widest font-mono font-semibold">Email *</label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@gmail.com"
                        className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-hidden focus:border-gold-main focus:bg-zinc-900 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                    {/* Phone */}
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-[10px] text-gray-500 uppercase tracking-widest font-mono font-semibold">Контактный телефон</label>
                      <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+7 (900) 123-45-67"
                        className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-hidden focus:border-gold-main focus:bg-zinc-900 transition-colors"
                      />
                    </div>

                    {/* Project budget */}
                    <div className="space-y-2">
                      <label htmlFor="budget" className="text-[10px] text-gray-500 uppercase tracking-widest font-mono font-semibold">Ориентировочный бюджет</label>
                      <input
                        type="text"
                        id="budget"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        placeholder="Например, $1,500"
                        className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-hidden focus:border-gold-main focus:bg-zinc-900 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Project Type */}
                  <div className="space-y-2 text-left">
                    <label htmlFor="projectType" className="text-[10px] text-gray-500 uppercase tracking-widest font-mono font-semibold">Вид требуемой услуги</label>
                    <select
                      id="projectType"
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-hidden focus:border-gold-main focus:bg-zinc-900 transition-colors cursor-pointer"
                    >
                      <option value="Визуализация Экстерьера">Визуализация Экстерьера (Дома, ЖК, Коттеджи)</option>
                      <option value="Визуализация Интерьера">Визуализация Интерьера (Квартиры, Офисы, Коммерческие)</option>
                      <option value="Сложное 3D Моделирование">Сложное 3D Моделирование (Мебель, Объекты)</option>
                      <option value="Анимация & Прогулки">Динамическая Анимация & Презентационный ролик</option>
                    </select>
                  </div>

                  {/* Project Description */}
                  <div className="space-y-2 text-left">
                    <label htmlFor="description" className="text-[10px] text-gray-500 uppercase tracking-widest font-mono font-semibold">Краткое описание / Ссылка на чертежи</label>
                    <textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Опишите ваши задачи или расскажите об условиях..."
                      rows={4}
                      className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-hidden focus:border-gold-main focus:bg-zinc-900 transition-colors resize-none"
                    ></textarea>
                  </div>

                  {errorMsg && (
                    <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs text-left rounded-lg">
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl bg-linear-to-r from-gold-main to-gold-accent hover:from-gold-accent hover:to-gold-main disabled:opacity-50 text-black font-header text-xs uppercase font-bold tracking-widest transition-all shadow-xl hover:shadow-gold-main/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        <span>Отправка в CRM...</span>
                      </>
                    ) : (
                      <>
                        <span>Отправить заявку</span>
                        <Send size={13} />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>

          </div>
        </div>
      </div>
    </section>
  );
}
