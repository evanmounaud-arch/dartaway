"use client";

import { motion } from "framer-motion";
import { Globe, MapPin, Compass, Ruler } from "lucide-react";
import type { Trip } from "@/app/page";

interface TravelStatsProps {
  trips: Trip[];
}

function getUniqueCountries(trips: Trip[]): number {
  return new Set(trips.map((t) => t.country.code)).size;
}

function getUniqueContinents(trips: Trip[]): number {
  return new Set(trips.map((t) => t.country.continent)).size;
}

function getUniqueCities(trips: Trip[]): number {
  return new Set(trips.map((t) => t.city.id)).size;
}

// Rough distance from Paris (reference point) to each city in km
function estimateTotalKm(trips: Trip[]): number {
  const R = 6371;
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  let total = 0;
  for (const trip of trips) {
    const lat1 = toRad(48.86); // Paris
    const lng1 = toRad(2.35);
    const lat2 = toRad(trip.city.lat);
    const lng2 = toRad(trip.city.lng);
    const dlat = lat2 - lat1;
    const dlng = lng2 - lng1;
    const a = Math.sin(dlat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlng / 2) ** 2;
    total += 2 * R * Math.asin(Math.sqrt(a));
  }
  return Math.round(total);
}

function formatKm(km: number): string {
  if (km >= 1000) return `${(km / 1000).toFixed(1)}k`;
  return `${km}`;
}

const stats = [
  { key: "countries", icon: Globe, label: "Pays", color: "text-violet-400" },
  { key: "cities", icon: MapPin, label: "Villes", color: "text-orange-400" },
  { key: "continents", icon: Compass, label: "Continents", color: "text-emerald-400" },
  { key: "km", icon: Ruler, label: "km", color: "text-sky-400" },
] as const;

export default function TravelStats({ trips }: TravelStatsProps) {
  if (trips.length === 0) return null;

  const values: Record<string, number | string> = {
    countries: getUniqueCountries(trips),
    cities: getUniqueCities(trips),
    continents: getUniqueContinents(trips),
    km: formatKm(estimateTotalKm(trips)),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute top-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10"
    >
      {stats.map(({ key, icon: Icon, label, color }) => (
        <div key={key} className="flex items-center gap-1">
          <Icon size={12} className={color} />
          <span className="text-white font-semibold text-xs">{values[key]}</span>
          <span className="text-white/40 text-[10px]">{label}</span>
        </div>
      ))}
    </motion.div>
  );
}
