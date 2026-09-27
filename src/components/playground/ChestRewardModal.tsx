/**
 * Milestone Treasure Chest Modal.
 * Unlocks celebratory XP bonuses and investor badges along the Duolingo path.
 */

import React from 'react';
import { PathNode } from '../../data/learningPath.ts';
import { Award, CheckCircle, Sparkles, X } from 'lucide-react';

interface ChestRewardModalProps {
  node: PathNode;
  onClose: () => void;
  onClaim: (nodeId: string, xpEarned: number) => void;
}

export const ChestRewardModal: React.FC<ChestRewardModalProps> = ({
  node,
  onClose,
  onClaim,
}) => {
  const reward = node.chestReward || {
    xp: 50,
    badgeName: 'Market Explorer',
    badgeIcon: '💎',
    quote: 'An investment in knowledge pays the best interest. — Benjamin Franklin',
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-amber-500/40 rounded-2xl max-w-sm w-full p-6 text-center space-y-6 shadow-2xl relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-300 transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chest 3D Icon */}
        <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
          <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-xl animate-pulse" />
          <div className="text-6xl select-none filter drop-shadow-lg transform hover:scale-110 transition-transform">
            🎁
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-xs uppercase tracking-wider font-bold text-amber-400 block">
            Milestone Unlocked!
          </span>
          <h3 className="text-xl font-black text-slate-100">
            {node.title}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            You reached a significant checkpoint on your path to financial mastery.
          </p>
        </div>

        {/* Reward Card */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl">{reward.badgeIcon}</span>
            <span className="text-sm font-bold text-slate-100">
              {reward.badgeName} Badge
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/15 border border-amber-500/30 rounded-full text-xs font-bold text-amber-300 font-mono-num">
            <Sparkles className="w-3.5 h-3.5" />
            <span>+{reward.xp} BONUS XP</span>
          </div>

          <p className="text-[11px] text-slate-400 italic pt-1 border-t border-slate-850">
            "{reward.quote}"
          </p>
        </div>

        <button
          onClick={() => onClaim(node.id, reward.xp)}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg active:translate-y-0.5 border-b-3 border-amber-700 flex items-center justify-center gap-2"
        >
          <span>Claim Reward & Continue</span>
          <Sparkles className="w-4 h-4 fill-slate-950" />
        </button>
      </div>
    </div>
  );
};
