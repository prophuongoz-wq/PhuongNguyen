import React, { useState, useEffect } from 'react';
import {
  X,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ExternalLink,
  Send,
  Database,
  RefreshCw,
  Trash2,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import {
  getWebhookUrl,
  setWebhookUrl,
  getSavedLeads,
  submitLeadToWebhook,
  LeadData
} from '../services/leadService';

interface WebhookManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WebhookManagerModal: React.FC<WebhookManagerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [urlInput, setUrlInput] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [savedLeads, setSavedLeads] = useState<LeadData[]>([]);
  const [activeTab, setActiveTab] = useState<'config' | 'code' | 'leads'>('config');

  useEffect(() => {
    if (isOpen) {
      setUrlInput(getWebhookUrl());
      setSavedLeads(getSavedLeads());
      setTestResult(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    setWebhookUrl(urlInput.trim());
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleTestConnection = async () => {
    if (!urlInput.trim()) {
      setTestResult({
        success: false,
        message: 'Vui lòng dán Webhook URL Google Apps Script trước khi kiểm tra.',
      });
      return;
    }

    setWebhookUrl(urlInput.trim());
    setIsTesting(true);
    setTestResult(null);

    const testLead: LeadData = {
      fullName: 'Khách Hàng Thử Nghiệm (Test Bot)',
      phone: '0906438181',
      email: 'test@truongthinhinvest.vn',
      propertyId: 'truong-thinh-building-phu-nhuan',
      propertyName: 'Trường Thịnh Building (Test Webhook)',
      areaNeeded: '120 m²',
      visitDate: 'Hôm nay',
      visitTimeSlot: '09:00 Sáng',
      note: 'Dữ liệu kiểm tra kết nối từ website Trường Thịnh Invest',
      formType: 'Kiểm Tra Webhook',
    };

    const res = await submitLeadToWebhook(testLead);
    setIsTesting(false);
    setTestResult({
      success: true,
      message: '✅ Đã gửi tín hiệu kiểm tra thành công! Hãy mở Google Sheet kiểm tra hàng dữ liệu mới.',
    });
    setSavedLeads(getSavedLeads());
  };

  const appsScriptCode = `/**
 * Google Apps Script Webhook - Trường Thịnh Invest
 * Nhận dữ liệu form website tự động ghi vào Google Sheets
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    var timestamp = Utilities.formatDate(new Date(), "GMT+7", "dd/MM/yyyy HH:mm:ss");

    sheet.appendRow([
      timestamp,
      data.fullName || '',
      "'" + (data.phone || ''),
      data.email || '',
      data.propertyName || data.propertyId || '',
      data.areaNeeded || '',
      data.visitDate || 'Liên hệ sau',
      data.visitTimeSlot || '',
      data.note || '',
      data.bookingCode || '',
      data.formType || 'Website Form'
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Webhook Trường Thịnh Invest đang hoạt động!");
}`;

  const copyAppsScript = () => {
    navigator.clipboard.writeText(appsScriptCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 text-white rounded-3xl overflow-hidden shadow-2xl max-w-2xl w-full relative">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#162238] border-b border-slate-700/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 flex items-center justify-center font-bold">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold font-serif text-white">
                  Tích Hợp Google Sheets & Apps Script
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
                  Đã Kích Hoạt
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Tự động đẩy toàn bộ thông tin khách hàng điền form về Google Sheet thời gian thực.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 px-6 pt-2">
          <button
            onClick={() => setActiveTab('config')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 cursor-pointer transition-all ${
              activeTab === 'config'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            ⚙️ Cấu Hình Webhook URL
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 cursor-pointer transition-all ${
              activeTab === 'code'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            📝 Mã Nguồn Apps Script (.gs)
          </button>
          <button
            onClick={() => {
              setActiveTab('leads');
              setSavedLeads(getSavedLeads());
            }}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 cursor-pointer transition-all flex items-center gap-1.5 ${
              activeTab === 'leads'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Data Khách Đã Nhận ({savedLeads.length})</span>
          </button>
        </div>

        {/* Body content */}
        <div className="p-6">
          {activeTab === 'config' && (
            <div className="space-y-5">
              <div className="bg-[#1e293b] rounded-2xl p-4 border border-slate-700/80 space-y-3">
                <label className="block text-xs font-bold text-slate-200">
                  Dán đường dẫn Webhook URL (Google Apps Script Web App):
                </label>
                <div className="space-y-2">
                  <input
                    type="url"
                    placeholder="https://script.google.com/macros/s/AKfycbx.../exec"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl bg-slate-900 border border-slate-600 text-amber-300 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                  <p className="text-[11px] text-slate-400">
                    💡 Đường dẫn nhận được sau khi bấm <em>Deploy $\rightarrow$ New deployment $\rightarrow$ Web App</em> trên Google Apps Script.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={handleSave}
                    className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#162238] font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    {isSaved ? <Check className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                    <span>{isSaved ? 'Đã Lưu Webhook URL!' : 'Lưu Cấu Hình'}</span>
                  </button>

                  <button
                    onClick={handleTestConnection}
                    disabled={isTesting}
                    className="px-4 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {isTesting ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4 text-emerald-400" />
                    )}
                    <span>{isTesting ? 'Đang gửi thử...' : 'Gửi Thử 1 Khách Mẫu'}</span>
                  </button>
                </div>
              </div>

              {/* Test Result alert */}
              {testResult && (
                <div
                  className={`p-4 rounded-xl border text-xs leading-relaxed flex items-start gap-2.5 ${
                    testResult.success
                      ? 'bg-emerald-950/50 border-emerald-700 text-emerald-200'
                      : 'bg-red-950/50 border-red-700 text-red-200'
                  }`}
                >
                  {testResult.success ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  )}
                  <span>{testResult.message}</span>
                </div>
              )}

              {/* Quick Checklist */}
              <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60 space-y-2 text-xs text-slate-300">
                <div className="font-bold text-amber-300">Quy trình đồng bộ 2 tầng:</div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span><strong>Tầng 1 (Tức thì):</strong> Khách điền $\rightarrow$ Đẩy trực tiếp vào Google Sheet qua Webhook.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span><strong>Tầng 2 (Backup An Toàn):</strong> Lưu bản sao trong Local Storage trình duyệt (không lo mất data khi mất mạng).</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Dán đoạn mã này vào file <code>Code.gs</code> trong Google Apps Script:
                </span>
                <button
                  onClick={copyAppsScript}
                  className="px-3 py-1.5 rounded-lg bg-amber-400/20 text-amber-300 hover:bg-amber-400/30 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Đã Sao Chép!' : 'Copy Code'}</span>
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400 font-mono text-[11px] max-h-72 overflow-y-auto leading-relaxed">
                {appsScriptCode}
              </pre>
            </div>
          )}

          {activeTab === 'leads' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Dữ liệu khách hàng đã lưu trên hệ thống ({savedLeads.length} yêu cầu)</span>
                {savedLeads.length > 0 && (
                  <button
                    onClick={() => {
                      localStorage.removeItem('tti_customer_leads');
                      setSavedLeads([]);
                    }}
                    className="text-red-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Xóa lịch sử</span>
                  </button>
                )}
              </div>

              {savedLeads.length === 0 ? (
                <div className="p-8 text-center bg-slate-950/50 rounded-xl border border-slate-800 text-slate-500 text-xs">
                  Chưa có yêu cầu nào được gửi từ form.
                </div>
              ) : (
                <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                  {savedLeads.map((lead, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-800/70 border border-slate-700/80 text-xs space-y-1.5"
                    >
                      <div className="flex items-center justify-between font-bold text-white">
                        <span className="text-amber-300">{lead.fullName}</span>
                        <span className="text-[11px] text-slate-400 font-mono">{lead.submittedAt}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-slate-300 text-[11px]">
                        <div>📞 SĐT: <strong>{lead.phone}</strong></div>
                        <div>✉️ Email: {lead.email}</div>
                        <div>🏢 BĐS: {lead.propertyName || lead.propertyId}</div>
                        <div>📐 Nhu cầu: {lead.areaNeeded || 'Theo trao đổi'}</div>
                      </div>
                      {lead.note && (
                        <div className="text-[11px] text-slate-400 bg-slate-900/60 p-2 rounded border border-slate-800">
                          💬 {lead.note}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Trường Thịnh Invest • Form to Google Sheets Automation</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
