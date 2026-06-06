import { useState, useEffect } from 'react';
import { AppView } from './types';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { StartHere } from './components/StartHere';
import { SecurityCentre } from './components/SecurityCentre';
import { BeginnerGuides } from './components/BeginnerGuides';
import { Reviews } from './components/Reviews';
import { StablecoinsPayments } from './components/StablecoinsPayments';
import { CountriesHub } from './components/CountriesHub';
import { BlogView } from './components/BlogView';
import { Resources } from './components/Resources';
import { FAQView } from './components/FAQView';
import { LegalView } from './components/LegalView';
import { ExchangesDirectory } from './components/ExchangesDirectory';
import { ContactView } from './components/ContactView';
import { AboutView } from './components/AboutView';
import { ShieldCheck, Mail, Globe, MapPin, Award, BookOpen, ArrowUp, Cookie, X } from 'lucide-react';
import { InaccuracyFeedbackModal } from './components/InaccuracyFeedbackModal';

export default function App() {
  const [view, setView] = useState<AppView>('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  // Custom Cookie Consent State
  const [showCookiesBanner, setShowCookiesBanner] = useState(false);
  const [showCookieSettings, setShowCookieSettings] = useState(false);
  const [cookieSettings, setCookieSettings] = useState({
    essential: true,
    analytics: true,
    preferences: true
  });

  useEffect(() => {
    const hasConsent = localStorage.getItem('crypto-safety-cookies-consented');
    if (!hasConsent) {
      // Small timeout to appear elegantly after the page loads
      const timer = setTimeout(() => {
        setShowCookiesBanner(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      try {
        const saved = JSON.parse(hasConsent);
        setCookieSettings(prev => ({ ...prev, ...saved }));
      } catch (e) {
        // Use default if parse fails
      }
    }
  }, []);

  const handleAcceptAllCookies = () => {
    const allAccepted = { essential: true, analytics: true, preferences: true };
    localStorage.setItem('crypto-safety-cookies-consented', JSON.stringify(allAccepted));
    setCookieSettings(allAccepted);
    setShowCookiesBanner(false);
    setShowCookieSettings(false);
  };

  const handleDeclineOptionalCookies = () => {
    const essentialOnly = { essential: true, analytics: false, preferences: false };
    localStorage.setItem('crypto-safety-cookies-consented', JSON.stringify(essentialOnly));
    setCookieSettings(essentialOnly);
    setShowCookiesBanner(false);
    setShowCookieSettings(false);
  };

  const handleSaveCustomCookies = () => {
    localStorage.setItem('crypto-safety-cookies-consented', JSON.stringify(cookieSettings));
    setShowCookiesBanner(false);
    setShowCookieSettings(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (scrollHeight > 0) {
        setScrollProgress((scrollTop / scrollHeight) * 100);
      } else {
        setScrollProgress(0);
      }
      setShowBackToTop(scrollTop > 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [view]);

  const renderActiveView = () => {
    switch (view) {
      case 'home':
        return <HomeView setView={setView} />;
      case 'about':
        return <AboutView />;
      case 'start-here':
        return <StartHere />;
      case 'security-centre':
        return <SecurityCentre />;
      case 'beginner-guides':
        return <BeginnerGuides />;
      case 'reviews':
        return <Reviews />;
      case 'exchanges-directory':
        return <ExchangesDirectory />;
      case 'stablecoins-and-payments':
        return <StablecoinsPayments />;
      case 'countries':
        return <CountriesHub />;
      case 'blog':
        return <BlogView />;
      case 'resources':
        return <Resources />;
      case 'faq':
        return <FAQView />;
      case 'legal':
        return <LegalView />;
      case 'contact':
        return <ContactView />;
      default:
        return <HomeView setView={setView} />;
    }
  };


  return (
    <div className="min-h-screen bg-brand-surface text-brand-on-surface font-sans flex flex-col selection:bg-[#ab3600] selection:text-white pb-12">
      {/* Dynamic Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 w-full h-1 bg-[#e4e4e7] z-[120] pointer-events-none"
        style={{ opacity: scrollProgress > 1 ? 1 : 0, transition: 'opacity 300ms ease-in-out' }}
        id="global-scroll-progress-bar"
      >
        <div 
          className="h-full bg-[#ab3600] transition-[width] duration-75 ease-out shadow-[0_1px_3px_rgba(171,54,0,0.4)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Dynamic Header Component */}
      <Header currentView={view} setView={setView} />

      {/* Primary Dynamic Applet Content View */}
      <main className="flex-1 w-full force-word-break">
        {renderActiveView()}
      </main>

      {/* Global Compact High-Contrast Footer */}
      <footer className="max-w-7xl mx-auto w-full px-4 md:px-8 mt-12 pt-8 border-t-[3px] border-black">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Logo and About Statement */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <span className="bg-[#ab3600] text-white border-heavy-on-surface px-2 py-0.5 font-mono text-[10px] font-bold">
                XTSG SECURITY
              </span>
              <span className="font-mono text-xs font-bold text-gray-500 uppercase">
                Est. 2026
              </span>
            </div>
            <h4 className="font-sora text-sm font-extrabold text-gray-900 uppercase tracking-tight">
              XCRYPTO-TRADING SECURITY GLOBAL (XTSG)
            </h4>
            <p className="font-mono text-[10.5px] text-gray-600 leading-relaxed">
              An independent, global public education repository. XTSG operates without commercial sponsorship or advertising support to compile unmodified threat signatures and build immutable survival strategies for decentralised environments.
            </p>
          </div>

          {/* Directory Links specifically mapping into React states */}
          <div className="md:col-span-4 space-y-3">
            <h5 className="font-mono text-[11px] font-extrabold text-gray-400 uppercase tracking-widest leading-none">
              SECURE DIRECTIVES INDEX
            </h5>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <button
                onClick={() => setView('home')}
                className="text-left font-mono text-[10px] text-gray-600 hover:text-brand-primary uppercase font-bold py-0.5 block cursor-pointer transition-colors"
              >
                • Home Feed
              </button>
              <button
                onClick={() => { setView('about'); window.scrollTo({ top: 0, behavior: 'instant' }); }}
                className="text-left font-mono text-[10px] text-[#ab3600] hover:text-brand-primary uppercase font-bold py-0.5 block cursor-pointer transition-colors font-black"
                id="footer-about-link"
              >
                • About Us
              </button>
              <button
                onClick={() => setView('start-here')}
                className="text-left font-mono text-[10px] text-gray-600 hover:text-brand-primary uppercase font-bold py-0.5 block cursor-pointer transition-colors"
              >
                • Storage Roadmap
              </button>
              <button
                onClick={() => setView('security-centre')}
                className="text-left font-mono text-[10px] text-gray-600 hover:text-brand-primary uppercase font-bold py-0.5 block cursor-pointer transition-colors"
              >
                • Active Audits
              </button>
              <button
                onClick={() => setView('countries')}
                className="text-left font-mono text-[10px] text-gray-600 hover:text-brand-primary uppercase font-bold py-0.5 block cursor-pointer transition-colors"
              >
                • Countries hub
              </button>
              <button
                onClick={() => setView('beginner-guides')}
                className="text-left font-mono text-[10px] text-gray-600 hover:text-brand-primary uppercase font-bold py-0.5 block cursor-pointer transition-colors"
              >
                • Classroom
              </button>
              <button
                onClick={() => setView('reviews')}
                className="text-left font-mono text-[10px] text-gray-600 hover:text-brand-primary uppercase font-bold py-0.5 block cursor-pointer transition-colors"
              >
                • Compare reviews
              </button>
              <button
                onClick={() => setView('exchanges-directory')}
                className="text-left font-mono text-[10px] text-gray-600 hover:text-brand-primary uppercase font-bold py-0.5 block cursor-pointer transition-colors"
              >
                • EXCHANGES DIRECTORY
              </button>
              <button
                onClick={() => setView('stablecoins-and-payments')}
                className="text-left font-mono text-[10px] text-gray-600 hover:text-brand-primary uppercase font-bold py-0.5 block cursor-pointer transition-colors"
              >
                • stable systems
              </button>
              <button
                onClick={() => setView('blog')}
                className="text-left font-mono text-[10px] text-gray-600 hover:text-brand-primary uppercase font-bold py-0.5 block cursor-pointer transition-colors"
              >
                • Blog & alerts
              </button>
              <button
                onClick={() => setView('resources')}
                className="text-left font-mono text-[10px] text-gray-600 hover:text-brand-primary uppercase font-bold py-0.5 block cursor-pointer transition-colors"
              >
                • safe downloads
              </button>
              <button
                onClick={() => { setView('faq'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="text-left font-mono text-[10px] text-gray-600 hover:text-brand-primary uppercase font-bold py-0.5 block cursor-pointer transition-colors"
              >
                • QA accordions
              </button>
              <button
                onClick={() => { setView('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="text-left font-mono text-[10px] text-[#ab3600] hover:text-brand-primary uppercase font-bold py-0.5 block cursor-pointer transition-colors"
                id="footer-comms-link"
              >
                • Alert & Comms
              </button>
            </div>
          </div>

          {/* Infrastructure and Licensing Status details */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="font-mono text-[11px] font-extrabold text-gray-400 uppercase tracking-widest leading-none">
              SYSTEM CERTIFICATE
            </h5>
            <div className="bg-white p-3 border-heavy-on-surface font-mono text-[9px] leading-tight text-gray-600 space-y-2">
              <div className="flex items-center gap-1 text-black font-extrabold uppercase">
                <ShieldCheck className="w-4 h-4 text-brand-tertiary shrink-0" />
                <span>LICENSE: CR-COULD-SAFE</span>
              </div>
              <p>
                All dynamic modules, calculators, and risk scripts operate client-side. Zero telemetry packages are collected.
              </p>
              <div className="text-[8px] border-t border-black/15 pt-1.5 flex justify-between">
                <span>REVISION v2.20</span>
                <span className="font-bold underline text-black">PUBLIC REPOSITORY</span>
              </div>
            </div>
          </div>

        </div>

        <div className="border-t border-black/10 mt-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-gray-400">
          <span>© 2026 CRYPTO SAFETY GLOBAL FOUNDATION. ALL RIGHTS SECURED UNDER MIT LICENSE.</span>
          <div className="flex flex-wrap gap-x-3 gap-y-1.5 justify-center md:justify-end items-center">
            <span 
              onClick={() => { localStorage.setItem('csg-active-legal-tab', 'privacy'); setView('legal'); window.scrollTo({ top: 0, behavior: 'instant' }); }} 
              className="hover:text-black hover:underline cursor-pointer transition-all uppercase"
            >
              PRIVACY POLICY
            </span>
            <span>•</span>
            <span 
              onClick={() => { localStorage.setItem('csg-active-legal-tab', 'cookie'); setView('legal'); window.scrollTo({ top: 0, behavior: 'instant' }); }} 
              className="hover:text-black hover:underline cursor-pointer transition-all uppercase"
            >
              COOKIE POLICY
            </span>
            <span>•</span>
            <span 
              onClick={() => { localStorage.setItem('csg-active-legal-tab', 'terms'); setView('legal'); window.scrollTo({ top: 0, behavior: 'instant' }); }} 
              className="hover:text-black hover:underline cursor-pointer transition-all uppercase"
            >
              TERMS & CONDITIONS
            </span>
            <span>•</span>
            <span 
              onClick={() => { localStorage.setItem('csg-active-legal-tab', 'disclaimer'); setView('legal'); window.scrollTo({ top: 0, behavior: 'instant' }); }} 
              className="hover:text-black hover:underline cursor-pointer transition-all uppercase"
            >
              LEGAL POLICY & DISCLAIMER
            </span>
          </div>
        </div>
      </footer>
      <InaccuracyFeedbackModal />

      {/* Floating Cookie Consent Banner */}
      {showCookiesBanner && (
        <div
          id="floating-cookie-consent-panel"
          className="fixed bottom-6 left-6 z-50 max-w-sm w-[calc(100%-3rem)] sm:w-[385px] bg-[#fffcf7] border-heavy p-4 sm:p-5 neo-shadow text-left flex flex-col gap-3 font-mono text-xs text-black animate-fade-in"
        >
          <div className="flex items-center justify-between border-b border-black/15 pb-2">
            <div className="flex items-center gap-2">
              <Cookie className="w-5 h-5 text-[#ab3600]" />
              <span className="font-black text-xs uppercase tracking-wider">🍪 DATA PRIVACY KERNEL</span>
            </div>
            <button
              id="cookie-consent-close-btn"
              onClick={handleDeclineOptionalCookies}
              className="p-1 hover:bg-neutral-200 cursor-pointer rounded-none border border-transparent hover:border-black active-press"
              title="Close and decline optional"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {!showCookieSettings ? (
            <>
              <p className="text-[11px] leading-relaxed text-gray-700">
                This platform utilizes minimal local data structures (session records and local state storage) to save sandbox configurations, score histories, language, and bookmarks. Zero remote analytics are active. See our <span onClick={() => { localStorage.setItem('csg-active-legal-tab', 'cookie'); setView('legal'); window.scrollTo({ top: 0, behavior: 'instant' }); }} className="underline font-bold text-black cursor-pointer hover:text-[#ab3600]">Cookie Policy</span>.
              </p>
              <div className="flex flex-col gap-1.5 pt-1">
                <div className="flex gap-2">
                  <button
                    id="accept-all-cookies-btn"
                    onClick={handleAcceptAllCookies}
                    className="flex-1 bg-black text-white hover:text-[#72ff70] hover:bg-neutral-900 px-3 py-2 border-heavy text-[10px] font-black uppercase text-center cursor-pointer active-press"
                  >
                    ACCEPT ALL
                  </button>
                  <button
                    id="decline-cookies-btn"
                    onClick={handleDeclineOptionalCookies}
                    className="flex-1 bg-white hover:bg-neutral-100 px-3 py-2 border-heavy text-[10px] text-gray-800 font-extrabold uppercase text-center cursor-pointer active-press"
                  >
                    DECLINE OPTIONAL
                  </button>
                </div>
                <button
                  id="customize-cookies-btn"
                  onClick={() => setShowCookieSettings(true)}
                  className="text-left text-[9px] text-gray-500 hover:text-black underline font-black uppercase mt-1 cursor-pointer"
                >
                  ⚙️ CUSTOMIZE STORAGE PERMISSIONS
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-3 animate-fade-in">
              <p className="text-[10px] leading-tight text-gray-600">
                Configure your local database permission states:
              </p>

              <div className="space-y-2.5 bg-white p-3 border border-black/15">
                {/* Essential Toggle */}
                <label className="flex items-start gap-2.5 select-none opacity-80">
                  <input
                    type="checkbox"
                    checked={cookieSettings.essential}
                    disabled
                    className="mt-0.5 pointer-events-none accent-black"
                  />
                  <div>
                    <div className="font-extrabold text-[10.5px] uppercase">1. SECURE SYSTEM STATE (Required)</div>
                    <p className="text-[9px] text-gray-500 leading-tight">Remembers theme settings, essential navigation views, and security states.</p>
                  </div>
                </label>

                {/* Simulator Toggle */}
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={cookieSettings.analytics}
                    onChange={(e) => setCookieSettings({ ...cookieSettings, analytics: e.target.checked })}
                    className="mt-0.5 cursor-pointer accent-[#ab3600]"
                  />
                  <div>
                    <div className="font-extrabold text-[10.5px] uppercase">2. SIMULATOR LOGS (Optional)</div>
                    <p className="text-[9px] text-gray-500 leading-tight">Enables persistence of live terminal shell histories and hex test parameters.</p>
                  </div>
                </label>

                {/* Preferences Toggle */}
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={cookieSettings.preferences}
                    onChange={(e) => setCookieSettings({ ...cookieSettings, preferences: e.target.checked })}
                    className="mt-0.5 cursor-pointer accent-[#ab3600]"
                  />
                  <div>
                    <div className="font-extrabold text-[10.5px] uppercase">3. USER BOOKMARKS (Optional)</div>
                    <p className="text-[9px] text-gray-500 leading-tight">Retains safe downloads, bookmarks, alerts, and security quiz score progress.</p>
                  </div>
                </label>
              </div>

              <div className="flex gap-2 pt-1 border-t border-dashed border-black/15">
                <button
                  id="save-cookie-settings-btn"
                  onClick={handleSaveCustomCookies}
                  className="flex-1 bg-black text-white hover:text-[#72ff70] hover:bg-neutral-900 px-3 py-2 border-heavy text-[10px] font-black uppercase text-center cursor-pointer active-press"
                >
                  SAVE SELECTION
                </button>
                <button
                  id="back-cookie-settings-btn"
                  onClick={() => setShowCookieSettings(false)}
                  className="bg-white hover:bg-neutral-100 px-3 py-2 border-heavy text-[10px] text-gray-800 font-extrabold uppercase text-center cursor-pointer active-press"
                >
                  BACK
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          id="floating-back-to-top-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 p-2.5 sm:p-3 bg-[#ab3600] text-white border-heavy neo-shadow hover:bg-black hover:text-[#72ff70] uppercase font-mono font-black text-xs flex items-center gap-1.5 transition-all duration-150 cursor-pointer active-press scale-100 hover:scale-105 active:scale-95 animate-fade-in-up"
          title="Back to Top"
        >
          <ArrowUp className="w-4 h-4" />
          <span className="hidden sm:inline text-[9px] tracking-wider font-extrabold">BACK TO TOP</span>
        </button>
      )}
    </div>
  );
}
