import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GlossaryText } from './GlossarySystem';
import { 
  Building2, 
  Search, 
  ShieldCheck, 
  AlertTriangle, 
  ArrowRight, 
  CheckCircle, 
  XCircle, 
  RefreshCw, 
  SlidersHorizontal, 
  Compass, 
  Layers, 
  Lock, 
  Database, 
  Scale, 
  FileCheck, 
  Calculator,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Globe,
  Coins,
  LayoutGrid,
  List,
  Filter
} from 'lucide-react';

export interface ExchangeEntry {
  id: string;
  name: string;
  logoColorClass: string;
  badgeTextColor: string;
  regions: string[];
  registeredBody: string;
  securityScore: number;
  riskCategory: 'TIER-1 PREMIUM' | 'SECURED COMPLIANT' | 'CAUTION OFFSHORE' | 'SUSPECT REGULATION';
  hasProofOfReserves: boolean;
  mfaLevel: 'Hardware Key (YubiKey)' | 'Authenticator App (TOTP)' | 'SMS Code (Weak)';
  fiatChannels: string[];
  custodyMethod: string;
  pros: string[];
  cons: string[];
  knownDomains: string[];
  officialUrl: string;
  description: string;
}

export const EXCHANGES_DB: ExchangeEntry[] = [
  {
    id: 'coinbase',
    name: 'Coinbase Global',
    logoColorClass: 'bg-blue-600 text-white',
    badgeTextColor: 'text-blue-600',
    regions: ['North America', 'Europe/UK', 'Sub-Saharan Africa (Trading)', 'APAC'],
    registeredBody: 'SEC (USA), FCA (UK), BaFin (Germany)',
    securityScore: 96,
    riskCategory: 'TIER-1 PREMIUM',
    hasProofOfReserves: true,
    mfaLevel: 'Hardware Key (YubiKey)',
    fiatChannels: ['USD SWIFT/ACH', 'EUR SEPA', 'GBP Faster Payments'],
    custodyMethod: 'US Subterranean offline multi-sig cold vaults',
    pros: ['NASDAQ listed (COIN)', 'FDIC insured cash backup', 'Audited quarterly by Deloitte'],
    cons: ['Fee rates skew higher on instant transactions', 'Account access freezes during massive market volatility'],
    knownDomains: ['coinbase.com', 'pro.coinbase.com'],
    officialUrl: 'https://www.coinbase.com',
    description: 'The world\'s flagship regulated exchange. Subject to supreme regulatory oversight and continuous financial scrutiny.'
  },
  {
    id: 'kraken',
    name: 'Kraken Exchange',
    logoColorClass: 'bg-[#1e05a8] text-white',
    badgeTextColor: 'text-[#1e05a8]',
    regions: ['North America', 'Europe/UK', 'APAC'],
    registeredBody: 'FinCEN (US), FCA (UK), FinTRAC (Canada)',
    securityScore: 95,
    riskCategory: 'TIER-1 PREMIUM',
    hasProofOfReserves: true,
    mfaLevel: 'Hardware Key (YubiKey)',
    fiatChannels: ['USD Fedwire', 'EUR SEPA Instant', 'GBP CHAPS'],
    custodyMethod: 'Full independent asset segregation, offline ledger clusters',
    pros: ['Stellar 12-year history without any major security breach', 'True independent cryptographic Proof of Reserves updates', 'Extremely granular API and session key bindings'],
    cons: ['Interface structure is dense for absolute novices', 'KYC compliance gates are extremely strict during setup'],
    knownDomains: ['kraken.com'],
    officialUrl: 'https://www.kraken.com',
    description: 'A custody pioneer. Renowned for its mathematically rigorous cryptographic audits and flawless technical record.'
  },
  {
    id: 'quidax',
    name: 'Quidax Africa',
    logoColorClass: 'bg-emerald-600 text-white',
    badgeTextColor: 'text-[#136327]',
    regions: ['Sub-Saharan Africa', 'Nigeria', 'Ghana'],
    registeredBody: 'Securities and Exchange Commission (SEC) Nigeria',
    securityScore: 92,
    riskCategory: 'SECURED COMPLIANT',
    hasProofOfReserves: true,
    mfaLevel: 'Authenticator App (TOTP)',
    fiatChannels: ['NGN P2P Bank Transfer', 'Naira Virtual Accounts', 'KES Deposit Ramps'],
    custodyMethod: 'Insured institutional multi-sig backing with cold reserve offsets',
    pros: ['SEC Nigeria licensed and fully vetted', 'Instant high-liquidity West African P2P matching', 'Local Naira bank verification safeguards to halt fraudulent blocks'],
    cons: ['Token catalog is focused primarily on blue chips and liquid standards', 'Low leverage availability for derivatives markets'],
    knownDomains: ['quidax.com', 'quidax.com.ng'],
    officialUrl: 'https://www.quidax.com',
    description: 'The premier SEC-licensed crypto gateway in West Africa. Specifically engineered with localized compliance mechanics to insulate clients from bank account freezes.'
  },
  {
    id: 'binance',
    name: 'Binance Global',
    logoColorClass: 'bg-yellow-500 text-black font-black',
    badgeTextColor: 'text-yellow-700',
    regions: ['Europe/UK (Restricted)', 'Sub-Saharan Africa', 'APAC', 'Latin America'],
    registeredBody: 'AMF (France), VASP (Italy/Spain/Sweden)',
    securityScore: 89,
    riskCategory: 'SECURED COMPLIANT',
    hasProofOfReserves: true,
    mfaLevel: 'Hardware Key (YubiKey)',
    fiatChannels: ['EUR SEPA', 'GBP P2P Transfer', 'NGN peer-to-peer', 'BRL Bank Slip'],
    custodyMethod: 'Secure Asset Fund for Users (SAFU) insurance pool coverage',
    pros: ['Unparalleled global liquidity depth across thousands of markets', 'SAFU fund backstop holding over $1B in emergency reserve assets', 'Robust programmatic hardware security integrations'],
    cons: ['Heavy historic conflict with US and regional central bank regulatory circles', 'Extremely complex subsidiary network layout'],
    knownDomains: ['binance.com', 'binance.us'],
    officialUrl: 'https://www.binance.com',
    description: 'The unmatched titan of on-chain trading volumes. Operates with rigid mechanical safety nets but carries historic offshore regulatory complexity.'
  },
  {
    id: 'luno',
    name: 'Luno Wallet',
    logoColorClass: 'bg-[#5e17eb] text-white',
    badgeTextColor: 'text-[#5e17eb]',
    regions: ['Sub-Saharan Africa', 'South Africa', 'Nigeria', 'Europe/UK'],
    registeredBody: 'FCA (UK), FSCA (South Africa)',
    securityScore: 91,
    riskCategory: 'SECURED COMPLIANT',
    hasProofOfReserves: false,
    mfaLevel: 'Authenticator App (TOTP)',
    fiatChannels: ['ZAR bank clearings', 'EUR credit systems', 'NGN local transfers'],
    custodyMethod: 'Consolidated deep-freeze secure storage vault network',
    pros: ['Highly conservative asset catalog (No speculative junk tokens)', 'Puristic visual interface optimized for non-technical retirees', 'Full banking compliance clearance in South Africa and EU'],
    cons: ['Extremely basic wallet tools (No advanced DeFi or network switching)', 'Lacks continuous third-party cryptographic reserves auditing'],
    knownDomains: ['luno.com'],
    officialUrl: 'https://www.luno.com',
    description: 'A solid financial gateway focused on simplified, conservative digital asset acquisitions with strict compliance safeguards.'
  },
  {
    id: 'bybit',
    name: 'Bybit International',
    logoColorClass: 'bg-orange-600 text-white',
    badgeTextColor: 'text-orange-700',
    regions: ['Global (Restricted in USA/Canada/UK)', 'APAC', 'Europe (Restricted)'],
    registeredBody: 'Offshore licensing, Seychelles Registry',
    securityScore: 78,
    riskCategory: 'CAUTION OFFSHORE',
    hasProofOfReserves: true,
    mfaLevel: 'Authenticator App (TOTP)',
    fiatChannels: ['USD Wire (Intermittent)', 'EUR SEPA', 'RUB transfers', 'P2P networks'],
    custodyMethod: 'Shared cold wallets with smart collateralized offsets',
    pros: ['Maximum leverage availability with advanced order execution mechanics', 'Regular public proof-of-reserves files updated quarterly', 'No KYC limits on micro-tier crypto-to-crypto trades'],
    cons: ['No sovereign fiat insurance backing', 'Located offshore in lenient regulatory domains', 'Geographically blocked in major tier-1 legal regions'],
    knownDomains: ['bybit.com'],
    officialUrl: 'https://www.bybit.com',
    description: 'A high-performance trading platform beloved by active derivatives speculators. High technical security but weaker geopolitical backing.'
  },
  {
    id: 'kucoin',
    name: 'KuCoin Exchange',
    logoColorClass: 'bg-teal-600 text-white',
    badgeTextColor: 'text-teal-700',
    regions: ['Global (Restricted in USA/China/Europe)', 'APAC', 'LATAM'],
    registeredBody: 'Seychelles / Cayman Islands registry networks',
    securityScore: 64,
    riskCategory: 'SUSPECT REGULATION',
    hasProofOfReserves: true,
    mfaLevel: 'Authenticator App (TOTP)',
    fiatChannels: ['P2P trading networks', 'Third-party purchasing agents'],
    custodyMethod: 'Consolidated system hot wallet clusters',
    pros: ['Uncapped catalog of hundreds of rare micro-cap altcoins', 'Advanced staking dashboards and automated grid trading bots'],
    cons: ['Historically charged by US regulatory bodies for AML violations', 'Experienced a major $280M hot wallet security hack in 2020', 'Unclear corporate reserve audits during volatility surges'],
    knownDomains: ['kucoin.com'],
    officialUrl: 'https://www.kucoin.com',
    description: 'Commonly known as the "people\'s exchange" due to its massive token catalog. However, historic hacks and regulatory fines flag it for caution and short-term utility use only.'
  }
];

