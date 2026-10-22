/**
 * FinCraft Onboarding Flow — four screens:
 *   1. Welcome
 *   2. Explore the radial learning map (with topic detail panel)
 *   3. Choose your learning goal
 *   4. Enter your first lesson
 *
 * Resolves the selected learning goal to an existing lesson in the stocks /
 * mutual-funds modules. Preserves the previous `onComplete(moduleId)` and
 * `onSkip()` contract so App.tsx wiring stays stable.
 */

import React, { useEffect, useMemo, useState } from 'react';
import { AppLogo } from '../common/AppLogo.tsx';
import { ThemeToggle } from '../common/ThemeToggle.tsx';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Compass,
  LayoutGrid,
  Map as MapIcon,
  Sparkles,
  Target,
} from 'lucide-react';
import {
  GOAL_BY_ID,
  LEARNING_GOALS,
  LearningGoal,
  LearningGoalId,
  RADIAL_TOPICS,
  RadialTopic,
  TOPIC_BY_ID,
  findNearestAvailableTopic,
} from '../../data/radialCurriculum.ts';
import { LearningModuleId } from '../../data/learningModules.ts';
import { PathNode, LEARNING_UNITS } from '../../data/learningPath.ts';
import { RadialLearningMap } from './RadialLearningMap.tsx';
import { TopicDetailPanel } from './TopicDetailPanel.tsx';
import { TopicList } from './TopicList.tsx';

type Step = 'welcome' | 'map' | 'goal' | 'first-lesson';
type MapView = 'map' | 'list';

export interface OnboardingResult {
  moduleId: LearningModuleId;
  goalId: LearningGoalId;
  startLessonNode: PathNode | null;
}

interface OnboardingFlowProps {
  completedTopicIds?: string[];
  /** Called when the user wants to begin their first lesson. */
  onComplete: (result: OnboardingResult) => void;
  /** Called when the user skips the intro. */
  onSkip: () => void;
}

const STORAGE_KEY = 'fincraft_onboarded_v1';

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({
  completedTopicIds = [],
  onComplete,
  onSkip,
}) => {
  const [step, setStep] = useState<Step>('welcome');
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [goalId, setGoalId] = useState<LearningGoalId>('learn_stocks');
  const [mapView, setMapView] = useState<MapView>('map');
  const [reducedMotion, setReducedMotion] = useState(false);

  // Respect reduced-motion preferences for animations in the map.
  useEffect(() => {
    try {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReducedMotion(mq.matches);
      const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      mq.addEventListener('change', listener);
      return () => mq.removeEventListener('change', listener);
    } catch {
      /* ignore */
    }
  }, []);

  // Default map view based on viewport width.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const update = () => setMapView(window.innerWidth < 640 ? 'list' : 'map');
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const selectedTopic: RadialTopic | null = selectedTopicId
    ? TOPIC_BY_ID[selectedTopicId] ?? null
    : null;

  const resolvedGoal: LearningGoal = GOAL_BY_ID[goalId];
  const recommendedTopic = useMemo(
    () => findNearestAvailableTopic(resolvedGoal.recommendedTopicId),
    [resolvedGoal],
  );
  const recommendedLessonNode: PathNode | null = useMemo(() => {
    if (!recommendedTopic?.lessonIds?.length) return null;
    const lessonId = recommendedTopic.lessonIds[0];
    const node = LEARNING_UNITS.flatMap((u) => u.nodes).find((n) => n.id === lessonId);
    return node ?? null;
  }, [recommendedTopic]);
  const recommendedModuleId: LearningModuleId =
    recommendedTopic?.moduleId ?? 'stocks';

  const persistOnboarded = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      /* ignore */
    }
  };

  const handleSkip = () => {
    persistOnboarded();
    onSkip();
  };

  const handleStartTopic = (topic: RadialTopic) => {
    // Jump into goal selection once a topic is picked — matching the flow spec.
    const matchingGoal = LEARNING_GOALS.find((g) => g.recommendedTopicId === topic.id);
    if (matchingGoal) {
      setGoalId(matchingGoal.id);
    }
    setSelectedTopicId(topic.id);
    setStep('goal');
  };

  const handleFinish = () => {
    persistOnboarded();
    onComplete({
      moduleId: recommendedModuleId,
      goalId,
      startLessonNode: recommendedLessonNode,
    });
  };

  const headerStep: 1 | 2 | 3 | 4 =
    step === 'welcome' ? 1 : step === 'map' ? 2 : step === 'goal' ? 3 : 4;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-teal-500 selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-slate-950/85 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <AppLogo size="md" />
            <div>
              <span className="font-extrabold text-base tracking-tight text-slate-100 block">
                FinCraft
              </span>
              <span className="text-[10px] text-teal-400 font-semibold block tracking-wide">
                Learn finance by doing.
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-[11px] font-bold text-slate-300 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
              <span className="text-teal-300">Step {headerStep}</span>
              <span className="text-slate-500"> of 4</span>
            </span>
            <ThemeToggle />
            <button
              type="button"
              onClick={handleSkip}
              className="text-[11px] font-bold text-slate-300 hover:text-slate-100 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors cursor-pointer"
            >
              Skip intro
            </button>
          </div>
        </div>
      </header>

      {/* Progress rail */}
      <div className="max-w-6xl w-full mx-auto px-4 sm:px-8 pt-3">
        <div className="w-full bg-slate-900 border border-slate-800 h-1.5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-teal-500 via-sky-400 to-rose-400 transition-all duration-300"
            style={{ width: `${(headerStep / 4) * 100}%` }}
          />
        </div>
      </div>

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-8 py-6 sm:py-10">
        {step === 'welcome' && <WelcomeScreen onExplore={() => setStep('map')} onSkip={handleSkip} />}

        {step === 'map' && (
          <MapScreen
            selectedTopicId={selectedTopicId}
            setSelectedTopicId={setSelectedTopicId}
            completedTopicIds={completedTopicIds}
            mapView={mapView}
            setMapView={setMapView}
            reducedMotion={reducedMotion}
            onBack={() => setStep('welcome')}
            onContinue={(topic) => handleStartTopic(topic)}
          />
        )}

        {step === 'goal' && (
          <GoalScreen
            selectedTopic={selectedTopic}
            goalId={goalId}
            setGoalId={setGoalId}
            onBack={() => setStep('map')}
            onContinue={() => setStep('first-lesson')}
          />
        )}

        {step === 'first-lesson' && (
          <FirstLessonScreen
            goal={resolvedGoal}
            recommendedTopic={recommendedTopic}
            recommendedLessonNode={recommendedLessonNode}
            onBack={() => setStep('goal')}
            onReturnToMap={() => setStep('map')}
            onStart={handleFinish}
          />
        )}
      </main>

      <footer className="border-t border-slate-800 bg-slate-950 py-4 px-4 text-center text-[11px] text-slate-500">
        FinCraft is an interactive educational playground. Not SEBI registered investment advice.
      </footer>
    </div>
  );
};

