import React, { useState } from 'react';
import { Bot, Sparkles, Send } from 'lucide-react';

interface HomeAiChatSectionProps {
  onAskAi: (prompt: string) => void;
}

const POPULAR_AI_PROMPTS = [
  {
    icon: '🕵️',
    label: 'The 30% Profit Mystery',
    prompt: 'Why did dalal street dump the stock despite 30% profit growth? Explain operating cash flow vs one-off asset sales.',
  },
  {
    icon: '📈',
    label: 'What is NIFTY 50?',
    prompt: 'What is NIFTY 50, how are companies selected, and how does free-float market cap weighting work?',
  },
  {
    icon: '🏦',
    label: 'Banks & NIM',
    prompt: 'Explain how Indian commercial banks earn profit using Net Interest Margin (NIM) and NPA credit costs.',
  },
  {
    icon: '⚖️',
    label: 'Investing vs Trading',
    prompt: 'Explain the fundamental difference between long-term equity investing and short-term systematic momentum trading.',
  },
];

/**
 * Inline prompt bar — intentionally NOT wrapped in a card so it visually
 * breaks the vertical card stack on the Lounge tab. Looks like a focused
 * search input with an AI mentor badge + suggestion chips below.
 */
export const HomeAiChatSection: React.FC<HomeAiChatSectionProps> = ({ onAskAi }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onAskAi(query.trim());
    setQuery('');
  };

  return (
    <section aria-label="Ask the AI mentor" className="space-y-2.5 px-0.5">
      {/* Eyebrow identity row */}
      <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
        <span className="w-5 h-5 rounded-md bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-slate-950 shrink-0">
          <Bot className="w-3 h-3" />
        </span>
        <span>Ask the AI mentor</span>
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-[9px] font-semibold text-teal-400 normal-case tracking-normal">
          <Sparkles className="w-2 h-2" />
          Gemini
        </span>
      </div>

      {/* Inline search-style input */}
      <form
        onSubmit={handleSubmit}
        className={`relative flex items-center bg-slate-950/60 backdrop-blur-sm rounded-2xl transition-all ${
          isFocused
            ? 'ring-2 ring-teal-500/50 shadow-lg shadow-teal-950/30'
            : 'ring-1 ring-slate-800/80 hover:ring-slate-700'
        }`}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Why did Dalal Street drop? What is P/E ratio?"
          aria-label="Ask the AI mentor"
          className="w-full bg-transparent py-3 pl-4 pr-20 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!query.trim()}
          aria-label="Send question"
          className="absolute right-1.5 px-3 py-1.5 rounded-xl bg-teal-500 hover:bg-teal-400 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <span className="hidden sm:inline">Ask</span>
          <Send className="w-3 h-3" />
        </button>
      </form>

      {/* Suggestion chips row — plain horizontal scroll, no outer card */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none -mx-0.5 px-0.5">
        {POPULAR_AI_PROMPTS.map((item, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onAskAi(item.prompt)}
            className="shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-slate-900/70 hover:bg-slate-800 border border-slate-800 hover:border-teal-500/40 text-[11px] sm:text-xs text-slate-300 hover:text-teal-200 transition-all cursor-pointer group"
          >
            <span aria-hidden="true">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
};
