export interface TechnicalSpec {
  label: string;
  value: string;
  iconName?: string;
  category: 'structure' | 'technical' | 'amenity' | 'safety' | 'logistics';
}

export interface AvailableSpace {
  area: string; // e.g. "80 m²", "250 m²"
  floorOrZone: string;
  pricePerUnit: string; // e.g. "$18/m²/tháng"
  status: 'Còn trống' | 'Đang trống' | 'Sắp bàn giao' | 'Đã cọc giữ chỗ' | 'Sẵn sàng bàn giao' | 'Full' | 'Đã thuê';
  idealFor: string;
  setupFreeDays: string;
}

export interface PropertyItem {
  id: string;
  title: string;
  slug: string;
  tag: 'Tòa nhà văn phòng' | 'Tổng kho bãi & Nhà xưởng';
  category: 'office' | 'warehouse';
  address: string;
  district: string;
  city: string;
  headline: string;
  summary: string;
  statusBadge: string;
  mainImage: string;
  gallery: string[];
  specs: TechnicalSpec[];
  availableSpaces: AvailableSpace[];
  highlights: string[];
  suitableFor: string[];
  locationAdvantages: {
    title: string;
    distance: string;
    description: string;
  }[];
  priceNote: string;
  currentPromo: string;
  lat: number;
  lng: number;
  mapEmbedQuery: string;
}

export interface BookingRequest {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  propertyId: string;
  propertyName: string;
  propertyType: string;
  requiredArea: string;
  visitDate: string;
  visitTime: string;
  notes?: string;
  createdAt: string;
}
