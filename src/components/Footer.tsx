import React from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Calendar, 
  Clock, 
  Warehouse, 
  ArrowUp,
  Award
} from 'lucide-react';
import { COMPANY_INFO, PROPERTIES_DATA } from '../data/properties';

interface FooterProps {
  onOpenBooking: (propertyId?: string) => void;
  onOpenWebhookSettings?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenWebhookSettings }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#162238] text-white pt-16 pb-12 border-t border-slate-700/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-700/80">
          {/* Col 1: Brand & Headquarter */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-[#162238] font-bold shadow-lg shadow-amber-500/20">
                <Building2 className="w-6 h-6 text-[#162238]" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-serif tracking-tight text-white uppercase">
                  Trường Thịnh Invest
                </h3>
                <p className="text-xs text-amber-300 font-semibold tracking-wider uppercase">
                  {COMPANY_INFO.name}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              Đơn vị tiên phong cung cấp giải pháp cho thuê tòa nhà văn phòng cao cấp và tổng kho bãi logistics vị trí đắc địa tại TP. Hồ Chí Minh với phương châm <strong>"Chính chủ 100% - Uy tín & Đồng hành lâu dài"</strong>.
            </p>

            <div className="space-y-2 text-xs text-slate-300 pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Địa chỉ trụ sở chính:</strong> 140B Nguyễn Văn Trỗi, Phường 8, Quận Phú Nhuận, TP. Hồ Chí Minh
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>
                  <strong>Hotline trực tiếp:</strong>{' '}
                  <a href={`tel:${COMPANY_INFO.hotlineRaw}`} className="text-amber-300 font-bold hover:underline">
                    0906438181 (0906 438 181)
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>
                  <strong>Email liên hệ:</strong>{' '}
                  <a href={`mailto:${COMPANY_INFO.email}`} className="text-slate-200 hover:underline">
                    {COMPANY_INFO.email}
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Giờ làm việc:</strong> {COMPANY_INFO.workingHours}
                </span>
              </div>
            </div>
          </div>

          {/* Col 2: Properties for rent */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-300 border-b border-slate-700 pb-2" style={{ fontFamily: 'Verdana, sans-serif' }}>
              Bất Động Sản Cho Thuê
            </h4>
            <div className="space-y-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5 text-sm">
                  <Building2 className="w-4 h-4 text-amber-400" />
                  <span>Tòa nhà văn phòng Trường Thịnh Building</span>
                </div>
                <div className="text-slate-400">140B Nguyễn Văn Trỗi, P.8, Q.Phú Nhuận, TP.HCM</div>
                <div className="text-amber-400 font-semibold">Diện tích: 80m² - 1.200m² | Chuẩn Hạng A-</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5 text-sm">
                  <Warehouse className="w-4 h-4 text-amber-400" />
                  <span>Tổng kho bãi & Xưởng khu vực Sóng Thần</span>
                </div>
                <div className="text-slate-400">301 Quốc lộ 1A, P.Tam Bình, TP.Thủ Đức, TP.HCM</div>
                <div className="text-amber-400 font-semibold">Diện tích: 300m² - 8.000m² | Container 24/7</div>
              </div>
            </div>
          </div>

          {/* Col 3: Quick Navigation & CTA */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-300 font-serif border-b border-slate-700 pb-2">
              Hỗ Trợ Khách Hàng
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <a href="#about" className="hover:text-amber-300 transition-colors">
                  &bull; Giới thiệu Trường Thịnh Invest
                </a>
              </li>
              <li>
                <a href="#properties" className="hover:text-amber-300 transition-colors">
                  &bull; Bất động sản sở hữu cho thuê
                </a>
              </li>
              <li>
                <a href="#specs" className="hover:text-amber-300 transition-colors">
                  &bull; Bảng giá & Thông số kỹ thuật
                </a>
              </li>
              <li>
                <a href="#promotions" className="hover:text-amber-300 transition-colors">
                  &bull; Ưu đãi thuê mặt bằng trong tháng
                </a>
              </li>
              <li>
                <a href="#location-map" className="hover:text-amber-300 transition-colors">
                  &bull; Bản đồ vị trí & Chỉ đường
                </a>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={() => onOpenBooking()}
                className="w-full py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#162238] font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Đặt Lịch Xem Trực Tiếp</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            <p>
              &copy; {new Date().getFullYear()} <strong>CÔNG TY ĐẦU TƯ TRƯỜNG THỊNH (Trường Thịnh Invest)</strong>. Bản quyền thuộc về Trường Thịnh Invest.
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Địa chỉ trụ sở: 140B Nguyễn Văn Trỗi – Phường 8 - Quận Phú Nhuận - TP. Hồ Chí Minh | Hotline: 0906438181 | Email: prophuongoz@gmail.com
            </p>
          </div>

          <div className="flex items-center gap-3">
            {onOpenWebhookSettings && (
              <button
                onClick={onOpenWebhookSettings}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 hover:text-emerald-200 transition-colors cursor-pointer border border-emerald-700/50 text-xs font-semibold"
                title="Cấu hình nhận data vào Google Sheets qua Apps Script"
              >
                <span>📊 Cấu hình Google Sheet</span>
              </button>
            )}

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer border border-slate-700 text-xs"
            >
              <span>Lên đầu trang</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
