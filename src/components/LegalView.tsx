import React, { useState, useEffect } from 'react';
import { Scale, FileText, Info, ShieldAlert, Check, Cookie, Lock, ShieldCheck, Database, Calendar } from 'lucide-react';
import { ReportInaccuracyButton } from './InaccuracyFeedbackModal';

type LegalTab = 'disclaimer' | 'privacy' | 'cookie' | 'terms';

export const LegalView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<LegalTab>(() => {
    const saved = localStorage.getItem('csg-active-legal-tab');
    return (saved === 'disclaimer' || saved === 'privacy' || saved === 'cookie' || saved === 'terms') 
      ? saved 
      : 'disclaimer';
  });

  const handleTabChange = (tab: LegalTab) => {
    setActiveTab(tab);
    localStorage.setItem('csg-active-legal-tab', tab);
  };

  // Sync state if external footer links alter local storage
  useEffect(() => {
    const interval = setInterval(() => {
      const saved = localStorage.getItem('csg-active-legal-tab');
      if (saved && saved !== activeTab && (saved === 'disclaimer' || saved === 'privacy' || saved === 'cookie' || saved === 'terms')) {
        setActiveTab(saved);
      }
    }, 300);
    return () => clearInterval(interval);
  }, [activeTab]);

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 space-y-8 select-none">
      {/* Decors Title Header */}
      <div className="bg-[#fff0ea] border-heavy border-l-[8px] border-l-[#ff5f1f] p-6 space-y-3 neo-shadow-sm">
        <div className="inline-flex items-center gap-1.5 bg-white border px-2.5 py-0.5 font-mono text-[9px] font-black text-[#ff5f1f] uppercase tracking-wider">
          <Scale className="w-3.5 h-3.5" />
          LEGAL, PRIVACY & COMPLIANCE PORTAL
        </div>
        <h2 className="font-sora text-2xl md:text-3xl font-black text-gray-950 uppercase tracking-tight">
          LEGAL DOCUMENTS & POLICIES
        </h2>
        <p className="font-mono text-[11px] text-gray-600 leading-normal max-w-2xl font-bold">
          Transparent operational disclosures. This platform operates strictly as an open-source educational service node providing interactive web-based cryptographic safety guidelines and stencils.
        </p>
      </div>

      {/* Tabs list selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {[
          { id: 'disclaimer', label: '1. LEGAL POLICY & RISK', icon: Scale },
          { id: 'privacy', label: '2. PRIVACY POLICY', icon: Lock },
          { id: 'cookie', label: '3. COOKIE POLICY', icon: Cookie },
          { id: 'terms', label: '4. TERMS & CONDITIONS', icon: FileText }
        ].map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id as LegalTab)}
              className={`p-3 border-heavy font-mono text-[10px] font-black uppercase transition-all duration-150 cursor-pointer text-center active-press flex items-center justify-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-black text-white neo-shadow-sm'
                  : 'bg-white hover:bg-orange-50 text-gray-700'
              }`}
            >
              <IconComponent className="w-3.5 h-3.5 shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Legal Contents Pane rendering */}
      <div className="bg-white border-heavy neo-shadow p-6 md:p-8 space-y-6 text-left">
        
        {/* TAB 1: LEGAL POLICY & RISK DISCLAIMERS */}
        {activeTab === 'disclaimer' && (
          <div className="space-y-6">
            <div className="border-b border-black/15 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-2">
              <h3 className="font-sora text-lg md:text-xl font-black uppercase text-[#ab3600] flex items-center gap-2">
                <ShieldAlert className="w-6 h-6 stroke-[2.5]" />
                LEGAL POLICY & LIABILITY DISCLAIMER
              </h3>
              <div className="font-mono text-[9px] text-gray-400 font-bold flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>LAST REVISED: JUNE 2026</span>
              </div>
            </div>

            <div className="font-mono text-xs text-[#ab3600] bg-[#fff0ea] p-4 border-[2px] leading-relaxed font-bold">
              ⚠️ HIGH PRESSURE SECURITY WARNING: ALL DIGITAL LEDGER CONFIGURATIONS AND SELF-CUSTODIAL HARDWARE INITIATIVES CARRY MAXIMUM RISK EXPOSURE. THE LOSS OF RECOVERY ENTRIES (SEED PHRASES) PERMANENTLY FREEZES ASSOCIATED TOKEN BALANCES. THERE IS NO CENTRALIZED RESET DECK FOR ON-CHAIN PROTOCOLS.
            </div>

            <div className="space-y-5 font-sans text-sm text-gray-700 leading-relaxed">
              <div className="space-y-2">
                <h4 className="font-sora text-sm font-black text-gray-950 uppercase tracking-tight">1. SCOPE OF EDUCATIONAL SERVICE NODES</h4>
                <p>
                  All components, checklists, assessments, safety scores, comparative reviews, and legislative tracking tools assembled within the <strong>Crypto Safety Global (CSG)</strong> database serve strictly for informative, academic, and interactive cyber-hygiene demonstration purposes. Nothing structured on these channels constitutes certified professional financial advice, legislative consulting, investment requests, or solicitation to engage in digital token procurement or currency conversion.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-sora text-sm font-black text-gray-950 uppercase tracking-tight">2. IMMUTABILITY & EXCLUSION OF LIABILITY</h4>
                <p>
                  Decentralized distributed ledgers operate autonomously based on pre-compiled smart contracts and consensus logic. Consequently, CSG, its contributing safety groups, developers, and writers hold absolute immunity and zero liability for protocol exploitation incidents, contract drain events, private key compromise, physical ledger hardware glitches, bank payment reversals, or trade disputes that users encounter during local trading operations. Users proceed at their exclusive transactional responsibility.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-sora text-sm font-black text-gray-950 uppercase tracking-tight">3. NO LEGISLATIVE REPRESENTATION OR ENDORSEMENTS</h4>
                <p>
                  While we track legal frameworks (such as the European Union's MiCA directive, SEC guidelines, and CBN circulars), these summaries are compiled to assist users conceptually. Regulatory environments are highly fluid. We recommend consulting licensed financial advocates, trade counsels, and national compliance officials within your exact tax jurisdiction prior to declaring digital transactions.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-sora text-sm font-black text-gray-950 uppercase tracking-tight">4. EMERGENCY INTERACTIVE DIRECTIVES</h4>
                <p>
                  Any interactive simulation or sandbox threat testing widget operates strictly offline via browser container objects. Real seed phrase insertions are strictly prohibited on our tools. All threat calculations are simulated vectors intended to isolate and reinforce local memory structures prior to live mainnet operations.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRIVACY POLICY */}
        {activeTab === 'privacy' && (
          <div className="space-y-6">
            <div className="border-b border-black/15 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-2">
              <h3 className="font-sora text-lg md:text-xl font-black uppercase text-gray-950 flex items-center gap-2">
                <Lock className="w-6 h-6 text-gray-900" />
                PRIVACY POLICY & SANDBOX CHARTER
              </h3>
              <div className="font-mono text-[9px] text-gray-400 font-bold flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>LAST REVISED: JUNE 2026</span>
              </div>
            </div>

            <div className="font-mono text-xs text-blue-800 bg-[#eff6ff] p-4 border-[2px] border-blue-200 leading-relaxed font-bold">
              ⚙️ PRIVACY ARCHITECTURE STAT: THIS PLATFORM INCORPORATES ZERO REMOTE BACKEND AUDITING OR CLOUD DATA LOGGING STATIONS. ALL SAFETY SCORES, QUIZ RESPONSES, AND DIRECTORY SELECTIONS FLITE TEMPORARILY IN LOCAL STATE VARIABLES.
            </div>

            <div className="space-y-5 font-sans text-sm text-gray-700 leading-relaxed">
              <div className="space-y-2">
                <h4 className="font-sora text-sm font-black text-gray-950 uppercase tracking-tight">1. ZERO SERVER TELEMETRY POLICY</h4>
                <p>
                  We believe personal digital sovereign safety begins with complete data containment. No inputs made on this interface are transmitted to remote cloud databases. All score configurations, checklist selections, simulated security audits, local currencies, state inputs, and custom notes are stored client-side in the browser.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-sora text-sm font-black text-gray-950 uppercase tracking-tight">2. PERSONAL DATA VOLUNTARILY SUBMITTED</h4>
                <p>
                  We do not demand, collect, or store any form of Personally Identifiable Information (PII) such as real names, email addresses, phone profiles, billing registers, or spatial coordinates. You may utilize all database elements, calculators, and threat assessments anonymously. If you use the on-chain diagnostic, no ledger transactions are audited centrally on our servers.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-sora text-sm font-black text-gray-950 uppercase tracking-tight">3. LOCAL DATA ISOLATION AND COMPARTMENTALIZATION</h4>
                <p>
                  Any saved parameters (such as bookmarks, quiz scoring benchmarks, and the preferred local language) persist exclusively in your web browser's standard <code>localStorage</code> database. This database is sandboxed in your browser and is inaccessible to external third-party domains. You may fully clear this database at any time by selecting the "Resets Configuration" parameters in your browser's history logs.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-sora text-sm font-black text-gray-950 uppercase tracking-tight">4. THIRD-PARTY LINK SECURITY REDIRECTIONS</h4>
                <p>
                  To provide direct user convenience, our comparative safety score directory and educational materials reference external entities (such as Ledger.com, Coinbase, central exchanges, or official compliance agencies). Clicking these links redirects your browser away from our sandboxed domain. We do not incorporate affiliate trackers or refer parameters, but we encourage reviewing the distinct privacy agreements of targeted domains.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: COOKIE POLICY */}
        {activeTab === 'cookie' && (
          <div className="space-y-6">
            <div className="border-b border-black/15 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-2">
              <h3 className="font-sora text-lg md:text-xl font-black uppercase text-gray-950 flex items-center gap-2">
                <Cookie className="w-6 h-6 text-amber-700" />
                COOKIE & LOCAL STORAGE POLICY
              </h3>
              <div className="font-mono text-[9px] text-gray-400 font-bold flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>LAST REVISED: JUNE 2026</span>
              </div>
            </div>

            <div className="font-mono text-xs text-amber-800 bg-[#fffbeb] p-4 border-[2px] border-amber-200 leading-relaxed font-bold">
              🍪 COOKIE DIRECTIVE STAT: CRYPTO SAFETY GLOBAL DOES NOT MANAGE COMMERCIAL MARKETING TRACKER PLUGINS, PERSISTENT ADVERTISING COOKIES, OR CROSS-SITE PROFILING ENGINE VECTORS.
            </div>

            <div className="space-y-5 font-sans text-sm text-gray-700 leading-relaxed">
              <div className="space-y-2">
                <h4 className="font-sora text-sm font-black text-gray-950 uppercase tracking-tight">1. UNDERSTANDING COOKIES AND SECURE BROWSER PERSISTENCE</h4>
                <p>
                  Cookies are tiny text structures stored temporarily by your web client. Local Storage is a modern browser database mechanism designed to save data securely within the browser container. We prefer Local Storage over cookies because it does not attach tracking payload headers to network request cycles, ensuring absolute performance and cryptographic sealing.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-sora text-sm font-black text-gray-950 uppercase tracking-tight">2. COMPLETE BREAKDOWN OF USED TECHNICAL STORAGE OBJECTS</h4>
                <p>
                  Our system isolates storage into the following two client-side categories:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 pt-1 font-mono text-[11px] text-gray-600">
                  <li>
                    <strong className="text-gray-950">Essential Storage Key-Values</strong>: Standard indicators used for language toggle memory (<code>csg-selected-language</code>), the selected blog post read state (<code>csg-selected-post-id</code>), and active visual view preferences on our main menu portals.
                  </li>
                  <li>
                    <strong className="text-gray-950">Interactive Achievement States</strong>: Stores active threat shield assessment completed records, diagnostic point totals (<code>csg-score</code>), and the cookie banner configuration selection to disable future popups.
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-sora text-sm font-black text-gray-950 uppercase tracking-tight">3. NO ANALYTICS OR BEHAVIORAL CODES</h4>
                <p>
                  We are extremely strict about digital autonomy. Our application implements zero Google Analytics, Meta Pixel trackers, Hotjar heatmap recording scripts, or programmatic exchange cookie injections. Your session belongs entirely to you.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-sora text-sm font-black text-gray-950 uppercase tracking-tight">4. HOW YOU CAN FREELY MANAGE AND PURGE DATABASE ENTRIES</h4>
                <p>
                  You can change or reset your configuration states at any time by clearing your browser's storage cache or by clicking the <strong>Decline Optional</strong> choice on our active privacy banner. You may also easily hard reset our interface states inside the developer console (<code>localStorage.clear()</code>).
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: TERMS & CONDITIONS */}
        {activeTab === 'terms' && (
          <div className="space-y-6">
            <div className="border-b border-black/15 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-2">
              <h3 className="font-sora text-lg md:text-xl font-black uppercase text-emerald-900 flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-[#006e16]" />
                TERMS OF USE & LICENSE PARAMETERS
              </h3>
              <div className="font-mono text-[9px] text-gray-400 font-bold flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>LAST REVISED: JUNE 2026</span>
              </div>
            </div>

            <div className="font-mono text-xs text-emerald-800 bg-[#e2fbeb] p-4 border-[2px] border-emerald-200 leading-relaxed font-bold">
              ✓ MIT LICENSE STAT: ALL EDUCATIONAL CHECKLISTS, PRINTABLE MEMORY SHEETS, DISPUTE REGISTERS, AND ROADMAPS ARE LICENSED FOR FULL PERSONAL AND EDUCATION USE.
            </div>

            <div className="space-y-5 font-sans text-sm text-gray-700 leading-relaxed">
              <div className="space-y-2">
                <h4 className="font-sora text-sm font-black text-gray-950 uppercase tracking-tight">1. CONSENT TO INTELLECTUAL BOUNDARIES</h4>
                <p>
                  By exploring our safety portal, downloading offline manuals, or using our interactive diagnostic panels, you confirm that you have read, understood, and agreed to these Terms of Use and our general Legal Policy framework. If you do not accept these sovereign disclaimers, please terminate session access to this directory.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-sora text-sm font-black text-gray-950 uppercase tracking-tight">2. OPEN SOURCE & DUPLICATION CODE LAWS</h4>
                <p>
                  Our static software container is officially licensed under the popular open source <strong>MIT License</strong>. You are fully authorized to print, replicate, edit, branch, host, translate, and pass along our materials and manuals to peers, family, or safety groups. Commercial, paid distribution of our original templates without explicit attribution is strictly prohibited.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-sora text-sm font-black text-gray-950 uppercase tracking-tight">3. PLATFORM INTEGRITY & NO HARASSMENT</h4>
                <p>
                  Users agree not to engage in web harassment, denial-of-service (DDOS) flood scripts, automated endpoint scanning attempts, or structural scraping sweeps that could increase resource consumption or block access for users navigating through high-interest mobile connections.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-sora text-sm font-black text-gray-950 uppercase tracking-tight">4. CHANGES TO TERM DIRECTIVES</h4>
                <p>
                  We serve as a static educational resource. We reserve the absolute operational right to revise safety scores, exchange ratings, audit points, regulatory trackers, and the overall contents of these policy files without notification to maintain optimal, real-time safety standards against current malicious phishing technologies.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>

      <ReportInaccuracyButton pageName={`Legal Views (${activeTab.toUpperCase()})`} />
    </div>
  );
};

