import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, SlidersHorizontal, RotateCcw, Check, ShieldAlert, Sparkles, Building2, Phone, Mail, MapPin, Share2 } from 'lucide-react';

export const PlaceholderSettingsModal: React.FC = () => {
  const { 
    isSettingsModalOpen, 
    setIsSettingsModalOpen, 
    prototypeSettings, 
    updatePrototypeSettings,
    resetAllDemoData 
  } = useStore();

  const [formData, setFormData] = useState(prototypeSettings);
  const [activeTab, setActiveTab] = useState<'placeholders' | 'readiness'>('placeholders');

  if (!isSettingsModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePrototypeSettings(formData);
    setIsSettingsModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#14281f]/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-[#fffdfa] rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-[#d6cfc2] overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
      >
        {/* Header */}
        <div className="px-6 py-5 bg-[#f6f1e7] border-b border-[#e4dcce] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1c382b] text-[#fbf9f4] flex items-center justify-center shadow-sm">
              <SlidersHorizontal className="w-5 h-5 text-[#8aa18e]" />
            </div>
            <div>
              <h3 id="settings-title" className="text-lg font-serif font-bold text-[#1c382b]">
                Store Configuration &amp; Placeholders
              </h3>
              <p className="text-xs text-[#526f58]">
                Review editable fields, live readiness checklist, and prototype limits
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsSettingsModalOpen(false)}
            className="p-2 text-[#526f58] hover:text-[#1c382b] hover:bg-[#ece3d3] rounded-lg transition-colors"
            aria-label="Close settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-[#e4dcce] bg-[#fbf9f4] px-6">
          <button
            type="button"
            onClick={() => setActiveTab('placeholders')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'placeholders'
                ? 'border-[#1c382b] text-[#1c382b]'
                : 'border-transparent text-[#59735d] hover:text-[#1c382b]'
            }`}
          >
            Editable Business Placeholders
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('readiness')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'readiness'
                ? 'border-[#1c382b] text-[#1c382b]'
                : 'border-transparent text-[#59735d] hover:text-[#1c382b]'
            }`}
          >
            Launch Readiness &amp; Certification Guide
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-[#243028]">
          {activeTab === 'placeholders' ? (
            <form id="settings-form" onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3.5 rounded-xl bg-[#faeee9] border border-[#f0cfc5] text-xs text-[#8f3620] flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 shrink-0 text-[#bf563b] mt-0.5" />
                <div>
                  <strong className="font-semibold">Prototype Placeholder Notice:</strong> All values here are safe placeholders. You can edit them to test how the brand will look once commercial contact lines and logistics thresholds are established.
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-[#1c382b] mb-1 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#59735d]" />
                    Customer Support Email Placeholder
                  </label>
                  <input
                    type="text"
                    value={formData.shopEmail}
                    onChange={(e) => setFormData({ ...formData, shopEmail: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#c9d6cb] bg-white text-[#1c382b] text-sm focus:outline-none focus:ring-2 focus:ring-[#1c382b]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#1c382b] mb-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#59735d]" />
                    Support Phone Number Placeholder
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#c9d6cb] bg-white text-[#1c382b] text-sm focus:outline-none focus:ring-2 focus:ring-[#1c382b]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#1c382b] mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#59735d]" />
                    Business Sourcing Hub / Address Placeholder
                  </label>
                  <textarea
                    rows={2}
                    value={formData.businessAddress}
                    onChange={(e) => setFormData({ ...formData, businessAddress: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#c9d6cb] bg-white text-[#1c382b] text-sm focus:outline-none focus:ring-2 focus:ring-[#1c382b]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#1c382b] mb-1 flex items-center gap-1.5">
                    <Share2 className="w-3.5 h-3.5 text-[#59735d]" />
                    Social Media Handles
                  </label>
                  <input
                    type="text"
                    value={formData.socialHandle}
                    onChange={(e) => setFormData({ ...formData, socialHandle: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#c9d6cb] bg-white text-[#1c382b] text-sm focus:outline-none focus:ring-2 focus:ring-[#1c382b]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div>
                    <label className="block text-xs font-medium text-[#1c382b] mb-1">
                      Free Shipping (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.freeShippingThreshold}
                      onChange={(e) => setFormData({ ...formData, freeShippingThreshold: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-lg border border-[#c9d6cb] bg-white text-[#1c382b] text-sm focus:outline-none focus:ring-2 focus:ring-[#1c382b]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#1c382b] mb-1">
                      Standard Shipping (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.standardShippingFee}
                      onChange={(e) => setFormData({ ...formData, standardShippingFee: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-lg border border-[#c9d6cb] bg-white text-[#1c382b] text-sm focus:outline-none focus:ring-2 focus:ring-[#1c382b]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#1c382b] mb-1">
                      Estimated Tax (%)
                    </label>
                    <input
                      type="number"
                      value={formData.taxRatePercent}
                      onChange={(e) => setFormData({ ...formData, taxRatePercent: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-lg border border-[#c9d6cb] bg-white text-[#1c382b] text-sm focus:outline-none focus:ring-2 focus:ring-[#1c382b]"
                    />
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#eef3ef] border border-[#c9d6cb] space-y-2">
                <h4 className="font-serif font-bold text-[#1c382b] text-base flex items-center gap-2">
                  <span>🏛️</span> Requirements for Real Indian Organic &amp; Food Sales
                </h4>
                <p className="text-xs text-[#526f58] leading-relaxed">
                  Under the Food Safety and Standards (Organic Foods) Regulations and APEDA / Ministry of Agriculture norms, any store marketing food as "Organic" in India must fulfill statutory mandates:
                </p>
                <ul className="text-xs text-[#264a39] space-y-1.5 list-disc list-inside">
                  <li><strong>Jaivik Bharat Logo:</strong> Mandatory on packaging with organic certification number.</li>
                  <li><strong>Third-Party Certification:</strong> NPOP (National Programme for Organic Production) or PGS-India (Participatory Guarantee System for India).</li>
                  <li><strong>FSSAI License:</strong> 14-digit FSSAI license covering organic and cold-pressed category.</li>
                  <li><strong>Educational vs Medical:</strong> Herbs (Tulsi, Ashwagandha) must carry dietary disclosures and must not make unsubstantiated curative claims.</li>
                </ul>
              </div>

              <div className="border border-[#e4dcce] rounded-xl p-4 bg-white space-y-3">
                <h4 className="font-semibold text-xs tracking-wider text-[#8aa18e] uppercase">
                  Service Connections Needed For Production Launch
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-[#fbf9f4] border border-[#e4dcce]">
                    <span className="font-semibold text-[#1c382b] block">💳 Payment Gateway</span>
                    <span className="text-[#59735d]">Connect Razorpay, PayU, or Cashfree API keys. Currently in Demo mode.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#fbf9f4] border border-[#e4dcce]">
                    <span className="font-semibold text-[#1c382b] block">🔐 Secure Authentication</span>
                    <span className="text-[#59735d]">Connect Supabase / Auth0 / Firebase. Currently using local browser storage.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#fbf9f4] border border-[#e4dcce]">
                    <span className="font-semibold text-[#1c382b] block">🚚 Logistics &amp; Shipping</span>
                    <span className="text-[#59735d]">Connect Shiprocket or Delhivery webhook for real-time tracking numbers.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#fbf9f4] border border-[#e4dcce]">
                    <span className="font-semibold text-[#1c382b] block">📧 Transactional Email &amp; SMS</span>
                    <span className="text-[#59735d]">Connect SendGrid, Resend, or Twilio for order receipts and OTP dispatches.</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer controls */}
        <div className="px-6 py-4 bg-[#f6f1e7] border-t border-[#e4dcce] flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={resetAllDemoData}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#bf563b] hover:bg-[#faeee9] rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data to Default</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsSettingsModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-[#526f58] hover:bg-[#ece3d3] rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            {activeTab === 'placeholders' && (
              <button
                type="submit"
                form="settings-form"
                className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold bg-[#1c382b] text-[#fbf9f4] rounded-lg hover:bg-[#284c3b] shadow-sm transition-all cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save Placeholders</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
