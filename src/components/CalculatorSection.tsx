import React, { useState } from 'react';
import { Calculator, Building2, Warehouse, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

interface CalculatorSectionProps {
  onOpenBooking: (propertyId: string, area?: string) => void;
}

export const CalculatorSection: React.FC<CalculatorSectionProps> = ({ onOpenBooking }) => {
  const [calcMode, setCalcMode] = useState<'office' | 'warehouse'>('office');
  
  // Office state
  const [staffCount, setStaffCount] = useState<number>(25);
  const [hasMeetingRooms, setHasMeetingRooms] = useState<boolean>(true);
  const [hasExecutiveRooms, setHasExecutiveRooms] = useState<boolean>(true);
  
  // Warehouse state
  const [palletCount, setPalletCount] = useState<number>(400);
  const [truckFrequency, setTruckFrequency] = useState<string>('daily');

  // Office calculations
  const baseStaffArea = staffCount * 5.5; // 5.5m2 per staff standard
  const meetingArea = hasMeetingRooms ? 30 : 0;
  const execArea = hasExecutiveRooms ? 25 : 0;
  const pantryLobbyArea = Math.round((baseStaffArea + meetingArea + execArea) * 0.15);
  const totalCalculatedOfficeArea = Math.round(baseStaffArea + meetingArea + execArea + pantryLobbyArea);
  
  // Estimated price for office (approx $18.5/m2)
  const estOfficeUsd = totalCalculatedOfficeArea * 18.5;
  const estOfficeVnd = Math.round(estOfficeUsd * 25400);

  // Warehouse calculations
  const basePalletArea = palletCount * 1.5; // ~1.5m2 per floor pallet + aisles
  const forkliftAisles = Math.round(basePalletArea * 0.35);
  const totalCalculatedWarehouseArea = Math.round(basePalletArea + forkliftAisles);
  // Warehouse price ~ 90,000 VND / m2
  const estWarehouseVnd = totalCalculatedWarehouseArea * 88000;

  return (
    <section className="py-20 bg-slate-100/90 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#243457]/10 text-[#243457] text-xs font-bold uppercase tracking-wider mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>Công Cụ Dự Toán Thông Minh</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#243457] tracking-tight" style={{ fontFamily: 'Verdana, sans-serif' }}>
            Ước Tính Diện Tích & Ngân Sách Thuê Tối Ưu
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Công cụ tính toán nhanh nhu cầu không gian làm việc hoặc kho bãi chứa hàng để tối ưu hóa chi phí đầu tư hàng tháng cho doanh nghiệp.
          </p>

          {/* Mode Switcher */}
          <div className="inline-flex p-1.5 bg-white rounded-xl mt-6 border border-slate-300/80 shadow-sm">
            <button
              onClick={() => setCalcMode('office')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                calcMode === 'office'
                  ? 'bg-[#243457] text-white shadow-md'
                  : 'text-slate-600 hover:text-[#243457]'
              }`}
            >
              <Building2 className="w-4 h-4 text-amber-400" />
              <span>Dự Toán Văn Phòng (Phú Nhuận)</span>
            </button>
            <button
              onClick={() => setCalcMode('warehouse')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                calcMode === 'warehouse'
                  ? 'bg-[#243457] text-white shadow-md'
                  : 'text-slate-600 hover:text-[#243457]'
              }`}
            >
              <Warehouse className="w-4 h-4 text-amber-400" />
              <span>Dự Toán Kho Bãi (Thủ Đức - QL1A)</span>
            </button>
          </div>
        </div>

        {/* Interactive Calculator Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-10 max-w-4xl mx-auto">
          {calcMode === 'office' ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Inputs */}
              <div className="md:col-span-7 space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-bold text-slate-700">
                      Số lượng nhân viên làm việc:
                    </label>
                    <span className="text-base font-extrabold text-[#243457] px-3 py-1 bg-slate-100 rounded-lg">
                      {staffCount} nhân sự
                    </span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={200}
                    step={5}
                    value={staffCount}
                    onChange={(e) => setStaffCount(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#243457]"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>5 người</span>
                    <span>50 người</span>
                    <span>100 người</span>
                    <span>200+ người</span>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Các không gian chức năng bổ sung:
                  </div>

                  <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={hasMeetingRooms}
                      onChange={(e) => setHasMeetingRooms(e.target.checked)}
                      className="w-4 h-4 rounded text-[#243457] focus:ring-[#243457]"
                    />
                    <div className="text-xs sm:text-sm">
                      <div className="font-semibold text-slate-800">Phòng họp riêng & Tiếp khách (+30m²)</div>
                      <div className="text-slate-500 text-[11px]">Sức chứa 8-12 người cho đối tác</div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={hasExecutiveRooms}
                      onChange={(e) => setHasExecutiveRooms(e.target.checked)}
                      className="w-4 h-4 rounded text-[#243457] focus:ring-[#243457]"
                    />
                    <div className="text-xs sm:text-sm">
                      <div className="font-semibold text-slate-800">Phòng Giám Đốc / Ban Lãnh Đạo (+25m²)</div>
                      <div className="text-slate-500 text-[11px]">Không gian riêng tư, view thoáng đẹp</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Output / Result Box */}
              <div className="md:col-span-5 bg-gradient-to-br from-[#243457] to-[#162238] text-white p-6 sm:p-7 rounded-2xl shadow-lg border border-amber-400/30 flex flex-col justify-between space-y-6">
                <div>
                  <div className="text-xs text-amber-300 font-semibold uppercase tracking-wider mb-1">
                    Đề xuất diện tích văn phòng
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-serif">
                    ~ {totalCalculatedOfficeArea} <span className="text-xl font-normal text-white">m²</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Trường Thịnh Building có sẵn các phân lô sàn: <strong>85m², 160m², 280m², 520m²</strong> phù hợp với quy mô này.
                  </p>
                </div>

                <div className="p-3 bg-white/10 rounded-xl space-y-1 text-xs backdrop-blur-sm">
                  <div className="text-slate-300">Dự toán ngân sách thuê:</div>
                  <div className="text-lg font-bold text-amber-300">
                    ~ {estOfficeUsd.toLocaleString()} USD <span className="text-xs text-slate-200 font-normal">/ tháng</span>
                  </div>
                  <div className="text-[11px] text-slate-300">
                    (~ {(estOfficeVnd / 1000000).toFixed(1)} triệu VNĐ/tháng)
                  </div>
                </div>

                <button
                  onClick={() => onOpenBooking('truong-thinh-building-phu-nhuan', `${totalCalculatedOfficeArea} m²`)}
                  className="w-full py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#162238] font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Nhận Báo Giá Sàn {totalCalculatedOfficeArea}m²</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Warehouse Inputs */}
              <div className="md:col-span-7 space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-bold text-slate-700">
                      Quy mô lưu kho (Pallet tiêu chuẩn):
                    </label>
                    <span className="text-base font-extrabold text-[#243457] px-3 py-1 bg-slate-100 rounded-lg">
                      {palletCount} pallet
                    </span>
                  </div>
                  <input
                    type="range"
                    min={100}
                    max={3000}
                    step={100}
                    value={palletCount}
                    onChange={(e) => setPalletCount(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#243457]"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>100 pallet</span>
                    <span>1.000 pallet</span>
                    <span>2.000 pallet</span>
                    <span>3.000+ pallet</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Tần suất xe Container & Tải ra vào:
                  </label>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setTruckFrequency('daily')}
                      className={`p-2.5 rounded-xl border text-center font-semibold transition-all cursor-pointer ${
                        truckFrequency === 'daily'
                          ? 'bg-[#243457] text-white border-[#243457]'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      Hàng ngày 24/7
                    </button>
                    <button
                      type="button"
                      onClick={() => setTruckFrequency('weekly')}
                      className={`p-2.5 rounded-xl border text-center font-semibold transition-all cursor-pointer ${
                        truckFrequency === 'weekly'
                          ? 'bg-[#243457] text-white border-[#243457]'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      2 - 3 chuyến/tuần
                    </button>
                    <button
                      type="button"
                      onClick={() => setTruckFrequency('monthly')}
                      className={`p-2.5 rounded-xl border text-center font-semibold transition-all cursor-pointer ${
                        truckFrequency === 'monthly'
                          ? 'bg-[#243457] text-white border-[#243457]'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      Kho lưu dài hạn
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1">
                  <div className="font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Lợi thế mặt bằng kho QL1A Thủ Đức:</span>
                  </div>
                  <p>Mặt bằng xe container bốc dỡ 24/7 không cấm giờ, trần cao 10.5m xếp được 3 - 4 tầng kệ pallet.</p>
                </div>
              </div>

              {/* Warehouse Output */}
              <div className="md:col-span-5 bg-gradient-to-br from-[#243457] to-[#162238] text-white p-6 sm:p-7 rounded-2xl shadow-lg border border-amber-400/30 flex flex-col justify-between space-y-6">
                <div>
                  <div className="text-xs text-amber-300 font-semibold uppercase tracking-wider mb-1">
                    Đề xuất diện tích kho bãi
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-serif">
                    ~ {totalCalculatedWarehouseArea} <span className="text-xl font-normal text-white">m²</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Tổng kho Sóng Thần có các block: <strong>350m², 750m², 1.500m², 3.500m²</strong> bàn giao ngay.
                  </p>
                </div>

                <div className="p-3 bg-white/10 rounded-xl space-y-1 text-xs backdrop-blur-sm">
                  <div className="text-slate-300">Dự toán ngân sách thuê kho:</div>
                  <div className="text-lg font-bold text-amber-300">
                    ~ {(estWarehouseVnd / 1000000).toFixed(1)} Triệu VNĐ <span className="text-xs text-slate-200 font-normal">/ tháng</span>
                  </div>
                  <div className="text-[11px] text-emerald-300 font-semibold">
                    🎁 Tặng 1 tháng tiền thuê khi ký 3 năm
                  </div>
                </div>

                <button
                  onClick={() => onOpenBooking('tong-kho-bai-song-than-thu-duc', `${totalCalculatedWarehouseArea} m²`)}
                  className="w-full py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#162238] font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Nhận Báo Giá Kho {totalCalculatedWarehouseArea}m²</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
