import React, { useState, useEffect } from 'react';
import { Gift, Clock, Sparkles, CheckCircle2, ArrowRight, Building2, Warehouse, Percent } from 'lucide-react';
import { SPECIAL_PROMOTIONS_THIS_MONTH } from '../data/properties';

interface PromotionBannerProps {
  onOpenBooking: (propertyId?: string) => void;
}

export const PromotionBanner: React.FC<PromotionBannerProps> = ({ onOpenBooking }) => {
  // Live countdown timer for the end of the month
  const [timeLeft, setTimeLeft] = useState({
    days: 12,
    hours: 18,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="promotions" className="py-16 bg-[#1b2844] text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(197,168,128,0.15),transparent_70%)]" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Banner Top Title & Countdown */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-10 border-b border-slate-700/80 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
              <Gift className="w-3.5 h-3.5 text-amber-400" />
              <span>Chương Trình Kích Cầu Doanh Nghiệp</span>
            </div>
            <h2 
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight"
              style={{ fontFamily: "'Times New Roman', Times, serif" }}
            >
              Ưu Đãi Thuê Mặt Bằng & Tổng Kho Trong Tháng Này
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-1">
              Chính sách hỗ trợ lớn nhất năm từ Trường Thịnh Invest dành riêng cho khách hàng ký hợp đồng mới.
            </p>
          </div>

          {/* Countdown Clock Box */}
          <div className="bg-slate-900/80 border border-amber-500/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 self-start lg:self-auto shadow-xl">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold uppercase tracking-wider">
              <Clock className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Ưu đãi áp dụng còn:</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-center justify-center w-12 h-12 bg-[#243457] rounded-xl border border-amber-400/30">
                <span className="text-lg font-bold text-amber-300 font-serif leading-none">
                  {String(timeLeft.days).padStart(2, '0')}
                </span>
                <span className="text-[9px] text-slate-400 uppercase mt-0.5">Ngày</span>
              </div>
              <span className="text-amber-400 font-bold">:</span>
              <div className="flex flex-col items-center justify-center w-12 h-12 bg-[#243457] rounded-xl border border-amber-400/30">
                <span className="text-lg font-bold text-amber-300 font-serif leading-none">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[9px] text-slate-400 uppercase mt-0.5">Giờ</span>
              </div>
              <span className="text-amber-400 font-bold">:</span>
              <div className="flex flex-col items-center justify-center w-12 h-12 bg-[#243457] rounded-xl border border-amber-400/30">
                <span className="text-lg font-bold text-amber-300 font-serif leading-none">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[9px] text-slate-400 uppercase mt-0.5">Phút</span>
              </div>
              <span className="text-amber-400 font-bold">:</span>
              <div className="flex flex-col items-center justify-center w-12 h-12 bg-[#243457] rounded-xl border border-amber-400/30">
                <span className="text-lg font-bold text-amber-300 font-serif leading-none">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[9px] text-slate-400 uppercase mt-0.5">Giây</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2 Special Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SPECIAL_PROMOTIONS_THIS_MONTH.map((promo, idx) => (
            <div
              key={idx}
              className="bg-slate-800/70 border border-slate-700 hover:border-amber-400/50 rounded-2xl p-6 sm:p-7 flex flex-col justify-between backdrop-blur-sm relative group transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
                    {promo.badge}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-amber-400/20 flex items-center justify-center text-amber-300">
                    {promo.icon === 'Building2' ? <Building2 className="w-5 h-5" /> : <Warehouse className="w-5 h-5" />}
                  </div>
                </div>

                <div>
                  <h3 
                    className="text-xl sm:text-2xl font-bold text-white group-hover:text-amber-300 transition-colors"
                    style={{ fontFamily: "'Times New Roman', Times, serif" }}
                  >
                    {promo.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1">{promo.subtitle}</p>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-700/60 text-xs text-amber-200">
                  <strong>Áp dụng cho:</strong> {promo.applicableTo}
                </div>

                <div className="space-y-2.5 pt-2">
                  {promo.benefits.map((benefit, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-700 flex items-center justify-between">
                <span className="text-xs text-slate-400">Số lượng suất ưu đãi có hạn</span>
                <button
                  onClick={() => onOpenBooking(idx === 0 ? 'truong-thinh-building-phu-nhuan' : 'tong-kho-bai-song-than-thu-duc')}
                  className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#162238] font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <span>Nhận Gói Ưu Đãi</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
