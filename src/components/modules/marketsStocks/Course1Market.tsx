/**
 * Course 1 — What Is a Financial Market?
 *
 * Hook → Scenario (Sunny Bakery wants to expand) → Interaction (raise capital)
 * → Result → Explanation (primary vs secondary) → Challenge → Completion.
 */

import React, { useEffect, useRef, useState } from 'react';
import { Building2, Cake, HandCoins, Share2, Users } from 'lucide-react';
import { SceneScaffold } from './shared/SceneScaffold.tsx';
import { Callout, OptionButton, PrimaryAction, SimulatedBadge } from './shared/Controls.tsx';
import { useCharacterController } from '../../character/useCharacterController.ts';
import { MS_COURSE_BY_ID, MarketsStocksCourseId, SUNNY_BAKERY } from '../../../data/marketsStocks.ts';

type Scene = 'hook' | 'raise-capital' | 'secondary' | 'challenge' | 'complete';
const SCENES: Scene[] = ['hook', 'raise-capital', 'secondary', 'challenge', 'complete'];
const COURSE = MS_COURSE_BY_ID.ms_c1_market;

interface Props {
  onBack: () => void;
  onComplete: (id: MarketsStocksCourseId) => void;
}

type Capital = 'loan' | 'shares' | 'stay-small';
type Challenge = 'exchange' | 'market' | 'ipo';

