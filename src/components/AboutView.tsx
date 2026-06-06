import React, { useState } from 'react';
import { GlossaryText } from './GlossarySystem';
import { ReportInaccuracyButton } from './InaccuracyFeedbackModal';
import { useLanguage } from '../utils/LanguageContext';
import { 
  Shield, 
  Target, 
  Users, 
  MapPin, 
  Tv, 
  Flag, 
  Award, 
  CheckCircle, 
  Flame, 
  Database,
  Calendar,
  Layers,
  Sparkles,
  ArrowRight,
  Calculator,
  Compass,
  Zap,
  Check,
  Percent
} from 'lucide-react';

// Live controllers registry inside CSG
const MANIFESTO_VALS = [
  {
    icon: <Target className="w-5 h-5 text-[#ab3600]" />,
    title: "100% Unbiased Vetting",
    description: "We collect zero referral commissions from cryptocurrency exchanges or wallet brands. Our reviews are based strictly on automated security scorecards and technical forensic checks."
  },
  {
    icon: <Shield className="w-5 h-5 text-[#0040e0]" />,
    title: "Offline-First Safety",
    description: "We strongly champion cold, internet-isolated physical custody formats. Self-custody is meaningless without double-checked hardware ledger coordinates."
  },
  {
    icon: <Flame className="w-5 h-5 text-[#047857]" />,
    title: "Active Threat Deconstruction",
    description: "We process real on-chain phishing hashes, counterfeits, and address poisoning telemetry instantly to update local and regional registries daily."
  },
  {
    icon: <Database className="w-5 h-5 text-purple-700" />,
    title: "Zero Analytics Tracking",
    description: "Your IP address, search queries, and calculator metrics are strictly processed client-side. We maintain no remote databases or backend traffic trackers."
  }
];

const MANIFESTO_VALS_ES = [
  {
    icon: <Target className="w-5 h-5 text-[#ab3600]" />,
    title: "Auditoría 100% Imparcial",
    description: "No cobramos comisiones de referencia de casas de cambio de criptomonedas o marcas de billeteras. Nuestras revisiones se basan estrictamente en cuadros de mando de seguridad automatizados y verificaciones técnicas forenses."
  },
  {
    icon: <Shield className="w-5 h-5 text-[#0040e0]" />,
    title: "Seguridad Primero Sin Conexión",
    description: "Defendemos firmemente los formatos de custodia física fría y aislada de Internet. La autocustodia no tiene sentido sin coordenadas de libro de contabilidad de hardware de doble verificación."
  },
  {
    icon: <Flame className="w-5 h-5 text-[#047857]" />,
    title: "Deconstrucción de Amenazas Activas",
    description: "Procesamos hashes de phishing, falsificaciones y telemetría de envenenamiento de direcciones reales en cadena de inmediato para actualizar los registros locales y regionales diariamente."
  },
  {
    icon: <Database className="w-5 h-5 text-purple-700" />,
    title: "Cero Seguimiento de Analíticas",
    description: "Su dirección IP, consultas de búsqueda y métricas de calculadora se procesan estrictamente de forma local en su navegador. No mantenemos bases de datos remotas ni rastreadores de tráfico backend."
  }
];

const MILESTONES = [
  {
    year: "2026",
    title: "Founding & Cold Standards",
    tag: "LAUNCH",
    tagColor: "bg-[#eef3ff] text-[#0040e0] border-[#0040e0]",
    description: "CSG was established by a collective of four protocol security analysts. Launched the original Cold Storage 10-Step Roadmap to standardize basic self-custody principles for retail handlers.",
    statLabel: "INITIAL REUSE REGISTRY INDEX",
    statValue: "140+ Assets Documented"
  },
  {
    year: "2027",
    title: "Regional P2P Corridor Map",
    tag: "FORENSICS",
    tagColor: "bg-[#fff0ea] text-[#ab3600] border-[#ab3600]",
    description: "Introduced Naira bank-corridor trade guidelines and the Interactive Nigerian P2P Escrow Shield matrix after detecting a 300% surge in frozen accounts related to parallel markets.",
    statLabel: "ACTIVE COOPERATIVE NODES",
    statValue: "Sub-Saharan Coverage"
  },
  {
    year: "2028",
    title: "Sovereign Ledger Consensus",
    tag: "GLOBAL RATING",
    tagColor: "bg-[#ecfdf5] text-[#047857] border-[#047857]",
    description: "Released the first completely independent Global Custody Safety Ratings database. Replaced old static review feeds with a fully dynamic compliance checklist system.",
    statLabel: "VERIFIED SECURE PLATFORMS",
    statValue: "70+ Vetted Tools"
  }
];

