/**
 * Course 5 — Why Do Stock Prices Change?
 *
 * Fictional news feed → learner predicts reaction (up / flat / down) →
 * simulated price moves + explanation (why none of up/down/flat is "wrong").
 */

import React, { useEffect, useRef, useState } from 'react';
import { ArrowDownRight, ArrowRight, ArrowUpRight, Newspaper } from 'lucide-react';
import { SceneScaffold } from './shared/SceneScaffold.tsx';
import { Callout, OptionButton, PrimaryAction, SimulatedBadge } from './shared/Controls.tsx';
import { useCharacterController } from '../../character/useCharacterController.ts';
import { MS_COURSE_BY_ID, MarketsStocksCourseId, SUNNY_BAKERY } from '../../../data/marketsStocks.ts';
import { formatPrice } from '../../../data/marketsStocksCalculations.ts';

type Scene = 'news' | 'predict' | 'reveal' | 'challenge' | 'complete';
const SCENES: Scene[] = ['news', 'predict', 'reveal', 'challenge', 'complete'];
const COURSE = MS_COURSE_BY_ID.ms_c5_price_change;

type Prediction = 'up' | 'flat' | 'down';

interface Props {
  onBack: () => void;
  onComplete: (id: MarketsStocksCourseId) => void;
}

const HEADLINE = `${SUNNY_BAKERY.name} reports 20% higher sales, but operating costs rose faster.`;
const PRE_NEWS_PRICE = 100.0;
const SIMULATED_SCENARIOS: {
  id: Prediction;
  label: string;
  price: number;
  explanation: string;
}[] = [
  {
    id: 'up',
    label: 'Price up',
    price: 103.4,
    explanation:
      'Some investors focus on the top-line (sales) growth and buy. If buyers outweigh sellers, price moves up.',
  },
  {
    id: 'flat',
    label: 'Price flat',
    price: 100.3,
    explanation:
      'Others see sales up but margins pressured — they cancel out. Price barely moves.',
  },
  {
    id: 'down',
    label: 'Price down',
    price: 96.1,
    explanation:
      'Some see higher costs squeezing profit and sell first. If sellers outweigh buyers, price moves down.',
  },
];

