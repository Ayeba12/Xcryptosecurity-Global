import React, { useState } from 'react';
import { faqItems } from '../extendedData';
import { HelpCircle, ChevronRight, ChevronDown, BookCheck, HelpCircle as HelpIcon } from 'lucide-react';
import { GlossaryText } from './GlossarySystem';
import { ReportInaccuracyButton } from './InaccuracyFeedbackModal';

export const FAQView: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>("f-lost-seed");
  const [activeTab, setActiveTab] = useState<string>('all');

  const toggleAccordion = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const categories = ['all', 'security', 'custody', 'transactions', 'exchanges'];

  const filteredFaq = faqItems.filter(
    (item) => activeTab === 'all' || item.category === activeTab
  );

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 space-y-8">
      {/* Decors Title heading */}
      <div className="bg-[#eef3ff] border-heavy border-l-[8px] border-l-[#0040e0] p-6 space-y-3">
        <div className="inline-flex items-center gap-1.5 bg-white border px-2 py-0.5 font-mono text-[9px] font-bold text-[#0040e0] uppercase">
          <BookCheck className="w-3.5 h-3.5" />
          CSG REFERENCE COUNSEL
        </div>
        <h2 className="font-sora text-2xl md:text-3xl font-extrabold text-gray-950 uppercase tracking-tight">
          FREQUENTLY ASKED SYSTEM QUESTIONS
        </h2>
        <p className="font-mono text-xs text-gray-600 leading-normal max-w-2xl">
          Quick references addressing critical custody errors, smart-contract drain issues, ledger transfers, and support scams recovery realities.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto whitespace-nowrap scrollbar-clean gap-2 border-b border-black/15 pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => { setActiveTab(cat); setExpandedId(null); }}
            className={`px-3 py-1.5 border-heavy font-mono text-[10px] font-black uppercase transition-all duration-150 cursor-pointer active-press shrink-0 ${
              activeTab === cat
                ? 'bg-black text-white'
                : 'bg-white hover:bg-brand-surface-container text-gray-700'
            }`}
          >
            {cat === 'all' ? 'show all index' : `${cat} issues`}
          </button>
        ))}
      </div>

      {/* FAQ Accordion loop */}
      <div className="space-y-4">
        {filteredFaq.map((item) => {
          const isOpen = expandedId === item.id;
          return (
            <div
              key={item.id}
              className="bg-white border-heavy neo-shadow-sm flex flex-col transition-all duration-150"
            >
              {/* Question Bar Header */}
              <button
                onClick={() => toggleAccordion(item.id)}
                className="w-full flex items-center justify-between text-left p-4 hover:bg-brand-surface-container font-mono text-xs font-bold md:text-sm text-gray-950 gap-4 cursor-pointer focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-brand-primary shrink-0 stroke-[2.5]" />
                  <span className="uppercase">{item.question}</span>
                </div>
                {isOpen ? (
                  <ChevronDown className="w-5 h-5 text-brand-primary shrink-0" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-400 shrink-0" />
                )}
              </button>

              {/* Collapse details content drawer panel */}
              {isOpen && (
                <div className="p-5 border-t border-black/10 bg-brand-surface font-sans text-xs md:text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                  <GlossaryText text={item.answer} />
                </div>
              )}
            </div>
          );
        })}

        {filteredFaq.length === 0 && (
          <div className="bg-white border-heavy p-8 text-center font-mono text-xs text-gray-400">
            ⚠️ No QA blocks registered in the filter category keys.
          </div>
        )}
      </div>

      <ReportInaccuracyButton pageName="FAQs" />
    </div>
  );
};
