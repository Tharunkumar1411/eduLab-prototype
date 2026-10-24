/**
 * Course 1 — What Is a Financial Market? (scenario-first)
 *
 * Flow:
 *   1. meet-bakery      — Visual intro + funding decision (consequence per choice)
 *   2. compare          — Switchable 3-up comparison of funding paths
 *   3. secondary-market — Animated A → Exchange → B diagram
 *   4. explore          — Tappable glossary chips
 *   5. check            — Scenario-based knowledge check with retry
 *   6. complete         — Summary + XP (idempotent award)
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowLeftRight,
  Building2,
  Cake,
  Check,
  HandCoins,
  PiggyBank,
  Repeat,
  Share2,
  Store,
  Users,
  Wallet,
} from 'lucide-react';
import { SceneScaffold } from './shared/SceneScaffold.tsx';
import { Callout, OptionButton, PrimaryAction, SimulatedBadge } from './shared/Controls.tsx';
import { useCharacterController } from '../../character/useCharacterController.ts';
import { COURSE_1_NARRATIONS } from '../../../data/narrations/course1Narrations.ts';
import { MS_COURSE_BY_ID, MarketsStocksCourseId, SUNNY_BAKERY } from '../../../data/marketsStocks.ts';

type Scene = 'meet-bakery' | 'compare' | 'secondary-market' | 'explore' | 'check' | 'complete';
const SCENES: Scene[] = ['meet-bakery', 'compare', 'secondary-market', 'explore', 'check', 'complete'];
const COURSE = MS_COURSE_BY_ID.ms_c1_market;

interface Props {
  onBack: () => void;
  onComplete: (id: MarketsStocksCourseId) => void;
}

type Capital = 'loan' | 'investors' | 'profits';
type ExploreId = 'company' | 'investor' | 'exchange' | 'share';
type CheckAnswer = 'bank-loan' | 'exchange' | 'new-shares' | 'founders';

export const Course1Market: React.FC<Props> = ({ onBack, onComplete }) => {
  const [scene, setScene] = useState<Scene>('meet-bakery');
  const [capital, setCapital] = useState<Capital | null>(null);
  const [compareActive, setCompareActive] = useState<Capital>('loan');
  const [exploreActive, setExploreActive] = useState<ExploreId | null>(null);
  const [exploreViewed, setExploreViewed] = useState<Set<ExploreId>>(new Set());
  const [checkPick, setCheckPick] = useState<CheckAnswer | null>(null);
  const [checkAttempts, setCheckAttempts] = useState(0);
  const [checkPassed, setCheckPassed] = useState(false);
  const awardedRef = useRef(false);

  const character = useCharacterController({
    initialState: 'talking',
    initialMessage: `Meet ${SUNNY_BAKERY.name}. Business is booming — the owner wants to open 5 more shops.`,
    initialSubMessage: 'But the expansion costs money the bakery doesn’t have yet.',
  });

  // Per-scene mentor dialogue
  useEffect(() => {
    switch (scene) {
      case 'meet-bakery':
        character.speak('Pick a path. Each choice has a different cost — explore the consequences.');
        character.react('thinking', { durationMs: 2200 });
        break;
      case 'compare':
        character.speak('Tap each option to compare them side by side.');
        character.react('thinking', { durationMs: 2000 });
        break;
      case 'secondary-market':
        character.speak('Shares exist. Now two investors want to trade them. Watch what the exchange does.');
        character.react('surprised', { durationMs: 2200 });
        break;
      case 'explore':
        character.speak('Tap each piece to see its job.');
        character.react('talking', { durationMs: 1800 });
        break;
      case 'check':
        character.speak('Here’s a new scenario — read it carefully.');
        character.react('thinking', { durationMs: 2000 });
        break;
      case 'complete':
        character.speak('That’s the whole idea of a financial market.');
        character.react('celebrating', { durationMs: 2400 });
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene]);

  // Idempotent XP award on first entry to the complete scene
  useEffect(() => {
    if (scene === 'complete' && !awardedRef.current) {
      awardedRef.current = true;
      onComplete('ms_c1_market');
    }
  }, [scene, onComplete]);

  const sceneIndex = SCENES.indexOf(scene);
  const next = () => {
    const n = SCENES[sceneIndex + 1];
    if (n) setScene(n);
  };

  const body = (() => {
    switch (scene) {
      case 'meet-bakery':
        return (
          <SceneMeetBakery capital={capital} setCapital={setCapital} />
        );
      case 'compare':
        return <SceneCompare active={compareActive} setActive={setCompareActive} />;
      case 'secondary-market':
        return <SceneSecondaryMarket />;
      case 'explore':
        return (
          <SceneExplore
            active={exploreActive}
            viewed={exploreViewed}
            setActive={(id) => {
              setExploreActive(id);
              setExploreViewed((prev) => {
                const next = new Set(prev);
                next.add(id);
                return next;
              });
            }}
          />
        );
      case 'check':
        return (
          <SceneCheck
            pick={checkPick}
            setPick={setCheckPick}
            attempts={checkAttempts}
            onAttempt={(wasCorrect) => {
              setCheckAttempts((a) => a + 1);
              if (wasCorrect) setCheckPassed(true);
            }}
            passed={checkPassed}
          />
        );
      case 'complete':
        return <SceneComplete />;
    }
  })();

  const canAdvance = (() => {
    switch (scene) {
      case 'meet-bakery':
        return capital !== null;
      case 'compare':
        return true; // free exploration — always advance
      case 'secondary-market':
        return true;
      case 'explore':
        return exploreViewed.size >= 4;
      case 'check':
        return checkPassed;
      case 'complete':
        return true;
    }
  })();

  const footer =
    scene === 'complete' ? (
      <PrimaryAction onClick={onBack} trailingIcon={false}>
        Back to module
      </PrimaryAction>
    ) : (
      <PrimaryAction onClick={next} disabled={!canAdvance}>
        {sceneIndex === SCENES.length - 2 ? 'Finish course' : 'Continue'}
      </PrimaryAction>
    );

  // Pick the narration script that matches the current scene + outcome.
  const narration = (() => {
    switch (scene) {
      case 'meet-bakery':
        return capital === null
          ? COURSE_1_NARRATIONS.intro
          : capital === 'investors'
            ? COURSE_1_NARRATIONS.investors
            : COURSE_1_NARRATIONS.fundingDecision;
      case 'compare':
        return COURSE_1_NARRATIONS.fundingDecision;
      case 'secondary-market':
        return COURSE_1_NARRATIONS.secondaryMarket;
      case 'explore':
        return COURSE_1_NARRATIONS.exploreIntro;
      case 'check':
        return checkPassed
          ? COURSE_1_NARRATIONS.feedbackCorrect
          : checkAttempts > 0
            ? COURSE_1_NARRATIONS.feedbackIncorrect
            : COURSE_1_NARRATIONS.knowledgeCheckIntro;
      case 'complete':
        return COURSE_1_NARRATIONS.completion;
      default:
        return null;
    }
  })();

  const headlines: Record<Scene, { eyebrow: string; headline: string; subheadline?: string }> = {
    'meet-bakery': {
      eyebrow: 'Scene 1 · Meet the bakery',
      headline: `${SUNNY_BAKERY.name} wants to grow. Where could the money come from?`,
      subheadline: 'Pick one — then read what actually happens next.',
    },
    compare: {
      eyebrow: 'Scene 2 · Compare the choices',
      headline: 'Three paths. Three different trade-offs.',
      subheadline: 'Tap any option to switch the comparison.',
    },
    'secondary-market': {
      eyebrow: 'Scene 3 · The secondary market',
      headline: 'Shares exist. Investors want to trade them. Who helps?',
    },
    explore: {
      eyebrow: 'Scene 4 · Explore the pieces',
      headline: 'Four moving parts — tap to see what each one does.',
    },
    check: {
      eyebrow: 'Scene 5 · Knowledge check',
      headline: 'A new scenario — pick what best fits.',
      subheadline: 'Wrong answer? Try again — you won’t lose progress.',
    },
    complete: { eyebrow: 'Takeaway', headline: COURSE.mainConcept },
  };
  const h = headlines[scene];

  return (
    <SceneScaffold
      courseNumber={COURSE.number}
      courseTitle={COURSE.title}
      sectionLetter="A"
      sceneIndex={sceneIndex}
      totalScenes={SCENES.length}
      eyebrow={h.eyebrow}
      headline={h.headline}
      subheadline={h.subheadline}
      mentorState={character.state}
      mentorMessage={character.message}
      mentorSubMessage={character.subMessage}
      narration={narration}
      onBack={onBack}
      footer={footer}
    >
      {body}
    </SceneScaffold>
  );
};

// ===========================================================================
// Scene 1 — Meet Sunny Bakery
// ===========================================================================
const SceneMeetBakery: React.FC<{
  capital: Capital | null;
  setCapital: (c: Capital) => void;
}> = ({ capital, setCapital }) => {
  const options: {
    id: Capital;
    title: string;
    description: string;
    consequence: string;
    icon: React.ComponentType<{ className?: string }>;
    tone: 'teal' | 'sky' | 'amber';
  }[] = [
    {
      id: 'loan',
      title: 'Borrow money from a bank',
      description: 'Take a loan today, repay with interest over time.',
      consequence:
        'The bakery keeps full ownership, but adds a fixed repayment every month regardless of how the shops perform.',
      icon: PiggyBank,
      tone: 'teal',
    },
    {
      id: 'investors',
      title: 'Bring in investors in exchange for ownership',
      description: 'Issue new shares — investors become part-owners.',
      consequence:
        'No repayment schedule. In exchange, future profits (and some decisions) are shared with the new co-owners.',
      icon: Users,
      tone: 'sky',
    },
    {
      id: 'profits',
      title: 'Expand gradually using existing profits',
      description: 'No new borrowing. Open one shop at a time as cash allows.',
      consequence:
        'Safest for the balance sheet, but the 5-shop plan happens slowly — rivals could reach those neighbourhoods first.',
      icon: Repeat,
      tone: 'amber',
    },
  ];

  return (
    <div className="space-y-3">
      <SimulatedBadge />
      <BakeryIllustration />

      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-4">
        <div className="flex items-center gap-2 mb-2">
          <Cake className="w-4 h-4 text-amber-300" />
          <h3 className="text-sm font-black text-slate-100">About {SUNNY_BAKERY.name}</h3>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          A fictional bakery doing well on one street. The owner wants to open{' '}
          <strong className="text-slate-200">5 more shops</strong> across the city — the plan needs
          roughly <strong className="text-slate-200">₹25 lakh</strong> up front (illustrative).
        </p>
      </div>

      <ul className="grid grid-cols-1 gap-2">
        {options.map((o) => {
          const selected = capital === o.id;
          const tint =
            o.tone === 'teal'
              ? 'bg-teal-500/10 border-teal-400'
              : o.tone === 'sky'
                ? 'bg-sky-500/10 border-sky-400'
                : 'bg-amber-500/10 border-amber-400';
          return (
            <li key={o.id}>
              <button
                type="button"
                onClick={() => setCapital(o.id)}
                aria-pressed={selected}
                className={`w-full text-left p-3 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                  selected
                    ? tint
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <span
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                    selected
                      ? 'bg-slate-950/60 border-slate-700 text-slate-100'
                      : 'bg-slate-950 border-slate-800 text-slate-300'
                  }`}
                >
                  <o.icon className="w-5 h-5" />
                </span>
                <div className="flex-1 min-w-0">
                  <span className="block text-sm font-bold text-slate-100">{o.title}</span>
                  <span className="block text-[11px] text-slate-400 mt-0.5">{o.description}</span>
                </div>
                <span
                  className={`w-5 h-5 shrink-0 rounded-full border-2 flex items-center justify-center ${
                    selected
                      ? 'border-teal-400 bg-teal-400 text-slate-950'
                      : 'border-slate-700 bg-transparent'
                  }`}
                >
                  {selected && <Check className="w-3 h-3 stroke-[3.5]" />}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {capital && (
        <Callout tone={capital === 'profits' ? 'warning' : 'info'}>
          <strong>Here’s what happens next:</strong>{' '}
          {options.find((o) => o.id === capital)!.consequence}
        </Callout>
      )}

      {capital && (
        <p className="text-[11px] text-slate-500 text-center">
          Explore the trade-offs — tap any option to compare, then press Continue when you’re ready.
        </p>
      )}
    </div>
  );
};

const BakeryIllustration: React.FC = () => (
  <div className="rounded-3xl bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 border border-amber-500/20 p-4 sm:p-5">
    <svg
      viewBox="0 0 320 120"
      className="w-full h-auto max-h-[150px]"
      role="img"
      aria-label="Sunny Bakery today — one shop — and the plan to open five more shops."
    >
      <defs>
        <linearGradient id="bakeryBody" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fde68a" />
          <stop offset="1" stopColor="#f59e0b" />
        </linearGradient>
        <linearGradient id="bakeryRoof" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#d97706" />
          <stop offset="1" stopColor="#92400e" />
        </linearGradient>
        <linearGradient id="ghostShop" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#1e293b" />
          <stop offset="1" stopColor="#0f172a" />
        </linearGradient>
      </defs>

      {/* Today's shop */}
      <g transform="translate(10, 25)">
        <polygon points="0,25 25,0 50,25" fill="url(#bakeryRoof)" />
        <rect x="0" y="25" width="50" height="55" fill="url(#bakeryBody)" rx="2" />
        <rect x="18" y="48" width="14" height="32" fill="#78350f" rx="1" />
        <rect x="4" y="32" width="10" height="10" fill="#fef3c7" rx="1" opacity="0.85" />
        <rect x="36" y="32" width="10" height="10" fill="#fef3c7" rx="1" opacity="0.85" />
        <text x="25" y="97" textAnchor="middle" fontSize="7" fontWeight="700" fill="#fcd34d">
          TODAY
        </text>
      </g>

      {/* Arrow */}
      <g transform="translate(68, 55)" stroke="#5eead4" strokeWidth="2" fill="none" strokeLinecap="round">
        <line x1="0" y1="0" x2="18" y2="0" />
        <polyline points="12,-5 18,0 12,5" strokeLinejoin="round" />
      </g>

      {/* 5 planned shops (ghosted) */}
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i} transform={`translate(${94 + i * 44}, 30)`} opacity="0.85">
          <polygon points="0,22 20,0 40,22" fill="url(#ghostShop)" stroke="#334155" strokeWidth="1" />
          <rect
            x="0"
            y="22"
            width="40"
            height="50"
            fill="url(#ghostShop)"
            stroke="#334155"
            strokeWidth="1"
            rx="2"
          />
          <rect x="14" y="42" width="12" height="30" fill="#1e293b" stroke="#475569" strokeWidth="0.75" rx="1" />
          <text x="20" y="89" textAnchor="middle" fontSize="7" fontWeight="700" fill="#64748b">
            SHOP {i + 2}
          </text>
        </g>
      ))}

      {/* Growth arc */}
      <path
        d="M 60 25 Q 160 -5 300 20"
        stroke="#5eead4"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="3 4"
        opacity="0.5"
      />
    </svg>
    <div className="mt-2 flex items-center justify-between gap-2">
      <span className="text-[10px] uppercase tracking-wider font-black text-amber-300">
        1 shop today
      </span>
      <ArrowLeftRight className="w-3.5 h-3.5 text-teal-400" />
      <span className="text-[10px] uppercase tracking-wider font-black text-slate-300">
        Plan: 5 more shops
      </span>
    </div>
  </div>
);

