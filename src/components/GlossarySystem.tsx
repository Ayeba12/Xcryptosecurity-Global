import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  HelpCircle, 
  Info, 
  ShieldAlert, 
  X, 
  Sparkles, 
  ChevronRight, 
  AlertTriangle, 
  CheckCircle2 
} from 'lucide-react';

// Comprehensive, high-security, educational Glossary Dictionary
export const glossaryDatabase: Record<string, { term: string; definition: string; category: string; impact: string }> = {
  "seed phrase": {
    term: "Seed Phrase",
    definition: "A precise sequence of 12 or 24 random words generated offline by your wallet. It acts as the absolute master core key to derive all public & private keys. If anyone gains this sequence, they secure total control of all funds.",
    category: "CRYPTO KEY SECRETS",
    impact: "CRITICAL ELIGIBILITY SYSTEM"
  },
  "recovery phrase": {
    term: "Recovery Phrase",
    definition: "The exact list of dictionary words backing up your physical wallet keys. It should never be photographed, saved in text files, or input on screens. Strictly save in physical materials like steel.",
    category: "REDUNDANCY STANDARD",
    impact: "CRITICAL ELIGIBILITY SYSTEM"
  },
  "cold storage": {
    term: "Cold Storage",
    definition: "A fundamental isolation security practice where digital keys are generated and stored completely disconnected from the active internet. It is immune to remote web exploits or browser injectors.",
    category: "INFRASTRUCTURE PARADIGM",
    impact: "HIGH PREVENTATIVE SHIELD"
  },
  "hardware wallet": {
    term: "Hardware Wallet",
    definition: "A dedicated physical device (e.g. Ledger, Trezor) integrating secured electronic micro-elements. Private keys never leave the hardware boundary, and transaction outputs must be physically confirmed on its secondary monitor.",
    category: "SECURE PHYSICAL PERIPHERAL",
    impact: "HIGH PREVENTATIVE SHIELD"
  },
  "cold wallet": {
    term: "Cold Wallet",
    definition: "An completely offline custodian repository (hardware, paper, steel) which never comes into contact with public network computers, providing absolute immunity to remote cyberattacks.",
    category: "INFRASTRUCTURE PARADIGM",
    impact: "HIGH PREVENTATIVE SHIELD"
  },
  "private keys": {
    term: "Private Keys",
    definition: "An alphanumeric cryptographic secret code pairing with your public folder address. It compiles digital signatures verifying transactional validity. Losing private keys equates to permanent, unrecoverable loss of the asset portfolio.",
    category: "CRYPTOGRAPHIC PRIMITIVES",
    impact: "CRITICAL MATRICES CONTROL"
  },
  "smart contract": {
    term: "Smart Contract",
    definition: "Self-executing programmable byte-code running deterministically on a distributed ledger. Once deployed, its instructions are mathematically immutable, automating custody transfers without human intermediaries.",
    category: "DECENTRALIZED LOGIC",
    impact: "FUNCTIONAL ACCESS GRID"
  },
  "smart contract approvals": {
    term: "Smart Contract Approvals",
    definition: "Explicit blockchain authorizations granting dapps the right to transfer specified token amounts from your account. Malicious dapps exploit infinite approvals to sweep your entire balance.",
    category: "BLOCKCHAIN PROTOCOLS",
    impact: "HIGH VULNERABILITY MATRIX"
  },
  "evm": {
    term: "EVM (Ethereum Virtual Machine)",
    definition: "The virtual computation engine facilitating smart contract execution across modern EVM-compatible ledgers (Ethereum, BSC, Polygon, Arbitrum). Features standard Web3 wallet connectivity specifications.",
    category: "BLOCKCHAIN PARADIGM",
    impact: "CORE TECHNICAL ENGINE"
  },
  "usdt": {
    term: "USDT Token",
    definition: "The largest global USD-pegged stablecoin. Security checklist: verify actual ERC20/BEP20 contract addresses on official source code tools before confirming spend limits or signing approvals.",
    category: "DIGITAL Stablecoin ASSET",
    impact: "HIGH RISK DECENTRALIZED CURRENCY"
  },
  "p2p": {
    term: "P2P (Peer-to-Peer)",
    definition: "Direct transactional trading of fiat and digital assets between individual merchants. Employs platform escrow systems, requiring rigid manual inspection of banking names to prevent chargeback frauds.",
    category: "EXCHANGE GRIDS MECHANIC",
    impact: "HIGH FRAUD SURFACE"
  },
  "peer-to-peer": {
    term: "Peer-to-Peer",
    definition: "A system where buyers and sellers swap currency assets directly. In emerging economies, peer-to-peer models bypass traditional bans but expose traders to high-risk payment spoofing.",
    category: "EXCHANGE GRIDS MECHANIC",
    impact: "HIGH FRAUD SURFACE"
  },
  "fiat": {
    term: "Fiat Currency",
    definition: "Traditional state-issued tender currency (like Nigeria's Naira, USD, or EUR) backed by sovereign institutions rather than physical reserves or decentralized ledger networks.",
    category: "LEGACY CURRENCY MATRIX",
    impact: "GATEWAY ACCESS LAYER"
  },
  "naira": {
    term: "Naira (NGN)",
    definition: "The sovereign currency issued by the Central Bank of Nigeria. Swapped extensively on peer-to-peer network desks, subject to strict regulatory oversight and high-frequency fake-alerts scams.",
    category: "NATIONAL SOVEREIGN TENDER",
    impact: "LOCAL EXCHANGE SEGMENT"
  },
  "vasp": {
    term: "VASP (Virtual Asset Service Provider)",
    definition: "Any organization conducting exchange, transmission, or safekeeping of cryptographic currencies on behalf of public users. Regulated, licensed and filed under local SEC oversight.",
    category: "REGULATORY DESIGNATION",
    impact: "SOVEREIGN LAW COMPLIANCE"
  },
  "sec": {
    term: "SEC (Securities & Exchange Commission)",
    definition: "The primary state regulatory commission charged with governing financial asset investments, auditing digital platform licenses, protecting retail consumers, and policing high-threat fraud rings.",
    category: "STATE COMPLIANCE BUREAU",
    impact: "SOVEREIGN LAW COMPLIANCE"
  },
  "address poisoning": {
    term: "Address Poisoning",
    definition: "A complex bot attack scanning the ledger for transactions. Scammers mint matching address prefixes/suffixes, sending dust transactions into your history so you accidentally copy the poison coordinates and redirect operations.",
    category: "HIGH TECH BOT EXPLOIT",
    impact: "MEDIUM SOCIAL PHISHING LOSS"
  },
  "ice phishing": {
    term: "Ice Phishing",
    definition: "A tactical scam where attackers manipulate dapp frontends or links to trick players into signing key allowances. Instead of claiming tokens, it authorizes the attacker to drain all assets.",
    category: "DAPP FRAUD INJECTION",
    impact: "CRITICAL ASSETS FLUSH"
  },
  "gas fee": {
    term: "Gas Fee",
    definition: "The incremental cost measured in Gwei required to register any transactional operation on blockchain systems. Sudden spike alerts during simulations often indicate looping traps or drainage programs.",
    category: "BLOCKCHAIN PARADIGM",
    impact: "TECHNICAL EXECUTION METER"
  },
  "block explorer": {
    term: "Block Explorer",
    definition: "Public search portals (like Etherscan, BscScan) mapping ledger activities. They let you inspect real-time transaction, track smart contract balances, and verify if code is officially open-sourced.",
    category: "LEDGER AUDIT TOOL",
    impact: "CRITICAL AUDIT CAPABILITY"
  },
  "2fa": {
    term: "Two-Factor Authentication (2FA)",
    definition: "A verification standard requiring supplementary device tokens. Hard keys like Yubikeys are highly safe; SMS-based 2FA is easily bypassed via SIM swapping telecommunication vectors.",
    category: "PREVENTATIVE ACCOUNT ARMOR",
    impact: "HIGH INGRESS CONTROL"
  },
  "phishing": {
    term: "Phishing Scams",
    definition: "Social engineering tactics that fabricate replica app stores, help desks, or admin users to con trustful builders into revealing recovery phrases, private credentials, or login tokens.",
    category: "SOCIAL ENGINEERING INTENSITY",
    impact: "CRITICAL TOTAL DRAINAGE"
  },
  "custody": {
    term: "Self-Custody vs Exchange Custody",
    definition: "The holding of cryptographic private keys. Exchange custody means third-party servers lock physical control, whereas self-custody shifts the entire security obligation securely onto you.",
    category: "SECURITY PHILOSOPHY",
    impact: "CORE PARADIGM CONTROL"
  },
  "double check": {
    term: "Physically Double-Check",
    definition: "The protocol of thoroughly comparing address characters on the physical display of an offline cold slate against host monitor instructions, completely nullifying background clipboard malware.",
    category: "BEHAVIORAL HABIT CHECKLIST",
    impact: "IMPERVIOUS ANTIDOTE VECTOR"
  },
  "allowance": {
    term: "Token Allowance",
    definition: "The exact token limit parameter authorized for dapp withdrawals. Be rigorous: revoke outstanding approvals of unutilized token balances frequently.",
    category: "SMART CONTRACT PROTOCOL",
    impact: "HIGH SYSTEM VULNERABILITY"
  }
};

