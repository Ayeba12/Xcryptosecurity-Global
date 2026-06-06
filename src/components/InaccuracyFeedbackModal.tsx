import React, { useState, useEffect } from 'react';
import { Shield, AlertCircle, X, Check, ArrowRight, Sparkles, Send, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../utils/LanguageContext';

// Custom event to handle opening the modal from any page without prop-drilling
export const triggerInaccuracyReport = (pageContext: string) => {
  window.dispatchEvent(
    new CustomEvent('open-inaccuracy-report', {
      detail: { page: pageContext }
    })
  );
};

// Reusable elegant banner component to place at the bottom of informational pages
export const ReportInaccuracyButton: React.FC<{ pageName: string }> = ({ pageName }) => {
  const { t } = useLanguage();
  return (
    <div className="mt-10 border-2 border-dashed border-red-200 bg-[#fdf5f2] p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-left">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-[#ab3600]">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span className="font-mono text-[9px] font-black tracking-widest uppercase">
            {t('nav.integrity_system', 'CONTENT VERIFICATION SYSTEM')}
          </span>
        </div>
        <h4 className="font-sora text-xs font-extrabold uppercase text-gray-900 leading-tight">
          {t('inaccuracy.banner_title', 'Spot an outdated threat factor or coordinate mistake?')}
        </h4>
        <p className="font-mono text-[10.5px] text-gray-500 leading-normal">
          {t('inaccuracy.banner_desc', 'Help independent analysts maintain pristine audit accuracy by reporting coordinate changes instantly.')}
        </p>
      </div>
      <button
        type="button"
        onClick={() => triggerInaccuracyReport(pageName)}
        className="px-4 py-2 bg-white hover:bg-neutral-50 text-gray-900 hover:text-black border-2 border-black font-mono text-[10px] font-black uppercase shrink-0 transition-all cursor-pointer shadow-[3px_3px_0_rgba(171,54,0,0.15)] flex items-center gap-1.5 active-press"
        id={`btn-report-inaccuracy-${pageName.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <span>{t('inaccuracy.btn_text', 'Report inaccuracy')}</span>
        <ArrowRight className="w-3.5 h-3.5 text-[#ab3600]" />
      </button>
    </div>
  );
};

// Main Inaccuracy Report Modal structure
export const InaccuracyFeedbackModal: React.FC = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [pageContext, setPageContext] = useState('');
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [details, setDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [receiptHash, setReceiptHash] = useState('');

  // Handle custom trigger events
  useEffect(() => {
    const handleTrigger = (e: Event) => {
      const customEvent = e as CustomEvent<{ page: string }>;
      if (customEvent.detail && customEvent.detail.page) {
        setPageContext(customEvent.detail.page);
        setIsOpen(true);
        // Reset form upon opening
        setSenderName('');
        setSenderEmail('');
        setDetails('');
        setSubmitSuccess(false);
        setIsSubmitting(false);
      }
    };

    window.addEventListener('open-inaccuracy-report', handleTrigger);
    return () => window.removeEventListener('open-inaccuracy-report', handleTrigger);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!details.trim()) return;

    setIsSubmitting(true);

    // Simulate cryptographic local hashing submission
    setTimeout(() => {
      const entropy = Math.random().toString(36).substring(2, 10);
      const randomSha = `SHA256: 3c91a091feee87b0a394c8e7${entropy}660241ddb4bdce898a9bc01a403fedf9`;
      setReceiptHash(randomSha);
      
      // Store report local storage database
      const newReport = {
        id: `inc-report-${Date.now()}`,
        page: pageContext,
        name: senderName || 'Anonymous Forensicator',
        email: senderEmail || 'anonymous@csg-ledger.local',
        details,
        timestamp: new Date().toUTCString(),
        hash: randomSha
      };

      try {
        const existing = localStorage.getItem('csg_inaccuracy_reports');
        const parsed = existing ? JSON.parse(existing) : [];
        parsed.unshift(newReport);
        localStorage.setItem('csg_inaccuracy_reports', JSON.stringify(parsed));

        // Also cross-sync to the contact tickets system to ensure it coordinates cleanly!
        const existingTickets = localStorage.getItem('csg_contact_tickets');
        const parsedTickets = existingTickets ? JSON.parse(existingTickets) : [];
        parsedTickets.unshift({
          id: `ticket-inaccuracy-${Date.now()}`,
          senderName: newReport.name,
          senderEmail: newReport.email,
          category: `ACCURACY RECTIFICATION: ${pageContext.toUpperCase()}`,
          priority: 'CRITICAL',
          referenceLink: `CSG://${pageContext.toUpperCase().replace(/\s+/g, '_')}`,
          message: `Inaccuracy Report Correction Details:\n${newReport.details}`,
          timestamp: newReport.timestamp,
          transmissionHash: randomSha,
          status: 'PENDING ANALYSIS',
          collabType: 'Content Correction Advisory'
        });
        localStorage.setItem('csg_contact_tickets', JSON.stringify(parsedTickets));

      } catch (err) {
        console.error('Failed to store report record', err);
      }

      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[12000] flex items-center justify-center p-4">
          {/* Translucent overlay backdrop */}
          <div 
            className="absolute inset-0 bg-neutral-950/80 backdrop-blur-xs cursor-pointer"
            onClick={() => setIsOpen(false)}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.15 }}
            className="relative bg-white border-4 border-black text-black w-full max-w-[520px] shadow-[8px_8px_0_#ab3600] overflow-hidden select-none z-10"
          >
            {/* Modal Title bar */}
            <div className="bg-black text-white px-4 py-3.5 border-b-2 border-black flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#72ff70] shrink-0" />
                <span className="font-mono text-[9px] font-black tracking-widest text-[#72ff70] uppercase">
                  {t('inaccuracy.modal_header', 'VERIFICATION SYSTEM MODULE')}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white border border-transparent bg-neutral-900 transition-colors cursor-pointer p-0.5"
                aria-label="Dismiss accuracy window"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {submitSuccess ? (
              /* Success Panel view */
              <div className="p-6 space-y-5 text-left animate-fade-in text-gray-950">
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-emerald-50 border-2 border-emerald-500 rounded-none flex items-center justify-center text-emerald-600">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <h4 className="font-sora text-sm md:text-base font-black uppercase text-gray-950 tracking-tight leading-snug">
                    {t('inaccuracy.success_title', 'INACCURACY DISPATCH LOGGED SECURELY')}
                  </h4>
                  <p className="font-mono text-[10.5px] text-gray-500">
                    {t('inaccuracy.success_desc', 'Your advisories have bypassed simulation queues and are now recorded inside our local security sandboxed database cache.')}
                  </p>
                </div>

                {/* Secure Receipt Box */}
                <div className="bg-neutral-50 border border-neutral-300 p-4 font-mono text-[10px] space-y-2 leading-relaxed">
                  <div className="flex justify-between text-gray-400 text-[8.5px] border-b border-black/10 pb-1 font-bold">
                    <span>INDEX ELEMENT ID</span>
                    <span>STATUS: COMPILED</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block font-bold uppercase">REPORT CONTEXT:</span>
                    <span className="text-gray-900 font-extrabold">{pageContext.toUpperCase()}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block font-bold uppercase">DIGEST SIGNATURE:</span>
                    <code className="text-amber-900 font-semibold break-all bg-yellow-50 px-1 border border-yellow-200/50 block mt-1 py-1">
                      {receiptHash}
                    </code>
                  </div>
                  <div className="pt-1.5 text-[8.5px] text-[#ab3600] font-black uppercase flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Independent forensics analysts will audit coordinates within 12 standard hours.</span>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-5 py-2 bg-black hover:bg-neutral-900 text-[#72ff70] border-2 border-black font-mono text-[9px] font-black uppercase cursor-pointer"
                  >
                    {t('inaccuracy.close_panel', 'CLOSE VERIFICATION PANEL')}
                  </button>
                </div>
              </div>
            ) : (
              /* Core submission form view */
              <form onSubmit={handleSubmit} className="p-6 space-y-4 text-left">
                <div className="space-y-1">
                  <span className="font-mono text-[8.5px] font-black text-[#ab3600] bg-[#ab3600]/10 border border-[#ab3600]/20 px-2 py-0.5 uppercase">
                    TARGET: {pageContext}
                  </span>
                  <h3 className="font-sora text-sm md:text-base font-black text-gray-950 uppercase tracking-tight mt-1.5">
                    {t('inaccuracy.modal_title', 'REPORT AN INACCURACY')}
                  </h3>
                  <p className="font-mono text-[10px] text-gray-500">
                    {t('inaccuracy.modal_desc', 'Submit verifiable changes or correct outdated coordinates for independent review logs.')}
                  </p>
                </div>

                {/* Form fields layout */}
                <div className="space-y-3 font-mono text-[11px]">
                  {/* Name field */}
                  <div className="space-y-1">
                    <label htmlFor="accuracy-name" className="block text-gray-500 font-bold uppercase text-[9px]">
                      {t('inaccuracy.label_name', 'Your Name / Handle (Optional)')}
                    </label>
                    <input 
                      id="accuracy-name"
                      type="text"
                      placeholder={t('inaccuracy.placeholder_name', 'e.g. Lead Analyst Connor')}
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="w-full px-3 py-2 border-2 border-black focus:bg-brand-surface focus:outline-none"
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-1">
                    <label htmlFor="accuracy-email" className="block text-gray-500 font-bold uppercase text-[9px]">
                      {t('inaccuracy.label_email', 'Email Address (Optional)')}
                    </label>
                    <input 
                      id="accuracy-email"
                      type="email"
                      placeholder={t('inaccuracy.placeholder_email', 'e.g. security@csg-analyst.net')}
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      className="w-full px-3 py-2 border-2 border-black focus:bg-brand-surface focus:outline-none"
                    />
                  </div>

                  {/* Corrections details field */}
                  <div className="space-y-1">
                    <label htmlFor="accuracy-details" className="block text-[#ab3600] font-black uppercase text-[9px] flex items-center gap-1">
                      <span>{t('inaccuracy.label_details', 'Specific Inaccuracy details & supporting coordinates')}</span>
                      <span className="text-red-650 font-black">*</span>
                    </label>
                    <textarea 
                      id="accuracy-details"
                      required
                      placeholder={t('inaccuracy.placeholder_details', 'Provide specific details about outdated exchange coordinates, dead checklist links, or coordinate corrections. Include sources or explorer transaction hashes if possible.')}
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      className="w-full p-3 h-28 border-2 border-black focus:bg-brand-surface focus:outline-none resize-none leading-relaxed"
                    />
                  </div>
                </div>

                <div className="bg-amber-50 border-l-2 border-amber-500 p-2 text-[9px] text-amber-900 font-mono leading-normal flex items-start gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-700" />
                  <span>
                    {t('inaccuracy.footer_disclosure', 'Your reports are sandboxed client-side locally under your session security ID and mirrored to active support tickets.')}
                  </span>
                </div>

                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 border-2 border-black hover:bg-neutral-100 font-mono text-[9px] font-black uppercase cursor-pointer"
                  >
                    {t('inaccuracy.cancel', 'CANCEL')}
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !details.trim()}
                    className="px-5 py-2 bg-black hover:bg-neutral-900 disabled:bg-neutral-300 disabled:text-neutral-500 disabled:border-neutral-300 text-[#72ff70] border-2 border-black font-mono text-[9px] font-black uppercase cursor-pointer flex items-center gap-1.5 active-press"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-pulse">{t('inaccuracy.transmitting', 'TRANSMITTING...')}</span>
                      </>
                    ) : (
                      <>
                        <span>{t('inaccuracy.submit', 'SUBMIT SECURITY LOGS')}</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
