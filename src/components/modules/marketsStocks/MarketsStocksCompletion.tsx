import React, { useEffect } from 'react';
import { Award, Compass, Trophy } from 'lucide-react';
import { MS_COURSES, MS_TOTAL_XP } from '../../../data/marketsStocks.ts';
import { CharacterMentor } from '../../character/CharacterMentor.tsx';
import { useCharacterController } from '../../character/useCharacterController.ts';

interface MarketsStocksCompletionProps {
  earnedXp: number;
  onReturnToModule: () => void;
  onGoToPlayground: () => void;
}

export const MarketsStocksCompletion: React.FC<MarketsStocksCompletionProps> = ({
  earnedXp,
  onReturnToModule,
  onGoToPlayground,
}) => {
  const character = useCharacterController({
    initialState: 'celebrating',
    initialMessage: 'You just walked a trade from idea to settlement — and ran a real order book.',
    initialSubMessage: 'That’s the module.',
  });

  useEffect(() => {
    character.react('celebrating', { durationMs: 3200 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-10 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-300">
      <div className="rounded-3xl bg-gradient-to-br from-amber-900/30 via-slate-900 to-slate-950 border border-amber-500/30 p-6 sm:p-8 text-center">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] font-bold">
          <Trophy className="w-3.5 h-3.5" />
          Markets & Stocks complete
        </div>
        <h1 className="mt-3 text-3xl sm:text-4xl font-black text-slate-100 tracking-tight">
          You can speak the language of the market.
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
          Markets and indices, shares and prices, orders and settlement, and ETFs — eight scenarios, one coherent picture.
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 text-xs font-bold font-mono-num">
            <Award className="w-3.5 h-3.5" /> {earnedXp} / {MS_TOTAL_XP} XP earned
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-sky-500/40 bg-sky-500/10 text-sky-300 text-xs font-bold">
            {MS_COURSES.length} of {MS_COURSES.length} courses done
          </span>
        </div>
      </div>

      <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-4">
        <CharacterMentor
          state={character.state}
          message={character.message}
          subMessage={character.subMessage}
          size="xs"
          revealProgressively
        />
      </div>

      <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-4 sm:p-5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">What you took away</h3>
        <ul className="space-y-1.5 text-xs text-slate-300">
          {MS_COURSES.map((c) => (
            <li key={c.id} className="flex items-start gap-2">
              <span className="mt-0.5 text-sky-400 font-black">{c.number}</span>
              <span>{c.mainConcept}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-end gap-2">
        <button
          type="button"
          onClick={onReturnToModule}
          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-300 hover:text-slate-100 cursor-pointer"
        >
          Back to module overview
        </button>
        <button
          type="button"
          onClick={onGoToPlayground}
          className="w-full sm:w-auto inline-flex items-center gap-1.5 px-5 py-2.5 rounded-2xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-xs transition-all cursor-pointer shadow-lg shadow-sky-500/30 active:scale-95"
        >
          <Compass className="w-4 h-4" />
          <span>Explore other modules</span>
        </button>
      </div>
    </div>
  );
};

export default MarketsStocksCompletion;
