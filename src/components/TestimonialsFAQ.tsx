import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  Star, 
  Quote, 
  Building2, 
  ShieldCheck, 
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { TENANT_REVIEWS, FAQ_ITEMS } from '../data/properties';

export const TestimonialsFAQ: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top: Tenant Testimonials */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#243457]/10 text-[#243457] text-xs font-bold uppercase tracking-wider mb-2">
              <Quote className="w-3.5 h-3.5" />
              <span>Đối Tác & Khách Thuê Nói Về Chúng Tôi</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#243457] tracking-tight" style={{ fontFamily: 'Verdana, sans-serif' }}>
              Đồng Hành Cùng 250+ Doanh Nghiệp Phát Triển
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Sự hài lòng và an tâm của khách hàng là minh chứng rõ ràng nhất cho chất lượng quản lý vận hành của Trường Thịnh Invest.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TENANT_REVIEWS.map((review, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-7 shadow-lg border border-slate-200/80 luxury-card flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(review.rating)].map((_, rIdx) => (
                      <Star key={rIdx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                    "{review.content}"
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-slate-100 space-y-1">
                  <div className="font-bold text-[#243457] text-sm font-serif">
                    {review.representative}
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    {review.position} - {review.company}
                  </div>
                  <div className="text-[11px] text-amber-700 font-semibold pt-1">
                    🏢 {review.property}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#243457]/10 text-[#243457] text-xs font-bold uppercase tracking-wider mb-2">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Giải Đáp Thắc Mắc</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#243457]" style={{ fontFamily: 'Verdana, sans-serif' }}>
              Câu Hỏi Thường Gặp Khi Thuê Bất Động Sản
            </h3>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#243457] cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-amber-600 flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
