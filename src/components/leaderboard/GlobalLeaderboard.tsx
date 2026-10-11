import React, { useState, useMemo } from 'react';
import {
  Trophy,
  Flame,
  Award,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  Globe,
  Filter,
  Search,
  CheckCircle2,
  X,
  ChevronRight,
  Medal,
  Users,
} from 'lucide-react';
import {
  LeaderboardLearner,
  LEADERBOARD_LEAGUES,
  INITIAL_TOP_LEARNERS,
} from '../../data/leaderboardData.ts';
import { AppLogo } from '../common/AppLogo.tsx';

interface LeaderboardProps {
  userXp: number;
  userLevel: number;
  streakDays: number;
  completedNodeIdsCount: number;
  completedCaseIdsCount: number;
  onClose?: () => void;
  onGoToLearning?: () => void;
}

export const GlobalLeaderboard: React.FC<LeaderboardProps> = ({
  userXp,
  userLevel,
  streakDays,
  completedNodeIdsCount,
  completedCaseIdsCount,
  onClose,
  onGoToLearning,
}) => {
  const [timeframe, setTimeframe] = useState<'all-time' | 'weekly'>('all-time');
  const [selectedLeague, setSelectedLeague] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Determine current user's league based on userXp
  const currentUserLeague = useMemo(() => {
    if (userXp >= 3000) return 'Titan';
    if (userXp >= 2000) return 'Diamond';
    if (userXp >= 1200) return 'Emerald';
    if (userXp >= 500) return 'Gold';
    return 'Silver';
  }, [userXp]);

  // Merge the real logged-in learner seamlessly into the list
  const fullLeaderboardList = useMemo(() => {
    const currentUser: Omit<LeaderboardLearner, 'rank'> = {
      id: 'current_user',
      name: 'You (Learner)',
      handle: '@you',
      avatar: '🎓',
      avatarBg: 'bg-teal-500/20 border-teal-400 text-teal-300 ring-2 ring-teal-400/30',
      country: 'India',
      countryFlag: '🇮🇳',
      xp: userXp,
      level: userLevel,
      streakDays: streakDays,
      badge: userXp > 800 ? 'Market Explorer' : userXp > 200 ? 'Order Matcher' : 'Novice Trader',
      league: currentUserLeague as LeaderboardLearner['league'],
      weeklyXp: Math.min(userXp, 380),
      modulesCompleted: Math.max(1, completedNodeIdsCount),
      isCurrentUser: true,
    };

    const combined = [...INITIAL_TOP_LEARNERS, currentUser];

    // Sort by selected metric
    if (timeframe === 'weekly') {
      combined.sort((a, b) => b.weeklyXp - a.weeklyXp);
    } else {
      combined.sort((a, b) => b.xp - a.xp);
    }

    // Assign 1-indexed ranks
    return combined.map((learner, idx) => ({
      ...learner,
      rank: idx + 1,
    }));
  }, [userXp, userLevel, streakDays, completedNodeIdsCount, currentUserLeague, timeframe]);

  // Current user's rank
  const currentUserRankInfo = useMemo(() => {
    return fullLeaderboardList.find((l) => l.isCurrentUser) || null;
  }, [fullLeaderboardList]);

  // Filtered learners
  const filteredLearners = useMemo(() => {
    return fullLeaderboardList.filter((l) => {
      if (selectedLeague !== 'all' && l.league !== selectedLeague) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = l.name.toLowerCase().includes(q);
        const matchesHandle = l.handle.toLowerCase().includes(q);
        const matchesCountry = l.country.toLowerCase().includes(q);
        if (!matchesName && !matchesHandle && !matchesCountry) return false;
      }
      return true;
    });
  }, [fullLeaderboardList, selectedLeague, searchQuery]);

  // Top 3 for podium
  const topThree = useMemo(() => {
    return fullLeaderboardList.slice(0, 3);
  }, [fullLeaderboardList]);

  const currentLeagueObj = LEADERBOARD_LEAGUES.find((l) => l.name === currentUserLeague);
  const nextLeagueIndex = LEADERBOARD_LEAGUES.findIndex((l) => l.name === currentUserLeague) - 1;
  const nextLeagueObj = nextLeagueIndex >= 0 ? LEADERBOARD_LEAGUES[nextLeagueIndex] : null;
  const xpToNextLeague = nextLeagueObj ? Math.max(0, nextLeagueObj.minXp - userXp) : 0;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Top Header Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-8 shadow-xl">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-teal-400">
                Live Worldwide Standings
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-xs text-slate-400 flex items-center gap-1 font-mono-num">
                <Globe className="w-3.5 h-3.5 text-teal-400/80" />
                Updated live
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight flex items-center gap-3">
              Global Learner Leaderboard
              <Trophy className="w-7 h-7 text-amber-400 drop-shadow-md hidden sm:inline-block" />
            </h1>
            <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
              Compete with market investigators, stock analysts, and financial beginners worldwide. Gain XP by mastering interactive lessons, trading simulations, and forensic investigations.
            </p>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-5 right-5 sm:static p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer border border-slate-700/60"
              aria-label="Close Leaderboard"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Current User Standings Banner */}
        {currentUserRankInfo && (
          <div className="mt-6 pt-5 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
              <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider block">
                Your Rank
              </span>
              <span className="text-xl font-bold text-teal-300 flex items-center gap-1.5 font-mono-num mt-0.5">
                <Medal className="w-4 h-4 text-teal-400" />
                #{currentUserRankInfo.rank} of {fullLeaderboardList.length}
              </span>
            </div>

            <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
              <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider block">
                Your League
              </span>
              <span className={`text-xl font-bold ${currentLeagueObj?.color || 'text-slate-200'} flex items-center gap-1.5 mt-0.5`}>
                <span>{currentLeagueObj?.icon}</span>
                {currentUserLeague}
              </span>
            </div>

            <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
              <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider block">
                Your Total XP
              </span>
              <span className="text-xl font-bold text-amber-300 font-mono-num mt-0.5 block">
                {userXp.toLocaleString()} XP
              </span>
            </div>

            <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
              <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider block">
                Next Tier Progress
              </span>
              <span className="text-xs text-slate-300 mt-1 block">
                {nextLeagueObj ? (
                  <span className="text-slate-400">
                    <strong className="text-teal-300 font-mono-num">{xpToNextLeague} XP</strong> to {nextLeagueObj.name}
                  </span>
                ) : (
                  <span className="text-amber-400 font-semibold">Maximum League reached!</span>
                )}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Podium for Top 3 Learners */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
        {/* Rank 2 (Silver) */}
        {topThree[1] && (
          <div className="order-2 sm:order-1 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex flex-col items-center text-center relative overflow-hidden group hover:border-slate-700 transition-all">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-extrabold text-sm flex items-center justify-center font-mono-num mb-2">
              #2
            </div>
            <div className="relative mb-2">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl border ${topThree[1].avatarBg} shadow-lg`}>
                {topThree[1].avatar}
              </div>
              <span className="absolute -bottom-1 -right-1 text-sm">{topThree[1].countryFlag}</span>
            </div>
            <span className="font-bold text-slate-100 text-sm truncate max-w-[180px]">
              {topThree[1].name}
            </span>
            <span className="text-xs text-slate-500 font-mono-num">{topThree[1].handle}</span>
            <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-slate-300 font-mono-num bg-slate-950/80 px-3 py-1 rounded-xl border border-slate-800">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              {topThree[1].xp.toLocaleString()} XP
            </div>
            <span className="text-[11px] text-slate-400 mt-2">
              {topThree[1].badge} · Lvl {topThree[1].level}
            </span>
          </div>
        )}

        {/* Rank 1 (Gold - Center & Elevated) */}
        {topThree[0] && (
          <div className="order-1 sm:order-2 bg-gradient-to-b from-amber-500/10 via-slate-900 to-slate-900 border-2 border-amber-500/40 rounded-2xl p-6 flex flex-col items-center text-center relative overflow-hidden shadow-xl shadow-amber-950/20 group hover:border-amber-400 transition-all sm:-translate-y-2">
            <div className="absolute top-2 right-2 text-amber-400/20">
              <Trophy className="w-12 h-12" />
            </div>
            <div className="w-9 h-9 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-300 font-extrabold text-base flex items-center justify-center font-mono-num mb-2 shadow-xs">
              👑 #1
            </div>
            <div className="relative mb-2">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl border ${topThree[0].avatarBg} shadow-xl ring-2 ring-amber-400/40`}>
                {topThree[0].avatar}
              </div>
              <span className="absolute -bottom-1 -right-1 text-base">{topThree[0].countryFlag}</span>
            </div>
            <span className="font-extrabold text-slate-100 text-base truncate max-w-[200px]">
              {topThree[0].name}
            </span>
            <span className="text-xs text-slate-400 font-mono-num">{topThree[0].handle}</span>
            <div className="mt-3 flex items-center gap-1.5 text-sm font-extrabold text-amber-300 font-mono-num bg-amber-950/40 px-3.5 py-1.5 rounded-xl border border-amber-500/30 shadow-xs">
              <Sparkles className="w-4 h-4 text-amber-400" />
              {topThree[0].xp.toLocaleString()} XP
            </div>
            <span className="text-[11px] text-amber-300/80 font-medium mt-2">
              {topThree[0].badge} · Lvl {topThree[0].level} · {topThree[0].streakDays}d Streak
            </span>
          </div>
        )}

        {/* Rank 3 (Bronze) */}
        {topThree[2] && (
          <div className="order-3 sm:order-3 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex flex-col items-center text-center relative overflow-hidden group hover:border-slate-700 transition-all">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 text-amber-600 font-extrabold text-sm flex items-center justify-center font-mono-num mb-2">
              #3
            </div>
            <div className="relative mb-2">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl border ${topThree[2].avatarBg} shadow-lg`}>
                {topThree[2].avatar}
              </div>
              <span className="absolute -bottom-1 -right-1 text-sm">{topThree[2].countryFlag}</span>
            </div>
            <span className="font-bold text-slate-100 text-sm truncate max-w-[180px]">
              {topThree[2].name}
            </span>
            <span className="text-xs text-slate-500 font-mono-num">{topThree[2].handle}</span>
            <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-slate-300 font-mono-num bg-slate-950/80 px-3 py-1 rounded-xl border border-slate-800">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              {topThree[2].xp.toLocaleString()} XP
            </div>
            <span className="text-[11px] text-slate-400 mt-2">
              {topThree[2].badge} · Lvl {topThree[2].level}
            </span>
          </div>
        )}
      </div>

      {/* Filter and Switcher Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-900/80 border border-slate-800 p-3 sm:p-4 rounded-xl">
        {/* Timeframe switch */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800/80">
          <button
            onClick={() => setTimeframe('all-time')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              timeframe === 'all-time'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All-Time XP
          </button>
          <button
            onClick={() => setTimeframe('weekly')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              timeframe === 'weekly'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            This Week
          </button>
        </div>

        {/* League and Search */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          {/* League dropdown filter */}
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={selectedLeague}
              onChange={(e) => setSelectedLeague(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-hidden focus:border-teal-500 cursor-pointer"
            >
              <option value="all">All Leagues</option>
              {LEADERBOARD_LEAGUES.map((l) => (
                <option key={l.name} value={l.name}>
                  {l.icon} {l.name} League
                </option>
              ))}
            </select>
          </div>

          {/* Search bar */}
          <div className="relative flex-1 sm:w-48">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search learner..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-hidden focus:border-teal-500"
            />
          </div>
        </div>
      </div>

      {/* Main Leaderboard Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4 w-14 text-center">Rank</th>
                <th className="py-3.5 px-4">Learner</th>
                <th className="py-3.5 px-4 hidden sm:table-cell">League</th>
                <th className="py-3.5 px-4 hidden md:table-cell">Streak</th>
                <th className="py-3.5 px-4 hidden lg:table-cell">Modules</th>
                <th className="py-3.5 px-4 text-right">
                  {timeframe === 'weekly' ? 'Weekly XP' : 'Total XP'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {filteredLearners.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    No learners found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredLearners.map((learner) => {
                  const isTop3 = learner.rank <= 3;
                  const isCurrentUser = learner.isCurrentUser;

                  return (
                    <tr
                      key={learner.id}
                      className={`transition-colors ${
                        isCurrentUser
                          ? 'bg-teal-950/40 hover:bg-teal-950/60 border-l-4 border-l-teal-400'
                          : 'hover:bg-slate-850/50'
                      }`}
                    >
                      {/* Rank Column */}
                      <td className="py-3.5 px-4 text-center font-mono-num font-bold">
                        {learner.rank === 1 ? (
                          <span className="text-amber-400 flex items-center justify-center gap-1">
                            🥇 1
                          </span>
                        ) : learner.rank === 2 ? (
                          <span className="text-slate-300 flex items-center justify-center gap-1">
                            🥈 2
                          </span>
                        ) : learner.rank === 3 ? (
                          <span className="text-amber-600 flex items-center justify-center gap-1">
                            🥉 3
                          </span>
                        ) : (
                          <span className={isCurrentUser ? 'text-teal-400 font-extrabold' : 'text-slate-400'}>
                            #{learner.rank}
                          </span>
                        )}
                      </td>

                      {/* Learner Name & Profile */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center text-base border ${learner.avatarBg} shrink-0`}
                          >
                            {learner.avatar}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span
                                className={`font-bold text-sm truncate ${
                                  isCurrentUser ? 'text-teal-300' : 'text-slate-100'
                                }`}
                              >
                                {learner.name}
                              </span>
                              {isCurrentUser && (
                                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-sm bg-teal-500/20 text-teal-300 border border-teal-500/40">
                                  You
                                </span>
                              )}
                              <span className="text-xs" title={learner.country}>
                                {learner.countryFlag}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-400 flex items-center gap-2">
                              <span>{learner.handle}</span>
                              <span>·</span>
                              <span className="text-slate-500">Lvl {learner.level}</span>
                              <span>·</span>
                              <span className="text-slate-400 truncate max-w-[120px] hidden sm:inline">
                                {learner.badge}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* League */}
                      <td className="py-3.5 px-4 hidden sm:table-cell">
                        <span
                          className={`font-semibold inline-flex items-center gap-1 ${
                            learner.league === 'Titan'
                              ? 'text-amber-400'
                              : learner.league === 'Diamond'
                              ? 'text-cyan-300'
                              : learner.league === 'Emerald'
                              ? 'text-emerald-400'
                              : learner.league === 'Gold'
                              ? 'text-yellow-400'
                              : 'text-slate-400'
                          }`}
                        >
                          {learner.league === 'Titan' && '👑'}
                          {learner.league === 'Diamond' && '💎'}
                          {learner.league === 'Emerald' && '⚡'}
                          {learner.league === 'Gold' && '🏆'}
                          {learner.league === 'Silver' && '🌱'}
                          {learner.league}
                        </span>
                      </td>

                      {/* Streak */}
                      <td className="py-3.5 px-4 hidden md:table-cell font-mono-num text-slate-300">
                        <span className="inline-flex items-center gap-1 text-amber-400 font-semibold">
                          <Flame className="w-3.5 h-3.5 fill-amber-500/20" />
                          {learner.streakDays}d
                        </span>
                      </td>

                      {/* Modules Completed */}
                      <td className="py-3.5 px-4 hidden lg:table-cell font-mono-num text-slate-400">
                        {learner.modulesCompleted} completed
                      </td>

                      {/* XP Score */}
                      <td className="py-3.5 px-4 text-right font-mono-num">
                        <span
                          className={`text-sm font-extrabold ${
                            isCurrentUser
                              ? 'text-teal-300'
                              : isTop3
                              ? 'text-amber-400'
                              : 'text-slate-100'
                          }`}
                        >
                          {(timeframe === 'weekly' ? learner.weeklyXp : learner.xp).toLocaleString()}
                        </span>
                        <span className="text-[11px] text-slate-400 ml-1">XP</span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* League Tiers Breakdown */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-200">Tier Advancement Tiers</h3>
            <p className="text-xs text-slate-400">
              Climb leagues as you acquire XP through modules, trading simulators, and case files.
            </p>
          </div>
          <Users className="w-5 h-5 text-slate-500" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
          {LEADERBOARD_LEAGUES.map((tier) => {
            const isUserTier = currentUserLeague === tier.name;
            return (
              <div
                key={tier.name}
                className={`p-3 rounded-xl border transition-all ${
                  isUserTier
                    ? 'bg-slate-900 border-teal-500 shadow-md ring-1 ring-teal-500/30'
                    : 'bg-slate-950/60 border-slate-800/80'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-lg">{tier.icon}</span>
                  {isUserTier && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-1 py-0.5 rounded-xs bg-teal-500/20 text-teal-300 border border-teal-500/40">
                      Your Tier
                    </span>
                  )}
                </div>
                <h4 className={`text-xs font-bold ${tier.color}`}>{tier.name}</h4>
                <span className="text-[11px] font-mono-num text-slate-400 block mt-0.5">
                  {tier.minXp === 0 ? '0+ XP' : `${tier.minXp.toLocaleString()}+ XP`}
                </span>
                <p className="text-[10px] text-slate-500 mt-1 line-clamp-2 leading-tight">
                  {tier.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action CTA */}
      {onGoToLearning && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-teal-950/40 via-slate-900 to-slate-900 border border-teal-800/40 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <AppLogo size="sm" withGlow={false} />
            <div>
              <span className="text-xs font-bold text-slate-100 block">
                Want to climb the ranks?
              </span>
              <span className="text-xs text-slate-400">
                Complete Module 01 ("What Is a Market?") to earn your next +375 XP and badges.
              </span>
            </div>
          </div>
          <button
            onClick={onGoToLearning}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
          >
            <span>Start Module 01</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
