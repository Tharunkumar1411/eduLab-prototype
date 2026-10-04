import React from 'react';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';
import { MARKET_STORIES, MarketStory } from '../../data/homeData.ts';

interface MarketStoriesSectionProps {
  onSelectStory: (story: MarketStory) => void;
}

export const MarketStoriesSection: React.FC<MarketStoriesSectionProps> = ({
  onSelectStory,
}) => {
  return (
    <section aria-labelledby="market-stories-heading" className="w-full space-y-3 pb-8">
      {/* Section Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-base" aria-hidden="true">📰</span>
          <h2 id="market-stories-heading" className="text-lg font-bold text-slate-100 tracking-tight">
            Market News & Stories
          </h2>
        </div>
        <p className="text-xs text-slate-400 mt-0.5">
          Connect real market events with foundational learning.
        </p>
      </div>

      {/* Story Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {MARKET_STORIES.map((story) => (
          <div
            key={story.id}
            onClick={() => onSelectStory(story)}
            className="flex flex-col justify-between p-5 rounded-2xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 transition-all duration-150 group cursor-pointer shadow-xs"
          >
            <div className="space-y-3">
              {/* Category & read time */}
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="text-teal-400 font-semibold tracking-wide">{story.kicker}</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-500" />
                  <span>{story.readTime}</span>
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-slate-100 group-hover:text-teal-300 transition-colors leading-snug">
                {story.title}
              </h3>

              {/* Summary */}
              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                {story.summary}
              </p>

              {/* Learning prompt badge */}
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-300 space-y-0.5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 block">
                  Learn
                </span>
                <span className="text-xs font-semibold text-slate-200 block">
                  "{story.coreTerm}"
                </span>
              </div>
            </div>

            {/* CTA row */}
            <div className="pt-4 mt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-teal-400 font-semibold">
              <span className="group-hover:text-teal-300">Read in {story.readTime}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
