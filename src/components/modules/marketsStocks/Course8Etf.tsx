/**
 * Course 8 — What Is an ETF?
 *
 * Scenes: compose a basket, run a scenario (each stock moves by X%), compare
 * single-stock vs basket vs index-tracking ETF, final challenge, complete.
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Boxes, Layers, PieChart, Sliders } from 'lucide-react';
import { SceneScaffold } from './shared/SceneScaffold.tsx';
import { Callout, OptionButton, PrimaryAction, SimulatedBadge } from './shared/Controls.tsx';
import { useCharacterController } from '../../character/useCharacterController.ts';
import {
  BLUE_TECHNOLOGIES,
  ETF_BASKET,
  GREEN_TRANSPORT,
  MS_COURSE_BY_ID,
  MarketsStocksCourseId,
  SUNNY_BAKERY,
} from '../../../data/marketsStocks.ts';
import {
  BasketHolding,
  ScenarioMove,
  formatRupeesInt,
  projectBasketValue,
  projectSingleValue,
} from '../../../data/marketsStocksCalculations.ts';

type Scene = 'intro' | 'scenario' | 'compare' | 'challenge' | 'complete';
const SCENES: Scene[] = ['intro', 'scenario', 'compare', 'challenge', 'complete'];
const COURSE = MS_COURSE_BY_ID.ms_c8_etf;

type Challenge = 'risk-free' | 'diversified-not-free' | 'always-tracks';
const START_VALUE = 10000;

type MoveMap = Record<string, number>;

interface Props {
  onBack: () => void;
  onComplete: (id: MarketsStocksCourseId) => void;
}

const DEFAULT_WEIGHTS: BasketHolding[] = [
  { symbol: SUNNY_BAKERY.symbol, weightPercent: 33.33, startPrice: 100 },
  { symbol: GREEN_TRANSPORT.symbol, weightPercent: 33.33, startPrice: 100 },
  { symbol: BLUE_TECHNOLOGIES.symbol, weightPercent: 33.34, startPrice: 100 },
];
const DEFAULT_MOVES: MoveMap = {
  [SUNNY_BAKERY.symbol]: 10,
  [GREEN_TRANSPORT.symbol]: -20,
  [BLUE_TECHNOLOGIES.symbol]: 5,
};

export const Course8Etf: React.FC<Props> = ({ onBack, onComplete }) => {
  const [scene, setScene] = useState<Scene>('intro');
  const [moves, setMoves] = useState<MoveMap>(DEFAULT_MOVES);
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const awardedRef = useRef(false);

  const character = useCharacterController({
    initialState: 'thinking',
    initialMessage: 'A fictional basket: three companies, equal weights.',
    initialSubMessage: 'What changes when one of them drops?',
  });

  useEffect(() => {
    switch (scene) {
      case 'intro':
        character.speak('Three stocks. One basket. One ETF that tracks them.');
        character.react('talking', { durationMs: 2000 });
        break;
      case 'scenario':
        character.speak('Move each slider — the basket adjusts in real time.');
        character.react('thinking', { durationMs: 2000 });
        break;
      case 'compare':
        character.speak('Single stock vs basket vs index-tracker — see the numbers.');
        character.react('talking', { durationMs: 2000 });
        break;
      case 'challenge':
        character.speak('Pick the most accurate statement.');
        character.react('thinking', { durationMs: 1800 });
        break;
      case 'complete':
        character.speak('A basket spreads risk. It does not remove it.');
        character.react('celebrating', { durationMs: 2400 });
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene]);

  useEffect(() => {
    if (scene === 'complete' && !awardedRef.current) {
      awardedRef.current = true;
      onComplete('ms_c8_etf');
    }
  }, [scene, onComplete]);

  const sceneIndex = SCENES.indexOf(scene);
  const next = () => {
    const n = SCENES[sceneIndex + 1];
    if (n) setScene(n);
  };

  const scenarioMoves: ScenarioMove[] = useMemo(
    () => ETF_BASKET.map((c) => ({ symbol: c.symbol, movePercent: moves[c.symbol] ?? 0 })),
    [moves],
  );
  const basketValue = projectBasketValue(DEFAULT_WEIGHTS, scenarioMoves, START_VALUE);
  const basketChange = basketValue - START_VALUE;
  const basketPct = Math.round(((basketValue - START_VALUE) / START_VALUE) * 1000) / 10;

  const singleSunny = projectSingleValue(START_VALUE, moves[SUNNY_BAKERY.symbol] ?? 0);
  const singleGreen = projectSingleValue(START_VALUE, moves[GREEN_TRANSPORT.symbol] ?? 0);
  const singleBlue = projectSingleValue(START_VALUE, moves[BLUE_TECHNOLOGIES.symbol] ?? 0);

  const body = (() => {
    switch (scene) {
      case 'intro':
        return (
          <div className="space-y-3">
            <SimulatedBadge />
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-4">
              <div className="flex items-center gap-2 mb-2">
                <PieChart className="w-4 h-4 text-sky-300" />
                <span className="text-xs font-bold text-slate-100">
                  Fictional basket (equal weight) · {formatRupeesInt(START_VALUE)} start value
                </span>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                {ETF_BASKET.map((c) => (
                  <li key={c.symbol} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">{c.sector}</span>
                    <span className="text-sm font-black text-slate-100 block">{c.name}</span>
                    <span className="text-[10px] text-slate-500">33.3% weight</span>
                  </li>
                ))}
              </ul>
            </div>
            <Callout>
              An <strong>ETF</strong> (exchange-traded fund) is a fund that trades on an exchange like a stock. It
              can hold many assets. An <em>index-tracking</em> ETF aims to mirror a specific index — but not every
              ETF tracks an index, and tracking is never perfect.
            </Callout>
          </div>
        );

      case 'scenario':
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-1 gap-2.5">
              {ETF_BASKET.map((c) => (
                <div key={c.symbol} className="rounded-2xl bg-slate-900 border border-slate-800 p-3">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <Boxes className="w-4 h-4 text-sky-300" />
                      <span className="text-sm font-bold text-slate-100">{c.name}</span>
                    </div>
                    <span
                      className={`font-black font-mono-num ${
                        (moves[c.symbol] ?? 0) > 0
                          ? 'text-emerald-300'
                          : (moves[c.symbol] ?? 0) < 0
                            ? 'text-rose-300'
                            : 'text-slate-300'
                      }`}
                    >
                      {(moves[c.symbol] ?? 0) > 0 ? '+' : ''}
                      {moves[c.symbol] ?? 0}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={-50}
                    max={50}
                    step={5}
                    value={moves[c.symbol] ?? 0}
                    onChange={(e) =>
                      setMoves((prev) => ({ ...prev, [c.symbol]: Number(e.target.value) }))
                    }
                    className="w-full mt-2 accent-sky-500"
                    aria-label={`${c.name} scenario move`}
                  />
                </div>
              ))}
            </div>

            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-4">
              <div className="flex items-center gap-2 mb-1">
                <Layers className="w-4 h-4 text-sky-300" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  Basket value under this scenario
                </span>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-black font-mono-num text-slate-100">
                  {formatRupeesInt(basketValue)}
                </span>
                <span
                  className={`text-sm font-bold font-mono-num pb-1 ${
                    basketChange >= 0 ? 'text-emerald-300' : 'text-rose-300'
                  }`}
                >
                  {basketChange >= 0 ? '+' : ''}
                  {formatRupeesInt(basketChange)} ({basketPct >= 0 ? '+' : ''}
                  {basketPct}%)
                </span>
              </div>
            </div>
          </div>
        );

      case 'compare':
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <ComparisonCard
                title={`Only ${SUNNY_BAKERY.name}`}
                value={singleSunny}
                start={START_VALUE}
                note="Everything hinges on one company."
              />
              <ComparisonCard
                title={`Only ${GREEN_TRANSPORT.name}`}
                value={singleGreen}
                start={START_VALUE}
                note="One stock, one direction."
              />
              <ComparisonCard
                title={`Only ${BLUE_TECHNOLOGIES.name}`}
                value={singleBlue}
                start={START_VALUE}
                note="Same risk, different company."
              />
            </div>
            <div className="rounded-2xl bg-sky-500/10 border border-sky-500/40 p-4">
              <div className="flex items-center gap-2 mb-1">
                <PieChart className="w-4 h-4 text-sky-300" />
                <span className="text-xs font-bold uppercase tracking-wider text-sky-200">
                  Equal-weight basket of all three (ETF-like)
                </span>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-black font-mono-num text-sky-100">
                  {formatRupeesInt(basketValue)}
                </span>
                <span
                  className={`text-sm font-bold font-mono-num pb-1 ${
                    basketChange >= 0 ? 'text-emerald-300' : 'text-rose-300'
                  }`}
                >
                  {basketChange >= 0 ? '+' : ''}
                  {formatRupeesInt(basketChange)}
                </span>
              </div>
              <p className="text-[11px] text-sky-100/90 mt-1">
                The basket averages across all three outcomes. One company’s big move is diluted by the others.
              </p>
            </div>
            <Callout tone="warning">
              Diversification spreads <em>stock-specific</em> risk. It does not remove market-wide risk — if the entire
              market drops, baskets drop too.
            </Callout>
          </div>
        );

      case 'challenge': {
        const options = [
          {
            id: 'risk-free' as Challenge,
            title: 'An ETF makes investing risk-free',
            description: 'False. Baskets reduce single-stock risk, but every market has risk.',
          },
          {
            id: 'diversified-not-free' as Challenge,
            title: 'An ETF can diversify across many assets, but risk still exists',
            description: 'Accurate — diversification softens single-stock shocks; it doesn’t eliminate loss.',
          },
          {
            id: 'always-tracks' as Challenge,
            title: 'Every ETF perfectly tracks an index',
            description: 'False. Not all ETFs track indices, and even those that do have tracking differences.',
          },
        ];
        return (
          <div className="space-y-3">
            <ul className="grid grid-cols-1 gap-2">
              {options.map((o) => (
                <li key={o.id}>
                  <OptionButton
                    option={o}
                    selected={challenge === o.id}
                    onSelect={setChallenge}
                    indicator={
                      challenge == null
                        ? undefined
                        : o.id === 'diversified-not-free'
                          ? 'correct'
                          : challenge === o.id
                            ? 'incorrect'
                            : 'neutral'
                    }
                  />
                </li>
              ))}
            </ul>
            {challenge && (
              <Callout tone={challenge === 'diversified-not-free' ? 'success' : 'warning'}>
                A basket spreads risk — it does not remove it. Actual ETFs vary by holdings, fees, tracking method
                and underlying index.
              </Callout>
            )}
          </div>
        );
      }

      case 'complete':
        return (
          <div className="rounded-3xl bg-gradient-to-br from-sky-950/40 via-slate-900 to-slate-950 border border-sky-500/30 p-5 sm:p-6 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-500/15 border border-sky-500/30 text-sky-300 text-[11px] font-bold">
              <Sliders className="w-3.5 h-3.5" />
              Course complete
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-100">{COURSE.mainConcept}</h3>
          </div>
        );
    }
  })();

  const canAdvance = (() => {
    switch (scene) {
      case 'intro':
        return true;
      case 'scenario':
        return true;
      case 'compare':
        return true;
      case 'challenge':
        return challenge !== null;
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

  const headlines: Record<Scene, { eyebrow: string; headline: string; subheadline?: string }> = {
    intro: { eyebrow: 'Scene 1', headline: 'Three fictional companies, one ETF.' },
    scenario: { eyebrow: 'Scene 2 · Scenario', headline: 'Move each stock. Watch the basket.' },
    compare: {
      eyebrow: 'Scene 3 · Compare',
      headline: 'Single stock vs basket — same scenario, different outcome.',
    },
    challenge: { eyebrow: 'Challenge', headline: 'Which statement is most accurate?' },
    complete: { eyebrow: 'Takeaway', headline: COURSE.mainConcept },
  };
  const h = headlines[scene];

  return (
    <SceneScaffold
      courseNumber={COURSE.number}
      courseTitle={COURSE.title}
      sectionLetter="D"
      sceneIndex={sceneIndex}
      totalScenes={SCENES.length}
      eyebrow={h.eyebrow}
      headline={h.headline}
      subheadline={h.subheadline}
      mentorState={character.state}
      mentorMessage={character.message}
      mentorSubMessage={character.subMessage}
      onBack={onBack}
      footer={footer}
    >
      {body}
    </SceneScaffold>
  );
};

const ComparisonCard: React.FC<{ title: string; value: number; start: number; note: string }> = ({
  title,
  value,
  start,
  note,
}) => {
  const change = value - start;
  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-3">
      <span className="text-[10px] uppercase font-bold text-slate-400 block">{title}</span>
      <div className="flex items-end gap-2">
        <span className="text-xl font-black font-mono-num text-slate-100">{formatRupeesInt(value)}</span>
        <span
          className={`text-xs font-bold font-mono-num pb-0.5 ${
            change >= 0 ? 'text-emerald-300' : 'text-rose-300'
          }`}
        >
          {change >= 0 ? '+' : ''}
          {formatRupeesInt(change)}
        </span>
      </div>
      <p className="text-[11px] text-slate-500 mt-1">{note}</p>
    </div>
  );
};

export default Course8Etf;
