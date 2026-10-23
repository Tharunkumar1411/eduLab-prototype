/**
 * Course 7 — Market Orders vs Limit Orders (interactive simulator).
 *
 * The learner picks side + order type + price + quantity against a live-looking
 * order book, then the deterministic matching engine shows what happened.
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, BookOpen, Minus, Plus, RefreshCw, Zap } from 'lucide-react';
import { SceneScaffold } from './shared/SceneScaffold.tsx';
import { Callout, PrimaryAction, SimulatedBadge } from './shared/Controls.tsx';
import { useCharacterController } from '../../character/useCharacterController.ts';
import { MS_COURSE_BY_ID, MarketsStocksCourseId, SUNNY_BAKERY } from '../../../data/marketsStocks.ts';
import {
  DEFAULT_BOOK,
  DEFAULT_LAST_TRADED_PRICE,
  OrderBookSnapshot,
  OrderResult,
  Side,
  bestAsk,
  bestBid,
  formatPrice,
  simulateOrder,
  spread,
} from '../../../data/marketsStocksCalculations.ts';

type Scene = 'book' | 'try' | 'summary' | 'complete';
const SCENES: Scene[] = ['book', 'try', 'summary', 'complete'];
const COURSE = MS_COURSE_BY_ID.ms_c7_order_types;

interface Props {
  onBack: () => void;
  onComplete: (id: MarketsStocksCourseId) => void;
}

export const Course7OrderTypes: React.FC<Props> = ({ onBack, onComplete }) => {
  const [scene, setScene] = useState<Scene>('book');
  const [book, setBook] = useState<OrderBookSnapshot>(() => cloneBook(DEFAULT_BOOK));
  const [side, setSide] = useState<Side>('buy');
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const [limitPrice, setLimitPrice] = useState<string>('99.80');
  const [quantity, setQuantity] = useState<number>(20);
  const [lastResult, setLastResult] = useState<OrderResult | null>(null);
  const [tries, setTries] = useState<number>(0);
  const awardedRef = useRef(false);

  const character = useCharacterController({
    initialState: 'thinking',
    initialMessage: `Simulated order book for ${SUNNY_BAKERY.name}.`,
    initialSubMessage: 'Fictional prices. No real orders are placed.',
  });

  useEffect(() => {
    switch (scene) {
      case 'book':
        character.speak('Read the book. Bids on the left, asks on the right, spread in between.');
        character.react('talking', { durationMs: 2000 });
        break;
      case 'try':
        character.speak('Place at least two orders — try both market and limit.');
        character.react('thinking', { durationMs: 2000 });
        break;
      case 'summary':
        character.speak('Price priority vs execution priority. That’s the trade-off.');
        character.react('talking', { durationMs: 2000 });
        break;
      case 'complete':
        character.speak('Neither order type is universally better. Pick what matches the goal.');
        character.react('celebrating', { durationMs: 2400 });
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene]);

  useEffect(() => {
    if (scene === 'complete' && !awardedRef.current) {
      awardedRef.current = true;
      onComplete('ms_c7_order_types');
    }
  }, [scene, onComplete]);

  const bb = bestBid(book);
  const ba = bestAsk(book);
  const sp = spread(book);

  const sceneIndex = SCENES.indexOf(scene);
  const next = () => {
    const n = SCENES[sceneIndex + 1];
    if (n) setScene(n);
  };

  const parseLimit = (): number | undefined => {
    const n = Number(limitPrice);
    if (!Number.isFinite(n)) return undefined;
    return n;
  };

  const submit = () => {
    const result = simulateOrder(book, {
      side,
      type: orderType,
      quantity,
      limitPrice: orderType === 'limit' ? parseLimit() : undefined,
    });
    setLastResult(result);
    setBook(result.bookAfter);
    if (result.status !== 'rejected') setTries((t) => t + 1);
  };

  const resetBook = () => {
    setBook(cloneBook(DEFAULT_BOOK));
    setLastResult(null);
    setTries(0);
  };

  // Suggest a sensible default when switching sides/types
  useEffect(() => {
    if (orderType === 'limit') {
      if (side === 'buy' && bb != null) setLimitPrice(bb.toFixed(2));
      if (side === 'sell' && ba != null) setLimitPrice(ba.toFixed(2));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [side, orderType]);

  const body = (() => {
    switch (scene) {
      case 'book':
        return (
          <div className="space-y-3">
            <SimulatedBadge />
            <OrderBookTable book={book} lastTraded={DEFAULT_LAST_TRADED_PRICE} />
            <div className="grid grid-cols-3 gap-2 text-xs">
              <StatPill label="Best bid" value={bb != null ? formatPrice(bb) : '—'} color="emerald" />
              <StatPill label="Best ask" value={ba != null ? formatPrice(ba) : '—'} color="rose" />
              <StatPill label="Spread" value={sp != null ? formatPrice(sp) : '—'} color="sky" />
            </div>
            <Callout>
              The <strong>spread</strong> is the gap between the best bid and the best ask. A tight spread usually
              signals a liquid stock; a wide one means more friction to trade.
            </Callout>
          </div>
        );

      case 'try':
        return (
          <div className="space-y-3">
            <OrderBookTable book={book} lastTraded={DEFAULT_LAST_TRADED_PRICE} compact />

            {/* Order ticket */}
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-4 space-y-3">
              <div className="flex items-center gap-1 p-1 bg-slate-950/70 border border-slate-800 rounded-xl">
                {(['buy', 'sell'] as Side[]).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSide(s)}
                    aria-pressed={side === s}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-black cursor-pointer ${
                      side === s
                        ? s === 'buy'
                          ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-500/40'
                          : 'bg-rose-500/20 text-rose-200 border border-rose-500/40'
                        : 'text-slate-400'
                    }`}
                  >
                    {s.toUpperCase()}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2">
                {(['market', 'limit'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setOrderType(t)}
                    aria-pressed={orderType === t}
                    className={`p-2 rounded-xl border text-xs font-bold cursor-pointer ${
                      orderType === t
                        ? 'bg-sky-500/15 border-sky-400 text-sky-200'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {t === 'market' ? 'Market order' : 'Limit order'}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block mb-1">
                    Quantity
                  </label>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-8 h-8 rounded-lg bg-slate-800 text-slate-100 flex items-center justify-center cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <input
                      type="number"
                      min={1}
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Math.floor(Number(e.target.value) || 0)))}
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-sm font-bold font-mono-num text-slate-100 text-center"
                    />
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-8 h-8 rounded-lg bg-slate-800 text-slate-100 flex items-center justify-center cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block mb-1">
                    Limit price {orderType === 'market' && <span className="text-slate-600">(n/a for market)</span>}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min={0}
                    value={limitPrice}
                    disabled={orderType === 'market'}
                    onChange={(e) => setLimitPrice(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-sm font-bold font-mono-num text-slate-100 disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 pt-1">
                <button
                  type="button"
                  onClick={resetBook}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs font-bold text-slate-300 hover:text-slate-100 cursor-pointer"
                  title="Restore the starting order book"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Reset book
                </button>
                <PrimaryAction onClick={submit} trailingIcon={false}>
                  <Zap className="inline w-3.5 h-3.5 mr-1" /> Submit simulated order
                </PrimaryAction>
              </div>
            </div>

            {lastResult && <OrderResultCard result={lastResult} />}
            {tries < 2 && (
              <p className="text-[11px] text-slate-500">
                Try at least two different orders (market + limit) to see both outcomes.
              </p>
            )}
          </div>
        );

      case 'summary':
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="rounded-2xl bg-sky-500/10 border border-sky-500/40 p-4">
                <h4 className="text-sm font-black text-sky-200">Market order</h4>
                <p className="text-xs text-sky-100/90 mt-1">
                  Prioritises <strong>execution</strong>. Will walk through book levels until filled or liquidity runs out — the exact price is not guaranteed.
                </p>
              </div>
              <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/40 p-4">
                <h4 className="text-sm font-black text-emerald-200">Limit order</h4>
                <p className="text-xs text-emerald-100/90 mt-1">
                  Prioritises <strong>price</strong>. Will only trade at your price or better. May stay unfilled if no one meets your price.
                </p>
              </div>
            </div>
            <Callout tone="warning">
              Neither is universally better. A market order risks slippage; a limit order risks missing the trade entirely.
            </Callout>
          </div>
        );

      case 'complete':
        return (
          <div className="rounded-3xl bg-gradient-to-br from-sky-950/40 via-slate-900 to-slate-950 border border-sky-500/30 p-5 sm:p-6 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-500/15 border border-sky-500/30 text-sky-300 text-[11px] font-bold">
              Course complete
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-100">{COURSE.mainConcept}</h3>
          </div>
        );
    }
  })();

  const canAdvance = (() => {
    switch (scene) {
      case 'book':
        return true;
      case 'try':
        return tries >= 2 || lastResult !== null;
      case 'summary':
        return true;
      case 'complete':
        return true;
    }
  })();

  const footer =
    scene === 'complete' ? (
      <PrimaryAction onClick={onBack} trailingIcon={false}>
        Back to module
      </PrimaryAction>
    ) : (
      <PrimaryAction onClick={next} disabled={!canAdvance}>
        {sceneIndex === SCENES.length - 2 ? 'Finish course' : 'Continue'}
      </PrimaryAction>
    );

  const headlines: Record<Scene, { eyebrow: string; headline: string; subheadline?: string }> = {
    book: {
      eyebrow: 'Scene 1 · Reading the book',
      headline: 'Bids, asks and the spread.',
      subheadline: `Fictional book for ${SUNNY_BAKERY.name} (${SUNNY_BAKERY.symbol}).`,
    },
    try: {
      eyebrow: 'Scene 2 · Place a simulated order',
      headline: 'Pick side, type, quantity and (for limit) price.',
      subheadline: 'The matching engine runs on your clicks only — nothing goes to a real broker.',
    },
    summary: { eyebrow: 'Scene 3 · The trade-off', headline: 'Execution vs price.' },
    complete: { eyebrow: 'Takeaway', headline: COURSE.mainConcept },
  };
  const h = headlines[scene];

  return (
    <SceneScaffold
      courseNumber={COURSE.number}
      courseTitle={COURSE.title}
      sectionLetter="C"
      sceneIndex={sceneIndex}
      totalScenes={SCENES.length}
      eyebrow={h.eyebrow}
      headline={h.headline}
      subheadline={h.subheadline}
      mentorState={character.state}
      mentorMessage={character.message}
      mentorSubMessage={character.subMessage}
      onBack={onBack}
      footer={footer}
    >
      {body}
    </SceneScaffold>
  );
};

