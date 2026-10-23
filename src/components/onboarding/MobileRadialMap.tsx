import React, { useMemo, useState } from 'react';
import {
  RINGS,
  RING_ORDER,
  RingId,
  TOPICS_BY_RING,
} from '../../data/radialCurriculum.ts';
import { AppLogo } from '../common/AppLogo.tsx';
import { CheckCircle2, Lock } from 'lucide-react';

interface MobileRadialMapProps {
  selectedTopicId: string | null;
  completedTopicIds: string[];
  onSelectTopic: (topicId: string) => void;
}

const VIEWBOX = 400;
const CENTER = VIEWBOX / 2;
const RING_RADIUS = 128;
const NODE_RADIUS = 22;
const LABEL_RADIUS = 178; // outward from center, past the node

/**
 * Mobile-first radial map.
 *
 * One ring at a time, picked via chip-tabs at the top. The active ring's
 * topics fan out around the FinCraft brand with external two-line labels
 * so every topic stays legible even on a 360-wide screen.
 */
export const MobileRadialMap: React.FC<MobileRadialMapProps> = ({
  selectedTopicId,
  completedTopicIds,
  onSelectTopic,
}) => {
  const initialRing: RingId = useMemo(() => {
    if (!selectedTopicId) return 'foundations';
    const found = RING_ORDER.find((r) =>
      TOPICS_BY_RING[r].some((t) => t.id === selectedTopicId),
    );
    return found ?? 'foundations';
  }, [selectedTopicId]);

  const [activeRing, setActiveRing] = useState<RingId>(initialRing);
  const topics = TOPICS_BY_RING[activeRing];
  const ring = RINGS[activeRing];
  const completedSet = useMemo(() => new Set(completedTopicIds), [completedTopicIds]);

  const positioned = useMemo(() => {
    const step = (2 * Math.PI) / topics.length;
    const start = -Math.PI / 2; // first node at top
    return topics.map((topic, idx) => {
      const angle = start + step * idx;
      const x = CENTER + Math.cos(angle) * RING_RADIUS;
      const y = CENTER + Math.sin(angle) * RING_RADIUS;
      const lx = CENTER + Math.cos(angle) * LABEL_RADIUS;
      const ly = CENTER + Math.sin(angle) * LABEL_RADIUS;
      return { topic, x, y, angle, lx, ly };
    });
  }, [topics]);

  return (
    <div className="relative w-full">
      {/* Ring tabs */}
      <div
        role="tablist"
        aria-label="Choose a learning ring"
        className="grid grid-cols-3 gap-1 p-1 bg-slate-900 border border-slate-800 rounded-2xl mb-3"
      >
        {RING_ORDER.map((rid) => {
          const r = RINGS[rid];
          const isActive = rid === activeRing;
          return (
            <button
              key={rid}
              role="tab"
              aria-selected={isActive}
              type="button"
              onClick={() => setActiveRing(rid)}
              className={`px-2 py-2 rounded-xl text-[11px] font-bold text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                isActive ? 'bg-slate-800 shadow-inner' : 'text-slate-400 hover:text-slate-200'
              }`}
              style={isActive ? { color: r.accent.hex } : undefined}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: r.accent.hex }}
                aria-hidden
              />
              <span className="leading-tight">{r.label}</span>
            </button>
          );
        })}
      </div>

      <p className="text-[11px] text-slate-400 text-center mb-2 px-2">{ring.description}</p>

      <div className="relative rounded-3xl bg-slate-950/60 border border-slate-800 overflow-hidden">
        <svg
          viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
          className="w-full h-auto block"
          role="img"
          aria-label={`${ring.label} ring with ${topics.length} topics radiating around the FinCraft brand node.`}
        >
          <defs>
            <radialGradient id="mobCenterGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={ring.accent.hex} stopOpacity="0.3" />
              <stop offset="60%" stopColor="#0f172a" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="mobCenterFill" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0f766e" />
              <stop offset="100%" stopColor="#042f2e" />
            </radialGradient>
          </defs>

          <circle cx={CENTER} cy={CENTER} r={180} fill="url(#mobCenterGlow)" />
          <circle
            cx={CENTER}
            cy={CENTER}
            r={RING_RADIUS}
            fill="none"
            stroke={ring.accent.hex}
            strokeOpacity={0.35}
            strokeWidth={1.25}
            strokeDasharray="3 6"
          />

          {/* Spokes from brand to each node */}
          {positioned.map(({ topic, x, y }) => (
            <line
              key={`spoke-${topic.id}`}
              x1={CENTER}
              y1={CENTER}
              x2={x}
              y2={y}
              stroke={ring.accent.hex}
              strokeOpacity={selectedTopicId === topic.id ? 0.75 : 0.22}
              strokeWidth={selectedTopicId === topic.id ? 1.5 : 1}
            />
          ))}

          {/* Center brand */}
          <g>
            <circle cx={CENTER} cy={CENTER} r={54} fill="url(#mobCenterFill)" />
            <circle
              cx={CENTER}
              cy={CENTER}
              r={54}
              fill="none"
              stroke={ring.accent.hex}
              strokeOpacity={0.5}
              strokeWidth={1.5}
            />
            <foreignObject x={CENTER - 44} y={CENTER - 44} width={88} height={88}>
              <div className="w-full h-full flex flex-col items-center justify-center text-center px-1 select-none pointer-events-none">
                <AppLogo size="md" withBackground={false} withGlow={false} />
                <span className="mt-0.5 text-[10px] font-black text-slate-100 tracking-tight">
                  FinCraft
                </span>
                <span className="text-[8px] text-teal-300 font-medium leading-tight">
                  Learn by doing
                </span>
              </div>
            </foreignObject>
          </g>

          {/* Nodes + external labels */}
          {positioned.map(({ topic, x, y, lx, ly }) => {
            const isSelected = selectedTopicId === topic.id;
            const isCompleted = completedSet.has(topic.id);
            const isLocked = topic.status === 'locked';
            const r = isSelected ? NODE_RADIUS + 3 : NODE_RADIUS;
            const fillHex = isSelected
              ? ring.accent.hex
              : isCompleted
                ? '#059669'
                : '#0b1120';
            const strokeHex = isLocked ? '#475569' : ring.accent.hex;
            const lines = splitLabel(topic.shortLabel);
            const labelFill = isSelected ? ring.accent.hex : '#e2e8f0';

            return (
              <g
                key={topic.id}
                onClick={() => onSelectTopic(topic.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectTopic(topic.id);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`${topic.title}, ${ring.label}, ${topic.difficulty}${isLocked ? ', locked' : ''}`}
                aria-pressed={isSelected}
                className="cursor-pointer outline-none focus-visible:[&>circle:nth-of-type(2)]:stroke-white"
              >
                {/* Enlarged hit target covers node + label area */}
                <rect
                  x={Math.min(x, lx) - 36}
                  y={Math.min(y, ly) - 20}
                  width={Math.abs(lx - x) + 72}
                  height={Math.abs(ly - y) + 40}
                  fill="transparent"
                />
                {/* Halo */}
                <circle cx={x} cy={y} r={r + 6} fill={ring.accent.hex} opacity={isSelected ? 0.28 : 0} />
                {/* Main */}
                <circle
                  cx={x}
                  cy={y}
                  r={r}
                  fill={fillHex}
                  stroke={strokeHex}
                  strokeWidth={isSelected ? 2.5 : 2}
                  opacity={isLocked ? 0.6 : 1}
                />
                {/* Status glyph */}
                {isCompleted && (
                  <g transform={`translate(${x + 13}, ${y - 13})`}>
                    <circle r={6} fill="#10b981" />
                    <path
                      d="M -2.5 0 L -0.5 1.8 L 2.5 -1.8"
                      stroke="white"
                      strokeWidth={1.4}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </g>
                )}
                {isLocked && (
                  <g transform={`translate(${x + 13}, ${y - 13})`}>
                    <circle r={6} fill="#334155" stroke="#64748b" strokeWidth={1} />
                    <rect x={-1.5} y={-0.5} width={3} height={3} rx={0.6} fill="#cbd5e1" />
                  </g>
                )}
                {/* External label */}
                <text
                  x={lx}
                  y={ly}
                  textAnchor="middle"
                  className="pointer-events-none select-none"
                  fill={labelFill}
                  fontSize={11}
                  fontWeight={700}
                >
                  {lines.map((ln, i) => (
                    <tspan key={i} x={lx} dy={i === 0 ? -2 : 12}>
                      {ln}
                    </tspan>
                  ))}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Active ring chip */}
        <div className="absolute top-2 left-2 inline-flex items-center gap-1.5 bg-slate-900/90 border border-slate-700 text-[10px] font-bold px-2 py-1 rounded-full">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: ring.accent.hex }}
            aria-hidden
          />
          <span className="uppercase tracking-wider" style={{ color: ring.accent.hex }}>
            {ring.label}
          </span>
          <span className="text-slate-400">· {topics.length} topics</span>
        </div>
      </div>

      {/* Compact legend */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 text-[10px]">
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
          <CheckCircle2 className="w-2.5 h-2.5" /> Completed
        </span>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-slate-700 bg-slate-800/50 text-slate-400">
          <Lock className="w-2.5 h-2.5" /> Needs prerequisite
        </span>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-200">
          Tap any node for details
        </span>
      </div>
    </div>
  );
};

/** Split a short label into at most two balanced lines so it reads cleanly in the SVG. */
function splitLabel(label: string): string[] {
  const words = label.split(/\s+/);
  if (words.length <= 1) return [label];
  if (words.length === 2) return words;
  const total = label.length;
  let acc = 0;
  const first: string[] = [];
  const second: string[] = [];
  for (const w of words) {
    if ((acc + w.length < total / 2 || first.length === 0) && second.length === 0) {
      first.push(w);
      acc += w.length + 1;
    } else {
      second.push(w);
    }
  }
  return [first.join(' '), second.join(' ')];
}

export default MobileRadialMap;