// ===========================================================================
// Scene 2 — Compare the choices
// ===========================================================================
const SceneCompare: React.FC<{
  active: Capital;
  setActive: (c: Capital) => void;
}> = ({ active, setActive }) => {
  const columns: {
    id: Capital;
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    accent: string;
    pros: string[];
    cons: string[];
    detail: string;
  }[] = [
    {
      id: 'loan',
      title: 'Borrow from a bank',
      icon: PiggyBank,
      accent: 'text-teal-300 border-teal-500/40 bg-teal-500/10',
      pros: ['No ownership given up', 'Capital available quickly'],
      cons: ['Fixed repayments', 'Interest cost'],
      detail:
        'Borrowing creates a repayment obligation under the loan terms. Monthly instalments must be paid even if a shop underperforms, and the lender charges interest on the outstanding amount.',
    },
    {
      id: 'investors',
      title: 'Bring in investors',
      icon: Users,
      accent: 'text-sky-300 border-sky-500/40 bg-sky-500/10',
      pros: ['No fixed repayments', 'Can raise larger amounts'],
      cons: ['Ownership diluted', 'Shared decisions'],
      detail:
        'Issuing shares can raise capital in exchange for ownership interests. The company does not have to repay the money, but new shareholders participate in future gains and may have a say in big decisions.',
    },
    {
      id: 'profits',
      title: 'Reinvest existing profits',
      icon: Repeat,
      accent: 'text-amber-300 border-amber-500/40 bg-amber-500/10',
      pros: ['No new debt or dilution', 'Low financial risk'],
      cons: ['Slow pace of growth', 'Opportunity cost if demand shifts'],
      detail:
        'Using existing profits avoids new borrowing or share issuance but may limit the pace of expansion. The 5-shop plan takes much longer, and competitors could occupy those neighbourhoods first.',
    },
  ];
  const col = columns.find((c) => c.id === active)!;

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-1 p-1 bg-slate-900 border border-slate-800 rounded-2xl">
        {columns.map((c) => {
          const isActive = c.id === active;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setActive(c.id)}
              aria-pressed={isActive}
              className={`px-2 py-2 rounded-xl text-[11px] font-bold text-center cursor-pointer flex flex-col items-center gap-1 transition-all ${
                isActive
                  ? 'bg-slate-800 shadow-inner text-slate-100'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <c.icon className="w-4 h-4" />
              <span className="leading-tight">{c.title}</span>
            </button>
          );
        })}
      </div>

      <div className={`rounded-2xl border p-4 ${col.accent}`}>
        <div className="flex items-center gap-2 mb-2">
          <col.icon className="w-4 h-4" />
          <span className="text-sm font-black">{col.title}</span>
        </div>
        <p className="text-xs opacity-90 leading-relaxed">{col.detail}</p>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <div className="rounded-2xl bg-emerald-500/5 border border-emerald-500/30 p-3">
          <div className="text-[10px] font-black uppercase tracking-wider text-emerald-300 mb-1.5">
            Potential upside
          </div>
          <ul className="space-y-1 text-xs text-emerald-100/90 list-disc pl-4">
            {col.pros.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl bg-rose-500/5 border border-rose-500/30 p-3">
          <div className="text-[10px] font-black uppercase tracking-wider text-rose-300 mb-1.5">
            Trade-off
          </div>
          <ul className="space-y-1 text-xs text-rose-100/90 list-disc pl-4">
            {col.cons.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>

      <p className="text-[11px] text-slate-500 text-center">
        These aren’t the only funding routes a company has — just the three in play for Sunny Bakery
        today.
      </p>
    </div>
  );
};

// ===========================================================================
// Scene 3 — Discover the secondary market
// ===========================================================================
const SceneSecondaryMarket: React.FC = () => {
  const [revealed, setRevealed] = useState(false);
  return (
    <div className="space-y-3">
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-4">
        <p className="text-xs text-slate-300 leading-relaxed">
          Sunny Bakery eventually becomes publicly listed. One investor who already owns some shares
          wants to <strong className="text-slate-100">sell</strong>. Another investor wants to{' '}
          <strong className="text-slate-100">buy</strong>. They don’t know each other.{' '}
          <span className="text-slate-400">What could facilitate this transaction?</span>
        </p>
      </div>

      {!revealed ? (
        <div className="rounded-2xl bg-slate-900/50 border border-slate-800 p-5 text-center space-y-2">
          <p className="text-xs text-slate-400">
            Think about it for a second — then reveal what actually happens.
          </p>
          <button
            type="button"
            onClick={() => setRevealed(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-extrabold cursor-pointer active:scale-95"
          >
            Reveal the diagram
          </button>
        </div>
      ) : (
        <>
          <ExchangeFlowDiagram />
          <Callout tone="info" title="Secondary market">
            Once shares exist, trading between investors happens on a{' '}
            <strong>secondary market</strong>. The stock exchange’s role is to match a buyer with a
            compatible seller — it isn’t two investors negotiating directly, and Sunny Bakery
            doesn’t receive the money either (that happened at the original issuance).
          </Callout>
        </>
      )}
    </div>
  );
};

const ExchangeFlowDiagram: React.FC = () => (
  <div className="rounded-3xl bg-gradient-to-br from-sky-950/40 via-slate-900 to-slate-950 border border-sky-500/30 p-4 sm:p-5">
    <style>{`
      @keyframes msc1-right { 0% { transform: translateX(-10%); opacity: 0 } 15% { opacity: 1 } 85% { opacity: 1 } 100% { transform: translateX(130%); opacity: 0 } }
      @keyframes msc1-left  { 0% { transform: translateX(130%); opacity: 0 } 15% { opacity: 1 } 85% { opacity: 1 } 100% { transform: translateX(-10%); opacity: 0 } }
      .msc1-share { animation: msc1-right 3.6s linear infinite; }
      .msc1-money { animation: msc1-left 3.6s linear infinite; }
      @media (prefers-reduced-motion: reduce) {
        .msc1-share, .msc1-money { animation: none; }
      }
    `}</style>

    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-5">
      <PartyNode label="Investor A" subLabel="wants to sell" icon={Users} tone="emerald" />
      <PartyNode label="Stock Exchange" subLabel="matches orders" icon={Building2} tone="sky" />
      <PartyNode label="Investor B" subLabel="wants to buy" icon={Users} tone="rose" />
    </div>

    <div className="mt-3 space-y-2">
      {/* A → B shares lane */}
      <FlowLane
        legendLeft="A"
        legendRight="B"
        caption="Shares travel A → B"
        swatchClass="bg-emerald-400"
        animClass="msc1-share"
        glyph="📄"
      />
      {/* B → A money lane */}
      <FlowLane
        legendLeft="A"
        legendRight="B"
        caption="Cash travels B → A"
        swatchClass="bg-amber-300"
        animClass="msc1-money"
        glyph="₹"
        reverse
      />
    </div>

    <p className="mt-3 text-[11px] text-sky-200/80 text-center">
      The exchange sits in the middle and matches compatible orders. Sunny Bakery is not a party to
      this trade.
    </p>
  </div>
);

const PartyNode: React.FC<{
  label: string;
  subLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  tone: 'emerald' | 'sky' | 'rose';
}> = ({ label, subLabel, icon: Icon, tone }) => {
  const toneClass =
    tone === 'emerald'
      ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-200'
      : tone === 'rose'
        ? 'border-rose-500/40 bg-rose-500/15 text-rose-200'
        : 'border-sky-500/40 bg-sky-500/15 text-sky-200';
  return (
    <div className={`rounded-2xl border p-3 text-center ${toneClass}`}>
      <Icon className="w-6 h-6 mx-auto" />
      <div className="mt-1 text-xs font-black leading-tight">{label}</div>
      <div className="text-[10px] opacity-80">{subLabel}</div>
    </div>
  );
};

const FlowLane: React.FC<{
  legendLeft: string;
  legendRight: string;
  caption: string;
  swatchClass: string;
  animClass: string;
  glyph: string;
  reverse?: boolean;
}> = ({ legendLeft, legendRight, caption, swatchClass, animClass, glyph, reverse }) => {
  return (
    <div className="rounded-xl bg-slate-950/70 border border-slate-800 p-2">
      <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 mb-1">
        <span>{reverse ? legendRight : legendLeft}</span>
        <span>{caption}</span>
        <span>{reverse ? legendLeft : legendRight}</span>
      </div>
      <div className="relative h-6 rounded-md bg-slate-900 overflow-hidden">
        <div
          className={`${animClass} absolute top-1/2 -translate-y-1/2 flex items-center gap-1 text-[10px] font-black text-slate-950 px-1.5 py-0.5 rounded ${swatchClass}`}
        >
          <span>{glyph}</span>
          <span>{reverse ? 'cash' : 'share'}</span>
        </div>
      </div>
    </div>
  );
};

// ===========================================================================
// Scene 4 — Explore the pieces
// ===========================================================================
const SceneExplore: React.FC<{
  active: ExploreId | null;
  viewed: Set<ExploreId>;
  setActive: (id: ExploreId) => void;
}> = ({ active, viewed, setActive }) => {
  const pieces: {
    id: ExploreId;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    tone: string;
    detail: string;
  }[] = [
    {
      id: 'company',
      label: 'Company',
      icon: Store,
      tone: 'text-amber-300 border-amber-500/40 bg-amber-500/10',
      detail:
        'A business like Sunny Bakery. Needs capital to grow — can borrow, issue shares, or reinvest profits.',
    },
    {
      id: 'investor',
      label: 'Investor',
      icon: Wallet,
      tone: 'text-sky-300 border-sky-500/40 bg-sky-500/10',
      detail:
        'A person or institution that provides capital. In return they may become a lender (debt) or a part-owner (equity).',
    },
    {
      id: 'exchange',
      label: 'Stock exchange',
      icon: Building2,
      tone: 'text-teal-300 border-teal-500/40 bg-teal-500/10',
      detail:
        'A regulated venue that matches compatible buy and sell orders. It doesn’t set the “right” price — buyers and sellers do.',
    },
    {
      id: 'share',
      label: 'Share',
      icon: Share2,
      tone: 'text-rose-300 border-rose-500/40 bg-rose-500/10',
      detail:
        'A unit of ownership in a company. Buying one makes you a part-owner — not a lender, not a guaranteed-dividend recipient.',
    },
  ];
  const activePiece = pieces.find((p) => p.id === active);

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        {pieces.map((p) => {
          const isActive = active === p.id;
          const isViewed = viewed.has(p.id);
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setActive(p.id)}
              aria-pressed={isActive}
              className={`p-3 rounded-2xl border-2 flex flex-col items-start gap-1.5 cursor-pointer transition-all ${
                isActive
                  ? p.tone
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <p.icon className={`w-5 h-5 ${isActive ? '' : 'text-slate-300'}`} />
                {isViewed && !isActive && (
                  <span className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 stroke-[3.5]" />
                  </span>
                )}
              </div>
              <span className="text-sm font-black text-slate-100">{p.label}</span>
            </button>
          );
        })}
      </div>

      {activePiece ? (
        <div className={`rounded-2xl border p-4 ${activePiece.tone}`}>
          <div className="flex items-center gap-2 mb-1">
            <activePiece.icon className="w-4 h-4" />
            <span className="text-sm font-black">{activePiece.label}</span>
          </div>
          <p className="text-xs opacity-90 leading-relaxed">{activePiece.detail}</p>
        </div>
      ) : (
        <div className="rounded-2xl bg-slate-900/50 border border-dashed border-slate-800 p-4 text-center text-xs text-slate-400">
          Tap any of the four pieces above to see what role it plays.
        </div>
      )}

      <div className="flex items-center justify-between text-[11px] text-slate-500">
        <span>Pieces explored</span>
        <span className="font-mono-num font-bold text-slate-300">{viewed.size}/4</span>
      </div>
    </div>
  );
};

