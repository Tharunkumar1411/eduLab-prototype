/**
 * Course 2 — NSE, BSE & Market Indices.
 *
 * Interactive map tile with 4 nodes (NSE / BSE / Nifty 50 / Sensex).
 * Tap each to read its concise description. Challenge classifies each item.
 */

import React, { useEffect, useRef, useState } from 'react';
import { BarChart3, Building, Gauge, LineChart as LineChartIcon } from 'lucide-react';
import { SceneScaffold } from './shared/SceneScaffold.tsx';
import { Callout, PrimaryAction, SimulatedBadge } from './shared/Controls.tsx';
import { useCharacterController } from '../../character/useCharacterController.ts';
import { MS_COURSE_BY_ID, MarketsStocksCourseId } from '../../../data/marketsStocks.ts';

type Scene = 'map' | 'differences' | 'challenge' | 'complete';
const SCENES: Scene[] = ['map', 'differences', 'challenge', 'complete'];
const COURSE = MS_COURSE_BY_ID.ms_c2_nse_bse;

type NodeId = 'nse' | 'bse' | 'nifty' | 'sensex';
type Kind = 'exchange' | 'index';

interface Props {
  onBack: () => void;
  onComplete: (id: MarketsStocksCourseId) => void;
}

const NODES: {
  id: NodeId;
  title: string;
  kind: Kind;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}[] = [
  {
    id: 'nse',
    title: 'NSE',
    kind: 'exchange',
    icon: Building,
    description:
      'The National Stock Exchange of India. A stock exchange — the venue where buy and sell orders for listed securities are matched.',
  },
  {
    id: 'bse',
    title: 'BSE',
    kind: 'exchange',
    icon: Building,
    description:
      'The Bombay Stock Exchange, one of Asia’s oldest stock exchanges. Also a venue — not an index. Many securities are listed on both NSE and BSE.',
  },
  {
    id: 'nifty',
    title: 'Nifty 50',
    kind: 'index',
    icon: Gauge,
    description:
      'An NSE market index built from 50 large listed companies. It is a measurement of a slice of the market — it does not represent every company and you don’t trade “the index” directly.',
  },
  {
    id: 'sensex',
    title: 'Sensex',
    kind: 'index',
    icon: LineChartIcon,
    description:
      'A BSE market index built from 30 large companies. Like Nifty 50, it is a measurement published by the exchange, not a tradable security on its own.',
  },
];

