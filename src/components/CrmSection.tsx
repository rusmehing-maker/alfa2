import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, RefreshCw, Trash2, Check, Clock, TrendingUp, Filter, CheckCircle2, AlertTriangle, Briefcase, FileUp } from "lucide-react";
import { Lead } from "../types";

interface CrmSectionProps {
  isOpen: boolean;
  onClose: () => void;
  leads: Lead[];
  onRefreshLeads: () => void;
}

export default function CrmSection({ isOpen, onClose, leads, onRefreshLeads }: CrmSectionProps) {
  const [filterStatus, setFilterStatus] = React.useState("Все");
  const [filterType, setFilterType] = React.useState("Все");
  const [updatingId, setUpdatingId] = React.useState<string | null>(null);

  // Computed stats
  const stats = React.useMemo(() => {
    return {
      total: leads.length,
      new: leads.filter((l) => l.status === "Новый").length,
      processing: leads.filter((l) => l.status === "В обработке").length,
      completed: leads.filter((l) => l.status === "Завершен").length,
      rejected: leads.filter((l) => l.status === "Отклонен").length,
    };
  }, [leads]);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const response = await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        onRefreshLeads();
      }
    } catch (err) {
      console.error("Error updating lead status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!window.confirm("Вы уверены, что хотите окончательно удалить эту заявку из CRM?")) {
      return;
    }
    try {
      const response = await fetch(`/api/leads/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        onRefreshLeads();
      }
    } catch (err) {
      console.error("Error deleting lead:", err);
    }
  };

  const filteredLeads = leads.filter((lead) => {
    const matchStatus = filterStatus === "Все" || lead.status === filterStatus;
    const matchType = filterType === "Все" || lead.projectType === filterType;
    return matchStatus && matchType;
  });

  const projectTypes = ["Все", ...Array.from(new Set(leads.map((l) => l.projectType))).filter(Boolean)];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end font-sans">
      {/* Backdrop overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
      ></motion.div>

      {/* Slide-out CRM Panel Content */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative w-full max-w-3xl h-full bg-zinc-950 border-l border-white/10 shadow-2xl py-6 px-6 lg:px-8 flex flex-col justify-between z-20 overflow-y-auto"
      >
        {/* Header workspace */}
        <div className="flex justify-between items-center pb-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-gold-main animate-ping"></div>
            <h2 className="font-display text-xl font-bold tracking-wider text-white">
              Executive CRM Leads
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-gold-main/10 text-gold-accent font-mono text-[10px] font-bold">
              v1.2 Live
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onRefreshLeads}
              className="p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/5"
              title="Обновить список"
            >
              <RefreshCw size={14} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/5"
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Stats segment block */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-b border-white/5">
          <div className="bg-black/40 border border-white/5 rounded-xl p-4 text-left">
            <span className="text-[9px] text-gray-500 uppercase tracking-widest font-mono font-bold">Всего заявок</span>
            <div className="text-2xl font-mono font-extrabold text-white mt-1">{stats.total}</div>
          </div>
          <div className="bg-black/40 border border-white/5 rounded-xl p-4 text-left border-l-2 border-l-amber-500">
            <span className="text-[9px] text-amber-500 uppercase tracking-widest font-mono font-bold">Новые</span>
            <div className="text-2xl font-mono font-extrabold text-amber-500 mt-1">{stats.new}</div>
          </div>
          <div className="bg-black/40 border border-white/5 rounded-xl p-4 text-left border-l-2 border-l-blue-500">
            <span className="text-[9px] text-blue-400 uppercase tracking-widest font-mono font-bold">В обработке</span>
            <div className="text-2xl font-mono font-extrabold text-blue-400 mt-1">{stats.processing}</div>
          </div>
          <div className="bg-black/40 border border-white/5 rounded-xl p-4 text-left border-l-2 border-l-emerald-500">
            <span className="text-[9px] text-emerald-400 uppercase tracking-widest font-mono font-bold">Завершены</span>
            <div className="text-2xl font-mono font-extrabold text-emerald-400 mt-1">{stats.completed}</div>
          </div>
        </div>

        {/* Filters configuration */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center py-4 border-b border-white/5">
          <div className="flex items-center gap-2 text-xs font-mono text-gray-500 uppercase">
            <Filter size={13} />
            <span>Фильтрация:</span>
          </div>

          <div className="flex flex-wrap gap-2 items-center flex-1">
            {/* Status filters */}
            <div className="flex rounded-lg bg-black border border-white/5 p-1 text-[10px] font-mono">
              {["Все", "Новый", "В обработке", "Завершен", "Отклонен"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 py-1 rounded-md transition-all ${
                    filterStatus === status ? "bg-gold-main text-black font-bold" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            {/* Type Filter selector */}
            {projectTypes.length > 2 && (
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="bg-black border border-white/5 rounded-lg px-3 py-1 text-[10px] font-mono text-gray-400 focus:outline-hidden focus:border-gold-main"
              >
                <option value="Все">Все услуги</option>
                {projectTypes.filter(t => t !== "Все").map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Leads Scroll Area (Flex 1) */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1 min-h-[300px]">
          <AnimatePresence mode="popLayout">
            {filteredLeads.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-16 text-center text-gray-500 space-y-3"
              >
                <Briefcase size={36} className="text-zinc-700 animate-pulse" />
                <div>
                  <p className="font-semibold text-sm text-gray-400">Список заявок пуст</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {filterStatus !== "Все" || filterType !== "Все" 
                      ? "Попробуйте сбросить фильтры поиска" 
                      : "Заполните форму контактов внизу страницы, и лид попадет сюда!"}
                  </p>
                </div>
              </motion.div>
            ) : (
              filteredLeads.map((lead) => (
                <motion.div
                  key={lead.id}
                  layoutId={lead.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-zinc-900/60 border border-white/5 rounded-xl p-5 text-left space-y-4 hover:border-white/10 transition-colors"
                >
                  {/* Lead Title bar */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-sm text-white select-all">{lead.name}</h4>
                      <p className="text-[10px] text-gray-500 font-mono mt-0.5">{new Date(lead.date).toLocaleString("ru-RU")}</p>
                    </div>

                    {/* Status Badge */}
                    <span className={`px-2.5 py-1 rounded-md text-[9px] font-mono uppercase font-bold tracking-wider ${
                      lead.status === "Новый" ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" :
                      lead.status === "В обработке" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" :
                      lead.status === "Завершен" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                      "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                    }`}>
                      {lead.status}
                    </span>
                  </div>

                  {/* Customer parameters info */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-3 bg-zinc-950 rounded-lg text-xs font-mono">
                    <div>
                      <span className="text-gray-500 text-[9px] block">Телефон</span>
                      <a href={`tel:${lead.phone}`} className="text-gray-300 font-semibold hover:text-white">{lead.phone || "—"}</a>
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-500 text-[9px] block">Услуга</span>
                      <span className="text-gray-300 font-semibold truncate block" title={lead.projectType}>{lead.projectType}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 text-[9px] block">Бюджет</span>
                      <span className="text-gold-accent font-bold">{lead.budget || "—"}</span>
                    </div>
                  </div>

                  {/* Customer Description message */}
                  {lead.description && (
                    <div className="p-3 bg-black/40 rounded border border-white/5 text-xs text-gray-400 font-sans leading-relaxed">
                      {lead.description}
                    </div>
                  )}

                  {/* Action row */}
                  <div className="flex justify-between items-center pt-2 border-t border-white/5">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono">
                      <span className="text-gray-500 font-bold">Изменить статус:</span>
                      <div className="flex gap-1">
                        {["В обработке", "Завершен", "Отклонен"].map((st) => (
                          <button
                            key={st}
                            onClick={() => handleUpdateStatus(lead.id, st)}
                            disabled={updatingId === lead.id || lead.status === st}
                            className={`px-2 py-0.5 rounded border text-[9px] font-bold ${
                              lead.status === st
                                ? "bg-white/10 text-white border-white/20"
                                : "bg-black text-gray-400 border-white/5 hover:border-gray-500 hover:text-white"
                            }`}
                          >
                            {st === "В обработке" ? "В работу" : st === "Завершен" ? "Завешить" : "Отклонить"}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteLead(lead.id)}
                      className="p-1.5 rounded-lg bg-rose-500/5 hover:bg-rose-500/15 border border-rose-500/10 text-rose-400 hover:text-rose-500 transition-colors"
                      title="Удалить заявку"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Footer info CRM Panel */}
        <div className="pt-4 border-t border-white/5 flex justify-between items-center text-[10px] text-gray-500 font-mono">
          <span>Синхронизировано: leads.json</span>
          <button
            onClick={onRefreshLeads}
            className="flex items-center gap-1 text-gold-accent font-bold hover:text-white"
          >
            <RefreshCw size={10} />
            <span>Обновить данные</span>
          </button>
        </div>

      </motion.div>
    </div>
  );
}
