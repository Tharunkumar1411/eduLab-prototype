import React from 'react';
import { Award, Flame, Sparkles, User, ToggleLeft, ToggleRight } from 'lucide-react';

interface HomeHeaderProps {
  userXp: number;
  userLevel: number;
  streakDays: number;
  isSimulatingNewUser: boolean;
  onToggleUserMode: () => void;
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({
  userXp,
  userLevel,
  streakDays,
  isSimulatingNewUser,
  onToggleUserMode,
}) => {
  return (
    <div className="space-y-4 pt-1 pb-2">
      {/* Top greeting row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
              Good morning 👋
            </h1>
          </div>
          <p className="text-sm text-slate-400 mt-1 font-medium">
            Learn something about finance today.
          </p>
        </div>

        {/* Small, beginner-friendly progress indicators (no cockpit clutter) */}
        <div className="flex items-center gap-2.5 self-start sm:self-auto flex-wrap">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-amber-400 font-semibold shadow-xs">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500/20" />
            <span className="tabular-nums">{streakDays} day streak</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-teal-300 font-semibold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span className="tabular-nums">{userXp.toLocaleString()} XP</span>
          </div>

          <div className="px-2.5 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 font-semibold shadow-xs">
            <span>Level {userLevel}</span>
          </div>

          {/* Persona View Switcher for Prototype Evaluation */}
          <button
            onClick={onToggleUserMode}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-dashed border-slate-700 text-[11px] text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            title="Switch between New User & Returning User view for testing"
          >
            {isSimulatingNewUser ? (
              <>
                <ToggleLeft className="w-4 h-4 text-amber-400" />
                <span>View: New User</span>
              </>
            ) : (
              <>
                <ToggleRight className="w-4 h-4 text-teal-400" />
                <span>View: Returning User</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
