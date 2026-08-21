import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Check, 
  Layers, 
  Building2, 
  Warehouse, 
  Flame, 
  Zap, 
  Truck, 
  ShieldCheck, 
  Calendar, 
  Phone, 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink,
  Maximize,
  Sparkles,
  DollarSign
} from 'lucide-react';
import { PropertyItem } from '../types';
import { COMPANY_INFO } from '../data/properties';

interface PropertyDetailModalProps {
  property: PropertyItem | null;
  onClose: () => void;
  onBookTour: (propertyId: string, area?: string) => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  onClose,
  onBookTour,
}) => {
  if (!property) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'specs' | 'spaces' | 'location'>('specs');

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % property.gallery.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + property.gallery.length) % property.gallery.length);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-5xl w-full max-h-[92vh] flex flex-col border border-slate-700/50 relative">
        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-[#243457] text-white flex items-center justify-between z-10 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300">
              {property.category === 'office' ? <Building2 className="w-5 h-5" /> : <Warehouse className="w-5 h-5" />}
            </div>
            <div>
              <span className="text-xs text-amber-300 font-bold uppercase tracking-wider">
                {property.tag}
              </span>
              <h3 className="text-lg sm:text-xl font-bold font-serif leading-tight">
                {property.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1">
          {/* Gallery Carousel */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-900 h-64 sm:h-96 w-full group">
            <img
              src={property.gallery[activeImageIndex] || property.mainImage}
              alt={property.title}
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* Navigation Arrows */}
            {property.gallery.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Bottom thumbnail selector */}
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
              <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                {property.gallery.map((thumb, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-14 h-9 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-amber-400 ring-2 ring-amber-400/50 scale-105'
                        : 'border-white/50 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={thumb} alt={`Photo ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              <span className="text-xs text-white bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm">
                {activeImageIndex + 1} / {property.gallery.length}
              </span>
            </div>
          </div>

          {/* Quick Info Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-start gap-2 text-sm text-slate-700">
              <MapPin className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-[#243457]">{property.address}</div>
                <div className="text-xs text-slate-500">{property.headline}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-xs px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 font-bold">
                {property.statusBadge}
              </span>
            </div>
          </div>

          {/* Highlights */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-[#243457] uppercase tracking-wider">
              Đặc Điểm & Lợi Thế Nổi Bật
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {property.highlights.map((h, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tab buttons */}
          <div className="border-b border-slate-200 flex gap-4 text-sm font-bold">
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-3 relative transition-colors cursor-pointer ${
                activeTab === 'specs' ? 'text-[#243457]' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Thông Số Kỹ Thuật Chi Tiết
              {activeTab === 'specs' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#243457]" />}
            </button>
            <button
              onClick={() => setActiveTab('spaces')}
              className={`pb-3 relative transition-colors cursor-pointer ${
                activeTab === 'spaces' ? 'text-[#243457]' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Diện Tích Đang Trống & Bảng Giá
              {activeTab === 'spaces' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#243457]" />}
            </button>
            <button
              onClick={() => setActiveTab('location')}
              className={`pb-3 relative transition-colors cursor-pointer ${
                activeTab === 'location' ? 'text-[#243457]' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Vị Trí & Kết Nối Giao Thông
              {activeTab === 'location' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#243457]" />}
            </button>
          </div>

          {/* Tab Content 1: Specs */}
          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              {property.specs.map((spec, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between gap-2">
                  <span className="text-slate-500 font-medium">{spec.label}:</span>
                  <span className="font-bold text-[#243457] text-right">{spec.value}</span>
                </div>
              ))}
            </div>
          )}

          {/* Tab Content 2: Available Spaces */}
          {activeTab === 'spaces' && (
            <div className="space-y-3">
              {property.availableSpaces.map((space, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-extrabold text-[#243457]">{space.area}</span>
                      <span className="text-xs text-slate-600 font-semibold">- {space.floorOrZone}</span>
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded ${
                          space.status === 'Full' || space.status === 'Đã thuê'
                            ? 'bg-rose-100 text-rose-800 border border-rose-200'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {space.status}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      Phù hợp: {space.idealFor} | {space.setupFreeDays}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-xs text-slate-400">Giá tham khảo:</div>
                      <div className="text-sm font-bold text-red-600">{space.pricePerUnit}</div>
                    </div>
                    <button
                      onClick={() => {
                        onClose();
                        onBookTour(property.id, space.area);
                      }}
                      className="px-3.5 py-2 rounded-xl bg-[#243457] hover:bg-[#162238] text-amber-300 font-bold text-xs cursor-pointer transition-colors"
                    >
                      Đặt Xem Sàn Này
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab Content 3: Location */}
          {activeTab === 'location' && (
            <div className="space-y-3">
              {property.locationAdvantages.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#243457] text-amber-400 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#243457] text-sm">{item.title}</span>
                      <span className="text-xs font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                        {item.distance}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Promo Callout in Modal */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-900 space-y-1">
            <div className="font-bold flex items-center gap-1.5 text-amber-800">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Chính sách ưu đãi độc quyền tháng này:</span>
            </div>
            <p>{property.currentPromo}</p>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <a
              href={`tel:${COMPANY_INFO.hotlineRaw}`}
              className="flex items-center gap-2 text-sm font-bold text-red-600 hover:underline"
            >
              <Phone className="w-4 h-4" />
              <span>Hotline CĐT: {COMPANY_INFO.hotline}</span>
            </a>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
            >
              Đóng lại
            </button>
            <button
              onClick={() => {
                onClose();
                onBookTour(property.id);
              }}
              className="w-1/2 sm:w-auto px-6 py-2.5 rounded-xl bg-[#243457] hover:bg-[#162238] text-amber-300 font-bold text-xs sm:text-sm shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Đặt Lịch Xem Ngay</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
