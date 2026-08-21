import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle, 
  Calendar, 
  Building2, 
  Warehouse, 
  Sparkles, 
  ShieldCheck,
  Download,
  CheckCircle2,
  FileCheck,
  FileSpreadsheet
} from 'lucide-react';
import { COMPANY_INFO, PROPERTIES_DATA } from '../data/properties';
import { submitLeadToWebhook } from '../services/leadService';

interface ContactSectionProps {
  prefilledPropertyId?: string;
  prefilledArea?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  prefilledPropertyId = 'truong-thinh-building-phu-nhuan',
  prefilledArea = '',
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    propertyId: prefilledPropertyId,
    areaNeeded: prefilledArea || '160 m²',
    visitDate: '',
    visitTimeSlot: '09:00 - 10:30 Sáng',
    note: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const bookingCode = 'TTI-' + Math.floor(100000 + Math.random() * 900000);
    const selectedProp = PROPERTIES_DATA.find((p) => p.id === formData.propertyId);

    // Send to Google Apps Script Webhook
    await submitLeadToWebhook({
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      propertyId: formData.propertyId,
      propertyName: selectedProp?.title || formData.propertyId,
      areaNeeded: formData.areaNeeded,
      visitDate: formData.visitDate || 'Liên hệ sắp xếp',
      visitTimeSlot: formData.visitTimeSlot,
      note: formData.note,
      bookingCode,
      formType: 'Liên Hệ Nhanh (ContactSection)',
    });

