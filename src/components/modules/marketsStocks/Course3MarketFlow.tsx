/**
 * Course 3 — How Does the Stock Market Work?
 *
 * Stepped lifecycle: Company → IPO/Listing → Investor places order →
 * Matching → Confirmation → Settlement. Learner clicks through each stage
 * and then answers where matching lives vs where settlement lives.
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  Banknote,
  Building2,
  CheckCircle2,
  Handshake,
  ListChecks,
  Rocket,
  User,
} from 'lucide-react';
import { SceneScaffold } from './shared/SceneScaffold.tsx';
import { Callout, OptionButton, PrimaryAction } from './shared/Controls.tsx';
import { useCharacterController } from '../../character/useCharacterController.ts';
import { MS_COURSE_BY_ID, MarketsStocksCourseId } from '../../../data/marketsStocks.ts';

type Scene = 'intro' | 'flow' | 'challenge' | 'complete';
const SCENES: Scene[] = ['intro', 'flow', 'challenge', 'complete'];
const COURSE = MS_COURSE_BY_ID.ms_c3_market_flow;

type ChallengeId = 'broker' | 'exchange' | 'bank';

interface Props {
  onBack: () => void;
  onComplete: (id: MarketsStocksCourseId) => void;
}

interface Stage {
  key: string;
  title: string;
  blurb: string;
  deep: string;
  icon: React.ComponentType<{ className?: string }>;
  tone: 'emerald' | 'sky' | 'amber' | 'teal' | 'rose' | 'violet';
}

const STAGES: Stage[] = [
  {
    key: 'company',
    title: 'Company decides to list',
    blurb: 'Sunny Bakery files to go public.',
    deep: 'The company files prospectus, gets regulatory approval, and prepares to issue shares to the public for the first time.',
    icon: Building2,
    tone: 'emerald',
  },
  {
    key: 'ipo',
    title: 'IPO / public listing',
    blurb: 'New shares sold to investors (primary market).',
    deep: 'Money raised goes to the company. Once allotted, those shares become tradable on the exchange — this is where the secondary market picks up.',
    icon: Rocket,
    tone: 'teal',
  },
  {
    key: 'order',
    title: 'Investor places an order',
    blurb: 'Buy or sell via a registered broker.',
    deep: 'The investor logs into their broker, enters price and quantity, and the broker routes the order to the exchange.',
    icon: User,
    tone: 'sky',
  },
  {
    key: 'match',
    title: 'Orders are matched',
    blurb: 'The exchange’s order book finds compatible counter-orders.',
    deep: 'Matching happens inside the exchange, usually by price-time priority: best price first, then earliest arrival.',
    icon: Handshake,
    tone: 'violet',
  },
  {
    key: 'confirm',
    title: 'Trade confirmation',
    blurb: 'Both sides receive execution details.',
    deep: 'This is the trade being <em>agreed</em>. The money and shares have not moved yet — settlement comes next.',
    icon: CheckCircle2,
    tone: 'amber',
  },
  {
    key: 'settle',
    title: 'Settlement & delivery',
    blurb: 'Cash moves one way, shares move the other.',
    deep: 'On the settlement date, cash is debited from the buyer and shares are credited to their demat account; the opposite for the seller. Confirmation and settlement are two different events.',
    icon: Banknote,
    tone: 'rose',
  },
];

const toneClass = (t: Stage['tone']) =>
  (({
    emerald: 'border-emerald-500/40 text-emerald-300 bg-emerald-500/10',
    sky: 'border-sky-500/40 text-sky-300 bg-sky-500/10',
    amber: 'border-amber-500/40 text-amber-300 bg-amber-500/10',
    teal: 'border-teal-500/40 text-teal-300 bg-teal-500/10',
    rose: 'border-rose-500/40 text-rose-300 bg-rose-500/10',
    violet: 'border-violet-500/40 text-violet-300 bg-violet-500/10',
  }) as const)[t];

export const Course3MarketFlow: React.FC<Props> = ({ onBack, onComplete }) => {
  const [scene, setScene] = useState<Scene>('intro');
  const [currentStage, setCurrentStage] = useState(0);
  const [challenge, setChallenge] = useState<ChallengeId | null>(null);
  const awardedRef = useRef(false);

  const character = useCharacterController({
    initialState: 'thinking',
    initialMessage: 'A single trade is six steps — not one magical event.',
    initialSubMessage: 'Walk them in order.',
  });

  useEffect(() => {
    switch (scene) {
      case 'intro':
        character.speak('Tap through each stage. Watch the handoff between parties.');
        character.react('talking', { durationMs: 2000 });
        break;
      case 'flow':
        character.speak(`${STAGES[currentStage].title}.`);
        character.react('thinking', { durationMs: 1500 });
        break;
      case 'challenge':
        character.speak('Where does the actual matching of orders happen?');
        character.react('thinking', { durationMs: 1800 });
        break;
      case 'complete':
        character.speak('Matching confirms a trade. Settlement moves money and shares later.');
        character.react('celebrating', { durationMs: 2400 });
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene, currentStage]);

  useEffect(() => {
    if (scene === 'complete' && !awardedRef.current) {
      awardedRef.current = true;
      onComplete('ms_c3_market_flow');
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
            <p className="text-sm text-slate-200">
              A trade travels through six distinct stages — each played by a different party, with a clear
              handoff. We’ll walk them one at a time.
            </p>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
              {STAGES.map((s, i) => (
                <li
                  key={s.key}
                  className="rounded-xl bg-slate-950/60 border border-slate-800 p-2 flex items-center gap-2"
                >
                  <span className="w-6 h-6 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-black text-slate-300">
                    {i + 1}
                  </span>
                  <span className="text-[11px] text-slate-300 leading-tight">{s.title}</span>
                </li>
              ))}
            </ul>
          </div>
        );

      case 'flow': {
        const s = STAGES[currentStage];
        return (
          <div className="space-y-3">
            <div className="flex items-center gap-1 overflow-x-auto pb-1 -mx-1 px-1">
              {STAGES.map((st, i) => (
                <button
                  key={st.key}
                  type="button"
                  onClick={() => setCurrentStage(i)}
                  aria-pressed={i === currentStage}
                  className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] font-bold border cursor-pointer ${
                    i === currentStage
                      ? toneClass(st.tone)
                      : i < currentStage
                        ? 'border-slate-700 bg-slate-800 text-slate-200'
                        : 'border-slate-800 bg-slate-900 text-slate-500'
                  }`}
                >
                  <span className="w-4 h-4 rounded bg-slate-950/60 border border-slate-700 flex items-center justify-center text-[9px]">
                    {i + 1}
                  </span>
                  <span className="whitespace-nowrap">{st.title}</span>
                </button>
              ))}
            </div>

            <div className={`rounded-2xl border p-4 ${toneClass(s.tone)}`}>
              <div className="flex items-center gap-2 mb-1">
                <s.icon className="w-5 h-5" />
                <span className="text-sm font-black">{s.title}</span>
              </div>
              <p
                className="text-xs opacity-90"
                dangerouslySetInnerHTML={{ __html: s.deep }}
              />
            </div>

            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setCurrentStage((i) => Math.max(0, i - 1))}
                disabled={currentStage === 0}
                className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 disabled:opacity-40 cursor-pointer"
              >
                ← Previous
              </button>
              <span className="text-[11px] text-slate-500 font-mono-num">
                {currentStage + 1}/{STAGES.length}
              </span>
              <button
                type="button"
                onClick={() => setCurrentStage((i) => Math.min(STAGES.length - 1, i + 1))}
                disabled={currentStage === STAGES.length - 1}
                className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 disabled:opacity-40 cursor-pointer"
              >
                Next stage →
              </button>
            </div>
          </div>
        );
      }

      case 'challenge': {
        const options = [
          {
            id: 'broker' as ChallengeId,
            title: 'The broker',
            description: 'Brokers route orders — they do not match them.',
          },
          {
            id: 'exchange' as ChallengeId,
            title: 'The stock exchange',
            description: 'Matching happens in the exchange’s order book, by price-time priority.',
          },
          {
            id: 'bank' as ChallengeId,
            title: 'The bank',
            description: 'Banks handle cash settlement, not order matching.',
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
                        : o.id === 'exchange'
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
              <Callout tone={challenge === 'exchange' ? 'success' : 'warning'}>
                Matching lives inside the exchange’s order book. The broker is a middle layer that routes orders, and settlement — moving the actual money and shares — happens later with the help of clearing and banking infrastructure.
              </Callout>
            )}
          </div>
        );
      }

      case 'complete':
        return (
          <div className="rounded-3xl bg-gradient-to-br from-sky-950/40 via-slate-900 to-slate-950 border border-sky-500/30 p-5 sm:p-6 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-500/15 border border-sky-500/30 text-sky-300 text-[11px] font-bold">
              <ListChecks className="w-3.5 h-3.5" />
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
      case 'flow':
        return currentStage === STAGES.length - 1;
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
    intro: { eyebrow: 'Scene 1', headline: 'Six stages, one trade.' },
    flow: {
      eyebrow: 'Scene 2 · Interactive flow',
      headline: 'Click through each stage — the handoff is the lesson.',
    },
    challenge: { eyebrow: 'Challenge', headline: 'Where does the matching happen?' },
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
      onBack={onBack}
      footer={footer}
    >
      {body}
    </SceneScaffold>
  );
};

export default Course3MarketFlow;
