"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Calendar, MessageSquare } from "lucide-react";
import type { Trip } from "@/app/page";

interface TripManagerProps {
  trips: Trip[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateTrip: (trip: Trip) => void;
  onDeleteTrip: (tripId: string) => void;
  onOpenSlack: (trip: Trip) => void;
}

function getCountdown(dateStart?: string, dateEnd?: string): string | null {
  if (!dateStart) return null;
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const start = new Date(dateStart);
  const end = dateEnd ? new Date(dateEnd) : null;

  if (end && now > end) return "Termin\u00e9";
  if (now >= start && (!end || now <= end)) return "En cours";

  const diffMs = start.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  return `Dans ${diffDays} jour${diffDays > 1 ? "s" : ""}`;
}

export default function TripManager({
  trips,
  isOpen,
  onClose,
  onUpdateTrip,
  onDeleteTrip,
  onOpenSlack,
}: TripManagerProps) {
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const sortedTrips = useMemo(() => {
    return [...trips].sort((a, b) => {
      if (!a.dateStart && !b.dateStart) return 0;
      if (!a.dateStart) return 1;
      if (!b.dateStart) return -1;
      return new Date(a.dateStart).getTime() - new Date(b.dateStart).getTime();
    });
  }, [trips]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.aside
            className="fixed top-0 right-0 z-50 h-full w-full sm:w-[440px] bg-black/90 backdrop-blur-xl border-l border-white/10 flex flex-col shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-7 py-6 border-b border-white/10">
              <h2 className="text-lg font-bold text-white">Mes voyages</h2>
              <button
                onClick={onClose}
                className="p-2.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-7 py-6 space-y-5">
              {sortedTrips.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-white/50 text-center gap-4">
                  <span className="text-4xl">🎯</span>
                  <p className="text-sm">
                    Lancez une fléchette pour commencer !
                  </p>
                </div>
              ) : (
                sortedTrips.map((trip) => {
                  const countdown = getCountdown(trip.dateStart, trip.dateEnd);
                  const isConfirmingDelete = confirmDeleteId === trip.id;

                  return (
                    <motion.div
                      key={trip.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="rounded-xl border border-white/10 bg-white/5 p-5 space-y-4"
                    >
                      {/* City & Country */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{trip.country.flag}</span>
                          <div>
                            <p className="text-sm text-white font-semibold leading-tight">
                              {trip.city.name}
                            </p>
                            <p className="text-white/50 text-xs mt-0.5">
                              {trip.country.name}
                            </p>
                          </div>
                        </div>

                        {countdown && (
                          <span
                            className={`text-xs font-medium px-3 py-1.5 rounded-full ${
                              countdown === "Termin\u00e9"
                                ? "bg-white/10 text-white/40"
                                : countdown === "En cours"
                                  ? "bg-emerald-500/20 text-emerald-400"
                                  : "bg-blue-500/20 text-blue-400"
                            }`}
                          >
                            {countdown}
                          </span>
                        )}
                      </div>

                      {/* Date inputs */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-white/40 text-xs flex items-center gap-1.5">
                            <Calendar size={12} />
                            D&eacute;part
                          </label>
                          <input
                            type="date"
                            value={trip.dateStart || ""}
                            onChange={(e) =>
                              onUpdateTrip({
                                ...trip,
                                dateStart: e.target.value || undefined,
                              })
                            }
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30 transition-colors [color-scheme:dark]"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-white/40 text-xs flex items-center gap-1.5">
                            <Calendar size={12} />
                            Retour
                          </label>
                          <input
                            type="date"
                            value={trip.dateEnd || ""}
                            onChange={(e) =>
                              onUpdateTrip({
                                ...trip,
                                dateEnd: e.target.value || undefined,
                              })
                            }
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30 transition-colors [color-scheme:dark]"
                          />
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-1">
                        <button
                          onClick={() => onOpenSlack(trip)}
                          className="flex items-center gap-2 text-xs px-4 py-2.5 rounded-lg bg-violet-500/10 text-violet-400 hover:bg-violet-500/20 transition-colors cursor-pointer"
                        >
                          <MessageSquare size={13} />
                          Message Slack
                        </button>
                        {isConfirmingDelete ? (
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-white/50">
                              Supprimer ?
                            </span>
                            <button
                              onClick={() => {
                                onDeleteTrip(trip.id);
                                setConfirmDeleteId(null);
                              }}
                              className="text-xs px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors cursor-pointer"
                            >
                              Oui
                            </button>
                            <button
                              onClick={() => setConfirmDeleteId(null)}
                              className="text-xs px-4 py-2 rounded-lg bg-white/5 text-white/50 hover:bg-white/10 transition-colors cursor-pointer"
                            >
                              Non
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setConfirmDeleteId(trip.id)}
                            className="p-2.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