export const Course1Market: React.FC<Props> = ({ onBack, onComplete }) => {
  const [scene, setScene] = useState<Scene>('hook');
  const [capital, setCapital] = useState<Capital | null>(null);
  const [secondaryViewed, setSecondaryViewed] = useState(false);
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const awardedRef = useRef(false);

  const character = useCharacterController({
    initialState: 'talking',
    initialMessage: `Meet ${SUNNY_BAKERY.name}. Business is good — they want to open a second branch.`,
    initialSubMessage: 'But opening a second branch costs money they don’t have yet.',
  });

  useEffect(() => {
    switch (scene) {
      case 'hook':
        character.speak('How does a business raise money to grow?');
        character.react('thinking', { durationMs: 2000 });
        break;
      case 'raise-capital':
        character.speak('Pick an option — each has a different cost.');
        character.react('thinking', { durationMs: 2000 });
        break;
      case 'secondary':
        character.speak('Once shares exist, investors can trade them with each other.');
        character.react('talking', { durationMs: 2000 });
        break;
      case 'challenge':
        character.speak('Quick check — what does the market actually do?');
        character.react('thinking', { durationMs: 2000 });
        break;
      case 'complete':
        character.speak('That’s the primary idea of a market. Next: who runs it.');
        character.react('celebrating', { durationMs: 2400 });
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene]);

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
      case 'hook':
        return (
          <div className="space-y-3">
            <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-5 flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-300 flex items-center justify-center shrink-0">
                <Cake className="w-8 h-8" />
              </div>
              <div>
                <SimulatedBadge />
                <h3 className="text-lg font-black text-slate-100 mt-1">{SUNNY_BAKERY.name}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  A fictional bakery in Mumbai. They want to open a second branch — needs ₹25 lakh they don’t have.
                </p>
              </div>
            </div>
            <Callout>
              A <strong>financial market</strong> is the place where businesses who need money meet investors who have money. Sunny Bakery is about to need both sides.
            </Callout>
          </div>
        );

      case 'raise-capital': {
        const options = [
          {
            id: 'loan' as Capital,
            title: 'Borrow money from a bank',
            description: 'Fixed interest to repay — you don’t give up ownership.',
          },
          {
            id: 'shares' as Capital,
            title: 'Issue shares to new investors',
            description: 'No interest — but new co-owners share future profits (and losses).',
          },
          {
            id: 'stay-small' as Capital,
            title: 'Wait and save profits for years',
            description: 'Zero outside funding — but the second branch may never happen.',
          },
        ];
        return (
          <div className="space-y-3">
            <ul className="grid grid-cols-1 gap-2">
              {options.map((o) => (
                <li key={o.id}>
                  <OptionButton option={o} selected={capital === o.id} onSelect={setCapital} />
                </li>
              ))}
            </ul>
            {capital && (
              <Callout tone={capital === 'stay-small' ? 'warning' : 'info'}>
                {capital === 'loan' && (
                  <>A loan keeps full ownership with the founders but adds a fixed repayment burden. Fine when cash flow is predictable.</>
                )}
                {capital === 'shares' && (
                  <>Issuing shares brings in new co-owners. No fixed repayment, but any future profits (or decisions) are shared. This is how a company enters the <strong>primary market</strong>.</>
                )}
                {capital === 'stay-small' && (
                  <>Patient and safe, but the expansion plan waits. Many businesses raise outside capital to move faster.</>
                )}
              </Callout>
            )}
          </div>
        );
      }

      case 'secondary':
        return (
          <div className="space-y-3">
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5 text-sky-400" /> Primary vs secondary
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-emerald-300" />
                    <span className="font-bold text-slate-100">Primary market</span>
                  </div>
                  <p className="text-slate-400 mt-1">
                    Sunny issues brand-new shares to investors for the first time. Money goes to the company.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-sky-300" />
                    <span className="font-bold text-slate-100">Secondary market</span>
                  </div>
                  <p className="text-slate-400 mt-1">
                    Those same shares can later be bought and sold between investors. Sunny does not receive this money.
                  </p>
                </div>
              </div>
            </div>
            {!secondaryViewed ? (
              <PrimaryAction onClick={() => setSecondaryViewed(true)} trailingIcon={false}>
                Got it
              </PrimaryAction>
            ) : (
              <Callout tone="info">
                A financial market is more than one place — it includes the primary issuance <em>and</em> the secondary trading that follows.
              </Callout>
            )}
          </div>
        );

      case 'challenge': {
        const options = [
          {
            id: 'exchange' as Challenge,
            title: 'A specific building where only brokers can enter',
            description: 'Real exchanges exist, but a market is bigger than any single building.',
          },
          {
            id: 'market' as Challenge,
            title: 'A network where buyers and sellers of securities can meet',
            description: 'Includes new issuance and ongoing trading between investors.',
          },
          {
            id: 'ipo' as Challenge,
            title: 'Only the moment a company first sells shares to the public',
            description: 'That event is called an IPO. The market exists before and after it, too.',
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
                        : o.id === 'market'
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
              <Callout tone={challenge === 'market' ? 'success' : 'warning'}>
                A financial market is the broader network — issuing shares <em>and</em> investors trading them with each other.
              </Callout>
            )}
          </div>
        );
      }

      case 'complete':
        return (
          <div className="rounded-3xl bg-gradient-to-br from-sky-950/40 via-slate-900 to-slate-950 border border-sky-500/30 p-5 sm:p-6 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-500/15 border border-sky-500/30 text-sky-300 text-[11px] font-bold">
              <HandCoins className="w-3.5 h-3.5" />
              Course complete
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-100">{COURSE.mainConcept}</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Next: who actually runs the market — and the difference between an exchange and an index.
            </p>
          </div>
        );
    }
  })();

  const canAdvance = (() => {
    switch (scene) {
      case 'hook':
        return true;
      case 'raise-capital':
        return capital !== null;
      case 'secondary':
        return secondaryViewed;
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
    hook: { eyebrow: 'Scene 1 · Hook', headline: 'Sunny Bakery wants to grow. Where does the money come from?' },
    'raise-capital': {
      eyebrow: 'Scene 2 · Interaction',
      headline: 'Which option raises money without a repayment schedule?',
    },
    secondary: {
      eyebrow: 'Scene 3 · Result',
      headline: 'Once shares exist, they can be traded between investors.',
    },
    challenge: { eyebrow: 'Challenge', headline: 'In one sentence — what is a financial market?' },
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

export default Course1Market;
