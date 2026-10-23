/**
 * Course 4 — What Is a Stock?
 *
 * Scenes: ownership grid (100 tiles, pick shares), implications of ownership,
 * challenge (loan vs share vs guaranteed dividend), complete.
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Minus, PiggyBank, Plus, Receipt, Scale } from 'lucide-react';
import { SceneScaffold } from './shared/SceneScaffold.tsx';
import { Callout, OptionButton, PrimaryAction, SimulatedBadge } from './shared/Controls.tsx';
import { useCharacterController } from '../../character/useCharacterController.ts';
import {
  MS_COURSE_BY_ID,
  MarketsStocksCourseId,
  SUNNY_BAKERY,
} from '../../../data/marketsStocks.ts';
import { calculateOwnershipPercent } from '../../../data/marketsStocksCalculations.ts';

type Scene = 'grid' | 'implications' | 'challenge' | 'complete';
const SCENES: Scene[] = ['grid', 'implications', 'challenge', 'complete'];
const COURSE = MS_COURSE_BY_ID.ms_c4_stock;

type ChallengeId = 'loan' | 'owner' | 'guaranteed';

interface Props {
  onBack: () => void;
  onComplete: (id: MarketsStocksCourseId) => void;
}

const QUICK_PICKS = [1, 5, 10, 25];

export const Course4Stock: React.FC<Props> = ({ onBack, onComplete }) => {
  const [scene, setScene] = useState<Scene>('grid');
  const [shares, setShares] = useState<number>(5);
  const [challenge, setChallenge] = useState<ChallengeId | null>(null);
  const awardedRef = useRef(false);

  const character = useCharacterController({
    initialState: 'talking',
    initialMessage: `${SUNNY_BAKERY.name} has issued ${SUNNY_BAKERY.sharesOutstanding} shares.`,
    initialSubMessage: 'How many do you want to own?',
  });

  useEffect(() => {
    switch (scene) {
      case 'grid':
        character.speak('Pick a share count — the grid shows your slice.');
        character.react('thinking', { durationMs: 2000 });
        break;
      case 'implications':
        character.speak('Owning shares isn’t the same as receiving money.');
        character.react('talking', { durationMs: 2000 });
        break;
      case 'challenge':
        character.speak('Which of these does owning a share actually give you?');
        character.react('thinking', { durationMs: 1800 });
        break;
      case 'complete':
        character.speak('Share = fractional ownership. No loan, no guarantee.');
        character.react('celebrating', { durationMs: 2400 });
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene]);

  useEffect(() => {
    if (scene === 'complete' && !awardedRef.current) {
      awardedRef.current = true;
      onComplete('ms_c4_stock');
    }
  }, [scene, onComplete]);

  const sceneIndex = SCENES.indexOf(scene);
  const next = () => {
    const n = SCENES[sceneIndex + 1];
    if (n) setScene(n);
  };

  const pct = calculateOwnershipPercent(shares, SUNNY_BAKERY.sharesOutstanding);

  const tiles = useMemo(() => Array.from({ length: 100 }, (_, i) => i < shares), [shares]);

  const body = (() => {
    switch (scene) {
      case 'grid':
        return (
          <div className="space-y-3">
            <SimulatedBadge />
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-3">
              <div className="grid grid-cols-10 gap-[3px]">
                {tiles.map((isOwned, i) => (
                  <div
                    key={i}
                    className={`aspect-square rounded ${
                      isOwned ? 'bg-teal-400' : 'bg-slate-800'
                    } motion-safe:transition-colors motion-safe:duration-200`}
                    aria-hidden
                  />
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block">
                    Your ownership
                  </span>
                  <span className="text-3xl font-black font-mono-num text-teal-300">{pct}%</span>
                  <span className="text-xs text-slate-400 ml-1">
                    ({shares} of {SUNNY_BAKERY.sharesOutstanding} shares)
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setShares((s) => Math.max(0, s - 1))}
                    className="w-9 h-9 rounded-xl bg-slate-800 text-slate-100 flex items-center justify-center cursor-pointer"
                    aria-label="Decrease"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center text-sm font-bold font-mono-num text-slate-100 bg-slate-950/70 border border-slate-800 rounded-lg py-1.5">
                    {shares}
                  </span>
                  <button
                    type="button"
                    onClick={() => setShares((s) => Math.min(100, s + 1))}
                    className="w-9 h-9 rounded-xl bg-slate-800 text-slate-100 flex items-center justify-center cursor-pointer"
                    aria-label="Increase"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2 flex-wrap">
                <span className="text-[11px] text-slate-500">Quick picks:</span>
                {QUICK_PICKS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setShares(p)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border cursor-pointer ${
                      shares === p
                        ? 'bg-teal-500/15 border-teal-400 text-teal-300'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {p} share{p === 1 ? '' : 's'}
                  </button>
                ))}
              </div>
            </div>
            <Callout>
              Your ownership stays proportional: {shares} out of {SUNNY_BAKERY.sharesOutstanding} = {pct}%.
              Simple to compute, powerful to understand.
            </Callout>
          </div>
        );

      case 'implications':
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="rounded-2xl bg-emerald-500/5 border border-emerald-500/30 p-4 flex items-start gap-3">
                <PiggyBank className="w-6 h-6 text-emerald-300 shrink-0" />
                <div>
                  <h4 className="text-sm font-black text-emerald-200">What ownership means</h4>
                  <ul className="mt-1 text-xs text-emerald-100/90 space-y-1 list-disc pl-5">
                    <li>A proportional claim on the company.</li>
                    <li>Voting rights at shareholder meetings (depending on share class).</li>
                    <li>Right to receive dividends — <em>if</em> and when they’re declared.</li>
                  </ul>
                </div>
              </div>
              <div className="rounded-2xl bg-rose-500/5 border border-rose-500/30 p-4 flex items-start gap-3">
                <Receipt className="w-6 h-6 text-rose-300 shrink-0" />
                <div>
                  <h4 className="text-sm font-black text-rose-200">What ownership does not promise</h4>
                  <ul className="mt-1 text-xs text-rose-100/90 space-y-1 list-disc pl-5">
                    <li>A guaranteed dividend payout.</li>
                    <li>A guaranteed return on your investment.</li>
                    <li>Repayment of your money by the company (that would be a loan).</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'challenge': {
        const options = [
          {
            id: 'loan' as ChallengeId,
            title: 'A loan to the company that it must repay',
            description: 'That describes debt / a bond — not a share.',
          },
          {
            id: 'owner' as ChallengeId,
            title: 'A small ownership stake in the business',
            description: 'Correct — a share is partial ownership, with rights and risks that come with it.',
          },
          {
            id: 'guaranteed' as ChallengeId,
            title: 'A guaranteed share of the company’s profit each year',
            description: 'Dividends depend on business performance and board decisions. Nothing is guaranteed.',
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
                        : o.id === 'owner'
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
              <Callout tone={challenge === 'owner' ? 'success' : 'warning'}>
                A share is <strong>partial ownership</strong>. Loans and guaranteed payouts are different instruments.
              </Callout>
            )}
          </div>
        );
      }

      case 'complete':
        return (
          <div className="rounded-3xl bg-gradient-to-br from-sky-950/40 via-slate-900 to-slate-950 border border-sky-500/30 p-5 sm:p-6 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-500/15 border border-sky-500/30 text-sky-300 text-[11px] font-bold">
              <Scale className="w-3.5 h-3.5" />
              Course complete
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-100">{COURSE.mainConcept}</h3>
          </div>
        );
    }
  })();

  const canAdvance = (() => {
    switch (scene) {
      case 'grid':
        return shares > 0;
      case 'implications':
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
    grid: {
      eyebrow: 'Scene 1 · Ownership grid',
      headline: `You buy shares of ${SUNNY_BAKERY.name}. How much of the business is yours?`,
      subheadline: `Each tile is one share out of ${SUNNY_BAKERY.sharesOutstanding}.`,
    },
    implications: { eyebrow: 'Scene 2', headline: 'What ownership actually means — and does not.' },
    challenge: { eyebrow: 'Challenge', headline: 'What does buying a share actually give you?' },
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

export default Course4Stock;