    setIsSubmitting(false);
    setSubmitSuccess(true);
    setSubmittedData({
      ...formData,
      bookingCode,
      timestamp: new Date().toLocaleString('vi-VN'),
    });
  };

  const handleReset = () => {
    setSubmitSuccess(false);
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      propertyId: 'truong-thinh-building-phu-nhuan',
      areaNeeded: '160 m²',
      visitDate: '',
      visitTimeSlot: '09:00 - 10:30 Sáng',
      note: '',
    });
  };

  const selectedPropertyObj = PROPERTIES_DATA.find((p) => p.id === formData.propertyId) || PROPERTIES_DATA[0];

  return (
    <section id="contact" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#243457] rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>Liên Hệ Trực Tiếp Chủ Đầu Tư</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight" style={{ fontFamily: 'Verdana, sans-serif' }}>
            Đặt Lịch Xem Mặt Bằng & Nhận Báo Giá Gốc
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3">
            Điền thông tin bên dưới, Ban Quản Lý Trường Thịnh Invest sẽ liên hệ xác nhận lịch xem thực tế và gửi bảng dự toán chi phí chi tiết trong vòng <strong>15 phút</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Contact Info & Headquarters Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#1b2844] border border-slate-700/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Trụ sở chính quản lý
                </span>
                <h3 className="text-2xl font-bold text-white mt-1" style={{ fontFamily: 'Verdana, sans-serif' }}>
                  {COMPANY_INFO.name}
                </h3>
                <p className="text-xs text-amber-300 font-semibold mt-0.5">
                  Thương hiệu: {COMPANY_INFO.brandName}
                </p>
              </div>

              {/* Contact Channels */}
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <div className="w-10 h-10 rounded-lg bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-semibold">Địa chỉ trụ sở chính:</div>
                    <div className="font-bold text-white text-sm mt-0.5">{COMPANY_INFO.headquarters}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-semibold">Hotline hỗ trợ 24/7:</div>
                    <a
                      href={`tel:${COMPANY_INFO.hotlineRaw}`}
                      className="font-extrabold text-amber-300 text-lg hover:underline block"
                    >
                      {COMPANY_INFO.hotline}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-semibold">Email nhận báo giá:</div>
                    <a
                      href={`mailto:${COMPANY_INFO.email}`}
                      className="font-bold text-slate-200 hover:text-white text-sm"
                    >
                      {COMPANY_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-semibold">Thời gian làm việc & Xem thực tế:</div>
                    <div className="text-xs text-slate-200 mt-0.5">{COMPANY_INFO.workingHours}</div>
                  </div>
                </div>
              </div>

              {/* Guarantees */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-[#243457] to-[#162238] border border-amber-400/30 text-xs space-y-2">
                <div className="font-bold text-amber-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Cam kết từ Ban Quản Lý:</span>
                </div>
                <ul className="text-slate-300 space-y-1.5 list-disc list-inside">
                  <li>Không thu bất kỳ khoản phí môi giới hay tư vấn nào</li>
                  <li>Cung cấp đầy đủ hồ sơ pháp lý, bản vẽ CAD mặt bằng</li>
                  <li>Hỗ trợ đưa đón khách hàng đi xem thực tế khi có yêu cầu</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Contact & Booking Form */}
          <div className="lg:col-span-7">
            <div className="bg-white text-slate-900 rounded-2xl p-6 sm:p-10 shadow-2xl border-4 border-slate-100 relative">
              {submitSuccess ? (
                /* Success Confirmation State */
                <div className="text-center py-8 space-y-6 animate-in fade-in zoom-in-95">
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>

                  <div>
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                      Đã Gửi Thành Công
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#243457] mt-2" style={{ fontFamily: 'Verdana, sans-serif' }}>
                      Xác Nhận Đặt Lịch Xem Mặt Bằng
                    </h3>
                    <p className="text-sm text-slate-600 mt-1 max-w-md mx-auto">
                      Cảm ơn quý khách <strong>{submittedData.fullName}</strong>. Chuyên viên quản lý mặt bằng sẽ liên hệ qua số điện thoại <strong>{submittedData.phone}</strong> trong ít phút.
                    </p>
                  </div>

                  {/* Booking Receipt Summary Card */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left max-w-lg mx-auto text-xs sm:text-sm space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                      <span className="text-slate-500 font-semibold">Mã lịch hẹn:</span>
                      <span className="font-mono font-bold text-[#243457] text-base">{submittedData.bookingCode}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Dự án quan tâm:</span>
                      <span className="font-bold text-[#243457] text-right">
                        {submittedData.propertyId === 'truong-thinh-building-phu-nhuan'
                          ? 'Tòa nhà văn phòng Trường Thịnh Building (Phú Nhuận)'
                          : 'Tổng kho bãi & Xưởng QL1A (Thủ Đức)'}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Diện tích yêu cầu:</span>
                      <span className="font-bold text-amber-700">{submittedData.areaNeeded}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Thời gian hẹn xem:</span>
                      <span className="font-bold text-emerald-700">
                        {submittedData.visitDate || 'Linh hoạt'} ({submittedData.visitTimeSlot})
                      </span>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-slate-200 text-[11px] text-slate-400">
                      <span>Thời gian gửi yêu cầu:</span>
                      <span>{submittedData.timestamp}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <a
                      href={`tel:${COMPANY_INFO.hotlineRaw}`}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Gọi Hotline Ngay: {COMPANY_INFO.hotline}</span>
                    </a>

                    <button
                      onClick={handleReset}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-colors cursor-pointer"
                    >
                      Đặt thêm lịch hẹn khác
                    </button>
                  </div>
                </div>
              ) : (
                /* The Interactive Booking / Inquiry Form */
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-slate-200 pb-4 mb-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#243457]" style={{ fontFamily: 'Verdana, sans-serif' }}>
                      Phiếu Đăng Ký Xem Mặt Bằng & Nhận Báo Giá
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Vui lòng nhập đầy đủ thông tin để được phục vụ chu đáo nhất.
                    </p>
                  </div>

                  {/* Contact Info (Row 1) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Họ và tên của bạn <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="VD: Nguyễn Văn Nam"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#243457] focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Số điện thoại liên hệ <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="VD: 0909 xxx xxx"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#243457] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Email & Area (Row 2) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Địa chỉ Email nhận báo giá <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="VD: nam.nguyen@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#243457] focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Nhu cầu diện tích (m²) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="VD: 85m², 160m², 500m² hoặc 1.500m²"
                        value={formData.areaNeeded}
                        onChange={(e) => setFormData({ ...formData, areaNeeded: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#243457] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Property Selection */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Loại Bất Động Sản Quan Tâm <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <label
                        className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                          formData.propertyId === 'truong-thinh-building-phu-nhuan'
                            ? 'bg-[#243457]/5 border-[#243457] ring-1 ring-[#243457]'
                            : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="propertyId"
                          value="truong-thinh-building-phu-nhuan"
                          checked={formData.propertyId === 'truong-thinh-building-phu-nhuan'}
                          onChange={() => setFormData({ ...formData, propertyId: 'truong-thinh-building-phu-nhuan' })}
                          className="w-4 h-4 text-[#243457]"
                        />
                        <div className="text-xs">
                          <div className="font-bold text-[#243457]">Văn phòng Phú Nhuận</div>
                          <div className="text-slate-500">140B Nguyễn Văn Trỗi</div>
                        </div>
                      </label>

                      <label
                        className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                          formData.propertyId === 'tong-kho-bai-song-than-thu-duc'
                            ? 'bg-[#243457]/5 border-[#243457] ring-1 ring-[#243457]'
                            : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="propertyId"
                          value="tong-kho-bai-song-than-thu-duc"
                          checked={formData.propertyId === 'tong-kho-bai-song-than-thu-duc'}
                          onChange={() => setFormData({ ...formData, propertyId: 'tong-kho-bai-song-than-thu-duc' })}
                          className="w-4 h-4 text-[#243457]"
                        />
                        <div className="text-xs">
                          <div className="font-bold text-[#243457]">Kho bãi QL1A Thủ Đức</div>
                          <div className="text-slate-500">301 QL1A - Cạnh Sóng Thần</div>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Visit Date & Time Slot */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Ngày dự kiến xem mặt bằng
                      </label>
                      <input
                        type="date"
                        value={formData.visitDate}
                        onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#243457] focus:bg-white transition-all cursor-pointer"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Khung giờ thuận tiện
                      </label>
                      <select
                        value={formData.visitTimeSlot}
                        onChange={(e) => setFormData({ ...formData, visitTimeSlot: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#243457] focus:bg-white transition-all cursor-pointer"
                      >
                        <option value="08:30 - 10:00 Sáng">08:30 - 10:00 Sáng</option>
                        <option value="10:00 - 11:30 Sáng">10:00 - 11:30 Sáng</option>
                        <option value="14:00 - 15:30 Chiều">14:00 - 15:30 Chiều</option>
                        <option value="15:30 - 17:30 Chiều">15:30 - 17:30 Chiều</option>
                        <option value="Ngoài giờ hành chính / Cuối tuần">Ngoài giờ hành chính / Cuối tuần</option>
                      </select>
                    </div>
                  </div>

                  {/* Notes / Special requirements */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Ghi chú thêm (Mục đích kinh doanh, tiến độ dọn vào...)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="VD: Cần chuyển văn phòng trong tháng sau, muốn khảo sát thêm về chỗ đậu 2 ô tô và thang hàng..."
                      value={formData.note}
                      onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#243457] focus:bg-white transition-all"
                    />
                  </div>

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-xl bg-[#243457] hover:bg-[#162238] text-amber-300 hover:text-white font-bold text-base shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-75"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-amber-300 border-t-transparent rounded-full animate-spin" />
                        <span>Đang xử lý dữ liệu...</span>
                      </div>
                    ) : (
                      <>
                        <Send className="w-5 h-5 text-amber-400" />
                        <span>Gửi Đăng Ký Lịch Xem & Nhận Báo Giá Trực Tiếp</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-1 text-center">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Thông tin của quý khách được bảo mật tuyệt đối và chỉ dùng để gửi báo giá.</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
