import React from 'react';
import {
  RadialTopic,
  RINGS,
  TOPIC_BY_ID,
} from '../../data/radialCurriculum.ts';
import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  Lock,
  Target,
  X,
} from 'lucide-react';

interface TopicDetailPanelProps {
  topic: RadialTopic;
  completedTopicIds: string[];
  onClose: () => void;
  onStart: (topic: RadialTopic) => void;
}

export const TopicDetailPanel: React.FC<TopicDetailPanelProps> = ({
  topic,
  completedTopicIds,
  onClose,
  onStart,
}) => {
  const ring = RINGS[topic.ring];
  const isCompleted = completedTopicIds.includes(topic.id);
  const prereqsMet = topic.prerequisites.every((p) => completedTopicIds.includes(p));
  const isLocked = topic.status === 'locked';
  const canStart = topic.status === 'available' && !isLocked;
  const unmetPrereqs = topic.prerequisites
    .map((p) => TOPIC_BY_ID[p])
    .filter((t): t is RadialTopic => Boolean(t) && !completedTopicIds.includes(t.id));

  return (
    <aside
      role="dialog"
      aria-modal="true"
      aria-label={`${topic.title} details`}
      className="fixed inset-x-0 bottom-0 z-40 sm:static sm:inset-auto sm:z-auto sm:w-full"
    >
      {/* Mobile backdrop */}
      <div
        className="sm:hidden fixed inset-0 bg-black/60 backdrop-blur-xs"
        onClick={onClose}
        aria-hidden
      />

      <div className="relative sm:static bg-slate-900 border border-slate-800 sm:rounded-3xl rounded-t-3xl shadow-2xl shadow-black/40 p-5 sm:p-6 max-h-[80vh] sm:max-h-none overflow-y-auto animate-in slide-in-from-bottom-4 sm:slide-in-from-bottom-0 fade-in duration-200">
        {/* Mobile drag handle */}
        <div className="sm:hidden mx-auto w-10 h-1 bg-slate-700 rounded-full mb-3" aria-hidden />

        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${ring.accent.badge}`}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: ring.accent.hex }}
                aria-hidden
              />
              {ring.label}
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              {topic.difficulty}
            </span>
            {isCompleted && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-[10px] font-bold">
                <CheckCircle2 className="w-3 h-3" /> Completed
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close topic details"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <h3 className="text-xl sm:text-2xl font-black tracking-tight text-slate-100 leading-tight">
          {topic.title}
        </h3>
        <p className="text-sm text-slate-400 mt-1.5 leading-relaxed">{topic.description}</p>

        {/* Learning outcomes */}
        <div className="mt-5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
            <Target className="w-3.5 h-3.5 text-teal-400" />
            <span>You will learn</span>
          </div>
          <ul className="mt-2 space-y-1.5">
            {topic.learningOutcomes.map((o, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-teal-400" />
                <span>{o}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Prerequisites */}
        {topic.prerequisites.length > 0 && (
          <div className="mt-5 p-3 rounded-xl border border-slate-800 bg-slate-950/50">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
              <BookOpenCheck className="w-3.5 h-3.5 text-sky-400" />
              <span>Builds on</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {topic.prerequisites.map((pid) => {
                const p = TOPIC_BY_ID[pid];
                if (!p) return null;
                const done = completedTopicIds.includes(pid);
                return (
                  <span
                    key={pid}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-[11px] ${
                      done
                        ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                        : 'border-slate-700 bg-slate-900 text-slate-300'
                    }`}
                  >
                    {done ? (
                      <CheckCircle2 className="w-3 h-3" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-slate-500" aria-hidden />
                    )}
                    {p.title}
                  </span>
                );
              })}
            </div>
            {!prereqsMet && unmetPrereqs.length > 0 && (
              <p className="mt-2 text-[11px] text-slate-400 leading-relaxed">
                We recommend finishing {unmetPrereqs.map((p) => `“${p.title}”`).join(', ')} first — the ideas here build directly on them.
              </p>
            )}
          </div>
        )}

        {/* Status note for preview topics */}
        {topic.status === 'preview' && (
          <div className="mt-4 p-3 rounded-xl border border-sky-500/30 bg-sky-500/10 text-xs text-sky-200 leading-relaxed">
            This topic is on the FinCraft learning map. Interactive lessons for it are on the way — we'll point you to the nearest available lesson from here.
          </div>
        )}

        {isLocked && (
          <div className="mt-4 p-3 rounded-xl border border-slate-700 bg-slate-800/50 text-xs text-slate-300 flex items-start gap-2">
            <Lock className="w-3.5 h-3.5 mt-0.5 shrink-0" />
            <span>
              Unlock this topic by finishing its prerequisites first. Progress through earlier rings and this node will open automatically.
            </span>
          </div>
        )}

        {/* CTA row */}
        <div className="mt-6 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-semibold text-slate-400 hover:text-slate-200 px-2 py-1 cursor-pointer"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => onStart(topic)}
            disabled={isLocked}
            className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all cursor-pointer active:scale-95 shadow-lg ${
              canStart
                ? 'bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-teal-500/30'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-100 shadow-black/30'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <span>{canStart ? 'Start learning' : 'Explore topic'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default TopicDetailPanel;
