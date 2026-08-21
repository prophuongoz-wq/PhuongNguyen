import React, { useState, useEffect } from 'react';
import { Phone, Calendar, MessageCircle, ArrowUp } from 'lucide-react';
import { COMPANY_INFO } from '../data/properties';

interface FloatingActionsProps {
  onOpenBooking: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onOpenBooking }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 pointer-events-auto">
      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="w-11 h-11 rounded-full bg-slate-800 text-white shadow-xl hover:bg-slate-700 flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer border border-slate-600"
          aria-label="Lên đầu trang"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Quick Schedule Tour Button */}
      <button
        onClick={onOpenBooking}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 text-[#162238] font-extrabold text-xs shadow-2xl hover:scale-105 active:scale-95 transition-all border border-amber-300 cursor-pointer"
      >
        <Calendar className="w-4 h-4" />
        <span className="hidden sm:inline">Đặt Lịch Xem</span>
      </button>

      {/* Zalo Button */}
      <a
        href={`https://zalo.me/${COMPANY_INFO.hotlineRaw}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-13 h-13 rounded-full bg-[#0068FF] text-white shadow-xl hover:scale-110 active:scale-95 flex items-center justify-center transition-all relative group border-2 border-white"
        title="Chat Zalo ngay"
      >
        <span className="font-extrabold text-xs tracking-tighter">Zalo</span>
        <span className="absolute right-full mr-2.5 px-2.5 py-1 rounded-lg bg-slate-900 text-white text-[11px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
          Chat Zalo với CĐT
        </span>
      </a>

      {/* Hotline Click to Call with Pulse Glow */}
      <a
        href={`tel:${COMPANY_INFO.hotlineRaw}`}
        className="w-13 h-13 rounded-full bg-red-600 text-white shadow-2xl hover:scale-110 active:scale-95 flex items-center justify-center transition-all relative group border-2 border-white glow-btn"
        title={`Gọi Hotline ${COMPANY_INFO.hotline}`}
      >
        <Phone className="w-6 h-6 animate-pulse" />
        <span className="absolute right-full mr-2.5 px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
          Gọi {COMPANY_INFO.hotline}
        </span>
      </a>
    </div>
  );
};
