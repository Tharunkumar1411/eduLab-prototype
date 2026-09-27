/**
 * Unit Guidebook Modal.
 * Duolingo-style cheatsheet for quick revision of financial terms and formulas.
 */

import React from 'react';
import { UnitSection } from '../../data/learningPath.ts';
import { BookOpen, CheckCircle, Lightbulb, X } from 'lucide-react';

interface UnitGuidebookModalProps {
  unit: UnitSection;
  onClose: () => void;
}

export const UnitGuidebookModal: React.FC<UnitGuidebookModalProps> = ({
  unit,
  onClose,
}) => {
  const { guidebook } = unit;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 block">
                Unit {unit.unitNumber} Guidebook
              </span>
              <h3 className="text-sm font-bold text-slate-100">
                {guidebook.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-300 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 text-xs">
          <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl text-slate-300 leading-relaxed">
            <span className="text-[11px] font-bold text-teal-400 uppercase tracking-wider block mb-1">
              Unit Concept Overview
            </span>
            {guidebook.summary}
          </div>

          <div className="space-y-3">
            <span className="text-xs uppercase font-bold text-slate-400 tracking-wider block">
              Core Financial Principles
            </span>

            <div className="space-y-2.5">
              {guidebook.keyTakeaways.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-slate-950 border border-slate-850 rounded-xl space-y-1"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                    <span className="font-bold text-slate-100 text-xs">
                      {item.term}
                    </span>
                  </div>
                  <p className="text-slate-300 leading-relaxed pl-3.5">
                    {item.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs transition-colors"
          >
            Got It! Return to Game Path
          </button>
        </div>
      </div>
    </div>
  );
};