const MILESTONES_ES = [
  {
    year: "2026",
    title: "Fundación y Estándares Fríos",
    tag: "LANZAMIENTO",
    tagColor: "bg-[#eef3ff] text-[#0040e0] border-[#0040e0]",
    description: "CSG fue fundado por un colectivo de cuatro analistas de seguridad de protocolos. Lanzamos la Guía de Autocustodia de 10 Pasos para estandarizar los principios básicos de autocustodia para los usuarios minoristas.",
    statLabel: "ÍNDICE INICIAL DE REGISTRO DE REUTILIZACIÓN",
    statValue: "Más de 140 activos documentados"
  },
  {
    year: "2027",
    title: "Mapa del Corredor Regional P2P",
    tag: "FORENSE",
    tagColor: "bg-[#fff0ea] text-[#ab3600] border-[#ab3600]",
    description: "Presentamos pautas para transacciones de corredores bancarios de Naira y la matriz interactiva P2P Escrow Shield tras detectar un aumento del 300% en cuentas bancarias congeladas por mercados paralelos.",
    statLabel: "NODOS COOPERATIVOS ACTIVOS",
    statValue: "Cobertura de África Subsahariana"
  },
  {
    year: "2028",
    title: "Consenso de Ledger Soberano",
    tag: "RATING GLOBAL",
    tagColor: "bg-[#ecfdf5] text-[#047857] border-[#047857]",
    description: "Publicamos la primera base de datos completamente independiente de Calificaciones de Seguridad de Custodia Global. Reemplazamos los comentarios estáticos de revisión por un sistema dinámico de verificación de cumplimiento.",
    statLabel: "PLATAFORMAS VERIFICADAS SEGURAS",
    statValue: "Más de 70 herramientas auditadas"
  }
];

const MEMBER_BIOS = [
  {
    id: "elena",
    name: "Elena Vance",
    role: "Chief Cyber Security Analyst",
    focus: "EVM Exploit Forensics",
    initials: "EV",
    bio: "Ex-protocol vulnerability auditor specializing in EVM smart contract threat architectures, ice phishing defense, and cold hardware signature configurations.",
    avatarBg: "bg-blue-900 border-blue-500 text-blue-10%"
  },
  {
    id: "marcus",
    name: "Marcus Kross",
    role: "AML Compliance Advisor",
    focus: "VASP & MiCA Legislation",
    initials: "MK",
    bio: "Global risk counselor focused on legislative fiat corridors, money mule identification signatures, and European Union Virtual Asset provider licensing.",
    avatarBg: "bg-[#ab3600] border-orange-500 text-orange-10%"
  },
  {
    id: "dele",
    name: "Dele Akintola",
    role: "Sub-Saharan Markets Lead",
    focus: "P2P Banking Security",
    initials: "DA",
    bio: "P2P risk architect documenting Naira banking escrow blocks, parallel markets trading compliance parameters, and regional peer verification maps.",
    avatarBg: "bg-emerald-950 border-emerald-500 text-emerald-10%"
  },
  {
    id: "jan",
    name: "Jan Weber",
    role: "European Regulations Counsel",
    focus: "Self-Custody Law Checks",
    initials: "JW",
    bio: "Specialist on global taxation compliance, centralized asset tracking guidelines, and legal frameworks protecting decentralized self-custody.",
    avatarBg: "bg-purple-950 border-purple-500 text-purple-10%"
  }
];