// --- Order book visual ------------------------------------------------------

const OrderBookTable: React.FC<{
  book: OrderBookSnapshot;
  lastTraded?: number;
  compact?: boolean;
}> = ({ book, lastTraded, compact }) => {
  const totalBidQty = book.bids.reduce((a, l) => a + l.quantity, 0);
  const totalAskQty = book.asks.reduce((a, l) => a + l.quantity, 0);
  const rowHeight = compact ? 'py-1' : 'py-1.5';
  return (
    <div className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden">
      <div className="px-3 py-2 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-sky-300" />
          <span className="text-[11px] uppercase tracking-wider font-bold text-slate-200">
            Order book
          </span>
        </div>
        {lastTraded != null && (
          <span className="text-[11px] text-slate-400 font-mono-num">
            Last traded: <span className="text-slate-200">{formatPrice(lastTraded)}</span>
          </span>
        )}
      </div>
      <div className="grid grid-cols-2 text-xs">
        <div className="border-r border-slate-800">
          <div className="px-3 py-1.5 bg-emerald-500/10 text-emerald-200 text-[10px] font-black uppercase tracking-wider flex justify-between">
            <span>Bids (buy)</span>
            <span className="font-mono-num">Σ {totalBidQty}</span>
          </div>
          {book.bids.length === 0 && (
            <div className="px-3 py-2 text-[11px] text-slate-500">No resting bids.</div>
          )}
          {book.bids.map((l, i) => (
            <div
              key={`b-${i}`}
              className={`px-3 ${rowHeight} flex items-center justify-between font-mono-num ${
                i === 0 ? 'text-emerald-300 font-black' : 'text-slate-300'
              }`}
            >
              <span>{l.quantity}</span>
              <span>{formatPrice(l.price)}</span>
            </div>
          ))}
        </div>
        <div>
          <div className="px-3 py-1.5 bg-rose-500/10 text-rose-200 text-[10px] font-black uppercase tracking-wider flex justify-between">
            <span>Asks (sell)</span>
            <span className="font-mono-num">Σ {totalAskQty}</span>
          </div>
          {book.asks.length === 0 && (
            <div className="px-3 py-2 text-[11px] text-slate-500">No resting asks.</div>
          )}
          {book.asks.map((l, i) => (
            <div
              key={`a-${i}`}
              className={`px-3 ${rowHeight} flex items-center justify-between font-mono-num ${
                i === 0 ? 'text-rose-300 font-black' : 'text-slate-300'
              }`}
            >
              <span>{formatPrice(l.price)}</span>
              <span>{l.quantity}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StatPill: React.FC<{ label: string; value: string; color: 'emerald' | 'rose' | 'sky' }> = ({
  label,
  value,
  color,
}) => {
  const toneClass = {
    emerald: 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300',
    rose: 'bg-rose-500/10 border-rose-500/40 text-rose-300',
    sky: 'bg-sky-500/10 border-sky-500/40 text-sky-300',
  }[color];
  return (
    <div className={`rounded-xl border p-2 ${toneClass}`}>
      <span className="text-[10px] uppercase tracking-wider font-bold opacity-80 block">{label}</span>
      <span className="text-sm font-black font-mono-num">{value}</span>
    </div>
  );
};

const OrderResultCard: React.FC<{ result: OrderResult }> = ({ result }) => {
  const toneClass =
    result.status === 'filled'
      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-200'
      : result.status === 'partial'
        ? 'bg-amber-500/10 border-amber-500/40 text-amber-200'
        : result.status === 'pending'
          ? 'bg-sky-500/10 border-sky-500/40 text-sky-200'
          : 'bg-rose-500/10 border-rose-500/40 text-rose-200';
  const Icon = result.status === 'filled' ? ArrowUpRight : result.status === 'pending' ? BookOpen : ArrowDownRight;
  return (
    <div className={`rounded-2xl border p-4 space-y-2 ${toneClass}`}>
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4" />
        <span className="text-xs font-bold uppercase tracking-wider">
          {result.status === 'filled'
            ? 'Filled'
            : result.status === 'partial'
              ? 'Partial fill'
              : result.status === 'pending'
                ? 'Resting on the book'
                : 'Rejected'}
        </span>
      </div>
      <p className="text-xs leading-relaxed">{result.reason}</p>
      {result.fills.length > 0 && (
        <div className="text-[11px] font-mono-num grid grid-cols-2 gap-1">
          {result.fills.map((f, i) => (
            <span key={i} className="opacity-90">
              {f.quantity} @ {formatPrice(f.price)}
            </span>
          ))}
          {result.averagePrice != null && (
            <span className="col-span-2 pt-1 border-t border-current/20">
              Average fill price: <strong>{formatPrice(result.averagePrice)}</strong>
            </span>
          )}
        </div>
      )}
      {result.resting && (
        <div className="text-[11px] font-mono-num">
          Resting: {result.resting.quantity} @ {formatPrice(result.resting.price)}
        </div>
      )}
    </div>
  );
};

function cloneBook(b: OrderBookSnapshot): OrderBookSnapshot {
  return {
    bids: b.bids.map((l) => ({ ...l })),
    asks: b.asks.map((l) => ({ ...l })),
  };
}

export default Course7OrderTypes;
