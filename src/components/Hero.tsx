import React, { useState } from 'react';
import { 
  Building2, 
  Warehouse, 
  MapPin, 
  Search, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  PhoneCall,
  Calendar
} from 'lucide-react';
import { COMPANY_INFO, PROPERTIES_DATA } from '../data/properties';

interface HeroProps {
  onSelectProperty: (propertyId: string) => void;
  onOpenBooking: (propertyId?: string) => void;
  onFilterChange?: (category: 'all' | 'office' | 'warehouse', district: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectProperty, onOpenBooking, onFilterChange }) => {
  const [selectedType, setSelectedType] = useState<'all' | 'office' | 'warehouse'>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedArea, setSelectedArea] = useState<string>('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onFilterChange) {
      onFilterChange(selectedType, selectedLocation);
    }
    const targetElement = document.getElementById('properties');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-[#243457]">
      {/* Background with luxury architecture photo and deep blue overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=85"
          alt="Trường Thịnh Invest - Văn phòng & Kho bãi cho thuê"
          className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-10000 hover:scale-100 opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#162238] via-[#243457]/95 to-[#162238]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent" />
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Top Tagline Pill */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>CÔNG TY ĐẦU TƯ TRƯỜNG THỊNH (TRƯỜNG THỊNH INVEST)</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Chính chủ 100% - Không phí môi giới</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Main Left Column: Headline & Subheadline */}
          <div className="lg:col-span-7 space-y-6">
            <h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold text-white leading-[1.18] tracking-tight"
              style={{ fontFamily: "'Times New Roman', Times, serif" }}
            >
              Giải Pháp Cho Thuê <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-300 drop-shadow-[0_2px_10px_rgba(251,191,36,0.3)] font-extrabold inline-block">
                Bất Động Sản & Kho Bãi
              </span>{' '}
              <br />
              Chính Chủ - Uy Tín & Dài Hạn
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-light">
              Cung cấp không gian văn phòng hiện đại tại <strong>140B Nguyễn Văn Trỗi (Phú Nhuận)</strong> và hệ thống tổng kho bãi vị trí chiến lược mặt tiền <strong>Quốc lộ 1A (Tam Bình - Thủ Đức)</strong> với hạ tầng hoàn thiện, PCCC chuẩn quốc tế và giá gốc trực tiếp từ Chủ đầu tư.
            </p>

            {/* Core Stats & Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
                <div className="text-2xl font-bold text-amber-400 font-serif">100%</div>
                <div className="text-xs text-slate-300 font-medium">Chính Chủ Đầu Tư</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
                <div className="text-2xl font-bold text-amber-400 font-serif">24/7</div>
                <div className="text-xs text-slate-300 font-medium">Container & An Ninh</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
                <div className="text-2xl font-bold text-emerald-400 font-serif">0 VNĐ</div>
                <div className="text-xs text-slate-300 font-medium">Phí Môi Giới</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
                <div className="text-2xl font-bold text-amber-400 font-serif">15-30 Ngày</div>
                <div className="text-xs text-slate-300 font-medium">Miễn Phí Fit-out</div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onOpenBooking()}
                className="glow-btn flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-[#162238] font-bold text-base shadow-xl shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
              >
                <Calendar className="w-5 h-5" />
                <span>Đặt Lịch Xem Thực Tế Ngay</span>
              </button>

              <a
                href={`tel:${COMPANY_INFO.hotlineRaw}`}
                className="flex items-center gap-2.5 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-base backdrop-blur-sm transition-all"
              >
                <PhoneCall className="w-5 h-5 text-amber-400" />
                <span>Hotline: {COMPANY_INFO.hotline}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Quick Search & Filter Card Box */}
          <div className="lg:col-span-5">
            <div className="bg-[#1b2844]/95 border border-white/15 rounded-2xl p-6 sm:p-7 shadow-2xl backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-700/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300">
                    <Search className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-white text-base font-sans">Tìm Kiếm Mặt Bằng Trống</span>
                </div>
                <span className="text-xs px-2.5 py-1 rounded bg-amber-400/20 text-amber-300 font-semibold border border-amber-400/30">
                  Cập nhật hôm nay
                </span>
              </div>

              <form onSubmit={handleSearch} className="space-y-4">
                {/* Property Type Selection */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    1. Loại Hình Bất Động Sản
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedType(selectedType === 'office' ? 'all' : 'office')}
                      className={`flex items-center gap-2 p-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer text-left ${
                        selectedType === 'office'
                          ? 'bg-amber-400 text-[#162238] border-amber-400 shadow-md font-bold'
                          : 'bg-slate-800/80 text-slate-200 border-slate-700 hover:border-amber-400/50'
                      }`}
                    >
                      <Building2 className="w-4 h-4 flex-shrink-0" />
                      <div className="truncate">
                        <div>Văn Phòng Cao Cấp</div>
                        <div className="text-[10px] opacity-80">Trường Thịnh Building</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedType(selectedType === 'warehouse' ? 'all' : 'warehouse')}
                      className={`flex items-center gap-2 p-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer text-left ${
                        selectedType === 'warehouse'
                          ? 'bg-amber-400 text-[#162238] border-amber-400 shadow-md font-bold'
                          : 'bg-slate-800/80 text-slate-200 border-slate-700 hover:border-amber-400/50'
                      }`}
                    >
                      <Warehouse className="w-4 h-4 flex-shrink-0" />
                      <div className="truncate">
                        <div>Tổng Kho Bãi & Xưởng</div>
                        <div className="text-[10px] opacity-80">Mặt tiền QL1A Thủ Đức</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Location Selection */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    2. Khu Vực & Địa Điểm
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-amber-400 pointer-events-none" />
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors cursor-pointer appearance-none"
                    >
                      <option value="all">Tất cả khu vực (Phú Nhuận & Thủ Đức)</option>
                      <option value="phu-nhuan">Quận Phú Nhuận (140B Nguyễn Văn Trỗi - Sát Sân Bay)</option>
                      <option value="thu-duc">TP. Thủ Đức (301 QL1A - Khu vực Sóng Thần/Tam Bình)</option>
                    </select>
                  </div>
                </div>

                {/* Area filter */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    3. Nhu Cầu Diện Tích (m²)
                  </label>
                  <select
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors cursor-pointer"
                  >
                    <option value="all">Mọi quy mô diện tích</option>
                    <option value="small">Dưới 150 m² (Văn phòng start-up / Đại diện)</option>
                    <option value="medium">150 m² - 500 m² (Văn phòng chuẩn / Kho mini)</option>
                    <option value="large">500 m² - 1.500 m² (Nguyên sàn văn phòng / Kho logistics)</option>
                    <option value="xlarge">1.500 m² - 8.000 m² (Tổng kho phân phối / Đại bản doanh)</option>
                  </select>
                </div>

                {/* Submit Search button */}
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-[#162238] font-bold text-sm shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <Search className="w-4 h-4" />
                  <span>Tra Cứu Mặt Bằng Còn Trống & Báo Giá</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Direct Quick Link to 2 primary projects */}
              <div className="mt-4 pt-4 border-t border-slate-700/80 space-y-2">
                <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                  Dự án trọng điểm đang mở thuê:
                </div>
                <div className="space-y-1.5">
                  {PROPERTIES_DATA.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => onSelectProperty(p.id)}
                      className="w-full text-left p-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-amber-400/40 transition-all flex items-center justify-between text-xs cursor-pointer group"
                    >
                      <div className="flex items-center gap-2 truncate">
                        {p.category === 'office' ? (
                          <Building2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                        ) : (
                          <Warehouse className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                        )}
                        <span className="text-slate-200 group-hover:text-amber-300 font-medium truncate">
                          {p.title}
                        </span>
                      </div>
                      <span className="text-[10px] text-amber-400 font-semibold flex-shrink-0 ml-2">
                        Xem chi tiết &rarr;
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