export const Course2NseBse: React.FC<Props> = ({ onBack, onComplete }) => {
  const [scene, setScene] = useState<Scene>('map');
  const [activeNode, setActiveNode] = useState<NodeId>('nse');
  const [visited, setVisited] = useState<Set<NodeId>>(new Set(['nse']));
  const [answers, setAnswers] = useState<Record<NodeId, Kind | null>>({
    nse: null,
    bse: null,
    nifty: null,
    sensex: null,
  });
  const [submitted, setSubmitted] = useState(false);
  const awardedRef = useRef(false);

  const character = useCharacterController({
    initialState: 'thinking',
    initialMessage: 'Two exchanges, two famous indices. Which is which?',
    initialSubMessage: 'Tap each tile to read what it actually does.',
  });

  useEffect(() => {
    switch (scene) {
      case 'map':
        character.speak('Visit all four tiles — the map remembers what you’ve seen.');
        character.react('thinking', { durationMs: 2000 });
        break;
      case 'differences':
        character.speak('Exchange = venue. Index = measurement. Different jobs.');
        character.react('talking', { durationMs: 2000 });
        break;
      case 'challenge':
        character.speak('Classify each — exchange or index.');
        character.react('thinking', { durationMs: 1800 });
        break;
      case 'complete':
        character.speak('Clean. Now let’s walk a trade end to end.');
        character.react('celebrating', { durationMs: 2400 });
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene]);

  useEffect(() => {
    if (scene === 'complete' && !awardedRef.current) {
      awardedRef.current = true;
      onComplete('ms_c2_nse_bse');
    }
  }, [scene, onComplete]);

  const node = NODES.find((n) => n.id === activeNode)!;
  const sceneIndex = SCENES.indexOf(scene);
  const next = () => {
    const n = SCENES[sceneIndex + 1];
    if (n) setScene(n);
  };

  const allCorrect = NODES.every((n) => answers[n.id] === n.kind);

  const body = (() => {
    switch (scene) {
      case 'map':
        return (
          <div className="space-y-3">
            <SimulatedBadge />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {NODES.map((n) => {
                const isActive = activeNode === n.id;
                const wasVisited = visited.has(n.id);
                return (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => {
                      setActiveNode(n.id);
                      setVisited((prev) => new Set(prev).add(n.id));
                    }}
                    aria-pressed={isActive}
                    className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                      isActive
                        ? 'bg-sky-500/10 border-sky-400'
                        : wasVisited
                          ? 'bg-slate-900 border-slate-700'
                          : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <n.icon
                      className={`w-5 h-5 ${
                        n.kind === 'exchange' ? 'text-emerald-300' : 'text-sky-300'
                      }`}
                    />
                    <span className="block text-sm font-black text-slate-100 mt-1">{n.title}</span>
                    <span className="block text-[10px] uppercase tracking-wider text-slate-400">
                      {n.kind === 'exchange' ? 'Venue' : 'Measurement'}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-4">
              <div className="flex items-center gap-2 mb-1">
                <node.icon className="w-4 h-4 text-sky-300" />
                <span className="text-sm font-bold text-slate-100">{node.title}</span>
                <span className="text-[10px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded border border-slate-700 bg-slate-800 text-slate-300">
                  {node.kind === 'exchange' ? 'Exchange' : 'Index'}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{node.description}</p>
            </div>

            <p className="text-[11px] text-slate-500">
              Visited: {visited.size}/{NODES.length}
            </p>
          </div>
        );

      case 'differences':
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/40 p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Building className="w-4 h-4 text-emerald-300" />
                  <span className="text-sm font-black text-emerald-200">Stock exchange</span>
                </div>
                <p className="text-xs text-emerald-100/90">
                  A regulated venue that matches buy and sell orders for listed securities. NSE and BSE are examples.
                </p>
              </div>
              <div className="rounded-2xl bg-sky-500/10 border border-sky-500/40 p-4">
                <div className="flex items-center gap-2 mb-1">
                  <BarChart3 className="w-4 h-4 text-sky-300" />
                  <span className="text-sm font-black text-sky-200">Market index</span>
                </div>
                <p className="text-xs text-sky-100/90">
                  A number that tracks a basket of selected companies — a thermometer, not a shop. Nifty 50 and Sensex are examples.
                </p>
              </div>
            </div>
            <Callout tone="warning">
              An index <strong>does not</strong> contain every company in the market, and it does not host trades. Don’t equate "the market" with any single index.
            </Callout>
          </div>
        );

      case 'challenge':
        return (
          <div className="space-y-3">
            <ul className="space-y-2">
              {NODES.map((n) => (
                <li
                  key={n.id}
                  className="rounded-2xl bg-slate-900 border border-slate-800 p-3 flex items-center justify-between gap-3 flex-wrap"
                >
                  <div className="flex items-center gap-2">
                    <n.icon className="w-4 h-4 text-slate-300" />
                    <span className="text-sm font-bold text-slate-100">{n.title}</span>
                  </div>
                  <div className="flex gap-2">
                    {(['exchange', 'index'] as Kind[]).map((k) => {
                      const selected = answers[n.id] === k;
                      const correct = n.kind === k;
                      const indicator = submitted && selected ? (correct ? 'correct' : 'incorrect') : null;
                      return (
                        <button
                          key={k}
                          type="button"
                          onClick={() => setAnswers((prev) => ({ ...prev, [n.id]: k }))}
                          disabled={submitted}
                          aria-pressed={selected}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold border-2 cursor-pointer disabled:cursor-not-allowed ${
                            indicator === 'correct'
                              ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-200'
                              : indicator === 'incorrect'
                                ? 'bg-rose-500/10 border-rose-500/40 text-rose-200'
                                : selected
                                  ? 'bg-sky-500/10 border-sky-400 text-slate-100'
                                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          {k === 'exchange' ? 'Exchange' : 'Index'}
                        </button>
                      );
                    })}
                  </div>
                </li>
              ))}
            </ul>
            {!submitted ? (
              <PrimaryAction
                onClick={() => setSubmitted(true)}
                disabled={NODES.some((n) => answers[n.id] === null)}
                trailingIcon={false}
              >
                Check my answers
              </PrimaryAction>
            ) : (
              <Callout tone={allCorrect ? 'success' : 'info'}>
                NSE and BSE are <strong>exchanges</strong>. Nifty 50 and Sensex are <strong>indices</strong>. Different jobs, often confused.
              </Callout>
            )}
          </div>
        );

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
      case 'map':
        return visited.size === NODES.length;
      case 'differences':
        return true;
      case 'challenge':
        return submitted;
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
    map: {
      eyebrow: 'Scene 1 · Interactive map',
      headline: 'Tap each tile to see what it actually does.',
      subheadline: 'Visit all four before moving on.',
    },
    differences: {
      eyebrow: 'Scene 2 · The difference',
      headline: 'A venue vs a measurement.',
    },
    challenge: {
      eyebrow: 'Challenge',
      headline: 'Exchange or index?',
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
      onBack={onBack}
      footer={footer}
    >
      {body}
    </SceneScaffold>
  );
};

export default Course2NseBse;
