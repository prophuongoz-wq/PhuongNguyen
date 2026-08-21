import React, { useState } from 'react';
import { 
  FileText, 
  Building2, 
  Warehouse, 
  Check, 
  Calendar, 
  Tag, 
  Sparkles, 
  Layers, 
  ArrowRight,
  Shield,
  Clock
} from 'lucide-react';
import { PROPERTIES_DATA } from '../data/properties';

interface SpecsComparisonTableProps {
  onOpenBooking: (propertyId: string, area?: string) => void;
}

export const SpecsComparisonTable: React.FC<SpecsComparisonTableProps> = ({ onOpenBooking }) => {
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>('truong-thinh-building-phu-nhuan');

  const selectedProperty = PROPERTIES_DATA.find((p) => p.id === selectedPropertyId) || PROPERTIES_DATA[0];

  return (
    <section id="specs" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#243457]/10 text-[#243457] text-xs font-bold uppercase tracking-wider mb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>Thông Số Kỹ Thuật & Diện Tích Trống</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#243457] tracking-tight" style={{ fontFamily: 'Verdana, sans-serif' }}>
            Bảng Tra Cứu Thông Số & Giá Thuê Chi Tiết
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Minh bạch từng tiêu chuẩn kỹ thuật, kết cấu sàn, hệ thống phụ trợ và diện tích còn trống sẵn sàng bàn giao ngay trong tháng này.
          </p>

          {/* Switch Tab */}
          <div className="inline-flex p-1.5 bg-slate-100 rounded-xl mt-6 border border-slate-200 shadow-inner">
            <button
              onClick={() => setSelectedPropertyId('truong-thinh-building-phu-nhuan')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedPropertyId === 'truong-thinh-building-phu-nhuan'
                  ? 'bg-[#243457] text-white shadow-md'
                  : 'text-slate-600 hover:text-[#243457]'
              }`}
            >
              <Building2 className="w-4 h-4 text-amber-400" />
              <span>Văn Phòng Phú Nhuận (140B Nguyễn Văn Trỗi)</span>
            </button>
            <button
              onClick={() => setSelectedPropertyId('tong-kho-bai-song-than-thu-duc')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedPropertyId === 'tong-kho-bai-song-than-thu-duc'
                  ? 'bg-[#243457] text-white shadow-md'
                  : 'text-slate-600 hover:text-[#243457]'
              }`}
            >
              <Warehouse className="w-4 h-4 text-amber-400" />
              <span>Tổng Kho Bãi Thủ Đức (301 Quốc lộ 1A)</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Technical Specifications List */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#243457] text-amber-400 flex items-center justify-center font-bold">
                    ⚙️
                  </div>
                  <h3 className="font-bold text-[#243457] text-base" style={{ fontFamily: 'Verdana, sans-serif' }}>
                    Thông Số Kỹ Thuật Tòa Nhà / Kho Bãi
                  </h3>
                </div>
                <span className="text-xs font-semibold text-slate-500">
                  {selectedProperty.tag}
                </span>
              </div>

              <div className="divide-y divide-slate-200/80 text-sm">
                {selectedProperty.specs.map((spec, idx) => (
                  <div key={idx} className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="text-slate-600 font-medium text-xs sm:text-sm flex-shrink-0">
                      {spec.label}:
                    </span>
                    <span className="font-bold text-[#243457] text-xs sm:text-sm sm:text-right">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
                <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                  <Shield className="w-3.5 h-3.5" />
                  Đầy đủ hồ sơ kiểm định an toàn
                </span>
                <span className="font-medium text-slate-500">Cập nhật kỳ kiểm tra gần nhất</span>
              </div>
            </div>
          </div>

          {/* Right Column: Available Spaces & Pricing Table */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white border-2 border-[#243457]/20 rounded-2xl p-6 shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-500 text-[#162238] flex items-center justify-center font-bold">
                      <Tag className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-[#243457] text-base" style={{ fontFamily: 'Verdana, sans-serif' }}>
                      Các Diện Tích Trống Đang Mở Thuê
                    </h3>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-bold">
                    Có thể nhận ngay
                  </span>
                </div>

                <div className="space-y-3">
                  {selectedProperty.availableSpaces.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-50 hover:bg-amber-50/40 border border-slate-200 hover:border-amber-400/50 transition-all space-y-2 group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-base font-extrabold text-[#243457] bg-white px-2.5 py-0.5 rounded border border-slate-200">
                            {item.area}
                          </span>
                          <span className="text-xs font-semibold text-slate-700">
                            {item.floorOrZone}
                          </span>
                        </div>
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded ${
                            item.status === 'Full' || item.status === 'Đã thuê'
                              ? 'text-rose-700 bg-rose-100 border border-rose-200'
                              : 'text-amber-700 bg-amber-100/70'
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs text-slate-600">
                        <div>
                          <strong>Phù hợp:</strong> {item.idealFor}
                        </div>
                        <div className="text-emerald-700 font-medium">
                          ✨ {item.setupFreeDays}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                        <div className="text-xs">
                          <span className="text-slate-500">Giá tham khảo: </span>
                          <span className="font-bold text-red-600 text-sm">{item.pricePerUnit}</span>
                        </div>

                        <button
                          onClick={() => onOpenBooking(selectedProperty.id, item.area)}
                          className="px-3 py-1.5 rounded-lg bg-[#243457] hover:bg-amber-500 hover:text-[#162238] text-white text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Giữ Chỗ / Đặt Lịch</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Note & Terms */}
              <div className="mt-6 p-4 rounded-xl bg-slate-100 text-xs text-slate-600 space-y-1 border border-slate-200">
                <div className="font-bold text-[#243457] flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Chính sách giá từ Chủ Đầu Tư:</span>
                </div>
                <p>{selectedProperty.priceNote}</p>
                <p className="text-amber-800 font-medium">{selectedProperty.currentPromo}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
