import React, { useState, useEffect } from 'react';
import { guideArticles } from '../extendedData';
import { GuideArticle } from '../types';
import { ReportInaccuracyButton } from './InaccuracyFeedbackModal';
import { useLanguage } from '../utils/LanguageContext';
import {
  WEB3_COURSE_INFO,
  WEB3_COURSE_INFO_ES,
  COURSE_SECTORS,
  COURSE_SECTORS_ES,
  CourseSection,
  CourseSector
} from '../data/web3courseData';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  User, 
  ChevronRight, 
  ShieldAlert, 
  CheckCircle2, 
  Search, 
  ArrowLeft,
  ArrowRight,
  Award,
  BookMarked,
  FolderOpen,
  Lock,
  CornerDownRight,
  Sparkles,
  HelpCircle,
  RotateCcw,
  Check,
  ChevronDown,
  ChevronUp,
  ThumbsUp,
  AlertTriangle,
  Activity,
  Twitter,
  Zap,
  Bookmark
} from 'lucide-react';

const renderFormattedContent = (content: string) => {
  const lines = content.split('\n');
  const blocks: React.ReactNode[] = [];
  let listItems: { text: string; type: 'bullet' | 'number' }[] = [];

  const parseLineWithBold = (text: string, key: string) => {
    const boldRegex = /\*\*(.*?)\*\*/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;
    while ((match = boldRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      const boldText = match[1];
      parts.push(
        <strong key={`bold-${match.index}-${key}`} className="font-extrabold text-[#ab3600]">
          {boldText}
        </strong>
      );
      lastIndex = boldRegex.lastIndex;
    }
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
    return parts.length > 0 ? parts : text;
  };

  const flushList = (key: string) => {
    if (listItems.length > 0) {
      const type = listItems[0].type;
      if (type === 'bullet') {
        blocks.push(
          <ul key={`list-ul-${key}`} className="list-disc pl-6 my-4 space-y-2 text-gray-800 font-sans text-[13px] sm:text-[14.5px] tracking-normal leading-relaxed text-left">
            {listItems.map((item, index) => (
              <li key={index} className="leading-relaxed">
                {parseLineWithBold(item.text, `li-b-${index}-${key}`)}
              </li>
            ))}
          </ul>
        );
      } else {
        blocks.push(
          <ol key={`list-ol-${key}`} className="list-decimal pl-6 my-4 space-y-2 text-gray-800 font-sans text-[13px] sm:text-[14.5px] tracking-normal leading-relaxed text-left font-semibold">
            {listItems.map((item, index) => (
              <li key={index} className="leading-relaxed font-normal">
                {parseLineWithBold(item.text, `li-ol-${index}-${key}`)}
              </li>
            ))}
          </ol>
        );
      }
      listItems = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === '') {
      flushList(`gap-${i}`);
      continue;
    }

    if (line === '---') {
      flushList(`hr-${i}`);
      blocks.push(
        <hr key={`hr-${i}`} className="border-t-[2px] border-black/15 my-6" />
      );
    } else if (line.startsWith('####') || line.startsWith('###')) {
      flushList(`h3-${i}`);
      const cleanHeading = line.startsWith('####') ? line.replace(/^####\s*/, '') : line.replace(/^###\s*/, '');
      blocks.push(
        <h3 key={`h3-${i}`} className="font-sora text-sm sm:text-base font-black text-gray-950 uppercase tracking-tight mt-6 mb-3 border-l-4 border-l-[#ab3600] pl-3.5 py-1.5 flex items-center gap-2">
          <BookMarked className="w-4 h-4 text-[#ab3600] shrink-0" />
          <span>{parseLineWithBold(cleanHeading, `h3-content-${i}`)}</span>
        </h3>
      );
    } else if (line.startsWith('##')) {
      flushList(`h2-${i}`);
      blocks.push(
        <h4 key={`h2-${i}`} className="font-sora text-[13px] sm:text-[14px] font-extrabold text-[#ab3600] uppercase tracking-wider mt-5 mb-2.5 pb-1 border-b border-black/15 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-[#ab3600] rotate-45 shrink-0" />
          <span>{parseLineWithBold(line.replace(/^##\s*/, ''), `h2-content-${i}`)}</span>
        </h4>
      );
    } else if (line.startsWith('#')) {
      flushList(`h1-${i}`);
      blocks.push(
        <h2 key={`h1-${i}`} className="font-sora text-base sm:text-lg md:text-xl font-black text-gray-950 uppercase tracking-tight mt-6 mb-3">
          {parseLineWithBold(line.replace(/^#\s*/, ''), `h1-content-${i}`)}
        </h2>
      );
    } else if (line.startsWith('>')) {
      flushList(`quote-${i}`);
      blocks.push(
        <blockquote key={`quote-${i}`} className="border-l-4 border-l-[#ab3600]/85 bg-orange-50/15 p-4 my-4 font-sans text-sm italic text-gray-700 leading-relaxed text-left">
          {parseLineWithBold(line.replace(/^>\s*/, ''), `quote-content-${i}`)}
        </blockquote>
      );
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      const cleanItem = line.replace(/^[-*]\s*/, '');
      if (listItems.length > 0 && listItems[0].type !== 'bullet') {
        flushList(`flush-bullet-${i}`);
      }
      listItems.push({ text: cleanItem, type: 'bullet' });
    } else if (/^\d+\.\s/.test(line)) {
      const cleanItem = line.replace(/^\d+\.\s*/, '');
      if (listItems.length > 0 && listItems[0].type !== 'number') {
        flushList(`flush-number-${i}`);
      }
      listItems.push({ text: cleanItem, type: 'number' });
    } else {
      flushList(`para-${i}`);
      blocks.push(
        <p key={`p-${i}`} className="text-gray-800 text-[13px] sm:text-[14.5px] leading-relaxed break-words whitespace-normal font-medium tracking-normal mb-3 text-left">
          {parseLineWithBold(line, `p-content-${i}`)}
        </p>
      );
    }
  }
  flushList(`end`);
  return <div className="space-y-4">{blocks}</div>;
};

export const BeginnerGuides: React.FC = () => {
  const { language } = useLanguage();
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [activeClassLevel, setActiveClassLevel] = useState<'all' | 'beginner' | 'moderate' | 'intermediate' | 'advanced'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [scrollPercent, setScrollPercent] = useState(0);

  // Custom states for interactive textbook curriculum (Beginner Classroom)
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [expandedSectors, setExpandedSectors] = useState<string[]>(['sector-1-intro-web3', 'sector-1-intro-web3-es']);
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('csg_completed_lessons');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizResult, setQuizResult] = useState<'correct' | 'incorrect' | null>(null);

  useEffect(() => {
    localStorage.setItem('csg_completed_lessons', JSON.stringify(completedLessons));
  }, [completedLessons]);

  // Expand or collapse sectors in syllabus list
  const toggleSector = (sectorId: string) => {
    if (expandedSectors.includes(sectorId)) {
      setExpandedSectors(expandedSectors.filter(id => id !== sectorId));
    } else {
      setExpandedSectors([...expandedSectors, sectorId]);
    }
  };

  // Helper to mark a lesson as completed
  const markLessonComplete = (lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
    }
  };

  // Helper to reset course progress
  const resetCourseProgress = () => {
    if (window.confirm(language === 'es' ? '¿Está seguro de que desea restablecer su progreso de aprendizaje?' : 'Are you sure you want to reset your learning progress?')) {
      setCompletedLessons([]);
      setActiveLessonId(null);
    }
  };

  // Monitor scroll for reading progress calculation
  useEffect(() => {
    const handleOpenArticle = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setSelectedArticleId(customEvent.detail);
      }
    };
    window.addEventListener('csg-open-article', handleOpenArticle);
    return () => {
      window.removeEventListener('csg-open-article', handleOpenArticle);
    };
  }, []);

  useEffect(() => {
    if (!selectedArticleId && !activeLessonId) {
      setScrollPercent(0);
      return;
    }

    // Scroll back to top instantly when article is opened
    window.scrollTo({ top: 0 });

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const totalScrollable = scrollHeight - clientHeight;
      if (totalScrollable > 0) {
        const percentage = (window.scrollY / totalScrollable) * 100;
        setScrollPercent(Math.min(100, Math.max(0, Math.round(percentage))));
      } else {
        setScrollPercent(0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [selectedArticleId, activeLessonId]);

  const currentArticle = guideArticles.find((a) => a.id === selectedArticleId);

  const curArticleIdx = selectedArticleId ? guideArticles.findIndex((a) => a.id === selectedArticleId) : -1;
  const prevArticle = curArticleIdx > 0 ? guideArticles[curArticleIdx - 1] : null;
  const nextArticle = curArticleIdx !== -1 && curArticleIdx < guideArticles.length - 1 ? guideArticles[curArticleIdx + 1] : null;

  // Class mapping function for articles
  const getArticleLevel = (article: GuideArticle): 'beginner' | 'moderate' | 'intermediate' | 'advanced' => {
    if (article.category === 'basics') {
      return 'beginner';
    } else if (article.category === 'buying' || article.category === 'stablecoins') {
      return 'moderate';
    } else if (article.category === 'wallets') {
      return 'intermediate';
    } else {
      return 'advanced';
    }
  };

  const filteredArticles = guideArticles.filter((article) => {
    const level = getArticleLevel(article);
    const matchesLevel = activeClassLevel === 'all' || level === activeClassLevel;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  const getLevelBadgeStyle = (level: 'beginner' | 'moderate' | 'intermediate' | 'advanced') => {
    switch (level) {
      case 'beginner': return 'bg-[#fff0ea] text-[#ab3600] border-[#ab3600]';
      case 'moderate': return 'bg-[#eef3ff] text-[#0040e0] border-[#0040e0]';
      case 'intermediate': return 'bg-[#d2ffdb] text-[#136327] border-[#136327]';
      case 'advanced': return 'bg-[#fbebff] text-[#9313b3] border-[#9313b3]';
      default: return 'bg-gray-50 text-gray-700 border-gray-700';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      {/* Dynamic Viewport Top Reading Progress Bar */}
      {(selectedArticleId || activeLessonId) && (
        <div className="fixed top-0 left-0 right-0 h-1.5 bg-[#ab3600]/15 z-50 pointer-events-none">
          <div 
            className="bg-[#ab3600] h-full transition-all duration-75 border-b border-black/20"
            style={{ width: `${scrollPercent}%` }}
          />
        </div>
      )}
      {selectedArticleId && currentArticle ? (
        // Detailed Article View
        <div className="space-y-6 animate-fade-in-up">
          <div className="sticky top-[74px] z-30 bg-brand-surface border-b-4 border-black py-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-[subtle]">
            <button
              onClick={() => setSelectedArticleId(null)}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-white border-heavy neo-shadow-sm hover:bg-brand-surface-container text-xs font-mono font-bold uppercase transition-all duration-150 cursor-pointer active-press shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
              BACK TO CLASSROOMS
            </button>

            <div className="flex-grow flex items-center gap-3 font-mono text-[10px] md:text-xs bg-white border-heavy px-3 py-2 neo-shadow-sm/5">
              <span className="font-black text-[#ab3600] uppercase tracking-wider shrink-0">MODULE READING PROGRESS:</span>
              <div className="flex-grow bg-gray-100 border border-black h-2.5 overflow-hidden relative">
                <div 
                  className="bg-[#ab3600] h-full transition-all duration-75"
                  style={{ width: `${scrollPercent}%` }}
                />
              </div>
              <span className="font-extrabold text-gray-900 shrink-0 min-w-[35px] text-right">{scrollPercent}%</span>
            </div>
          </div>

          <article className="bg-white border-heavy neo-shadow p-6 md:p-10 space-y-8">
            <div className="space-y-4">
              <span className={`inline-block border px-3 py-1 font-mono text-xs font-bold uppercase ${getLevelBadgeStyle(getArticleLevel(currentArticle))}`}>
                {getArticleLevel(currentArticle).toUpperCase()} CLASSROOM • {currentArticle.category.toUpperCase()}
              </span>
              <h2 className="font-sora text-2xl md:text-4xl font-extrabold text-gray-900 leading-tight uppercase">
                {currentArticle.title}
              </h2>
              <p className="font-mono text-xs text-gray-500 italic">
                {currentArticle.subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2 border-y border-black/10 py-3 text-xs font-mono text-gray-600">
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-brand-primary" />
                  <span className="font-bold">{currentArticle.author}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>Updated {currentArticle.lastUpdated}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{currentArticle.readTime}</span>
                </div>
              </div>
            </div>

            {/* Quick takeaways / Steps Checklist */}
            {currentArticle.steps && (
              <div className="border-heavy bg-[#f9fbfd] p-5 space-y-4 rounded-none">
                <h3 className="font-mono text-xs font-bold text-gray-800 uppercase tracking-widest flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-tertiary" />
                  CORE LEARNING DIRECTIVES (SUMMARY)
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono text-gray-700">
                  {currentArticle.steps.map((step, idx) => (
                    <li key={idx} className="flex gap-2 items-start">
                      <span className="bg-black text-white px-1.5 py-0.5 text-[10px] font-bold line-clamp-1">{idx+1}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Main Article Body content */}
            <div className="prose max-w-none border-t border-b border-black/5 py-4">
              {renderFormattedContent(currentArticle.content)}
            </div>

            {/* Absolute Safety Notes Panel */}
            <div className="border-heavy border-l-[8px] border-l-[#ab3600] bg-[#fff0ea] p-5 space-y-3">
              <h4 className="font-mono text-xs font-bold text-[#ab3600] uppercase tracking-widest flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 stroke-[2.5]" />
                IMPERATIVE SURVIVAL PROTOCOLS
              </h4>
              <div className="space-y-2">
                {currentArticle.safetyNotes.map((note, index) => (
                  <p key={index} className="font-mono text-xs text-gray-700 leading-relaxed pl-4 border-l border-brand-primary/30">
                    ⚠️ {note}
                  </p>
                ))}
              </div>
            </div>
          </article>

          {/* Directives Navigation Footer */}
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center bg-white border-heavy p-4 gap-4 neo-shadow-sm font-mono text-xs mt-6">
            {prevArticle ? (
              <button
                onClick={() => {
                  setSelectedArticleId(prevArticle.id);
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white border-heavy text-gray-700 hover:text-[#ab3600] hover:bg-neutral-50 font-bold uppercase transition duration-150 cursor-pointer active-press"
              >
                <ArrowLeft className="w-4 h-4 shrink-0" />
                {language === 'es' ? 'ANTERIOR MANUAL' : 'PREVIOUS MANUAL'}
              </button>
            ) : (
              <div />
            )}

            {nextArticle ? (
              <button
                onClick={() => {
                  setSelectedArticleId(nextArticle.id);
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#ab3600] text-white hover:bg-[#ab3600]/90 border-heavy font-black uppercase transition duration-150 cursor-pointer active-press"
              >
                {language === 'es' ? 'SIGUIENTE MANUAL' : 'NEXT MANUAL'}
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            ) : (
              <button
                onClick={() => {
                  setSelectedArticleId(null);
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-black text-[#72ff70] hover:bg-neutral-900 border-heavy font-black uppercase transition duration-150 cursor-pointer active-press"
              >
                ✓ {language === 'es' ? 'COMPLETAR CLASES' : 'COMPLETE CLASSROOMS'}
              </button>
            )}
          </div>
        </div>
      ) : (
        // Main Guides Hub View
        <div className="space-y-8">
          {/* Hero Banner */}
          <div className="bg-[#ab3600] text-white border-heavy p-6 md:p-8 neo-shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-1 bg-[#fff0ea] text-[#ab3600] border border-[#ab3600] px-2 py-0.5 rounded-sm font-mono text-[9px] font-bold">
                <BookOpen className="w-3.5 h-3.5" />
                CSG SECURITY ACADEMY
              </div>
              <h2 className="font-sora text-3xl md:text-4xl font-extrabold tracking-tighter uppercase">
                CLASSROOM SYLLABUS DIRECTORIES
              </h2>
              <p className="font-mono text-xs opacity-90 leading-relaxed">
                Empower your security posturing through specialized classroom directories. Select a classroom track below to inspect structured lectures, on-chain mechanics, and sovereign anti-fraud protocols.
              </p>
            </div>
          </div>

          {/* Conditional Layout: EITHER Main Level Overview OR Specific Classroom View */}
          {activeClassLevel === 'all' && !searchQuery.trim() ? (
            /* =======================================================
               1. PRIMARY HUB VIEW: ONLY THE CLASSROOM LEVEL CARDS
               ======================================================= */
            <div className="space-y-8">
              <div className="border-l-4 border-black pl-3 py-1">
                <h3 className="font-sora text-base font-black uppercase text-gray-900">
                  Select Classroom Track
                </h3>
                <p className="font-mono text-xs text-gray-500">
                  Choose a track to view specific secure syllabuses, guidelines, and manuals.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
                {/* Track 1: Beginner Classroom */}
                <div 
                  onClick={() => setActiveClassLevel('beginner')}
                  className="bg-white border-heavy p-6 neo-shadow hover:translate-y-[-2px] duration-150 transition-all cursor-pointer flex flex-col justify-between group space-y-4 border-l-[12px] border-l-[#136327]"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-[9px] font-black tracking-widest bg-[#d2ffdb] text-[#136327] px-2 py-0.5 border border-[#136327]">
                        CLASSROOM LEVEL I
                      </span>
                      <span className="font-mono text-[9px] font-bold text-gray-400">1 MAJOR SYLLABUS</span>
                    </div>
                    <h3 className="font-sora text-xl font-black text-black group-hover:text-[#136327] transition-colors leading-tight uppercase">
                      Beginner Classroom
                    </h3>
                    <p className="font-mono text-xs text-gray-600 leading-normal">
                      Designed for absolute novices. Delve into decentralized ledger mechanics and digital asset first principles without speculation or hype.
                    </p>
                    <div className="border-t border-dashed border-gray-200 pt-3 space-y-1.5">
                      <span className="block font-mono text-[9px] font-extrabold text-[#136327] uppercase">INCLUDED INSTRUCTION:</span>
                      <div className="flex items-center gap-1.5 font-mono text-[11px] text-gray-700">
                        <CornerDownRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <span>Syllabus 1.1: Foundations of Decentralization</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between font-mono text-xs font-bold pt-4 text-[#136327] group-hover:underline">
                    <span>ENTER CLASSROOM</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Track 2: Moderate Classroom */}
                <div 
                  onClick={() => setActiveClassLevel('moderate')}
                  className="bg-white border-heavy p-6 neo-shadow hover:translate-y-[-2px] duration-150 transition-all cursor-pointer flex flex-col justify-between group space-y-4 border-l-[12px] border-l-[#0040e0]"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-[9px] font-black tracking-widest bg-[#eef3ff] text-[#0040e0] px-2 py-0.5 border border-[#0040e0]">
                        CLASSROOM LEVEL II
                      </span>
                      <span className="font-mono text-[9px] font-bold text-gray-400">2 MAJOR SYLLABUSES</span>
                    </div>
                    <h3 className="font-sora text-xl font-black text-black group-hover:text-[#0040e0] transition-colors leading-tight uppercase">
                      Moderate Classroom
                    </h3>
                    <p className="font-mono text-xs text-gray-600 leading-normal">
                      Master practical on-chain actions. Detailed step-by-step secure buy guidelines, KYC standards, escrow parameters, and stablecoin safety shields.
                    </p>
                    <div className="border-t border-dashed border-gray-200 pt-3 space-y-1.5">
                      <span className="block font-mono text-[9px] font-extrabold text-[#0040e0] uppercase">INCLUDED INSTRUCTIONS:</span>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 font-mono text-[11px] text-gray-700">
                          <CornerDownRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          <span>Syllabus 2.1: Buying & Escrow Protocols</span>
                        </div>
                        <div className="flex items-center gap-1.5 font-mono text-[11px] text-gray-700">
                          <CornerDownRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          <span>Syllabus 2.2: Stablecoin Defi & Gas Optimization</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between font-mono text-xs font-bold pt-4 text-[#0040e0] group-hover:underline">
                    <span>ENTER CLASSROOM</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Track 3: Intermediate Classroom */}
                <div 
                  onClick={() => setActiveClassLevel('intermediate')}
                  className="bg-white border-heavy p-6 neo-shadow hover:translate-y-[-2px] duration-150 transition-all cursor-pointer flex flex-col justify-between group space-y-4 border-l-[12px] border-l-[#ab3600]"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-[9px] font-black tracking-widest bg-[#fff0ea] text-[#ab3600] px-2 py-0.5 border border-[#ab3600]">
                        CLASSROOM LEVEL III
                      </span>
                      <span className="font-mono text-[9px] font-bold text-gray-400">1 MAJOR SYLLABUS</span>
                    </div>
                    <h3 className="font-sora text-xl font-black text-black group-hover:text-[#ab3600] transition-colors leading-tight uppercase">
                      Intermediate Classroom
                    </h3>
                    <p className="font-mono text-xs text-gray-600 leading-normal">
                      Deep dive into sovereign keys governance. Hot wallet interfaces, cold hardware vaults, seed word protection, and physical device authentication.
                    </p>
                    <div className="border-t border-dashed border-gray-200 pt-3 space-y-1.5">
                      <span className="block font-mono text-[9px] font-extrabold text-[#ab3600] uppercase">INCLUDED INSTRUCTION:</span>
                      <div className="flex items-center gap-1.5 font-mono text-[11px] text-gray-700">
                        <CornerDownRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <span>Syllabus 3.1: Cold Storage & Hardware Modules</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between font-mono text-xs font-bold pt-4 text-[#ab3600] group-hover:underline">
                    <span>ENTER CLASSROOM</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Track 4: Advanced Classroom */}
                <div 
                  onClick={() => setActiveClassLevel('advanced')}
                  className="bg-white border-heavy p-6 neo-shadow hover:translate-y-[-2px] duration-150 transition-all cursor-pointer flex flex-col justify-between group space-y-4 border-l-[12px] border-l-[#9313b3]"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-[9px] font-black tracking-widest bg-[#fbebff] text-[#9313b3] px-2 py-0.5 border border-[#9313b3]">
                        CLASSROOM LEVEL IV
                      </span>
                      <span className="font-mono text-[9px] font-bold text-gray-400">2 MAJOR SYLLABUSES</span>
                    </div>
                    <h3 className="font-sora text-xl font-black text-black group-hover:text-[#9313b3] transition-colors leading-tight uppercase">
                      Advanced Classroom
                    </h3>
                    <p className="font-mono text-xs text-gray-600 leading-normal">
                      Master advanced institutional posture. Complete multi-signature coordinator vaults, geographic redundancy setups, regulatory compliances, and tax models.
                    </p>
                    <div className="border-t border-dashed border-gray-200 pt-3 space-y-1.5">
                      <span className="block font-mono text-[9px] font-extrabold text-[#9313b3] uppercase">INCLUDED INSTRUCTIONS:</span>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 font-mono text-[11px] text-gray-700">
                          <CornerDownRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          <span>Syllabus 4.1: Crypto Regulations & Global Taxes</span>
                        </div>
                        <div className="flex items-center gap-1.5 font-mono text-[11px] text-gray-700">
                          <CornerDownRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          <span>Syllabus 4.2: Multisig Vaults & Time Locks</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between font-mono text-xs font-bold pt-4 text-[#9313b3] group-hover:underline">
                    <span>ENTER CLASSROOM</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Quick statistics / assurance */}
              <div className="bg-neutral-900 text-white p-5 border-heavy flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="font-mono space-y-1">
                  <div className="text-[#72ff70] text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-brand-primary" /> CERTIFIED SECURE SYLLABUSES
                  </div>
                  <p className="text-[11px] text-gray-400">
                    All classroom syllabuses undergo independent verification checking to isolate active vector threat chains.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Fast search syllabus..."
                    className="bg-[#1e1e1e] border border-gray-800 text-white font-mono text-xs px-3 py-1.5 focus:outline-none focus:border-[#72ff70]"
                  />
                </div>
              </div>
            </div>
          ) : (
            /* =======================================================
               2. FILTERED CLASSROOM VIEW: SEARCH CONTROLS & SECTIONS
               ======================================================= */
            <div className="space-y-6">
              {/* Directory Navigation Level Tabs (Strict Scrollable Constraint) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center border-b border-black/10 pb-4">
                <div className="lg:col-span-8 flex overflow-x-auto whitespace-nowrap scrollbar-clean gap-2">
                  {[
                    { id: 'all', label: language === 'es' ? 'TODOS LOS DIRECTORIOS' : 'ALL DIRECTORIES' },
                    { id: 'beginner', label: language === 'es' ? '🟢 AULA DE PRINCIPIANTES' : '🟢 BEGINNER CLASSROOM' },
                    { id: 'moderate', label: language === 'es' ? '🟡 AULA MODERADA' : '🟡 MODERATE CLASSROOM' },
                    { id: 'intermediate', label: language === 'es' ? '🔴 AULA INTERMEDIA' : '🔴 INTERMEDIATE CLASSROOM' },
                    { id: 'advanced', label: language === 'es' ? '🟣 AULA AVANZADA' : '🟣 ADVANCED CLASSROOM' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveClassLevel(tab.id as any);
                        setActiveLessonId(null); // Clear active lesson when switching levels
                        setQuizAnswer(null);
                        setQuizResult(null);
                      }}
                      className={`px-3 py-2 border-heavy font-mono text-[10.5px] font-bold uppercase transition-all duration-150 cursor-pointer active-press shrink-0 ${
                        activeClassLevel === tab.id
                          ? 'bg-black text-white'
                          : 'bg-white hover:bg-brand-surface-container text-gray-700'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Search Input */}
                <div className="lg:col-span-4 relative mt-2 lg:mt-0">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                     type="text"
                     value={searchQuery}
                     onChange={(e) => {
                       setSearchQuery(e.target.value);
                       if (activeClassLevel === 'beginner') {
                         setActiveLessonId(null); // exit to search results
                       }
                     }}
                     placeholder={language === 'es' ? "Buscar secciones de clase..." : "Search sections..."}
                     className="w-full pl-9 pr-4 py-2 border-heavy bg-white font-mono text-xs focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>
              </div>

              {/* Directory Title and Back to Hub Button */}
              <div className="flex items-center justify-between border-l-[6px] border-[#ab3600] pl-3 bg-[#fdfdfd] border py-2.5 px-3 neo-shadow-sm/80">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] font-black text-gray-400 uppercase">
                    {language === 'es' ? 'VISTA DE HORIZONTE:' : 'ACTIVE HUB VIEW:'}
                  </span>
                  <span className={`font-mono text-[11px] font-black px-2 py-0.5 uppercase tracking-wide border ${getLevelBadgeStyle(activeClassLevel === 'all' ? 'beginner' : activeClassLevel)}`}>
                    {activeClassLevel === 'all' 
                      ? (language === 'es' ? 'RESULTADOS DE BÚSQUEDA' : 'SEARCH RESULTS') 
                      : (language === 'es' ? `${activeClassLevel.toUpperCase()} - PLAN DE ESTUDIO` : `${activeClassLevel} CLASSROOM`)}
                  </span>
                </div>
                <button 
                  onClick={() => {
                    setActiveClassLevel('all');
                    setActiveLessonId(null);
                    setSearchQuery('');
                    setQuizAnswer(null);
                    setQuizResult(null);
                  }}
                  className="font-mono text-[10px] font-black uppercase text-gray-600 hover:text-[#ab3600] border border-heavy bg-white px-2.5 py-1 neo-shadow-sm flex items-center gap-1 cursor-pointer transition-all active-press"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  {language === 'es' ? 'SALIR AL MENÚ' : 'EXIT TO HUB'}
                </button>
              </div>

              {/* BEGINNER CLASSROOM: KIZITO UZOR ACADEMY CURRICULUM */}
              {activeClassLevel === 'beginner' ? (
                (() => {
                  const sectorsToUse = language === 'es' ? COURSE_SECTORS_ES : COURSE_SECTORS;
                  const courseInfo = language === 'es' ? WEB3_COURSE_INFO_ES : WEB3_COURSE_INFO;
                  
                  // Compute statistics
                  const allClassroomLessons = sectorsToUse.flatMap(sec => sec.sections);
                  const totalLessonsCount = allClassroomLessons.length;
                  const completedLessonsCount = allClassroomLessons.filter(s => completedLessons.includes(s.id)).length;
                  const courseProgressPercent = totalLessonsCount === 0 ? 0 : Math.round((completedLessonsCount / totalLessonsCount) * 100);

                  // If user is searching inside the class, show filtered simple list
                  if (searchQuery.trim() !== '') {
                    const filteredSyllabusLessons = allClassroomLessons.filter(s =>
                      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      s.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      s.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
                    );

                    return (
                      <div className="space-y-4">
                        <div className="font-mono text-xs text-gray-500 font-extrabold flex items-center gap-1">
                          <Search className="w-4 h-4 text-[#ab3600]" />
                          {language === 'es' 
                            ? `BÚSQUEDA: SE ENCONTRARON ${filteredSyllabusLessons.length} MATERIALES`
                            : `SEARCH: FOUND ${filteredSyllabusLessons.length} COURSE LESSONS`}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {filteredSyllabusLessons.map((lesson) => (
                            <div key={lesson.id} className="bg-white border-heavy neo-shadow hover:translate-y-[-2px] duration-150 transition-all flex flex-col justify-between group overflow-hidden text-left">
                              <div className="p-6 space-y-4 flex-grow">
                                <div className="flex justify-between items-start gap-2">
                                  <span className="font-mono text-[9px] font-black tracking-widest bg-emerald-50 text-emerald-800 border border-emerald-500 px-2 py-0.5 uppercase">
                                    ACADEMY COURSE
                                  </span>
                                  {completedLessons.includes(lesson.id) && (
                                    <span className="font-mono text-[9px] text-emerald-600 bg-emerald-50 border border-emerald-300 px-1.5 py-0.5 font-bold flex items-center gap-1 uppercase">
                                      <Check className="w-3 h-3" /> DECODED
                                    </span>
                                  )}
                                </div>
                                <h3 className="font-sora text-base font-extrabold text-gray-950 group-hover:text-[#ab3600] leading-snug line-clamp-2 uppercase">
                                  {lesson.title}
                                </h3>
                                <p className="font-mono text-[11px] text-gray-500 line-clamp-3 leading-relaxed">
                                  {lesson.excerpt}
                                </p>
                              </div>
                              <div className="p-6 py-4 border-t border-black bg-brand-surface flex items-center justify-between text-xs font-mono shrink-0">
                                <span className="text-gray-400 font-semibold">{lesson.readTime}</span>
                                <button
                                  onClick={() => {
                                    setActiveLessonId(lesson.id);
                                    setSearchQuery('');
                                    setQuizAnswer(null);
                                    setQuizResult(null);
                                  }}
                                  className="flex items-center gap-1 text-[#ab3600] font-black hover:underline cursor-pointer uppercase tracking-tight"
                                >
                                  {language === 'es' ? 'ESTUDIAR SECCIÓN' : 'STUDY SECTION'}
                                  <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  // LESSON STUDY VIEW
                  if (activeLessonId) {
                    const activeSection = allClassroomLessons.find(s => s.id === activeLessonId);
                    if (!activeSection) return null;

                    const curIndex = allClassroomLessons.findIndex(s => s.id === activeLessonId);
                    const prevLesson = curIndex > 0 ? allClassroomLessons[curIndex - 1] : null;
                    const nextLesson = curIndex < allClassroomLessons.length - 1 ? allClassroomLessons[curIndex + 1] : null;

                    return (
                      <div className="space-y-6 animate-fade-in-up text-left">
                        {/* Syllabus Navigation Controls */}
                        <div className="sticky top-[74px] z-30 bg-brand-surface border-b-4 border-black py-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-[subtle]">
                          <button
                            onClick={() => {
                              setActiveLessonId(null);
                              setQuizAnswer(null);
                              setQuizResult(null);
                            }}
                            className="flex items-center justify-center gap-2 px-4 py-2 bg-white border-heavy neo-shadow-sm hover:bg-neutral-50 text-xs font-mono font-bold uppercase transition-all duration-150 cursor-pointer active-press shrink-0"
                          >
                            <ArrowLeft className="w-4 h-4" />
                            {language === 'es' ? 'VOLVER AL TEMARIO' : 'BACK TO SYLLABUS'}
                          </button>

                          <div className="flex-grow flex items-center gap-3 font-mono text-[10px] md:text-xs bg-white border-heavy px-3 py-2 neo-shadow-sm/5">
                            <span className="font-black text-[#ab3600] uppercase tracking-wider shrink-0">LESSON PROGRESS:</span>
                            <div className="flex-grow bg-gray-100 border border-black h-2.5 overflow-hidden relative">
                              <div 
                                className="bg-[#ab3600] h-full transition-all duration-75"
                                style={{ width: `${scrollPercent}%` }}
                              />
                            </div>
                            <span className="font-extrabold text-gray-900 shrink-0 min-w-[35px] text-right">{scrollPercent}%</span>
                          </div>

                          <div className="flex gap-2 justify-end shrink-0">
                            {prevLesson && (
                              <button
                                onClick={() => {
                                  setActiveLessonId(prevLesson.id);
                                  setQuizAnswer(null);
                                  setQuizResult(null);
                                  window.scrollTo({ top: 0, behavior: 'instant' });
                                }}
                                className="px-3 py-1.5 bg-white hover:bg-neutral-50 border-heavy text-[10.5px] font-mono font-bold uppercase cursor-pointer"
                              >
                                ◀ {language === 'es' ? 'ANTERIOR' : 'PREV'}
                              </button>
                            )}
                            {nextLesson && (
                              <button
                                onClick={() => {
                                  setActiveLessonId(nextLesson.id);
                                  setQuizAnswer(null);
                                  setQuizResult(null);
                                  window.scrollTo({ top: 0, behavior: 'instant' });
                                }}
                                className="px-3 py-1.5 bg-white hover:bg-neutral-50 border-heavy text-[10.5px] font-mono font-bold uppercase cursor-pointer"
                              >
                                {language === 'es' ? 'SIGUIENTE' : 'NEXT'} ▶
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Complete textbook lesson details */}
                        <article className="bg-[#fffdfa] border-heavy neo-shadow p-6 md:p-10 space-y-8 relative overflow-hidden">
                          {/* Corner decorative stamp */}
                          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full blur-2xl pointer-events-none" />

                          <div className="space-y-3">
                            <div className="flex flex-wrap gap-2 items-center">
                              <span className="inline-block bg-[#ab3600] text-white border border-black font-mono text-[9px] font-black uppercase px-2 py-0.5 rounded-none">
                                {language === 'es' ? 'CURSO: ¿POR QUÉ WEB3? ¿POR QUÉ DEFI?' : 'MAJOR UNIFIED LESSON'}
                              </span>
                              <span className="inline-block bg-white border border-black/20 font-mono text-[9px] text-gray-500 font-extrabold px-1.5 py-0.5">
                                {activeSection.readTime}
                              </span>
                              {completedLessons.includes(activeSection.id) && (
                                <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-500 text-emerald-800 font-mono text-[9px] font-black px-2 py-0.5">
                                  <Check className="w-3 h-3" /> DECODED & SECURED
                                </span>
                              )}
                            </div>

                            <h2 className="font-sora text-xl md:text-3xl font-black text-gray-950 uppercase leading-snug">
                              {activeSection.title}
                            </h2>
                            <p className="font-mono text-xs text-[#ab3600] italic font-bold">
                              {activeSection.subtitle}
                            </p>

                            <div className="flex items-center gap-2 pt-2 border-t border-black/10 text-[10.5px] font-mono text-gray-500">
                              <User className="w-4 h-4 text-brand-primary" />
                              <span className="font-bold">{language === 'es' ? `Por ${courseInfo.author}` : `By ${courseInfo.author}`}</span>
                              <span>•</span>
                              <span className="underline">{courseInfo.socialX}</span>
                            </div>
                          </div>

                          {/* TEXTBOOK CONTENT WITH MARKDOWN LOOK */}
                          <div className="prose max-w-none text-sm leading-relaxed text-gray-800 font-sans border-t border-b border-black/5 py-6">
                            {renderFormattedContent(activeSection.content)}
                          </div>

                          {/* CORE LEARNING DIRECTIVES */}
                          <div className="border-heavy bg-[#f9fbfd] p-5 space-y-4 rounded-none">
                            <h3 className="font-mono text-xs font-bold text-gray-800 uppercase tracking-widest flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                              {language === 'es' ? 'DIRECTIVAS DE APRENDIZAJE CLAVE' : 'CORE LEARNING DIRECTIVES (SUMMARY)'}
                            </h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono text-gray-700">
                              {activeSection.steps.map((step, idx) => (
                                <li key={idx} className="flex gap-2 items-start bg-white border border-black/10 p-2.5">
                                  <span className="bg-[#ab3600] text-white px-1.5 py-0.5 text-[10px] font-bold shrink-0">{idx + 1}</span>
                                  <span className="leading-normal font-semibold text-gray-800">{step}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* IMPERATIVE SURVIVAL PROTOCOLS */}
                          <div className="border-heavy border-l-[8px] border-l-[#ab3600] bg-[#fff0ea] p-5 space-y-3">
                            <h4 className="font-mono text-xs font-bold text-[#ab3600] uppercase tracking-widest flex items-center gap-2">
                              <ShieldAlert className="w-5 h-5 stroke-[2.5]" />
                              {language === 'es' ? 'PROTOCOLOS DE SUPERVIVENCIA SEGURA' : 'IMPERATIVE SURVIVAL PROTOCOLS'}
                            </h4>
                            <div className="space-y-2">
                              {activeSection.safetyNotes.map((note, index) => (
                                <p key={index} className="font-mono text-xs text-gray-800 leading-relaxed pl-4 border-l border-brand-primary/30 font-bold">
                                  ⚠️ {note}
                                </p>
                              ))}
                            </div>
                          </div>

                          {/* INTERACTIVE COMPREHENSION QUIZ */}
                          {activeSection.quizQuestion && (
                            <div className="border-2 border-black bg-yellow-50/30 p-5 md:p-6 space-y-4">
                              <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-[#ab3600] uppercase">
                                <HelpCircle className="w-5 h-5" />
                                {language === 'es' ? 'EVALUACIÓN DE COMPRENSIÓN RÁPIDA' : 'CONCEPT ASSESSMENT QUIZ'}
                              </div>
                              <h4 className="font-sora text-sm font-bold text-gray-950 uppercase leading-snug">
                                {activeSection.quizQuestion}
                              </h4>

                              <div className="space-y-2.5">
                                {activeSection.quizOptions?.map((option, idx) => (
                                  <button
                                    key={idx}
                                    onClick={() => {
                                      setQuizAnswer(idx);
                                      setQuizResult(null);
                                    }}
                                    className={`w-full text-left font-mono text-xs p-3 border-heavy cursor-pointer flex items-center gap-3 transition-colors ${
                                      quizAnswer === idx
                                        ? 'bg-black text-[#72ff70] font-black'
                                        : 'bg-white text-gray-800 hover:bg-neutral-50'
                                    }`}
                                  >
                                    <span className="border border-black px-1.5 py-0.5 text-[9px] font-bold bg-gray-50 text-gray-900 shrink-0">
                                      {String.fromCharCode(65 + idx)}
                                    </span>
                                    <span>{option}</span>
                                  </button>
                                ))}
                              </div>

                              <div className="flex gap-3 justify-start pt-2">
                                <button
                                  onClick={() => {
                                    if (quizAnswer === null) {
                                      alert(language === 'es' ? 'Por favor seleccione una opción de respuesta.' : 'Please select an option first.');
                                      return;
                                    }
                                    if (quizAnswer === activeSection.quizAnswerIndex) {
                                      setQuizResult('correct');
                                      markLessonComplete(activeSection.id);
                                    } else {
                                      setQuizResult('incorrect');
                                    }
                                  }}
                                  className="px-4 py-2 bg-[#ab3600] text-white hover:bg-[#ab3600]/90 border-heavy text-xs font-mono font-bold uppercase transition duration-150 cursor-pointer active-press"
                                >
                                  {language === 'es' ? 'VERIFICAR LÓGICA DE FIRMA' : 'SUBMIT REVIEWS FOR SIGNATURE'}
                                </button>
                                {quizResult && (
                                  <button
                                    onClick={() => {
                                      setQuizAnswer(null);
                                      setQuizResult(null);
                                    }}
                                    className="px-3 py-1 border border-black hover:bg-neutral-50 font-mono text-xs font-bold uppercase cursor-pointer"
                                  >
                                    {language === 'es' ? 'DESPEJAR' : 'CLEAR'}
                                  </button>
                                )}
                              </div>

                              {quizResult === 'correct' && (
                                <div className="border-heavy bg-[#d2ffdb] text-[#136327] p-4 font-mono text-xs font-semibold flex items-start gap-2.5 animate-fade-in uppercase">
                                  <CheckCircle2 className="w-5 h-5 text-[#136327] shrink-0 mt-0.5" />
                                  <div>
                                    <p className="font-black text-gray-900 block">
                                      {language === 'es' ? '✓ CONCEPTOS CONFIRMADOS Y GRABADOS' : '✓ SIGNATURE APPROVED & KEY RESOLUTED'}
                                    </p>
                                    <p className="mt-1 text-gray-700 font-bold lowercase leading-snug">
                                      {language === 'es' ? 'ha descifrado la lección con éxito. Se ha archivado una firma criptográfica de progreso.' : 'You have accurately decoded the conceptual models in this chapter. progress recorded.'}
                                    </p>
                                  </div>
                                </div>
                              )}

                              {quizResult === 'incorrect' && (
                                <div className="border-heavy bg-[#fff0ea] text-[#ab3600] p-4 font-mono text-xs font-semibold flex items-start gap-2.5 animate-fade-in uppercase">
                                  <AlertTriangle className="w-5 h-5 text-[#ab3600] shrink-0 mt-0.5" />
                                  <div>
                                    <p className="font-black text-gray-900 block">
                                      {language === 'es' ? '❌ EXCEPCIÓN DE VALIDACIÓN DE NODO' : '❌ NETWORK VALIDATION EXCEPTION'}
                                    </p>
                                    <p className="mt-1 text-gray-700 font-bold lowercase leading-snug">
                                      {language === 'es' ? 'la respuesta firmada resulta inconsistente con los parámetros del libro. vuelva a leer el manual.' : 'the signed message is inconsistent with verification criteria. retry the assessment.'}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </article>

                        {/* Navigation Footer */}
                        <div className="flex justify-between items-center bg-white border-heavy p-4 neo-shadow-sm font-mono text-xs">
                          {prevLesson ? (
                            <button
                              onClick={() => {
                                setActiveLessonId(prevLesson.id);
                                setQuizAnswer(null);
                                setQuizResult(null);
                                window.scrollTo({ top: 0, behavior: 'instant' });
                              }}
                              className="text-gray-700 hover:text-[#ab3600] font-bold flex items-center gap-1 cursor-pointer"
                            >
                              ◀ {language === 'es' ? 'ANTERIOR SECCIÓN' : 'PREVIOUS MANUAL'}
                            </button>
                          ) : <div />}

                          {nextLesson ? (
                            <button
                              onClick={() => {
                                setActiveLessonId(nextLesson.id);
                                setQuizAnswer(null);
                                setQuizResult(null);
                                window.scrollTo({ top: 0, behavior: 'instant' });
                              }}
                              className="text-[#ab3600] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                            >
                              {language === 'es' ? 'SIGUIENTE SECCIÓN' : 'NEXT MANUAL'} ▶
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                setActiveLessonId(null);
                                setQuizAnswer(null);
                                setQuizResult(null);
                              }}
                              className="bg-black text-[#72ff70] px-3 py-1 font-bold cursor-pointer uppercase"
                            >
                              ✓ {language === 'es' ? 'CURSO COMPLETADO' : 'COMPLETE SYLLABUS'}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  }

                  // SYLLABUS LIST VIEW
                  return (
                    <div className="space-y-6 animate-fade-in text-left">
                      {/* Classroom Main Banner with Book Cover Look */}
                      <div className="border-heavy bg-white p-5 md:p-8 neo-shadow relative overflow-hidden flex flex-col md:flex-row gap-6 items-start">
                        {/* Book decoration cover left */}
                        <div className="w-full md:w-48 shrink-0 bg-gradient-to-tr from-stone-900 to-black text-white p-4 border-2 border-black flex flex-col justify-between h-64 neo-shadow-sm/80 font-mono select-none">
                          <div className="space-y-1">
                            <span className="bg-[#ab3600] text-white text-[8px] font-black tracking-widest px-1 py-0.5 uppercase border border-black max-w-max block">ACADEMY MANUAL</span>
                            <h4 className="font-sora text-sm font-black tracking-tight uppercase leading-snug mt-2">
                              {courseInfo.title}
                            </h4>
                            <p className="text-[7.5px] text-gray-400 font-extrabold uppercase mt-1 leading-none">
                              {courseInfo.subtitle}
                            </p>
                          </div>
                          <div className="border-t border-dashed border-gray-600 pt-2 space-y-1">
                            <span className="text-[7.5px] text-gray-500 font-bold block">AUTHOR WRITER</span>
                            <span className="text-[9px] font-bold text-gray-100">{courseInfo.author}</span>
                            <span className="text-[7px] text-[#72ff70] font-black">{courseInfo.socialX}</span>
                          </div>
                        </div>

                        {/* Description right */}
                        <div className="space-y-4 flex-grow">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="bg-[#fff0ea] text-[#ab3600] border border-[#ab3600] font-mono text-[9px] font-black uppercase px-2 py-0.5">
                              LOCKED-DOWN CORE CURRICULUM
                            </span>
                            <span className="bg-[#eef3ff] text-[#0040e0] border border-[#0040e0] font-mono text-[9px] font-black uppercase px-2 py-0.5">
                              WEB3 & DEFI FIRST PRINCIPLES
                            </span>
                          </div>

                          <h3 className="font-sora text-xl font-extrabold text-[#ab3600] uppercase tracking-tight">
                            {courseInfo.title}
                          </h3>
                          <p className="font-mono text-xs text-gray-600 leading-relaxed font-bold">
                            {courseInfo.introduction}
                          </p>

                          <div className="flex items-center gap-2 pt-2 border-t border-black/10 text-[11px] font-mono text-gray-500">
                            <Twitter className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                            <span>{language === 'es' ? 'Visita en X para interactuar directament con el autor:' : 'Follow the author for on-chain telemetry on X:'}</span>
                            <a href={`https://x.com/${courseInfo.socialX.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-[#ab3600] font-extrabold underline block">{courseInfo.socialX}</a>
                          </div>
                        </div>
                      </div>

                      {/* INDIGNANT PROGRESS TRACK BAR */}
                      <div className="border-heavy bg-[#faf9f6] p-5 neo-shadow-sm grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                        <div className="md:col-span-8 space-y-2">
                          <div className="flex items-center justify-between font-mono text-xs">
                            <span className="font-black text-gray-900 uppercase flex items-center gap-1.5">
                              <BookMarked className="w-4 h-4 text-brand-primary" />
                              {language === 'es' ? 'EXPEDIENTE ACADÉMICO COGNITIVO:' : 'COGNITIVE LEARNING CLEARANCE PROFILE:'}
                            </span>
                            <span className="font-extrabold text-[#ab3600]">
                              {completedLessonsCount} / {totalLessonsCount} {language === 'es' ? 'Secciones Descifradas' : 'Modules Decoded'} ({courseProgressPercent}%)
                            </span>
                          </div>

                          <div className="bg-gray-200 border-2 border-black h-4 overflow-hidden relative neo-shadow-sm/5 leading-none">
                            <div 
                              className="bg-emerald-500 h-full transition-all duration-300"
                              style={{ width: `${courseProgressPercent}%` }}
                            />
                          </div>

                          {courseProgressPercent === 100 && (
                            <div className="bg-gradient-to-r from-neutral-900 to-black text-[#72ff70] border border-black p-2.5 font-mono text-[10px] font-black text-center uppercase tracking-wider animate-pulse flex items-center justify-center gap-2">
                              <Sparkles className="w-4 h-4 text-brand-primary animate-spin" />
                              ✦ {language === 'es' ? 'GRADUADO: SE HA CERTIFICADO SU SOBERANÍA WEB3' : 'GRADUATION: YOU HAVE ACQUIRED FULL COGNITIVE CLEARANCE'} ✦
                            </div>
                          )}
                        </div>

                        <div className="md:col-span-4 flex md:justify-end">
                          {completedLessonsCount > 0 ? (
                            <button
                              onClick={resetCourseProgress}
                              className="flex items-center justify-center gap-2 px-3 py-1.5 border-heavy bg-white hover:bg-neutral-50 font-mono text-[10px] font-black uppercase text-rose-700 cursor-pointer transition active-press"
                              title="Reset learning course tracker"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                              {language === 'es' ? 'REINICIAR EXPEDIENTE' : 'RESET LOG REPRINTS'}
                            </button>
                          ) : (
                            <div className="font-mono text-[9px] text-gray-400 text-center uppercase font-bold">
                              {language === 'es' ? 'Autocustodia: 100% Responsabilidad' : 'Autocustodia: 100% Responsibility'}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* SECTORS COLLAPSIBLE BOXES */}
                      <div className="space-y-4">
                        <h4 className="font-sora text-sm font-black text-gray-950 uppercase tracking-tight flex items-center gap-2">
                          <FolderOpen className="w-4 h-4 text-[#ab3600]" />
                          {language === 'es' ? 'TEMARIO DE SECTORES Y LECCIONES INTERACTIVAS' : 'CURRICULUM SYLLABUS DIRECTORY MAP'}
                        </h4>

                        <div className="space-y-4">
                          {sectorsToUse.map((sector) => {
                            const isExpanded = expandedSectors.includes(sector.id);
                            
                            // Check completed count inside this sector
                            const sectorCompleted = sector.sections.filter(s => completedLessons.includes(s.id)).length;
                            const isSectorDecorated = sectorCompleted === sector.sections.length;

                            return (
                              <div key={sector.id} className="border-heavy bg-white neo-shadow-sm overflow-hidden text-left">
                                {/* Sector Header bar */}
                                <div 
                                  onClick={() => toggleSector(sector.id)}
                                  className="border-b border-black/10 p-4 bg-brand-surface hover:bg-neutral-50 transition cursor-pointer flex justify-between items-center select-none"
                                >
                                  <div className="space-y-1 pr-6">
                                    <div className="flex items-center gap-1.5">
                                      <span className="font-mono text-[9.5px] font-black bg-black text-[#72ff70] px-2 py-0.5 uppercase border border-black">
                                        {sector.levelBadge}
                                      </span>
                                      <span className="font-mono text-[9px] text-[#ab3600] font-black">
                                        {sectorCompleted} / {sector.sections.length} {language === 'es' ? 'COMPLETADOS' : 'DECODED'}
                                      </span>
                                      {isSectorDecorated && (
                                        <span className="text-[10px] text-emerald-600 font-extrabold flex items-center gap-0.5">
                                          ✓ Secured
                                        </span>
                                      )}
                                    </div>
                                    <h3 className="font-sora text-base font-black text-gray-950 leading-snug uppercase">
                                      {sector.title}
                                    </h3>
                                    <p className="font-mono text-[11px] text-gray-500">
                                      {sector.description}
                                    </p>
                                  </div>
                                  <div className="shrink-0 text-gray-600">
                                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                  </div>
                                </div>

                                {/* Sections listing underneath if expanded */}
                                {isExpanded && (
                                  <div className="divide-y divide-black/10 bg-[#fdfdfc] p-1.5 md:p-3 space-y-3">
                                    {sector.sections.map((section, idx) => {
                                      const isSecCompleted = completedLessons.includes(section.id);
                                      return (
                                        <div 
                                          key={section.id} 
                                          className={`p-4 bg-white border border-black/10 neo-shadow-sm/5 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between hover:border-black/30 transition-all ${
                                            isSecCompleted ? 'border-l-4 border-l-emerald-500' : 'border-l-4 border-l-stone-300'
                                          }`}
                                        >
                                          <div className="space-y-1.5 max-w-3xl">
                                            <div className="flex items-center gap-2">
                                              <span className="font-mono text-[9px] text-[#ab3600] font-bold">
                                                {language === 'es' ? `MANUAL PRINCIPIANTE ${idx+1}` : `BEGINNER MANUAL ${idx+1}`}
                                              </span>
                                              <span>•</span>
                                              <span className="font-mono text-[9.5px] text-gray-400 font-extrabold">{section.readTime}</span>
                                            </div>
                                            <h4 className="font-sora text-sm font-extrabold text-gray-950 leading-snug uppercase">
                                              {section.title}
                                            </h4>
                                            <p className="font-mono text-[11px] text-gray-500 leading-normal">
                                              {section.excerpt}
                                            </p>
                                          </div>

                                          <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                                            {isSecCompleted ? (
                                              <span className="bg-emerald-50 text-emerald-800 border border-emerald-500 rounded-none px-2.5 py-1 font-mono text-[9.5px] font-black flex items-center gap-1 leading-none uppercase">
                                                <Check className="w-3.5 h-3.5 text-emerald-800 stroke-[2.5]" />
                                                {language === 'es' ? 'Descifrado' : 'Decoded'}
                                              </span>
                                            ) : (
                                              <span className="bg-[#fff9e6] text-amber-800 border border-amber-300 rounded-none px-2 py-0.5 font-mono text-[8px] font-extrabold uppercase leading-none">
                                                {language === 'es' ? 'Pendiente' : 'Ready'}
                                              </span>
                                            )}
                                            
                                            <button
                                              onClick={() => {
                                                setActiveLessonId(section.id);
                                                setQuizAnswer(null);
                                                setQuizResult(null);
                                                window.scrollTo({ top: 0, behavior: 'instant' });
                                              }}
                                              className="px-3 py-1.5 bg-white border-heavy hover:bg-neutral-50 text-xs font-mono font-bold uppercase cursor-pointer active-press"
                                            >
                                              {language === 'es' ? 'Iniciar' : 'Study'}
                                            </button>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })()
              ) : (
                /* FALLBACK RENDERER: MODERATE, INTERMEDIATE, ADVANCED CLASSROOM FLAT LIST */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                  {filteredArticles.map((article, idx) => {
                    const level = getArticleLevel(article);
                    return (
                      <div
                        key={article.id}
                        className="bg-white border-heavy neo-shadow hover:translate-y-[-2px] duration-150 transition-all flex flex-col justify-between group overflow-hidden text-left"
                      >
                        <div className="p-6 space-y-4 flex-grow">
                          <div className="flex justify-between items-start gap-2">
                            <span className={`inline-block border px-2 py-0.5 font-mono text-[9px] font-bold uppercase ${getLevelBadgeStyle(level)}`}>
                              {level.toUpperCase()}
                            </span>
                            <span className="font-mono text-[9px] text-gray-400 font-bold uppercase">
                              SECTION {level === 'beginner' ? '1' : level === 'moderate' ? '2' : level === 'intermediate' ? '3' : '4'}.{idx + 1}
                            </span>
                          </div>
                          
                          <h3 
                            className="font-sora text-base font-extrabold text-gray-950 group-hover:text-[#ab3600] leading-snug block transition-colors cursor-pointer uppercase line-clamp-2" 
                            onClick={() => setSelectedArticleId(article.id)}
                          >
                            {article.title}
                          </h3>

                          <p className="font-mono text-[11px] text-gray-600 leading-relaxed line-clamp-3">
                            {article.excerpt}
                          </p>
                        </div>

                        <div className="p-6 py-4 border-t border-black bg-brand-surface flex items-center justify-between text-xs font-mono shrink-0">
                          <span className="text-gray-400 font-semibold">{article.readTime}</span>
                          <button
                            onClick={() => setSelectedArticleId(article.id)}
                            className="flex items-center gap-1 text-[#ab3600] font-black hover:underline cursor-pointer uppercase tracking-tight"
                          >
                            {language === 'es' ? 'ESTUDIAR SECCIÓN' : 'STUDY SECTION'}
                            <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  {filteredArticles.length === 0 && (
                    <div className="col-span-full bg-white border-heavy p-8 text-center font-mono text-xs text-gray-500 space-y-2">
                      <p>⚠️ No syllabus sections match your search keys inside this class.</p>
                      <button onClick={() => { setActiveClassLevel('all'); setSearchQuery(''); }} className="underline text-[#ab3600] font-bold">Clear All Search Filters</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <ReportInaccuracyButton pageName="Beginner Guides" />
    </div>
  );
};
