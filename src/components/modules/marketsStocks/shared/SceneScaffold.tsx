/**
 * Scene scaffold for Markets & Stocks courses.
 *
 * Top bar: back + course chip + progress rail.
 * Mentor row (optional).
 * Body + sticky footer actions.
 */

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { CharacterMentor, CharacterState } from '../../../character/CharacterMentor.tsx';
import { CharacterNarrator } from '../../../character/narration/CharacterNarrator.tsx';
import type { Narration } from '../../../character/narration/types.ts';

export interface SceneScaffoldProps {
  courseNumber: string;
  courseTitle: string;
  sectionLetter: string;
  sceneIndex: number;
  totalScenes: number;
  eyebrow?: string;
  headline: string;
  subheadline?: string;
  mentorState: CharacterState;
  mentorMessage: string;
  mentorSubMessage?: string;
  /**
   * When provided, the scene's mentor row is replaced by the narration
   * surface (same character, same slot, same spacing). Lessons without a
   * narration continue to render the inline mentor row.
   */
  narration?: Narration | null;
  onBack: () => void;
  footer: React.ReactNode;
  children: React.ReactNode;
}

export const SceneScaffold: React.FC<SceneScaffoldProps> = ({
  courseNumber,
  courseTitle,
  sectionLetter,
  sceneIndex,
  totalScenes,
  eyebrow,
  headline,
  subheadline,
  mentorState,
  mentorMessage,
  mentorSubMessage,
  narration,
  onBack,
  footer,
  children,
}) => {
  const percent = Math.round(((sceneIndex + 1) / totalScenes) * 100);

  return (
    <div className="min-h-[80vh] flex flex-col gap-4 sm:gap-5 pb-24 sm:pb-6 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-200">
      <header className="sticky top-0 z-10 bg-slate-950/85 backdrop-blur-md -mx-2 sm:-mx-4 px-2 sm:px-4 py-3 border-b border-slate-800/60">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-slate-100 hover:bg-slate-800 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
          <div className="flex-1 min-w-0 text-center">
            <span className="block text-[10px] uppercase tracking-[0.25em] text-sky-400 font-bold">
              Section {sectionLetter} · Course {courseNumber}
            </span>
            <span className="block text-xs font-semibold text-slate-200 truncate">
              {courseTitle}
            </span>
          </div>
          <span className="shrink-0 text-[11px] font-bold text-slate-300 bg-slate-900 border border-slate-800 px-2.5 py-1.5 rounded-lg font-mono-num">
            {sceneIndex + 1}/{totalScenes}
          </span>
        </div>
        <div className="mt-2 w-full h-1 rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-sky-500 via-teal-400 to-emerald-400 transition-all duration-300"
            style={{ width: `${percent}%` }}
          />
        </div>
      </header>

      <div className="px-1">
        {eyebrow && (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-[11px] font-bold mb-2">
            {eyebrow}
          </div>
        )}
        <h2 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight leading-tight">
          {headline}
        </h2>
        {subheadline && (
          <p className="mt-1.5 text-sm text-slate-400 leading-relaxed">{subheadline}</p>
        )}
      </div>

      {narration ? (
        <CharacterNarrator narration={narration} />
      ) : (
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-3 sm:p-4 flex items-start gap-3">
          <CharacterMentor
            state={mentorState}
            message={mentorMessage}
            subMessage={mentorSubMessage}
            size="xs"
            revealProgressively
          />
        </div>
      )}

      <div className="flex-1">{children}</div>

      <div className="fixed sm:static bottom-0 inset-x-0 sm:inset-auto bg-slate-950/95 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-0 border-t sm:border-0 border-slate-800 px-3 py-3 sm:px-0 sm:py-0 z-20">
        <div className="max-w-5xl mx-auto flex items-center justify-end gap-2">{footer}</div>
      </div>
    </div>
  );
};

export default SceneScaffold;
