import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Mail, Phone, MapPin, Share2, Send, MessageSquare, ShieldAlert, CheckCircle2, SlidersHorizontal } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { prototypeSettings, submitFeedback, feedbacks, setIsSettingsModalOpen } = useStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Product Sourcing & Origins');
  const [message, setMessage] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState<any>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    submitFeedback({
      name: name || 'Anonymous Visitor',
      email: email || 'Unspecified email',
      topic,
      message,
    });

    setSubmittedMessage({
      name: name || 'Anonymous Visitor',
      email: email || 'Unspecified email',
      topic,
      message,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });

    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#bf563b]">
          Village Connections &amp; Support
        </span>
        <h1 className="font-serif font-bold text-3xl sm:text-5xl text-[#1c382b]">
          Get in Touch with Root &amp; River
        </h1>
        <p className="text-xs sm:text-sm text-[#526f58]">
          Have questions about our village harvest, grower collectives, delivery timelines, or traditional preparations? We welcome your thoughts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Contact Info & Placeholders Card (Span 5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#fffdfa] border border-[#e4dcce] shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#e4dcce]">
              <h3 className="font-serif font-bold text-lg text-[#1c382b]">
                Contact Placeholders
              </h3>
              <button
                type="button"
                onClick={() => setIsSettingsModalOpen(true)}
                className="text-xs font-medium text-[#bf563b] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Edit Details</span>
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-[#eef3ef] text-[#1c382b] shrink-0">
                  <Mail className="w-4 h-4 text-[#59735d]" />
                </div>
                <div>
                  <strong className="block text-[#1c382b] font-semibold">Customer Sourcing Desk</strong>
                  <span className="font-mono text-[#526f58]">{prototypeSettings.shopEmail}</span>
                  <span className="block text-[11px] text-[#8aa18e] mt-0.5">Editable email placeholder</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-[#eef3ef] text-[#1c382b] shrink-0">
                  <Phone className="w-4 h-4 text-[#59735d]" />
                </div>
                <div>
                  <strong className="block text-[#1c382b] font-semibold">Rural Hub Helpline</strong>
                  <span className="font-mono text-[#526f58]">{prototypeSettings.phone}</span>
                  <span className="block text-[11px] text-[#8aa18e] mt-0.5">10:00 AM – 6:00 PM IST (Mon - Sat)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-[#eef3ef] text-[#1c382b] shrink-0">
                  <MapPin className="w-4 h-4 text-[#59735d]" />
                </div>
                <div>
                  <strong className="block text-[#1c382b] font-semibold">Aggregation &amp; Packing Sourcing Hub</strong>
                  <span className="font-mono text-[#526f58]">{prototypeSettings.businessAddress}</span>
                  <span className="block text-[11px] text-[#8aa18e] mt-0.5">Physical facility address placeholder</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-[#eef3ef] text-[#1c382b] shrink-0">
                  <Share2 className="w-4 h-4 text-[#59735d]" />
                </div>
                <div>
                  <strong className="block text-[#1c382b] font-semibold">Social Village Community</strong>
                  <span className="font-mono text-[#526f58]">{prototypeSettings.socialHandle}</span>
                  <span className="block text-[11px] text-[#8aa18e] mt-0.5">Social channels placeholder</span>
                </div>
              </div>
            </div>

            {/* Prototype Form Notice */}
            <div className="p-3.5 rounded-xl bg-[#f6f1e7] border border-[#e4dcce] text-xs text-[#526f58] space-y-1">
              <span className="font-semibold text-[#1c382b] block">Form Dispatch Routing Notice:</span>
              <p className="text-[11px] leading-relaxed">
                This website is an interactive prototype. Messages submitted through the form are recorded locally in the session inbox and do not transmit out over external networks until connected to an SMTP / Resend service endpoint.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Feedback & Suggestions Form (Span 7) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#fffdfa] border border-[#e4dcce] shadow-xs space-y-6">
            <div>
              <h3 className="font-serif font-bold text-xl text-[#1c382b]">
                Feedback, Inquiries &amp; Grower Connections
              </h3>
              <p className="text-xs text-[#526f58] mt-1">
                Share feedback on our harvests, inquire about village origins, or recommend rural farmers.
              </p>
            </div>

            {submittedMessage && (
              <div className="p-4 rounded-2xl bg-[#eef3ef] border border-[#c9d6cb] flex items-start gap-3 text-xs text-[#1c382b] animate-in fade-in duration-200">
                <CheckCircle2 className="w-5 h-5 text-[#2e6844] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <strong className="font-semibold text-[#2e6844] block">
                    Message Recorded in Demo Inbox!
                  </strong>
                  <p className="text-[#526f58]">
                    Thank you, <strong>{submittedMessage.name}</strong>. Your message regarding <em>"{submittedMessage.topic}"</em> was logged at {submittedMessage.date}.
                  </p>
                  <p className="text-[11px] text-[#8aa18e]">
                    Configurable production destination: {prototypeSettings.shopEmail}
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1c382b] mb-1">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Ananya Deshmukh"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#c9d6cb] bg-white text-[#1c382b] focus:outline-none focus:ring-2 focus:ring-[#1c382b]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1c382b] mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g., ananya@example.com"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#c9d6cb] bg-white text-[#1c382b] focus:outline-none focus:ring-2 focus:ring-[#1c382b]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1c382b] mb-1">
                  Topic of Discussion
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#c9d6cb] bg-white text-[#1c382b] focus:outline-none focus:ring-2 focus:ring-[#1c382b] cursor-pointer"
                >
                  <option value="Product Sourcing & Origins">Product Sourcing &amp; Village Origins</option>
                  <option value="Website & Catalog Feedback">Website Experience &amp; Suggestions</option>
                  <option value="Farmer & Village Partnership">Farmer / Cooperative Partnership Inquiry</option>
                  <option value="Packaging & Delivery Question">Packaging, Storage &amp; Delivery Question</option>
                  <option value="General Greetings">General Note or Suggestion</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1c382b] mb-1">
                  Your Message <span className="text-[#bf563b]">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share your thoughts, suggestions, or questions with us..."
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#c9d6cb] bg-white text-[#1c382b] focus:outline-none focus:ring-2 focus:ring-[#1c382b]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 bg-[#1c382b] text-white font-serif font-bold text-xs rounded-xl hover:bg-[#284c3b] shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4 text-[#8aa18e]" />
                <span>Submit Prototype Message</span>
              </button>
            </form>

            {/* Display local submitted feedbacks in prototype */}
            {feedbacks.length > 0 && (
              <div className="pt-6 border-t border-[#e4dcce] space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#8aa18e] block">
                  Prototype Message Log ({feedbacks.length})
                </span>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {feedbacks.map((fb) => (
                    <div key={fb.id} className="p-3 rounded-xl bg-[#f6f1e7] border border-[#e4dcce] text-xs space-y-1">
                      <div className="flex items-center justify-between text-[#1c382b]">
                        <span className="font-semibold">{fb.name} &bull; <span className="font-normal text-[#59735d]">{fb.topic}</span></span>
                        <span className="text-[10px] text-[#8aa18e]">{fb.submittedAt}</span>
                      </div>
                      <p className="text-[#526f58] line-clamp-2">{fb.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