// Sort terms by descending length to prevent sub-string matching bugs (e.g. "smart contract approvals" before "smart contract")
const sortedGlossaryKeys = Object.keys(glossaryDatabase).sort((a, b) => b.length - a.length);

interface GlossaryTermProps {
  term: string;
}

export const GlossaryTerm: React.FC<GlossaryTermProps> = ({ term }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0, arrowLeft: '50%' });

  // Normalize lookup key of matching term
  const lookupKey = term.toLowerCase().trim();
  const data = glossaryDatabase[lookupKey];

  const updatePosition = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Fixed tooltip widths corresponding to styles
    const tooltipWidth = window.innerWidth < 640 ? 288 : 320;
    
    // Position center relative to trigger span midpoint
    let left = rect.left + window.scrollX + rect.width / 2;
    
    const halfWidth = tooltipWidth / 2;
    const padding = 12; // safety margin from edge of window
    
    // Bounds checking
    if (left - halfWidth < padding + window.scrollX) {
      left = halfWidth + padding + window.scrollX;
    }
    const maxLeft = window.innerWidth - halfWidth - padding + window.scrollX;
    if (left > maxLeft) {
      left = maxLeft;
    }
    
    // Sync arrow offset to point directly at the midpoint of the trigger
    const triggerCenterPageX = rect.left + window.scrollX + rect.width / 2;
    const tooltipLeftPageX = left - halfWidth;
    const arrowOffsetPercentage = ((triggerCenterPageX - tooltipLeftPageX) / tooltipWidth) * 100;
    const arrowLeft = `${Math.min(95, Math.max(5, arrowOffsetPercentage))}%`;

    setPosition({
      top: rect.top + window.scrollY - 8,
      left: left,
      arrowLeft
    });
  };

  useEffect(() => {
    if (isOpen) {
      updatePosition();
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition, true);
    }
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [isOpen]);

  useEffect(() => {
    // Handle tap-away closes for convenient mobile usage
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!data) {
    return <span>{term}</span>;
  }

  return (
    <span 
      ref={containerRef}
      className="relative idx-glossary-wrapper inline"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      id={`glossary-trigger-${lookupKey.replace(/\s+/g, '-')}`}
    >
      <span 
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="cursor-help border-b-[2.5px] border-dotted border-[#0040e0] font-black text-[#0040e0] bg-[#efefff]/60 hover:bg-[#efefff] transition-all px-1 py-0.5 rounded-none inline select-all tracking-tight leading-normal"
      >
        {term}
        <span className="inline-block text-[9.5px] text-[#0040e0]/70 ml-1 select-none font-bold align-super">?</span>
      </span>

      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.12, ease: "easeOut" }}
              className="absolute bg-[#121212] border-2 border-black p-4 font-mono text-[11px] leading-relaxed shadow-[4px_4px_0px_rgba(114,255,112,1)] z-[9999] text-white rounded-none pointer-events-auto block w-72 sm:w-80"
              style={{
                top: `${position.top}px`,
                left: `${position.left}px`,
                transform: 'translate(-50%, -100%)',
              }}
              id={`glossary-tooltip-${lookupKey.replace(/\s+/g, '-')}`}
              // Keep showing when pointer sits inside tooltip
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              {/* Header branding */}
              <div className="flex items-center justify-between border-b border-gray-805 pb-1.5 mb-2 select-none">
                <span className="text-[9px] font-black tracking-widest text-[#72ff70] uppercase flex items-center gap-1">
                  <BookOpen className="w-3 h-3 text-[#ff5f1f]" /> SECURE GLOSSARY
                </span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                  className="text-gray-400 hover:text-white p-0.5 border border-transparent bg-white/5 hover:bg-neutral-800 cursor-pointer"
                  aria-label="Close custom tooltip"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>

              {/* Term label */}
              <div className="font-sora text-[12.5px] font-black text-white uppercase tracking-tight leading-tight mb-0.5 text-left">
                {data.term}
              </div>

              {/* Group Tagging Matrix info */}
              <div className="flex flex-wrap gap-1.5 mb-2.5">
                <span className="text-[8.5px] font-extrabold px-1.5 py-0.5 bg-neutral-800 border border-neutral-700 text-gray-300 rounded-none uppercase">
                  {data.category}
                </span>
                <span className="text-[8.5px] font-black px-1.5 py-0.5 bg-[#ff5f1f]/10 border border-[#ff5f1f]/30 text-[#ff5f1f] rounded-none uppercase">
                  {data.impact}
                </span>
              </div>

              {/* Text description definition */}
              <div className="font-sans text-[11.5px] font-medium leading-relaxed text-gray-200 text-left">
                {data.definition}
              </div>

              {/* Interactive hint footer */}
              <div className="mt-3 pt-2 border-t border-gray-900 flex justify-between select-none text-[8.5px] text-gray-500 font-bold uppercase tracking-wider">
                <span>TAP ANY AREA TO CLOSE</span>
                <span>VERIFIED DIRECTIVE</span>
              </div>
              
              {/* Elegant tiny bottom structural notch */}
              <div 
                className="absolute top-full -mt-[2px] w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-black pointer-events-none" 
                style={{ left: position.arrowLeft, transform: 'translateX(-50%)' }}
              />
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </span>
  );
};

