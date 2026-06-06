import React, { useState, useEffect } from 'react';
import { platformReviews } from '../extendedData';
import { PlatformReview } from '../types';
import { Award, ShieldCheck, ThumbsUp, ThumbsDown, Star, RefreshCw, Check, Info, Landmark, HelpCircle } from 'lucide-react';

export const Reviews: React.FC = () => {
  const [filterType, setFilterType] = useState<'all' | 'exchange' | 'wallet'>('all');
  const [selectedPlatformId, setSelectedPlatformId] = useState<string | null>(null);

  useEffect(() => {
    const handleOpenPlatform = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        // Automatically adjust filterType based on the selected platform type
        const platform = platformReviews.find(p => p.id === customEvent.detail);
        if (platform) {
          setFilterType('all'); // Clear filters so they can see it in the list if necessary
        }
        setSelectedPlatformId(customEvent.detail);
      }
    };
    window.addEventListener('csg-open-platform', handleOpenPlatform);
    return () => {
      window.removeEventListener('csg-open-platform', handleOpenPlatform);
    };
  }, []);

  const selectedPlatform = platformReviews.find((p) => p.id === selectedPlatformId);

  const filteredReviews = platformReviews.filter(
    (review) => filterType === 'all' || review.type === filterType
  );

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">
      {/* Page Title / Advisory Banner */}
      <div className="bg-[#eef3ff] border-heavy border-l-[8px] border-l-[#003da5] p-6 space-y-3">
        <h2 className="font-sora text-3xl font-extrabold uppercase tracking-tight text-[#003da5] flex items-center gap-2">
          <Award className="w-8 h-8 shrink-0" />
          EXCHANGE & CUSTODY REVIEWS
        </h2>
        <p className="font-mono text-xs text-gray-700 max-w-3xl leading-relaxed">
          Independent security assessments. We do not accept paid compensation from platforms to inflate scores. All metrics reflect cryptographic design audits, regulatory licensing status, and corporate deposit histories.
        </p>
        <div className="bg-white p-2.5 border-heavy inline-flex items-center gap-1.5 font-mono text-[9.5px] text-[#003da5] font-bold">
          <Info className="w-3.5 h-3.5" />
          AFFILIATE TRANSPARENCY: Zero affiliate codes are used. All links serve direct user convenience.
        </div>
      </div>

      {/* Primary Filtering and Main Tabs */}
      <div className="flex overflow-x-auto whitespace-nowrap scrollbar-clean gap-2 border-b border-black pb-4">
        {[
          { id: 'all', label: 'ALL PLATFORMS' },
          { id: 'exchange', label: 'CENTRALIZED EXCHANGES' },
          { id: 'wallet', label: 'HARDWARE COLD WALLETS' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => { setFilterType(tab.id as any); setSelectedPlatformId(null); }}
            className={`px-3 py-2 border-heavy font-mono text-xs font-bold uppercase transition-all duration-150 cursor-pointer active-press shrink-0 ${
              filterType === tab.id
                ? 'bg-black text-white neo-shadow-sm'
                : 'bg-white hover:bg-brand-surface-container text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Platforms List Feed - Left Pane (lg:col-span-4 / md:col-span-5) */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="font-mono text-xs font-black text-gray-400 uppercase tracking-widest">
            AVAILABLE AUDITED ENTITIES ({filteredReviews.length})
          </h3>

          <div className="space-y-3">
            {filteredReviews.map((platform) => {
              const worksHere = selectedPlatformId === platform.id;
              return (
                <div
                  key={platform.id}
                  onClick={() => setSelectedPlatformId(platform.id)}
                  className={`border-heavy p-4 cursor-pointer transition-all duration-150 relative active-press ${
                    worksHere
                      ? 'bg-white border-[#003da5] neo-shadow'
                      : 'bg-white hover:bg-brand-surface-container neo-shadow-sm'
                  }`}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <span className={`inline-block border text-[8.5px] font-mono font-bold px-1.5 py-0.5 rounded-sm uppercase ${
                        platform.type === 'exchange' ? 'bg-[#eef3ff] text-[#0040e0]' : 'bg-amber-50 text-amber-800'
                      }`}>
                        {platform.type}
                      </span>
                      <h4 className="font-sora text-base font-extrabold text-gray-900 uppercase mt-1">
                        {platform.name}
                      </h4>
                    </div>

                    <div className="text-right">
                      <div className="font-mono text-[9px] text-gray-400 uppercase">SAFETY SCORE</div>
                      <div className="font-mono font-bold text-[#006e16] text-xl">
                        {platform.safetyScore}<span className="text-gray-400 text-xs">/100</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-black/10 text-[10px] font-mono text-gray-500">
                    <span className="uppercase">RATING: {platform.globalRating} ★</span>
                    <span className="underline font-bold text-[#ab3600]">VIEW VERDICT</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Dashboard Detail Panel - Right Pane (lg:col-span-8 / md:col-span-7) */}
        <div className="lg:col-span-7">
          {selectedPlatform ? (
            <div className="bg-white border-heavy neo-shadow p-6 space-y-6">
              
              {/* Header Box */}
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b-[3px] border-black pb-5 gap-4">
                <div>
                  <h3 className="font-sora text-2xl font-black uppercase text-gray-900">
                    {selectedPlatform.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mt-1.5 font-mono text-[10px] text-gray-500">
                    <span>TYPE: <span className="font-bold underline text-black uppercase">{selectedPlatform.type}</span></span>
                    <span>•</span>
                    <span>LAST REVIEWED: <span className="font-bold text-black">{selectedPlatform.lastReviewed}</span></span>
                  </div>
                </div>

                <div className="bg-[#fff0ea] p-3 border-heavy text-center min-w-[120px] shrink-0">
                  <div className="font-mono text-[9px] text-[#ab3600] font-black uppercase tracking-wider">SAFETY INDEX</div>
                  <div className="font-mono text-2xl font-black text-[#ab3600]">
                    {selectedPlatform.safetyScore}%
                  </div>
                </div>
              </div>

              {/* Core Verdict Statement */}
              <div className="space-y-2">
                <h4 className="font-mono text-xs font-black text-gray-400 uppercase tracking-widest">
                  EXECUTIVE VERDICT SUMMARY
                </h4>
                <p className="font-sans text-xs bg-brand-surface p-4 border-heavy border-l-[6px] border-l-black leading-relaxed text-gray-800 italic">
                  "{selectedPlatform.verdict}"
                </p>
              </div>

              {/* Pros & Cons Columns Split */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {/* Pros */}
                <div className="border-heavy bg-[#f0fcf9] p-4 space-y-3">
                  <h5 className="font-mono text-xs font-bold text-[#136327] uppercase tracking-wider flex items-center gap-1.5">
                    <ThumbsUp className="w-4 h-4 text-brand-tertiary" />
                    SECURITY STRENGTHS
                  </h5>
                  <ul className="space-y-2 text-xs font-mono text-gray-700 leading-normal">
                    {selectedPlatform.pros.map((pro, i) => (
                      <li key={i} className="flex gap-2 items-start">
                        <span className="text-[#136327] font-bold shrink-0">✓</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cons */}
                <div className="border-heavy bg-[#fff0ea] p-4 space-y-3">
                  <h5 className="font-mono text-xs font-bold text-[#ab3600] uppercase tracking-wider flex items-center gap-1.5">
                    <ThumbsDown className="w-4 h-4 stroke-[2.5]" />
                    POTENTIAL DRAWBACKS
                  </h5>
                  <ul className="space-y-2 text-xs font-mono text-gray-700 leading-normal">
                    {selectedPlatform.cons.map((con, i) => (
                      <li key={i} className="flex gap-2 items-start">
                        <span className="text-[#ab3600] font-bold shrink-0">✗</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Security Features */}
              <div className="space-y-3 border-t border-black/10 pt-4">
                <h4 className="font-mono text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#006e16]" />
                  AUDITED CYBERSECURITY ATTRIBUTES
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono text-gray-700">
                  {selectedPlatform.securityFeatures.map((feat, i) => (
                    <div key={i} className="bg-gray-50 border p-2 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-black shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Supported Regions */}
              <div className="space-y-2 border-t border-black/10 pt-4">
                <h4 className="font-mono text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Landmark className="w-4 h-4 text-purple-700" />
                  SUPPORTED REGIONAL COMPLIANCE
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedPlatform.supportedRegions.map((region, i) => (
                    <span key={i} className="border border-purple-800 bg-purple-50 text-purple-800 font-mono text-[10px] font-black px-2 py-0.5 uppercase">
                      {region}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-white border-heavy p-12 text-center neo-shadow flex flex-col items-center justify-center space-y-4">
              <HelpCircle className="w-12 h-12 text-[#0040e0] animate-bounce" />
              <div className="space-y-1">
                <h4 className="font-sora text-lg font-black uppercase text-gray-900">
                  SELECT A SYSTEM ACCOUNT FOR DETAILED METRICS
                </h4>
                <p className="font-mono text-xs text-gray-500 max-w-sm mx-auto">
                  Choose an audited exchange or hardware custody unit from the index pane to load deep, uncompromised safety diagnostics.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
