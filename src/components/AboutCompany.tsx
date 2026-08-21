import React from 'react';
import { 
  Building, 
  MapPin, 
  Award, 
  Users, 
  ShieldCheck, 
  Briefcase, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle,
  FileText
} from 'lucide-react';
import { COMPANY_INFO } from '../data/properties';

export const AboutCompany: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#243457]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#243457]/10 text-[#243457] text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5 text-[#243457]" />
            <span>Về Chúng Tôi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#243457] font-sans tracking-tight" style={{ fontFamily: 'Arial, sans-serif' }}>
            CÔNG TY ĐẦU TƯ TRƯỜNG THỊNH INVEST
          </h2>
          <p className="text-lg text-amber-700 font-semibold mt-1">Trường Thịnh Invest</p>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-[#243457] mx-auto my-4 rounded-full" />
          <p className="text-slate-600 text-base leading-relaxed">
            Đơn vị chủ đầu tư và quản lý vận hành trực tiếp hệ thống tòa nhà văn phòng cao cấp và tổng kho bãi logistics chiến lược tại TP. Hồ Chí Minh với cam kết chất lượng chuẩn mực, pháp lý vững vàng và giá trị hợp tác bền vững.
          </p>
        </div>

        {/* 2-Column Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          {/* Left Column: Visual Showcase & Core Badges */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80"
                alt="Trường Thịnh Invest Headquarter"
                className="w-full h-[420px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#162238]/90 via-transparent to-transparent" />
              
              {/* Overlay Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/95 backdrop-blur-md shadow-lg border border-amber-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-[#243457] flex items-center justify-center text-amber-300 font-bold text-lg font-serif">
                    12+
                  </div>
                  <div>
                    <h4 className="font-bold text-[#243457] text-sm font-serif">Năm Kinh Nghiệm Vận Hành</h4>
                    <p className="text-xs text-slate-600">Đồng hành cùng 250+ doanh nghiệp hàng đầu</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Small Floating Card */}
            <div className="hidden sm:flex absolute -top-5 -right-5 bg-[#243457] text-white p-4 rounded-xl shadow-xl border border-amber-400/40 items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-amber-400 flex-shrink-0" />
              <div>
                <div className="text-xs text-slate-300 uppercase font-semibold">Cam kết pháp lý</div>
                <div className="text-sm font-bold text-amber-300">100% Chính Chủ Sở Hữu</div>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Corporate Info */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-8 space-y-5">
              <h3 className="text-xl font-bold text-[#243457] font-serif flex items-center gap-2.5">
                <Briefcase className="w-5 h-5 text-amber-600" />
                <span>Thông Tin Doanh Nghiệp Chính Thức</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-sm space-y-1">
                  <div className="text-xs text-slate-500 font-medium">Tên công ty</div>
                  <div className="font-bold text-[#243457]">{COMPANY_INFO.name}</div>
                  <div className="text-xs text-amber-600 font-semibold">({COMPANY_INFO.brandName})</div>
                </div>

                <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-sm space-y-1">
                  <div className="text-xs text-slate-500 font-medium">Lĩnh vực hoạt động chính</div>
                  <div className="font-bold text-[#243457]">Cho thuê Bất động sản, Tòa nhà văn phòng & Kho bãi chính chủ</div>
                </div>

                <div className="sm:col-span-2 p-3.5 bg-white rounded-xl border border-slate-200 shadow-sm space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-red-500" />
                    <span>Trụ sở chính</span>
                  </div>
                  <div className="font-bold text-[#243457] text-base">{COMPANY_INFO.headquarters}</div>
                </div>

                <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-sm space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Hotline Trực Tiếp</span>
                  </div>
                  <div className="font-bold text-red-600 text-base">{COMPANY_INFO.hotline}</div>
                </div>

                <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-sm space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <Mail className="w-3.5 h-3.5 text-blue-600" />
                    <span>Email Liên Hệ</span>
                  </div>
                  <div className="font-bold text-[#243457]">{COMPANY_INFO.email}</div>
                </div>
              </div>

              {/* Pillars list */}
              <div className="space-y-2.5 pt-2 border-t border-slate-200">
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-slate-700">
                    <strong>Hợp tác trực tiếp Chủ đầu tư:</strong> Không thông qua đơn vị trung gian, tiết kiệm 100% phí môi giới và linh hoạt thương lượng điều khoản hợp đồng.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-slate-700">
                    <strong>Vị trí huyết mạch:</strong> Tòa nhà văn phòng nằm ngay tuyến đường kết nối Sân bay Tân Sơn Nhất - Quận 1; Kho bãi nằm tại cửa ngõ Đông Bắc Quốc lộ 1A kết nối vùng kinh tế trọng điểm.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-slate-700">
                    <strong>Hạ tầng đồng bộ & Pháp lý chuẩn:</strong> Nghiệm thu PCCC chuẩn quốc tế, hồ sơ xuất hóa đơn VAT nhanh chóng trong ngày.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
