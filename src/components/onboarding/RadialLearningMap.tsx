import React, { useMemo, useState } from 'react';
import {
  RADIAL_TOPICS,
  RINGS,
  RING_ORDER,
  RadialTopic,
  RingId,
  TOPIC_BY_ID,
  TOPICS_BY_RING,
} from '../../data/radialCurriculum.ts';
import { AppLogo } from '../common/AppLogo.tsx';
import { CheckCircle2, Lock, Sparkles } from 'lucide-react';

interface RadialLearningMapProps {
  selectedTopicId: string | null;
  completedTopicIds: string[];
  onSelectTopic: (topicId: string) => void;
  /** For small screens the parent can switch to the list view. */
  reducedMotion?: boolean;
}

interface PositionedNode {
  topic: RadialTopic;
  x: number;
  y: number;
  angle: number; // in radians
  radius: number;
}

const VIEWBOX = 820;
const CENTER = VIEWBOX / 2;

const RING_RADII: Record<RingId, number> = {
  foundations: 160,
  investing: 260,
  advanced: 360,
};

/** Fixed, hand-tuned angle offsets so each ring stays visually balanced. */
const RING_START_ANGLE: Record<RingId, number> = {
  foundations: -Math.PI / 2, // top
  investing: -Math.PI / 2 + Math.PI / 14,
  advanced: -Math.PI / 2 - Math.PI / 16,
};

