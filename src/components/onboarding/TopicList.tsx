import React from 'react';
import {
  RINGS,
  RING_ORDER,
  TOPICS_BY_RING,
  RadialTopic,
} from '../../data/radialCurriculum.ts';
import { CheckCircle2, ChevronRight, Lock } from 'lucide-react';

interface TopicListProps {
  selectedTopicId: string | null;
  completedTopicIds: string[];
  onSelectTopic: (topicId: string) => void;
}

export const TopicList: React.FC<TopicListProps> = ({
  selectedTopicId,
  completedTopicIds,
  onSelectTopic,
}) => {
  return (
    <div className="space-y-6">
      {RING_ORDER.map((ringId) => {
        const ring = RINGS[ringId];
        const topics = TOPICS_BY_RING[ringId];
        return (
          <section key={ringId}>
            <header className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: ring.accent.hex }}
                  aria-hidden
                />
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-100">
                  {ring.label}
                </h4>
              </div>
              <span className="text-[10px] text-slate-400">{ring.description}</span>
            </header>
            <ul className="space-y-1.5">
              {topics.map((t) => (
                <li key={t.id}>
                  <TopicRow
                    topic={t}
                    selected={selectedTopicId === t.id}
                    completed={completedTopicIds.includes(t.id)}
                    onSelect={() => onSelectTopic(t.id)}
                  />
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
};

interface TopicRowProps {
  topic: RadialTopic;
  selected: boolean;
  completed: boolean;
  onSelect: () => void;
}

const TopicRow: React.FC<TopicRowProps> = ({ topic, selected, completed, onSelect }) => {
  const ring = RINGS[topic.ring];
  const isLocked = topic.status === 'locked';
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`w-full text-left p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
        selected
          ? 'bg-teal-500/10 border-teal-400/50'
          : 'bg-slate-900 border-slate-800 hover:border-slate-700'
      }`}
    >
      <span
        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border"
        style={{
          backgroundColor: `${ring.accent.hex}22`,
          borderColor: `${ring.accent.hex}66`,
        }}
      >
        {completed ? (
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        ) : isLocked ? (
          <Lock className="w-4 h-4 text-slate-400" />
        ) : (
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: ring.accent.hex }} aria-hidden />
        )}
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-slate-100 truncate">{topic.title}</span>
          <span
            className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${ring.accent.badge}`}
          >
            {topic.difficulty}
          </span>
        </div>
        <p className="text-[11px] text-slate-400 line-clamp-2 leading-snug mt-0.5">
          {topic.description}
        </p>
      </div>
      <ChevronRight className="w-4 h-4 text-slate-500 shrink-0" />
    </button>
  );
};

export default TopicList;
