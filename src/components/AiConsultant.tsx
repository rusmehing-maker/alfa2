import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, Sparkles, Loader2, Bot, CornerDownLeft, Info, HelpCircle } from "lucide-react";

interface AiConsultantProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function AiConsultant({ isOpen, onClose }: AiConsultantProps) {
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Здравствуйте! Я премиальный ИИ-консультант студии 3dvisualAP. Помогу подобрать идеальный архитектурный стиль, рассчитать смету проекта, сориентировать по стоимости или выбрать материалы. Задайте мне любой вопрос!"
    }
  ]);
  const [inputVal, setInputVal] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const bottomRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsg = textToSend.trim();
    setInputVal("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    try {
      const response = await fetch("/api/ai/consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: userMsg,
          chatHistory: messages,
        }),
      });

      if (!response.ok) {
        throw new Error("API Connection error");
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.text }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Прошу прощения, возникли небольшие затруднения со связью у моего ИИ-процессора. Рекомендую заполнить контактную форму выше — менеджер рассчитает смету и проконсультирует по материалам лично в течение 10 минут!"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClass = (suggestion: string) => {
    handleSend(suggestion);
  };

  const suggestions = [
    "Каковы цены и сроки визуализации?",
    "Какой стиль подойдет для загородного дома?",
    "Визуализация 150 кв.м интерьера, сколько выйдет?",
    "Какие материалы подходят к рубленому терему?"
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center font-sans">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/75 backdrop-blur-md cursor-pointer"
      ></motion.div>

      {/* Main chat box overlay dialog */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-xl h-[560px] bg-zinc-950/95 border border-white/10 rounded-2xl flex flex-col justify-between shadow-2xl z-20 mx-4"
      >
        {/* Glowing visual top frame */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-gold-main via-gold-accent to-gold-main"></div>

        {/* Header bar contact */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-white/5 bg-zinc-900/40">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gold-main/10 rounded-full border border-gold-main/20">
              <Bot size={18} className="text-gold-accent animate-pulse" />
            </div>
            <div className="text-left">
              <h3 className="font-display font-bold text-sm tracking-widest text-white">
                3D VISUAL ADVISOR
              </h3>
              <p className="text-[10px] text-gray-500 font-mono tracking-wider">Powered by Gemini 3.5 Flash</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable messages area */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 text-left">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                  msg.role === "user"
                    ? "bg-gold-main text-black font-semibold rounded-br-xs"
                    : "bg-zinc-900 text-gray-100 border border-white/5 rounded-bl-xs"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {/* Loading status bar indicator */}
          {loading && (
            <div className="flex justify-start items-center gap-1.5 p-2 bg-white/3 border border-white/5 rounded-full w-24 text-left text-[11px] text-gray-400 font-mono animate-pulse">
              <Loader2 size={11} className="animate-spin text-gold-accent" />
              <span>ИИ думает...</span>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Quick action buttons row */}
        {messages.length === 1 && (
          <div className="px-6 py-2 flex flex-wrap gap-1.5 justify-start text-left bg-black/20 border-t border-b border-white/5">
            {suggestions.map((sug, idx) => (
              <button
                key={idx}
                onClick={() => handleSuggestionClass(sug)}
                className="px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-white/5 hover:border-gold-main/20 text-gray-400 hover:text-gold-accent text-[9px] font-mono tracking-wide transition-all"
              >
                {sug}
              </button>
            ))}
          </div>
        )}

        {/* Input prompt text bar panel */}
        <div className="px-6 py-4 border-t border-white/5 bg-zinc-900/20 flex gap-3 items-center">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend(inputVal);
            }}
            placeholder="Спросите ИИ (например: сколько стоит анимация 20 сек?)..."
            className="flex-1 bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-hidden focus:border-gold-main"
          />
          <button
            onClick={() => handleSend(inputVal)}
            disabled={!inputVal.trim() || loading}
            className="p-3 rounded-xl bg-gold-main hover:bg-gold-accent disabled:opacity-50 text-black transition-colors"
          >
            <Send size={14} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
