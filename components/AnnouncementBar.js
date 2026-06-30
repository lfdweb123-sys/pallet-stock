// components/AnnouncementBar.js
import { useState, useEffect } from 'react';
import { useLocale } from '../lib/locale-context';

export default function AnnouncementBar() {
  const { t } = useLocale();
  const [visible, setVisible] = useState(true);

  // Mémorise la fermeture pour la session du navigateur
  useEffect(() => {
    const dismissed = sessionStorage.getItem('announceDismissed');
    if (dismissed === '1') setVisible(false);
  }, []);

  function handleClose() {
    setVisible(false);
    sessionStorage.setItem('announceDismissed', '1');
  }

  if (!visible) return null;

  const messages = [t('announce_shipping'), t('announce_refund')];
  // On répète la liste pour un défilement fluide et continu
  const loopMessages = [...messages, ...messages, ...messages, ...messages];

  return (
    <div className="relative bg-signal text-white overflow-hidden h-8 flex items-center">
      <div className="flex-1 overflow-hidden">
        <div className="flex items-center gap-10 animate-marquee w-max whitespace-nowrap">
          {loopMessages.map((msg, i) => (
            <span key={i} className="font-mono text-[11px] sm:text-xs font-medium tracking-wide flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 13l4 4L19 7" />
              </svg>
              {msg}
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={handleClose}
        aria-label="Fermer"
        className="flex-shrink-0 px-3 h-full flex items-center hover:bg-black/10 transition-colors"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
        </svg>
      </button>

      <style jsx global>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 18s linear infinite;
        }
      `}</style>
    </div>
  );
}