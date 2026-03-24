"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { Country, City } from "@/data/destinations";

interface CityPickerModalProps {
  country: Country | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectCity: (city: City) => void;
}

export default function CityPickerModal({
  country,
  isOpen,
  onClose,
  onSelectCity,
}: CityPickerModalProps) {
  if (!country) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative z-10 w-full max-w-xl max-h-[80vh] overflow-y-auto rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer z-10"
            >
              <X size={18} />
            </button>

            {/* Content with generous padding */}
            <div className="p-8">
              {/* Header */}
              <div className="mb-8 text-center">
                <span className="text-4xl">{country.flag}</span>
                <h2 className="mt-3 text-xl font-bold text-white">
                  {country.name}
                </h2>
                <p className="text-xs text-white/50 mt-1.5">
                  Choisis ta ville de destination
                </p>
              </div>

              {/* City list */}
              <div className="space-y-4">
                {country.cities.map((city, i) => (
                  <motion.button
                    key={city.id}
                    onClick={() => onSelectCity(city)}
                    className="flex items-center gap-5 w-full rounded-xl bg-white/5 border border-white/10 p-5 text-left transition-colors hover:bg-white/10 cursor-pointer"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <div className="h-20 w-28 rounded-xl overflow-hidden flex-shrink-0 bg-white/5">
                      <img
                        src={city.imageUrl}
                        alt={city.name}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.parentElement!.innerHTML = `<div class="h-full w-full flex items-center justify-center text-2xl bg-white/5">${country.flag}</div>`;
                        }}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-semibold text-white">
                        {city.name}
                      </h3>
                      <p className="text-xs text-white/50 line-clamp-2 mt-1 leading-relaxed">
                        {city.description}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