const MEMBER_BIOS_ES = [
  {
    id: "elena",
    name: "Elena Vance",
    role: "Analista Jefa de Ciberseguridad",
    focus: "Métricas de Vulnerabilidad EVM",
    initials: "EV",
    bio: "Exauditora de vulnerabilidad de protocolos especializada en arquitecturas de amenazas de contratos inteligentes EVM, defensa de phishing de hielo y configuraciones de firma de hardware frío.",
    avatarBg: "bg-blue-900 border-blue-500 text-blue-10%"
  },
  {
    id: "marcus",
    name: "Marcus Kross",
    role: "Asesor de Cumplimiento AML",
    focus: "Legislación VASP y MiCA",
    initials: "MK",
    bio: "Asesor de riesgos globales centrado en corredores legislativos fiduciarios, firmas de identificación de mulas de dinero y licencias de proveedores de activos virtuales de la Unión Europea.",
    avatarBg: "bg-[#ab3600] border-orange-500 text-orange-10%"
  },
  {
    id: "dele",
    name: "Dele Akintola",
    role: "Líder de Mercados Subsaharianos",
    focus: "Seguridad Bancaria P2P",
    initials: "DA",
    bio: "Arquitecto de riesgos P2P que documenta bloqueos de depósito bancario de Naira, parámetros de cumplimiento comercial de mercados paralelos y mapas de verificación regional entre pares.",
    avatarBg: "bg-emerald-950 border-emerald-500 text-emerald-10%"
  },
  {
    id: "jan",
    name: "Jan Weber",
    role: "Asesor Legal de Regulaciones Europeas",
    focus: "Leyes de Autocustodia",
    initials: "JW",
    bio: "Especialista en cumplimiento tributario global, pautas de seguimiento de activos centralizados y marcos legales que protegen la autocustodia descentralizada.",
    avatarBg: "bg-purple-950 border-purple-500 text-purple-10%"
  }
];

