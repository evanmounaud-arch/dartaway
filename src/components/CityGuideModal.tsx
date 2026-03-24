"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
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
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl border border-white/10 bg-black/80 backdrop-blur-xl shadow-2xl"
            initial={{ scale: 0.9, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 40 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex-shrink-0 flex items-start justify-between border-b border-white/10 px-8 py-6">
              <div>
                <h2 className="text-lg font-bold text-white">
                  {city.name} {country.flag}
                </h2>
                <p className="text-xs text-white/50 mt-1.5">{city.description}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-8 py-7 space-y-7">
              {/* Highlights */}
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">
                  Points forts
                </h3>
                <ul className="space-y-2">
                  {guide.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-white/80">
                      <span className="text-violet-400 mt-0.5">&#x2022;</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Info bar */}
              <div className="flex gap-4 rounded-xl bg-white/5 border border-white/10 p-5">
                <div className="flex-1">
                  <p className="text-[10px] text-white/40 uppercase tracking-wider">
                    Meilleure saison
                  </p>
                  <p className="text-sm text-white font-medium mt-1.5">
                    {guide.bestSeason}
                  </p>
                </div>
                <div className="w-px bg-white/10" />
                <div className="flex-1">
                  <p className="text-[10px] text-white/40 uppercase tracking-wider">
                    Budget / jour
                  </p>
                  <p className="text-sm text-white font-medium mt-1.5">
                    {guide.budgetPerDay}
                  </p>
                </div>
              </div>

              {/* Activities grid */}
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">
                  Activit&eacute;s
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {guide.activities.map((activity, i) => (
                    <motion.div
                      key={activity.name}
                      className="rounded-xl border border-white/10 bg-white/5 overflow-hidden"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <div className="relative h-32 bg-white/5">
                        <img
                          src={activity.imageUrl}
                          alt={activity.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center text-3xl bg-gradient-to-br from-violet-900/30 to-orange-900/30">${getTypeEmoji(activity.type)}</div>`;
                          }}
                        />
                      </div>
                      <div className="p-4 space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{getTypeEmoji(activity.type)}</span>
                          <span className="text-white font-medium text-xs">
                            {activity.name}
                          </span>
                        </div>
                        <p className="text-white/60 text-[11px] leading-relaxed">
                          {activity.description}
                        </p>
                        {activity.tip && (
                          <p className="text-violet-300/70 text-[11px] italic mt-1">
                            {activity.tip}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            </div>

            {/* Bottom bar */}
            <div className="flex-shrink-0 border-t border-white/10 px-8 py-5 flex gap-4">
              <button
                onClick={onBack}
                className="flex-1 flex items-center justify-center px-6 py-3.5 rounded-xl border border-white/20 text-sm text-white/70 font-medium hover:bg-white/5 transition-colors cursor-pointer"
              >
                Retour
              </button>
              <button
                onClick={() => onValidate(city, country)}
                className="flex-1 flex items-center justify-center px-6 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-orange-500 text-sm text-white font-semibold hover:from-violet-500 hover:to-orange-400 transition-all cursor-pointer"
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