// ===========================================================================
// Scene 5 — Knowledge check (with retry)
// ===========================================================================
const SceneCheck: React.FC<{
  pick: CheckAnswer | null;
  setPick: (a: CheckAnswer | null) => void;
  attempts: number;
  onAttempt: (wasCorrect: boolean) => void;
  passed: boolean;
}> = ({ pick, setPick, attempts, onAttempt, passed }) => {
  const options: {
    id: CheckAnswer;
    title: string;
    description: string;
    feedbackWrong: string;
  }[] = [
    {
      id: 'bank-loan',
      title: 'A new bank loan to Investor B',
      description: 'Investor B borrows the money.',
      feedbackWrong:
        'A loan funds a buyer, but it doesn’t connect them with a specific seller. You still need a venue where orders can meet.',
    },
    {
      id: 'exchange',
      title: 'A stock exchange where their orders can be matched',
      description: 'A central venue pairs a willing buyer with a willing seller.',
      feedbackWrong: '',
    },
    {
      id: 'new-shares',
      title: 'Sunny Bakery issues brand-new shares for the trade',
      description: 'The company creates and sells new shares each time.',
      feedbackWrong:
        'That’s a primary-market event, used when the company itself raises capital — not for trading existing shares between two investors.',
    },
    {
      id: 'founders',
      title: 'The founders personally arrange it',
      description: 'The bakery owner calls each investor and matches them.',
      feedbackWrong:
        'Possible for one or two trades, but it doesn’t scale and the company usually isn’t a party to secondary-market trades at all.',
    },
  ];
  const correctAnswer: CheckAnswer = 'exchange';
  const picked = options.find((o) => o.id === pick);

  const submit = () => {
    if (!pick) return;
    onAttempt(pick === correctAnswer);
  };

  const tryAgain = () => {
    setPick(null);
  };

  return (
    <div className="space-y-3">
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-4">
        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-[10px] font-bold uppercase tracking-wider">
          Scenario
        </div>
        <p className="text-sm text-slate-200 leading-relaxed mt-1.5">
          Sunny Bakery is now publicly listed. Investor A, who already owns some shares, wants to
          sell to Investor B — a stranger across the city. What <em>enables</em> their trade?
        </p>
      </div>

      <ul className="grid grid-cols-1 gap-2">
        {options.map((o) => (
          <li key={o.id}>
            <OptionButton
              option={o}
              selected={pick === o.id}
              onSelect={setPick}
              disabled={passed}
              indicator={
                passed && o.id === correctAnswer
                  ? 'correct'
                  : passed && pick === o.id && o.id !== correctAnswer
                    ? 'incorrect'
                    : undefined
              }
            />
          </li>
        ))}
      </ul>

      {/* Submission + per-attempt feedback */}
      {!passed && picked && (
        <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-4 space-y-2">
          {attempts > 0 && pick !== correctAnswer && (
            <Callout tone="warning">
              Not quite. <strong>{picked.title}:</strong> {picked.feedbackWrong}
            </Callout>
          )}
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] text-slate-400">
              {attempts === 0
                ? 'Ready when you are.'
                : attempts === 1
                  ? '1 attempt · you can try again as many times as you want.'
                  : `${attempts} attempts · keep going.`}
            </span>
            <div className="flex items-center gap-2">
              {attempts > 0 && (
                <button
                  type="button"
                  onClick={tryAgain}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-100 cursor-pointer"
                >
                  Try again
                </button>
              )}
              <button
                type="button"
                onClick={submit}
                className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-extrabold cursor-pointer active:scale-95"
              >
                Check my answer
              </button>
            </div>
          </div>
        </div>
      )}

      {passed && (
        <Callout tone="success" title="That’s it">
          A stock exchange’s job is to match compatible buy and sell orders between investors —
          especially when they don’t know each other. The company itself isn’t involved in these
          secondary trades.
        </Callout>
      )}
    </div>
  );
};