export const Course5PriceChange: React.FC<Props> = ({ onBack, onComplete }) => {
  const [scene, setScene] = useState<Scene>('news');
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [challenge, setChallenge] = useState<'single-cause' | 'multiple' | 'always-up' | null>(null);
  const awardedRef = useRef(false);

  const character = useCharacterController({
    initialState: 'thinking',
    initialMessage: 'A fictional headline just dropped.',
    initialSubMessage: 'What do investors do next?',
  });

  useEffect(() => {
    switch (scene) {
      case 'news':
        character.speak('Read the headline. There’s more than one way to interpret it.');
        character.react('thinking', { durationMs: 2000 });
        break;
      case 'predict':
        character.speak('Make a prediction — then see how different investors might react.');
        character.react('thinking', { durationMs: 2000 });
        break;
      case 'reveal':
        character.speak('All three reactions are plausible. The actual price depends on who outnumbers whom.');
        character.react('surprised', { durationMs: 2200 });
        break;
      case 'challenge':
        character.speak('Pick the most accurate statement.');
        character.react('thinking', { durationMs: 1800 });
        break;
      case 'complete':
        character.speak('Prices change because expectations change. Rarely a single clean cause.');
        character.react('celebrating', { durationMs: 2400 });
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene]);

  useEffect(() => {
    if (scene === 'complete' && !awardedRef.current) {
      awardedRef.current = true;
      onComplete('ms_c5_price_change');
    }
  }, [scene, onComplete]);

  const sceneIndex = SCENES.indexOf(scene);
  const next = () => {
    const n = SCENES[sceneIndex + 1];
    if (n) setScene(n);
  };

  const body = (() => {
    switch (scene) {
      case 'news':
        return (
          <div className="space-y-3">
            <SimulatedBadge />
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Newspaper className="w-4 h-4 text-sky-300" />
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                  Fictional news feed
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-100 leading-tight">
                {HEADLINE}
              </h3>
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Pre-news price</span>
                  <span className="text-sm font-black font-mono-num text-slate-100">
                    {formatPrice(PRE_NEWS_PRICE)}
                  </span>
                </div>
                <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Sales</span>
                  <span className="text-sm font-black text-emerald-300">+20%</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Operating costs</span>
                  <span className="text-sm font-black text-rose-300">+28%</span>
                </div>
              </div>
            </div>
            <Callout>
              Mixed signal: revenue grew, but costs grew faster — operating profit is squeezed. Different investors read the same facts differently.
            </Callout>
          </div>
        );

      case 'predict': {
        const options = [
          { id: 'up' as Prediction, title: 'Price moves up', description: 'Buyers see growth and outnumber sellers.' },
          { id: 'flat' as Prediction, title: 'Price barely moves', description: 'The signals cancel out.' },
          { id: 'down' as Prediction, title: 'Price moves down', description: 'Sellers see margin pressure and outnumber buyers.' },
        ];
        return (
          <ul className="grid grid-cols-1 gap-2">
            {options.map((o) => (
              <li key={o.id}>
                <OptionButton option={o} selected={prediction === o.id} onSelect={setPrediction} />
              </li>
            ))}
          </ul>
        );
      }

      case 'reveal':
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {SIMULATED_SCENARIOS.map((s) => {
                const isYours = prediction === s.id;
                const diff = s.price - PRE_NEWS_PRICE;
                const Icon = s.id === 'up' ? ArrowUpRight : s.id === 'down' ? ArrowDownRight : ArrowRight;
                const tone =
                  s.id === 'up'
                    ? 'text-emerald-300 border-emerald-500/40 bg-emerald-500/10'
                    : s.id === 'down'
                      ? 'text-rose-300 border-rose-500/40 bg-rose-500/10'
                      : 'text-slate-200 border-slate-700 bg-slate-800/60';
                return (
                  <div key={s.id} className={`rounded-2xl border p-3 ${tone}`}>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider">{s.label}</span>
                      {isYours && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 px-1.5 py-0.5 rounded bg-amber-500/15 border border-amber-500/30">
                          Your pick
                        </span>
                      )}
                    </div>
                    <div className="flex items-end gap-2 mt-1">
                      <span className="text-2xl font-black font-mono-num">{formatPrice(s.price)}</span>
                      <span className="text-xs font-bold font-mono-num pb-1">
                        <Icon className="inline w-3.5 h-3.5" />
                        {diff > 0 ? '+' : ''}
                        {diff.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-[11px] mt-1 opacity-90">{s.explanation}</p>
                  </div>
                );
              })}
            </div>
            <Callout tone="warning">
              None of these three reactions is <strong>wrong</strong>. Prices reflect the balance of buyers and sellers — which depends on what each side already expected, not just the headline.
            </Callout>
          </div>
        );

      case 'challenge': {
        const options = [
          {
            id: 'single-cause' as const,
            title: 'Each news item causes a predictable price direction',
            description: 'Over-simplifies — the same news can move price either way depending on expectations.',
          },
          {
            id: 'multiple' as const,
            title: 'Prices depend on supply, demand and investor expectations',
            description: 'Correct — the balance of buyers and sellers is what moves price, and expectations shape both.',
          },
          {
            id: 'always-up' as const,
            title: 'A positive-sounding headline always pushes price up',
            description: 'A positive headline can still trigger a sell-off if investors already priced in better news.',
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
                        : o.id === 'multiple'
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
              <Callout tone={challenge === 'multiple' ? 'success' : 'warning'}>
                A single headline rarely has one correct interpretation. The price moves based on who is willing to transact at what price.
              </Callout>
            )}
          </div>
        );
      }

      case 'complete':
        return (
          <div className="rounded-3xl bg-gradient-to-br from-sky-950/40 via-slate-900 to-slate-950 border border-sky-500/30 p-5 sm:p-6 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-500/15 border border-sky-500/30 text-sky-300 text-[11px] font-bold">
              Course complete
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-100">{COURSE.mainConcept}</h3>
          </div>
        );
    }
  })();

  const canAdvance = (() => {
    switch (scene) {
      case 'news':
        return true;
      case 'predict':
        return prediction !== null;
      case 'reveal':
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
    news: { eyebrow: 'Scene 1 · The news', headline: `${SUNNY_BAKERY.name} just reported earnings.` },
    predict: { eyebrow: 'Scene 2 · Your prediction', headline: 'What do investors do next?' },
    reveal: { eyebrow: 'Scene 3 · Simulated reactions', headline: 'Three plausible outcomes — not one.' },
    challenge: { eyebrow: 'Challenge', headline: 'Which statement is most accurate?' },
    complete: { eyebrow: 'Takeaway', headline: COURSE.mainConcept },
  };
  const h = headlines[scene];

  return (
    <SceneScaffold
      courseNumber={COURSE.number}
      courseTitle={COURSE.title}
      sectionLetter="B"
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

export default Course5PriceChange;
