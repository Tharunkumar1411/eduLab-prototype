import React from 'react';
import { ArrowRight, BookOpen, Clock, HelpCircle, Lightbulb, Newspaper, X } from 'lucide-react';
import { MarketStory } from '../../data/homeData.ts';

interface StoryDetailModalProps {
  story: MarketStory | null;
  onClose: () => void;
  onGoToPlayground?: () => void;
}

export const StoryDetailModal: React.FC<StoryDetailModalProps> = ({
  story,
  onClose,
  onGoToPlayground,
}) => {
  if (!story) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="story-modal-title"
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl relative my-8 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-teal-400 uppercase tracking-wider">
              <span>📰 Market Story & Lesson</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400 font-normal">{story.readTime}</span>
            </div>
            <h2 id="story-modal-title" className="text-xl sm:text-2xl font-bold text-slate-100 leading-snug">
              {story.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close market story"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1. What Happened? */}
        <div className="space-y-1.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-teal-400" />
            <span>1. What happened?</span>
          </h3>
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-sm text-slate-200 leading-relaxed">
            {story.whatHappened}
          </div>
        </div>

        {/* 2. Why Does It Matter? */}
        <div className="space-y-1.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>2. Why does it matter?</span>
          </h3>
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-sm text-slate-200 leading-relaxed">
            {story.whyItMatters}
          </div>
        </div>

        {/* 3. What Can I Learn From It? */}
        <div className="space-y-1.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>3. What can I learn from it?</span>
          </h3>
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-sm text-slate-200 leading-relaxed">
            {story.whatCanILearn}
          </div>
        </div>

        {/* Highlight Box: Core Financial Concept Explained */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-teal-950/40 to-slate-950 border border-teal-500/30 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-bold text-teal-300 uppercase tracking-wider">
            <Lightbulb className="w-4 h-4 text-teal-400" />
            <span>Key Takeaway: {story.coreTerm}</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {story.coreTermExplanation}
          </p>
        </div>

        {/* Modal actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-1 border-t border-slate-800">
          <button
            onClick={onClose}
            className="w-full sm:w-1/2 min-h-[44px] py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors cursor-pointer"
          >
            Back to Home
          </button>
          {onGoToPlayground && (
            <button
              onClick={() => {
                onClose();
                onGoToPlayground();
              }}
              className="w-full sm:w-1/2 min-h-[44px] py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-teal-500/20"
            >
              <span>Practice in Playground</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