// ===========================================================
// Screen 1 — Welcome
// ===========================================================
const WelcomeScreen: React.FC<{ onExplore: () => void; onSkip: () => void }> = ({
  onExplore,
  onSkip,
}) => {
  return (
    <section className="max-w-2xl mx-auto text-center py-10 sm:py-16 space-y-8 animate-in fade-in duration-300">
      <ConnectedNodesMotif />

      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Welcome to FinCraft</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-100 leading-tight">
          Your financial journey starts here.
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
          Explore how money, markets and investments work through interactive lessons, real-world scenarios and hands-on experiments.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          type="button"
          onClick={onExplore}
          className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-teal-500/30 active:scale-95"
        >
          <MapIcon className="w-4 h-4" />
          <span>Explore the map</span>
          <ArrowRight className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={onSkip}
          className="w-full sm:w-auto px-5 py-3 rounded-2xl text-sm font-bold text-slate-300 hover:text-slate-100 border border-slate-800 bg-slate-900 hover:bg-slate-800 cursor-pointer"
        >
          Skip intro
        </button>
      </div>
    </section>
  );
};

/** A subtle connected-node growth motif. Pure SVG, keeps motion gentle. */
const ConnectedNodesMotif: React.FC = () => {
  const nodes = [
    { cx: 60, cy: 110, r: 6, color: '#14b8a6' },
    { cx: 150, cy: 70, r: 7, color: '#38bdf8' },
    { cx: 230, cy: 100, r: 6, color: '#14b8a6' },
    { cx: 310, cy: 55, r: 8, color: '#fb7185' },
    { cx: 380, cy: 95, r: 6, color: '#38bdf8' },
    { cx: 450, cy: 45, r: 10, color: '#14b8a6' },
  ];
  return (
    <svg
      viewBox="0 0 500 160"
      className="mx-auto w-full max-w-md h-auto motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500"
      role="img"
      aria-label="A series of connected learning nodes rising toward growth"
    >
      <defs>
        <linearGradient id="trend" x1="0" x2="1" y1="1" y2="0">
          <stop offset="0" stopColor="#14b8a6" />
          <stop offset="0.5" stopColor="#38bdf8" />
          <stop offset="1" stopColor="#fb7185" />
        </linearGradient>
      </defs>
      <path
        d="M 60 110 C 100 90, 130 60, 150 70 S 220 110, 230 100 S 290 55, 310 55 S 370 100, 380 95 S 430 45, 450 45"
        fill="none"
        stroke="url(#trend)"
        strokeWidth={2}
        strokeLinecap="round"
        opacity={0.7}
      />
      {nodes.map((n, i) => (
        <circle key={i} cx={n.cx} cy={n.cy} r={n.r} fill={n.color} opacity={0.85} />
      ))}
    </svg>
  );
};