interface GlossaryTextProps {
  text: string;
}

export const GlossaryText: React.FC<GlossaryTextProps> = ({ text }) => {
  if (!text) return null;

  const escapeRegExp = (str: string) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  // Compile regular expression
  const pattern = sortedGlossaryKeys.map(escapeRegExp).join('|');
  const regex = new RegExp(`\\b(${pattern})\\b`, 'gi');

  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) => {
        // odd indices match captured glossary terms
        if (i % 2 === 1) {
          return <GlossaryTerm key={i} term={part} />;
        }
        return part;
      })}
    </>
  );
};

// Test metadata selector for terms
export interface TermChallenge {
  term: string;
  category: string;
  impact: string;
  scenario: string;
  interactiveType: 'multichoice' | 'addressmatch' | 'sliderLimit' | 'verifyPoison' | 'safep2p';
  options?: string[];
  correctAnswerIndex?: number;
  explanation: string;
}

export const getTermChallenge = (termKey: string, category: string, impact: string): TermChallenge => {
  const norm = termKey.toLowerCase().trim();

  if (norm.includes("seed") || norm.includes("recovery") || norm.includes("private") || norm.includes("custody")) {
    return {
      term: termKey,
      category,
      impact,
      scenario: "A bot posing as a Support Assistant messages you on web chat claiming your wallet needs to be verified on an external tool due to a 'critical network upgrade sync'. It requests your 12-word seed phrase.",
      interactiveType: 'multichoice',
      options: [
        "Provide only the first 6 words to authenticate and retain key ownership.",
        "Strictly refuse: Any portal requesting backup words on a screen is a critical phishing drainer.",
        "Enter your words but modify one letter on purpose to check if it has automatic validator keys."
      ],
      correctAnswerIndex: 1,
      explanation: "No legitimate administrator, project creator, developer, or automated protocol system will ever request your seed phrase, recovery phrase, or private keys. Entering them anywhere on a connected screen results in immediate, total wallet drainage."
    };
  }

  if (norm.includes("hardware") || norm.includes("cold") || norm.includes("double")) {
    return {
      term: termKey,
      category,
      impact,
      scenario: "Ensure address integrity: You clicked a copy-button in your web explorer to withdraw $1,200. Does the address shown on your browser screen match the address verified on your hardware wallet's offline screen?",
      interactiveType: 'addressmatch',
      explanation: "Address poisoning bots generate fake transaction addresses with identical prefixes and suffixes to pollute your clipboard. Always inspect the MIDDLE characters directly on your physical hardware screen before pressing confirmation buttons!"
    };
  }

  if (norm.includes("approval") || norm.includes("allowance") || norm.includes("smart") || norm.includes("evm")) {
    return {
      term: termKey,
      category,
      impact,
      scenario: "You are executing a $150 token Swap on a decentralised exchange aggregator. The signature request prompts you to grant an 'UNLIMITED' spend allowance.",
      interactiveType: 'sliderLimit',
      explanation: "Granting unlimited approvals allows malicious dapp creators or exploited standard contracts to drain all your existing assets. Restricting approvals to precise transaction requirements is the single most effective tool to protect unspent capital."
    };
  }

  if (norm.includes("poison") || norm.includes("phishing") || norm.includes("explorer") || norm.includes("gas")) {
    return {
      term: termKey,
      category,
      impact,
      scenario: "An address poisoning bot executed dust transactions to hijack your transaction history. Identify the poisoned copy-paste target log from the blockchain explorer ledger records below:",
      interactiveType: 'verifyPoison',
      explanation: "Poison transactions register lookalike addresses with matching start and end segments. If you lazily copy from your transaction lists without validating each internal hex character, you accidentally send funds directly to the adversary."
    };
  }

  // default to P2P and others
  return {
    term: termKey,
    category,
    impact,
    scenario: "A P2P counterparty has sent a payment receipt image declaring they have completed their Naira transfer. However, your offline verified bank application shows NO new deposits. The user aggressively messages: 'RELEASE THE CRYPTO QUICK, BANK ALERTS ARE LAGGY!'",
    interactiveType: 'safep2p',
    explanation: "Fake payments are the main source of P2P loss. Never release escrowed digital assets under pressure based on screenshot receipts or SMS alerts. Strictly verify actual core balances inside your bank's secure application before release."
  };
};

