import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { roadmapSteps } from '../data';
import { RoadmapStep } from '../types';
import { 
  CheckCircle, 
  BookOpen, 
  TrendingUp, 
  Award, 
  HelpCircle, 
  Lock, 
  ShieldCheck, 
  ChevronRight,
  Eye,
  Sparkles,
  RefreshCw,
  Key,
  Laptop,
  Printer,
  Download,
  Copy,
  Check,
  FileText,
  PenSquare
} from 'lucide-react';

const getStepIcon = (id: number) => {
  switch (id) {
    case 1: return <BookOpen className="w-5 h-5 md:w-6 md:h-6" />;
    case 2: return <Key className="w-5 h-5 md:w-6 md:h-6" />;
    case 3: return <Laptop className="w-5 h-5 md:w-6 md:h-6" />;
    case 4: return <Award className="w-5 h-5 md:w-6 md:h-6" />;
    default: return <ShieldCheck className="w-5 h-5 md:w-6 md:h-6" />;
  }
};

export const StartHere: React.FC = () => {
  // Current active step selected in index focus panel
  const [activeStepId, setActiveStepId] = useState<number>(1);

  // Completed steps tracking in parent state
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({
    1: false,
    2: false,
    3: false,
    4: false
  });

  // Export/Reporting feature state
  const [custodianName, setCustodianName] = useState<string>('SECURE CUSTODIAN');
  const [classification, setClassification] = useState<string>('Personal Hardened Safehouse');
  const [customNotes, setCustomNotes] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [showPrintModal, setShowPrintModal] = useState<boolean>(false);

  const activeStep = roadmapSteps.find(step => step.id === activeStepId) || roadmapSteps[0];

  // Segment connection path lengths for SVG animation
  const pathLength1 = completedSteps[1] ? (completedSteps[2] ? 1 : 0.5) : 0;
  const pathLength2 = completedSteps[2] ? (completedSteps[3] ? 1 : 0.5) : 0;
  const pathLength3 = completedSteps[3] ? (completedSteps[4] ? 1 : 0.5) : 0;

  const toggleStepCompleted = (id: number) => {
    setCompletedSteps(prev => {
      const next = { ...prev, [id]: !prev[id] };
      
      // Auto advance to next step if marking as completed and there is a next step
      if (next[id] && id < 4) {
        setTimeout(() => {
          setActiveStepId(id + 1);
        }, 300);
      }
      return next;
    });
  };

  const handleResetProgress = () => {
    setCompletedSteps({ 1: false, 2: false, 3: false, 4: false });
    setActiveStepId(1);
  };

  const generateMarkdownContent = () => {
    const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const completedCountVal = Object.values(completedSteps).filter(Boolean).length;
    const progressPercentVal = completedCountVal * 25;

    let mdStr = `# IMMUTABLE WALLET SAFETY CLEARANCE AUDIT REPORT\n`;
    mdStr += `====================================================\n\n`;
    mdStr += `## CLIENT SPECIFICATIONS\n`;
    mdStr += `- **AUDIT CUSTODIAN**: ${custodianName.toUpperCase()}\n`;
    mdStr += `- **SECURITY CLASSIFICATION**: ${classification.toUpperCase()}\n`;
    mdStr += `- **VERIFICATION DATE**: ${dateStr}\n`;
    mdStr += `- **OVERALL SECURITY DEFENSE TARGET PROGRESS**: ${completedCountVal} of 4 MILESTONES SECURED (${progressPercentVal}%)\n\n`;
    
    mdStr += `## EXECUTION STATUS REPORT\n`;
    mdStr += `----------------------------------------------------\n`;
    roadmapSteps.forEach(step => {
      const isDone = !!completedSteps[step.id];
      mdStr += `### [${isDone ? "★ SECURED" : "○ PENDING"}] Milestone ${step.id}: ${step.title}\n`;
      mdStr += `*Description*: ${step.description}\n`;
      mdStr += `*Readiness Rating*: ${isDone ? "100% AUDITED AND ACTIVE IN PRACTICE" : "AWAITING IMPLEMENTATION SCAN"}\n`;
      mdStr += `*Defensive Measures Audited*:\n`;
      step.points.forEach((pt, idx) => {
        mdStr += `  ${isDone ? "[x]" : " [ ]"} Standard ${step.id}.${idx + 1}: ${pt}\n`;
      });
      mdStr += `\n`;
    });

    mdStr += `## CUSTODIAN AUDIT NOTATION SUMMARY\n`;
    mdStr += `----------------------------------------------------\n`;
    mdStr += `${customNotes.trim() || "No additional custom security notes declared by custodian in active session."}\n\n`;

    mdStr += `## ATTESTATION OF SAFE PRACTICE\n`;
    mdStr += `----------------------------------------------------\n`;
    mdStr += `Certified By: ${custodianName}\n`;
    mdStr += `Protocol compliance levels tracked against immutable cryptographically secured standards. Always confirm addresses physically.\n\n`;
    mdStr += `--- End of Audit Document ---\n`;
    
    return mdStr;
  };

  const handleExportMarkdown = () => {
    const content = generateMarkdownContent();
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${custodianName.toLowerCase().replace(/\s+/g, '_')}_safety_audit_report.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyMarkdown = () => {
    const content = generateMarkdownContent();
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const triggerSystemPrint = () => {
    window.print();
  };

  // Compute overall progress metrics
  const completedCount = Object.values(completedSteps).filter(Boolean).length;
  const progressPercent = completedCount * 25; // 4 steps total -> 25% each

  return (
    <div className="py-6 px-4 md:px-8 max-w-7xl mx-auto space-y-12 animate-fade-in">
      
      {/* Visual Roadmap Hero Spotlight Banner */}
      <div className="border-heavy bg-[#2e5bff] text-white p-6 md:p-8 neo-shadow relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-black/10 rounded-full pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] font-bold bg-[#fafafa] text-[#0040e0] px-2.5 py-1 border border-black uppercase tracking-wider">
              ROADMAP TO SECURE SELF-CUSTODY
            </span>
            <span className="font-mono text-[10px] font-bold bg-[#ff5f1f] text-white px-2.5 py-1 border border-black uppercase tracking-wider animate-pulse">
              100% OFFLINE PROTOCOL
            </span>
          </div>
          <h2 className="font-sora text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none">
            YOUR ROADMAP TO IMMUTABLE SAFETY
          </h2>
          <p className="font-mono text-xs md:text-sm text-[#efefff] max-w-2xl font-bold leading-normal">
            A comprehensive, rigorous walkthrough designed to bulletproof your storage keys, sandbox your browser profiles, and establish uncompromising multi-vault safety limits.
          </p>
        </div>
      </div>

      {/* Progress Checker Widget */}
      <div className="border-heavy bg-white p-6 neo-shadow rounded-none">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
          <div className="space-y-2 flex-grow">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-[#006e16]" />
              <span className="font-sora text-sm font-bold uppercase tracking-tight text-gray-900">
                Onboarding Protocol Progress: {completedCount} of 4 Milestones Cleared
              </span>
            </div>

            {/* Main graphic bar */}
            <div className="w-full h-6 bg-brand-surface border-2 border-black relative">
              <div 
                className="h-full bg-[#006e16] border-r-2 border-black transition-all duration-300" 
                style={{ width: `${progressPercent}%` }}
              />
              <span className="absolute inset-0 flex items-center justify-center font-mono text-[10px] font-bold text-black mix-blend-difference">
                {progressPercent}% PROTOCOL STREAK VERIFIED
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 md:self-end">
            {completedCount === 4 && (
              <div className="bg-[#d2ffdb] border-2 border-brand-tertiary px-4 py-2.5 text-brand-on-tertiary-container flex items-center gap-2 text-xs font-mono font-bold">
                <Award className="w-4.5 h-4.5 animate-bounce" />
                <span>SHIELD CITIZEN LEVEL 4 GRANTED</span>
              </div>
            )}
            <button
              onClick={handleResetProgress}
              className="font-mono text-xs font-bold uppercase tracking-wider px-4 py-3 border-heavy bg-brand-surface hover:bg-brand-surface-container active-press cursor-pointer flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reset Progress</span>
            </button>
          </div>
        </div>
      </div>

      {/* Visual, Interactive Progress Roadmap Component */}
      <div className="border-heavy bg-white p-5 md:p-6 neo-shadow rounded-none space-y-4">
        <div className="flex items-center justify-between border-b-2 border-black pb-3">
          <div className="space-y-1">
            <span className="font-mono text-[9px] font-black bg-black text-[#72ff70] px-2.5 py-1 border border-black uppercase tracking-wider inline-block">
              LIVE MILESTONE MAP
            </span>
            <h3 className="font-sora text-sm md:text-base font-black text-gray-950 uppercase tracking-tight">
              INTERACTIVE COMPLIANCE ROUTE
            </h3>
          </div>
          <p className="font-mono text-[10px] text-gray-400 font-bold hidden sm:block">
            CLICK NODES TO TOGGLE ACTIVE FOCUS
          </p>
        </div>

        {/* Scrollable container for mobile so the graph remains pristine */}
        <div className="w-full overflow-x-auto scrollbar-clean">
          <div className="min-w-[760px] relative h-48 bg-brand-surface border-2 border-black overflow-hidden select-none">
            {/* SVG Background Path and Glow Overlays */}
            <svg 
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 800 160"
              preserveAspectRatio="none"
              id="roadmap-svg-canvas"
            >
              <defs>
                <linearGradient id="roadmap-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#2e5bff" />
                  <stop offset="50%" stopColor="#ff5f1f" />
                  <stop offset="100%" stopColor="#006e16" />
                </linearGradient>
                <filter id="glowing-filter" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#2e5bff" floodOpacity="0.3" />
                </filter>
              </defs>

              {/* Base background curve (dashed grey) */}
              <path
                d="M 100,80 C 160,20 240,20 300,80 C 360,140 440,140 500,80 C 560,20 640,20 700,80"
                fill="none"
                stroke="#000000"
                strokeWidth="4"
                strokeOpacity="0.1"
                strokeDasharray="8 8"
                strokeLinecap="round"
              />

              {/* Segment 1 progress line */}
              <motion.path
                d="M 100,80 C 160,20 240,20 300,80"
                fill="none"
                stroke="url(#roadmap-grad)"
                strokeWidth="5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: pathLength1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                strokeLinecap="round"
                filter="url(#glowing-filter)"
              />

              {/* Segment 2 progress line */}
              <motion.path
                d="M 300,80 C 360,140 440,140 500,80"
                fill="none"
                stroke="url(#roadmap-grad)"
                strokeWidth="5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: pathLength2 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                strokeLinecap="round"
                filter="url(#glowing-filter)"
              />

              {/* Segment 3 progress line */}
              <motion.path
                d="M 500,80 C 560,20 640,20 700,80"
                fill="none"
                stroke="url(#roadmap-grad)"
                strokeWidth="5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: pathLength3 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                strokeLinecap="round"
                filter="url(#glowing-filter)"
              />
            </svg>

            {/* Interactive Milestone Nodes (HTML Elements positioned overlay) */}
            {roadmapSteps.map((step, idx) => {
              const stepNum = idx + 1;
              const isActive = activeStepId === stepNum;
              const isDone = !!completedSteps[stepNum];
              const pctLeft = 12.5 + idx * 25;

              return (
                <div key={step.id}>
                  {/* Node Circle Button */}
                  <button
                    type="button"
                    onClick={() => setActiveStepId(stepNum)}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full border-[3px] border-black flex items-center justify-center transition-all duration-150 cursor-pointer text-black z-20 ${
                      isActive 
                        ? 'bg-[#2e5bff] text-white neo-shadow-sm scale-110' 
                        : isDone
                          ? 'bg-[#d2ffdb] hover:bg-[#a8f9b4]'
                          : 'bg-white hover:bg-neutral-100'
                    }`}
                    style={{ left: `${pctLeft}%`, top: '48%' }}
                    title={`Milestone ${stepNum}: ${step.title}`}
                    id={`roadmap-node-${stepNum}`}
                  >
                    {/* Pulsing glow ring around active step */}
                    {isActive && (
                      <span className="absolute -inset-2.5 rounded-full border-2 border-[#2e5bff] animate-ping opacity-60 pointer-events-none" />
                    )}

                    {/* Step Icon */}
                    {getStepIcon(stepNum)}

                    {/* Checkmark badge absolute overlay */}
                    {isDone && (
                      <span className="absolute -top-1.5 -right-1.5 bg-[#006e16] text-[#72ff70] border-2 border-black w-5.5 h-5.5 rounded-full flex items-center justify-center font-mono text-[9px] font-black neo-shadow-xs">
                        ✓
                      </span>
                    )}

                    {/* Step index badge */}
                    <span className="absolute -bottom-2 bg-black text-white border border-black font-mono text-[8px] font-black px-1.5 leading-none rounded-none">
                      {stepNum}
                    </span>
                  </button>

                  {/* Caption & Status Text */}
                  <div
                    className="absolute -translate-x-1/2 text-center w-40 pointer-events-none z-10"
                    style={{ left: `${pctLeft}%`, top: '75%' }}
                    id={`roadmap-label-${stepNum}`}
                  >
                    <span className={`block font-sora text-[10.5px] font-black uppercase tracking-tight leading-none ${
                      isActive ? 'text-[#2e5bff] font-extrabold' : 'text-gray-900'
                    }`}>
                      {step.title.replace(`${step.id}. `, '').split(' ')[0]} {step.title.replace(`${step.id}. `, '').split(' ')[1] || ''}
                    </span>
                    <span className={`font-mono text-[8.5px] font-bold uppercase ${
                      isDone ? 'text-brand-tertiary-container' : 'text-gray-400'
                    }`}>
                      {isDone ? '● SECURED' : '○ PENDING'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Step Roadmap List (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="border-heavy bg-brand-surface p-4.5 rounded-none space-y-3.5">
            <h3 className="font-sora text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-300 pb-2">
              ROADMAP PROTOCOL INDEX
            </h3>

            <div className="space-y-2.5">
              {roadmapSteps.map((step) => {
                const isActive = activeStepId === step.id;
                const isDone = !!completedSteps[step.id];
                return (
                  <div
                    key={step.id}
                    onClick={() => setActiveStepId(step.id)}
                    className={`border-2 p-3.5 cursor-pointer transition-all duration-75 text-left rounded-none flex items-center justify-between gap-3 relative overflow-hidden active-press ${
                      isActive 
                        ? 'bg-black text-white border-black neo-shadow-sm' 
                        : isDone
                          ? 'bg-[#d2ffdb]/45 border-brand-tertiary text-gray-900'
                          : 'bg-white hover:bg-brand-surface border-gray-300'
                    }`}
                  >
                    <div className="space-y-1 min-w-0 flex-grow">
                      <span className="font-mono text-[8px] font-bold uppercase tracking-widest block opacity-75">
                        MILESTONE INDEX {step.id}
                      </span>
                      <h4 className="font-sora text-sm font-bold tracking-tight truncate leading-tight">
                        {step.title.replace(`${step.id}. `, '')}
                      </h4>
                      <p className={`font-mono text-[9px] truncate leading-none ${isActive ? 'text-gray-300' : 'text-gray-500'}`}>
                        {step.readTime}
                      </p>
                    </div>

                    <div className="shrink-0 flex items-center gap-1.5">
                      {isDone ? (
                        <CheckCircle className={`w-5 h-5 ${isActive ? 'text-[#72ff70]' : 'text-brand-tertiary'}`} />
                      ) : (
                        <ChevronRight className={`w-4 h-4 ${isActive ? 'text-[#72ff70]' : 'text-gray-400'}`} />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="border-heavy bg-[#fefee2] p-4.5 rounded-none space-y-3">
            <h4 className="font-sora text-xs font-bold text-gray-950 flex items-center gap-2">
              <Lock className="w-4 h-4 text-brand-primary" />
              <span>THE IMMUTABLE PROTOCOL STANDARDS</span>
            </h4>
            <p className="font-mono text-[9.5px] text-gray-600 leading-relaxed">
              Standard training modules do not build complete real muscle. By running through the index sequential checklists, you train safe habits before placing capital at risk. Use sandbox profile configurations for all operations.
            </p>
          </div>
        </div>

        {/* Right Side: Step Content Panel (8 cols) */}
        <div className="lg:col-span-8">
          <div className="border-heavy bg-white p-6 md:p-8 neo-shadow rounded-none space-y-6">
            
            {/* Step header details */}
            <div className="border-b-2 border-black pb-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <span className="font-mono text-[9.5px] font-bold bg-[#ffdad6] text-[#93000a] px-2 py-0.5 border border-black uppercase tracking-wider">
                  {activeStep.subtext}
                </span>
                <h3 className="font-sora text-lg md:text-2xl font-black text-gray-950 uppercase leading-none tracking-tight">
                  {activeStep.title}
                </h3>
                <div className="flex items-center gap-3 font-mono text-[10px] text-gray-400 font-bold">
                  <span>ESTIMATED DURATION: {activeStep.readTime}</span>
                  <span>•</span>
                  <span className={`${completedSteps[activeStep.id] ? 'text-brand-tertiary' : 'text-[#ab3600]'}`}>
                    STATUS: {completedSteps[activeStep.id] ? 'SECURED PROTOCOL' : 'AWAITING SIGN-OFF'}
                  </span>
                </div>
              </div>

              {/* Mark as completed flag button */}
              <button
                type="button"
                id={`mark-complete-btn-${activeStep.id}`}
                onClick={() => toggleStepCompleted(activeStep.id)}
                className={`font-mono text-xs font-bold uppercase px-4 py-2.5 border-heavy active-press cursor-pointer flex items-center gap-2 ${
                  completedSteps[activeStep.id]
                    ? 'bg-[#d2ffdb] text-brand-on-tertiary-container hover:bg-[#a8f9b4]'
                    : 'bg-[#ab3600] text-white hover:bg-opacity-90'
                }`}
              >
                {completedSteps[activeStep.id] ? (
                  <>
                    <CheckCircle className="w-4 h-4 shrink-0" />
                    <span>Step Verified</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 shrink-0" />
                    <span>Verify Milestones</span>
                  </>
                )}
              </button>
            </div>

            {/* Illustration Section with image hotlinking */}
            <div className="border-heavy relative h-52 md:h-64 overflow-hidden bg-brand-surface">
              <img
                src={activeStep.imageSrc}
                alt={activeStep.imageAlt}
                className="w-full h-full object-cover filter contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent flex items-end p-4">
                <p className="font-mono text-[10px] text-[#fafafa] font-bold bg-black/60 px-3 py-1.5 backdrop-blur-[2px] border border-white/25">
                  🛡️ VISUAL SECURE STANDARD: {activeStep.imageAlt}
                </p>
              </div>
            </div>

            {/* Main educational insights info */}
            <div className="space-y-4">
              <h4 className="font-sora text-sm font-bold text-gray-900 uppercase">
                Core Security Principle Deconstruction:
              </h4>
              <p className="font-sans text-xs md:text-sm text-gray-700 leading-relaxed font-medium bg-brand-surface p-4 border border-gray-300">
                {activeStep.description}
              </p>
            </div>

            {/* Checklist details loop */}
            <div className="space-y-3 pt-2">
              <span className="block font-mono text-[10px] font-bold text-gray-500 uppercase tracking-widest border-b border-gray-200 pb-1.5">
                ON-CHAIN DEFENSIVE GUIDELINES:
              </span>
              <div className="space-y-2">
                {activeStep.points.map((pt, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-[#eef3ff] p-3 border border-[#2e5bff] text-blue-950">
                    <span className="font-mono text-[10px] font-bold bg-white text-[#0040e0] px-1.5 py-0.5 border border-[#0040e0] shrink-0 mt-0.5">
                      {(idx + 1).toString().padStart(2, '0')}
                    </span>
                    <p className="font-mono text-[10.5px] leading-tight font-medium text-gray-800">
                      {pt}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Advanced Level Complete overlay notification */}
            {completedCount === 4 && (
              <div className="border-[3px] border-double border-brand-tertiary bg-[#d2ffdb]/60 p-5 rounded-none text-center space-y-4 animate-fade-in">
                <div className="flex items-center justify-center gap-2 text-brand-tertiary">
                  <Award className="w-8 h-8 animate-bounce text-brand-tertiary" />
                  <span className="font-sora text-base font-black uppercase">ALL MILESTONES CLEARED</span>
                </div>
                <p className="font-mono text-[11px] text-[#0040e0] max-w-lg mx-auto font-bold">
                  🌟 Congratulations! You have completed the immutable 4-step on-chain protection syllabus. Your safety level represents the absolute highest defensive tier. Ensure you run audit tests weekly.
                </p>
                <div className="inline-block bg-black text-[#72ff70] border-heavy px-5 py-2 text-xs font-mono font-bold tracking-wider">
                  SHIELD-LEVEL: IMMUTABLE GUARD
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Visual, Interactive Progress Checklist Export Center */}
      <div className="border-heavy bg-white p-6 md:p-8 neo-shadow rounded-none space-y-6">
        <div className="border-b-2 border-black pb-4 space-y-1">
          <span className="font-mono text-[9px] font-black bg-[#ab3600] text-white px-2.5 py-1 border border-black uppercase tracking-wider inline-block">
            AUTHENTIC DOCUMENTATION
          </span>
          <h3 className="font-sora text-base md:text-xl font-black text-gray-950 uppercase tracking-tight">
            🔐 CUSTODIST SECURITY AUDIT & REPORT GENERATOR
          </h3>
          <p className="font-mono text-[10.5px] text-gray-500 leading-normal font-bold">
            Export a physical record of your security configurations, backups, and completed milestones to preserve a cold-storage backup.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Input Details Form */}
          <div className="lg:col-span-5 space-y-5">
            <span className="block font-mono text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">
              ✦ STEP 1: CUSTOMIZE DOCUMENT LABELS
            </span>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block font-mono text-[10.5px] font-black text-gray-700 uppercase">
                  Audit Custodian Identifier (Name / Alias)
                </label>
                <div className="relative">
                  <PenSquare className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={custodianName}
                    onChange={(e) => setCustodianName(e.target.value || "SECURE CUSTODIAN")}
                    maxLength={35}
                    placeholder="e.g. ALPHA_GUARD_01"
                    className="w-full pl-9 pr-4 py-2 text-xs font-mono border-2 border-black focus:bg-brand-surface focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block font-mono text-[10.5px] font-black text-gray-700 uppercase">
                  Security Defense Target Classification
                </label>
                <select
                  value={classification}
                  onChange={(e) => setClassification(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-mono border-2 border-black focus:bg-brand-surface focus:outline-none bg-white cursor-pointer"
                >
                  <option value="Personal Hardened Safehouse">Personal Hardened Safehouse (Default)</option>
                  <option value="Multi-Signature Hot-Cold Hybrid">Multi-Signature Hot-Cold Hybrid System</option>
                  <option value="Deep-Cold Steel Backup Archive">Deep-Cold Steel Backup Archive</option>
                  <option value="Family Legacy Trust Succession Ledger">Family Legacy Trust Succession Ledger</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="block font-mono text-[10.5px] font-black text-gray-700 uppercase">
                    Custodian Audit Notations (Optional)
                  </label>
                  <span className="font-mono text-[9px] text-gray-400 font-bold">Cold Storage Notes</span>
                </div>
                <textarea
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  maxLength={180}
                  placeholder="e.g., Recovery phrase etched into steel backplate. Secondary keys stored in physical safe coordinate A. Ledger firmware updated June 2026."
                  rows={3}
                  className="w-full px-3 py-2 text-xs font-mono border-2 border-black focus:bg-brand-surface focus:outline-none placeholder-gray-400"
                />
              </div>
            </div>

            {/* Quick Actions (Direct copy / Download MD) */}
            <div className="pt-2 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleCopyMarkdown}
                className="font-mono text-[11px] font-black uppercase tracking-wider px-3.5 py-3 border-2 border-black bg-[#f0f9ff] hover:bg-[#e0f2fe] text-[#0369a1] cursor-pointer flex items-center justify-center gap-2 active-press"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 shrink-0 text-[#006e16]" />
                    <span className="text-[#006e16]">Copied text!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 shrink-0" />
                    <span>Copy Raw MD</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleExportMarkdown}
                className="font-mono text-[11px] font-black uppercase tracking-wider px-3.5 py-3 border-2 border-black bg-[#ecfdf5] hover:bg-[#d1fae5] text-[#047857] cursor-pointer flex items-center justify-center gap-2 active-press"
              >
                <Download className="w-4 h-4 shrink-0" />
                <span>Save Report .MD</span>
              </button>
            </div>
          </div>

          {/* Right: Live UI Certificate / Report Preview (Classic Authenticity Style) */}
          <div className="lg:col-span-7 space-y-4">
            <span className="block font-mono text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">
              ✦ STEP 2: LIVE AUDIT CERTIFICATE PREVIEW
            </span>

            {/* The Document Block */}
            <div className="border-[3px] border-black p-5 md:p-6 bg-[#faf9f6] relative overflow-hidden space-y-4 select-none">
              
              {/* Retro watermarks & borders */}
              <div className="absolute inset-0 border-[8px] border-double border-black/5 pointer-events-none" />
              <div className="absolute -right-12 -bottom-12 w-44 h-44 border border-black/5 rounded-full pointer-events-none flex items-center justify-center text-[10px] font-mono font-black text-black/5 rotate-12">
                VERIFIED SECURITY SAFE
              </div>

              {/* Certificate Header */}
              <div className="text-center space-y-1.5 relative z-10 border-b border-black/10 pb-3">
                <span className="font-mono text-[8.5px] font-black tracking-widest text-[#ab3600] uppercase block">
                  IMMUTABLE PROTOCOL STANDARDS BOARD
                </span>
                <h4 className="font-sora text-sm md:text-base font-black tracking-tighter uppercase text-gray-900 border-2 border-black inline-block px-4 py-1.5 bg-white">
                  CERTIFICATE OF CUSTODY CLEARANCE
                </h4>
                <p className="font-mono text-[8px] text-gray-400 uppercase font-extrabold tracking-widest">
                  At-Will Cryptographic Self-Custody Clearance Check
                </p>
              </div>

              {/* Specifications Subgrid */}
              <div className="grid grid-cols-2 gap-4 text-left border-b border-black/10 pb-3 relative z-10">
                <div className="space-y-0.5">
                  <span className="font-mono text-[8px] text-gray-400 font-extrabold uppercase tracking-wide block">AUDIT CUSTODIAN</span>
                  <span className="font-mono text-[11px] font-black text-black truncate uppercase block">{custodianName}</span>
                </div>
                <div className="space-y-0.5">
                  <span className="font-mono text-[8px] text-gray-400 font-extrabold uppercase tracking-wide block">CLASSIFICATION</span>
                  <span className="font-mono text-[11px] font-black text-[#2e5bff] truncate uppercase block">{classification}</span>
                </div>
                <div className="space-y-0.5">
                  <span className="font-mono text-[8px] text-gray-400 font-extrabold uppercase tracking-wide block">CLEARANCE STATUS</span>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${completedCount === 4 ? 'bg-[#006e16] animate-pulse' : 'bg-[#ab3600]'}`} />
                    <span className="font-mono text-[10px] font-extrabold text-gray-800 uppercase">
                      {completedCount === 4 ? "FULLY COMPLIANT" : `${completedCount} OF 4 ACTIVE`}
                    </span>
                  </div>
                </div>
                <div className="space-y-0.5">
                  <span className="font-mono text-[8px] text-gray-400 font-extrabold uppercase tracking-wide block">VERIFICATION WEIGHT</span>
                  <span className="font-mono text-[11px] font-black text-[#006e16] block">{progressPercent}% PROTOCOL RATE</span>
                </div>
              </div>

              {/* Completed Milestones List */}
              <div className="space-y-2 relative z-10 text-left">
                <span className="font-mono text-[8.5px] text-gray-400 font-extrabold uppercase tracking-widest block">CHECKLIST ATTESTATION LIST</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {roadmapSteps.map((step) => {
                    const isDone = !!completedSteps[step.id];
                    return (
                      <div 
                        key={step.id} 
                        className={`flex items-center gap-2 border p-2 ${
                          isDone 
                            ? 'bg-[#d2ffdb]/30 border-brand-tertiary/60' 
                            : 'bg-white border-dashed border-gray-200'
                        }`}
                      >
                        <span className={`w-3.5 h-3.5 border border-black flex items-center justify-center font-mono text-[8.5px] font-black shrink-0 ${
                          isDone ? 'bg-[#72ff70] text-black' : 'bg-transparent text-transparent'
                        }`}>
                          {isDone ? "✓" : ""}
                        </span>
                        <div className="min-w-0">
                          <span className="font-mono text-[9px] font-bold text-gray-800 truncate block">
                            Milestone {step.id}: {step.title.replace(`${step.id}. `, '').split(' ')[0]} {step.title.replace(`${step.id}. `, '').split(' ')[1] || ''}...
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Custodian comments */}
              {customNotes.trim() && (
                <div className="bg-white/60 border border-black/5 p-2.5 relative z-10 text-left">
                  <span className="font-mono text-[7.5px] text-gray-400 font-extrabold block uppercase">CUSTODIAL NOTES ATTACHED</span>
                  <p className="font-mono text-[9px] text-gray-600 leading-tight italic font-medium">
                    "{customNotes}"
                  </p>
                </div>
              )}

              {/* Bottom stamp and physical signature lines */}
              <div className="pt-3 border-t border-black/10 flex justify-between items-end relative z-10 text-left">
                <div className="space-y-1">
                  <span className="font-mono text-[7px] text-gray-400 font-extrabold block uppercase">TRUST ISSUANCE CODE</span>
                  <span className="font-mono text-[8px] font-black text-gray-900 uppercase">
                    CUST-SEC-{custodianName.substring(0,3).toUpperCase()}-{progressPercent}
                  </span>
                </div>

                {/* Hand Stamp Visual Seal */}
                <div className="w-16 h-16 rounded-full border-4 border-dashed border-[#ab3600] flex flex-col items-center justify-center text-[#ab3600] uppercase select-none opacity-80 -rotate-12 shrink-0">
                  <span className="font-mono text-[6px] font-black">CLEARANCE</span>
                  <span className="font-mono text-[8px] font-black leading-none">{progressPercent}%</span>
                  <span className="font-mono text-[6px] font-black">SECURE</span>
                </div>

                <div className="space-y-1">
                  <div className="w-28 border-b-2 border-black/60 font-mono text-[10px] text-center capitalize italic select-none text-gray-600 block">
                    {custodianName.toLowerCase()}
                  </div>
                  <span className="font-mono text-[7.5px] text-gray-400 font-extrabold block text-right uppercase">PHYSICAL SIGNATURE</span>
                </div>
              </div>

            </div>

            {/* EDUCATIONAL DISCLAIMER CORRIDOR FOR PROGRESS AUDITS */}
            <div className="bg-[#fcfdfa] border-heavy border-l-[6px] border-l-black p-3.5 font-mono text-[9px] text-[#ab3600] leading-normal space-y-1 my-3 text-left">
              <strong>🔒 PRIVACY & COMPLIANCE LOCAL-PERSISTENCE NOTE:</strong>
              <p>
                This clearance certificate compiles your roadmap checklists fully client-side inside your local browser. <strong>No data is sent, transmitted, or logged to centralized databases or external web registries</strong>. Keeping your security guidelines local prevents cloud exposures. If you print or save this report, ensure physical copies are stored securely!
              </p>
            </div>

            {/* Print trigger button */}
            <div>
              <button
                type="button"
                onClick={() => setShowPrintModal(true)}
                className="w-full font-mono text-xs font-black uppercase tracking-wider px-4 py-3 border-heavy bg-black hover:bg-neutral-800 text-white cursor-pointer flex items-center justify-center gap-2 neo-shadow-sm active-press"
              >
                <Printer className="w-4.5 h-4.5 shrink-0" />
                <span>Open Printable Certificate Suite</span>
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Printable Certificate Modal Backdrop */}
      <AnimatePresence>
        {showPrintModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 md:p-8 overflow-y-auto no-print"
          >
            {/* Embedded Print Override Style tag to cleanly hide standard page elements on physical paper */}
            <style dangerouslySetInnerHTML={{__html: `
              @media print {
                body * {
                  visibility: hidden !important;
                }
                #printable-crypto-safety-certificate, 
                #printable-crypto-safety-certificate * {
                  visibility: visible !important;
                }
                #printable-crypto-safety-certificate {
                  position: absolute !important;
                  left: 0 !important;
                  top: 0 !important;
                  width: 100% !important;
                  border: 4px solid black !important;
                  padding: 30px !important;
                  margin: 0 !important;
                  background: white !important;
                }
                .no-print {
                  display: none !important;
                }
              }
            `}} />

            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white border-heavy max-w-3xl w-full p-6 md:p-8 space-y-6 neo-shadow rounded-none relative text-left"
            >
              
              {/* Close Button */}
              <button
                onClick={() => setShowPrintModal(false)}
                className="absolute top-4 right-4 p-2 bg-neutral-100 border-2 border-black hover:bg-neutral-200 active-press cursor-pointer"
                title="Close Print Preview"
              >
                <span className="font-mono text-xs font-black">ESC / CLOSE ✕</span>
              </button>

              <div className="space-y-1 border-b-2 border-black pb-3">
                <span className="font-mono text-[9px] font-black bg-black text-[#72ff70] px-2.5 py-1 border border-black uppercase tracking-wider inline-block">
                  PRE-FLIGHT PRINTING SUITE
                </span>
                <h3 className="font-sora text-sm md:text-base font-black text-gray-950 uppercase tracking-tight">
                  PRINTER CALIBRATION PORTAL
                </h3>
                <p className="font-mono text-[10.5px] text-gray-500 leading-normal">
                  For optimal physical printing, we recommend setting the margin layout to <strong>"None"</strong> or <strong>"Minimum"</strong> and enabling <strong>"Background graphics"</strong> in your browser's printing panel.
                </p>
              </div>

              {/* The printable document wrapper that is explicitly isolated */}
              <div 
                id="printable-crypto-safety-certificate"
                className="border-[6px] border-black p-8 md:p-12 bg-white relative overflow-hidden space-y-6 select-none print:m-0"
              >
                {/* Visual borders */}
                <div className="absolute inset-0 border-[16px] border-double border-black/5 pointer-events-none" />

                {/* Header of official page */}
                <div className="text-center space-y-2 border-b-4 border-black pb-4">
                  <span className="font-mono text-[10px] font-black tracking-widest text-[#ab3600] uppercase block">
                    GLOBAL CUSTODIAL STANDARDS COMPLIANCE HUB
                  </span>
                  <h1 className="font-sora text-xl md:text-3xl font-black tracking-tighter uppercase text-gray-950 px-6 py-2.5 bg-neutral-100 border-4 border-black inline-block">
                    AUDIT OF CUSTODIALLY DEPLOYED SECURITY
                  </h1>
                  <span className="font-mono text-[9px] text-gray-500 uppercase font-black tracking-widest block pt-1">
                    OFFICIAL SECURITY ADVISORY • VERIFICATION LOG #SEC-{custodianName.substring(0,3).toUpperCase()}-2026
                  </span>
                </div>

                {/* Sub-grid of labels */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left border-b-2 border-black pb-5">
                  <div className="space-y-0.5">
                    <span className="font-mono text-[8px] text-gray-400 font-black uppercase tracking-widest block">SECURE CUSTODIAN</span>
                    <span className="font-mono text-xs font-black text-black uppercase block">{custodianName}</span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="font-mono text-[8px] text-gray-400 font-black uppercase tracking-widest block">CLASSIFICATION SCORE</span>
                    <span className="font-mono text-xs font-black text-[#2e5bff] uppercase block">{classification}</span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="font-mono text-[8px] text-gray-400 font-black uppercase tracking-widest block">AUDIT DATE</span>
                    <span className="font-mono text-xs font-black text-black uppercase block">
                      {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="font-mono text-[8px] text-gray-400 font-black uppercase tracking-widest block">VERIFIED RATING</span>
                    <span className="font-mono text-xs font-black text-[#006e16] block">{progressPercent}% ABSOLUTE SHIELD</span>
                  </div>
                </div>

                {/* Major educational milestones audited */}
                <div className="space-y-4 text-left">
                  <h3 className="font-sora text-xs font-black uppercase text-gray-900 tracking-wider border-b border-black/10 pb-1">
                    AUDITED MILESTONE EVIDENCE LOG:
                  </h3>
                  
                  <div className="space-y-4">
                    {roadmapSteps.map((step) => {
                      const isDone = !!completedSteps[step.id];
                      return (
                        <div key={step.id} className="space-y-1.5 p-3.5 border border-black/10 bg-neutral-50/50">
                          <div className="flex items-center justify-between border-b border-dashed border-black/15 pb-1">
                            <span className="font-sora text-xs font-black uppercase text-black">
                              Milestone {step.id}: {step.title.replace(`${step.id}. `, '')}
                            </span>
                            <span className={`font-mono text-[9px] font-black px-2 py-0.5 border ${
                              isDone ? 'bg-[#d2ffdb] text-brand-on-tertiary-container border-black' : 'bg-transparent text-gray-400 border-dashed border-gray-300'
                            }`}>
                              [{isDone ? "★ SECURED PROTOCOL" : "○ PENDING COMPLIANCE"}]
                            </span>
                          </div>
                          <p className="font-mono text-[9.5px] text-gray-600 leading-tight">
                            {step.description}
                          </p>
                          {isDone && (
                            <div className="pt-1.5 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                              {step.points.slice(0, 2).map((pt, index) => (
                                <div key={index} className="flex gap-1.5 items-start">
                                  <span className="font-mono text-[8px] font-black text-[#006e16]">✓</span>
                                  <span className="font-mono text-[8px] text-gray-500 leading-none">{pt}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Additional Comments Block */}
                {customNotes.trim() && (
                  <div className="border border-black p-4 text-left bg-[#fefee2] space-y-1">
                    <span className="font-mono text-[8px] text-[#ab3600] font-black block uppercase tracking-widest">
                      SPECIAL ATTACHMENT NOTES & HARDWARE COORDINATES
                    </span>
                    <p className="font-mono text-[10px] text-gray-800 leading-normal font-medium">
                      "{customNotes}"
                    </p>
                  </div>
                )}

                {/* Formal Seal and Verification Stamp Lines */}
                <div className="pt-6 border-t-2 border-black flex flex-row justify-between items-end text-left">
                  <div className="space-y-1">
                    <span className="font-mono text-[7px] text-gray-400 font-extrabold block uppercase">SYSTEM HASH SIGNATURE</span>
                    <span className="font-mono text-[9px] font-black text-gray-800 tracking-tight block">
                      SHA256: c3b27b3bde944f4ce5a8f9bdf1df1aa86bab83e
                    </span>
                  </div>

                  <div className="w-24 h-24 rounded-full border-4 border-double border-[#006e16] flex flex-col items-center justify-center text-[#006e16] uppercase select-none opacity-90 -rotate-12 shrink-0">
                    <span className="font-mono text-[6.5px] font-black">VERIFIED</span>
                    <span className="font-mono text-base font-black leading-none">{progressPercent}%</span>
                    <span className="font-mono text-[6.5px] font-black">SECURE</span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="w-36 border-b-2 border-black font-mono text-xs text-center capitalize italic select-none text-gray-700">
                      {custodianName.toLowerCase()}
                    </div>
                    <span className="font-mono text-[8px] text-gray-400 font-black block text-right uppercase">AUTHORIZED ATTESTOR SIGNATURE</span>
                  </div>
                </div>

              </div>

              {/* Printing actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={triggerSystemPrint}
                  className="flex-grow font-mono text-xs font-black uppercase tracking-wider px-4 py-3 bg-black hover:bg-neutral-800 text-white cursor-pointer flex items-center justify-center gap-2 border-2 border-black"
                >
                  <Printer className="w-4.5 h-4.5" />
                  <span>Execute Browser Print Command (PDF / Ink)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowPrintModal(false)}
                  className="font-mono text-xs font-black uppercase tracking-wider px-4 py-3 bg-white hover:bg-neutral-50 text-black cursor-pointer border-2 border-black active-press"
                >
                  Cancel
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

