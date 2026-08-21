import React, { useState, useEffect } from 'react';
import { Building2, Phone, Calendar, Menu, X, Shield, Sparkles, Warehouse, FileSpreadsheet } from 'lucide-react';
import { COMPANY_INFO } from '../data/properties';

interface NavbarProps {
  onOpenBooking: (propertyId?: string) => void;
  onOpenWebhookSettings?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenWebhookSettings }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Trang Chủ', href: '#home' },
    { name: 'Giới Thiệu', href: '#about' },
    { name: 'Bất Động Sản Cho Thuê', href: '#properties' },
    { name: 'Bảng Giá & Thông Số', href: '#specs' },
    { name: 'Ưu Đãi Tháng', href: '#promotions' },
    { name: 'Thế Mạnh', href: '#why-us' },
    { name: 'Vị Trí & Bản Đồ', href: '#location-map' },
    { name: 'Liên Hệ', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#243457]/95 shadow-xl backdrop-blur-md py-3 border-b border-[#324978]/40'
          : 'bg-[#243457] py-4 border-b border-white/10'
      }`}
    >
      {/* Top mini-bar for trust markers */}
      <div className="hidden lg:block border-b border-white/10 pb-2 mb-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-xs text-slate-300">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-amber-300 font-medium">
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              100% Bất Động Sản & Kho Bãi Chính Chủ
            </span>
            <span className="text-slate-400">|</span>
            <span>Trụ sở: 140B Nguyễn Văn Trỗi, P.8, Q.Phú Nhuận, TP.HCM</span>
            <span className="text-slate-400">|</span>
            <span className="text-emerald-400 font-medium flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Ưu đãi miễn phí 15-45 ngày tiền thuê
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            {onOpenWebhookSettings && (
              <button
                onClick={onOpenWebhookSettings}
                className="text-emerald-300 hover:text-emerald-200 font-medium flex items-center gap-1 cursor-pointer bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30"
              >
                <FileSpreadsheet className="w-3 h-3 text-emerald-300" />
                <span>Google Sheet API</span>
              </button>
            )}
            <span className="text-slate-400">|</span>
            <span className="text-slate-300">Email: {COMPANY_INFO.email}</span>
            <span className="text-slate-400">|</span>
            <span className="text-amber-200 font-medium">Làm việc: 8:00 - 18:30 (Cả T7 & CN)</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#home" className="flex items-center gap-3 group text-decoration-none">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300 border border-amber-300/30">
            <Building2 className="w-6 h-6 text-[#162238]" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold tracking-tight text-white uppercase font-serif">
                Trường Thịnh
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/40">
                INVEST
              </span>
            </div>
            <span className="text-[10px] tracking-wider text-slate-300 uppercase font-medium">
              Văn Phòng & Kho Bãi Chính Chủ
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-200 hover:text-amber-300 transition-colors duration-200 relative group py-1"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-300 group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
        </nav>

        {/* Action CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Quick Hotline Button */}
          <a
            href={`tel:${COMPANY_INFO.hotlineRaw}`}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-600/50 text-white transition-all duration-200 shadow-sm group"
          >
            <div className="w-7 h-7 rounded-full bg-red-600 text-white flex items-center justify-center group-hover:animate-pulse">
              <Phone className="w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[10px] text-slate-400 uppercase font-semibold leading-tight">Hotline 24/7</span>
              <span className="text-sm font-bold text-amber-300 tracking-wide leading-tight">
                {COMPANY_INFO.hotline}
              </span>
            </div>
          </a>

          {/* Book Tour CTA */}
          <button
            onClick={() => onOpenBooking()}
            className="glow-btn flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-[#162238] font-bold text-sm shadow-lg shadow-amber-500/25 transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Đặt Lịch Xem</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 xl:hidden">
          <a
            href={`tel:${COMPANY_INFO.hotlineRaw}`}
            className="sm:hidden p-2 rounded-lg bg-red-600 text-white"
            title="Gọi ngay hotline"
          >
            <Phone className="w-4 h-4" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#1a2640] border-t border-slate-700/80 px-4 pt-3 pb-6 space-y-3 mt-2 shadow-2xl animate-in slide-in-from-top">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-md text-sm font-medium text-slate-200 hover:text-amber-300 hover:bg-white/5 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-700 flex flex-col gap-2.5">
            <a
              href={`tel:${COMPANY_INFO.hotlineRaw}`}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md"
            >
              <Phone className="w-4 h-4" />
              <span>Gọi Hotline: {COMPANY_INFO.hotline}</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-amber-400 hover:bg-amber-300 text-[#162238] font-bold text-sm shadow-lg shadow-amber-500/20"
            >
              <Calendar className="w-4 h-4" />
              <span>Đặt Lịch Xem Mặt Bằng</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
