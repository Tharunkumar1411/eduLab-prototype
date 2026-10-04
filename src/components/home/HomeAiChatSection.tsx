import React, { useState } from 'react';
import { Bot, Flame, Sparkles, Send, ArrowRight, ToggleLeft, ToggleRight, HelpCircle } from 'lucide-react';

interface HomeAiChatSectionProps {
  userXp: number;
  userLevel: number;
  streakDays: number;
  isSimulatingNewUser: boolean;
  onToggleUserMode: () => void;
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
    label: 'How Banks Make Money (NIM)',
    prompt: 'Explain how Indian commercial banks earn profit using Net Interest Margin (NIM) and NPA credit costs.',
  },
  {
    icon: '⚖️',
    label: 'Investing vs Trading',
    prompt: 'Explain the fundamental difference between long-term equity investing and short-term systematic momentum trading.',
  },
];

export const HomeAiChatSection: React.FC<HomeAiChatSectionProps> = ({
  userXp,
  userLevel,
  streakDays,
  isSimulatingNewUser,
  onToggleUserMode,
  onAskAi,
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onAskAi(query.trim());
    setQuery('');
  };

  return (
    <div className="rounded-3xl bg-slate-900/90 border border-slate-800/90 p-5 sm:p-6 shadow-xl space-y-4">
      {/* Top Header Row with AI Branding & User Progress Badges */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Left: AI Mentor identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-teal-900/30 shrink-0">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-100 tracking-tight">
                FinCraft AI Mentor
              </h2>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-[10px] font-semibold text-teal-400">
                <Sparkles className="w-2.5 h-2.5" />
                Gemini 3.5
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              Ask any doubt about stocks, ratios, balance sheets, or market cases.
            </p>
          </div>
        </div>

        {/* Right: Progress streak, XP & Testing persona toggle */}
        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-amber-400 font-semibold shadow-xs">
            <Flame className="w-3.5 h-3.5 fill-amber-500/20" />
            <span className="font-mono-num">{streakDays}d streak</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-teal-300 font-semibold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span className="font-mono-num">{userXp.toLocaleString()} XP</span>
          </div>

          <div className="px-2.5 py-1 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 font-semibold shadow-xs">
            <span>Lvl {userLevel}</span>
          </div>

          {/* Test Persona Switcher */}
          <button
            onClick={onToggleUserMode}
            className="flex items-center gap-1 px-2 py-1 rounded-xl bg-slate-950/50 hover:bg-slate-800 border border-dashed border-slate-700/80 text-[10px] text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            title="Switch user mode preview"
          >
            {isSimulatingNewUser ? (
              <>
                <ToggleLeft className="w-3.5 h-3.5 text-amber-400" />
                <span>New</span>
              </>
            ) : (
              <>
                <ToggleRight className="w-3.5 h-3.5 text-teal-400" />
                <span>Returning</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Interactive AI Question Input Form */}
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask a financial question... (e.g., Why did Dalal Street drop? What is P/E ratio?)"
          className="w-full bg-slate-950/90 border border-slate-800 rounded-2xl py-3 pl-4 pr-24 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-teal-500/80 focus:ring-1 focus:ring-teal-500/50 transition-all shadow-inner"
        />
        <button
          type="submit"
          disabled={!query.trim()}
          className="absolute right-1.5 px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 disabled:opacity-40 disabled:hover:bg-teal-600 text-white font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
        >
          <span>Ask</span>
          <Send className="w-3 h-3" />
        </button>
      </form>

      {/* Suggested Quick Question Chips */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
          Suggested Questions
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {POPULAR_AI_PROMPTS.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onAskAi(item.prompt)}
              className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/60 hover:bg-slate-800 border border-slate-800/80 hover:border-teal-500/40 text-xs text-slate-300 hover:text-slate-100 transition-all cursor-pointer shadow-xs group"
            >
              <span>{item.icon}</span>
              <span className="group-hover:text-teal-300 transition-colors font-medium">
                {item.label}
              </span>
              <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-teal-400 group-hover:translate-x-0.5 transition-all" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
