"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, RefreshCw } from "lucide-react";
import type { Trip } from "@/app/page";

interface SlackMessageGeneratorProps {
  trip: Trip | null;
  isOpen: boolean;
  onClose: () => void;
}

const messageTemplates = [
  `Salut boss ! 🎯 J'ai lancé une fléchette sur un globe et elle a atterri sur {city}, {country} {flag}. Le destin a parlé, je peux pas lutter. Du {dateStart} au {dateEnd}, je serai en mission d'exploration culturelle intensive. Promis je ramène des souvenirs.`,

  `Hey ! Tu savais que {city} est magnifique en ce moment ? Moi non plus avant de lancer cette fléchette. Bref, {dateStart} → {dateEnd}, je fais mon devoir de citoyen du monde. {flag}`,

  `Bonjour ! Suite à une étude approfondie (j'ai lancé une fléchette les yeux fermés), il s'avère que {city} en {country} {flag} nécessite ma présence du {dateStart} au {dateEnd}. C'est scientifique, on ne discute pas avec la science. 🔬`,

  `Hello ! Je t'écris pour te prévenir que du {dateStart} au {dateEnd}, je serai porté disparu. Dernière localisation connue : {city}, {country} {flag}. Ne lancez pas les recherches, je reviendrai. Probablement. 🕵️`,

  `Cher manager, une fléchette a décidé de mon avenir immédiat : {city}, {country} {flag}. Du {dateStart} au {dateEnd}, considère-moi comme un ambassadeur officieux de la boîte à l'international. Je mettrai le logo en photo de profil si tu veux. 🌍`,

  `Urgent 🚨 Ma fléchette vient d'atterrir sur {city}, {country} {flag}. Les billets sont pas chers, le karma est aligné, et mon agenda du {dateStart} au {dateEnd} est mystérieusement vide. Coïncidence ? Je ne crois pas.`,

  `Breaking news : le bureau de {city} a besoin de renfort du {dateStart} au {dateEnd}. Quoi, on n'a pas de bureau à {city} ? Bon bah je vais quand même vérifier sur place. {flag} Pour la rigueur professionnelle, tu comprends.`,

  `Yo ! J'ai fait un deal avec l'univers : si ma fléchette touche un pays cool, j'y vais. Résultat : {city}, {country} {flag}. L'univers a parlé. Du {dateStart} au {dateEnd}, je suis en congé cosmique. ✨`,
];

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function generateMessage(trip: Trip, templateIndex: number): string {
  const template = messageTemplates[templateIndex % messageTemplates.length];
  return template
    .replace(/{city}/g, trip.city.name)
    .replace(/{country}/g, trip.country.name)
    .replace(/{flag}/g, trip.country.flag)
    .replace(/{dateStart}/g, trip.dateStart ? formatDate(trip.dateStart) : "???")
    .replace(/{dateEnd}/g, trip.dateEnd ? formatDate(trip.dateEnd) : "???");
}

export default function SlackMessageGenerator({
  trip,
  isOpen,
  onClose,
}: SlackMessageGeneratorProps) {
  const [templateIndex, setTemplateIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const hasDates = trip?.dateStart && trip?.dateEnd;

  const message = trip ? generateMessage(trip, templateIndex) : "";

  const regenerate = useCallback(() => {
    setTemplateIndex((prev) => {
      let next: number;
      do {
        next = Math.floor(Math.random() * messageTemplates.length);
      } while (next === prev && messageTemplates.length > 1);
      return next;
    });
  }, []);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = message;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [message]);

  return (
    <AnimatePresence>
      {isOpen && trip && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
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
            className="relative z-10 w-full max-w-lg rounded-2xl border border-white/10 bg-black/80 backdrop-blur-xl p-9 shadow-2xl"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 rounded-full p-1.5 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-white">
                💬 Message Slack
              </h2>
              <p className="mt-1.5 text-sm text-white/50">
                Un message tout prêt pour demander tes congés
              </p>
            </div>

            {!hasDates ? (
              /* Warning: no dates */
              <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-5 text-center">
                <p className="text-sm font-medium text-amber-300">
                  ⚠️ Ajoutez des dates à votre voyage d&apos;abord !
                </p>
              </div>
            ) : (
              <>
                {/* Message display */}
                <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <textarea
                    readOnly
                    value={message}
                    className="w-full resize-none bg-transparent text-sm leading-relaxed text-white/90 outline-none"
                    rows={7}
                  />
                </div>

                {/* Actions */}
                <div className="mt-5 flex items-center gap-4">
                  <button
                    onClick={regenerate}
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-xs font-medium text-white/80 transition-all hover:bg-white/10 hover:text-white active:scale-95 cursor-pointer"
                  >
                    <RefreshCw size={14} />
                    🎲 Régénérer
                  </button>

                  <button
                    onClick={copyToClipboard}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3 text-xs font-medium transition-all active:scale-95 cursor-pointer ${
                      copied
                        ? "border border-emerald-500/30 bg-emerald-500/20 text-emerald-300"
                        : "bg-white/15 text-white hover:bg-white/20"
                    }`}
                  >
                    <Copy size={14} />
                    {copied ? "Copié !" : "Copier"}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
