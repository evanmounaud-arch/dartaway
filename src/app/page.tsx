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
  const [showDartAnimation, setShowDartAnimation] = useState(false);

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
        showToast(`${countryName} n'est pas encore disponible 🌍`);
      }
    },
    [openCountry]
  );

  const handleThrowDart = () => {
    if (isThrowing) return;
    setIsThrowing(true);
    setShowDartAnimation(true);

    const country = getRandomCountry();

    // Dart flies for 1s, then globe spins
    setTimeout(() => {
      setShowDartAnimation(false);
      globeRef.current?.spinAndZoom(country.lat, country.lng);
    }, 1000);

    setTimeout(() => {
      setIsThrowing(false);
      openCountry(country);
    }, 4000);
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
    showToast(`${city.name}, ${country.name} ajouté à vos voyages ! 🎉`);
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
        className="absolute top-8 right-8 z-10 flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/80 hover:bg-white/20 hover:text-white transition-all cursor-pointer"
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
          className="flex items-center justify-center gap-3 px-12 py-4 rounded-full bg-gradient-to-r from-violet-600 to-orange-500 text-white font-semibold text-sm shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <MapPin size={16} />
          {isThrowing ? "En vol..." : "Lancer la fléchette"}
        </motion.button>
      </div>

      {/* Dart throw animation — arc from bottom button toward globe center */}
      <AnimatePresence>
        {showDartAnimation && (
          <motion.div
            className="fixed inset-0 z-30 pointer-events-none"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          >
            {/* Dart emoji flying in an arc */}
            <motion.div
              className="absolute text-4xl"
              style={{
                left: "50%",
                bottom: 0,
                marginLeft: "-20px",
                filter: "drop-shadow(0 0 16px rgba(124, 58, 237, 0.8))",
              }}
              initial={{ y: 0, x: 0, scale: 1.5, opacity: 1, rotate: -45 }}
              animate={{
                y: [0, -200, -window.innerHeight / 2 + 40],
                x: [0, -30, 0],
                scale: [1.5, 1.2, 0.6],
                opacity: [1, 1, 0],
                rotate: [-45, -20, 0],
              }}
              transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
                times: [0, 0.5, 1],
              }}
            >
              🎯
            </motion.div>
            {/* Impact flash at globe center */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-orange-400"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 8, 0], opacity: [0, 0.6, 0] }}
              transition={{ delay: 0.75, duration: 0.5, ease: "easeOut" }}
              style={{ boxShadow: "0 0 40px 20px rgba(249,115,22,0.4)" }}
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
            className="fixed bottom-28 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium"
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
