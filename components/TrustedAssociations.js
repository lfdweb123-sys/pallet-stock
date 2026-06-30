// components/TrustedAssociations.js
import { useEffect, useRef } from 'react';

const ASSOCIATIONS = [
  { name: 'Ecommerce Europe', country: 'EU' },
  { name: 'FEVAD', country: 'FR' },
  { name: 'Netcomm', country: 'IT' },
  { name: 'bevh', country: 'DE' },
  { name: 'Becom', country: 'BE' },
  { name: 'Adigital', country: 'ES' },
  { name: 'Thuiswinkel.org', country: 'NL' },
  { name: 'Digital Commerce Finland', country: 'FI' },
  { name: 'Dansk Erhverv', country: 'DK' },
  { name: 'Svensk Handel', country: 'SE' },
  { name: 'Virke', country: 'NO' },
  { name: 'Eesti E-kaubanduse Liit', country: 'EE' },
  { name: 'APEK', country: 'CZ' },
  { name: 'GR.EC.A', country: 'GR' },
  { name: 'Handelsverband Österreich', country: 'AT' },
  { name: 'Swiss Online Garantie', country: 'CH' },
];

export default function TrustedAssociations({ title }) {
  const trackRef = useRef(null);

  // Défilement automatique infini (CSS-driven, pas de re-render JS)
  return (
    <section className="bg-paper border-t border-ink/8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <p className="font-mono text-[11px] uppercase tracking-wide text-slate text-center mb-8">
          {title}
        </p>

        <div className="relative overflow-hidden">
          {/* Fondus sur les bords */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-paper to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-paper to-transparent z-10" />

          <div ref={trackRef} className="flex items-center gap-3 sm:gap-4 animate-scroll-x w-max">
            {[...ASSOCIATIONS, ...ASSOCIATIONS].map((assoc, i) => (
              <div
                key={`${assoc.name}-${i}`}
                className="flex-shrink-0 flex items-center gap-2 border border-ink/10 rounded-sm px-4 py-2.5 bg-white hover:border-signal/40 transition-colors"
              >
                <span className="font-mono text-[10px] font-bold text-signal border border-signal/30 rounded-sm px-1.5 py-0.5 leading-none">
                  {assoc.country}
                </span>
                <span className="font-display text-xs font-semibold text-ink whitespace-nowrap">
                  {assoc.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes scroll-x {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-scroll-x {
          animation: scroll-x 40s linear infinite;
        }
        .animate-scroll-x:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}