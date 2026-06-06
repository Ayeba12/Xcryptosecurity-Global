import React, { useState, useEffect } from 'react';
import { countryProfiles } from '../extendedData';
import { nigerianExchanges, p2pSafetyChecklist } from '../data';
import { CountryProfile, LocalExchange, P2PChecklistItem } from '../types';
import { 
  Globe, 
  ShieldAlert, 
  CheckCircle, 
  HelpCircle, 
  AlertTriangle, 
  Award, 
  ThumbsUp, 
  Smartphone, 
  BookOpen,
  ArrowRight,
  Info,
  X,
  MapPin,
  FileText,
  DollarSign
} from 'lucide-react';

export const CountriesHub: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('Africa');
  const [selectedCountryId, setSelectedCountryId] = useState<string>('c-nigeria');

  useEffect(() => {
    const handleOpenCountry = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const countryId = customEvent.detail;
      const found = countryProfiles.find(c => c.id === countryId);
      if (found) {
        setSelectedRegion(found.region);
        setSelectedCountryId(found.id);
      }
    };
    window.addEventListener('csg-open-country', handleOpenCountry);
    return () => {
      window.removeEventListener('csg-open-country', handleOpenCountry);
    };
  }, []);

  // P2P State for Nigeria Spot block
  const [checkedP2P, setCheckedP2P] = useState<Record<string, boolean>>({});
  const [selectedExchange, setSelectedExchange] = useState<LocalExchange | null>(null);

  const currentCountry = countryProfiles.find((c) => c.id === selectedCountryId) || countryProfiles[0];

  const handleSelectRegion = (region: string) => {
    setSelectedRegion(region);
    const countriesInRegion = countryProfiles.filter(c => c.region === region);
    if (countriesInRegion.length > 0) {
      setSelectedCountryId(countriesInRegion[0].id);
    }
  };

  const toggleP2P = (id: string) => {
    setCheckedP2P(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleCheckAllP2P = () => {
    const allChecked: Record<string, boolean> = {};
    p2pSafetyChecklist.forEach(item => {
      allChecked[item.id] = true;
    });
    setCheckedP2P(allChecked);
  };

  const handleResetP2P = () => {
    setCheckedP2P({});
  };

  // Determine aggregate P2P risk state
  const totalChecked = Object.values(checkedP2P).filter(Boolean).length;
  const criticalItems = p2pSafetyChecklist.filter(item => item.isImportant);
  const criticalCheckedCount = criticalItems.filter(item => checkedP2P[item.id]).length;
  const allCriticalChecked = criticalCheckedCount === criticalItems.length;

  let p2pSafetyPrompt = '';
  let p2pBgStyle = 'bg-amber-50 border-amber-500 text-amber-950';

  if (totalChecked === p2pSafetyChecklist.length) {
    p2pSafetyPrompt = "✅ PROTOCOL COMPLIANT: All 12 tactical rules verified. You are clear to open secure bank communications.";
    p2pBgStyle = "bg-[#d2ffdb] border-brand-tertiary text-brand-on-tertiary-container";
  } else if (allCriticalChecked) {
    p2pSafetyPrompt = "⚠️ PROMPT ALERT: Critical safety anchors are active, but supplemental checks remain unchecked. Trade with vigilance.";
    p2pBgStyle = "bg-[#fff0ea] border-brand-primary text-[#ab3600]";
  } else {
    p2pSafetyPrompt = "🚨 UNSECURED MARGINS: Crucial P2P safety checks are missing. Proceeding now exposes you to immediate peer fraud or bank compliance holds.";
    p2pBgStyle = "bg-[#ffdad6] border-brand-error text-brand-on-error-container";
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">
      {/* Selector Hub */}
      <div className="bg-[#fff0ea] border-heavy border-l-[8px] border-l-[#ab3600] p-4 sm:p-6 space-y-4">
        <h2 className="font-sora text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-gray-950 flex items-center gap-2.5">
          <Globe className="w-7 h-7 sm:w-8 sm:h-8 text-[#ab3600] shrink-0" />
          <span className="leading-tight">GLOBAL COMPLIANCE & REGIONAL PORTALS</span>
        </h2>
        <p className="font-mono text-xs text-gray-700 max-w-3xl leading-relaxed">
          Jurisdictional mandates shape your onchain rights. Select a core trade corridor below to explore legal status boards, regulatory systems, tax exemptions, and specialized localized security protocols.
        </p>

        {/* Region & Country selection hub */}
        <div className="space-y-4 pt-1">
          {/* Region selector tags */}
          <div className="space-y-2 bg-white/40 p-3 sm:p-3.5 border border-black/5">
            <span className="font-mono text-[9px] text-gray-500 font-black tracking-widest uppercase block">
              ✦ STEP 1: SELECT SEGMENT WORLDWIDE REGION
            </span>
            <div className="flex overflow-x-auto whitespace-nowrap scrollbar-clean gap-2.5 pb-1 max-w-full">
              {["Africa", "Europe", "North America", "South America", "Asia-Pacific"].map((reg) => {
                const isSelected = selectedRegion === reg;
                const emoji = reg === "Africa" ? "🌍" : reg === "Europe" ? "🇪🇺" : reg === "North America" ? "🌎" : reg === "South America" ? "🌎" : "🌏";
                return (
                  <button
                    key={reg}
                    onClick={() => handleSelectRegion(reg)}
                    className={`flex items-center gap-2 px-4 py-2.5 border-heavy font-mono text-xs font-black uppercase tracking-wider transition-all duration-150 cursor-pointer active-press shrink-0 ${
                      isSelected
                        ? 'bg-black text-white neo-shadow-sm'
                        : 'bg-white hover:bg-brand-surface-container text-gray-800'
                    }`}
                  >
                    <span>{emoji}</span>
                    <span>{reg}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Country selector tags inside region */}
          <div className="space-y-2 bg-white/40 p-3 sm:p-3.5 border border-black/5">
            <span className="font-mono text-[9px] text-gray-500 font-black tracking-widest uppercase block">
              ✦ STEP 2: OPEN REGIONAL CORRIDOR PORTAL ({selectedRegion.toUpperCase()})
            </span>
            <div className="flex overflow-x-auto whitespace-nowrap scrollbar-clean gap-2.5 pb-1 max-w-full">
              {countryProfiles
                .filter((c) => c.region === selectedRegion)
                .map((country) => {
                  const isSelected = selectedCountryId === country.id;
                  return (
                    <button
                      key={country.id}
                      onClick={() => setSelectedCountryId(country.id)}
                      className={`flex items-center gap-2 px-3.5 py-2.5 border-heavy font-sans text-xs font-extrabold uppercase transition-all duration-150 cursor-pointer active-press shrink-0 ${
                        isSelected
                          ? 'bg-[#ab3600] text-white neo-shadow-sm'
                          : 'bg-white hover:bg-brand-surface-container text-gray-700'
                      }`}
                    >
                      <span className="text-base leading-none">{country.flagEmoji}</span>
                      <span>{country.name.replace(' Focus', '')}</span>
                    </button>
                  );
                })}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Country Quick Info sheet - Left Grid Pane (lg:col-span-4) */}
        <div className="lg:col-span-4 bg-white border-heavy p-5 space-y-5 neo-shadow-sm">
          <div className="border-b-2 border-black pb-3">
            <div className="flex items-center gap-2">
              <span className="text-3xl">{currentCountry.flagEmoji}</span>
              <h3 className="font-sora text-xl font-bold uppercase tracking-tight text-gray-900">
                {currentCountry.name}
              </h3>
            </div>
            <p className="font-mono text-[10px] text-gray-400 mt-1 uppercase tracking-widest font-black">
              SECURE REGION PROFILE
            </p>
          </div>

          <p className="font-mono text-xs text-gray-600 leading-relaxed italic">
            "{currentCountry.overview}"
          </p>

          {/* Key metadata points */}
          <div className="space-y-3 font-mono text-xs border-t border-black/15 pt-4">
            <div>
              <span className="block font-bold text-gray-400 uppercase text-[9px] tracking-wider leading-none mb-1">
                LEGAL STATUS FRAMEWORK:
              </span>
              <span className="font-bold text-black border border-black bg-gray-100 px-2 py-0.5 rounded-sm inline-block max-w-full break-words text-xs sm:text-[13px]">
                {currentCountry.legalStatus}
              </span>
            </div>

            <div>
              <span className="block font-bold text-gray-400 uppercase text-[9px] tracking-wider leading-none mb-1">
                REGULATORY AUTHORITY:
              </span>
              <span className="font-bold text-black bg-purple-50 text-purple-700 border border-purple-200 px-2.5 py-1 rounded-sm block break-words whitespace-normal leading-relaxed text-xs sm:text-[13px]">
                {currentCountry.regulatorName}
              </span>
            </div>

            <div>
              <span className="block font-bold text-gray-400 uppercase text-[9px] tracking-wider leading-none mb-1">
                TAX POLICY DIRECTIVES:
              </span>
              <p className="font-medium text-gray-700 bg-amber-50/50 p-2 border leading-normal text-[11px] break-words">
                {currentCountry.taxPolicy}
              </p>
            </div>
          </div>

          {/* Ramps */}
          <div className="border-t border-black/15 pt-4 space-y-2">
            <span className="block font-mono font-bold text-gray-400 uppercase text-[9px] tracking-wider leading-none">
              RECOMMENDED SWAP PORTAL RAMPS
            </span>
            <div className="space-y-1.5 text-xs font-mono">
              {currentCountry.activeRamps.map((ramp, idx) => (
                <div key={idx} className="bg-gray-50 border p-2 flex items-start gap-2 max-w-full overflow-hidden">
                  <div className="w-1.5 h-1.5 bg-black shrink-0 mt-1.5" />
                  <span className="font-bold break-words text-left leading-normal text-[11px] sm:text-xs min-w-0 flex-1">{ramp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Complex Specific Content Box - Right Grid Pane (lg:col-span-8) */}
        <div className="lg:col-span-8 space-y-6">
          
          {selectedCountryId === 'c-nigeria' ? (
            // EMBED COMPRESSED NIGERIA HUB COMPONENT!
            <div className="space-y-6">
              
              {/* Checklist Panel */}
              <div className="border-heavy bg-white p-4 sm:p-6 neo-shadow rounded-none">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-black pb-4 mb-4 gap-3.5">
                  <div className="flex items-center gap-2.5">
                    <Globe className="w-6 h-6 text-[#008751] shrink-0" />
                    <div>
                      <h3 className="font-sora text-sm md:text-base font-bold text-[#1b1b1b] uppercase">
                        12-Point P2P Safety Shield
                      </h3>
                      <p className="font-mono text-[9px] text-[#008751] font-bold uppercase tracking-wider">
                        Required verification before matching any merchant
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 text-xs">
                    <button
                      type="button"
                      onClick={handleCheckAllP2P}
                      className="font-mono text-[9.5px] font-bold uppercase px-2.5 py-1.5 border border-black bg-brand-surface hover:bg-brand-surface-container active-press cursor-pointer shrink-0"
                    >
                      Verify All
                    </button>
                    <button
                      type="button"
                      onClick={handleResetP2P}
                      className="font-mono text-[9.5px] font-bold uppercase px-2.5 py-1.5 border border-black bg-white hover:bg-brand-surface active-press cursor-pointer shrink-0"
                    >
                      Clear Status
                    </button>
                  </div>
                </div>

                <p className="font-mono text-xs text-gray-500 mb-6 leading-relaxed">
                  Open your local banking application alongside this checklist. Go through every line-check with extreme care prior to sending Naira transfers.
                </p>

                {/* Shield State Panel */}
                <div className={`border-heavy p-4 mb-6 rounded-none ${p2pBgStyle}`}>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2.5 border-b border-black/10 pb-2.5 mb-2.5 text-left">
                    <span className="font-sora text-xs font-bold uppercase tracking-tight">
                      TALLY STATUS: {totalChecked} OF 12 SECURED
                    </span>
                    <span className="font-mono text-[9px] font-extrabold border border-black/30 px-2 py-0.5 bg-white/40 block w-fit shrink-0">
                      CRITICAL CHECKS: {criticalCheckedCount}/7
                    </span>
                  </div>
                  <p className="font-mono text-[10px] font-bold leading-normal">
                    {p2pSafetyPrompt}
                  </p>
                </div>

                {/* Checklist Loop */}
                <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                  {p2pSafetyChecklist.map((item) => {
                    const isChecked = !!checkedP2P[item.id];
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleP2P(item.id)}
                        className={`border-2 p-3 transition-all cursor-pointer flex items-start gap-3 rounded-none relative overflow-hidden ${
                          isChecked 
                            ? 'border-black bg-[#d2ffdb]/50 hover:bg-[#d2ffdb]/80' 
                            : item.isImportant 
                              ? 'border-[#ff5f1f] bg-white hover:bg-orange-50/50' 
                              : 'border-black bg-white hover:bg-brand-surface'
                        }`}
                      >
                        {item.isImportant && !isChecked && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#ff5f1f]" />
                        )}

                        <div className="mt-0.5 shrink-0">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}} 
                            className="w-4 h-4 border-2 border-black accent-black rounded-none cursor-pointer"
                          />
                        </div>

                        <div className="space-y-0.5 min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-[8px] font-bold text-gray-400">
                              ID: {item.id.replace('p2p-', '').toUpperCase()}
                            </span>
                            {item.isImportant && (
                              <span className={`text-[8px] font-bold px-1.5 border ${
                                isChecked ? 'bg-[#00ac28] text-white border-black' : 'bg-[#fff0ea] text-[#ab3600] border-[#ff5f1f]'
                              }`}>
                                CRITICAL RULE
                              </span>
                            )}
                          </div>
                          <p className={`font-mono text-[11px] leading-tight break-words ${isChecked ? 'text-gray-600 line-through' : 'text-gray-900 font-bold'}`}>
                            {item.text}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Local directory */}
              <div className="border-heavy bg-white p-4 sm:p-6 neo-shadow rounded-none">
                <div className="border-b-2 border-black pb-4 mb-4">
                  <h3 className="font-sora text-sm md:text-base font-bold text-[#1b1b1b] uppercase">
                    LOCAL EXCHANGES DIRECTORY
                  </h3>
                  <p className="font-mono text-[9px] text-gray-500 font-bold uppercase tracking-wider">
                    NIGERIA SEC-LICENSED STATUS
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {nigerianExchanges.map((ex) => (
                    <div
                      key={ex.id}
                      className="border-heavy p-3.5 sm:p-4 relative bg-brand-surface space-y-3 rounded-none flex flex-col justify-between"
                    >
                      <div className="space-y-2 min-w-0">
                        <div className="flex flex-row items-center justify-between flex-wrap gap-2 border-b border-black/10 pb-2">
                          <h4 className="font-sora text-xs font-bold text-gray-950 truncate max-w-[65%] sm:max-w-none">
                            {ex.name}
                          </h4>
                          <span className={`font-mono text-[8px] sm:text-[8.5px] font-extrabold px-1.5 py-0.5 border shrink-0 ${ex.badgeColorClass}`}>
                            {ex.status}
                          </span>
                        </div>
                        <p className="font-mono text-[10px] text-gray-600 leading-tight break-words">
                          {ex.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-black/10 flex flex-row items-center justify-between gap-3 flex-wrap">
                        <div className="flex items-center gap-1">
                          <span className="font-mono text-[9px] text-gray-400">Score:</span>
                          <span className="font-mono text-[10.5px] font-bold text-black">{ex.rating}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSelectedExchange(ex)}
                          className="font-mono text-[9px] font-bold uppercase bg-black text-white px-2 py-1.5 border-heavy active-press cursor-pointer flex items-center gap-1 hover:bg-black/85 shrink-0"
                        >
                          <span>Review Report</span>
                          <ArrowRight className="w-3 shrink-0" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            // GLOBAL REGIONS SECURITY MATRIX
            <div className="space-y-6">
              {/* Highlight Box: Recommended Practices */}
              <div className="bg-white border-heavy p-4 sm:p-6 space-y-4 neo-shadow rounded-none">
                <span className="border border-[#006e16] bg-[#d2ffdb] font-mono text-[9px] font-extrabold px-2 py-0.5 uppercase text-[#136327] block w-fit">
                  SECURE TACTICAL ANCHORS
                </span>
                <h4 className="font-sora text-sm md:text-base font-extrabold text-gray-950 uppercase">
                  RECOMMENDED INTERACTION MANUAL
                </h4>
                <div className="space-y-3 font-mono text-xs text-gray-700 leading-normal">
                  {currentCountry.recommendedPractices.map((prac, i) => (
                    <div key={i} className="flex gap-2 items-start">
                      <span className="text-[#006e16] font-bold text-sm leading-none shrink-0">✓</span>
                      <span className="break-words">{prac}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Localized Risks Warning Box */}
              <div className="bg-[#ffdad6] border-heavy border-l-[6px] sm:border-l-[8px] border-l-[#ba1a1a] p-4 sm:p-6 space-y-4 text-brand-on-error-container">
                <div className="flex items-center gap-1.5 text-xs text-brand-error font-black">
                  <ShieldAlert className="w-5 h-5 shrink-0" />
                  <span className="uppercase font-sora tracking-tight">ACTIVE REGIONAL THREAT SIGNATURES</span>
                </div>
                <div className="space-y-3 font-mono text-xs leading-normal">
                  {currentCountry.localRisks.map((risk, i) => (
                    <div key={i} className="flex gap-2 items-start pl-3 border-l border-brand-error/25">
                      <span className="text-[#ba1a1a] font-bold text-sm leading-none shrink-0">⚠️</span>
                      <span className="font-medium text-gray-900 break-words">{risk}</span>
                    </div>
                  ))}
                </div>
               </div>
            </div>
          )}

        </div>
      </div>

      {/* Embedded Nigeria Exchange Reports */}
      {selectedExchange && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 animate-fade-in">
          <div className="bg-white border-[4px] border-black rounded-none max-w-lg w-full neo-shadow relative overflow-hidden">
            
            <div className="bg-black text-[#72ff70] p-5 border-b-[3px] border-black flex items-start justify-between gap-4">
              <div>
                <span className="font-mono text-[9px] font-bold bg-[#0040e0] text-white px-2 py-0.5 border border-[#efefff] uppercase tracking-wider">
                  REGIONAL SPOTLIGHT SHEET
                </span>
                <h4 className="font-sora text-lg font-black uppercase tracking-tight mt-1">
                  {selectedExchange.name}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setSelectedExchange(null)}
                className="bg-white text-black border-2 border-black p-1 hover:bg-[#ab3600] text-lg active-press cursor-pointer shrink-0"
              >
                <X className="w-5 h-5 mx-auto" />
              </button>
            </div>

            <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
              <div className="space-y-1.5 border border-black p-3.5 bg-brand-surface">
                <span className="font-mono text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none">
                  Registry Status:
                </span>
                <div className="flex items-center gap-2">
                  <Award className="w-4.5 h-4.5 text-[#006e16]" />
                  <span className="font-mono text-xs font-black text-[#008751] uppercase">
                    PROV LICENSE: {selectedExchange.status} COMPLIANT
                  </span>
                </div>
                <p className="font-mono text-[10px] text-gray-600 mt-1.5 leading-tight">
                  {selectedExchange.description}
                </p>
              </div>

              <div className="space-y-2">
                <span className="font-mono text-[10px] text-[#0040e0] font-bold uppercase tracking-widest">
                  Licensed Attributes:
                </span>
                <div className="space-y-1.5">
                  {selectedExchange.pros.map((pro, index) => (
                    <div key={index} className="flex gap-2 items-start bg-blue-50/50 p-2 border border-blue-200">
                      <ThumbsUp className="w-4 h-4 text-[#0040e0] mt-0.5 shrink-0" />
                      <span className="font-mono text-[10px] text-blue-950 leading-tight">{pro}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5 p-3.5 border border-[#ba1a1a] bg-[#ffdad6] text-brand-on-error-container">
                <div className="flex items-center gap-2 text-xs font-bold text-brand-error">
                  <ShieldAlert className="w-4 h-4" />
                  <span className="font-sora text-[10.5px] uppercase">LOCAL CORRIDOR ALERT PANEL</span>
                </div>
                <p className="font-mono text-[10px] leading-tight">
                  {selectedExchange.alerts}
                </p>
              </div>
            </div>

            <div className="bg-brand-surface p-4 border-t-[3px] border-black flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedExchange(null)}
                className="bg-black text-white font-mono text-xs font-bold uppercase px-6 py-2.5 border-heavy active-press cursor-pointer"
              >
                DISMISS REPORTS
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
