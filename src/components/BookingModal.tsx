import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar, 
  Send, 
  CheckCircle2, 
  Building2, 
  Warehouse, 
  ShieldCheck, 
  Phone, 
  Clock, 
  MapPin 
} from 'lucide-react';
import { COMPANY_INFO, PROPERTIES_DATA } from '../data/properties';
import { submitLeadToWebhook } from '../services/leadService';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPropertyId?: string;
  initialArea?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialPropertyId = 'truong-thinh-building-phu-nhuan',
  initialArea = '',
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    propertyId: initialPropertyId,
    areaNeeded: initialArea || '',
    visitDate: '',
    visitTimeSlot: '09:00 - 10:30 Sáng',
    note: '',
  });

  useEffect(() => {
    if (initialPropertyId) {
      setFormData((prev) => ({
        ...prev,
        propertyId: initialPropertyId,
        areaNeeded: initialArea || prev.areaNeeded,
      }));
    }
  }, [initialPropertyId, initialArea]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingCode, setBookingCode] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const generatedCode = 'TTI-' + Math.floor(100000 + Math.random() * 900000);
    const selectedProp = PROPERTIES_DATA.find((p) => p.id === formData.propertyId);

    // Call Webhook
    await submitLeadToWebhook({
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      propertyId: formData.propertyId,
      propertyName: selectedProp?.title || formData.propertyId,
      areaNeeded: formData.areaNeeded,
      visitDate: formData.visitDate || 'Sớm nhất / Hôm nay',
      visitTimeSlot: formData.visitTimeSlot,
      note: formData.note,
      bookingCode: generatedCode,
      formType: 'Modal Đặt Lịch (BookingModal)',
    });

    setIsSubmitting(false);
    setIsSuccess(true);
    setBookingCode(generatedCode);
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-xl w-full border border-slate-700/50 relative">
        {/* Header */}
        <div className="p-4 sm:p-6 bg-[#243457] text-white flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-[#162238] flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-amber-300 font-bold uppercase tracking-wider">
                Trực tiếp Chủ Đầu Tư
              </span>
              <h3 className="text-lg sm:text-xl font-bold font-serif leading-tight">
                Đặt Lịch Khảo Sát & Nhận Báo Giá
              </h3>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-7">
          {isSuccess ? (
            <div className="text-center py-6 space-y-5 animate-in zoom-in-95">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase">
                  Đăng Ký Thành Công
                </span>
                <h4 className="text-2xl font-bold text-[#243457] font-serif mt-2">
                  Lịch Hẹn Đã Được Ghi Nhận
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Mã xác nhận: <strong className="text-[#243457] font-mono text-base">{bookingCode}</strong>
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Chuyên viên quản lý mặt bằng sẽ liên hệ qua số <strong>{formData.phone}</strong> trong vòng 15 phút để chuẩn bị tiếp đón quý khách.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-left space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Khách hàng:</span>
                  <span className="font-bold text-[#243457]">{formData.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Bất động sản:</span>
                  <span className="font-bold text-[#243457]">
                    {formData.propertyId === 'truong-thinh-building-phu-nhuan'
                      ? 'Trường Thịnh Building (Phú Nhuận)'
                      : 'Tổng Kho Sóng Thần (Thủ Đức)'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Thời gian xem:</span>
                  <span className="font-bold text-emerald-700">
                    {formData.visitDate || 'Hôm nay / Sớm nhất'} ({formData.visitTimeSlot})
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <a
                  href={`tel:${COMPANY_INFO.hotlineRaw}`}
                  className="flex-1 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm text-center shadow-md"
                >
                  Gọi Hotline: {COMPANY_INFO.hotline}
                </a>
                <button
                  onClick={handleClose}
                  className="px-5 py-3 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs sm:text-sm cursor-pointer"
                >
                  Hoàn Tất
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="VD: Trần Anh Dũng"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#243457]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="VD: 0909 xxx xxx"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#243457]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email nhận báo giá <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#243457]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Diện tích mong muốn (m²)
                  </label>
                  <input
                    type="text"
                    placeholder="VD: 85m², 160m², 500m²..."
                    value={formData.areaNeeded}
                    onChange={(e) => setFormData({ ...formData, areaNeeded: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#243457]"
                  />
                </div>
              </div>

              {/* Property choice */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Địa điểm quan tâm <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, propertyId: 'truong-thinh-building-phu-nhuan' })}
                    className={`p-2.5 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer flex items-center gap-2 ${
                      formData.propertyId === 'truong-thinh-building-phu-nhuan'
                        ? 'bg-[#243457] text-white border-[#243457]'
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <div className="truncate">
                      <div>Văn Phòng Phú Nhuận</div>
                      <div className="text-[10px] opacity-80 font-normal">140B Nguyễn Văn Trỗi</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, propertyId: 'tong-kho-bai-song-than-thu-duc' })}
                    className={`p-2.5 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer flex items-center gap-2 ${
                      formData.propertyId === 'tong-kho-bai-song-than-thu-duc'
                        ? 'bg-[#243457] text-white border-[#243457]'
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    <Warehouse className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <div className="truncate">
                      <div>Tổng Kho Thủ Đức</div>
                      <div className="text-[10px] opacity-80 font-normal">301 Quốc Lộ 1A</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Ngày muốn xem mặt bằng
                  </label>
                  <input
                    type="date"
                    value={formData.visitDate}
                    onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#243457] cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Khung giờ đón tiếp
                  </label>
                  <select
                    value={formData.visitTimeSlot}
                    onChange={(e) => setFormData({ ...formData, visitTimeSlot: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#243457] cursor-pointer"
                  >
                    <option value="08:30 - 10:00 Sáng">08:30 - 10:00 Sáng</option>
                    <option value="10:00 - 11:30 Sáng">10:00 - 11:30 Sáng</option>
                    <option value="14:00 - 15:30 Chiều">14:00 - 15:30 Chiều</option>
                    <option value="15:30 - 17:30 Chiều">15:30 - 17:30 Chiều</option>
                    <option value="Ngoài giờ / Cuối tuần">Ngoài giờ / Cuối tuần</option>
                  </select>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-xl bg-[#243457] hover:bg-[#162238] text-amber-300 font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                {isSubmitting ? (
                  <span>Đang gửi thông tin...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-amber-400" />
                    <span>Xác Nhận Đặt Lịch Xem Mặt Bằng</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
