import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  ExternalLink, 
  Building2, 
  Warehouse, 
  Compass, 
  Clock, 
  Plane, 
  Truck, 
  Ship, 
  Layers
} from 'lucide-react';
import { PROPERTIES_DATA, COMPANY_INFO } from '../data/properties';

export const MapSection: React.FC = () => {
  const [selectedMapId, setSelectedMapId] = useState<string>('truong-thinh-building-phu-nhuan');

  const currentProperty = PROPERTIES_DATA.find((p) => p.id === selectedMapId) || PROPERTIES_DATA[0];

  // Google Maps embed URL generator
  const getEmbedUrl = (id: string) => {
    if (id === 'truong-thinh-building-phu-nhuan') {
      return 'https://maps.google.com/maps?q=140B+Nguyen+Van+Troi+Phu+Nhuan+Ho+Chi+Minh&t=&z=16&ie=UTF8&iwloc=&output=embed';
    } else {
      return 'https://maps.google.com/maps?q=301+Quoc+lo+1A+Tam+Binh+Thu+Duc+Ho+Chi+Minh&t=&z=15&ie=UTF8&iwloc=&output=embed';
    }
  };

  const getDirectDirectionsUrl = (id: string) => {
    if (id === 'truong-thinh-building-phu-nhuan') {
      return 'https://www.google.com/maps/dir/?api=1&destination=140B+Nguyen+Van+Troi+Phu+Nhuan+Ho+Chi+Minh';
    } else {
      return 'https://www.google.com/maps/dir/?api=1&destination=301+Quoc+lo+1A+Tam+Binh+Thu+Duc+Ho+Chi+Minh';
    }
  };

  return (
    <section id="location-map" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#243457]/10 text-[#243457] text-xs font-bold uppercase tracking-wider mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>Vị Trí Chiến Lược & Kết Nối Giao Thương</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#243457] tracking-tight" style={{ fontFamily: 'Verdana, sans-serif' }}>
            Bản Đồ Vị Trí Các Dự Án Cho Thuê
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Tọa lạc tại các trục giao thông huyết mạch của TP.HCM giúp doanh nghiệp tối ưu chi phí vận hành, đi lại và logistics.
          </p>

          {/* Toggle Map Location */}
          <div className="inline-flex p-1.5 bg-slate-100 rounded-xl mt-6 border border-slate-200 shadow-inner">
            <button
              onClick={() => setSelectedMapId('truong-thinh-building-phu-nhuan')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedMapId === 'truong-thinh-building-phu-nhuan'
                  ? 'bg-[#243457] text-white shadow-md'
                  : 'text-slate-600 hover:text-[#243457]'
              }`}
            >
              <Building2 className="w-4 h-4 text-amber-400" />
              <span>140B Nguyễn Văn Trỗi, Q.Phú Nhuận</span>
            </button>
            <button
              onClick={() => setSelectedMapId('tong-kho-bai-song-than-thu-duc')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedMapId === 'tong-kho-bai-song-than-thu-duc'
                  ? 'bg-[#243457] text-white shadow-md'
                  : 'text-slate-600 hover:text-[#243457]'
              }`}
            >
              <Warehouse className="w-4 h-4 text-amber-400" />
              <span>301 Quốc Lộ 1A, TP.Thủ Đức</span>
            </button>
          </div>
        </div>

        {/* Map & Connection Highlights Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Interactive Map Embed */}
          <div className="lg:col-span-7 bg-slate-100 rounded-2xl overflow-hidden shadow-xl border border-slate-200 h-[460px] sm:h-[500px] relative flex flex-col">
            {/* Top Bar for Map */}
            <div className="p-3.5 bg-[#243457] text-white flex items-center justify-between z-10">
              <div className="flex items-center gap-2 text-xs truncate pr-2">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="font-semibold text-slate-100 truncate">{currentProperty.address}</span>
              </div>
              <a
                href={getDirectDirectionsUrl(currentProperty.id)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-3 py-1 rounded bg-amber-400 hover:bg-amber-300 text-[#162238] text-xs font-bold transition-colors flex-shrink-0"
              >
                <Navigation className="w-3 h-3" />
                <span>Chỉ đường</span>
              </a>
            </div>

            {/* Google Map iFrame */}
            <iframe
              title={`Bản đồ ${currentProperty.title}`}
              src={getEmbedUrl(currentProperty.id)}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="flex-1 w-full h-full"
            />
          </div>

          {/* Location Advantages & Distance Metrics */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-sm space-y-5">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">
                  <span>Phân tích khoảng cách & Tuyến đường</span>
                </div>
                <h3 className="text-xl font-bold text-[#243457] font-serif">
                  {currentProperty.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  {currentProperty.headline}
                </p>
              </div>

              {/* Distance cards */}
              <div className="space-y-3">
                {currentProperty.locationAdvantages.map((adv, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm flex items-start gap-3.5"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#243457]/10 flex items-center justify-center text-[#243457] font-bold text-xs flex-shrink-0 mt-0.5">
                      {idx === 0 ? <Plane className="w-4 h-4 text-blue-600" /> : idx === 1 ? <Navigation className="w-4 h-4 text-emerald-600" /> : <Layers className="w-4 h-4 text-amber-600" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-[#243457]">{adv.title}</span>
                        <span className="text-xs font-extrabold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded">
                          {adv.distance}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-normal">
                        {adv.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action */}
              <div className="pt-2">
                <a
                  href={getDirectDirectionsUrl(currentProperty.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-[#243457] hover:bg-[#162238] text-amber-300 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Mở Ứng Dụng Google Maps Để Chỉ Đường</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