export const AboutView: React.FC = () => {
  const { language } = useLanguage();
  
  const activeManifesto = language === 'es' ? MANIFESTO_VALS_ES : MANIFESTO_VALS;
  const activeMilestones = language === 'es' ? MILESTONES_ES : MILESTONES;
  const activeBios = language === 'es' ? MEMBER_BIOS_ES : MEMBER_BIOS;

  const [activeMilestone, setActiveMilestone] = useState<number>(0);
  const [selectedPersonnel, setSelectedPersonnel] = useState<string>("elena");
  
  // Custom interactive simulation panel to test "CSG Independence Core Performance Rating"
  const [calcExchangeSponsorship, setCalcExchangeSponsorship] = useState<number>(0);
  const [calcAdClicks, setCalcAdClicks] = useState<number>(0);
  
  // Integrity parameters
  const calculatedIntegrityScore = Math.max(0, 100 - (calcExchangeSponsorship > 0 ? 55 : 0) - (calcAdClicks > 2000 ? 25 : Math.round(calcAdClicks / 100)));

  return (
    <div className="py-8 px-4 md:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Title Header Section */}
      <div className="bg-[#fffdf2] border-heavy border-l-[8px] border-l-[#ab3600] p-6 md:p-8 space-y-3 neo-shadow-sm text-left">
        <div className="inline-flex items-center gap-1.5 bg-white border border-[#ab3600] px-2.5 py-1 font-mono text-[9px] font-bold text-[#ab3600] uppercase">
          <Compass className="w-3.5 h-3.5" />
          CSG GUILD CHARTER
        </div>
        <h2 className="font-sora text-3xl md:text-5xl font-black text-gray-950 uppercase tracking-tighter leading-none">
          ABOUT CRYPTO SAFETY GLOBAL
        </h2>
        <div className="font-sans text-sm md:text-base text-gray-700 max-w-3xl leading-relaxed font-medium">
          <GlossaryText text="Crypto Safety Global is an independent, non-governmental public security advocacy collective specializing in cryptographic auditing. Established in 2026, we maintain a client-side database of threat vectors, sovereign guides, and exchange compliance ratings to protect sovereign retail players." />
        </div>
      </div>

      {/* Grid: Split Manifesto and Interactive Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
        
        {/* Left Manifesto Section */}
        <div className="lg:col-span-7 border-heavy bg-white p-6 neo-shadow text-left space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-black font-extrabold uppercase">
              <span className="bg-[#ab3600] text-white px-2 py-0.5 font-mono text-[8.5px] font-black uppercase tracking-wider">
                {language === 'es' ? 'MANIFIESTO CENTRAL' : 'CORE MANIFESTO'}
              </span>
              <span className="font-mono text-[9px] text-gray-400 font-bold uppercase tracking-wider">
                {language === 'es' ? 'NUESTROS PILARES' : 'OUR PILLARS'}
              </span>
            </div>
            
            <h3 className="font-sora text-xl font-bold uppercase text-gray-950 tracking-tight">
              {language === 'es' ? 'Seguridad sin Concesiones para el Individuo' : 'Uncompromising Security For The Individual'}
            </h3>
            
            <p className="font-mono text-xs text-gray-600 leading-relaxed font-bold">
              {language === 'es' 
                ? 'Operamos estrictamente bajo un marco de educación soberano. Nuestro análisis es independiente de redes de publicidad, campañas promocionales o juntas directivas corporativas.'
                : 'We operate strictly under a sovereign education framework. Our analysis is independent of advertising networks, promotional campaigns, or corporate boards.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {activeManifesto.map((val, idx) => (
              <div key={idx} className="border-2 border-black p-4 space-y-2 bg-[#fdfdfd] neo-shadow-sm">
                <div className="flex items-center gap-1.5 border-b border-black/10 pb-2 mb-2">
                  {val.icon}
                  <h4 className="font-sora text-[11px] font-black text-gray-950 leading-none">
                    {val.title}
                  </h4>
                </div>
                <p className="font-mono text-[9.5px] text-gray-500 leading-tight font-bold">
                  {val.description}
                </p>
              </div>
            ))}
          </div>

          <div className="p-3 bg-[#e2fbeb] border-2 border-brand-tertiary font-mono text-[10px] text-emerald-800 flex items-start gap-2 pt-3">
            <CheckCircle className="w-4 h-4 text-brand-tertiary shrink-0 mt-0.5" />
            <div>
              <span className="font-extrabold uppercase text-gray-900 block">
                {language === 'es' ? 'DECLARACIONES DE INDEPENDENCIA INMUTABLES:' : 'IMMUTABLE INDEPENDENT STATEMENTS:'}
              </span>
              <p className="mt-0.5 text-gray-700 leading-tight">
                {language === 'es'
                  ? 'Cada auditoría de código, ranking de seguridad de plataformas y lista de verificación local es evaluada estrictamente bajo el consenso de Crypto Safety Global.'
                  : 'Every code audit, platform security ranking, and local hardware checklist is evaluated strictly by the CSG Whitehat Security consensus.'}
              </p>
            </div>
          </div>
        </div>

        {/* Right Milestones Interactive Screen */}
        <div className="lg:col-span-5 border-heavy bg-[#f9f9f9] p-6 neo-shadow flex flex-col justify-between space-y-6 text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-charcoal/5 pointer-events-none" />
          
          <div className="space-y-4">
            <div className="flex items-center justify-between text-[#ab3600] font-mono text-[9px] font-black">
              <span className="tracking-widest uppercase">
                {language === 'es' ? '✦ LÍNEA DE TIEMPO INTERACTIVA' : '✦ INTERACTIVE MILESTONE TIMELINE'}
              </span>
              <span className="text-gray-400 font-bold">
                {language === 'es' ? 'SELECCIONE AÑO' : 'SELECT YEAR'}
              </span>
            </div>
            
            <h3 className="font-sora text-sm md:text-base font-black uppercase text-gray-950">
              {language === 'es' ? 'La Cronología Forense de CSG' : 'The Forensic Chronology of CSG'}
            </h3>
          </div>

          {/* Stepper buttons to control active chronology description */}
          <div className="flex gap-2.5 overflow-x-auto pb-2 border-b border-black/10">
            {activeMilestones.map((stone, idx) => (
              <button
                key={stone.year}
                onClick={() => setActiveMilestone(idx)}
                className={`flex-1 border-2 border-black p-2.5 font-mono text-xs font-black transition-all cursor-pointer active-press text-center ${
                  activeMilestone === idx 
                    ? 'bg-black text-[#72ff70] shadow-[2px_2px_0px_rgba(0,0,0,1)]' 
                    : 'bg-white text-gray-700 hover:bg-neutral-50'
                }`}
                title={language === 'es' ? `Ver hito de ${stone.year}` : `View milestone of ${stone.year}`}
                id={`milestone-btn-${stone.year}`}
              >
                {stone.year}
              </button>
            ))}
          </div>

          {/* Interactive view container */}
          <div className="bg-white border-2 border-black p-4 space-y-4">
            <div className="flex justify-between items-center bg-[#faf9f6] border border-black/15 p-1.5 px-2.5">
              <span className="font-mono text-xs font-black text-gray-900 leading-none">
                {language === 'es' 
                  ? `HISTORIA DEL AÑO ${activeMilestones[activeMilestone].year}` 
                  : `YEAR ${activeMilestones[activeMilestone].year} HISTORY`}
              </span>
              <span className={`px-2 py-0.5 border font-mono text-[7.5px] font-black uppercase leading-none ${activeMilestones[activeMilestone].tagColor}`}>
                {activeMilestones[activeMilestone].tag}
              </span>
            </div>

            <h4 className="font-sora text-sm md:text-base font-bold text-gray-950 leading-tight">
              {activeMilestones[activeMilestone].title}
            </h4>

            <p className="font-mono text-[11px] text-gray-600 leading-relaxed font-bold">
              {activeMilestones[activeMilestone].description}
            </p>

            <div className="border-t border-dashed border-gray-300 pt-3 flex justify-between items-center text-[9px] font-mono">
              <span className="text-gray-400 uppercase font-bold">{activeMilestones[activeMilestone].statLabel}:</span>
              <span className="font-black text-[#ab3600]">{activeMilestones[activeMilestone].statValue}</span>
            </div>
          </div>

          <div className="bg-black text-[white] p-3 text-center border-2 border-black pointer-events-none font-mono text-[8.5px] font-black uppercase tracking-wider select-none">
            {language === 'es' ? 'Autoridad de Consenso: Registros Verificados de Sombrero Blanco' : 'Consensus Authority: Verified Whitehat Protocol Logs'}
          </div>
        </div>

      </div>

      {/* INTERACTIVE COMPLIANCE STABILITY AUDIT CALCULATOR (PREVENTS SPONSOR BIAS) */}
      <div className="border-heavy bg-[#fff0ea] p-6 md:p-8 neo-shadow space-y-6">
        <div className="border-b-2 border-black pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4 text-left">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1 bg-[#fff0ea] border border-[#ff5f1f] px-2 py-0.5 font-mono text-[8px] md:text-[9px] font-black text-[#ab3600] uppercase">
              <Calculator className="w-3.5 h-3.5" />
              INTEGRITY DIAGNOSTIC LAB
            </div>
            <h3 className="font-sora text-lg md:text-2xl font-black text-gray-950 uppercase tracking-tight">
              ⚖️ The CSG Non-Sponsorship Simulator
            </h3>
            <p className="font-mono text-[11px] text-gray-500 font-bold">
              Test how commercial bias degrades an on-chain repository's public security integrity.
            </p>
          </div>
          <div className="font-mono text-[9px] text-[#ab3600] font-black uppercase tracking-widest bg-white border border-[#ab3600]/30 px-3 py-1.5">
            100% Client-Side Auditing Mode
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start text-left">
          {/* Controls column */}
          <div className="space-y-5 bg-white border-2 border-black p-5">
            <span className="font-mono text-[9px] text-gray-400 font-black tracking-widest block uppercase">SIMULATION MODIFIERS</span>
            
            {/* Rule 1: Exchange Sponsorship volume */}
            <div className="space-y-2">
              <div className="flex justify-between font-mono text-[10.5px]">
                <span className="font-bold text-gray-800">Exchange Affiliate sponsorship deal:</span>
                <span className="font-black text-[#ab3600]">{calcExchangeSponsorship === 1 ? "ACCEPTED ($55,000 / month)" : "DECLINED ($0)"}</span>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setCalcExchangeSponsorship(0)}
                  className={`flex-1 font-mono text-[9.5px] font-black py-2 border-2 border-black transition-all cursor-pointer ${
                    calcExchangeSponsorship === 0 ? "bg-black text-[white]" : "bg-[#faf9f6] text-gray-700 hover:bg-neutral-50"
                  }`}
                  id="calc-sponsor-decline"
                >
                  DECLINE DEALS (CSG DEFAULT)
                </button>
                <button
                  onClick={() => setCalcExchangeSponsorship(1)}
                  className={`flex-1 font-mono text-[9.5px] font-black py-2 border-2 border-black transition-all cursor-pointer ${
                    calcExchangeSponsorship === 1 ? "bg-red-700 text-white" : "bg-[#faf9f6] text-gray-700 hover:bg-neutral-50"
                  }`}
                  id="calc-sponsor-accept"
                >
                  SELL AD SPACE
                </button>
              </div>
              <p className="font-mono text-[9px] text-gray-400 leading-tight">
                *Accepting sponsorship deals force directories to downgrade risks on paying centralized platforms, generating severe scoring bias.
              </p>
            </div>

            {/* Rule 2: Tracking Ads clicks */}
            <div className="space-y-2 pt-2 border-t border-dashed border-gray-200">
              <div className="flex justify-between font-mono text-[10.5px]">
                <span className="font-bold text-gray-800">Target Monthly Tracker cookies & Popup Advertising Clicks:</span>
                <span className="font-black text-[#0040e0]">{calcAdClicks.toLocaleString()} views / month</span>
              </div>
              <input
                type="range"
                min="0"
                max="5000"
                step="250"
                value={calcAdClicks}
                onChange={(e) => setCalcAdClicks(parseInt(e.target.value))}
                className="w-full accent-black cursor-pointer bg-neutral-200 h-2"
                id="calc-ad-range-seeker"
              />
              <div className="flex justify-between font-mono text-[8px] text-gray-400 uppercase font-black">
                <span>0 Tracker Cookies</span>
                <span>2,500 Tracker Cookies</span>
                <span>5,000 Tracker Cookies</span>
              </div>
            </div>
          </div>

          {/* Gauge column */}
          <div className="border-2 border-black bg-white p-5 space-y-5 flex flex-col justify-between h-full">
            <span className="font-mono text-[9px] text-gray-400 font-black tracking-widest block uppercase">COMPUTED AUDITING HEALTH</span>

            <div className="flex flex-col items-center justify-center py-6 border-4 border-black p-4 bg-[#faf9f6]">
              {/* Score Circular dial */}
              <div className="relative w-32 h-32 flex flex-col items-center justify-center border-8 border-[#ab3600] rounded-full bg-white font-mono shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                <span className="text-[9px] text-gray-400 font-extrabold pb-1">INTEGRITY</span>
                <span className="text-3xl font-black leading-none text-gray-900">{calculatedIntegrityScore}%</span>
                <span className="text-[8px] text-emerald-700 font-bold bg-emerald-50 px-1 border border-emerald-500/10 mt-1 leading-none uppercase">
                  {calculatedIntegrityScore > 90 ? "UNBIASED" : calculatedIntegrityScore > 60 ? "MODERATE" : "COMPROMISED"}
                </span>
              </div>

              <div className="w-full text-center mt-5 space-y-1">
                <span className="font-mono font-black text-gray-900 text-[11px] uppercase block">
                  {calculatedIntegrityScore === 100 
                    ? "PRISTINE SOVEREIGN STATUS (CSG STRICT PLEDGE)" 
                    : calculatedIntegrityScore >= 80 
                      ? "MILD COMPILED DRIFT RATE"
                      : "CRITICAL REPOSITORY INTEGRITY DEVIATION"}
                </span>
                <p className="font-mono text-[9.5px] text-gray-500 max-w-sm mx-auto leading-tight font-bold">
                  {calculatedIntegrityScore === 100 
                    ? "Our zero commission policy guarantees that directory ratings, risk guides, and audit scorecards are entirely free from third-party manipulation." 
                    : "Commercial sponsorship and tracker payloads corrupt sovereign status. Risks are overlooked, and retail handlers are funneled into dangerous platforms."}
                </p>
              </div>
            </div>

            <div className="border-t border-black/10 pt-3 flex justify-between items-center text-[9px] font-mono text-gray-400">
              <span>SIMULATED ON-CHAIN ACCURACY RANGE:</span>
              <span className="font-black text-black">100% RELYING</span>
            </div>
          </div>
        </div>
      </div>

      {/* LEAD AUDIT PERSONNEL BIO DIRECTORIES */}
      <div className="border-heavy bg-white p-6 md:p-8 neo-shadow space-y-6 text-left">
        <div className="border-b-2 border-black pb-4">
          <div className="flex items-center gap-2 text-black font-extrabold uppercase mb-1">
            <Users className="w-5 h-5" />
            <span className="font-mono text-[10px] font-black tracking-widest uppercase">
              {language === 'es' ? 'REGISTRO DEL CONSEJO PRINCIPAL DE CSG' : 'CSG LEAD COUNCIL REGISTER'}
            </span>
          </div>
          <h3 className="font-sora text-sm md:text-base font-black text-gray-950 uppercase tracking-tight">
            {language === 'es' ? 'CONOZCA A LOS ANALISTAS DE SEGURIDAD RESIDENTES' : 'MEET THE RESIDENT SECURITY ANALYSTS'}
          </h3>
          <p className="font-mono text-[10.5px] text-gray-500 font-bold">
            {language === 'es' 
              ? 'Seleccione el perfil de un analista abajo para ver sus credenciales especializadas y campos de enfoque.' 
              : 'Select an analyst profile below to view specialized credentials and focus fields.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Grid list selections */}
          <div className="lg:col-span-5 space-y-3">
            {activeBios.map((member) => (
              <button
                key={member.id}
                onClick={() => setSelectedPersonnel(member.id)}
                className={`w-full text-left p-3.5 border-2 border-black flex items-center justify-between transition-all cursor-pointer active-press font-mono text-xs ${
                  selectedPersonnel === member.id 
                    ? 'bg-black text-[#72ff70] shadow-[2px_2px_0px_rgba(0,0,0,1)] font-black' 
                    : 'bg-white text-gray-800 hover:bg-neutral-50'
                }`}
                title={language === 'es' ? `Mostrar biografía de ${member.name}` : `Show bio of ${member.name}`}
                id={`member-select-btn-${member.id}`}
              >
                <div>
                  <span className="font-extrabold text-[11px] block">{member.name}</span>
                  <span className={`text-[8.5px] uppercase ${selectedPersonnel === member.id ? "text-orange-400" : "text-gray-400"} block mt-0.5`}>
                    {member.role}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            ))}
          </div>

          {/* Visual focus details panel */}
          <div className="lg:col-span-7 bg-[#fffdeb] border-2 border-black p-5 md:p-6 neo-shadow-sm space-y-5">
            {activeBios.find(m => m.id === selectedPersonnel) && (
              (() => {
                const activeMem = activeBios.find(m => m.id === selectedPersonnel)!;
                return (
                  <div className="space-y-5 animate-fade-in text-left">
                    <div className="flex flex-row items-center gap-4">
                      {/* Stylized Avatar logo */}
                      <div className={`w-14 h-14 border-4 border-black font-mono text-lg font-black flex items-center justify-center shrink-0 shadow-[3px_3px_0px_rgba(0,0,0,1)] ${activeMem.avatarBg}`}>
                        {activeMem.initials}
                      </div>

                      <div className="space-y-1">
                        <h4 className="font-sora text-base md:text-lg font-black text-gray-900 leading-none">
                          {activeMem.name}
                        </h4>
                        <span className="font-mono text-[#ab3600] text-[9.5px] font-black uppercase tracking-wider block">
                          {activeMem.role}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1.5 p-3.5 bg-white border border-black/15 font-mono">
                      <span className="text-[8.5px] text-gray-400 font-black block uppercase tracking-wider">
                        {language === 'es' ? 'ENFOQUE FORENSE PRINCIPAL' : 'PRIMARY FORENSIC FOCUS'}
                      </span>
                      <div className="flex items-center gap-1.5 font-bold text-gray-950 font-sora text-xs">
                        <Zap className="w-4 h-4 text-brand-primary" />
                        <span>{activeMem.focus}</span>
                      </div>
                    </div>

                    <div className="space-y-1 font-mono text-[11px]">
                      <span className="text-[8.5px] text-gray-400 font-black block uppercase tracking-wider">
                        {language === 'es' ? 'BIOGRAFÍA DETALLADA DE SEGURIDAD' : 'CLEARANCE BIO DECK'}
                      </span>
                      <p className="text-gray-800 leading-relaxed font-semibold">
                        {activeMem.bio}
                      </p>
                    </div>

                    <div className="border-t border-black/10 pt-3 flex justify-between items-center text-[8px] font-mono text-gray-400">
                      <span>{language === 'es' ? "CLAVE DE RESOLUCIÓN: STATUS_COMPILED" : "SIGNATURE RESOLUTION KEY: STATUS_COMPILED"}</span>
                      <span className="font-bold underline text-[#ab3600]">
                        {language === 'es' ? 'AGENTE CERTIFICADO PÚBLICO' : 'PUBLIC CERTIFIED AGENT'}
                      </span>
                    </div>
                  </div>
                );
              })()
            )}
          </div>

        </div>
      </div>

      <ReportInaccuracyButton pageName="About Us" />
    </div>
  );
};
