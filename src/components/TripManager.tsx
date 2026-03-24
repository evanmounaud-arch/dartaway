"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Calendar, MessageSquare, MapPin } from "lucide-react";
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

  if (end && now > end) return "Terminé";
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
            className="fixed top-0 right-0 z-50 h-full w-full sm:w-[460px] bg-black/95 backdrop-blur-xl border-l border-white/10 flex flex-col shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between border-b border-white/10"
              style={{ padding: "24px 28px" }}
            >
              <div className="flex items-center" style={{ gap: "12px" }}>
                <div
                  className="rounded-xl bg-gradient-to-r from-violet-600 to-orange-500 flex items-center justify-center"
                  style={{ width: "36px", height: "36px" }}
                >
                  <MapPin size={18} className="text-white" />
                </div>
                <h2 className="text-lg font-bold text-white">Mes voyages</h2>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                style={{ padding: "10px" }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div
              className="flex-1 overflow-y-auto"
              style={{ padding: "24px 28px" }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {sortedTrips.length === 0 ? (
                  <div className="flex flex-col items-center justify-center text-white/50 text-center" style={{ gap: "16px", paddingTop: "80px" }}>
                    <span style={{ fontSize: "48px" }}>🎯</span>
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
                        className="rounded-2xl border border-white/10 bg-white/[0.03]"
                        style={{ padding: "24px" }}
                      >
                        {/* City & Country header */}
                        <div className="flex items-center justify-between" style={{ marginBottom: "20px" }}>
                          <div className="flex items-center" style={{ gap: "14px" }}>
                            <span style={{ fontSize: "32px" }}>{trip.country.flag}</span>
                            <div>
                              <p className="text-white font-bold" style={{ fontSize: "16px" }}>
                                {trip.city.name}
                              </p>
                              <p className="text-white/40" style={{ fontSize: "13px", marginTop: "2px" }}>
                                {trip.country.name}
                              </p>
                            </div>
                          </div>

                          {countdown && (
                            <span
                              className={`font-medium rounded-full ${
                                countdown === "Terminé"
                                  ? "bg-white/10 text-white/40"
                                  : countdown === "En cours"
                                    ? "bg-emerald-500/20 text-emerald-400"
                                    : "bg-blue-500/20 text-blue-400"
                              }`}
                              style={{ fontSize: "12px", padding: "6px 14px" }}
                            >
                              {countdown}
                            </span>
                          )}
                        </div>

                        {/* Date inputs */}
                        <div
                          className="rounded-xl bg-white/[0.03] border border-white/5"
                          style={{ padding: "16px", marginBottom: "16px" }}
                        >
                          <div className="flex items-center" style={{ gap: "8px", marginBottom: "12px" }}>
                            <Calendar size={14} className="text-white/30" />
                            <span className="text-white/40 font-medium" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                              Dates du voyage
                            </span>
                          </div>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                            <div>
                              <label className="text-white/30" style={{ fontSize: "11px", display: "block", marginBottom: "6px" }}>
                                Départ
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
                                className="w-full bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-violet-500/50 transition-colors [color-scheme:dark]"
                                style={{ padding: "10px 14px", fontSize: "13px" }}
                              />
                            </div>
                            <div>
                              <label className="text-white/30" style={{ fontSize: "11px", display: "block", marginBottom: "6px" }}>
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
                                className="w-full bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-violet-500/50 transition-colors [color-scheme:dark]"
                                style={{ padding: "10px 14px", fontSize: "13px" }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Action buttons — full width, prominent */}
                        <div style={{ display: "flex", gap: "10px" }}>
                          <button
                            onClick={() => onOpenSlack(trip)}
                            className="flex-1 flex items-center justify-center rounded-xl bg-violet-500/15 text-violet-400 font-medium hover:bg-violet-500/25 transition-colors cursor-pointer"
                            style={{ padding: "12px 16px", gap: "8px", fontSize: "13px" }}
                          >
                            <MessageSquare size={15} />
                            Message Slack
                          </button>
                          {isConfirmingDelete ? (
                            <div className="flex items-center" style={{ gap: "8px" }}>
                              <span className="text-white/40" style={{ fontSize: "12px" }}>
                                Supprimer ?
                              </span>
                              <button
                                onClick={() => {
                                  onDeleteTrip(trip.id);
                                  setConfirmDeleteId(null);
                                }}
                                className="rounded-xl bg-red-500/20 text-red-400 font-medium hover:bg-red-500/30 transition-colors cursor-pointer"
                                style={{ padding: "12px 20px", fontSize: "13px" }}
                              >
                                Oui
                              </button>
                              <button
                                onClick={() => setConfirmDeleteId(null)}
                                className="rounded-xl bg-white/5 text-white/50 hover:bg-white/10 transition-colors cursor-pointer"
                                style={{ padding: "12px 20px", fontSize: "13px" }}
                              >
                                Non
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setConfirmDeleteId(trip.id)}
                              className="flex items-center justify-center rounded-xl bg-red-500/10 text-red-400/60 hover:text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
                              style={{ padding: "12px 16px", gap: "8px", fontSize: "13px" }}
                            >
                              <Trash2 size={15} />
                            </button>
                          )}
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
