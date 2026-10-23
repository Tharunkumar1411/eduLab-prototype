/**
 * Deterministic calculations and simulators for FinCraft Module — Markets & Stocks.
 *
 * All functions are pure, side-effect-free and defend against bad input.
 * These are teaching sims — not connected to any real broker or market data.
 */

// ===========================================================================
// Ownership (Course 4)
// ===========================================================================

/** Ownership percentage of a company given shares held and total outstanding. */
export function calculateOwnershipPercent(sharesOwned: number, sharesOutstanding: number): number {
  const owned = Math.max(0, sanitize(sharesOwned));
  const total = Math.max(0, sanitize(sharesOutstanding));
  if (total <= 0) return 0;
  return Math.round((owned / total) * 1000) / 10; // 1-decimal percent
}

// ===========================================================================
// Order book (Course 7)
// ===========================================================================

export type Side = 'buy' | 'sell';
export type OrderType = 'market' | 'limit';

export interface OrderBookLevel {
  price: number;
  quantity: number;
}

export interface OrderBookSnapshot {
  bids: OrderBookLevel[]; // Buy side, descending price
  asks: OrderBookLevel[]; // Sell side, ascending price
}

export interface SubmittedOrder {
  side: Side;
  type: OrderType;
  quantity: number;
  limitPrice?: number;
}

export interface Fill {
  price: number;
  quantity: number;
}

export type OrderStatus = 'filled' | 'partial' | 'pending' | 'rejected';

export interface OrderResult {
  status: OrderStatus;
  requestedQty: number;
  filledQty: number;
  averagePrice: number | null;
  fills: Fill[];
  resting: { price: number; quantity: number } | null;
  reason: string;
  bookAfter: OrderBookSnapshot;
}

const EPSILON = 1e-6;

/**
 * Validate and simulate a single order against a (price-sorted) order book.
 *
 * Market orders walk the opposite side until the quantity is filled or the
 * side is empty. Limit orders cross against compatible levels (buy limit at
 * `P` crosses asks priced <= P; sell limit at `P` crosses bids priced >= P)
 * and the residual rests on its own side at `P`.
 *
 * The simulator does not place real trades.
 */
export function simulateOrder(book: OrderBookSnapshot, order: SubmittedOrder): OrderResult {
  const requested = Math.max(0, Math.floor(sanitize(order.quantity)));
  const result = (over: Partial<OrderResult>): OrderResult => ({
    status: 'rejected',
    requestedQty: requested,
    filledQty: 0,
    averagePrice: null,
    fills: [],
    resting: null,
    reason: '',
    bookAfter: clone(book),
    ...over,
  });

  if (requested <= 0) {
    return result({ status: 'rejected', reason: 'Quantity must be at least 1 share.' });
  }
  if (order.type === 'limit') {
    const p = sanitize(order.limitPrice);
    if (!(p > 0)) {
      return result({ status: 'rejected', reason: 'Limit price must be greater than 0.' });
    }
  }

  const nextBook = clone(book);
  const bookSide = order.side === 'buy' ? nextBook.asks : nextBook.bids;
  const limit = order.type === 'limit' ? sanitize(order.limitPrice) : null;

  const fills: Fill[] = [];
  let remaining = requested;

  for (let i = 0; i < bookSide.length && remaining > 0; i++) {
    const level = bookSide[i];
    if (level.quantity <= 0) continue;
    if (limit !== null) {
      const crossed = order.side === 'buy' ? level.price <= limit + EPSILON : level.price >= limit - EPSILON;
      if (!crossed) break; // Price-time priority — further levels won't cross either
    }
    const take = Math.min(remaining, level.quantity);
    fills.push({ price: level.price, quantity: take });
    level.quantity -= take;
    remaining -= take;
  }

  // Compact — drop fully-consumed levels in place
  for (let i = bookSide.length - 1; i >= 0; i--) {
    if (bookSide[i].quantity <= 0) bookSide.splice(i, 1);
  }

  const filledQty = fills.reduce((acc, f) => acc + f.quantity, 0);
  const notional = fills.reduce((acc, f) => acc + f.price * f.quantity, 0);
  const avgPrice = filledQty > 0 ? Math.round((notional / filledQty) * 100) / 100 : null;

  // Residual handling
  let resting: OrderResult['resting'] = null;
  let status: OrderStatus;
  let reason: string;

  if (order.type === 'market') {
    if (filledQty === 0) {
      status = 'rejected';
      reason = `No ${order.side === 'buy' ? 'sellers' : 'buyers'} are available in the book right now.`;
    } else if (filledQty < requested) {
      status = 'partial';
      reason = `Only ${filledQty} of ${requested} shares could be filled — the opposite side ran out of liquidity.`;
    } else {
      status = 'filled';
      reason = `Market ${order.side} filled across ${fills.length} price level${fills.length > 1 ? 's' : ''}.`;
    }
  } else {
    // limit
    const price = limit!;
    const residual = requested - filledQty;
    if (residual > 0) {
      // Rest on the originating side
      resting = { price, quantity: residual };
      const sameSide = order.side === 'buy' ? nextBook.bids : nextBook.asks;
      const existing = sameSide.find((l) => Math.abs(l.price - price) < EPSILON);
      if (existing) existing.quantity += residual;
      else sameSide.push({ price, quantity: residual });
      // Keep sort order
      nextBook.bids.sort((a, b) => b.price - a.price);
      nextBook.asks.sort((a, b) => a.price - b.price);

      if (filledQty === 0) {
        status = 'pending';
        reason = `No one is willing to ${order.side === 'buy' ? 'sell' : 'buy'} at ${formatPrice(price)} or better. Your order is resting on the ${order.side} side.`;
      } else {
        status = 'partial';
        reason = `Filled ${filledQty} of ${requested}. The remaining ${residual} rest on the book at ${formatPrice(price)}.`;
      }
    } else {
      status = 'filled';
      reason = `Limit ${order.side} fully filled at ${formatPrice(avgPrice ?? price)} or better.`;
    }
  }

  return {
    status,
    requestedQty: requested,
    filledQty,
    averagePrice: avgPrice,
    fills,
    resting,
    reason,
    bookAfter: nextBook,
  };
}