// ===========================================================================
// Scene 6 — Complete
// ===========================================================================
const SceneComplete: React.FC = () => (
  <div className="space-y-3">
    <div className="rounded-3xl bg-gradient-to-br from-sky-950/40 via-slate-900 to-slate-950 border border-sky-500/30 p-5 sm:p-6 space-y-3">
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-500/15 border border-sky-500/30 text-sky-300 text-[11px] font-bold">
        <HandCoins className="w-3.5 h-3.5" />
        Course complete
      </div>
      <h3 className="text-xl sm:text-2xl font-black text-slate-100">{COURSE.mainConcept}</h3>
      <ul className="text-xs text-slate-300 space-y-1.5 pt-1">
        <li className="flex items-start gap-2">
          <ArrowDown className="w-3.5 h-3.5 mt-0.5 text-sky-400 shrink-0 rotate-[-90deg]" />
          <span>Companies have several ways to fund growth — each with a different cost.</span>
        </li>
        <li className="flex items-start gap-2">
          <ArrowDown className="w-3.5 h-3.5 mt-0.5 text-sky-400 shrink-0 rotate-[-90deg]" />
          <span>Issuing shares turns investors into co-owners of the business.</span>
        </li>
        <li className="flex items-start gap-2">
          <ArrowDown className="w-3.5 h-3.5 mt-0.5 text-sky-400 shrink-0 rotate-[-90deg]" />
          <span>Once shares exist, investors trade them in a secondary market via an exchange.</span>
        </li>
      </ul>
    </div>
    <p className="text-[11px] text-slate-500 text-center">
      Up next: Course 2 covers who actually runs those exchanges — NSE, BSE and market indices.
    </p>
  </div>
);

export default Course1Market;
