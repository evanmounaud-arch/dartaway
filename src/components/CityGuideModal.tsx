"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft } from "lucide-react";
import { City, Country } from "@/data/destinations";
import { getGuide, getTypeEmoji } from "@/data/guides";

interface CityGuideModalProps {
  city: City | null;
  country: Country | null;
  isOpen: boolean;
  onClose: () => void;
  onValidate: (city: City, country: Country) => void;
  onBack: () => void;
}

export default function CityGuideModal({
  city,
  country,
  isOpen,
  onClose,
  onValidate,
  onBack,
}: CityGuideModalProps) {
  if (!city || !country) return null;

  const guide = getGuide(city.id);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ padding: "24px" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-2xl flex flex-col rounded-2xl border border-white/10 bg-black/80 backdrop-blur-xl shadow-2xl"
            style={{ maxHeight: "85vh" }}
            initial={{ scale: 0.9, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 40 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div
              className="flex-shrink-0 flex items-start justify-between border-b border-white/10"
              style={{ padding: "24px 32px" }}
            >
              <div>
                <h2 className="text-lg font-bold text-white">
                  {city.name} {country.flag}
                </h2>
                <p className="text-xs text-white/50" style={{ marginTop: "6px" }}>
                  {city.description}
                </p>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                style={{ padding: "10px" }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable content */}
            <div
              className="flex-1 overflow-y-auto"
              style={{ padding: "28px 32px" }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                {/* Highlights */}
                <section>
                  <h3
                    className="text-xs font-semibold uppercase tracking-wider text-white/40"
                    style={{ marginBottom: "16px" }}
                  >
                    Points forts
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {guide.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-start text-sm text-white/80" style={{ gap: "10px" }}>
                        <span className="text-violet-400" style={{ marginTop: "2px" }}>&#x2022;</span>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Info bar */}
                <div
                  className="flex rounded-xl bg-white/5 border border-white/10"
                  style={{ padding: "20px", gap: "16px" }}
                >
                  <div className="flex-1">
                    <p className="text-white/40 uppercase tracking-wider" style={{ fontSize: "10px" }}>
                      Meilleure saison
                    </p>
                    <p className="text-sm text-white font-medium" style={{ marginTop: "8px" }}>
                      {guide.bestSeason}
                    </p>
                  </div>
                  <div style={{ width: "1px" }} className="bg-white/10" />
                  <div className="flex-1">
                    <p className="text-white/40 uppercase tracking-wider" style={{ fontSize: "10px" }}>
                      Budget / jour
                    </p>
                    <p className="text-sm text-white font-medium" style={{ marginTop: "8px" }}>
                      {guide.budgetPerDay}
                    </p>
                  </div>
                </div>

                {/* Activities grid */}
                <section>
                  <h3
                    className="text-xs font-semibold uppercase tracking-wider text-white/40"
                    style={{ marginBottom: "16px" }}
                  >
                    Activit&eacute;s
                  </h3>
                  <div
                    className="grid grid-cols-1 md:grid-cols-2"
                    style={{ gap: "16px" }}
                  >
                    {guide.activities.map((activity, i) => (
                      <motion.div
                        key={activity.name}
                        className="rounded-xl border border-white/10 bg-white/5 overflow-hidden"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06 }}
                      >
                        <div className="bg-white/5" style={{ height: "140px" }}>
                          <img
                            src={activity.imageUrl}
                            alt={activity.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.parentElement!.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:2rem;background:linear-gradient(135deg,rgba(124,58,237,0.2),rgba(249,115,22,0.2))">${getTypeEmoji(activity.type)}</div>`;
                            }}
                          />
                        </div>
                        <div style={{ padding: "16px" }}>
                          <div className="flex items-center" style={{ gap: "8px", marginBottom: "6px" }}>
                            <span style={{ fontSize: "14px" }}>{getTypeEmoji(activity.type)}</span>
                            <span className="text-white font-medium text-xs">
                              {activity.name}
                            </span>
                          </div>
                          <p className="text-white/60 leading-relaxed" style={{ fontSize: "11px" }}>
                            {activity.description}
                          </p>
                          {activity.tip && (
                            <p className="text-violet-300/70 italic" style={{ fontSize: "11px", marginTop: "6px" }}>
                              {activity.tip}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </section>
              </div>
            </div>

            {/* Bottom bar */}
            <div
              className="flex-shrink-0 border-t border-white/10"
              style={{ padding: "20px 32px", display: "flex", gap: "16px" }}
            >
              <button
                onClick={onBack}
                className="flex-1 flex items-center justify-center rounded-xl border border-white/20 text-sm text-white/70 font-medium hover:bg-white/5 transition-colors cursor-pointer"
                style={{ padding: "14px 24px", gap: "8px" }}
              >
                <ArrowLeft size={16} />
                Retour
              </button>
              <button
                onClick={() => onValidate(city, country)}
                className="flex-1 flex items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-orange-500 text-sm text-white font-semibold hover:from-violet-500 hover:to-orange-400 transition-all cursor-pointer"
                style={{ padding: "14px 24px" }}
              >
                Valider ce voyage &#x2728;
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
