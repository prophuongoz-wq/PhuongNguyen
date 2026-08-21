export interface LeadData {
  fullName: string;
  phone: string;
  email: string;
  propertyId: string;
  propertyName?: string;
  areaNeeded?: string;
  visitDate?: string;
  visitTimeSlot?: string;
  note?: string;
  formType?: 'ContactSection' | 'BookingModal' | 'CalculatorSection' | string;
  submittedAt?: string;
  bookingCode?: string;
}

const STORAGE_KEY_WEBHOOK_URL = 'tti_webhook_script_url';
const STORAGE_KEY_SAVED_LEADS = 'tti_customer_leads';

// Default / fallback webhook URL (can be customized via settings or .env)
export const getWebhookUrl = (): string => {
  if (typeof window === 'undefined') return '';
  const stored = localStorage.getItem(STORAGE_KEY_WEBHOOK_URL);
  if (stored) return stored.trim();
  const envUrl = (import.meta as unknown as { env?: Record<string, string> }).env?.VITE_GOOGLE_APPS_SCRIPT_URL;
  return envUrl || '';
};

export const setWebhookUrl = (url: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_WEBHOOK_URL, url.trim());
};

export const getSavedLeads = (): LeadData[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SAVED_LEADS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to parse saved leads:', e);
    return [];
  }
};

export const saveLeadLocally = (lead: LeadData): void => {
  if (typeof window === 'undefined') return;
  try {
    const leads = getSavedLeads();
    leads.unshift(lead);
    localStorage.setItem(STORAGE_KEY_SAVED_LEADS, JSON.stringify(leads.slice(0, 100))); // Keep last 100
  } catch (e) {
    console.error('Failed to save lead locally:', e);
  }
};

/**
 * Sends lead data to Google Apps Script Webhook
 */
export const submitLeadToWebhook = async (lead: LeadData): Promise<{ success: boolean; message: string }> => {
  const timestamp = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
  const bookingCode = lead.bookingCode || 'TTI-' + Math.floor(100000 + Math.random() * 900000);

  const fullLeadData: LeadData = {
    ...lead,
    bookingCode,
    submittedAt: timestamp,
    propertyName:
      lead.propertyName ||
      (lead.propertyId === 'truong-thinh-building-phu-nhuan'
        ? 'Trường Thịnh Building (140B Nguyễn Văn Trỗi, Phú Nhuận)'
        : 'Tổng Kho Sóng Thần (301 Quốc Lộ 1A, Thủ Đức)'),
  };

  // Always save backup in localStorage
  saveLeadLocally(fullLeadData);

  const webhookUrl = getWebhookUrl();

  if (!webhookUrl) {
    console.warn(
      '⚠️ Chưa cấu hình Webhook URL Google Apps Script. Dữ liệu khách hàng đã được lưu an toàn trong bộ nhớ máy (Local Backup).'
    );
    return {
      success: true,
      message: 'Đã ghi nhận yêu cầu thành công (Lưu trữ cục bộ). Vui lòng cấu hình Webhook URL để đồng bộ Google Sheet.',
    };
  }

  try {
    // We send payload as standard JSON or URLSearchParams depending on Google Apps Script requirements.
    // mode: 'no-cors' allows Google Apps Script Web App redirects without throwing CORS exceptions in browser.
    await fetch(webhookUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(fullLeadData),
    });

    console.log('✅ Đã gửi data khách hàng thành công đến Google Apps Script Webhook:', fullLeadData);
    return {
      success: true,
      message: 'Dữ liệu đã được chuyển tiếp thành công đến Google Sheet!',
    };
  } catch (err) {
    console.error('❌ Lỗi khi gửi dữ liệu đến Google Apps Script:', err);
    return {
      success: false,
      message: 'Gửi lên Google Sheet thất bại nhưng dữ liệu đã được lưu trữ an toàn trong máy.',
    };
  }
};