// ===========================================================
// Screen 2 — Radial Map
// ===========================================================
interface MapScreenProps {
  selectedTopicId: string | null;
  setSelectedTopicId: (id: string | null) => void;
  completedTopicIds: string[];
  mapView: MapView;
  setMapView: (v: MapView) => void;
  reducedMotion: boolean;
  onBack: () => void;
  onContinue: (topic: RadialTopic) => void;
}

const MapScreen: React.FC<MapScreenProps> = ({
  selectedTopicId,
  setSelectedTopicId,
  completedTopicIds,
  mapView,
  setMapView,
  reducedMotion,
  onBack,
  onContinue,
}) => {
  const selectedTopic = selectedTopicId ? TOPIC_BY_ID[selectedTopicId] : null;

  return (
    <section className="space-y-5 animate-in fade-in duration-200">
      <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-bold">
            <Compass className="w-3.5 h-3.5" />
            <span>Explore the learning map</span>
          </div>
          <h2 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-slate-100">
            Tap any topic to see what you'll learn.
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            Foundations sit at the centre, with investing basics and advanced topics radiating outward. Pick anything that catches your eye.
          </p>
        </div>
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl shrink-0">
          <button
            type="button"
            onClick={() => setMapView('map')}
            aria-pressed={mapView === 'map'}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
              mapView === 'map' ? 'bg-slate-800 text-slate-100' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <MapIcon className="w-3.5 h-3.5" />
            Map
          </button>
          <button
            type="button"
            onClick={() => setMapView('list')}
            aria-pressed={mapView === 'list'}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
              mapView === 'list' ? 'bg-slate-800 text-slate-100' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            List
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5">
        <div className="rounded-3xl bg-slate-900/50 border border-slate-800 p-3 sm:p-5">
          {mapView === 'map' ? (
            <RadialLearningMap
              selectedTopicId={selectedTopicId}
              completedTopicIds={completedTopicIds}
              onSelectTopic={setSelectedTopicId}
              reducedMotion={reducedMotion}
            />
          ) : (
            <TopicList
              selectedTopicId={selectedTopicId}
              completedTopicIds={completedTopicIds}
              onSelectTopic={setSelectedTopicId}
            />
          )}
        </div>

        <div className="hidden lg:block">
          {selectedTopic ? (
            <TopicDetailPanel
              topic={selectedTopic}
              completedTopicIds={completedTopicIds}
              onClose={() => setSelectedTopicId(null)}
              onStart={onContinue}
            />
          ) : (
            <div className="h-full flex items-center justify-center bg-slate-900/50 border border-dashed border-slate-800 rounded-3xl p-10 text-center">
              <div>
                <div className="w-14 h-14 mx-auto rounded-2xl bg-teal-500/15 border border-teal-500/30 text-teal-300 flex items-center justify-center">
                  <Compass className="w-6 h-6" />
                </div>
                <p className="mt-3 text-sm text-slate-300 font-semibold">
                  Pick a node to see details
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  Hover a node to preview connections, tap to open the topic.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile sheet when a topic is selected */}
      <div className="lg:hidden">
        {selectedTopic && (
          <TopicDetailPanel
            topic={selectedTopic}
            completedTopicIds={completedTopicIds}
            onClose={() => setSelectedTopicId(null)}
            onStart={onContinue}
          />
        )}
      </div>

      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-300 hover:text-slate-100 flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back
        </button>
        <button
          type="button"
          onClick={() => {
            const topic = selectedTopic ?? TOPIC_BY_ID['i_stocks'];
            if (topic) onContinue(topic);
          }}
          className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-extrabold flex items-center gap-1.5 cursor-pointer shadow-lg shadow-teal-500/30 active:scale-95"
        >
          <span>{selectedTopic ? 'Continue with ' + selectedTopic.shortLabel : 'Pick a goal'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </section>
  );
};

// ===========================================================
// Screen 3 — Goal selection
// ===========================================================
interface GoalScreenProps {
  selectedTopic: RadialTopic | null;
  goalId: LearningGoalId;
  setGoalId: (id: LearningGoalId) => void;
  onBack: () => void;
  onContinue: () => void;
}

const GoalScreen: React.FC<GoalScreenProps> = ({
  selectedTopic,
  goalId,
  setGoalId,
  onBack,
  onContinue,
}) => {
  return (
    <section className="space-y-6 animate-in fade-in duration-200">
      <header className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-bold">
          <Target className="w-3.5 h-3.5" />
          <span>Choose your learning goal</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-100">
          What would you like to understand first?
        </h2>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          We'll point you to a starting lesson. You can change your goal or jump around the map at any time.
        </p>
        {selectedTopic && (
          <div className="inline-flex items-center gap-1.5 mt-1 text-xs text-slate-400">
            <span>From the map:</span>
            <span className="font-semibold text-slate-200">{selectedTopic.title}</span>
          </div>
        )}
      </header>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {LEARNING_GOALS.map((g) => {
          const isSelected = g.id === goalId;
          return (
            <li key={g.id}>
              <button
                type="button"
                onClick={() => setGoalId(g.id)}
                aria-pressed={isSelected}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col gap-1.5 ${
                  isSelected
                    ? 'bg-teal-500/10 border-teal-400 ring-2 ring-teal-400/20'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-black text-slate-100">{g.title}</h3>
                  <span
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? 'border-teal-400 bg-teal-400 text-slate-950' : 'border-slate-700'
                    }`}
                  >
                    {isSelected && (
                      <svg viewBox="0 0 24 24" className="w-3 h-3" aria-hidden>
                        <path
                          d="M5 12l5 5 9-11"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{g.description}</p>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-300 hover:text-slate-100 flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to map
        </button>
        <button
          type="button"
          onClick={onContinue}
          className="px-6 py-3 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-sm flex items-center gap-1.5 cursor-pointer shadow-lg shadow-teal-500/30 active:scale-95"
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

// ===========================================================
// Screen 4 — First lesson entry
// ===========================================================
interface FirstLessonScreenProps {
  goal: LearningGoal;
  recommendedTopic: RadialTopic | null;
  recommendedLessonNode: PathNode | null;
  onBack: () => void;
  onReturnToMap: () => void;
  onStart: () => void;
}

const FirstLessonScreen: React.FC<FirstLessonScreenProps> = ({
  goal,
  recommendedTopic,
  recommendedLessonNode,
  onBack,
  onReturnToMap,
  onStart,
}) => {
  const hasWiredLesson = Boolean(recommendedLessonNode);
  return (
    <section className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-200">
      <header className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-bold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>You're ready</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-100">
          Let's learn by doing.
        </h2>
        <p className="text-sm text-slate-400 max-w-lg mx-auto">
          Start with a short interactive lesson and build your understanding one concept at a time.
        </p>
      </header>

      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-5 sm:p-6 space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Recommended first lesson
            </span>
            <h3 className="text-lg font-black text-slate-100 leading-tight">
              {hasWiredLesson
                ? recommendedLessonNode!.title
                : recommendedTopic?.title ?? 'What is a stock?'}
            </h3>
            {recommendedTopic?.description && (
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {recommendedTopic.description}
              </p>
            )}
          </div>
        </div>

        {!hasWiredLesson && recommendedTopic?.moduleId && (
          <div className="p-3 rounded-xl border border-sky-500/30 bg-sky-500/10 text-xs text-sky-200 leading-relaxed">
            We'll open the <span className="font-semibold">{recommendedTopic.title}</span> learning path so you can start with its first available level.
          </div>
        )}

        {!hasWiredLesson && !recommendedTopic?.moduleId && (
          <div className="p-3 rounded-xl border border-sky-500/30 bg-sky-500/10 text-xs text-sky-200 leading-relaxed">
            This topic is on the FinCraft learning map. We'll start you with the nearest available introductory lesson so you can keep learning while the rest of this track is built.
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2">
          <button
            type="button"
            onClick={onReturnToMap}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-bold cursor-pointer"
          >
            Return to learning map
          </button>
          <button
            type="button"
            onClick={onStart}
            className="px-6 py-3 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-teal-500/30 active:scale-95"
          >
            <span>Start first lesson</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-300 hover:text-slate-100 flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Change goal
        </button>
        <span className="text-[11px] text-slate-500">
          You can revisit any topic anytime from your Profile tab.
        </span>
      </div>
    </section>
  );
};

export default OnboardingFlow;
