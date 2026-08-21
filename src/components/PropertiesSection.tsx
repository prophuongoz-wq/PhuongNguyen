import React, { useState } from 'react';
import { 
  Building2, 
  Warehouse, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  Calendar, 
  Maximize2, 
  Layers, 
  Truck, 
  Flame, 
  Zap, 
  DollarSign,
  FileSpreadsheet,
  Compass,
  Phone
} from 'lucide-react';
import { PROPERTIES_DATA, COMPANY_INFO } from '../data/properties';
import { PropertyItem } from '../types';

interface PropertiesSectionProps {
  onOpenDetailModal: (property: PropertyItem) => void;
  onOpenBooking: (propertyId: string) => void;
  filterCategory?: 'all' | 'office' | 'warehouse';
}

export const PropertiesSection: React.FC<PropertiesSectionProps> = ({
  onOpenDetailModal,
  onOpenBooking,
  filterCategory = 'all',
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'office' | 'warehouse'>(filterCategory);
  const [activeImageIndex, setActiveImageIndex] = useState<{ [key: string]: number }>({
    'truong-thinh-building-phu-nhuan': 0,
    'tong-kho-bai-song-than-thu-duc': 0,
  });

  const filteredProperties = PROPERTIES_DATA.filter((p) => {
    if (activeTab === 'all') return true;
    return p.category === activeTab;
  });

  const handleThumbnailClick = (propertyId: string, idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => ({ ...prev, [propertyId]: idx }));
  };

  return (
    <section id="properties" className="py-20 bg-slate-100/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#243457]/10 text-[#243457] text-xs font-bold uppercase tracking-wider mb-2">
              <Building2 className="w-3.5 h-3.5" />
              <span>Danh Mục Bất Động Sản Sở Hữu Cho Thuê</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#243457] tracking-tight" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
              Mặt Bằng & Tổng Kho Bãi Trọng Điểm
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
              100% tài sản thuộc sở hữu chính chủ Trường Thịnh Invest. Đang có các diện tích linh hoạt sẵn sàng bàn giao với chính sách giá và ưu đãi tốt nhất trong tháng.
            </p>
          </div>

          {/* Filter Tab Buttons */}
          <div className="flex items-center p-1.5 bg-white rounded-xl shadow-sm border border-slate-200 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#243457] text-white shadow-md'
                  : 'text-slate-600 hover:text-[#243457] hover:bg-slate-50'
              }`}
            >
              Tất Cả ({PROPERTIES_DATA.length})
            </button>
            <button
              onClick={() => setActiveTab('office')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'office'
                  ? 'bg-[#243457] text-white shadow-md'
                  : 'text-slate-600 hover:text-[#243457] hover:bg-slate-50'
              }`}
            >
              <Building2 className="w-4 h-4 text-amber-400" />
              <span>Tòa Nhà Văn Phòng</span>
            </button>
            <button
              onClick={() => setActiveTab('warehouse')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'warehouse'
                  ? 'bg-[#243457] text-white shadow-md'
                  : 'text-slate-600 hover:text-[#243457] hover:bg-slate-50'
              }`}
            >
              <Warehouse className="w-4 h-4 text-amber-400" />
              <span>Kho Bãi & Nhà Xưởng</span>
            </button>
          </div>
        </div>

        {/* Featured Listings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {filteredProperties.map((property) => {
            const currentImgIndex = activeImageIndex[property.id] || 0;
            const displayImage = property.gallery[currentImgIndex] || property.mainImage;

            return (
              <div
                key={property.id}
                className="bg-white rounded-2xl overflow-hidden shadow-xl border border-slate-200/80 luxury-card flex flex-col justify-between group"
              >
                <div>
                  {/* Image Carousel / Display Header */}
                  <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-slate-900">
                    <img
                      src={displayImage}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 cursor-pointer"
                      onClick={() => onOpenDetailModal(property)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                      <span className="px-3 py-1.5 rounded-lg bg-[#243457]/90 text-amber-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md border border-amber-400/30 flex items-center gap-1.5 shadow-lg">
                        {property.category === 'office' ? (
                          <Building2 className="w-3.5 h-3.5" />
                        ) : (
                          <Warehouse className="w-3.5 h-3.5" />
                        )}
                        {property.tag}
                      </span>

                      <span className="px-3 py-1.5 rounded-lg bg-emerald-600/90 text-white text-xs font-bold backdrop-blur-md shadow-lg border border-emerald-400/40">
                        {property.statusBadge}
                      </span>
                    </div>

                    {/* Gallery Thumbnails Overlay (Bottom-right) */}
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        {property.gallery.slice(0, 4).map((thumb, idx) => (
                          <button
                            key={idx}
                            onClick={(e) => handleThumbnailClick(property.id, idx, e)}
                            className={`w-12 h-8 rounded-md overflow-hidden border-2 transition-all cursor-pointer ${
                              currentImgIndex === idx
                                ? 'border-amber-400 ring-2 ring-amber-400/40 scale-105'
                                : 'border-white/50 opacity-70 hover:opacity-100'
                            }`}
                          >
                            <img src={thumb} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() => onOpenDetailModal(property)}
                        className="px-2.5 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-medium backdrop-blur-md flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Xem ảnh ({property.gallery.length})</span>
                      </button>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-7 space-y-5">
                    {/* Title & Address */}
                    <div>
                      <h3
                        onClick={() => onOpenDetailModal(property)}
                        className="text-xl sm:text-2xl font-bold text-[#243457] hover:text-amber-600 transition-colors cursor-pointer"
                        style={{ fontFamily: "'Times New Roman', Times, serif" }}
                      >
                        {property.title}
                      </h3>
                      
                      <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 mt-2">
                        <MapPin className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <span className="font-medium text-slate-700">{property.address}</span>
                      </div>
                    </div>

                    {/* Headline summary */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                      {property.summary}
                    </p>

                    {/* Key Technical Highlights Badges */}
                    <div className="grid grid-cols-2 gap-2.5 p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                      {property.category === 'office' ? (
                        <>
                          <div className="flex items-center gap-2 text-slate-700">
                            <Layers className="w-4 h-4 text-blue-600 flex-shrink-0" />
                            <span><strong>Quy mô:</strong> 1 nhà xe/ ô tô + 4 tầng</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-700">
                            <Zap className="w-4 h-4 text-amber-500 flex-shrink-0" />
                            <span><strong>Thang máy:</strong> 1 thang Mitsubishi</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-700">
                            <Flame className="w-4 h-4 text-red-500 flex-shrink-0" />
                            <span><strong>PCCC:</strong> Theo tiêu chuẩn an toàn</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-700">
                            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                            <span><strong>Máy phát:</strong> 100% Công suất</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center gap-2 text-slate-700">
                            <Truck className="w-4 h-4 text-blue-600 flex-shrink-0" />
                            <span><strong>Xe Container:</strong> 24/7 Không cấm</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-700">
                            <Layers className="w-4 h-4 text-amber-500 flex-shrink-0" />
                            <span><strong>Tải trọng sàn:</strong> 3 - 5 tấn/m²</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-700">
                            <Flame className="w-4 h-4 text-red-500 flex-shrink-0" />
                            <span><strong>PCCC:</strong> Theo tiêu chuẩn an toàn</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-700">
                            <Zap className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                            <span><strong>Điện 3 pha:</strong> Trạm biến áp riêng</span>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Suitable For Pills */}
                    <div>
                      <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Mục đích phù hợp:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {property.suitableFor.slice(0, 3).map((item, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-900 border border-amber-200/70 text-[11px] font-medium"
                          >
                            ✓ {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Month's special promotion tag */}
                    <div className="p-3 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-400/10 to-transparent border-l-4 border-amber-500 text-xs">
                      <div className="font-bold text-[#243457] flex items-center gap-1.5 mb-1">
                        <DollarSign className="w-3.5 h-3.5 text-amber-600" />
                        <span>Chính sách ưu đãi trong tháng:</span>
                      </div>
                      <p className="text-slate-700 font-medium">{property.currentPromo}</p>
                    </div>
                  </div>
                </div>

                {/* Footer Card Actions */}
                <div className="p-6 sm:p-7 pt-0 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => onOpenDetailModal(property)}
                    className="w-full sm:w-1/2 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#243457] font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer border border-slate-300/80"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-amber-600" />
                    <span>Xem Bảng Thông Số</span>
                  </button>

                  <button
                    onClick={() => onOpenBooking(property.id)}
                    className="w-full sm:w-1/2 py-3 px-4 rounded-xl bg-[#243457] hover:bg-[#1b273f] text-amber-300 hover:text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <span>Báo Giá & Đặt Lịch</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Need custom area banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#243457] via-[#2f436e] to-[#243457] text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-xl font-bold text-amber-300" style={{ fontFamily: 'Verdana, sans-serif' }}>
              Cần thuê diện tích đặc thù hoặc phương án gộp sàn/kho bãi lớn?
            </h4>
            <p className="text-sm text-slate-200 max-w-2xl">
              Trường Thịnh Invest sẵn sàng hỗ trợ ngăn chia diện tích theo bản vẽ kiến trúc của doanh nghiệp hoặc cải tạo kết cấu kho theo quy chuẩn riêng.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`tel:${COMPANY_INFO.hotlineRaw}`}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-lg transition-transform active:scale-95"
            >
              <Phone className="w-4 h-4" />
              <span>Gọi Trực Tiếp: {COMPANY_INFO.hotline}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