export const RadialLearningMap: React.FC<RadialLearningMapProps> = ({
  selectedTopicId,
  completedTopicIds,
  onSelectTopic,
  reducedMotion = false,
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const nodes: PositionedNode[] = useMemo(() => {
    const out: PositionedNode[] = [];
    for (const ringId of RING_ORDER) {
      const topics = TOPICS_BY_RING[ringId];
      const radius = RING_RADII[ringId];
      const startAngle = RING_START_ANGLE[ringId];
      const step = (2 * Math.PI) / topics.length;
      topics.forEach((topic, idx) => {
        const angle = startAngle + step * idx;
        const x = CENTER + Math.cos(angle) * radius;
        const y = CENTER + Math.sin(angle) * radius;
        out.push({ topic, x, y, angle, radius });
      });
    }
    return out;
  }, []);

  const nodeIndex: Record<string, PositionedNode> = useMemo(
    () => Object.fromEntries(nodes.map((n) => [n.topic.id, n])),
    [nodes],
  );

  const completedSet = useMemo(() => new Set(completedTopicIds), [completedTopicIds]);
  const highlightedId = hoveredId || selectedTopicId;
  const highlightedConnections = highlightedId
    ? new Set(TOPIC_BY_ID[highlightedId]?.connections ?? [])
    : new Set<string>();

  // Build unique connector pairs
  const connectors = useMemo(() => {
    const seen = new Set<string>();
    const pairs: { a: PositionedNode; b: PositionedNode; key: string }[] = [];
    for (const node of nodes) {
      for (const connId of node.topic.connections) {
        const other = nodeIndex[connId];
        if (!other) continue;
        const key = [node.topic.id, connId].sort().join('|');
        if (seen.has(key)) continue;
        seen.add(key);
        pairs.push({ a: node, b: other, key });
      }
    }
    return pairs;
  }, [nodes, nodeIndex]);

  const motionClass = reducedMotion ? '' : 'transition-all duration-200';

  return (
    <div className="relative w-full">
      <svg
        viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
        className="w-full h-auto max-h-[78vh] mx-auto block"
        role="img"
        aria-label="FinCraft radial learning map with three concentric rings: Foundations, Investing Basics, and Advanced Topics."
      >
        <defs>
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.35" />
            <stop offset="60%" stopColor="#0f172a" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="centerNodeGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0f766e" />
            <stop offset="100%" stopColor="#042f2e" />
          </radialGradient>

          {/* Curved paths for ring labels */}
          {RING_ORDER.map((ringId) => (
            <path
              key={`arc-${ringId}`}
              id={`arc-${ringId}`}
              d={describeArc(CENTER, CENTER, RING_RADII[ringId] + 24, -140, -40)}
              fill="none"
            />
          ))}
        </defs>

        {/* Center glow */}
        <circle cx={CENTER} cy={CENTER} r={120} fill="url(#centerGlow)" />

        {/* Rings */}
        {RING_ORDER.map((ringId) => {
          const ring = RINGS[ringId];
          return (
            <g key={`ring-${ringId}`}>
              <circle
                cx={CENTER}
                cy={CENTER}
                r={RING_RADII[ringId]}
                fill="none"
                className={`${ring.accent.stroke}`}
                strokeWidth={1.25}
                strokeDasharray="2 6"
                opacity={0.7}
              />
              <text className={`text-[13px] font-semibold uppercase tracking-[0.3em] ${ring.accent.text}`}>
                <textPath href={`#arc-${ringId}`} startOffset="50%" textAnchor="middle">
                  {ring.label}
                </textPath>
              </text>
            </g>
          );
        })}

        {/* Connectors */}
        {connectors.map(({ a, b, key }) => {
          const isHighlighted =
            highlightedId &&
            (a.topic.id === highlightedId ||
              b.topic.id === highlightedId ||
              (highlightedConnections.has(a.topic.id) && highlightedConnections.has(b.topic.id)));
          return (
            <line
              key={key}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={isHighlighted ? '#5eead4' : '#334155'}
              strokeOpacity={isHighlighted ? 0.9 : 0.35}
              strokeWidth={isHighlighted ? 1.75 : 1}
              className={motionClass}
            />
          );
        })}

        {/* Center brand node */}
        <g>
          <circle cx={CENTER} cy={CENTER} r={70} fill="url(#centerNodeGrad)" />
          <circle
            cx={CENTER}
            cy={CENTER}
            r={70}
            fill="none"
            stroke="#14b8a6"
            strokeWidth={1.5}
            opacity={0.55}
          />
          <foreignObject x={CENTER - 60} y={CENTER - 60} width={120} height={120}>
            <div className="w-full h-full flex flex-col items-center justify-center text-center px-2 select-none">
              <AppLogo size="lg" withBackground={false} withGlow={false} />
              <span className="mt-1 text-[11px] font-black text-slate-100 tracking-tight">FinCraft</span>
              <span className="text-[9px] text-teal-300 font-medium leading-tight">Learn by doing</span>
            </div>
          </foreignObject>
        </g>

        {/* Nodes */}
        {nodes.map(({ topic, x, y }) => {
          const ring = RINGS[topic.ring];
          const isSelected = selectedTopicId === topic.id;
          const isHovered = hoveredId === topic.id;
          const isCompleted = completedSet.has(topic.id);
          const isLocked = topic.status === 'locked';
          const r = isSelected || isHovered ? 32 : 28;
          const fillHex = isSelected
            ? ring.accent.hex
            : isCompleted
              ? '#059669'
              : '#0f172a';
          const strokeHex = isLocked ? '#475569' : ring.accent.hex;

          return (
            <g
              key={topic.id}
              transform={`translate(${x}, ${y})`}
              onMouseEnter={() => setHoveredId(topic.id)}
              onMouseLeave={() => setHoveredId(null)}
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
              className={`cursor-pointer outline-none focus-visible:[&>circle:first-of-type]:stroke-white ${motionClass}`}
              style={{ transformOrigin: `${x}px ${y}px` }}
            >
              <circle
                r={r + 6}
                fill={ring.accent.hex}
                opacity={isSelected ? 0.25 : isHovered ? 0.15 : 0}
                className={motionClass}
              />
              <circle
                r={r}
                fill={fillHex}
                stroke={strokeHex}
                strokeWidth={isSelected ? 3 : 2}
                opacity={isLocked ? 0.6 : 1}
                className={motionClass}
              />
              {/* Status glyph */}
              {isCompleted && (
                <g transform="translate(14, -22)">
                  <circle r={8} fill="#10b981" />
                  <path
                    d="M -3.5 0 L -1 2.5 L 3.5 -2.5"
                    stroke="white"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </g>
              )}
              {isLocked && (
                <g transform="translate(14, -22)">
                  <circle r={8} fill="#334155" stroke="#64748b" strokeWidth={1} />
                  <rect x={-2.5} y={-1} width={5} height={5} rx={1} fill="#cbd5e1" />
                  <path
                    d="M -2 -1 V -3 a 2 2 0 0 1 4 0 V -1"
                    stroke="#cbd5e1"
                    strokeWidth={1}
                    fill="none"
                  />
                </g>
              )}
              <text
                textAnchor="middle"
                y={4}
                className="pointer-events-none select-none"
                fill={isSelected ? '#0f172a' : '#f1f5f9'}
                fontSize={11}
                fontWeight={700}
              >
                {topic.shortLabel}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-[11px]">
        {RING_ORDER.map((ringId) => {
          const ring = RINGS[ringId];
          return (
            <span
              key={ringId}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${ring.accent.badge}`}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: ring.accent.hex }}
                aria-hidden
              />
              <span className="font-semibold">{ring.label}</span>
              <span className="hidden sm:inline text-slate-400 font-normal">· {ring.description}</span>
            </span>
          );
        })}
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
          <CheckCircle2 className="w-3 h-3" /> Completed
        </span>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-slate-700 bg-slate-800/50 text-slate-400">
          <Lock className="w-3 h-3" /> Needs prerequisite
        </span>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-200">
          <Sparkles className="w-3 h-3" /> Tap any node
        </span>
      </div>
    </div>
  );
};

/** Returns an SVG arc path spanning startDeg to endDeg (degrees, 0 = right, clockwise). */
function describeArc(cx: number, cy: number, r: number, startDeg: number, endDeg: number) {
  const start = polarToCartesian(cx, cy, r, endDeg);
  const end = polarToCartesian(cx, cy, r, startDeg);
  const largeArc = endDeg - startDeg <= 180 ? '0' : '1';
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`;
}

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180.0;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

export default RadialLearningMap;
