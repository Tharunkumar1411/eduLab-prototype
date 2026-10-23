import React from 'react';
import {
  ArrowLeft,
  Award,
  CheckCircle2,
  Clock,
  LineChart,
  Play,
  Sparkles,
} from 'lucide-react';
import {
  MS_COURSES,
  MS_COURSE_BY_ID,
  MS_SECTIONS,
  MS_TOTAL_XP,
  MarketsStocksCourseId,
} from '../../../data/marketsStocks.ts';

interface MarketsStocksLandingProps {
  completedCourseIds: MarketsStocksCourseId[];
  earnedXp: number;
  onStartCourse: (id: MarketsStocksCourseId) => void;
  onBack: () => void;
}

export const MarketsStocksLanding: React.FC<MarketsStocksLandingProps> = ({
  completedCourseIds,
  earnedXp,
  onStartCourse,
  onBack,
}) => {
  const next = MS_COURSES.find((c) => !completedCourseIds.includes(c.id)) ?? MS_COURSES[MS_COURSES.length - 1];
  const done = completedCourseIds.length;
  const total = MS_COURSES.length;
  const percent = Math.round((done / total) * 100);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-10 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-300">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-slate-100 hover:bg-slate-800 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> <span>Back</span>
        </button>
        <span className="text-[11px] font-bold text-slate-300 bg-slate-900 border border-slate-800 px-2.5 py-1.5 rounded-xl font-mono-num">
          {done}/{total} courses · {earnedXp} XP
        </span>
      </div>

      {/* Hero */}
      <section className="rounded-3xl bg-gradient-to-br from-sky-950/60 via-slate-900 to-slate-950 border border-sky-500/30 p-5 sm:p-6">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-[11px] font-bold">
          <LineChart className="w-3.5 h-3.5" />
          Module · Beginner
        </div>
        <h1 className="mt-2 text-2xl sm:text-4xl font-black text-slate-100 tracking-tight leading-tight">
          Markets & Stocks
        </h1>
        <p className="mt-1 text-sm sm:text-base text-slate-300">
          How financial markets work, how companies issue shares, how stocks are traded, and how ETFs provide market exposure.
        </p>
        <p className="mt-3 text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
          Four sections, eight interactive courses. You will meet Sunny Bakery, map NSE and BSE, run a simulated order book, and compare a basket versus a single stock — all with clearly fictional data.
        </p>

        <div className="mt-4 w-full h-2 rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-sky-500 via-teal-400 to-emerald-400 transition-all duration-300"
            style={{ width: `${percent}%` }}
          />
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2.5 text-xs">
          <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-slate-300 font-medium">~30 min total</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center gap-2">
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-300 font-medium">{MS_TOTAL_XP} XP available</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-300 font-medium">All courses unlocked</span>
          </div>
        </div>

        <div className="mt-4">
          <button
            type="button"
            onClick={() => onStartCourse(next.id)}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-sm transition-all cursor-pointer shadow-lg shadow-sky-500/30 active:scale-95"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>{done === 0 ? `Start · ${next.title}` : `Continue · ${next.title}`}</span>
          </button>
        </div>
      </section>

      {/* Sections */}
      <div className="space-y-5">
        {MS_SECTIONS.map((section) => (
          <section key={section.id}>
            <header className="flex items-center justify-between mb-2 px-1">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] font-black text-sky-400">
                  Section {section.letter}
                </span>
                <h3 className="text-sm font-black text-slate-100">{section.title}</h3>
              </div>
              <span className="text-[11px] text-slate-500">{section.description}</span>
            </header>
            <ol className="space-y-2">
              {section.courseIds.map((cid) => {
                const course = MS_COURSE_BY_ID[cid];
                const isDone = completedCourseIds.includes(cid);
                const isNext = cid === next.id && !isDone;
                return (
                  <li key={cid}>
                    <button
                      type="button"
                      onClick={() => onStartCourse(cid)}
                      className={`w-full text-left p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-3 ${
                        isDone
                          ? 'bg-emerald-500/5 border-emerald-500/40'
                          : isNext
                            ? 'bg-sky-500/10 border-sky-400'
                            : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <span
                        className={`w-10 h-10 rounded-2xl border flex items-center justify-center shrink-0 font-black text-sm ${
                          isDone
                            ? 'border-emerald-500/50 bg-emerald-500/20 text-emerald-300'
                            : isNext
                              ? 'border-sky-400 bg-sky-500/20 text-sky-300'
                              : 'border-slate-700 bg-slate-900 text-slate-300'
                        }`}
                      >
                        {isDone ? <CheckCircle2 className="w-5 h-5" /> : course.number}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-bold text-slate-100">{course.title}</span>
                          {isDone && (
                            <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border border-emerald-500/40 bg-emerald-500/10 text-emerald-300">
                              Replay
                            </span>
                          )}
                          {isNext && (
                            <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border border-sky-400/40 bg-sky-500/15 text-sky-300">
                              Suggested next
                            </span>
                          )}
                        </div>
                        <span className="block text-[11px] text-slate-400 mt-0.5 line-clamp-2">
                          {course.subtitle}
                        </span>
                      </div>
                      <span className="text-[10px] font-semibold text-slate-400 whitespace-nowrap">
                        {course.estimatedMinutes}m · {course.xpReward} XP
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </section>
        ))}
      </div>
    </div>
  );
};

export default MarketsStocksLanding;
