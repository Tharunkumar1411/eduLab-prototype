/**
 * Course 6 — How Does a Stock Trade Happen?
 *
 * Simulated order journey: Investor → Broker → Exchange order book → Matching
 * → Confirmation → Settlement. Challenge: differentiate trading account vs
 * demat account vs broker vs exchange.
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  BookOpen,
  Building2,
  Database,
  ReceiptText,
  Smartphone,
  Zap,
} from 'lucide-react';
import { SceneScaffold } from './shared/SceneScaffold.tsx';
import { Callout, OptionButton, PrimaryAction, SimulatedBadge } from './shared/Controls.tsx';
import { useCharacterController } from '../../character/useCharacterController.ts';
import { MS_COURSE_BY_ID, MarketsStocksCourseId, SUNNY_BAKERY } from '../../../data/marketsStocks.ts';

type Scene = 'intro' | 'journey' | 'accounts' | 'challenge' | 'complete';
const SCENES: Scene[] = ['intro', 'journey', 'accounts', 'challenge', 'complete'];
const COURSE = MS_COURSE_BY_ID.ms_c6_trade_flow;

interface Props {
  onBack: () => void;
  onComplete: (id: MarketsStocksCourseId) => void;
}

type Challenge = 'broker-matches' | 'exchange-matches' | 'bank-matches';

const STOPS = [
  {
    key: 'investor',
    label: 'Investor app',
    icon: Smartphone,
    detail: 'You enter: buy 20 shares of SUNNY, limit ₹100.00. The broker’s app validates and prepares the message.',
  },
  {
    key: 'broker',
    label: 'Broker',
    icon: Building2,
    detail: 'The broker is a SEBI-registered intermediary. It routes your validated order to the exchange with your client ID attached.',
  },
  {
    key: 'exchange',
    label: 'Exchange order book',
    icon: BookOpen,
    detail: 'The exchange holds a central order book — resting bids on one side, resting asks on the other.',
  },
  {
    key: 'match',
    label: 'Matching engine',
    icon: Zap,
    detail: 'A matching engine inside the exchange pairs compatible orders by price-time priority. A trade is created.',
  },
  {
    key: 'confirm',
    label: 'Trade confirmation',
    icon: ReceiptText,
    detail: 'Both brokers (and you) receive confirmation. This is an agreement — the money and shares have not moved yet.',
  },
  {
    key: 'settle',
    label: 'Settlement to demat',
    icon: Database,
    detail: 'On the settlement date, cash is debited from the buyer and shares are credited to the buyer’s demat account; the reverse for the seller.',
  },
];

export const Course6TradeFlow: React.FC<Props> = ({ onBack, onComplete }) => {
  const [scene, setScene] = useState<Scene>('intro');
  const [step, setStep] = useState(0);
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const awardedRef = useRef(false);

  const character = useCharacterController({
    initialState: 'thinking',
    initialMessage: `Let's trace a simulated order to buy 20 shares of ${SUNNY_BAKERY.name}.`,
    initialSubMessage: 'Six stops, each a different party.',
  });

  useEffect(() => {
    switch (scene) {
      case 'intro':
        character.speak('Imagine tapping buy in your broker app. What happens next?');
        character.react('thinking', { durationMs: 2000 });
        break;
      case 'journey':
        character.speak(STOPS[step].label);
        character.react('talking', { durationMs: 1500 });
        break;
      case 'accounts':
        character.speak('Two accounts, one trade: trading account holds cash, demat account holds shares.');
        character.react('talking', { durationMs: 2000 });
        break;
      case 'challenge':
        character.speak('Who actually matches your buy to someone’s sell?');
        character.react('thinking', { durationMs: 1800 });
        break;
      case 'complete':
        character.speak('Routing, matching and settlement are three different jobs.');
        character.react('celebrating', { durationMs: 2400 });
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene, step]);

  useEffect(() => {
    if (scene === 'complete' && !awardedRef.current) {
      awardedRef.current = true;
      onComplete('ms_c6_trade_flow');
    }
  }, [scene, onComplete]);

  const sceneIndex = SCENES.indexOf(scene);
  const next = () => {
    const n = SCENES[sceneIndex + 1];
    if (n) setScene(n);
  };

  const body = (() => {
    switch (scene) {
      case 'intro':
        return (
          <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-4 space-y-2">
            <SimulatedBadge />
            <p className="text-sm text-slate-200">
              Simulated order: <strong>Buy 20 shares of {SUNNY_BAKERY.symbol} @ ₹100.00 limit</strong>. We will walk it from your phone to your demat account.
            </p>
          </div>
        );

      case 'journey': {
        const s = STOPS[step];
        return (
          <div className="space-y-3">
            <div className="flex items-center gap-1 overflow-x-auto pb-1 -mx-1 px-1">
              {STOPS.map((st, i) => (
                <button
                  key={st.key}
                  type="button"
                  onClick={() => setStep(i)}
                  aria-pressed={i === step}
                  className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] font-bold border cursor-pointer ${
                    i === step
                      ? 'bg-sky-500/15 border-sky-400 text-sky-200'
                      : i < step
                        ? 'bg-slate-800 border-slate-700 text-slate-200'
                        : 'bg-slate-900 border-slate-800 text-slate-500'
                  }`}
                >
                  <span className="w-4 h-4 rounded bg-slate-950/60 border border-slate-700 flex items-center justify-center text-[9px]">
                    {i + 1}
                  </span>
                  <span className="whitespace-nowrap">{st.label}</span>
                </button>
              ))}
            </div>
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-4">
              <div className="flex items-center gap-2 mb-1">
                <s.icon className="w-5 h-5 text-sky-300" />
                <span className="text-sm font-black text-slate-100">{s.label}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{s.detail}</p>
            </div>
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setStep((i) => Math.max(0, i - 1))}
                disabled={step === 0}
                className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 disabled:opacity-40 cursor-pointer"
              >
                ← Previous
              </button>
              <span className="text-[11px] text-slate-500 font-mono-num">
                {step + 1}/{STOPS.length}
              </span>
              <button
                type="button"
                onClick={() => setStep((i) => Math.min(STOPS.length - 1, i + 1))}
                disabled={step === STOPS.length - 1}
                className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 disabled:opacity-40 cursor-pointer"
              >
                Next stop →
              </button>
            </div>
          </div>
        );
      }

      case 'accounts':
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="rounded-2xl bg-emerald-500/5 border border-emerald-500/30 p-4">
                <h4 className="text-sm font-black text-emerald-200">Trading account</h4>
                <p className="text-xs text-emerald-100/90 mt-1">
                  Holds <strong>cash</strong> used to place orders. Opened with your broker and linked to your bank.
                </p>
              </div>
              <div className="rounded-2xl bg-sky-500/5 border border-sky-500/30 p-4">
                <h4 className="text-sm font-black text-sky-200">Demat account</h4>
                <p className="text-xs text-sky-100/90 mt-1">
                  Holds <strong>shares</strong> in electronic form. Operated by a depository (CDSL or NSDL) via a depository participant.
                </p>
              </div>
            </div>
            <Callout>
              The broker, exchange, bank and demat account are all different entities with different roles. A single trade touches most of them.
            </Callout>
          </div>
        );

      case 'challenge': {
        const options = [
          {
            id: 'broker-matches' as Challenge,
            title: 'Your broker',
            description: 'Brokers route and record — matching lives further up.',
          },
          {
            id: 'exchange-matches' as Challenge,
            title: 'The exchange order book',
            description: 'A central order book inside the exchange matches your order with a resting counter-order.',
          },
          {
            id: 'bank-matches' as Challenge,
            title: 'Your bank',
            description: 'Banks help with cash settlement, not with order matching.',
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
                        : o.id === 'exchange-matches'
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
              <Callout tone={challenge === 'exchange-matches' ? 'success' : 'warning'}>
                Matching happens at the exchange. The broker routes your order; the bank is only involved during cash settlement.
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
      case 'intro':
        return true;
      case 'journey':
        return step === STOPS.length - 1;
      case 'accounts':
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
    intro: { eyebrow: 'Scene 1', headline: 'A simulated order starts in your pocket.' },
    journey: { eyebrow: 'Scene 2 · Order journey', headline: 'Follow a buy order to the demat account.' },
    accounts: { eyebrow: 'Scene 3', headline: 'Two accounts you’ll always see mentioned.' },
    challenge: { eyebrow: 'Challenge', headline: 'Who actually matches your order?' },
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

export default Course6TradeFlow;
