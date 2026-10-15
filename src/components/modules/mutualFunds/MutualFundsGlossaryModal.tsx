import React, { useState } from 'react';
import { MUTUAL_FUNDS_GLOSSARY, GlossaryTerm } from '../../../data/mutualFundsData.ts';
import { BookOpen, Search, X, Sparkles, AlertCircle } from 'lucide-react';

interface MutualFundsGlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MutualFundsGlossaryModal: React.FC<MutualFundsGlossaryModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm>(MUTUAL_FUNDS_GLOSSARY[0]);

  if (!isOpen) return null;

  const filteredTerms = MUTUAL_FUNDS_GLOSSARY.filter(
    (t) =>
      t.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.shortDefinition.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between gap-3 bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">
                Mutual Funds Reference Glossary
              </h3>
              <p className="text-xs text-slate-400">
                Essential financial terminology & common myths demystified
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-slate-800 bg-slate-900/90">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search terms (e.g. NAV, SIP, Expense Ratio)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500"
            />
          </div>
        </div>

        {/* Content: List + Detail */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Term List */}
          <div className="space-y-1 md:border-r border-slate-800 pr-0 md:pr-3">
            {filteredTerms.map((item) => {
              const isSelected = selectedTerm.term === item.term;
              return (
                <button
                  key={item.term}
                  onClick={() => setSelectedTerm(item)}
                  className={`w-full text-left p-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer block ${
                    isSelected
                      ? 'bg-teal-500 text-slate-950 shadow-sm'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {item.term}
                </button>
              );
            })}
          </div>

          {/* Term Detail View */}
          <div className="md:col-span-2 space-y-4">
            <div className="space-y-1 border-b border-slate-800 pb-3">
              <span className="text-[10px] uppercase font-bold text-teal-400 tracking-wider">
                Financial Concept
              </span>
              <h4 className="text-lg font-black text-slate-100">{selectedTerm.term}</h4>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                {selectedTerm.shortDefinition}
              </p>
            </div>

            <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
              <span className="font-bold text-slate-200 block uppercase tracking-wider text-[10px]">
                In-Depth Explanation
              </span>
              <p className="text-slate-400">{selectedTerm.fullExplanation}</p>
            </div>

            {/* Common Myth / Mistake */}
            <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-300">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Common Beginner Myth</span>
              </div>
              <p className="text-amber-200/90 leading-relaxed text-[11px]">
                {selectedTerm.commonMistake}
              </p>
            </div>

            {/* Real-World Example */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
              <span className="font-bold text-teal-300 block text-[11px]">Practical Example:</span>
              <p className="text-slate-400 text-[11px] leading-relaxed">{selectedTerm.example}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer"
          >
            Close Glossary
          </button>
        </div>
      </div>
    </div>
  );
};
