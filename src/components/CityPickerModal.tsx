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
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ padding: "24px" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative z-10 w-full max-w-xl rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl overflow-y-auto"
            style={{ maxHeight: "80vh" }}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute z-10 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              style={{ top: "20px", right: "20px", padding: "10px" }}
            >
              <X size={18} />
            </button>

            {/* Content */}
            <div style={{ padding: "36px 32px 32px" }}>
              {/* Header */}
              <div className="text-center" style={{ marginBottom: "32px" }}>
                <span style={{ fontSize: "48px" }}>{country.flag}</span>
                <h2 className="font-bold text-white" style={{ fontSize: "22px", marginTop: "12px" }}>
                  {country.name}
                </h2>
                <p className="text-white/50" style={{ fontSize: "13px", marginTop: "8px" }}>
                  Choisis ta ville de destination
                </p>
              </div>

              {/* City list */}
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {country.cities.map((city, i) => (
                  <motion.button
                    key={city.id}
                    onClick={() => onSelectCity(city)}
                    className="flex items-center w-full rounded-xl bg-white/5 border border-white/10 text-left transition-colors hover:bg-white/10 cursor-pointer"
                    style={{ padding: "20px", gap: "20px" }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <div
                      className="rounded-xl overflow-hidden flex-shrink-0 bg-white/5"
                      style={{ height: "80px", width: "112px" }}
                    >
                      <img
                        src={city.imageUrl}
                        alt={city.name}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.parentElement!.innerHTML = `<div style="height:100%;width:100%;display:flex;align-items:center;justify-content:center;font-size:28px;background:rgba(255,255,255,0.03)">${country.flag}</div>`;
                        }}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-white" style={{ fontSize: "15px" }}>
                        {city.name}
                      </h3>
                      <p className="text-white/50 line-clamp-2" style={{ fontSize: "12px", marginTop: "6px", lineHeight: "1.5" }}>
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
