import React, { useState, useEffect } from 'react';
import { 
  Shield, Mail, Terminal, Send, Lock, Eye, EyeOff, Trash2, Check, 
  AlertTriangle, HelpCircle, FileText, Info, Handshake, BookOpen, 
  Megaphone, Globe, Layers, FileQuestion, ArrowRight, Sparkles, CheckCircle2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ContactTicket {
  id: string;
  senderName: string;
  senderEmail: string;
  category: string;
  priority: 'STANDARD' | 'CRITICAL';
  referenceLink?: string;
  message: string;
  timestamp: string;
  transmissionHash: string;
  status: 'PENDING ANALYSIS' | 'SUCCESSFULLY ENCRYPTED' | 'ISOLATED IN SANDBOX';
  projectPlatformName?: string;
  listingInquiryTier?: string;
  adBudgetOrChannels?: string;
  collabType?: string;
  audienceReach?: string;
}

export const ContactView: React.FC = () => {
  // Local state for contact form
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [category, setCategory] = useState('DIRECTORY LISTING INQUIRY');
  const [priority, setPriority] = useState<'STANDARD' | 'CRITICAL'>('STANDARD');
  const [referenceLink, setReferenceLink] = useState('');
  const [message, setMessage] = useState('');
  
  // Custom Category Fields
  const [projectPlatformName, setProjectPlatformName] = useState('');
  const [listingInquiryTier, setListingInquiryTier] = useState('Primary Regulated Exchange Ledger');
  const [adBudgetOrChannels, setAdBudgetOrChannels] = useState('');
  const [collabType, setCollabType] = useState('Academic Cyber-Forensics Research Co-Authorship');
  const [audienceReach, setAudienceReach] = useState('');
  
  // Guided step process state
  const [currentFormStep, setCurrentFormStep] = useState<number>(1);
  
  // Interactive guided helper state
  const [focusedField, setFocusedField] = useState<string | null>(null);
  
  // Terminal Simulation state
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [transmissionLogs, setTransmissionLogs] = useState<string[]>([]);
  const [transmissionSuccess, setTransmissionSuccess] = useState(false);
  
  // Local storage tickets state
  const [savedTickets, setSavedTickets] = useState<ContactTicket[]>([]);
  const [showSandboxLedger, setShowSandboxLedger] = useState(true);

  // Load existing tickets from local storage on mount
  useEffect(() => {
    const raw = localStorage.getItem('csg_contact_tickets');
    if (raw) {
      try {
        setSavedTickets(JSON.parse(raw));
      } catch (err) {
        console.error('Failed to parse sandboxed contact logs', err);
      }
    } else {
      // Create a default initial record to make the ledger look realistic
      const defaultRecord: ContactTicket = {
        id: 'ticket-91a3',
        senderName: 'NEXUS CO-OP',
        senderEmail: 'dev-alliance@nexus-p2p.io',
        category: 'BUSINESS COLLABORATION PROPOSAL',
        priority: 'STANDARD',
        referenceLink: 'https://nexus-p2p.io',
        message: 'Proposed integration of global threat database sharing endpoints. Nexus operates P2P exchange gateways and wants to mirror Crypto Safety Global verified scam lists in real-time to protect merchant escrows.',
        timestamp: new Date(Date.now() - 36000000).toUTCString(),
        transmissionHash: 'SHA256: 8f4a1cd323df0ac20ded210cfef4fef3a1cd508be604e13886bcaaddfbbef01202',
        status: 'SUCCESSFULLY ENCRYPTED',
        projectPlatformName: 'Nexus Exchange Gateway',
        collabType: 'Database API Mirroring & Global Threat Feeds'
      };
      setSavedTickets([defaultRecord]);
      localStorage.setItem('csg_contact_tickets', JSON.stringify([defaultRecord]));
    }
  }, []);

  const handleClearSavedLogs = () => {
    localStorage.removeItem('csg_contact_tickets');
    setSavedTickets([]);
  };

  const handleDeleteTicket = (id: string) => {
    const updated = savedTickets.filter(t => t.id !== id);
    setSavedTickets(updated);
    localStorage.setItem('csg_contact_tickets', JSON.stringify(updated));
  };

  // Helper to generate fake sha256 output
  const generateHash = () => {
    const chars = '0123456789abcdef';
    let result = '';
    for (let i = 0; i < 64; i++) {
      result += chars[Math.floor(Math.random() * 16)];
    }
    return `SHA256: ${result}`;
  };

  // Dynamically calculate form completeness percentage
  const calculateCompleteness = () => {
    let requiredFields = 4; // Category, Name, Email, Message
    let filledFields = 0;

    if (category) filledFields++;
    if (senderName.trim()) filledFields++;
    if (senderEmail.trim()) filledFields++;
    if (message.trim()) filledFields++;

    // Add category-specific custom required fields
    if (['DIRECTORY LISTING INQUIRY', 'BUSINESS COLLABORATION PROPOSAL', 'SPONSORSHIP & ADVERTISEMENT', 'AFFILIATION DISPATCH', 'UNETHICAL PLATFORM CORRECTION REQUEST', 'REGULATOR DECREE ADVISORY', 'GENERAL TROUBLESHOOTING ENQUIRY'].includes(category)) {
      requiredFields++;
      if (projectPlatformName.trim()) filledFields++;
    }

    if (category === 'SPONSORSHIP & ADVERTISEMENT') {
      requiredFields++;
      if (adBudgetOrChannels.trim()) filledFields++;
    }

    return Math.round((filledFields / requiredFields) * 100);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !senderEmail.trim() || !message.trim()) {
      return;
    }

    // Validation for conditional custom fields
    if (['DIRECTORY LISTING INQUIRY', 'BUSINESS COLLABORATION PROPOSAL', 'SPONSORSHIP & ADVERTISEMENT', 'AFFILIATION DISPATCH', 'UNETHICAL PLATFORM CORRECTION REQUEST', 'REGULATOR DECREE ADVISORY', 'GENERAL TROUBLESHOOTING ENQUIRY'].includes(category) && !projectPlatformName.trim()) {
      return;
    }

    if (category === 'SPONSORSHIP & ADVERTISEMENT' && !adBudgetOrChannels.trim()) {
      return;
    }

    setIsTransmitting(true);
    setTransmissionLogs([]);
    setTransmissionSuccess(false);

    // Simulated transmission sequences
    const sequences = [
      'Establishing Secure-SSL Ingress handshake...',
      'Mapping cryptographic entry vector pathways...',
      'Opening isolated sandboxed node wrapper...',
      'Verifying sender parity authentication signatures...',
      'Encrypting dispatch specs with Swiss-Grade PGP Armour...',
      'Writing secure index parameters into Localized Ledger... Complete.'
    ];

    sequences.forEach((log, index) => {
      setTimeout(() => {
        setTransmissionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${log}`]);
        
        // Final sequence callback
        if (index === sequences.length - 1) {
          setTimeout(() => {
            const newTicket: ContactTicket = {
              id: `ticket-${Math.random().toString(36).substr(2, 4)}`,
              senderName: senderName.trim().toUpperCase(),
              senderEmail: senderEmail.trim(),
              category,
              priority,
              referenceLink: referenceLink.trim() || undefined,
              message: message.trim(),
              timestamp: new Date().toUTCString(),
              transmissionHash: generateHash(),
              status: priority === 'CRITICAL' ? 'ISOLATED IN SANDBOX' : 'SUCCESSFULLY ENCRYPTED',
              projectPlatformName: projectPlatformName.trim() || undefined,
              listingInquiryTier: category === 'DIRECTORY LISTING INQUIRY' ? listingInquiryTier : undefined,
              adBudgetOrChannels: category === 'SPONSORSHIP & ADVERTISEMENT' ? adBudgetOrChannels.trim() : undefined,
              collabType: ['BUSINESS COLLABORATION PROPOSAL', 'AFFILIATION DISPATCH', 'UNETHICAL PLATFORM CORRECTION REQUEST', 'REGULATOR DECREE ADVISORY', 'GENERAL TROUBLESHOOTING ENQUIRY'].includes(category) ? collabType : undefined,
              audienceReach: ['SPONSORSHIP & ADVERTISEMENT', 'AFFILIATION DISPATCH'].includes(category) ? audienceReach.trim() : undefined
            };

            const updated = [newTicket, ...savedTickets];
            setSavedTickets(updated);
            localStorage.setItem('csg_contact_tickets', JSON.stringify(updated));

            setIsTransmitting(false);
            setTransmissionSuccess(true);
            setCurrentFormStep(1);
            
            // Clear inputs
            setSenderName('');
            setSenderEmail('');
            setReferenceLink('');
            setMessage('');
            setProjectPlatformName('');
            setListingInquiryTier('Primary Regulated Exchange Ledger');
            setAdBudgetOrChannels('');
            setCollabType('Academic Cyber-Forensics Research Co-Authorship');
            setAudienceReach('');
          }, 600);
        }
      }, (index + 1) * 350);
    });
  };

  // Inquiry channel configurations
  const channels = [
    { 
      id: 'DIRECTORY LISTING INQUIRY', 
      label: 'Directory Submission', 
      desc: 'Add coins/exchanges to our global registers.',
      icon: BookOpen, 
      color: 'border-blue-600 hover:bg-blue-50/20 text-blue-800'
    },
    { 
      id: 'BUSINESS COLLABORATION PROPOSAL', 
      label: 'Team Collaboration', 
      desc: 'Joint cyber-forensic research & open campaigns.',
      icon: Handshake, 
      color: 'border-emerald-600 hover:bg-emerald-50/20 text-emerald-800'
    },
    { 
      id: 'SPONSORSHIP & ADVERTISEMENT', 
      label: 'Sponsorship & Ads', 
      desc: 'Secure hero banners & certified placements.',
      icon: Megaphone, 
      color: 'border-orange-600 hover:bg-orange-50/20 text-[#ab3600]'
    },
    { 
      id: 'AFFILIATION DISPATCH', 
      label: 'Ecosystem Alliance', 
      desc: 'Hardware safety embeds and portal syndications.',
      icon: Globe, 
      color: 'border-amber-600 hover:bg-amber-50/20 text-amber-800'
    },
    { 
      id: 'CRITICAL THREAT EXPLOIT DISCLOSURE', 
      label: 'Exploit Disclosure', 
      desc: 'Report live smart contract bugs & wallet drains.',
      icon: Shield, 
      color: 'border-red-600 hover:bg-red-50/20 text-red-800'
    },
    { 
      id: 'UNETHICAL PLATFORM CORRECTION REQUEST', 
      label: 'Review Correction', 
      desc: 'Dispute platform data or update security states.',
      icon: Layers, 
      color: 'border-cyan-600 hover:bg-cyan-50/20 text-cyan-800'
    },
    { 
      id: 'REGULATOR DECREE ADVISORY', 
      label: 'Regulatory Decree', 
      desc: 'Submit national central bank decrees & warnings.',
      icon: AlertTriangle, 
      color: 'border-indigo-600 hover:bg-indigo-50/20 text-indigo-800'
    },
    { 
      id: 'GENERAL TROUBLESHOOTING ENQUIRY', 
      label: 'General Questions', 
      desc: 'Guidelines guidelines, media queries or updates.',
      icon: FileQuestion, 
      color: 'border-neutral-500 hover:bg-neutral-50/20 text-gray-800'
    },
  ];

  // Specific guidelines context for selected categories
  const getCategoryGuideline = () => {
    switch (category) {
      case 'DIRECTORY LISTING INQUIRY':
        return {
          title: 'GUIDELINES FOR SUBMITTING LISTINGS',
          points: [
            'All submits are vetted physically by our decentralized node network.',
            'Requires active, continuous operation of at least 90 days prior to applying.',
            'Providing a public source code repository speeds up clearance rates.',
          ],
          alert: 'Only official project core representatives should request Regulated Exchange listings.'
        };
      case 'BUSINESS COLLABORATION PROPOSAL':
        return {
          title: 'COLLABORATION & DISPATCH CRITERIA',
          points: [
            'We actively co-author academic reports on digital asset security.',
            'Open-source developers can submit native safety library pull requests.',
            'No commercial venture deals accepted. We operate entirely unaligned.',
          ],
          alert: 'All team dispatches receive cryptographic acknowledgements within 48 hours.'
        };
      case 'SPONSORSHIP & ADVERTISEMENT':
        return {
          title: 'SPONSORSHIP & MEDIA POLICIES',
          points: [
            'Approved media sponsors must undergo rigorous security screening.',
            'Placements include the global hero alert slots or community alerts tags.',
            'CSG remains structurally immune to sponsor influence or review biases.',
          ],
          alert: 'Promotional content is labeled transparently as security sponsorship blocks.'
        };
      case 'AFFILIATION DISPATCH':
        return {
          title: 'AFFILIATE KEY PRINCIPLES',
          points: [
            'Syndications are reserved for solid certified security brands.',
            'Offline hardware safe integration embeds receive flat zero-fee structures.',
            'Referral programs must align directly with threat-preventative assets.',
          ],
          alert: 'Affiliation routes do not compromise consumer security audits in any form.'
        };
      case 'CRITICAL THREAT EXPLOIT DISCLOSURE':
        return {
          title: 'COORDINATED VULNERABILITY POLICY',
          points: [
            'Full burner profile submission is recommended to maintain client anonymity.',
            'We hold reported vectors strictly offline in air-gapped forensic arrays.',
            'CSG coordinates with platform devs first to prevent direct public leaks.',
          ],
          alert: 'Urgent exploit dispatches bypass standard triage and alert nodes 24/7/365.'
        };
      default:
        return {
          title: 'STANDARD INGRESS NOTICE',
          points: [
            'Double-check your response email coordinate so our handlers can reply.',
            'Clear descriptions ensure rapid sorting and routing of incoming tickets.',
            'Data remains fully local in your browser sandbox until transmitted.'
          ],
          alert: 'Standard queue inquiries are resolved in chronologically received order.'
        };
    }
  };

  // Steps description array
  const stepsList = [
    { id: 1, label: 'CHANNEL', desc: 'Secure Ingress Port', icon: Layers },
    { id: 2, label: 'COORDINATES', desc: 'Secure Identity', icon: Lock },
    { id: 3, label: 'REGISTRY META', desc: 'Platform Parameters', icon: Sparkles },
    { id: 4, label: 'MEMORANDUM', desc: 'Certify & Transmit', icon: Send },
  ];

  const isStep2Valid = () => {
    return senderName.trim().length > 0 && senderEmail.trim().length > 0 && senderEmail.includes('@');
  };

  const isStep3Valid = () => {
    const categoriesWithRequiredProject = [
      'DIRECTORY LISTING INQUIRY', 
      'BUSINESS COLLABORATION PROPOSAL', 
      'SPONSORSHIP & ADVERTISEMENT', 
      'AFFILIATION DISPATCH', 
      'UNETHICAL PLATFORM CORRECTION REQUEST', 
      'REGULATOR DECREE ADVISORY', 
      'GENERAL TROUBLESHOOTING ENQUIRY'
    ];
    
    if (categoriesWithRequiredProject.includes(category)) {
      return projectPlatformName.trim().length > 0;
    }
    return true;
  };

  const isStep4Valid = () => {
    return message.trim().length >= 10;
  };

  const handleNextStep = () => {
    if (currentFormStep === 1) {
      setCurrentFormStep(2);
    } else if (currentFormStep === 2) {
      if (isStep2Valid()) {
        setCurrentFormStep(3);
      }
    } else if (currentFormStep === 3) {
      if (isStep3Valid()) {
        setCurrentFormStep(4);
      }
    }
  };

  const handlePrevStep = () => {
    if (currentFormStep > 1) {
      setCurrentFormStep(currentFormStep - 1);
    }
  };

  const currentGuideline = getCategoryGuideline();
  const completeness = calculateCompleteness();

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 space-y-12" id="contact-port-layout">
      
      {/* HEADER BANNER SECTION */}
      <div className="bg-[#fffdf7] border-heavy p-6 md:p-8 neo-shadow relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        {/* Absolute Background Accent Design */}
        <div className="absolute top-0 right-0 h-full w-24 bg-[#0040e0]/5 skew-x-12 transform origin-top-right select-none pointer-events-none" />
        
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="bg-[#0040e0] text-white px-2 py-0.5 font-mono text-[9px] font-black uppercase tracking-widest leading-none border border-black rounded-none flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#72ff70] rounded-full animate-pulse" />
              CONTACT & COLLABORATION
            </span>
            <span className="font-mono text-[9.5px] font-bold text-gray-500 uppercase tracking-wider">
              SWISS SECURED COMM PORTAL
            </span>
          </div>
          <h2 className="font-sora text-2xl md:text-4xl font-black text-gray-[#1b1b1b] uppercase tracking-tight">
            Contact Page
          </h2>
          <p className="font-mono text-xs md:text-[13px] text-gray-600 leading-relaxed md:max-w-3xl">
            Proposing a crypto registry listing, coordinating a collaborative research campaign, arranging sponsor placements, or establishing alliances? Our secure multi-tier inquiry channels ensure clean, rapid routing with Swiss precision.
          </p>
        </div>

        {/* Dynamic Security Badging */}
        <div className="bg-[#efefff] border-2 border-black p-4 font-mono text-[10px] space-y-2 text-[#0040e0] shrink-0 w-full md:w-60 select-none neo-shadow-sm">
          <div className="flex items-center gap-2 font-black uppercase text-[#0040e0] text-xs">
            <Lock className="w-4 h-4" />
            <span>SECURED ENTRYWAY</span>
          </div>
          <p className="leading-snug text-[9px] text-gray-600 font-medium">
            Form is fully validated client-side and converted to closed logs. No cookies or personal data pools tracking applied.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: INTERACTIVE FORM & SIMULATOR LOGS (COL-SPAN-8) */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="bg-white border-heavy p-6 md:p-8 neo-shadow relative">
            
            {/* STAGE HEADER WITH PROGRESS */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4 mb-6 select-none">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-[#0040e0] shrink-0" />
                <div>
                  <h3 className="font-sora text-sm md:text-base font-black text-gray-900 uppercase leading-none">
                    Interactive Ingress Portal Specifier
                  </h3>
                  <p className="font-mono text-[10px] text-gray-400 uppercase mt-1">
                    Complete fields below to automatically pack details PGP format
                  </p>
                </div>
              </div>
              
              {/* SATISFYING PROGRESS GAUGE */}
              <div className="shrink-0 font-mono text-[11px] bg-[#efefff] border border-[#0040e0]/20 px-3 py-1.5 flex flex-col items-end gap-1 min-w-[150px]">
                <div className="flex items-center justify-between w-full font-black">
                  <span className="text-[#0040e0]">COMPLETENESS:</span>
                  <span>{completeness}%</span>
                </div>
                <div className="w-full bg-gray-200 h-1.5 rounded-none overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full transition-all duration-300"
                    style={{ width: `${completeness}%` }}
                  />
                </div>
              </div>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-6" id="secure-intelligence-form">
              {/* STEPPER PROGRESS TRACKING HEADER */}
              {/* Desktop Stepper */}
              <div className="hidden md:grid grid-cols-4 gap-2 border-b border-black pb-6 mb-6">
                {stepsList.map((s) => {
                  const StepIcon = s.icon;
                  const isActive = currentFormStep === s.id;
                  const isCompleted = s.id < currentFormStep;
                  const isLocked = s.id > currentFormStep;
                  
                  let bgClass = 'bg-gray-50 border-gray-200 text-gray-400 border-dashed';
                  if (isActive) {
                    bgClass = 'bg-[#efefff] border-[#0040e0] text-[#0040e0] shadow-[2px_2px_0px_rgba(0,0,0,1)] font-extrabold';
                  } else if (isCompleted) {
                    bgClass = 'bg-[#d2ffdb] border-[#006e16] text-[#006e16]';
                  }

                  return (
                    <button
                      key={s.id}
                      type="button"
                      disabled={isLocked}
                      onClick={() => {
                        if (!isLocked) setCurrentFormStep(s.id);
                      }}
                      className={`text-left p-2.5 border-2 transition-all font-mono select-none relative ${bgClass} ${!isLocked ? 'cursor-pointer hover:border-black' : 'cursor-not-allowed'}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] opacity-60 font-black">0{s.id}</span>
                        {isCompleted ? (
                          <Check className="w-3.5 h-3.5 animate-pulse" />
                        ) : (
                          <StepIcon className="w-3.5 h-3.5" />
                        )}
                      </div>
                      <div className="mt-1">
                        <div className="text-[10px] font-black tracking-tight leading-none uppercase">{s.label}</div>
                        <div className="text-[8.5px] opacity-70 leading-normal mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">{s.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Mobile Stepper */}
              <div className="flex md:hidden flex-col gap-2 border-b border-black/10 pb-4 mb-4 select-none">
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="font-black text-gray-500 uppercase">
                    STEP {currentFormStep} OF 4: {stepsList[currentFormStep - 1].label}
                  </span>
                  <span className="bg-black text-white px-2 py-0.5 rounded-none font-black">
                    {currentFormStep * 25}%
                  </span>
                </div>
                <div className="w-full bg-gray-100 h-2 border border-black overflow-hidden relative">
                  <div 
                    className="bg-black h-full transition-all duration-300"
                    style={{ width: `${currentFormStep * 25}%` }}
                  />
                  <div className="absolute inset-0 flex justify-between pointer-events-none select-none">
                    <div className="w-px h-full bg-black/15" style={{ left: '25%' }} />
                    <div className="w-px h-full bg-black/15" style={{ left: '50%' }} />
                    <div className="w-px h-full bg-black/15" style={{ left: '75%' }} />
                  </div>
                </div>
              </div>

              {/* ACTIVE STEP PANES */}
              <AnimatePresence mode="wait">
                {currentFormStep === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.15 }}
                    className="space-y-4"
                  >
                    <div className="bg-[#efefff]/30 border-l-4 border-[#0040e0] p-4 font-mono text-[11px] leading-relaxed select-none">
                      <span className="font-bold text-[#0040e0] uppercase block mb-1">SELECT SECTOR CHANNELS</span>
                      Select the matching category channel below that best aligns with your ingress details. This ensures appropriate Swiss cryptographic routing priority.
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {channels.map((chan) => {
                        const isSelected = category === chan.id;
                        const IconComp = chan.icon;
                        return (
                          <button
                            key={chan.id}
                            type="button"
                            onClick={() => {
                              setCategory(chan.id);
                              setProjectPlatformName('');
                              if (chan.id === 'DIRECTORY LISTING INQUIRY') {
                                setListingInquiryTier('Primary Regulated Exchange Ledger');
                              } else if (chan.id === 'BUSINESS COLLABORATION PROPOSAL') {
                                setCollabType('Academic Cyber-Forensics Research Co-Authorship');
                              } else if (chan.id === 'AFFILIATION DISPATCH') {
                                setCollabType('Referral & Hardware Widget Integration');
                              } else if (chan.id === 'UNETHICAL PLATFORM CORRECTION REQUEST') {
                                setCollabType('Dispute Ledger Rating');
                              } else if (chan.id === 'REGULATOR DECREE ADVISORY') {
                                setCollabType(' sovereign Central Bank Decree Notification');
                              } else if (chan.id === 'GENERAL TROUBLESHOOTING ENQUIRY') {
                                setCollabType('General Inquiry / Tech Assistance');
                              }
                            }}
                            className={`text-left p-3.5 border-2 transition-all cursor-pointer font-mono flex gap-3 items-start select-none h-full ${
                              isSelected 
                                ? 'border-black bg-[#efefff] shadow-[3px_3px_0px_rgba(0,0,0,1)] ring-1 ring-black' 
                                : 'border-neutral-200 bg-white hover:-translate-y-0.5 hover:border-black hover:neo-shadow-xs'
                            }`}
                            id={`channel-btn-${chan.id.replace(/\s+/g, '-').toLowerCase()}`}
                          >
                            <div className={`p-1.5 border border-black shrink-0 ${isSelected ? 'bg-black text-[#72ff70]' : 'bg-neutral-50 text-gray-400'}`}>
                              <IconComp className="w-4 h-4" />
                            </div>
                            <div className="space-y-0.5 min-w-0">
                              <h4 className="text-[11.5px] font-black text-gray-900 tracking-tight leading-snug">
                                {chan.label}
                              </h4>
                              <p className="text-[9.5px] leading-tight text-gray-500 font-medium truncate">
                                {chan.desc}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex justify-end pt-4 border-t border-gray-100 select-none">
                      <button
                        type="button"
                        onClick={() => setCurrentFormStep(2)}
                        className="px-5 py-3 border-2 border-black bg-black text-white font-mono text-[11px] font-black uppercase tracking-wider shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 cursor-pointer active:translate-y-0 flex items-center gap-1.5 group font-bold"
                      >
                        <span>CONFIRM CHANNEL & CONTINUE</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#72ff70]" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {currentFormStep === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.15 }}
                    className="space-y-4"
                  >
                    <div className="bg-[#efefff]/30 border-l-4 border-[#0040e0] p-4 font-mono text-[11px] leading-relaxed select-none">
                      <span className="font-bold text-[#0040e0] uppercase block mb-1">SECURE IDENTITY & COORDINATES</span>
                      Please define your profile handle or company alias, followed by a valid active endpoint email so our Swiss compliance triaging officers can respond.
                    </div>

                    <div className="space-y-4 font-mono">
                      {/* Name Input */}
                      <div className="space-y-1.5 text-left">
                        <div className="flex justify-between items-center text-[10px] leading-none">
                          <label htmlFor="input-sender-name" className="font-black text-gray-700 uppercase tracking-wider">
                            YOUR NAME / COMPANY: <span className="text-red-500">*</span>
                          </label>
                          {senderName.trim() && <span className="text-emerald-600 font-bold flex items-center gap-1">✔ VALID</span>}
                        </div>
                        <div className="relative flex items-center bg-gray-50 border border-black focus-within:bg-white focus-within:border-[#0040e0] transition-colors duration-150">
                          <span className="px-3 border-r border-black font-mono text-[10px] text-gray-400 select-none bg-neutral-100 py-2.5 font-bold">NAME</span>
                          <input
                            id="input-sender-name"
                            type="text"
                            required
                            value={senderName}
                            disabled={isTransmitting}
                            onChange={(e) => setSenderName(e.target.value)}
                            onFocus={() => setFocusedField('senderName')}
                            onBlur={() => setFocusedField(null)}
                            placeholder="e.g. Sarah Connor / Cyber Security Inc."
                            className="w-full px-3 py-2.5 text-xs text-gray-900 bg-transparent placeholder-gray-400 focus:outline-none"
                          />
                        </div>
                        {focusedField === 'senderName' && (
                          <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-[9.5px] text-[#0040e0] font-medium leading-tight">
                            💡 Specify your full personal handle or official business corporate label so we can route appropriately.
                          </motion.div>
                        )}
                      </div>

                      {/* Email Input */}
                      <div className="space-y-1.5 text-left">
                        <div className="flex justify-between items-center text-[10px] leading-none">
                          <label htmlFor="input-sender-email" className="font-black text-gray-700 uppercase tracking-wider">
                            ACTIVE CONTACT EMAIL: <span className="text-red-500">*</span>
                          </label>
                          {senderEmail.trim() && senderEmail.includes('@') ? (
                            <span className="text-emerald-600 font-bold flex items-center gap-1">✔ VALID</span>
                          ) : senderEmail.trim() ? (
                            <span className="text-red-500 font-bold">INVALID FORMAT</span>
                          ) : null}
                        </div>
                        <div className="relative flex items-center bg-gray-50 border border-black focus-within:bg-white focus-within:border-[#0040e0] transition-colors duration-150">
                          <span className="px-3 border-r border-black font-mono text-[10px] text-gray-400 select-none bg-neutral-100 py-2.5 font-bold">EMAIL</span>
                          <input
                            id="input-sender-email"
                            type="email"
                            required
                            value={senderEmail}
                            disabled={isTransmitting}
                            onChange={(e) => setSenderEmail(e.target.value)}
                            onFocus={() => setFocusedField('senderEmail')}
                            onBlur={() => setFocusedField(null)}
                            placeholder="e.g. security-handler@yourcorp.com"
                            className="w-full px-3 py-2.5 text-xs text-gray-900 bg-transparent placeholder-gray-400 focus:outline-none"
                          />
                        </div>
                        {focusedField === 'senderEmail' && (
                          <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-[9.5px] text-[#0040e0] font-medium leading-tight">
                            💡 Where our Swiss compliance officers will reply. Burner accounts (e.g. Proton) are supported.
                          </motion.div>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between pt-6 border-t border-gray-100 font-mono select-none">
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="px-4 py-2.5 border-2 border-neutral-300 hover:border-black text-gray-700 hover:text-black font-black text-[11px] uppercase tracking-wider flex items-center gap-1.5 cursor-pointer active-press bg-white font-bold"
                      >
                        ← SELECT CHANNEL
                      </button>
                      <button
                        type="button"
                        disabled={!isStep2Valid()}
                        onClick={handleNextStep}
                        className={`px-5 py-2.5 border-2 font-black text-[11px] uppercase tracking-wider flex items-center gap-1.5 cursor-pointer active-press font-bold ${
                          isStep2Valid()
                            ? 'border-black bg-black text-white shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5'
                            : 'border-neutral-200 bg-neutral-100 text-neutral-400 cursor-not-allowed'
                        }`}
                      >
                        <span>CONFIG REQUISITES</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {currentFormStep === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.15 }}
                    className="space-y-4"
                  >
                    <div className="bg-[#efefff]/30 border-l-4 border-[#0040e0] p-4 font-mono text-[11px] leading-relaxed select-none">
                      <span className="font-bold text-[#0040e0] uppercase block mb-1">ADD SPECIFIC CONFIGURATION DETAILS</span>
                      Custom parameters corresponding to the chosen channel route. Please configure target platforms and tier metrics below.
                    </div>

                    <div className="space-y-3 pt-2">
                        {/* DIRECTORY SUBMISSION SPECIFICS */}
                        {category === 'DIRECTORY LISTING INQUIRY' && (
                          <div className="border-2 border-black bg-[#efefff]/20 p-4 space-y-4 rounded-none h-auto neo-shadow-sm font-mono text-left">
                            <div className="flex items-center gap-1.5 text-[9.5px] text-[#0040e0] font-extrabold uppercase tracking-wider">
                              <BookOpen className="w-4 h-4" />
                              Platform Directory Ingress Metadata
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <label htmlFor="input-project-name" className="block text-[9px] font-black text-gray-600 uppercase tracking-wider">
                                  PLATFORM / PROJECT / COIN NAME: <span className="text-red-600">*</span>
                                </label>
                                <input
                                  id="input-project-name"
                                  type="text"
                                  required
                                  value={projectPlatformName}
                                  disabled={isTransmitting}
                                  onChange={(e) => setProjectPlatformName(e.target.value)}
                                  placeholder="e.g. NairaPeer-Swap Premium"
                                  className="w-full bg-white border border-black px-3 py-2.5 text-xs focus:outline-none animate-all"
                                />
                                <p className="text-[9px] text-gray-400">💡 Direct public label of your asset protocol.</p>
                              </div>
                              <div className="space-y-1.5">
                                <label htmlFor="select-listing-tier" className="block text-[9px] font-black text-gray-600 uppercase tracking-wider">
                                  CHANNELS PLACEMENT MATRIX:
                                </label>
                                <select
                                  id="select-listing-tier"
                                  value={listingInquiryTier}
                                  disabled={isTransmitting}
                                  onChange={(e) => setListingInquiryTier(e.target.value)}
                                  className="w-full bg-white border border-black p-2.5 text-xs focus:outline-none"
                                >
                                  <option value="Primary Regulated Exchange Ledger">Primary Regulated Exchange Index</option>
                                  <option value="Secondary Retail & Defi Custodian Directory">Secondary DeFi Custodian Mirror</option>
                                  <option value="Localized Regional Peer-to-Peer Mirror">Localized Sovereign Peer-to-Peer Mirror</option>
                                  <option value="Vetted Offline Air-gapped Hardware Portal">Vetted Swiss Hardware Vault Portal</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* COOP BUSINESS PARTNERSHIP SPECIFICS */}
                        {category === 'BUSINESS COLLABORATION PROPOSAL' && (
                          <div className="border-2 border-black bg-[#d2ffdb]/20 p-4 space-y-4 rounded-none h-auto neo-shadow-sm font-mono text-left">
                            <div className="flex items-center gap-1.5 text-[9.5px] text-[#006e16] font-extrabold uppercase tracking-wider">
                              <Handshake className="w-4 h-4" />
                              Cooperative Joint Organization Details
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <label htmlFor="input-collab-org" className="block text-[9px] font-black text-gray-600 uppercase tracking-wider">
                                  ASSOCIATED INCUBATOR / ENTITY LEGAL NAME: <span className="text-red-600">*</span>
                                </label>
                                <input
                                  id="input-collab-org"
                                  type="text"
                                  required
                                  value={projectPlatformName}
                                  disabled={isTransmitting}
                                  onChange={(e) => setProjectPlatformName(e.target.value)}
                                  placeholder="e.g. Zurich Cryptography Department"
                                  className="w-full bg-white border border-black px-3 py-2.5 text-xs focus:outline-none"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <label htmlFor="select-collab-type" className="block text-[9px] font-black text-gray-600 uppercase tracking-wider">
                                  COLLABORATION CAMPAIGN MATRIX:
                                </label>
                                <select
                                  id="select-collab-type"
                                  value={collabType}
                                  disabled={isTransmitting}
                                  onChange={(e) => setCollabType(e.target.value)}
                                  className="w-full bg-white border border-black p-2.5 text-xs focus:outline-none"
                                >
                                  <option value="Academic Cyber-Forensics Research Co-Authorship">Academic Forensic Research Paper</option>
                                  <option value="Cooperative Educational Community Campaign">Educational Grassroots Campaigns</option>
                                  <option value="Database API Mirroring & Global Threat Feeds">Threat Feed Real-Time API Hook</option>
                                  <option value="Open Source Developer Code Contribution">Rust/TypeScript Code contributions</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* SPONSOR & ADS SPECIFICS */}
                        {category === 'SPONSORSHIP & ADVERTISEMENT' && (
                          <div className="border-2 border-black bg-[#fff3ea]/40 p-4 space-y-4 rounded-none h-auto neo-shadow-sm font-mono text-left">
                            <div className="flex items-center gap-1.5 text-[9.5px] text-[#ab3600] font-extrabold uppercase tracking-wider">
                              <Megaphone className="w-4 h-4" />
                              Sponsorship Placement details
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="space-y-1.5">
                                <label htmlFor="input-ad-sponsor" className="block text-[9px] font-black text-gray-600 uppercase tracking-wider">
                                  SPONSORING COMPANY LABEL: <span className="text-red-355">*</span>
                                </label>
                                <input
                                  id="input-ad-sponsor"
                                  type="text"
                                  required
                                  value={projectPlatformName}
                                  disabled={isTransmitting}
                                  onChange={(e) => setProjectPlatformName(e.target.value)}
                                  placeholder="e.g. LedgerVault Switzerland"
                                  className="w-full bg-white border border-black px-3 py-2.5 text-xs focus:outline-none"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <label htmlFor="input-ad-channels" className="block text-[9px] font-black text-gray-600 uppercase tracking-wider">
                                  PLACEMENT TARGET LINK: <span className="text-red-355">*</span>
                                </label>
                                <input
                                  id="input-ad-channels"
                                  type="text"
                                  required
                                  value={adBudgetOrChannels}
                                  disabled={isTransmitting}
                                  onChange={(e) => setAdBudgetOrChannels(e.target.value)}
                                  placeholder="e.g. Global Top Banner Slot"
                                  className="w-full bg-white border border-black px-3 py-2.5 text-xs focus:outline-none"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <label htmlFor="input-ad-reach" className="block text-[9px] font-black text-gray-600 uppercase tracking-wider">
                                  EXPECTED MONTHLY BUDGET:
                                </label>
                                <input
                                  id="input-ad-reach"
                                  type="text"
                                  value={audienceReach}
                                  disabled={isTransmitting}
                                  onChange={(e) => setAudienceReach(e.target.value)}
                                  placeholder="e.g. $2,000/month (Estimated)"
                                  className="w-full bg-white border border-black px-3 py-2.5 text-xs focus:outline-none"
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* AFFILIATIONS SPECIFICS */}
                        {category === 'AFFILIATION DISPATCH' && (
                          <div className="border-2 border-black bg-[#fffdf7] p-4 space-y-4 rounded-none h-auto neo-shadow-sm font-mono text-left">
                            <div className="flex items-center gap-1.5 text-[9.5px] text-amber-700 font-extrabold uppercase tracking-wider">
                              <Globe className="w-4 h-4" />
                              Syndication Affiliate specifics
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <label htmlFor="input-aff-name" className="block text-[9px] font-black text-gray-600 uppercase tracking-wider">
                                  AFFILIATE BRAND INTEGRATOR: <span className="text-red-600">*</span>
                                </label>
                                <input
                                  id="input-aff-name"
                                  type="text"
                                  required
                                  value={projectPlatformName}
                                  disabled={isTransmitting}
                                  onChange={(e) => setProjectPlatformName(e.target.value)}
                                  placeholder="e.g. Swiss Key Vault GMBH"
                                  className="w-full bg-white border border-black px-3 py-2.5 text-xs focus:outline-none"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <label htmlFor="select-aff-method" className="block text-[9px] font-black text-gray-600 uppercase tracking-wider">
                                  ALLIANCE COOP CHANNEL:
                                </label>
                                <select
                                  id="select-aff-method"
                                  value={collabType}
                                  disabled={isTransmitting}
                                  onChange={(e) => setCollabType(e.target.value)}
                                  className="w-full bg-white border border-black p-2.5 text-xs focus:outline-none"
                                >
                                  <option value="Referral & Hardware Widget Integration">Referral embeds & hardware portal linkups</option>
                                  <option value="Exclusive Forensic Repository Syndication">Exclusive forensic mirror API widgets</option>
                                  <option value="Regional Safety Mirror Sponsorship">Regional Swiss mirror server sponsorship</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* PLATFORM CORRECTION DISPUTES */}
                        {category === 'UNETHICAL PLATFORM CORRECTION REQUEST' && (
                          <div className="border-2 border-black bg-cyan-50/10 p-4 space-y-4 rounded-none h-auto neo-shadow-sm font-mono text-left">
                            <div className="flex items-center gap-1.5 text-[9.5px] text-cyan-800 font-extrabold uppercase tracking-wider">
                              <Layers className="w-4 h-4" />
                              Fact Sheet Review Correction Dispute
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <label htmlFor="input-corr-platform" className="block text-[9px] font-black text-gray-600 uppercase tracking-wider">
                                  TARGET PLATFORM SUBJECT NAME: <span className="text-red-500">*</span>
                                </label>
                                <input
                                  id="input-corr-platform"
                                  type="text"
                                  required
                                  value={projectPlatformName}
                                  disabled={isTransmitting}
                                  onChange={(e) => setProjectPlatformName(e.target.value)}
                                  placeholder="e.g. Coinbase Swiss Desk"
                                  className="w-full bg-white border border-black px-3 py-2.5 text-xs focus:outline-none"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <label htmlFor="select-corr-action" className="block text-[9px] font-black text-gray-600 uppercase tracking-wider">
                                  DESIRED ADJUSTMENT MODE:
                                </label>
                                <select
                                  id="select-corr-action"
                                  value={collabType}
                                  disabled={isTransmitting}
                                  onChange={(e) => setCollabType(e.target.value)}
                                  className="w-full bg-white border border-black p-2.5 text-xs focus:outline-none"
                                >
                                  <option value="Dispute Ledger Rating">Dispute safety index evaluation rating</option>
                                  <option value="Update Outdated API Status">Correct factually outdated product specs</option>
                                  <option value="Request Fraud Warning Removal">Clarify completed regulator fixes of alert warnings</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* SOV REGULATORS WARNINGS UPDATES */}
                        {category === 'REGULATOR DECREE ADVISORY' && (
                          <div className="border-2 border-black bg-indigo-50/10 p-4 space-y-4 rounded-none h-auto neo-shadow-sm font-mono text-left">
                            <div className="flex items-center gap-1.5 text-[9.5px] text-indigo-800 font-extrabold uppercase tracking-wider">
                              <AlertTriangle className="w-4 h-4" />
                              Sovereign Regulation Alerts Archive Metadata
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <label htmlFor="input-reg-entity" className="block text-[9px] font-black text-gray-600 uppercase tracking-wider">
                                  ISSUING CENTRAL BANK / JURISDICTION DEPT: <span className="text-red-500">*</span>
                                </label>
                                <input
                                  id="input-reg-entity"
                                  type="text"
                                  required
                                  value={projectPlatformName}
                                  disabled={isTransmitting}
                                  onChange={(e) => setProjectPlatformName(e.target.value)}
                                  placeholder="e.g. FINMA Swiss Regulatory Council"
                                  className="w-full bg-white border border-black px-3 py-2.5 text-xs focus:outline-none"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <label htmlFor="select-reg-urgency" className="block text-[9px] font-black text-gray-600 uppercase tracking-wider">
                                  DECREE ADVICE SCALE:
                                </label>
                                <select
                                  id="select-reg-urgency"
                                  value={collabType}
                                  disabled={isTransmitting}
                                  onChange={(e) => setCollabType(e.target.value)}
                                  className="w-full bg-white border border-black p-2.5 text-xs focus:outline-none"
                                >
                                  <option value="Sovereign Sovereign Warning Release Advice">High-Alert Warning Enforcement</option>
                                  <option value="Jurisdiction Regional Guideline Change">Administrative Regulatory Restructuring</option>
                                  <option value="Court Precedent Settlement Advisory">Precedent Dispute Brief Advisory</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* GENERAL TROUBLESHOOT ENQUIRIES */}
                        {category === 'GENERAL TROUBLESHOOTING ENQUIRY' && (
                          <div className="border-2 border-black bg-neutral-50 p-4 space-y-4 rounded-none h-auto neo-shadow-sm font-mono text-left">
                            <div className="flex items-center gap-1.5 text-[9.5px] text-gray-700 font-extrabold uppercase tracking-wider">
                              <FileQuestion className="w-4 h-4" />
                              General Query Operational Context
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <label htmlFor="input-gen-scope" className="block text-[9px] font-black text-gray-600 uppercase tracking-wider">
                                  ASSOCIATED TOPIC OR PROJECT FOCUS: <span className="text-red-500">*</span>
                                </label>
                                <input
                                  id="input-gen-scope"
                                  type="text"
                                  required
                                  value={projectPlatformName}
                                  disabled={isTransmitting}
                                  onChange={(e) => setProjectPlatformName(e.target.value)}
                                  placeholder="e.g. Media interview, guide feedback, API limits"
                                  className="w-full bg-white border border-black px-3 py-2.5 text-xs focus:outline-none"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <label htmlFor="select-gen-priority" className="block text-[9px] font-black text-gray-600 uppercase tracking-wider">
                                  ESTIMATED TRIAGE URGENCY:
                                </label>
                                <select
                                  id="select-gen-priority"
                                  value={listingInquiryTier}
                                  disabled={isTransmitting}
                                  onChange={(e) => setListingInquiryTier(e.target.value)}
                                  className="w-full bg-white border border-black p-2.5 text-xs focus:outline-none"
                                >
                                  <option value="Primary Regulated Exchange Ledger">Low Urgency (Standard Queue)</option>
                                  <option value="Secondary Retail & Defi Custodian Directory">Medium Urgency (Direct Route)</option>
                                  <option value="Localized Regional Peer-to-Peer Mirror">Operational Blocking Support</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* CRITICAL THREAT EXPLOIT DISCLOSURE (NO CUSTOM FIELDS REQUIRED IN STEP 3) */}
                        {category === 'CRITICAL THREAT EXPLOIT DISCLOSURE' && (
                          <div className="border-2 border-red-200 bg-red-50/20 p-5 space-y-4 rounded-none h-auto neo-shadow-sm font-mono text-left">
                            <div className="flex items-center gap-2 text-xs font-black text-red-700 uppercase">
                              <Shield className="w-4 h-4 text-red-500" />
                              COORDINATED EXPLOIT DISCLOSURE PROTOCOL ACTIVE
                            </div>
                            <p className="text-[11px] text-gray-750 leading-relaxed font-bold">
                              Crypto Safety Global handles zero-day exploits, wallet drains, and smart contract flaws under strict air-gapped protection. 
                              No public-facing platform metadata is required during this step to protect your anonymity.
                            </p>
                            <div className="bg-white border border-black p-3.5 text-[9.5px] text-gray-500 leading-normal">
                              🛡 Swiss Sandboxed Encryption Wrapper is primed. In the next step, you will classify incident severity and draft your disclosure memorandum.
                            </div>
                          </div>
                        )}
                    </div>

                    <div className="flex justify-between pt-6 border-t border-gray-100 font-mono select-none">
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="px-4 py-2.5 border-2 border-neutral-300 hover:border-black text-gray-700 hover:text-black font-black text-[11px] uppercase tracking-wider flex items-center gap-1.5 cursor-pointer active-press bg-white font-bold"
                      >
                        ← SENDER IDENTITY
                      </button>
                      <button
                        type="button"
                        disabled={!isStep3Valid()}
                        onClick={handleNextStep}
                        className={`px-5 py-2.5 border-2 font-black text-[11px] uppercase tracking-wider flex items-center gap-1.5 cursor-pointer active-press font-bold ${
                          isStep3Valid()
                            ? 'border-black bg-black text-white shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5'
                            : 'border-neutral-200 bg-neutral-100 text-neutral-400 cursor-not-allowed'
                        }`}
                      >
                        <span>WRITE MEMORANDUM</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {currentFormStep === 4 && (
                  <motion.div
                    key="step-4"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.15 }}
                    className="space-y-4"
                  >
                    <div className="bg-[#efefff]/30 border-l-4 border-[#0040e0] p-4 font-mono text-[11px] leading-relaxed select-none">
                      <span className="font-bold text-[#0040e0] uppercase block mb-1">DRAFT MEMORANDUM & TRANSMIT DISPATCH</span>
                      Please define the specific objectives, technical briefs, or cooperative parameters. A minimum of 10 characters is required to certify translation.
                    </div>

                    <div className="space-y-4 font-mono text-left">
                      {/* OPTIONAL TARGET URL */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[10px] leading-none">
                          <label htmlFor="input-reference-link" className="font-black text-gray-700 uppercase tracking-wider">
                            OPTIONAL WEB ADDRESS OR TARGET PROTOCOL LINK:
                          </label>
                          <span className="text-[9px] text-gray-400">OPTIONAL GATEWAY</span>
                        </div>
                        <div className="relative flex items-center bg-gray-50 border border-black focus-within:bg-white focus-within:border-[#0040e0] transition-colors duration-150">
                          <span className="px-3 border-r border-black font-mono text-[10px] text-gray-400 select-none bg-neutral-100 py-2.5 font-bold">HTTPS</span>
                          <input
                            id="input-reference-link"
                            type="url"
                            value={referenceLink}
                            disabled={isTransmitting}
                            onChange={(e) => setReferenceLink(e.target.value)}
                            placeholder="e.g. https://yourbrand.com/whitepaper or 0x8a9bf..."
                            className="w-full px-3 py-2.5 text-xs text-gray-900 bg-transparent placeholder-gray-400 focus:outline-none"
                          />
                        </div>
                        <p className="text-[9px] text-gray-400">💡 Enter your home link, documentation target, token address, or suspicious site link.</p>
                      </div>

                      {/* DETAILED INGESTION MESSAGE */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[10px] leading-none">
                          <label htmlFor="textarea-message" className="font-black text-gray-700 uppercase tracking-wider">
                            MESSAGE / PROPOSAL SPECIFICATION TEXT: <span className="text-red-500">*</span>
                          </label>
                          {message.trim().length >= 10 ? (
                            <span className="text-emerald-600 font-bold">✔ READY</span>
                          ) : (
                            <span className="text-red-500 font-bold">[REQUIRED - MIN 10 CHARS]</span>
                          )}
                        </div>
                        <textarea
                          id="textarea-message"
                          required
                          rows={4}
                          value={message}
                          disabled={isTransmitting}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Clearly describe your submission! Provide complete context on platform parameters, directory rating appeals, sponsorship goals, budget distributions, or joint collaboration drafts."
                          className="w-full p-4 bg-gray-50 border border-black font-mono text-xs text-gray-900 focus:bg-white focus:border-[#0040e0] focus:outline-none resize-y placeholder-gray-400 min-h-[140px]"
                        />
                        <p className="text-[9px] text-gray-400">💡 Keep descriptions precise and clear to allow rapid Swiss sorting.</p>
                      </div>

                      {/* SIG INT LEVEL ACTION SLIDER OR DISPATCH RADIO */}
                      {category === 'CRITICAL THREAT EXPLOIT DISCLOSURE' && (
                        <div className="space-y-1.5 border-l-4 border-red-500 bg-red-50/20 p-3.5 select-none">
                          <span className="block font-mono text-[9px] font-black text-red-700 uppercase tracking-wider">
                            ⚠ INTEL SECURITY URGENCY CLASSIFICATION
                          </span>
                          <p className="text-[10px] text-gray-600 leading-tight mb-2">
                            Classify whether this report holds a standard phishing scam warning or a zero-day exploit risk.
                          </p>
                          <div className="flex border border-black overflow-hidden h-10 w-full text-xs">
                            <button
                              type="button"
                              onClick={() => setPriority('STANDARD')}
                              className={`flex-1 transition-all flex items-center justify-center cursor-pointer font-black text-[10px] uppercase ${
                                priority === 'STANDARD' ? 'bg-black text-white' : 'bg-white text-gray-500'
                              }`}
                            >
                              STANDARD PHISHING SCAM
                            </button>
                            <button
                              type="button"
                              onClick={() => setPriority('CRITICAL')}
                              className={`flex-1 transition-all flex items-center justify-center cursor-pointer font-black text-[10px] uppercase ${
                                priority === 'CRITICAL' ? 'bg-red-600 text-white border-l border-black' : 'bg-white text-gray-500 border-l border-black'
                              }`}
                            >
                              🚨 ACTIVE HEAVY-DUTY EXPLOIT
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center pt-6 border-t border-gray-100 gap-4 font-mono select-none">
                      <button
                        type="button"
                        disabled={isTransmitting}
                        onClick={handlePrevStep}
                        className="px-4 py-2.5 border-2 border-neutral-300 hover:border-black text-gray-700 hover:text-black font-black text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer active-press bg-white disabled:opacity-55 font-bold"
                      >
                        ← INPUT SPECIFICS
                      </button>

                      {/* TRANSMIT BUTTON */}
                      <button
                        type="submit"
                        disabled={isTransmitting || !isStep4Valid()}
                        className={`py-3.5 px-6 border-heavy text-xs font-black uppercase tracking-widest transition-all duration-150 cursor-pointer active-press flex items-center justify-center gap-2.5 group font-bold ${
                          isTransmitting || !isStep4Valid()
                            ? 'bg-neutral-200 text-gray-400 cursor-not-allowed border-neutral-300 shadow-none -translate-x-0 -translate-y-0'
                            : 'bg-black text-white hover:bg-neutral-900 shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:translate-y-0'
                        }`}
                        id="transmission-secure-submit-btn"
                      >
                        <Send className={`w-4 h-4 text-[#72ff70] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform ${isTransmitting ? 'animate-pulse' : ''}`} />
                        <span>{isTransmitting ? 'ENCRYPTING DISPATCH...' : 'TRANSMIT SECURED DISPATCH'}</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>

            {/* Simulated Live Terminal output stream */}
            <AnimatePresence>
              {isTransmitting && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 bg-black border-2 border-[#72ff70] p-4 font-mono text-[10px] text-[#72ff70] space-y-2 overflow-hidden"
                  id="terminal-transmission-simulator"
                >
                  <div className="flex items-center justify-between border-b border-[#72ff70]/30 pb-1.5 mb-2 uppercase font-black tracking-widest text-[#72ff70]">
                    <span>SECURE NODE ROUTER INGRESS DISPATCH LOG</span>
                    <span className="animate-ping bg-[#72ff70] w-1.5 h-1.5 rounded-full" />
                  </div>
                  <div className="space-y-1">
                    {transmissionLogs.map((log, index) => (
                      <div key={index} className="leading-relaxed whitespace-nowrap overflow-hidden text-ellipsis block">
                        &gt; {log}
                      </div>
                    ))}
                    <div className="flex items-center gap-1.5 mt-3 text-white font-black">
                      <span className="animate-bounce">●</span>
                      <span>STREAMING CRYPTOGRAPHIC HANDSHAKE ...</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success indicator alert box */}
            <AnimatePresence>
              {transmissionSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="mt-6 bg-[#d2ffdb] border-2 border-[#006e16] p-4.5 font-mono text-xs text-gray-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 select-none neo-shadow-sm"
                  id="transmission-success-toast"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5 sm:mt-0" />
                    <div className="space-y-1">
                      <h4 className="font-extrabold uppercase leading-none text-emerald-800">TRANSMISSION COMPLETED SECURELY</h4>
                      <p className="text-[11px] text-gray-700 font-bold uppercase tracking-wide leading-relaxed">
                        PGP-Encrypted wrapper is built and stored in the local sandbox ledger. Scan your active memo record from the log ledger list below!
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setTransmissionSuccess(false);
                      const ledgerEl = document.getElementById('saved-sandbox-ledger-container');
                      if (ledgerEl) {
                        ledgerEl.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="text-[10px] font-black underline hover:text-[#006e16] cursor-pointer shrink-0 uppercase tracking-widest border border-black/10 bg-white/50 px-2.5 py-1"
                  >
                    VIEW LEDGER LOGS ↓
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* SANDBOXED INGESTED TICKETS LEDGER LOGS (LOCAL) */}
          <div className="bg-white border-heavy p-6 md:p-8 neo-shadow space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 mb-2 select-none">
              <div className="flex items-center gap-3">
                <div className="bg-black border border-black text-[#72ff70] p-1.5">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-sora text-sm md:text-base font-black text-gray-900 uppercase">
                    Your Personal Log ledger
                  </h3>
                  <p className="font-mono text-[9px] text-gray-400 uppercase tracking-widest mt-0.5">
                    Isolated local storage comm logs
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowSandboxLedger(!showSandboxLedger)}
                  className="px-3 py-1.5 border border-black font-mono text-[10px] font-bold uppercase hover:bg-neutral-50 cursor-pointer text-gray-600 flex items-center gap-1.5 transition-all active-press"
                  id="toggle-sandbox-ledger-btn"
                >
                  {showSandboxLedger ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{showSandboxLedger ? 'HIDE SYSTEM LOGS' : 'SHOW SYSTEM LOGS'}</span>
                </button>
                
                {savedTickets.length > 0 && (
                  <button
                    onClick={handleClearSavedLogs}
                    className="px-3 py-1.5 border border-black font-mono text-[10px] font-bold uppercase bg-red-50 hover:bg-red-100 cursor-pointer text-red-700 flex items-center gap-1.5 transition-all active-press"
                    id="clear-sandbox-ledger-btn"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>PURGE LOGS</span>
                  </button>
                )}
              </div>
            </div>

            <AnimatePresence>
              {showSandboxLedger && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden space-y-4 font-mono"
                  id="saved-sandbox-ledger-container"
                >
                  {savedTickets.length > 0 ? (
                    <div className="space-y-4">
                      {savedTickets.map((ticket) => {
                        const channelLabel = channels.find(c => c.id === ticket.category)?.label || ticket.category;
                        return (
                          <div
                            key={ticket.id}
                            className="border border-black bg-[#fafafa] p-4 relative group hover:bg-[#fffdf7] transition-all"
                            id={`ticket-card-${ticket.id}`}
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-black/10 pb-2 mb-3">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="font-mono text-[9px] font-bold px-1.5 py-0.5 bg-black text-[#72ff70]">
                                  MEMO REF: {ticket.id.toUpperCase()}
                                </span>
                                <span className="font-mono text-[9px] font-bold px-1.5 py-0.5 bg-neutral-200 text-gray-700 uppercase tracking-wide">
                                  {channelLabel}
                                </span>
                                {ticket.priority === 'CRITICAL' && (
                                  <span className="font-mono text-[9px] font-black px-1.5 py-0.5 bg-red-600 text-white animate-pulse">
                                    CRITICAL HIGH DISCLOSURE
                                  </span>
                                )}
                              </div>
                              <span className="font-mono text-[9px] text-gray-500">
                                {ticket.timestamp}
                              </span>
                            </div>

                            <div className="space-y-2">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 font-mono text-[10px] text-gray-600 bg-white p-2.5 border border-black/5">
                                <div>
                                  <span className="font-black text-gray-400">AGENT ALIAS:</span> {ticket.senderName}
                                </div>
                                <div>
                                  <span className="font-black text-gray-400">CONTACT ADDR:</span> {ticket.senderEmail}
                                </div>
                                {ticket.projectPlatformName && (
                                  <div>
                                    <span className="font-black text-gray-400">AFFILIATE/ENTITY:</span> {ticket.projectPlatformName}
                                  </div>
                                )}
                                {ticket.listingInquiryTier && (
                                  <div>
                                    <span className="font-black text-blue-700">DESIRED TIER:</span> {ticket.listingInquiryTier}
                                  </div>
                                )}
                                {ticket.collabType && (
                                  <div>
                                    <span className="font-black text-emerald-700">SPEC PARADIGM:</span> {ticket.collabType}
                                  </div>
                                )}
                                {ticket.adBudgetOrChannels && (
                                  <div>
                                    <span className="font-black text-[#ab3600]">INDEX CHANNEL:</span> {ticket.adBudgetOrChannels}
                                  </div>
                                )}
                                {ticket.audienceReach && (
                                  <div>
                                    <span className="font-black text-indigo-700">EST BUDGET/REACH:</span> {ticket.audienceReach}
                                  </div>
                                )}
                                {ticket.referenceLink && (
                                  <div className="md:col-span-2 truncate">
                                    <span className="font-black text-gray-400">VECTOR LINK:</span>{' '}
                                    <span className="underline hover:text-black">{ticket.referenceLink}</span>
                                  </div>
                                )}
                              </div>

                              <p className="font-mono text-xs text-gray-800 leading-relaxed bg-[#fffdfa] border-l-2 border-[#0040e0] p-3 italic">
                                "{ticket.message}"
                              </p>

                              <div className="pt-2 border-t border-dashed border-black/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                                <div className="font-mono text-[8px] text-gray-400 truncate max-w-lg select-all">
                                  {ticket.transmissionHash}
                                </div>
                                <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                                  <span className="font-mono text-[9px] font-black text-[#006e16] uppercase bg-[#d2ffdb] border border-[#006e16]/20 px-1.5 py-0.5">
                                    Status: {ticket.status}
                                  </span>
                                  <button
                                    onClick={() => handleDeleteTicket(ticket.id)}
                                    className="text-[9px] font-bold text-red-600 hover:text-red-800 uppercase flex items-center gap-1 cursor-pointer select-none"
                                    title="Delete locally"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                    <span>DELETE</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-8 text-center bg-gray-50 text-gray-400 font-mono text-xs uppercase border border-dashed border-black/20">
                      Zero signals registered in browser storage. Complete the form above to record logs in sandboxed memory.
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* RIGHT COLUMN: INSTITUTIONAL SECURE INFO & PHYSICAL NODES CORNER (COL-SPAN-4) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* LIVE MEMO DRAFT PREVIEW CARD (EXCLUSIVE ADDITION FOR FORM CLARITY!) */}
          <div className="bg-[#fffdf7] border-heavy p-5 shadow-md relative overflow-hidden select-none">
            <div className="absolute right-2 top-2 uppercase font-mono text-[8px] bg-emerald-100 border border-emerald-500 text-emerald-800 px-1.5 py-0.5">
              Live Preview
            </div>
            
            <h4 className="font-sora text-xs font-black uppercase tracking-tight text-gray-900 border-b-2 border-black pb-2 mb-4 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-emerald-600" />
              Live Admission Memo Draft
            </h4>

            <div className="border border-dashed border-gray-300 p-4 font-mono text-[10.5px] bg-white space-y-3 leading-normal h-[360px] overflow-y-auto shrink-0 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="flex border-b border-gray-100 pb-1.5 justify-between">
                  <span className="text-gray-400 font-bold uppercase">Dispatched Channel:</span>
                  <span className="font-black text-blue-700 truncate max-w-[150px]">
                    {channels.find(c => c.id === category)?.label || 'No Category Selected'}
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="text-gray-400 font-bold uppercase">1. Sender Identity / Profile:</div>
                  <div className="font-black border-l-2 border-black pl-2 py-0.5 text-gray-900 break-all">
                    {senderName.trim() ? senderName.toUpperCase() : '[A waiting profile alias...]'}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-gray-400 font-bold uppercase">2. Secure Return Coordinates:</div>
                  <div className="font-black border-l-2 border-black pl-2 py-0.5 text-gray-900 break-all text-[10px]">
                    {senderEmail.trim() ? senderEmail : '[A waiting reply email...]'}
                  </div>
                </div>

                {/* Conditional Preview parameters */}
                {['DIRECTORY LISTING INQUIRY', 'BUSINESS COLLABORATION PROPOSAL', 'SPONSORSHIP & ADVERTISEMENT', 'AFFILIATION DISPATCH', 'UNETHICAL PLATFORM CORRECTION REQUEST', 'REGULATOR DECREE ADVISORY', 'GENERAL TROUBLESHOOTING ENQUIRY'].includes(category) && (
                  <div className="space-y-1">
                    <div className="text-gray-400 font-bold uppercase">3. Platform / Entity context:</div>
                    <div className="font-black border-l-2 border-blue-500 pl-2 py-0.5 text-gray-900 break-all">
                      {projectPlatformName.trim() ? projectPlatformName : '[A waiting platform name...]'}
                    </div>
                  </div>
                )}
                
                {category === 'SPONSORSHIP & ADVERTISEMENT' && (
                  <div className="space-y-1">
                    <div className="text-gray-400 font-bold uppercase">4. Advertisement Placement:</div>
                    <div className="font-black border-l-2 border-orange-500 pl-2 py-0.5 text-gray-900 break-all text-[10px]">
                      {adBudgetOrChannels.trim() ? adBudgetOrChannels : '[A waiting placement...]'}
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <div className="text-gray-400 font-bold uppercase">Detailed Memorandum Specifications:</div>
                  <div className="border border-neutral-100 p-2 bg-neutral-50 h-[80px] overflow-hidden text-ellipsis text-gray-600 italic leading-snug">
                    {message.trim() ? `"${message}"` : 'Write detailed specification body parameters to satisfy this slot...'}
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-dashed border-gray-200 mt-auto flex justify-between items-center text-[8px] text-gray-400 select-none">
                <span>SYSTEM REGISTRATION: COMM09</span>
                <span>STATE: {completeness === 100 ? 'VALID DISPATCH' : 'INCOMPLETE'}</span>
              </div>
            </div>
          </div>

          {/* DYNAMIC SENSOR DIRECTIVE GUIDELINES */}
          <div className="bg-[#fff3ea] border-heavy p-6 shadow-md space-y-4 select-none">
            <h4 className="font-sora text-xs font-black uppercase tracking-tight text-[#ab3600] border-b-2 border-[#ab3600]/30 pb-2 flex items-center gap-1.5">
              <Info className="w-4.5 h-4.5" />
              {currentGuideline.title}
            </h4>
            
            <div className="space-y-3 font-mono text-[10px] leading-relaxed text-gray-700">
              <ul className="space-y-2 list-none">
                {currentGuideline.points.map((pt, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-[#ab3600] shrink-0">❖</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-3 border-t border-[#ab3600]/20 text-[9px] text-red-700 font-bold uppercase">
                ⚠ ALERT INGRESS ROUTE: {currentGuideline.alert}
              </div>
            </div>
          </div>
          
          {/* SECURE TELEGRAM frequencies (Swiss key info) */}
          <div className="bg-black text-white border-heavy p-6 shadow-md relative overflow-hidden">
            <div className="absolute right-0 bottom-0 text-[120px] font-black select-none opacity-5 leading-none font-mono">
              CSG
            </div>
            
            <h4 className="font-sora text-sm font-black uppercase tracking-tight text-[#ff5f1f] border-b border-[#ff5f1f]/30 pb-2 mb-4">
              SECURE TEAM INGRESS
            </h4>
            
            <div className="space-y-4 font-mono text-[11px] leading-relaxed">
              <p className="text-gray-400 text-xs">
                Our emergency handlers monitor multiple secure frequencies 24/7/365 to triage critical core listings or exploit warnings.
              </p>

              <div className="space-y-3 pt-2">
                <div className="space-y-1">
                  <div className="font-black text-gray-300 uppercase tracking-widest text-[9.5px]">
                    1. PEER TELEGRAM CORE
                  </div>
                  <div className="text-[#a0ffe2] font-semibold break-all bg-neutral-900 border border-neutral-800 p-2 text-[10px] select-all">
                    @csg_secure_ingestion_portal
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="font-black text-gray-300 uppercase tracking-widest text-[9.5px]">
                    2. SECURE DEPUTY INBOX
                  </div>
                  <div className="text-[#a0ffe2] font-semibold break-all bg-neutral-900 border border-neutral-800 p-2 text-[10px] select-all">
                    forensics-archive@csg.global
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="font-black text-gray-300 uppercase tracking-widest text-[9.5px]">
                    3. COMPLIANCE & REVIEWS DEPT
                  </div>
                  <div className="text-[#a0ffe2] font-semibold break-all bg-neutral-900 border border-neutral-800 p-2 text-[10px] select-all">
                    directory-vetting@csg.global
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-800 text-[9px] text-gray-500 leading-snug">
                For sensitive media assets or bulk directory data files, use the email endpoints directly to communicate on verified GPG keys.
              </div>
            </div>
          </div>

          {/* PHYSICAL swiss OFFICE */}
          <div className="bg-[#fffdf7] border-heavy p-6 shadow-md space-y-4">
            <h4 className="font-sora text-sm font-black uppercase tracking-tight text-[#0040e0] border-b border-[#0040e0]/20 pb-2">
              PHYSICAL SWISS REGISTRY
            </h4>

            <div className="space-y-3 font-mono text-[11px]">
              <div className="flex items-start gap-2.5">
                <Info className="w-4 h-4 text-[#0040e0] shrink-0 mt-0.5" />
                <p className="text-gray-600 leading-relaxed text-justify">
                  Crypto Safety Global is structured as an independent foundation registered in Zug's Cryptovalley, Switzerland.
                </p>
              </div>

              <div className="p-3 bg-white border border-black space-y-1 text-gray-800 leading-normal text-[10.5px] select-all">
                <div className="font-black text-black">CSG GLOBAL FOUNDATION GMBH</div>
                <div>Gewerbestrasse 11, Crypto Valley</div>
                <div>CH-6300 Zug, Switzerland</div>
                <div className="text-[9px] text-gray-400 uppercase pt-1 border-t border-gray-100 mt-1.5 font-bold">
                  REG-ID: CH-320-104928-2
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