interface TermUnitTesterProps {
  termItem: { term: string; definition: string; category: string; impact: string };
  onClose: () => void;
}

export const TermUnitTester: React.FC<TermUnitTesterProps> = ({ termItem, onClose }) => {
  const challenge = getTermChallenge(termItem.term, termItem.category, termItem.impact);

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [sliderVal, setSliderVal] = useState<number>(10000);
  const [isSignAttempted, setIsSignAttempted] = useState(false);
  const [testResult, setTestResult] = useState<'success' | 'fail' | null>(null);
  const [clickedPoisonLog, setClickedPoisonLog] = useState<number | null>(null);
  const [diagnosedMessage, setDiagnosedMessage] = useState<string>('');

  const handleReset = () => {
    setSelectedOption(null);
    setSliderVal(10000);
    setIsSignAttempted(false);
    setTestResult(null);
    setClickedPoisonLog(null);
    setDiagnosedMessage('');
  };

  const handleMultichoiceVerify = (idx: number) => {
    setSelectedOption(idx);
    const passed = idx === challenge.correctAnswerIndex;
    setTestResult(passed ? 'success' : 'fail');
    setDiagnosedMessage(passed 
      ? `AUTHENTICATED // SECURED MODE:\n${challenge.explanation}`
      : "OVERRIDE ALERT // CRITICAL ENTRY COMPROMISE:\nAny screen-prompt asking for private keys is an active phishing attempt. Do not input credentials."
    );
  };

  const handleAddressMatchVerify = (abort: boolean) => {
    setIsSignAttempted(true);
    // Aborting is success! Swapping addresses is the poison attack. In the scenario, both show matches, so confirming is success, but let's look at address logic
    if (abort) {
      setTestResult('success');
      setDiagnosedMessage(`PROTOCOL CODES VERIFIED:\nYou signed the transaction because the characters matched perfectly segment-by-segment. This is secure!`);
    } else {
      setTestResult('fail');
      setDiagnosedMessage("COLLATERAL REJECTION ERROR:\nYou aborted the transfer even though the address matched perfectly. Verify character sequences meticulously and retry!");
    }
  };

  const handleSliderSign = () => {
    setIsSignAttempted(true);
    if (sliderVal <= 250) {
      setTestResult('success');
      setDiagnosedMessage(`MITIGATION CRITERIA PASS:\nYou signed with exactly $${sliderVal} spending ceiling. The dapp cannot touch other unallocated fund registers!`);
    } else {
      setTestResult('fail');
      setDiagnosedMessage(`VULNERABILITY RATIO TOO HIGH:\nYou authorized $${sliderVal} allowance. If this contract is exploited, your remaining funds are heavily exposed! Adjust the dial to $250 or less and retry.`);
    }
  };

  const handlePoisonLogClick = (idx: number) => {
    setClickedPoisonLog(idx);
    setIsSignAttempted(true);
    if (idx === 1) { // Log 2 is poison
      setTestResult('success');
      setDiagnosedMessage(`DECOY THREAT ISOLATED:\nExcellent core analysis! Log 02 was the lookalike address. Sentry trace is clear.`);
    } else {
      setTestResult('fail');
      setDiagnosedMessage("COLLATERAL ERROR:\nYou selected a safe block address coordinate. Look closer at Log 02 - its end suffix matches yours, but the middle-hex is spoofed!");
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
      {/* Translucent backdrop */}
      <div 
        className="absolute inset-x-0 inset-y-0 bg-neutral-950/85 backdrop-blur-xs cursor-pointer"
        onClick={onClose}
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.15 }}
        className="relative bg-white border-4 border-black text-black w-full max-w-[500px] shadow-[8px_8px_0_#ab3600] overflow-hidden select-none"
      >
        {/* Header telemetry band */}
        <div className="bg-black text-white px-4 py-3 border-b-2 border-black flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-[#ab3600] shrink-0" />
            <span className="font-mono text-[9px] font-black tracking-widest text-[#72ff70] uppercase">
              DECENTRALIZED ACTION INTERPRETATION LAB
            </span>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-white border border-transparent bg-neutral-900 transition-colors cursor-pointer p-0.5"
            aria-label="Close tester window"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-5 space-y-4 text-left">
          {/* Metadata category */}
          <div className="flex items-center justify-between border-b border-black/10 pb-2">
            <span className="font-mono text-[8px] font-bold text-gray-500 uppercase">
              TERM CHALLENGE INDEX: {termItem.term.toUpperCase()}
            </span>
            <span className="font-mono text-[8.5px] font-black text-[#ab3600] bg-[#ab3600]/10 border border-[#ab3600]/20 px-2 py-0.5">
              {termItem.category}
            </span>
          </div>

          <div className="space-y-1">
            <h4 className="font-sora text-sm font-black text-gray-950 uppercase leading-none">
              SYSTEM TESTING: {termItem.term}
            </h4>
            <p className="font-mono text-[9px] text-gray-400">
              STATUS // ACTIVE LIVE DIAGNOSTICS EMULATION
            </p>
          </div>

          {/* Scenario description box */}
          <div className="bg-[#fdfaf2] border-l-2 border-[#ff5f1f] p-3 text-[10.5px] font-mono text-gray-800 leading-relaxed shadow-inner">
            <span className="text-[#ff5f1f] font-black block mb-1">⚠️ THREAT VECTOR DISPATCH:</span>
            {challenge.scenario}
          </div>

          {/* Core Interactive Sandbox according to type */}
          <div className="border-2 border-black p-3.5 bg-neutral-50 space-y-3 relative overflow-hidden min-h-[140px] flex flex-col justify-center">
            
            {/* 1. MULTICHOICE INTERACTIVE WIDGET */}
            {challenge.interactiveType === 'multichoice' && (
              <div className="space-y-2">
                {challenge.options?.map((opt, oIdx) => (
                  <button
                    key={oIdx}
                    type="button"
                    onClick={() => handleMultichoiceVerify(oIdx)}
                    className={`w-full text-left p-2 font-mono text-[9.5px] leading-relaxed border transition-all cursor-pointer ${
                      selectedOption === oIdx
                        ? 'bg-black text-[#72ff70] border-black font-extrabold'
                        : 'bg-white hover:bg-neutral-100 border-neutral-300 text-gray-700'
                    }`}
                  >
                    <span className="font-bold text-orange-500 mr-1.5">[{oIdx + 1}]</span>
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {/* 2. ADDRESS MATCH INTERACTIVE WIDGET */}
            {challenge.interactiveType === 'addressmatch' && (
              <div className="space-y-3 text-center">
                <div className="grid grid-cols-2 gap-2">
                  <div className="border border-neutral-300 bg-white p-2 text-left space-y-1">
                    <span className="text-[7.5px] text-gray-400 uppercase font-bold block">1. BROWSER EXPLORER CODES</span>
                    <span className="font-mono text-[9.5px] select-all bg-yellow-50 text-amber-900 border border-amber-200/50 px-1 font-semibold block truncate">
                      {"0x71C43e5c98A9d31"}
                      <span className="text-emerald-600 font-extrabold bg-emerald-100 px-0.5">e38</span>
                      {"2f94Bc90a89B"}
                    </span>
                  </div>
                  <div className="border border-neutral-300 bg-white p-2 text-left space-y-1">
                    <span className="text-[7.5px] text-gray-400 uppercase font-bold block">2. HARDWARE DECODING PANEL</span>
                    <span className="font-mono text-[9.5px] bg-[#e4fce3] text-emerald-900 border border-emerald-200/50 px-1 font-semibold block truncate">
                      {"0x71C43e5c98A9d31"}
                      <span className="text-emerald-600 font-extrabold bg-emerald-100 px-0.5">e38</span>
                      {"2f94Bc90a89B"}
                    </span>
                  </div>
                </div>

                <div className="p-2 border border-dashed border-emerald-300 bg-emerald-50 text-[9px] font-mono text-emerald-800 text-left">
                  ✦ Physical compare notice: Both hex terminals perfectly output <span className="font-bold">e38</span> in matching segments!
                </div>

                <div className="flex gap-2 justify-center">
                  <button
                    type="button"
                    onClick={() => handleAddressMatchVerify(false)}
                    className="flex-1 py-1.5 px-3 bg-red-600 hover:bg-red-700 text-white font-mono text-[9px] font-bold tracking-tight cursor-pointer uppercase active-press"
                  >
                    ❌ CANCEL / DIFFERENCE (REJECT)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddressMatchVerify(true)}
                    className="flex-1 py-1.5 px-3 bg-emerald-650 hover:bg-emerald-700 text-white font-mono text-[9px] font-bold tracking-tight cursor-pointer uppercase active-press"
                  >
                    ✓ YES, ALL MATCH (SIGN)
                  </button>
                </div>
              </div>
            )}

            {/* 3. SLIDER APPROVAL LIMIT INTERACTIVE WIDGET */}
            {challenge.interactiveType === 'sliderLimit' && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[8.5px] font-mono font-bold text-gray-500">
                    <span>MIN SWAP VALUE ($10)</span>
                    <span>UNLIMITED ($10,000)</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="10000"
                    step="10"
                    value={sliderVal}
                    aria-label="Spend allowance limit selector"
                    onChange={(e) => setSliderVal(Number(e.target.value))}
                    className="w-full h-1 bg-gray-200 rounded-none appearance-none cursor-pointer accent-[#ab3600]"
                  />
                </div>

                <div className="flex justify-between items-center border border-neutral-200 bg-white p-2">
                  <div className="space-y-0.5 text-left">
                    <span className="text-[7.5px] text-gray-400 font-bold uppercase block">SPEND CELL APPROVED</span>
                    <span className="font-mono text-[11px] font-black tracking-tight text-gray-900">
                      {sliderVal >= 10000 ? "UNLIMITED (MAX ALLOWANCE)" : `$${sliderVal.toLocaleString()}`}
                    </span>
                  </div>
                  <span className={`text-[8px] font-mono font-bold uppercase px-1.5 py-0.5 border ${
                    sliderVal >= 10000 
                      ? 'bg-rose-50 text-red-600 border-red-200 animate-pulse'
                      : sliderVal <= 250
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}>
                    {sliderVal >= 10000 ? "DANGER CEILING" : sliderVal <= 250 ? "SAFE PARMET" : "EXPOSED LIMIT"}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleSliderSign}
                  className="w-full py-2 bg-black hover:bg-neutral-900 text-white font-mono text-[9px] font-black uppercase tracking-widest cursor-pointer border border-[#ab3600] active-press animate-none"
                >
                  PROPOSE LIMIT & EXECUTE SIGNATURE
                </button>
              </div>
            )}

            {/* 4. VERIFY POISON TRANSACTION HISTORIES */}
            {challenge.interactiveType === 'verifyPoison' && (
              <div className="space-y-2 text-left">
                <div className="text-[7.5px] font-mono text-gray-400 font-bold tracking-wider uppercase mb-1">
                  BLOCKSCAN LEDGER BLOCK ENTRIES: (CLICK TO INTERCEPT DECOY)
                </div>
                {[
                  { tx: "OUT: 1,200.00 USDT to ...a89B", label: "LOG 01 // LEGITIMATE SWAP" },
                  { tx: "IN: 0.00 USDT from ...a85B", label: "LOG 02 // DUST LOOKALIKE DETECTED" },
                  { tx: "OUT: 15.00 USDT to ...a89B", label: "LOG 03 // LEGITIMATE SWAP" }
                ].map((item, idIdx) => (
                  <button
                    key={idIdx}
                    type="button"
                    onClick={() => handlePoisonLogClick(idIdx)}
                    className={`w-full text-left p-1.5 border transition-all cursor-pointer ${
                      clickedPoisonLog === idIdx
                        ? idIdx === 1
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-500 font-bold'
                          : 'bg-rose-950 text-rose-300 border-rose-500 font-bold'
                        : 'bg-white hover:bg-neutral-50 border-neutral-300 text-gray-700'
                    }`}
                  >
                    <div className="flex justify-between items-center text-[7px] font-bold text-gray-400 mb-0.5">
                      <span>{item.label}</span>
                      {clickedPoisonLog === idIdx && (
                        <span>{idIdx === 1 ? "✓ POISON INTERCEPTED" : "❌ COLLATERAL TRANSACTION"}</span>
                      )}
                    </div>
                    <span className="font-mono text-[9px]">{item.tx}</span>
                  </button>
                ))}
              </div>
            )}

            {/* 5. SAFE P2P EXCH CHAT WIDGET */}
            {challenge.interactiveType === 'safep2p' && (
              <div className="space-y-2 text-left">
                {[
                  { text: "[  ] Release the escrow immediately since the screenshot receipt is signed.", correct: false },
                  { text: "[  ] Refuse to release capital. Copy-Paste standard Arbitration Response, dispute transaction, and audit your bank balance offline.", correct: true }
                ].map((opt, rIdx) => (
                  <button
                    key={rIdx}
                    type="button"
                    onClick={() => {
                      setIsSignAttempted(true);
                      setTestResult(opt.correct ? 'success' : 'fail');
                      setDiagnosedMessage(opt.correct 
                        ? `DECISION SUCCESSFUL // ESCROW DISPUTED:\n${challenge.explanation}`
                        : "OH NO! P2P ACCOUNT EXPOSED TO FORGED RECEIPT FRAUD. Scammers issue clean fake screenshots to rush peer releasing. Never sign release before offline bank portal confirms balance!"
                      );
                    }}
                    className={`w-full text-left p-2 font-mono text-[9px] leading-relaxed border transition-all cursor-pointer ${
                      testResult !== null && (opt.correct ? testResult === 'success' : testResult === 'fail')
                        ? opt.correct
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-500 font-bold'
                          : 'bg-rose-50 text-rose-800 border-rose-500 font-bold'
                        : 'bg-white hover:bg-neutral-100 border-neutral-300 text-gray-700'
                    }`}
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
            )}

          </div>

          {/* Feedback response console */}
          <AnimatePresence mode="wait">
            {testResult && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className={`border p-3 font-mono text-[9.5px] leading-relaxed relative ${
                  testResult === 'success'
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                    : 'bg-rose-50 border-rose-500 text-rose-900'
                }`}
              >
                <div className="font-bold flex items-center gap-1.5 mb-1 text-[10px]">
                  {testResult === 'success' ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="text-emerald-700 font-black">✦ TEST CERTIFICATE LEVEL: SECURED ✦</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                      <span className="text-red-700 font-black">❌ EXPLOIT TRIGGERED // ATTENTION ❌</span>
                    </>
                  )}
                </div>
                <div className="whitespace-pre-line font-medium text-left">
                  {diagnosedMessage}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Action button bar */}
        <div className="bg-neutral-50 px-5 py-3.5 border-t-2 border-black flex gap-2 justify-end">
          {testResult && (
            <button
              type="button"
              onClick={handleReset}
              className="px-3 py-1.5 border-2 border-black hover:bg-neutral-100 font-mono text-[9px] font-black uppercase cursor-pointer"
            >
              RETRY CHALLENGE
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-black hover:bg-neutral-900 text-[#72ff70] border-2 border-black font-mono text-[9px] font-black uppercase cursor-pointer active-press"
          >
            DISMISS REPORT
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// Beautiful interactive dashboard search panel of all glossary terms
export const GlossaryHub: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [testingTerm, setTestingTerm] = useState<{ term: string; definition: string; category: string; impact: string } | null>(null);

  const categories = Array.from(new Set(Object.values(glossaryDatabase).map(d => d.category)));

  const matchedTerms = Object.values(glossaryDatabase).filter(item => {
    const matchesSearch = item.term.toLowerCase().includes(search.toLowerCase()) || 
                          item.definition.toLowerCase().includes(search.toLowerCase());
    const matchesCat = !selectedCat || item.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="border-heavy bg-[#fffdf7] p-5 md:p-8 space-y-6" id="glossary-explorer-panel">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-black pb-5">
        <div className="space-y-1.5 text-left">
          <div className="inline-flex items-center gap-2 bg-[#efefff] border border-[#0040e0] text-[#0040e0] font-mono text-[9px] font-bold px-3 py-1 uppercase tracking-widest leading-none">
            <Sparkles className="w-3.5 h-3.5 text-[#ff5f1f]" />
            <span>INTERACTIVE KNOWLEDGE COGNITION</span>
          </div>
          <h3 className="font-sora text-sm md:text-xl font-black text-gray-950 uppercase tracking-tight">
            DECENTRALIZED THREAT GLOSSARY HUB
          </h3>
          <p className="font-mono text-[10.5px] text-gray-500 leading-normal max-w-xl">
            Audit, isolate, and index cyber-terms directly. Hover terms highlighted in light blue throughout our portal to learn safety concepts instantly.
          </p>
        </div>
        
        {/* Info stats badge */}
        <div className="bg-black text-white p-3 font-mono text-center select-none md:self-stretch flex flex-col justify-center min-w-[140px]">
          <span className="text-[20px] font-black text-[#72ff70] tracking-tighter leading-none">
            {Object.keys(glossaryDatabase).length}
          </span>
          <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">
            LOADED TERMS
          </span>
        </div>
      </div>

      {/* Action Filters Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
        <div className="md:col-span-6 relative flex items-center bg-white border-2 border-black">
          <div className="px-3 border-r-2 border-black font-mono text-[10.5px] text-gray-500 select-none bg-neutral-50 h-full flex items-center font-bold">
            SEARCH
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="e.g. seed phrase, address poisoning, EVM..."
            className="w-full px-3 py-2.5 text-xs text-gray-900 bg-transparent placeholder-gray-400 focus:outline-none font-mono"
          />
          {search && (
            <button 
              onClick={() => setSearch('')}
              className="absolute right-2 px-1.5 py-0.5 text-[9px] font-mono hover:bg-neutral-100 border border-black cursor-pointer font-bold"
            >
              CLEAR
            </button>
          )}
        </div>

        <div className="md:col-span-6 flex overflow-x-auto whitespace-nowrap scrollbar-clean pb-2 gap-2 items-center">
          <button
            onClick={() => setSelectedCat(null)}
            className={`px-3 py-1.5 text-[9.5px] font-mono uppercase font-black tracking-wide border-2 transition-all cursor-pointer shrink-0 ${
              selectedCat === null
                ? 'bg-black text-white border-black'
                : 'bg-white text-gray-600 border-neutral-200 hover:border-black hover:text-black'
            }`}
          >
            ALL SECTORS ({Object.keys(glossaryDatabase).length})
          </button>
          {categories.map(cat => {
            const count = Object.values(glossaryDatabase).filter(i => i.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-3 py-1.5 text-[9.5px] font-mono uppercase font-black tracking-wide border-2 transition-all cursor-pointer shrink-0 ${
                  selectedCat === cat
                    ? 'bg-black text-[#72ff70] border-black'
                    : 'bg-white text-gray-600 border-neutral-200 hover:border-black hover:text-black'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Glossary Cards Grid */}
      {matchedTerms.length === 0 ? (
        <div className="border-2 border-dashed border-gray-200 p-8 text-center font-mono text-xs text-gray-400 bg-white">
          🚫 No index match found. Refine your query or parameters.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {matchedTerms.map((item, index) => (
            <div 
              key={index}
              onClick={() => setTestingTerm(item)}
              className="border-2 border-black bg-white p-4.5 transition-all hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:bg-[#fffcf5] cursor-pointer flex flex-col justify-between h-56 select-none group relative overflow-hidden"
              style={{ boxShadow: '3px 3px 0px rgba(0,0,0,1)' }}
            >
              {/* Graphic background background logo icon wrapper */}
              <div className="absolute -right-4 -bottom-6 text-[80px] font-black text-neutral-100 font-mono pointer-events-none select-none z-0 group-hover:scale-105 transition-transform duration-150">
                0{index + 1}
              </div>

              <div className="space-y-2.5 relative z-10 text-left">
                <div className="flex items-center justify-between border-b pb-1">
                  <span className="text-[9px] font-black text-[#ab3600] uppercase tracking-wider">
                    {item.category}
                  </span>
                  <span className="text-[8.5px] font-bold text-gray-400 font-mono">
                    INDEX {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="font-sora text-[13.5px] font-black text-gray-900 uppercase tracking-tight">
                  {item.term}
                </div>

                <div className="font-sans text-[11px] leading-relaxed text-gray-600 line-clamp-4">
                  {item.definition}
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 relative z-10 flex justify-between items-center bg-transparent mt-auto select-none">
                <span className="text-[8.5px] font-black text-[#0040e0] uppercase bg-[#efefff] border border-[#0040e0]/20 px-1.5 py-0.5">
                  {item.impact}
                </span>
                
                <span className="text-[9px] font-mono text-gray-400 group-hover:text-black flex items-center gap-0.5 font-bold">
                  TAP TERM TO TEST <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Render testing simulator modal portal */}
      {createPortal(
        <AnimatePresence>
          {testingTerm && (
            <TermUnitTester
              termItem={testingTerm}
              onClose={() => setTestingTerm(null)}
            />
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};
