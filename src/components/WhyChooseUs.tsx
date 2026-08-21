import React from 'react';
import { FileText, MapPin, Handshake, ShieldCheck, Check, Sparkles, Building, PhoneCall } from 'lucide-react';
import { CORE_VALUES, COMPANY_INFO } from '../data/properties';

interface WhyChooseUsProps {
  onOpenBooking: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onOpenBooking }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileCheck':
        return <FileText className="w-7 h-7 text-amber-500" />;
      case 'MapPin':
        return <MapPin className="w-7 h-7 text-amber-500" />;
      case 'Handshake':
        return <Handshake className="w-7 h-7 text-amber-500" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-7 h-7 text-amber-500" />;
      default:
        return <Building className="w-7 h-7 text-amber-500" />;
    }
  };

  return (
    <section id="why-us" className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Background soft geometry */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#243457]/10 text-[#243457] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Lợi Thế Cạnh Tranh Vượt Trội</span>
          </div>
          <h2 
            className="text-3xl sm:text-4xl font-extrabold text-[#243457] tracking-tight"
            style={{ fontFamily: "'Times New Roman', Times, serif" }}
          >
            Tại Sao Nên Chọn Trường Thịnh Invest?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Chúng tôi kiến tạo môi trường kinh doanh và chuỗi lưu chuyển hàng hóa tối ưu nhất cho sự phát triển hưng thịnh của doanh nghiệp bạn.
          </p>
        </div>

        {/* 4 Pillars Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CORE_VALUES.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-7 shadow-lg border border-slate-200/80 luxury-card flex flex-col justify-between group hover:border-[#243457]/40 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#243457]/5 rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform" />
              
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#243457]/10 border border-[#243457]/20 flex items-center justify-center group-hover:bg-[#243457] transition-colors duration-300">
                  <div className="group-hover:text-amber-300 group-hover:brightness-125 transition-colors">
                    {getIcon(item.icon)}
                  </div>
                </div>

                <h3 
                  className="text-lg font-bold text-[#243457] group-hover:text-amber-700 transition-colors"
                  style={{ fontFamily: "'Times New Roman', Times, serif" }}
                >
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-[#243457]">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Cam kết chính chủ bằng hợp đồng</span>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Trust Bar */}
        <div className="mt-14 bg-[#243457] text-white rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6 border border-amber-500/20">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 flex-shrink-0">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-bold text-amber-300" style={{ fontFamily: 'Verdana, sans-serif' }}>
                Cam Kết Bàn Giao Đúng Tiến Độ & Đầy Đủ Giấy Tờ Pháp Lý
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                Cung cấp đầy đủ hợp đồng công chứng, biên bản nghiệm thu PCCC, hồ sơ thiết kế kỹ thuật và hỗ trợ thủ tục cấp phép kinh doanh cho khách hàng thuê.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={onOpenBooking}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-[#162238] font-bold text-sm shadow-lg transition-all cursor-pointer"
            >
              Liên Hệ Khảo Sát Thực Tế
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