export const ExchangesDirectory: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedExchanges, setExpandedExchanges] = useState<Record<string, boolean>>({ coinbase: true, quidax: true });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [proofOfReservesRequired, setProofOfReservesRequired] = useState<boolean>(false);
  const [securityScoreThreshold, setSecurityScoreThreshold] = useState<number>(0);

  useEffect(() => {
    const handleOpenExchange = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const exchangeId = customEvent.detail;
      const found = EXCHANGES_DB.find(exch => exch.id === exchangeId);
      if (found) {
        setSelectedRegion('all');
        setSelectedCategory('all');
        setSearchQuery('');
        setProofOfReservesRequired(false);
        setSecurityScoreThreshold(0);
        setExpandedExchanges(prev => ({ ...prev, [exchangeId]: true }));
        
        setTimeout(() => {
          const element = document.getElementById(`exchange-card-${exchangeId}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 150);
      }
    };
    window.addEventListener('csg-open-exchange', handleOpenExchange);
    return () => {
      window.removeEventListener('csg-open-exchange', handleOpenExchange);
    };
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedExchanges(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Domain Verifier tool states
  const [targetExchangeId, setTargetExchangeId] = useState<string>('quidax');
  const [inputUrl, setInputUrl] = useState<string>('');
  const [domainCheckResult, setDomainCheckResult] = useState<{
    status: 'PASS' | 'FAIL' | 'IDLE';
    message: string;
    score: number;
    issues: string[];
  }>({ status: 'IDLE', message: '', score: 100, issues: [] });

  // Comparison states
  const [compareAId, setCompareAId] = useState<string>('coinbase');
  const [compareBId, setCompareBId] = useState<string>('quidax');

  // Custom Calculator states
  const [calcAudit, setCalcAudit] = useState(false);
  const [calcMfa, setCalcMfa] = useState(false);
  const [calcRegulated, setCalcRegulated] = useState(false);
  const [calcDepositInsurance, setCalcDepositInsurance] = useState(false);
  const [calcOpenSource, setCalcOpenSource] = useState(false);

  // Region and Category extract lists
  const regions = ['all', 'North America', 'Europe/UK', 'Sub-Saharan Africa', 'APAC'];
  const categories = ['all', 'TIER-1 PREMIUM', 'SECURED COMPLIANT', 'CAUTION OFFSHORE', 'SUSPECT REGULATION'];

  const filteredExchanges = EXCHANGES_DB.filter((exch) => {
    const matchRegion = selectedRegion === 'all' || exch.regions.some(r => r.toLowerCase().includes(selectedRegion.toLowerCase()));
    const matchCat = selectedCategory === 'all' || exch.riskCategory === selectedCategory;
    const matchSearch = exch.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        exch.registeredBody.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        exch.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchPor = !proofOfReservesRequired || exch.hasProofOfReserves;
    const matchScore = exch.securityScore >= securityScoreThreshold;
    return matchRegion && matchCat && matchSearch && matchPor && matchScore;
  });

  const getRiskStyles = (cat: ExchangeEntry['riskCategory']) => {
    switch (cat) {
      case 'TIER-1 PREMIUM':
        return 'bg-blue-50 border-blue-600 text-blue-700';
      case 'SECURED COMPLIANT':
        return 'bg-[#d2ffdb] border-[#136327] text-[#136327]';
      case 'CAUTION OFFSHORE':
        return 'bg-amber-50 border-amber-600 text-amber-700';
      case 'SUSPECT REGULATION':
        return 'bg-red-50 border-red-600 text-red-700 font-bold';
      default:
        return 'bg-gray-100 border-black';
    }
  };

  const verifyHostDom = () => {
    if (!inputUrl.trim()) {
      setDomainCheckResult({
        status: 'FAIL',
        message: 'Input box is blank. Please enter a URL to analyze.',
        score: 0,
        issues: ['URL is empty.']
      });
      return;
    }

    const exch = EXCHANGES_DB.find(e => e.id === targetExchangeId);
    if (!exch) return;

    let parsedString = inputUrl.trim().toLowerCase();
    
    // Strip protocols for base domain tests
    parsedString = parsedString.replace(/^(https?:\/\/)?(www\.)?/, '');
    // Strip trailing paths
    const hostname = parsedString.split('/')[0];

    const issuesList: string[] = [];
    let calcScore = 100;

    // Issue check 1: Secure protocol HTTPS?
    if (!inputUrl.startsWith('https://')) {
      calcScore -= 30;
      issuesList.push('Missing explicit https:// prefix. Unencrypted connections leak login keys instantly.');
    }

    // Issue check 2: Is it associated with known domains of this exchange?
    const isExactMatch = exch.knownDomains.some(dom => hostname === dom);
    
    if (isExactMatch) {
      // Passes base domain check
    } else {
      calcScore -= 60;
      // Check for common typo-squats
      if (hostname.includes('bonus') || hostname.includes('free') || hostname.includes('claim') || hostname.includes('-') || hostname.includes('giveaway')) {
        issuesList.push('Spooky payload keywords found ("bonus", "claim", "free", "gift"). Genuine exchanges never use sub-domains styled for giveaways.');
      }
      issuesList.push(`Domain name match failure. Host "${hostname}" is not registered in our official database records for ${exch.name}. Safe host list: ${exch.knownDomains.join(', ')}`);
    }

    // Check for weird endings
    if (hostname.endsWith('.net') || hostname.endsWith('.xyz') || hostname.endsWith('.cc') || hostname.endsWith('.info') || hostname.endsWith('.club')) {
      if (!exch.knownDomains.some(dom => dom.endsWith(hostname.split('.').pop() || ''))) {
        calcScore -= 20;
        issuesList.push('Suspicious Top-Level Domain suffix (.xyz, .info, .club) commonly registered under cheap burner DNS layouts.');
      }
    }

    const finalScore = Math.max(0, calcScore);
    const finalStatus = finalScore >= 90 ? 'PASS' : 'FAIL';
    const msg = finalStatus === 'PASS' 
      ? `VERIFICATION SECURE. This matches the official verified cryptographic footprint of ${exch.name}.`
      : `CRITICAL RISK WARNING! Host profile fails official safety checks for ${exch.name}.`;

    setDomainCheckResult({
      status: finalStatus,
      message: msg,
      score: finalScore,
      issues: issuesList
    });
  };

  const getCalcScore = () => {
    let tot = 10; // base rating
    if (calcAudit) tot += 25;
    if (calcMfa) tot += 20;
    if (calcRegulated) tot += 25;
    if (calcDepositInsurance) tot += 15;
    if (calcOpenSource) tot += 5;
    return tot;
  };

  const calcScoreResult = getCalcScore();

  const exchangeA = EXCHANGES_DB.find(e => e.id === compareAId) || EXCHANGES_DB[0];
  const exchangeB = EXCHANGES_DB.find(e => e.id === compareBId) || EXCHANGES_DB[1];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8" id="exchanges-directory-main-container">
      {/* Premium Visual Banner Deck */}
      <div className="bg-gradient-to-br from-[#fff0ea] to-[#fff6f2] border-heavy border-l-[8px] border-l-[#ff5f1f] p-8 md:p-10 space-y-4 neo-shadow relative overflow-hidden">
        {/* Dynamic decorative backdrop shape */}
        <div className="absolute right-0 top-0 text-[180px] font-black font-mono text-[#ff5f1f]/5 pointer-events-none select-none -translate-y-12 translate-x-12">
          INDEX
        </div>
        
        <div className="inline-flex items-center gap-2 bg-black text-white px-3 py-1.5 font-mono text-[9.5px] font-black uppercase tracking-widest leading-none">
          <Building2 className="w-4 h-4 text-[#72ff70]" />
          CSG VERIFIED EXCHANGES DIRECTORY
        </div>
        <h2 className="font-sora text-3xl md:text-5xl font-extrabold tracking-tight text-gray-950 uppercase leading-none max-w-4xl">
          GLOBAL CRYPTO EXCHANGE SAFETY INDEX
        </h2>
        <div className="font-sans text-sm md:text-base text-gray-700 leading-relaxed max-w-5xl font-medium">
          Complete, uncompromised structural indexes evaluating dynamic sovereign exchange options. Filtered strictly based on <GlossaryText text="cold storage" /> capabilities, sovereign local licensing safeguards, and anti-drainage infrastructure protocols to insulate your personal balance from sudden crashes.
        </div>
      </div>

      {/* Main Container - Full Width Listing */}
      <div className="space-y-6">
        
        {/* Elite Premium Controls Deck */}
        <div className="bg-white border-heavy p-6 space-y-6 neo-shadow-sm">
          {/* Row 1: Search & View Mode Toggle */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-black/10">
            <div className="space-y-1.5 flex-grow">
              <label className="block font-mono text-[10px] font-black text-gray-400 uppercase tracking-widest text-left">
                FILTER PLATFORMS INTEGRITY REAL-TIME
              </label>
              <div className="relative flex items-center bg-white border-2 border-black">
                <Search className="absolute left-3.5 w-4.5 h-4.5 text-gray-900 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Query exchange name, regulation body, or structural system descriptors..."
                  className="w-full pl-11 pr-4 py-3 bg-transparent font-mono text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>
            
            <div className="shrink-0 space-y-1.5">
              <label className="block font-mono text-[10px] font-black text-gray-400 uppercase tracking-widest md:text-right">
                VIEW FORMAT MODE
              </label>
              <div className="flex items-center gap-2 border-2 border-black p-1 bg-neutral-100">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1.5 font-mono text-[10px] font-black uppercase flex items-center gap-1.5 transition-all select-none cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-black text-white neo-shadow-sm'
                      : 'bg-white hover:bg-neutral-50 text-gray-600'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  Grid Model
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-1.5 font-mono text-[10px] font-black uppercase flex items-center gap-1.5 transition-all select-none cursor-pointer ${
                    viewMode === 'list'
                      ? 'bg-black text-white neo-shadow-sm'
                      : 'bg-white hover:bg-neutral-50 text-gray-600'
                  }`}
                >
                  <List className="w-3.5 h-3.5" />
                  List Model
                </button>
              </div>
            </div>
          </div>

          {/* Row 2: Posture and Geography selector grids */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
            {/* Categorization Pills Selector Matrix */}
            <div className="space-y-3">
              <span className="block font-mono text-[10px] font-black text-gray-450 uppercase tracking-widest text-left">
                SELECT POSTURE PARAMETERS:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedCategory(c)}
                    className={`px-3 py-2 border-2 text-[10px] font-mono font-black uppercase transition-all duration-100 cursor-pointer ${
                      selectedCategory === c
                        ? 'bg-black text-white border-black neo-shadow-sm'
                        : 'bg-white text-gray-600 border-neutral-200 hover:border-black hover:text-black'
                    }`}
                  >
                    {c === 'all' ? '🛡️ ALL POSTURES' : c}
                  </button>
                ))}
              </div>
            </div>

            {/* Region quick filter buttons */}
            <div className="space-y-3">
              <span className="block font-mono text-[10px] font-black text-gray-450 uppercase tracking-widest text-left">
                FILTER BY GEOGRAPHIC CIRCLE:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {regions.map((r) => (
                  <button
                    key={r}
                    onClick={() => setSelectedRegion(r)}
                    className={`px-3 py-2 border-2 text-[10px] font-mono font-black uppercase transition-all duration-100 cursor-pointer ${
                      selectedRegion === r
                        ? 'bg-emerald-605 text-white bg-emerald-700 border-emerald-700 font-bold'
                        : 'bg-white text-gray-500 border-neutral-200 hover:border-black hover:text-black'
                    }`}
                  >
                    {r === 'all' ? '🌍 ALL REGIONS' : r.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Row 3: Security-specific Filters (Add a Filter & Design Enhancement) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-dashed border-gray-200">
            {/* Minimum Safety Score */}
            <div className="space-y-2.5">
              <span className="block font-mono text-[10px] font-black text-gray-450 uppercase tracking-widest text-left flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-[#ff5f1f]" />
                MINIMUM CUSTODY HEALTH FILTER:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: 'ALL SCORES', value: 0 },
                  { label: '🛡️ TIER-1 (80+)', value: 80 },
                  { label: '🔥 PREMIUM (90+)', value: 90 },
                  { label: '💎 ULTIMATE (95+)', value: 95 }
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => setSecurityScoreThreshold(item.value)}
                    className={`px-3 py-1.5 border-2 text-[9.5px] font-mono font-black uppercase transition-all duration-100 cursor-pointer ${
                      securityScoreThreshold === item.value
                        ? 'bg-black text-white border-black neo-shadow-sm'
                        : 'bg-white text-gray-600 border-neutral-200 hover:border-black hover:text-black'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Live PoR constraint */}
            <div className="space-y-2.5 flex flex-col justify-end">
              <span className="block font-mono text-[10px] font-black text-gray-450 uppercase tracking-widest text-left">
                INDEPENDENT CRYPTO RESERVE AUDITING:
              </span>
              <button
                onClick={() => setProofOfReservesRequired(!proofOfReservesRequired)}
                className={`w-full py-2 px-3 border-2 font-mono text-left text-[10.5pt] font-black uppercase transition-all flex items-center justify-between cursor-pointer ${
                  proofOfReservesRequired
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-600 neo-shadow-sm/80'
                    : 'bg-white text-gray-500 border-neutral-200 hover:border-black hover:text-black'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Database className={`w-4 h-4 ${proofOfReservesRequired ? 'text-emerald-700' : 'text-gray-400'}`} />
                  PROOF OF RESERVES REQUIRED
                </span>
                <span className={`px-2 py-0.5 text-[8.5px] font-black border uppercase tracking-wider ${
                  proofOfReservesRequired ? 'bg-emerald-600 text-white border-emerald-700' : 'bg-neutral-100 text-gray-400'
                }`}>
                  {proofOfReservesRequired ? 'ON' : 'OFF'}
                </span>
              </button>
            </div>
          </div>

          {/* Active filters summary */}
          {(selectedCategory !== 'all' || selectedRegion !== 'all' || searchQuery || proofOfReservesRequired || securityScoreThreshold > 0) && (
            <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-gray-500 border-t border-gray-150">
              <span className="font-bold text-gray-700 text-left block">
                Matched Platform Units: <span className="text-black font-black">{filteredExchanges.length}</span> / {EXCHANGES_DB.length}
              </span>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedRegion('all');
                  setSearchQuery('');
                  setProofOfReservesRequired(false);
                  setSecurityScoreThreshold(0);
                }}
                className="text-red-600 hover:text-red-800 font-black underline uppercase cursor-pointer text-left"
              >
                RESET DECK FILTERS
              </button>
            </div>
          )}
        </div>

          {/* Exchanges listing mapping */}
          <div className={viewMode === 'grid' ? "grid grid-cols-1 lg:grid-cols-2 gap-8" : "space-y-6"}>
            <AnimatePresence mode="popLayout">
              {filteredExchanges.map((exch) => {
                const isExpanded = expandedExchanges[exch.id] ?? false;
                return (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    key={exch.id}
                    id={`exchange-card-${exch.id}`}
                    className="bg-white border-heavy p-6 md:p-8 neo-shadow-sm hover:neo-shadow transition-all duration-150 relative overflow-hidden flex flex-col justify-between"
                  >
                    
                    {viewMode === 'list' ? (
                      /* --- LIST FORMAT: horizontal sleek arrangement with high responsive balance --- */
                      <div className="flex flex-col gap-6 text-left w-full">
                        <div className="flex flex-col md:flex-row justify-between items-stretch gap-6 pb-2">
                          
                          {/* Left segment details */}
                          <div className="flex-grow space-y-4">
                            <div className="flex items-center gap-4">
                              <div className={`w-14 h-14 flex items-center justify-center font-sora font-black text-xl border-heavy neo-shadow-sm shrink-0 ${exch.logoColorClass}`}>
                                {exch.name.split(' ').map(w => w[0]).join('').substring(0,2)}
                              </div>
                              <div className="text-left">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className={`border-[1.5px] text-[9.5px] font-mono font-black px-2 py-0.5 uppercase tracking-wide ${getRiskStyles(exch.riskCategory)}`}>
                                    {exch.riskCategory}
                                  </span>
                                  <span className="font-mono text-[9.5px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-1">
                                    <Globe className="w-3 h-3 text-blue-500" />
                                    {exch.regions[0]}
                                  </span>
                                </div>
                                <h3 className="font-sora text-xl md:text-2xl font-extrabold text-[#111] uppercase mt-1 leading-none tracking-tight">
                                  {exch.name}
                                </h3>
                              </div>
                            </div>

                            <div className="font-sans text-sm leading-relaxed text-gray-700 font-medium">
                              <GlossaryText text={exch.description} />
                            </div>

                            <div className="flex flex-wrap gap-2 pt-1">
                              <span className="bg-neutral-50 text-gray-800 border-2 border-black font-mono text-[9px] font-bold px-2.5 py-1 uppercase tracking-wide inline-flex items-center gap-1">
                                <Coins className="w-3.5 h-3.5 text-yellow-600" />
                                fiat channels: {exch.fiatChannels.slice(0, 3).join(' / ')}
                              </span>
                              <span className="bg-[#efefff] text-[#0040e0] border-2 border-[#0040e0]/20 font-mono text-[9px] font-extrabold px-2.5 py-1 uppercase tracking-wide inline-flex items-center gap-1">
                                <Lock className="w-3.5 h-3.5" />
                                mfa protection: {exch.mfaLevel.split('(')[0].trim()}
                              </span>
                            </div>
                          </div>

                          {/* Right segment widget */}
                          <div className="md:w-[245px] shrink-0 flex flex-col justify-between pt-4 md:pt-0 border-t-2 md:border-t-0 md:border-l-2 border-dashed border-black/10 md:pl-6 gap-5">
                            <div className="bg-[#fcfdfa] border-2 border-black p-4 text-right flex flex-col justify-center relative">
                              <span className="font-mono text-[8.5px] text-gray-400 font-black uppercase tracking-wider block">
                                CUSTODY HEALTH INDEX
                              </span>
                              <div className="flex items-baseline justify-end gap-0.5 mt-0.5">
                                <span className="font-mono text-2xl font-black text-emerald-700 leading-none">
                                  {exch.securityScore}
                                </span>
                                <span className="text-gray-400 font-bold text-xs select-none">/100</span>
                              </div>
                              
                              <div className="w-full bg-neutral-200 h-1.5 mt-2 rounded-none overflow-hidden relative border border-black/10">
                                <div 
                                  className={`h-full transition-all duration-300 ${
                                    exch.securityScore >= 90 ? 'bg-emerald-500' :
                                    exch.securityScore >= 75 ? 'bg-amber-400' : 'bg-red-500'
                                  }`}
                                  style={{ width: `${exch.securityScore}%` }}
                                />
                              </div>
                            </div>

                            <button
                              onClick={() => toggleExpand(exch.id)}
                              className="w-full py-2.5 px-3 bg-neutral-50 border-2 border-black hover:bg-neutral-100 flex items-center justify-between text-[10px] font-mono font-black uppercase transition-all tracking-wider cursor-pointer"
                            >
                              <span className="flex items-center gap-1.5 text-gray-800">
                                <SlidersHorizontal className="w-3.5 h-3.5 text-[#ff5f1f]" />
                                {isExpanded ? "HIDE SECURITY AUDIT" : "EXPAND SECURITY AUDIT"}
                              </span>
                              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                            </button>
                          </div>

                        </div>

                        {/* Collapsible deep audit specs */}
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2, ease: "easeInOut" }}
                              className="overflow-hidden bg-neutral-50/50 p-4 border border-black/10 w-full"
                            >
                              <div className="space-y-5 text-left">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                                  
                                  <div className="bg-[#fffdfb] border-[2px] border-black p-4 space-y-1.5">
                                    <span className="font-mono text-[9px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1">
                                      <Scale className="w-4 h-4 text-[#ff5f1f]" />
                                      SOVEREIGN CHARTERS
                                    </span>
                                    <p className="font-mono text-[11px] font-black text-gray-800 uppercase leading-snug">
                                      <GlossaryText text={exch.registeredBody} />
                                    </p>
                                  </div>

                                  <div className="bg-[#fffdfb] border-[2px] border-black p-4 space-y-1.5">
                                    <span className="font-mono text-[9px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1">
                                      <Lock className="w-4 h-4 text-[#0040e0]" />
                                      KEY LOCK SYSTEMS
                                    </span>
                                    <p className="font-mono text-[11px] font-black text-gray-800 uppercase leading-snug">
                                      <GlossaryText text={exch.mfaLevel} />
                                    </p>
                                  </div>

                                  <div className="bg-[#fffdfb] border-[2px] border-black p-4 space-y-1.5">
                                    <span className="font-mono text-[9px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1">
                                      <Database className="w-4 h-4 text-emerald-600" />
                                      RESERVE CUSTODY
                                    </span>
                                    <div className="flex items-center gap-1.5 text-[11px] font-mono font-black text-gray-800">
                                      {exch.hasProofOfReserves ? (
                                        <>
                                          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                                          <span>VERIFIED <GlossaryText text="Proof of Reserves" /></span>
                                        </>
                                      ) : (
                                        <>
                                          <XCircle className="w-4 h-4 text-red-655 shrink-0" />
                                          <span>UNREGISTERED WALLET AUDIT</span>
                                        </>
                                      )}
                                    </div>
                                    <div className="text-[9px] text-gray-500 leading-tight block mt-1 font-bold font-mono">
                                      {exch.custodyMethod}
                                    </div>
                                  </div>

                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                                  <div className="bg-[#f1fdf9] border-2 border-black p-4 space-y-2">
                                    <span className="font-mono text-[9.5px] font-black text-[#136327] uppercase tracking-widest block border-b border-[#136327]/20 pb-1">
                                      ✓ SECURED PARAMETERS
                                    </span>
                                    <ul className="space-y-1.5 font-mono text-[10.5px] text-gray-700 leading-normal">
                                      {exch.pros.map((p, i) => (
                                        <li key={i} className="flex gap-1 items-start">
                                          <span className="font-black text-emerald-700 shrink-0 select-none">•</span>
                                          <span><GlossaryText text={p} /></span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>

                                  <div className="bg-[#fff2ed] border-2 border-black p-4 space-y-2">
                                    <span className="font-mono text-[9.5px] font-black text-[#ab3600] uppercase tracking-widest block border-b border-[#ab3600]/20 pb-1">
                                      ⚠️ CUSTODIAL HAZARDS LOG
                                    </span>
                                    <ul className="space-y-1.5 font-mono text-[10.5px] text-gray-700 leading-normal">
                                      {exch.cons.map((c, i) => (
                                        <li key={i} className="flex gap-1 items-start">
                                          <span className="font-black text-amber-700 shrink-0 select-none">•</span>
                                          <span><GlossaryText text={c} /></span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Link Verification footer bar */}
                        <div className="border-t border-black/10 pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 text-xs font-mono">
                          <div className="flex flex-wrap gap-1.5 items-center">
                            <span className="text-gray-400 font-black uppercase text-[9px] tracking-wider">OFFICIAL REPOSITORIES:</span>
                            {exch.knownDomains.map((dom, i) => (
                              <span key={i} className="bg-neutral-100 border border-neutral-300 text-gray-700 font-extrabold px-2 py-0.5 text-[9.5px]">
                                {dom}
                              </span>
                            ))}
                          </div>

                          <a 
                            href={exch.officialUrl}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1.5 font-black bg-black text-white px-5 py-2.5 border-heavy hover:bg-[#ab3600] hover:text-white cursor-pointer transition-colors text-[10.5px] uppercase tracking-wider"
                          >
                            VISIT OFFICIAL PORT
                            <ArrowRight className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    ) : (
                      /* --- GRID FORMAT: compact structural card for multiple grid dimensions --- */
                      <div className="flex flex-col h-full justify-between gap-5 text-left w-full">
                        <div>
                          {/* Segment header */}
                          <div className="flex items-start justify-between gap-3 pb-3 border-b-2 border-black/10">
                            <div className="flex gap-3 items-center">
                              <div className={`w-12 h-12 flex items-center justify-center font-sora font-black text-lg border-heavy neo-shadow-sm shrink-0 ${exch.logoColorClass}`}>
                                {exch.name.split(' ').map(w => w[0]).join('').substring(0,2)}
                              </div>
                              <div className="text-left">
                                <span className={`border-[1.5px] text-[8.5px] font-mono font-black px-1.5 py-0.2 uppercase tracking-wide block w-fit ${getRiskStyles(exch.riskCategory)}`}>
                                  {exch.riskCategory.replace("SECURED ", "").replace("PREMIUM", "")}
                                </span>
                                <h3 className="font-sora text-base md:text-lg font-extrabold text-[#111] uppercase leading-tight tracking-tight mt-0.5">
                                  {exch.name}
                                </h3>
                              </div>
                            </div>

                            {/* Circular meter replacement badge */}
                            <div className="bg-[#fcfdfa] border-2 border-black px-2.5 py-1 text-center shrink-0 flex flex-col items-center justify-center relative min-w-[75px]">
                              <span className="font-mono text-[7.5px] text-gray-400 font-black uppercase tracking-wider">
                                CA HEALTH
                              </span>
                              <span className="font-mono text-sm md:text-md font-black text-emerald-700 leading-none">
                                {exch.securityScore}%
                              </span>
                            </div>
                          </div>

                          <div className="mt-4 space-y-3">
                            <div className="flex items-center justify-between text-[10px] font-mono text-gray-500">
                              <span className="uppercase tracking-widest font-black flex items-center gap-1">
                                <Globe className="w-3 h-3 text-blue-500" />
                                {exch.regions[0].substring(0, 16)}
                              </span>
                              <span className="font-semibold bg-neutral-100 border border-neutral-300 px-1 py-0.2 text-[8.5px]">
                                {exch.knownDomains[0]}
                              </span>
                            </div>

                            <div className="font-sans text-xs leading-relaxed text-gray-700 font-medium">
                              <GlossaryText text={exch.description} />
                            </div>

                            <div className="flex flex-wrap gap-1.5 pt-1">
                              <span className="bg-neutral-50 text-gray-800 border-2 border-black font-mono text-[8.5px] font-bold px-2 py-0.5 uppercase tracking-wide inline-flex items-center gap-1">
                                <Coins className="w-3.5 h-3.5 text-yellow-600" />
                                {exch.fiatChannels.slice(0, 2).join(' / ')}
                              </span>
                              <span className="bg-[#efefff] text-[#0040e0] border-2 border-[#0040e0]/20 font-mono text-[8.5px] font-black px-2 py-0.5 uppercase tracking-wide inline-flex items-center gap-1">
                                <Lock className="w-3.5 h-3.5" />
                                {exch.mfaLevel.split('(')[0].trim().substring(0, 15)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Footer and specifications Collapse trigger buttons */}
                        <div className="space-y-2.5 mt-auto pt-2">
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={() => toggleExpand(exch.id)}
                              className="py-2.5 px-1 bg-neutral-50 border-2 border-black hover:bg-neutral-100 flex items-center justify-center text-[9px] font-mono font-black uppercase transition-all tracking-wider cursor-pointer"
                            >
                              <SlidersHorizontal className="w-3 h-3 mr-1 text-[#ff5f1f]" />
                              {isExpanded ? "CLOSE AUDIT" : "VIEW AUDIT"}
                            </button>

                            <a 
                              href={exch.officialUrl}
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="py-2.5 px-1 bg-black hover:bg-[#ab3600] text-white hover:text-white border-heavy flex items-center justify-center text-[9px] font-mono font-black uppercase transition-all tracking-wider cursor-pointer"
                            >
                              VISIT PORT
                              <ArrowRight className="w-3 h-3 ml-1" />
                            </a>
                          </div>

                          <AnimatePresence initial={false}>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2, ease: "easeInOut" }}
                                className="overflow-hidden bg-neutral-50/50 p-3 border border-black/10 text-left space-y-4"
                              >
                                <div className="space-y-3.5 text-left">
                                  <div className="space-y-1 border-b border-black/5 pb-2">
                                    <span className="font-mono text-[8px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1">
                                      <Scale className="w-3.5 h-3.5 text-[#ff5f1f]" />
                                      SOVEREIGN CHARTERS
                                    </span>
                                    <p className="font-mono text-[10px] font-black text-gray-800 uppercase leading-none">
                                      <GlossaryText text={exch.registeredBody} />
                                    </p>
                                  </div>

                                  <div className="space-y-1 border-b border-black/5 pb-2">
                                    <span className="font-mono text-[8px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1">
                                      <Database className="w-3.5 h-3.5 text-emerald-600" />
                                      RESERVE STATUS
                                    </span>
                                    <div className="flex items-center gap-1 text-[10px] font-mono font-black text-gray-800">
                                      {exch.hasProofOfReserves ? (
                                        <span className="text-emerald-700">VERIFIED RESERVES ATTESTED</span>
                                      ) : (
                                        <span className="text-red-655">UNATTESTED AUDITING DECK</span>
                                      )}
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-1 gap-2">
                                    <div className="bg-[#f1fdf9] border border-black/20 p-2 space-y-1 text-left text-[9px]">
                                      <span className="font-mono font-black text-[#136327] uppercase tracking-wide block">
                                        ✓ SECURED HIGHLIGHT
                                      </span>
                                      <ul className="space-y-0.5 font-mono text-gray-600 leading-tight">
                                        {exch.pros.slice(0, 2).map((p, i) => (
                                          <li key={i} className="truncate">• <GlossaryText text={p} /></li>
                                        ))}
                                      </ul>
                                    </div>

                                    <div className="bg-[#fff2ed] border border-black/20 p-2 space-y-1 text-left text-[9px]">
                                      <span className="font-mono font-black text-[#ab3600] uppercase tracking-wide block">
                                        ⚠️ HAZARD LOG
                                      </span>
                                      <ul className="space-y-0.5 font-mono text-gray-600 leading-tight">
                                        {exch.cons.slice(0, 2).map((c, i) => (
                                          <li key={i} className="truncate">• <GlossaryText text={c} /></li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    )}

                  </motion.div>
                );
              })}
            </AnimatePresence>

            {filteredExchanges.length === 0 && (
              <div className="bg-white border-heavy p-12 text-center font-mono text-xs text-gray-400">
                ⚠️ Search key returned zero exchanges registered in the active directory schema.
              </div>
            )}
          </div>
        </div>

        {/* Custodial safety toolbox container with decorative header */}
        <div className="mt-12 pt-8 border-t-4 border-black border-dashed space-y-6 text-left">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-black pb-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 bg-neutral-900 text-white font-mono text-[9px] font-black uppercase tracking-widest px-2.5 py-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#ff5f1f]" />
                OFFICIAL THREAT REDUCTION DECK
              </div>
              <h3 className="font-sora text-2xl font-black text-gray-950 uppercase leading-none">
                CSG CUSTODE SAFETY TOOLBOX
              </h3>
            </div>
            <p className="font-sans text-xs text-gray-500 font-bold max-w-xl md:text-right">
              Utilize independent domain analysis, instant multi-factor scoring calculators, and comparative frameworks to prevent phishing and unauthorized custodial exposure.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Tool 1: Domain Authenticity Shield */}
            <div className="bg-white border-heavy p-6 space-y-4 neo-shadow-sm text-left flex flex-col justify-between">
            <span className="bg-[#eef3ff] border border-[#0040e0] text-[#0040e0] font-mono text-[9px] font-black px-2 py-0.5 uppercase tracking-wide">
              SCAM DEFENSE PORT
            </span>
            <h4 className="font-sora text-sm font-extrabold uppercase flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#0040e0]" />
              EXCHANGE DOMAIN SHIELD
            </h4>
            <p className="font-mono text-[11px] text-gray-600 leading-normal">
              Most Web3 thefts happen because users click spoofed exchange web addresses in search results. Select the registry and paste your target address to test domain integrity.
            </p>
            <div className="bg-[#fff9e6] border border-amber-300 p-2.5 font-mono text-[9px] text-[#ab3600] leading-normal space-y-1">
              <strong>⚠️ OFFLINE REGISTRY CHECK LIMITS:</strong>
              <p>This matches host names against trusted domain lists offline. In real scenarios, malicious actors deploy sophisticated <strong>Unicode Homoglyph Spoofing</strong> (letters from Latin and Cyrillic that look identical on screen) or hijack local DNS records. Protect yourself using bookmarks, secure trusted directories, or secure browser guards (like <em>Brave Shield</em> or <em>Pocket Universe</em>) to inspect deep certificate fingerprints.</p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="space-y-1">
                <label className="block font-mono text-[9px] font-black text-gray-400 uppercase">
                  Target Registry Profile
                </label>
                <select
                  value={targetExchangeId}
                  onChange={(e) => {
                    setTargetExchangeId(e.target.value);
                    setDomainCheckResult({ status: 'IDLE', message: '', score: 100, issues: [] });
                  }}
                  className="w-full p-2 border-heavy bg-white font-mono text-xs focus:outline-none"
                >
                  {EXCHANGES_DB.map(e => (
                    <option key={e.id} value={e.id}>{e.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-[9px] font-black text-gray-400 uppercase">
                  Paste Active Host URL Excerpt
                </label>
                <input
                  type="text"
                  value={inputUrl}
                  onChange={(e) => {
                    setInputUrl(e.target.value);
                    setDomainCheckResult({ status: 'IDLE', message: '', score: 100, issues: [] });
                  }}
                  placeholder="https://coinbase-bonus-claim.xyz/"
                  className="w-full p-2 border-heavy bg-white font-mono text-xs focus:outline-none"
                />
              </div>

              <button
                onClick={verifyHostDom}
                className="w-full bg-[#0040e0] text-white p-2.5 border-heavy hover:bg-[#003da5] font-mono text-xs font-black uppercase transition-colors cursor-pointer"
              >
                RUN FOOTPRINT MATCH SCAN
              </button>
            </div>

            {/* Verification result card */}
            {domainCheckResult.status !== 'IDLE' && (
              <div className={`p-4 border-[2px] space-y-3 mt-4 ${
                domainCheckResult.status === 'PASS' 
                  ? 'bg-[#f0fcf9] border-emerald-600' 
                  : 'bg-[#fff0ea] border-[#ab3600]'
              }`}>
                <div className="flex items-center justify-between">
                  <span className={`font-mono text-[10px] font-black uppercase tracking-widest ${
                    domainCheckResult.status === 'PASS' ? 'text-emerald-700' : 'text-[#ab3600]'
                  }`}>
                    {domainCheckResult.status === 'PASS' ? '✅ GENUINE DOMAIN MATCH' : '⚠️ HIGH CORRELATION HAZARD'}
                  </span>
                  <span className="font-mono text-xs font-black">
                    SCORE: {domainCheckResult.score}/100
                  </span>
                </div>
                <p className="font-mono text-[11px] font-bold leading-normal text-gray-800">
                  {domainCheckResult.message}
                </p>

                {domainCheckResult.issues.length > 0 && (
                  <div className="space-y-1 pt-1.5 border-t border-black/10">
                    <span className="font-mono text-[8.5px] font-black text-gray-400 uppercase">DETECTION LOGS:</span>
                    <ul className="space-y-1 font-mono text-[10px] text-gray-700 list-disc pl-4 leading-normal">
                      {domainCheckResult.issues.map((issue, idx) => (
                        <li key={idx}>{issue}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Tool 2: Side-By-Side Comparison Engine */}
          <div className="bg-white border-heavy p-6 space-y-4 neo-shadow-sm flex flex-col justify-between">
            <span className="bg-purple-50 border border-purple-200 text-purple-800 font-mono text-[9px] font-black px-2 py-0.5 uppercase tracking-wide">
              COMPARATIVE GRID
            </span>
            <h4 className="font-sora text-sm font-extrabold uppercase flex items-center gap-2">
              <Compass className="w-5 h-5 text-purple-600" />
              COMPARE ACCOUNT SAFEGUARDS
            </h4>
            <p className="font-mono text-[11px] text-gray-600 leading-normal">
              Directly cross-analyze key security paradigms between and contrast security scores side by side.
            </p>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <div className="space-y-1">
                <label className="block font-mono text-[8.5px] font-black text-gray-450 uppercase">Exchange A</label>
                <select
                  value={compareAId}
                  onChange={(e) => setCompareAId(e.target.value)}
                  className="w-full p-2 border-heavy bg-white font-mono text-xs focus:outline-none"
                >
                  {EXCHANGES_DB.map(e => (
                    <option key={e.id} value={e.id}>{e.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-[8.5px] font-black text-gray-450 uppercase">Exchange B</label>
                <select
                  value={compareBId}
                  onChange={(e) => setCompareBId(e.target.value)}
                  className="w-full p-2 border-heavy bg-white font-mono text-xs focus:outline-none"
                >
                  {EXCHANGES_DB.map(e => (
                    <option key={e.id} value={e.id}>{e.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Comparison specs grid lists */}
            <div className="border border-black bg-gray-50 text-[10.5px] font-mono mt-4 overflow-hidden">
              <div className="grid grid-cols-2 border-b border-black text-center font-black">
                <div className="border-r border-black p-2 bg-gray-150">{exchangeA.name}</div>
                <div className="p-2 bg-gray-150">{exchangeB.name}</div>
              </div>

              {/* Row 1 */}
              <div className="grid grid-cols-2 border-b border-black/10">
                <div className="border-r border-black/10 p-2.5">
                  <div className="text-[8.5px] text-gray-400 uppercase">HEALTH RATING</div>
                  <div className="text-sm font-black text-[#006e16]">{exchangeA.securityScore}%</div>
                </div>
                <div className="p-2.5">
                  <div className="text-[8.5px] text-gray-400 uppercase">HEALTH RATING</div>
                  <div className="text-sm font-black text-[#006e16]">{exchangeB.securityScore}%</div>
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-2 border-b border-black/10">
                <div className="border-r border-black/10 p-2.5">
                  <div className="text-[8.5px] text-gray-400 uppercase">RESERVES AUDIT</div>
                  <div className="font-bold">{exchangeA.hasProofOfReserves ? '✅ VALIDATED PoR' : '❌ NO ACTIVE PoR'}</div>
                </div>
                <div className="p-2.5">
                  <div className="text-[8.5px] text-gray-400 uppercase">RESERVES AUDIT</div>
                  <div className="font-bold">{exchangeB.hasProofOfReserves ? '✅ VALIDATED PoR' : '❌ NO ACTIVE PoR'}</div>
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-2 border-b border-black/10">
                <div className="border-r border-black/10 p-2.5">
                  <div className="text-[8.5px] text-gray-400 uppercase">MFA ACCESS SYSTEM</div>
                  <div className="font-bold leading-tight">{exchangeA.mfaLevel}</div>
                </div>
                <div className="p-2.5">
                  <div className="text-[8.5px] text-gray-400 uppercase">MFA ACCESS SYSTEM</div>
                  <div className="font-bold leading-tight">{exchangeB.mfaLevel}</div>
                </div>
              </div>

              {/* Row 4 */}
              <div className="grid grid-cols-2">
                <div className="border-r border-black/10 p-2.5">
                  <div className="text-[8.5px] text-gray-400 uppercase">RECOGNIZED CHARTERS</div>
                  <div className="font-bold leading-snug">{exchangeA.riskCategory}</div>
                </div>
                <div className="p-2.5">
                  <div className="text-[8.5px] text-gray-400 uppercase">RECOGNIZED CHARTERS</div>
                  <div className="font-bold leading-snug">{exchangeB.riskCategory}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tool 3: Dynamic Custody Safety Calculator */}
          <div className="bg-white border-heavy p-6 space-y-4 neo-shadow-sm flex flex-col justify-between">
            <span className="bg-amber-50 border border-amber-200 text-amber-800 font-mono text-[9px] font-black px-2 py-0.5 uppercase tracking-wide">
              ALGORITHM CALCULATOR
            </span>
            <h4 className="font-sora text-sm font-extrabold uppercase flex items-center gap-2">
              <Calculator className="w-5 h-5 text-amber-700" />
              DYNAMIC SAFETY CALCULATOR
            </h4>
            <p className="font-mono text-[11px] text-gray-600 leading-normal">
              Not sure about an unlisted exchange? Use this calculator to inspect the credentials they claim to evaluate their secure tier ranking dynamically.
            </p>

            <div className="space-y-2.5 pt-2">
              <label className="flex items-start gap-2.5 p-2 bg-gray-50 border border-black/10 cursor-pointer hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  checked={calcAudit}
                  onChange={(e) => setCalcAudit(e.target.checked)}
                  className="mt-1 accent-black"
                />
                <span className="font-mono text-[10.5px] leading-tight text-gray-700">
                  **Cryptographical Proof of Reserves:** Publishes verifiable merkle trees of user assets (+25)
                </span>
              </label>

              <label className="flex items-start gap-2.5 p-2 bg-gray-50 border border-black/10 cursor-pointer hover:bg-gray-150 transition-colors">
                <input
                  type="checkbox"
                  checked={calcMfa}
                  onChange={(e) => setCalcMfa(e.target.checked)}
                  className="mt-1 accent-black"
                />
                <span className="font-mono text-[10.5px] leading-tight text-gray-700">
                  **Hardware Multi-Factor Key:** Supports physical Yubikeys or sterile FIDO2 codes (+20)
                </span>
              </label>

              <label className="flex items-start gap-2.5 p-2 bg-gray-50 border border-black/10 cursor-pointer hover:bg-gray-150 transition-colors">
                <input
                  type="checkbox"
                  checked={calcRegulated}
                  onChange={(e) => setCalcRegulated(e.target.checked)}
                  className="mt-1 accent-black"
                />
                <span className="font-mono text-[10.5px] leading-tight text-gray-700">
                  **Sovereign Compliance Board:** Holds structural licenses in high-oversight nations (e.g. FCA/SEC) (+25)
                </span>
              </label>

              <label className="flex items-start gap-2.5 p-2 bg-gray-50 border border-black/10 cursor-pointer hover:bg-gray-150 transition-colors">
                <input
                  type="checkbox"
                  checked={calcDepositInsurance}
                  onChange={(e) => setCalcDepositInsurance(e.target.checked)}
                  className="mt-1 accent-black"
                />
                <span className="font-mono text-[10.5px] leading-tight text-gray-700">
                  **Fiduciary Insurance Pools:** Co-backed by FDIC cash standards or dedicated escrow values (+15)
                </span>
              </label>

              <label className="flex items-start gap-2.5 p-2 bg-gray-50 border border-black/10 cursor-pointer hover:bg-gray-150 transition-colors">
                <input
                  type="checkbox"
                  checked={calcOpenSource}
                  onChange={(e) => setCalcOpenSource(e.target.checked)}
                  className="mt-1 accent-black"
                />
                <span className="font-mono text-[10.5px] leading-tight text-gray-700">
                  **Open Source Architecture:** Wallet codebases can be inspected directly on public github servers (+5)
                </span>
              </label>
            </div>

            {/* Score gauge */}
            <div className="border border-black p-4 bg-black text-white text-center space-y-1.5 mt-4">
              <span className="font-mono text-[9px] text-[#72ff70] font-black uppercase tracking-widest">
                ESTIMATED CUSTODY FITNESS SCORE
              </span>
              <div className="font-mono text-3xl font-black text-[#72ff70]">
                {calcScoreResult}%
              </div>
              <div className="font-mono text-[10px] leading-normal font-bold">
                {calcScoreResult >= 80 ? (
                  <span className="text-[#72ff70] uppercase">🟢 TIER-1 SYSTEM SECURE REGIME</span>
                ) : calcScoreResult >= 50 ? (
                  <span className="text-orange-400 uppercase">🟡 SECURE PROTOCOL OUTPOST DECK</span>
                ) : (
                  <span className="text-red-500 uppercase">🔴 CRITICAL STORAGE RISK EXPOSURES</span>
                )}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
