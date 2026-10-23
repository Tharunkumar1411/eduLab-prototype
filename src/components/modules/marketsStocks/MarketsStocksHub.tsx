/**
 * Hub for Markets & Stocks. Owns per-course routing; defers persistence/XP to
 * the parent via `onCourseComplete(courseId, xp)`. Mirrors Module01Hub.
 */

import React, { useState } from 'react';
import {
  MS_COURSES,
  MarketsStocksCourseId,
} from '../../../data/marketsStocks.ts';
import { MarketsStocksLanding } from './MarketsStocksLanding.tsx';
import { MarketsStocksCompletion } from './MarketsStocksCompletion.tsx';
import { Course1Market } from './Course1Market.tsx';
import { Course2NseBse } from './Course2NseBse.tsx';
import { Course3MarketFlow } from './Course3MarketFlow.tsx';
import { Course4Stock } from './Course4Stock.tsx';
import { Course5PriceChange } from './Course5PriceChange.tsx';
import { Course6TradeFlow } from './Course6TradeFlow.tsx';
import { Course7OrderTypes } from './Course7OrderTypes.tsx';
import { Course8Etf } from './Course8Etf.tsx';

interface MarketsStocksHubProps {
  completedCourseIds: MarketsStocksCourseId[];
  earnedXp: number;
  onCourseComplete: (courseId: MarketsStocksCourseId, xpReward: number) => void;
  onBackToMain: () => void;
  onGoToPlayground: () => void;
  /** When set, skip the landing and open this course directly. */
  initialCourseId?: MarketsStocksCourseId;
}

type HubView = 'landing' | MarketsStocksCourseId | 'completion';

export const MarketsStocksHub: React.FC<MarketsStocksHubProps> = ({
  completedCourseIds,
  earnedXp,
  onCourseComplete,
  onBackToMain,
  onGoToPlayground,
  initialCourseId,
}) => {
  const [view, setView] = useState<HubView>(initialCourseId ?? 'landing');

  const handleCompleted = (courseId: MarketsStocksCourseId) => {
    const course = MS_COURSES.find((c) => c.id === courseId);
    if (!course) return;
    onCourseComplete(courseId, course.xpReward);

    const next = Array.from(new Set([...completedCourseIds, courseId]));
    if (next.length >= MS_COURSES.length) setView('completion');
    else setView('landing');
  };

  const backToLanding = () => setView('landing');

  if (view === 'landing') {
    return (
      <MarketsStocksLanding
        completedCourseIds={completedCourseIds}
        earnedXp={earnedXp}
        onStartCourse={(id) => setView(id)}
        onBack={onBackToMain}
      />
    );
  }
  if (view === 'completion') {
    return (
      <MarketsStocksCompletion
        earnedXp={earnedXp}
        onReturnToModule={backToLanding}
        onGoToPlayground={onGoToPlayground}
      />
    );
  }
  switch (view) {
    case 'ms_c1_market':
      return <Course1Market onBack={backToLanding} onComplete={handleCompleted} />;
    case 'ms_c2_nse_bse':
      return <Course2NseBse onBack={backToLanding} onComplete={handleCompleted} />;
    case 'ms_c3_market_flow':
      return <Course3MarketFlow onBack={backToLanding} onComplete={handleCompleted} />;
    case 'ms_c4_stock':
      return <Course4Stock onBack={backToLanding} onComplete={handleCompleted} />;
    case 'ms_c5_price_change':
      return <Course5PriceChange onBack={backToLanding} onComplete={handleCompleted} />;
    case 'ms_c6_trade_flow':
      return <Course6TradeFlow onBack={backToLanding} onComplete={handleCompleted} />;
    case 'ms_c7_order_types':
      return <Course7OrderTypes onBack={backToLanding} onComplete={handleCompleted} />;
    case 'ms_c8_etf':
      return <Course8Etf onBack={backToLanding} onComplete={handleCompleted} />;
    default:
      return null;
  }
};

export default MarketsStocksHub;