/** Default book used in the Course 7 simulator unless the learner edits it. */
export const DEFAULT_BOOK: OrderBookSnapshot = {
  bids: [
    { price: 99.8, quantity: 40 },
    { price: 99.7, quantity: 55 },
    { price: 99.5, quantity: 80 },
    { price: 99.2, quantity: 120 },
  ],
  asks: [
    { price: 100.0, quantity: 35 },
    { price: 100.1, quantity: 50 },
    { price: 100.3, quantity: 70 },
    { price: 100.6, quantity: 100 },
  ],
};

/** Last-traded price for the simulator's opening banner (illustrative only). */
export const DEFAULT_LAST_TRADED_PRICE = 99.9;

export function bestBid(book: OrderBookSnapshot): number | null {
  return book.bids.length > 0 ? book.bids[0].price : null;
}
export function bestAsk(book: OrderBookSnapshot): number | null {
  return book.asks.length > 0 ? book.asks[0].price : null;
}
export function spread(book: OrderBookSnapshot): number | null {
  const bid = bestBid(book);
  const ask = bestAsk(book);
  if (bid == null || ask == null) return null;
  return Math.round((ask - bid) * 100) / 100;
}

// ===========================================================================
// ETF basket (Course 8)
// ===========================================================================

export interface BasketHolding {
  symbol: string;
  weightPercent: number; // 0..100
  startPrice: number;
}

export interface ScenarioMove {
  symbol: string;
  movePercent: number; // -100..+inf, e.g. +15 or -20
}

/** Project a basket value from a set of per-symbol percentage moves. */
export function projectBasketValue(
  holdings: BasketHolding[],
  moves: ScenarioMove[],
  startValue: number,
): number {
  const start = Math.max(0, sanitize(startValue));
  if (holdings.length === 0 || start === 0) return 0;
  const moveByName = new Map(moves.map((m) => [m.symbol, sanitize(m.movePercent)]));
  const factor = holdings.reduce((acc, h) => {
    const w = Math.max(0, Math.min(100, sanitize(h.weightPercent))) / 100;
    const m = moveByName.get(h.symbol) ?? 0;
    return acc + w * (1 + m / 100);
  }, 0);
  return Math.round(start * factor * 100) / 100;
}

/** Project a single-holding portfolio value from its own percentage move. */
export function projectSingleValue(startValue: number, movePercent: number): number {
  const start = Math.max(0, sanitize(startValue));
  return Math.round(start * (1 + sanitize(movePercent) / 100) * 100) / 100;
}

// ===========================================================================
// Shared helpers
// ===========================================================================

function sanitize(v: number | undefined): number {
  if (typeof v !== 'number' || Number.isNaN(v) || !Number.isFinite(v)) return 0;
  return v;
}

function clone(book: OrderBookSnapshot): OrderBookSnapshot {
  return {
    bids: book.bids.map((l) => ({ ...l })),
    asks: book.asks.map((l) => ({ ...l })),
  };
}

export function formatPrice(v: number): string {
  const n = sanitize(v);
  return `₹${n.toFixed(2)}`;
}

/** Indian-grouping rupee formatter without decimals. */
export function formatRupeesInt(value: number): string {
  const n = Math.round(sanitize(value));
  const sign = n < 0 ? '-' : '';
  const abs = Math.abs(n);
  const s = abs.toString();
  if (s.length <= 3) return `${sign}₹${s}`;
  const last3 = s.slice(-3);
  const rest = s.slice(0, -3);
  const groups = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
  return `${sign}₹${groups},${last3}`;
}
