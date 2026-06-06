import React, { useState, useEffect, useRef } from 'react';
import { AppView } from '../types';
import { Shield, Radio, ShieldCheck, Globe, Wifi, BookOpen, Layers, HelpCircle, FileCheck, Search, AlertTriangle, Menu, X, Clock, Mail, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { guideArticles, platformReviews, blogPosts, countryProfiles } from '../extendedData';
import { EXCHANGES_DB } from './ExchangesDirectory';
import { useLanguage } from '../utils/LanguageContext';

interface SearchResultItem {
  id: string;
  title: string;
  snippet: string;
  category: string;
  type: 'guide' | 'review' | 'blog' | 'country' | 'exchange';
  view: AppView;
}

interface HeaderProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
  const { language, setLanguage, t } = useLanguage();
  const [currentTime, setCurrentTime] = useState<string>('');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showResults, setShowResults] = useState<boolean>(false);
  const [activeSearchFilter, setActiveSearchFilter] = useState<'all' | 'guide' | 'review' | 'blog' | 'country' | 'exchange'>('all');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchResultsRef = useRef<HTMLDivElement>(null);

  // Reset filter when search query transitions or when search box state changes
  useEffect(() => {
    setActiveSearchFilter('all');
  }, [searchQuery, isSearchOpen]);

  // Setup Hotkey triggers (Ctrl+K to search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
        setIsMenuOpen(false);
        setTimeout(() => searchInputRef.current?.focus(), 150);
      }
      if (e.key === 'Escape') {
        setShowResults(false);
        setIsSearchOpen(false);
        searchInputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Dismiss search overlay on clicking outside the search element
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchInputRef.current && 
        !searchInputRef.current.contains(e.target as Node) &&
        searchResultsRef.current &&
        !searchResultsRef.current.contains(e.target as Node)
      ) {
        setShowResults(false);
      }
    };
    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getSearchResults = (): SearchResultItem[] => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase().trim();
    const results: SearchResultItem[] = [];

    // 1. Index beginner guides
    guideArticles.forEach(guide => {
      if (
        guide.title.toLowerCase().includes(query) ||
        guide.subtitle.toLowerCase().includes(query) ||
        guide.excerpt.toLowerCase().includes(query) ||
        guide.content.toLowerCase().includes(query)
      ) {
        results.push({
          id: guide.id,
          title: guide.title,
          snippet: guide.excerpt,
          category: 'GUIDE SYLLABUS',
          type: 'guide',
          view: 'beginner-guides'
        });
      }
    });

    // 2. Index platform reviews
    platformReviews.forEach(review => {
      if (
        review.name.toLowerCase().includes(query) ||
        review.verdict.toLowerCase().includes(query) ||
        review.pros.some(p => p.toLowerCase().includes(query)) ||
        review.cons.some(c => c.toLowerCase().includes(query)) ||
        review.securityFeatures.some(f => f.toLowerCase().includes(query))
      ) {
        results.push({
          id: review.id,
          title: `${review.name} (${review.type.toUpperCase()})`,
          snippet: review.verdict,
          category: `CUSTODY REVIEW • Score: ${review.safetyScore}/100`,
          type: 'review',
          view: 'reviews'
        });
      }
    });

    // 3. Index alerts/blog posts
    blogPosts.forEach(post => {
      if (
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query) ||
        post.tags.some(t => t.toLowerCase().includes(query))
      ) {
        results.push({
          id: post.id,
          title: post.title,
          snippet: post.excerpt,
          category: `FORENSIC BULLETIN • ${post.category.toUpperCase()}`,
          type: 'blog',
          view: 'blog'
        });
      }
    });

    // 4. Index Country Profiles
    countryProfiles.forEach(country => {
      if (
        country.name.toLowerCase().includes(query) ||
        country.overview.toLowerCase().includes(query) ||
        country.regulatorName.toLowerCase().includes(query) ||
        country.taxPolicy.toLowerCase().includes(query) ||
        country.recommendedPractices.some(p => p.toLowerCase().includes(query)) ||
        country.localRisks.some(r => r.toLowerCase().includes(query))
      ) {
        results.push({
          id: country.id,
          title: `${country.flagEmoji} ${country.name}`,
          snippet: country.overview,
          category: `COUNTRY CORRIDOR • Regional Segment: ${country.region}`,
          type: 'country',
          view: 'countries'
        });
      }
    });

    // 5. Index Exchanges from EXCHANGES_DB
    EXCHANGES_DB.forEach(exch => {
      if (
        exch.name.toLowerCase().includes(query) ||
        exch.registeredBody.toLowerCase().includes(query) ||
        exch.description.toLowerCase().includes(query) ||
        exch.custodyMethod.toLowerCase().includes(query) ||
        exch.pros.some(p => p.toLowerCase().includes(query)) ||
        exch.cons.some(c => c.toLowerCase().includes(query))
      ) {
        results.push({
          id: exch.id,
          title: `🏛️ ${exch.name}`,
          snippet: exch.description,
          category: `EXCHANGE DIRECTORY • Safety: ${exch.securityScore}/100 [${exch.riskCategory}]`,
          type: 'exchange',
          view: 'exchanges-directory'
        });
      }
    });

    return results;
  };

  const rawSearchResults = getSearchResults();

  const searchCounts = {
    all: rawSearchResults.length,
    guide: rawSearchResults.filter(item => item.type === 'guide').length,
    review: rawSearchResults.filter(item => item.type === 'review').length,
    blog: rawSearchResults.filter(item => item.type === 'blog').length,
    country: rawSearchResults.filter(item => item.type === 'country').length,
    exchange: rawSearchResults.filter(item => item.type === 'exchange').length,
  };

  const searchResults = activeSearchFilter === 'all'
    ? rawSearchResults
    : rawSearchResults.filter(item => item.type === activeSearchFilter);

  const handleResultClick = (item: SearchResultItem) => {
    setSearchQuery('');
    setShowResults(false);
    setIsSearchOpen(false);
    setIsMenuOpen(false);
    setView(item.view);
    
    // Smooth transition routing events launch
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (item.view === 'beginner-guides') {
        window.dispatchEvent(new CustomEvent('csg-open-article', { detail: item.id }));
      } else if (item.view === 'blog') {
        window.dispatchEvent(new CustomEvent('csg-open-post', { detail: item.id }));
      } else if (item.view === 'reviews') {
        window.dispatchEvent(new CustomEvent('csg-open-platform', { detail: item.id }));
      } else if (item.view === 'countries') {
        window.dispatchEvent(new CustomEvent('csg-open-country', { detail: item.id }));
      } else if (item.view === 'exchanges-directory') {
        window.dispatchEvent(new CustomEvent('csg-open-exchange', { detail: item.id }));
      }
    }, 100);
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toUTCString().replace('GMT', 'UTC'));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress((scrollTop / docHeight) * 100);
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const intervalId = setInterval(handleScroll, 400);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(intervalId);
    };
  }, [currentView]);

  const isLongFormPage = ['beginner-guides', 'blog', 'start-here', 'reviews', 'security-centre'].includes(currentView);

  const primaryNavItems: { id: AppView; label: string; badge?: string; desc: string; icon: React.ReactNode }[] = [
    { 
      id: 'home', 
      label: 'HOME FEED', 
      desc: 'Interactive live intelligence telemetry, security dispatches and core feed.',
      icon: <Radio className="w-4.5 h-4.5" /> 
    },
    { 
      id: 'about', 
      label: 'ABOUT XTSG', 
      badge: 'CHARTER', 
      desc: 'Our uncompromised public auditing pledge, forensic analysts register, and white-hat milestones.',
      icon: <Compass className="w-4.5 h-4.5" /> 
    },
    { 
      id: 'start-here', 
      label: 'START HERE', 
      badge: 'GUIDE', 
      desc: 'Critical security onboarding, foundational checklists, and threat mitigation rules.',
      icon: <ShieldCheck className="w-4.5 h-4.5" /> 
    },
    { 
      id: 'security-centre', 
      label: 'SECURITY CENTRE', 
      badge: 'ACTIVE', 
      desc: 'Live database of verified scam domains, smart exploits, and malicious address watchlists.',
      icon: <Shield className="w-4.5 h-4.5" /> 
    },
    { 
      id: 'countries', 
      label: 'COUNTRIES PORTALS', 
      badge: 'GLOBAL', 
      desc: 'Local peer-to-peer security advisories, p2p escrow rules, and national regulator warnings.',
      icon: <Globe className="w-4.5 h-4.5" /> 
    },
    { 
      id: 'contact', 
      label: 'CONTACT PAGE', 
      badge: 'INQUIRIES', 
      desc: 'Official contact portal for business collaborations, directory listings, alliances, or sponsorships.',
      icon: <Mail className="w-4.5 h-4.5" /> 
    },
  ];

  const secondaryNavItems: { id: AppView; label: string; badge?: string; desc: string; imageUrl: string }[] = [
    { 
      id: 'beginner-guides', 
      label: 'Classroom Syllabus', 
      desc: 'Three core levels: Beginner, Moderate, and Intermediate educational directories.',
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=300&q=80'
    },
    { 
      id: 'stablecoins-and-payments', 
      label: 'Stablecoins & Payments', 
      desc: 'Secure collateral and transaction vectors.',
      imageUrl: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=300&q=80'
    },
    { 
      id: 'reviews', 
      label: 'Reviews & Comparisons', 
      desc: 'Rigorous vetting of Web3 custodial products.',
      imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=300&q=80'
    },
    { 
      id: 'exchanges-directory', 
      label: 'Exchanges Directory', 
      desc: 'Regulated market portals and risk indexes.',
      imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=300&q=80'
    },
    { 
      id: 'blog', 
      label: 'Blog & Alerts', 
      desc: 'Emergency warnings and regulatory bulletins.',
      imageUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=300&q=80'
    },
    { 
      id: 'resources', 
      label: 'Resources & Stencils', 
      desc: 'Operational handbooks and offline stencils.',
      imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=300&q=80'
    },
    { 
      id: 'faq', 
      label: 'FAQs Solver', 
      desc: 'Interactive troubleshooting matrix.',
      imageUrl: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&w=300&q=80'
    },
    { 
      id: 'legal', 
      label: 'Disclosures', 
      desc: 'Charter terms, audits, and compliance declarations.',
      imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=300&q=80'
    },
  ];

  return (
    <>
      {/* Dynamic Scroll Depth Indicator on long-form content pages */}
      <AnimatePresence>
        {isLongFormPage && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 h-[5px] bg-[#ff5f1f] z-50 pointer-events-none origin-left"
            style={{ width: `${scrollProgress}%` }}
            id="scroll-depth-progress-bar"
          >
            {/* Highly active neo glow block */}
            <div className="absolute right-0 top-0 bottom-0 w-3 bg-white border-l border-black" />
          </motion.div>
        )}
      </AnimatePresence>

      <header className="sticky top-0 z-40 w-full border-b-[4px] border-black bg-[#fafafa] py-3 px-4 md:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* LOGO AND BRAND CORE */}
          <div 
            onClick={() => {
              setView('home');
              setIsMenuOpen(false);
              setIsSearchOpen(false);
            }}
            className="flex items-center gap-3 cursor-pointer group select-none"
            id="header-brand-logo-container"
          >
            <div className="bg-[#ab3600] border-heavy p-2 text-white neo-shadow-sm group-hover:bg-[#ff5f1f] transition-colors duration-150 flex items-center justify-center">
              <Shield className="w-5.5 h-5.5 md:h-7 md:w-7 fill-white text-white stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[8px] md:text-[9px] tracking-widest text-[#0040e0] font-black bg-[#efefff] border border-[#0040e0] px-1.5 py-0.5 uppercase leading-none rounded-none">
                  {t('brand.initiative', 'GLOBAL INITIATIVE')}
                </span>
                <div className="flex items-center gap-1 text-[8px] md:text-[9px] font-mono text-[#006e16] font-black bg-[#d2ffdb] px-1 py-0.5 rounded-none border border-[#006e16]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006e16] animate-ping" />
                  <span>{t('brand.live', 'LIVE')}</span>
                </div>
              </div>
              <h1 className="font-sora text-xl md:text-2xl font-extrabold tracking-tighter text-[#1b1b1b] leading-none mt-1">
                XTSG.<span className="text-[#ff5f1f]">GLOBAL</span>
              </h1>
              <p className="hidden xs:block text-[8px] md:text-[9px] font-bold text-gray-500 mt-0.5 uppercase tracking-wider">
                {t('brand.tagline', 'Xcrypto-Trading Security Global Repository')}
              </p>
            </div>
          </div>

          {/* DOCK CONTROLS & TRIGGERS - UNIVERSAL COMPACT DESIGN FOR BOTH TABLETS AND DESKTOPS */}
          <div className="flex items-center gap-2 md:gap-3">
            
            {/* UNIFIED INTERACTIVE HEADER CONTROLS */}
            <div className="flex items-center gap-2">
              {/* Universal Search Button */}
              <button
                onClick={() => {
                  setIsSearchOpen(!isSearchOpen);
                  setIsMenuOpen(false);
                  if (!isSearchOpen) {
                    setTimeout(() => searchInputRef.current?.focus(), 150);
                  }
                }}
                className={`p-2.5 md:p-3 border-2 border-black active-press cursor-pointer transition-colors duration-150 flex items-center justify-center ${
                  isSearchOpen ? 'bg-black text-[#72ff70]' : 'bg-white hover:bg-neutral-100 text-black'
                }`}
                aria-label="Toggle search container"
                id="search-toggle-btn"
              >
                <Search className="w-4 h-4 md:w-4.5 md:h-4.5 text-current stroke-[2.5]" />
              </button>

              {/* Universal Animated Hamburger Menu Trigger */}
              <button
                onClick={() => {
                  setIsMenuOpen(!isMenuOpen);
                  setIsSearchOpen(false);
                }}
                className={`p-2.5 md:p-3 border-2 border-black active-press cursor-pointer flex items-center justify-center gap-2 transition-all duration-150 ${
                  isMenuOpen ? 'bg-[#ff5f1f] text-black' : 'bg-black text-white hover:bg-neutral-900'
                }`}
                aria-label="Toggle navigation directory"
                id="menu-toggle-hamburger-btn"
              >
                {/* Advanced Animated SVG Hamburger lines morphing seamlessly to X state */}
                <div className="w-5 h-5 flex flex-col justify-between items-stretch relative shrink-0">
                  <motion.span
                    animate={isMenuOpen ? { rotate: 45, y: 8, backgroundColor: "#000000" } : { rotate: 0, y: 0, backgroundColor: "#ffffff" }}
                    transition={{ type: "spring", stiffness: 350, damping: 22 }}
                    className="h-[2.5px] w-full block rounded-none origin-center"
                    style={{ backgroundColor: isMenuOpen ? '#000000' : '#ffffff' }}
                  />
                  <motion.span
                    animate={isMenuOpen ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
                    transition={{ duration: 0.15 }}
                    className="h-[2.5px] w-full block rounded-none"
                    style={{ backgroundColor: isMenuOpen ? '#000000' : '#ffffff' }}
                  />
                  <motion.span
                    animate={isMenuOpen ? { rotate: -45, y: -8, backgroundColor: "#000000" } : { rotate: 0, y: 0, backgroundColor: "#ffffff" }}
                    transition={{ type: "spring", stiffness: 350, damping: 22 }}
                    className="h-[2.5px] w-full block rounded-none origin-center"
                    style={{ backgroundColor: isMenuOpen ? '#000000' : '#ffffff' }}
                  />
                </div>
                
                {/* Elegant textual label responsive support */}
                <span className="hidden sm:inline font-mono text-[9px] font-black tracking-widest uppercase select-none">
                  {isMenuOpen ? t('nav.close_directory', 'CLOSE DIRECTORY') : t('nav.menu_directory', 'MENU DIRECTORY')}
                </span>
              </button>
            </div>

          </div>
        </div>

        {/* UNIVERSAL SLIDE-DOWN SEARCH DRAWER FOR ALL VIEWPORTS (DESKTOP, TABLET, MOBILE) */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="bg-white border-b-4 border-black border-x-4 max-h-[85vh] overflow-y-auto w-full max-w-7xl mx-auto z-45 flex flex-col mt-3 neo-shadow"
              id="universal-search-panel"
            >
              <div className="p-4 md:p-6 space-y-3">
                <div className="flex justify-between items-center select-none">
                  <span className="font-mono text-[8.5px] font-black text-[#ab3600] uppercase tracking-widest leading-none">
                    {t('search.master_db', 'SECURED MASTER THREAT DATABASE SEARCH INDEX')}
                  </span>
                  <span className="font-mono text-[8px] text-gray-400 font-extrabold uppercase">
                    {t('search.hotkey', 'HOTKEY SUGGESTION: CTRL + K')}
                  </span>
                </div>
                
                <div className="relative flex items-center bg-white border-heavy neo-shadow-sm focus-within:ring-1 focus-within:ring-black">
                  <Search className="w-5 h-5 ml-4 text-gray-500 shrink-0" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowResults(true);
                    }}
                    onFocus={() => setShowResults(true)}
                    placeholder={t('search.placeholder', "Provide threat vector keywords (e.g., 'Quidax', 'stablecoin', 'seed', 'wallet')...")}
                    className="w-full px-4 py-3 font-mono text-[12.5px] text-gray-950 bg-transparent placeholder-gray-400 focus:outline-none focus:ring-0"
                    id="universal-search-layout-input"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setShowResults(false);
                      }}
                      className="px-3 py-1.5 mr-3 text-[10px] font-mono font-black bg-[#fff0ea] text-[#ab3600] border-2 border-black hover:bg-neutral-50 transition-colors cursor-pointer active-press"
                      id="universal-search-clear-btn"
                    >
                      {t('search.clear', 'CLEAR')}
                    </button>
                  )}
                </div>

                {/* Dynamic Category Filtering Chips */}
                {searchQuery.trim() && (
                  <div className="flex overflow-x-auto whitespace-nowrap scrollbar-clean gap-2 pt-2 pb-2 border-t border-dashed border-gray-200 select-none">
                    <button
                      onClick={() => setActiveSearchFilter('all')}
                      className={`font-mono text-[9px] font-black uppercase tracking-wider px-3 py-1.5 border-2 border-black transition-all cursor-pointer active-press shrink-0 ${
                        activeSearchFilter === 'all'
                          ? 'bg-black text-white neo-shadow-sm'
                          : 'bg-white text-black hover:bg-neutral-50'
                      }`}
                      id="search-filter-all"
                    >
                      ALL MATCHES ({searchCounts.all})
                    </button>
                    <button
                      onClick={() => setActiveSearchFilter('guide')}
                      className={`font-mono text-[9px] font-black uppercase tracking-wider px-3 py-1.5 border-2 border-black transition-all cursor-pointer active-press shrink-0 ${
                        activeSearchFilter === 'guide'
                          ? 'bg-[#efefff] text-[#0040e0] border-black neo-shadow-sm font-black'
                          : 'bg-white text-black hover:bg-neutral-50'
                      }`}
                      id="search-filter-guide"
                    >
                      GUIDES ({searchCounts.guide})
                    </button>
                    <button
                      onClick={() => setActiveSearchFilter('review')}
                      className={`font-mono text-[9px] font-black uppercase tracking-wider px-3 py-1.5 border-2 border-black transition-all cursor-pointer active-press shrink-0 ${
                        activeSearchFilter === 'review'
                          ? 'bg-[#fff0ea] text-[#ab3600] border-black neo-shadow-sm font-black'
                          : 'bg-white text-black hover:bg-neutral-50'
                      }`}
                      id="search-filter-review"
                    >
                      REVIEWS ({searchCounts.review})
                    </button>
                    <button
                      onClick={() => setActiveSearchFilter('blog')}
                      className={`font-mono text-[9px] font-black uppercase tracking-wider px-3 py-1.5 border-2 border-black transition-all cursor-pointer active-press shrink-0 ${
                        activeSearchFilter === 'blog'
                          ? 'bg-[#d2ffdb] text-[#006e16] border-black neo-shadow-sm font-black'
                          : 'bg-white text-black hover:bg-neutral-50'
                      }`}
                      id="search-filter-blog"
                    >
                      BLOG & ALERTS ({searchCounts.blog})
                    </button>
                    <button
                      onClick={() => setActiveSearchFilter('country')}
                      className={`font-mono text-[9px] font-black uppercase tracking-wider px-3 py-1.5 border-2 border-black transition-all cursor-pointer active-press shrink-0 ${
                        activeSearchFilter === 'country'
                          ? 'bg-[#ecfdf5] text-[#047857] border-black neo-shadow-sm font-black'
                          : 'bg-white text-black hover:bg-neutral-50'
                      }`}
                      id="search-filter-country"
                    >
                      COUNTRIES ({searchCounts.country})
                    </button>
                    <button
                      onClick={() => setActiveSearchFilter('exchange')}
                      className={`font-mono text-[9px] font-black uppercase tracking-wider px-3 py-1.5 border-2 border-black transition-all cursor-pointer active-press shrink-0 ${
                        activeSearchFilter === 'exchange'
                          ? 'bg-[#f0f9ff] text-[#0369a1] border-black neo-shadow-sm font-black'
                          : 'bg-white text-black hover:bg-neutral-50'
                      }`}
                      id="search-filter-exchange"
                    >
                      EXCHANGES ({searchCounts.exchange})
                    </button>
                  </div>
                )}
              </div>

              {/* Interactive Live Results list */}
              <div className="divide-y-2 divide-black border-t-2 border-black bg-neutral-50 flex-grow min-h-[120px] overflow-y-auto max-h-[480px]">
                {searchQuery.trim() ? (
                  searchResults.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-black">
                      {searchResults.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleResultClick(item)}
                          className="p-5 hover:bg-white cursor-pointer select-none active:bg-neutral-100 block text-left transition-all relative group"
                          id={`universal-search-result-${item.id}`}
                        >
                          <div className="flex justify-between items-center mb-1.5">
                            <span className="font-mono text-[8px] font-black uppercase bg-gray-200 text-gray-800 border-2 border-black px-1.5 py-0.5 leading-none">
                              {item.category}
                            </span>
                            <span className="font-mono text-[9px] font-black text-[#ab3600] group-hover:underline">
                              LAUNCH ACCESS INDEX →
                            </span>
                          </div>
                          <h4 className="font-sora text-sm font-black uppercase text-gray-900 leading-snug group-hover:text-[#ff5f1f] transition-colors">
                            {item.title}
                          </h4>
                          <p className="font-mono text-[10.5px] text-gray-500 mt-1 line-clamp-1">
                            {item.snippet}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-12 text-center text-gray-500 font-mono text-xs flex flex-col items-center justify-center gap-2">
                      <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
                      <span className="font-black text-[13px] uppercase mt-2">
                        {rawSearchResults.length > 0
                          ? `NO RESULTS IN CATEGORY "${activeSearchFilter.toUpperCase()}"`
                          : `ZERO CRYPTO SEGMENT INDEX MATCH TO "${searchQuery.toUpperCase()}"`}
                      </span>
                      <span className="text-[10px] text-gray-400 uppercase tracking-widest mt-1 max-w-md mx-auto">
                        {rawSearchResults.length > 0
                          ? `Try resetting the filter to "ALL MATCHES" to view relevant matches in other index registries.`
                          : `Please inspect your spelling or query related tags like "Naira", "scam" or "custodian".`}
                      </span>
                      {rawSearchResults.length > 0 && (
                        <button
                          onClick={() => setActiveSearchFilter('all')}
                          className="mt-4 font-mono text-[9px] font-black uppercase tracking-wider px-3.5 py-2 border-2 border-black bg-black text-white hover:bg-neutral-900 transition-all cursor-pointer active-press neo-shadow-sm"
                        >
                          SHOW ALL MATCHES ({rawSearchResults.length})
                        </button>
                      )}
                    </div>
                  )
                ) : (
                  <div className="p-8 text-center text-gray-400 font-mono text-[10.5px] uppercase tracking-widest font-bold">
                    INDICATE ANY SECURITY THREAT VECTOR KEYWORDS ABOVE TO QUERY REALTIME INTEGRITY ARCHIVE
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* UNIVERSAL FULL IMMERSIVE STYLISH SLIDE-OUT MENU OVERLAY FOR ALL SCREEN SIZES */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop layer with blur and fade and click exit */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.65 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-45 bg-black/60 backdrop-blur-xs cursor-pointer"
            />

            {/* Slide-out highly polished modular drawer panel config with custom responsive tray width */}
            <motion.div
              initial={{ x: '100%', opacity: 0.95 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0.95 }}
              transition={{ type: 'spring', damping: 28, stiffness: 180, mass: 0.9 }}
              className="fixed top-0 right-0 bottom-0 left-0 z-50 w-full min-w-full bg-[#fffdf7] border-l-[4px] md:border-l-[6px] border-black flex flex-col shadow-[0_0_60px_rgba(0,0,0,0.5)] overflow-hidden h-screen"
              id="universal-navigation-sidebar-drawer"
            >
              {/* Drawer Top Header Banner Segment */}
              <div className="bg-black text-white p-4.5 flex justify-between items-center border-b-4 border-black shrink-0 select-none">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#72ff70] rounded-full border border-black animate-ping" />
                  <span className="font-mono text-[10px] font-black tracking-widest text-[#72ff70] uppercase">
                    XTSG INTERACTIVE NAVIGATION INDEX
                  </span>
                </div>
                <button
                   onClick={() => setIsMenuOpen(false)}
                  className="bg-white text-black p-1.5 border-2 border-black hover:bg-[#ff5f1f] hover:text-white flex items-center justify-center cursor-pointer active-press group transition-colors duration-150"
                  aria-label="Secure close drawer"
                >
                  <X className="w-4 h-4 text-current font-extrabold stroke-[3]" />
                </button>
              </div>

              {/* Scrollable contents list */}
              <div className="flex-1 overflow-y-auto p-4 md:p-10 space-y-8 scrollbar-thin">
                {/* Modern responsive grid/bento layout for tables & desktop, simple stack for mobile */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 max-w-[1800px] w-full mx-auto">
                  
                  {/* COLUMN 1: LIVE CONTEXT & METRICS (Span 4 on table, Span 4 on desktop) */}
                  <div className="col-span-1 md:col-span-12 lg:col-span-4 space-y-6">
                    {/* Relocated Interactive Language Selector Toggle */}
                    <div className="bg-white border-4 border-black p-4 relative select-none neo-shadow bg-[radial-gradient(#ab360010_1px,transparent_1px)] bg-[size:16px_16px]">
                      <div className="flex items-center gap-2 mb-3">
                        <Globe className="w-4 h-4 text-[#ab3600] shrink-0" />
                        <h3 className="font-mono text-[10px] font-black uppercase text-black tracking-wider">
                          {language === 'en' ? 'SELECT LANGUAGE / IDIOMA' : 'SELECCIONAR IDIOMA / LANGUAGE'}
                        </h3>
                      </div>
                      <div className="grid grid-cols-2 gap-2 font-mono text-[10.5px]">
                        <button
                          onClick={() => setLanguage('en')}
                          className={`py-2 px-1 border-2 border-black flex items-center justify-center gap-1 font-black uppercase transition-all cursor-pointer ${
                            language === 'en'
                              ? 'bg-black text-[#72ff70]'
                              : 'bg-white hover:bg-neutral-50 text-gray-500'
                          }`}
                          id="drawer-lang-select-en"
                          type="button"
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${language === 'en' ? 'bg-[#72ff70]' : 'bg-transparent border border-gray-400'}`} />
                          <span>English (EN)</span>
                        </button>
                        <button
                          onClick={() => setLanguage('es')}
                          className={`py-2 px-1 border-2 border-black flex items-center justify-center gap-1 font-black uppercase transition-all cursor-pointer ${
                            language === 'es'
                              ? 'bg-black text-[#72ff70]'
                              : 'bg-white hover:bg-neutral-50 text-gray-500'
                          }`}
                          id="drawer-lang-select-es"
                          type="button"
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${language === 'es' ? 'bg-[#72ff70]' : 'bg-transparent border border-gray-400'}`} />
                          <span>Español (ES)</span>
                        </button>
                      </div>
                    </div>

                    {/* Active Clock Panel System Container Decor */}
                    <div className="bg-black text-[#72ff70] p-4.5 border-4 border-black relative select-none neo-shadow-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-[8px] font-black font-mono uppercase tracking-widest text-[#72ff70]/70">
                          COOPERATIVE NETWORK NODE CLOCK
                        </span>
                        <span className="bg-[#0040e0] text-white px-2 py-0.5 text-[7px] font-black uppercase tracking-wider rounded-none leading-none border border-white">
                          LIVE_UTC
                        </span>
                      </div>
                      <div className="text-[12.5px] font-mono font-black mt-2.5 tracking-wider leading-none select-all">
                        {currentTime || 'SYNCHRONISING SYSTEM FEED...'}
                      </div>
                      <div className="absolute right-3 bottom-1.5 text-[8.5px] opacity-25 font-mono select-none font-bold">
                        SYSTEM_v1.02_DECK
                      </div>
                    </div>

                    {/* Highly Polished Interactive Metrics Matrix Dashboard Card */}
                    <div className="bg-white border-4 border-black p-5 relative select-none neo-shadow bg-[radial-gradient(#ab360010_1px,transparent_1px)] bg-[size:16px_16px] hidden lg:block">
                      <div className="flex items-center gap-2 border-b-2 border-black pb-2 mb-4">
                        <Shield className="w-4.5 h-4.5 text-[#ab3600]" />
                        <h3 className="font-mono text-[10px] font-black uppercase text-black tracking-wider">
                          DIRECTORY CONTROL & OPERATIONS INDEX
                        </h3>
                      </div>
                      
                      <div className="space-y-3 font-mono text-[10px]">
                        <div className="flex justify-between items-center border-b border-gray-100 pb-1.5">
                          <span className="text-gray-500 font-bold uppercase">DIRECTORY INTEGRITY</span>
                          <span className="text-emerald-700 font-black bg-emerald-50 border border-emerald-500/20 px-1.5 py-0.5 leading-none">100% SECURED</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-100 pb-1.5">
                          <span className="text-gray-500 font-bold uppercase">CUSTODY THREAT INDEX</span>
                          <span className="text-[#ab3600] font-black bg-orange-50 border border-[#ab3600]/20 px-1.5 py-0.5 leading-none">MINIMAL RISK</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-100 pb-1.5">
                          <span className="text-gray-500 font-bold uppercase">FORENSIC INCIDENTS</span>
                          <span className="text-black font-black bg-neutral-100 border border-black/10 px-1.5 py-0.5 leading-none">2 REPORTED</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-100 pb-1.5">
                          <span className="text-gray-500 font-bold uppercase">ALERT STABILITY STATUS</span>
                          <span className="text-white font-black bg-[#ab3600] border border-black px-1.5 py-0.5 leading-none">ACTIVE FEED</span>
                        </div>
                      </div>

                      <div className="mt-5 p-4 bg-[#efefff] border-2 border-[#0040e0] flex flex-col gap-2.5">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#0040e0] animate-pulse" />
                          <span className="text-[9px] font-black font-mono text-[#0040e0] uppercase tracking-wider">
                            SECURE INGRESS PORTAL
                          </span>
                        </div>
                        <span className="text-[10px] font-mono leading-tight font-bold text-gray-800">
                          Proposing a Directory Listing, Business Collaboration, Brand Advertisement or Affiliate Sponsorship? Live forms are active.
                        </span>
                        <button
                          onClick={() => {
                            setView('contact');
                            setIsMenuOpen(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="w-full text-center py-2 px-3 bg-[#0040e0] text-white border-2 border-black font-mono text-[10px] uppercase font-black tracking-widest hover:bg-[#0030b0] transition-all cursor-pointer active-press block neo-shadow-sm"
                        >
                          TRANSMIT COLLAB DISPATCH
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* COLUMN 2: PRIMARY AND SECONDARY DIRECTIVE GRIDS (Span 8 on md/lg) */}
                  <div className="col-span-1 md:col-span-12 lg:col-span-8 flex flex-col gap-8">
                    {/* Primary Navigation Directives */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b-2 border-black pb-1.5 select-none">
                        <span className="block font-mono text-[9px] font-black text-[#ab3600] uppercase tracking-widest leading-none">
                          {t('nav.principal_directives', 'PRINCIPAL SYSTEM DIRECTIVES')}
                        </span>
                        <span className="font-mono text-[7px] text-gray-400 font-bold">
                          [REGISTRY GATEWAY PORTS]
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3.5">
                        {primaryNavItems.map((item, index) => {
                          const isActive = currentView === item.id;
                          const isContactItem = item.id === 'contact';
                          return (
                            <motion.button
                              key={item.id}
                              initial={{ opacity: 0, x: 25 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.03 + 0.05, duration: 0.2 }}
                              onClick={() => {
                                setView(item.id);
                                setIsMenuOpen(false);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                              className={`flex flex-col text-left p-4.5 border-2 border-black font-mono transition-all duration-150 relative cursor-pointer active-press group select-none min-h-[140px] justify-between h-full ${
                                isActive
                                  ? 'bg-black text-white neo-shadow font-black'
                                  : isContactItem
                                    ? 'bg-[#efefff] border-[#0040e0] text-black hover:bg-[#0040e0] hover:text-white hover:border-black hover:neo-shadow-sm'
                                    : 'bg-white hover:bg-[#ff5f1f]/5 text-black hover:-translate-y-0.5 hover:border-[#ab3600] hover:neo-shadow-sm'
                              }`}
                              id={`menu-primary-item-${item.id}`}
                            >
                              <div className="w-full">
                                <div className="flex justify-between items-start gap-2 mb-2">
                                  <div className="flex items-center gap-2">
                                    <div className={`p-1.5 border border-current flex items-center justify-center transition-colors shrink-0 ${
                                      isActive ? 'bg-white text-black' : isContactItem ? 'bg-white text-[#0040e0] group-hover:text-black' : 'bg-[#fff0ea] text-[#ab3600] group-hover:text-black'
                                    }`}>
                                      {item.icon}
                                    </div>
                                    <span className="text-xs font-black uppercase tracking-wider leading-none">
                                      {t(`nav.${item.id}`, item.label)}
                                    </span>
                                  </div>
                                  
                                  {item.badge && (
                                    <span className={`text-[7.5px] font-black px-1.5 py-0.5 border uppercase select-none tracking-widest shrink-0 ${
                                      isActive ? 'bg-white text-black border-white' : isContactItem ? 'bg-[#0040e0] text-white border-black font-black' : 'bg-[#ff5f1f] text-white border-black'
                                    }`}>
                                      {item.badge}
                                    </span>
                                  )}
                                </div>
                                <p className={`text-[9.5px] leading-tight ${isActive ? 'text-gray-300' : 'text-gray-500 group-hover:text-gray-900'} mb-4 fn-desc-wrap`}>
                                  {item.desc}
                                </p>
                              </div>

                              <div className="w-full flex justify-between items-center text-[8px] font-black tracking-widest mt-auto border-t border-dashed pt-2.5 border-current/20">
                                <span className={isActive ? 'text-gray-300' : isContactItem ? 'text-[#0040e0] group-hover:text-current' : 'text-[#ab3600]'}>
                                  {isContactItem ? 'COLLAB & INQUIRY DECK' : 'ACCESS REGISTER GATEWAY'}
                                </span>
                                <span className="transform group-hover:translate-x-1.5 transition-transform text-xs font-black leading-none">
                                  →
                                </span>
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Secondary syllabus repository index */}
                    <div className="space-y-3">
                      <span className="block font-mono text-[9px] font-black text-gray-500 uppercase tracking-widest leading-none select-none">
                        {t('nav.specialist_index', 'SPECIALIST REPOSITORY INDEX PORTS')}
                      </span>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2.5">
                        {secondaryNavItems.map((item, index) => {
                          const isActive = currentView === item.id;
                          return (
                            <motion.button
                              key={item.id}
                              initial={{ opacity: 0, x: 25 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.03 + 0.18, duration: 0.2 }}
                              onClick={() => {
                                setView(item.id);
                                setIsMenuOpen(false);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                              className={`text-left p-4.5 border-2 border-black flex gap-4 items-center cursor-pointer select-none active-press leading-snug group transition-all duration-100 min-h-[90px] ${
                                isActive
                                  ? 'bg-black text-[#72ff70] neo-shadow-sm'
                                  : 'bg-white hover:bg-neutral-50 text-[#1b1b1b] hover:-translate-y-0.5 hover:neo-shadow-sm'
                              }`}
                            >
                              {/* Rich graphic index icon with responsive constraints */}
                              <div className="w-16 h-16 overflow-hidden relative border border-black shrink-0 bg-neutral-100 select-none">
                                <img 
                                  src={item.imageUrl} 
                                  alt={t(`nav.${item.id}`, item.label)}
                                  className="w-full h-full object-cover filter contrast-[1.05] brightness-90 saturate-[0.8] transition-transform duration-300 group-hover:scale-105"
                                  referrerPolicy="no-referrer"
                                />
                                <div className="absolute inset-0 bg-black/5" />
                              </div>

                              {/* Content explanations structure */}
                              <div className="flex-grow min-w-0 py-1">
                                <div className="flex justify-between items-center pr-1 select-none">
                                  <span className={`font-sora text-[11px] font-black uppercase tracking-tight block truncate ${
                                    isActive ? 'text-[#72ff70]' : 'text-gray-950 group-hover:text-[#ab3600] transition-colors'
                                  }`}>
                                    {t(`nav.${item.id}`, item.label)}
                                  </span>
                                  <span className="text-[7.5px] font-mono text-gray-400 select-none font-bold">
                                    {idxNum(index)}
                                  </span>
                                </div>
                                <p className={`font-mono text-[8.5px] leading-tight line-clamp-2 mt-1 ${isActive ? 'text-gray-300' : 'text-gray-500'}`}>
                                  {item.desc}
                                </p>
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                </div>

              </div>

              {/* Persistent Swiss / Security details bottom matrix bar */}
              <div className="bg-neutral-100 p-4.5 border-t-2 border-black flex flex-col items-center justify-center text-center gap-1.5 select-none shrink-0">
                <div className="flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-gray-500" />
                  <span className="font-mono text-[8.5px] text-gray-500 uppercase font-black tracking-wider">
                    CRYPTO SAFETY GLOBAL • COMPASS MATRIX v1.02
                  </span>
                </div>
                <div className="font-mono text-[7.5px] text-gray-400 font-bold uppercase tracking-widest leading-none">
                  IMMUTABILITY & RESPONSIBLE DISCLOSURE REGISTER
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

// Index indicator formatter
const idxNum = (num: number): string => {
  return `[PORT_0${num + 1}]`;
};
