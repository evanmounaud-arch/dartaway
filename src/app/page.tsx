"use client";

import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Plane } from "lucide-react";
import confetti from "canvas-confetti";
import Globe3D, { Globe3DRef } from "@/components/Globe3D";
import CityPickerModal from "@/components/CityPickerModal";
import CityGuideModal from "@/components/CityGuideModal";
import TripManager from "@/components/TripManager";
import TravelStats from "@/components/TravelStats";
import SlackMessageGenerator from "@/components/SlackMessageGenerator";
import { getCountryByCode, getRandomCountry } from "@/data/destinations";
import type { Country, City } from "@/data/destinations";

export interface Trip {
  id: string;
  city: City;
  country: Country;
  dateStart?: string;
  dateEnd?: string;
  createdAt: string;
}

export default function Home() {
  const globeRef = useRef<Globe3DRef>(null);
  const [isThrowing, setIsThrowing] = useState(false);

  // Modal state
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [showCityPicker, setShowCityPicker] = useState(false);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [showCityGuide, setShowCityGuide] = useState(false);
  const [showTripManager, setShowTripManager] = useState(false);
  const [slackTrip, setSlackTrip] = useState<Trip | null>(null);
  const [dartPhase, setDartPhase] = useState<"idle" | "flying" | "impact">("idle");

  // Toast
  const [toast, setToast] = useState<string | null>(null);

  // Trips
  const [trips, setTrips] = useState<Trip[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem("dartaway-trips") || "[]");
    } catch {
      return [];
    }
  });

  const saveTrips = (newTrips: Trip[]) => {
    setTrips(newTrips);
    localStorage.setItem("dartaway-trips", JSON.stringify(newTrips));
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const fireConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#7c3aed", "#f97316", "#a78bfa", "#fb923c", "#c084fc"],
    });
  };

  const openCountry = useCallback((country: Country) => {
    setSelectedCountry(country);
    setShowCityPicker(true);
  }, []);

  const handleCountryClick = useCallback(
    (countryCode: string, countryName: string) => {
      const country = getCountryByCode(countryCode);
      if (country) {
        globeRef.current?.spinAndZoom(country.lat, country.lng);
        setTimeout(() => openCountry(country), 1600);
      } else {
        showToast(`${countryName} n'est pas encore disponible`);
      }
    },
    [openCountry]
  );

  const handleThrowDart = () => {
    if (isThrowing) return;
    setIsThrowing(true);

    const country = getRandomCountry();

    // Phase 1: dart flies (0-1.2s) — globe spins fast simultaneously
    setDartPhase("flying");
    globeRef.current?.spinAndZoom(country.lat, country.lng);

    // Phase 2: impact flash (1.2s)
    setTimeout(() => {
      setDartPhase("impact");
    }, 1200);

    // Phase 3: clean up, open modal (3.5s)
    setTimeout(() => {
      setDartPhase("idle");
      setIsThrowing(false);
      openCountry(country);
    }, 3500);
  };

  const handleSelectCity = (city: City) => {
    setSelectedCity(city);
    setShowCityPicker(false);
    setShowCityGuide(true);
  };

  const handleBackToCityPicker = () => {
    setShowCityGuide(false);
    setSelectedCity(null);
    setShowCityPicker(true);
  };

  const handleValidateTrip = (city: City, country: Country) => {
    const newTrip: Trip = {
      id: crypto.randomUUID(),
      city,
      country,
      createdAt: new Date().toISOString(),
    };
    saveTrips([...trips, newTrip]);
    setShowCityGuide(false);
    setSelectedCity(null);
    setSelectedCountry(null);
    fireConfetti();
    showToast(`${city.name}, ${country.name} ajouté à vos voyages !`);
  };

  const handleCloseCityPicker = () => {
    setShowCityPicker(false);
    setSelectedCountry(null);
  };

  const handleCloseCityGuide = () => {
    setShowCityGuide(false);
    setSelectedCity(null);
    setSelectedCountry(null);
  };

  const handleUpdateTrip = (updatedTrip: Trip) => {
    const newTrips = trips.map((t) => (t.id === updatedTrip.id ? updatedTrip : t));
    saveTrips(newTrips);
  };

  const handleDeleteTrip = (tripId: string) => {
    saveTrips(trips.filter((t) => t.id !== tripId));
    showToast("Voyage supprimé");
  };

  return (
    <div className="relative h-screen w-screen bg-black overflow-hidden">
      {/* Globe */}
      <Globe3D ref={globeRef} onCountryClick={handleCountryClick} />

      {/* Travel Stats */}
      <TravelStats trips={trips} />

      {/* Title overlay */}
      <div className="absolute top-8 left-8 z-10">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-bold tracking-tight bg-gradient-to-r from-violet-400 via-purple-400 to-orange-400 bg-clip-text text-transparent"
        >
          DartAway
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-xs text-white/50 mt-0.5"
        >
          Throw a dart, find your next trip
        </motion.p>
      </div>

      {/* My Trips button */}
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        onClick={() => setShowTripManager(true)}
        className="absolute top-8 right-8 z-10 flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/80 hover:bg-white/20 hover:text-white transition-all cursor-pointer"
        style={{ padding: "12px 24px" }}
      >
        <Plane size={15} />
        <span className="text-xs font-medium">Mes voyages ({trips.length})</span>
      </motion.button>

      {/* Throw Dart button */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleThrowDart}
          disabled={isThrowing}
          className="flex items-center gap-3 rounded-full bg-gradient-to-r from-violet-600 to-orange-500 text-white font-semibold text-sm shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          style={{ padding: "16px 48px" }}
        >
          <MapPin size={18} />
          {isThrowing ? "En vol..." : "Lancer la fléchette"}
        </motion.button>
      </div>

      {/* Dart throw animation */}
      <AnimatePresence>
        {dartPhase === "flying" && (
          <motion.div
            className="fixed inset-0 z-30 pointer-events-none"
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            {/* Dart — starts from bottom center, arcs toward the globe */}
            <motion.div
              className="absolute text-5xl"
              style={{
                left: "50%",
                bottom: "80px",
                marginLeft: "-24px",
                filter: "drop-shadow(0 0 20px rgba(124, 58, 237, 0.9))",
              }}
              animate={{
                y: [0, -150, -(typeof window !== "undefined" ? window.innerHeight * 0.45 : 400)],
                x: [0, -40, 0],
                scale: [1.6, 1.3, 0.4],
                opacity: [1, 1, 0.3],
                rotate: [-45, -25, 10],
              }}
              transition={{
                duration: 1.1,
                ease: [0.25, 0.46, 0.45, 0.94],
                times: [0, 0.4, 1],
              }}
            >
              🎯
            </motion.div>

            {/* Trail particles */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  left: "50%",
                  bottom: "100px",
                  width: "6px",
                  height: "6px",
                  background: i % 2 === 0 ? "#7c3aed" : "#f97316",
                }}
                animate={{
                  y: [0, -80 - i * 40, -(typeof window !== "undefined" ? window.innerHeight * 0.35 : 300) + i * 20],
                  x: [0, -20 + i * 10, (i - 2) * 15],
                  opacity: [0, 0.8, 0],
                  scale: [0.5, 1, 0],
                }}
                transition={{
                  duration: 1.0,
                  delay: i * 0.05,
                  ease: "easeOut",
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Impact flash */}
      <AnimatePresence>
        {dartPhase === "impact" && (
          <motion.div
            className="fixed inset-0 z-30 pointer-events-none flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="w-6 h-6 rounded-full bg-orange-400"
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: [0, 6, 0], opacity: [0.8, 0.4, 0] }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{ boxShadow: "0 0 60px 30px rgba(249,115,22,0.5), 0 0 100px 50px rgba(124,58,237,0.3)" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-28 left-1/2 -translate-x-1/2 z-50 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium"
            style={{ padding: "12px 24px" }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* City Picker Modal */}
      <CityPickerModal
        country={selectedCountry}
        isOpen={showCityPicker}
        onClose={handleCloseCityPicker}
        onSelectCity={handleSelectCity}
      />

      {/* City Guide Modal */}
      <CityGuideModal
        city={selectedCity}
        country={selectedCountry}
        isOpen={showCityGuide}
        onClose={handleCloseCityGuide}
        onValidate={handleValidateTrip}
        onBack={handleBackToCityPicker}
      />

      {/* Trip Manager Panel */}
      <TripManager
        trips={trips}
        isOpen={showTripManager}
        onClose={() => setShowTripManager(false)}
        onUpdateTrip={handleUpdateTrip}
        onDeleteTrip={handleDeleteTrip}
        onOpenSlack={(trip) => setSlackTrip(trip)}
      />

      {/* Slack Message Generator */}
      <SlackMessageGenerator
        trip={slackTrip}
        isOpen={!!slackTrip}
        onClose={() => setSlackTrip(null)}
      />
    </div>
  );
}
