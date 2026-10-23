/**
 * Tiny reusable controls for the Markets & Stocks courses.
 * Deliberately small — most composition happens inline inside each course.
 */

import React from 'react';
import { ArrowRight, Check } from 'lucide-react';

export const PrimaryAction: React.FC<{
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  variant?: 'primary' | 'subtle';
  trailingIcon?: boolean;
}> = ({ onClick, children, disabled, variant = 'primary', trailingIcon = true }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={
      variant === 'primary'
        ? 'inline-flex items-center gap-1.5 px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all cursor-pointer active:scale-95 shadow-lg bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-teal-500/30 disabled:opacity-50 disabled:cursor-not-allowed'
        : 'inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-bold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
    }
  >
    <span>{children}</span>
    {trailingIcon && <ArrowRight className="w-3.5 h-3.5" />}
  </button>
);

export interface OptionDef<T extends string> {
  id: T;
  title: string;
  description?: string;
}

export function OptionButton<T extends string>({
  option,
  selected,
  disabled,
  onSelect,
  indicator,
}: {
  option: OptionDef<T>;
  selected: boolean;
  disabled?: boolean;
  onSelect: (id: T) => void;
  indicator?: 'correct' | 'incorrect' | 'neutral';
}) {
  let classes = 'bg-slate-900 border-slate-800 hover:border-slate-700';
  if (selected) classes = 'bg-sky-500/10 border-sky-400 ring-2 ring-sky-400/20';
  if (indicator === 'correct') classes = 'bg-emerald-500/10 border-emerald-500/50';
  if (indicator === 'incorrect') classes = 'bg-rose-500/10 border-rose-500/40';

  return (
    <button
      type="button"
      onClick={() => !disabled && onSelect(option.id)}
      disabled={disabled}
      aria-pressed={selected}
      className={`w-full text-left p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 ${classes} disabled:cursor-not-allowed`}
    >
      <span
        className={`w-5 h-5 shrink-0 mt-0.5 rounded-full border-2 flex items-center justify-center ${
          selected ? 'border-sky-400 bg-sky-400 text-slate-950' : 'border-slate-700 bg-transparent'
        }`}
      >
        {selected && <Check className="w-3 h-3 stroke-[3.5]" />}
      </span>
      <span className="flex-1 min-w-0">
        <span className="block text-sm font-bold text-slate-100 leading-snug">{option.title}</span>
        {option.description && (
          <span className="block text-xs text-slate-400 leading-relaxed mt-0.5">
            {option.description}
          </span>
        )}
      </span>
    </button>
  );
}

export const Callout: React.FC<{
  tone?: 'info' | 'success' | 'warning';
  title?: string;
  children: React.ReactNode;
}> = ({ tone = 'info', title, children }) => {
  const toneClass =
    tone === 'success'
      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-200'
      : tone === 'warning'
        ? 'bg-amber-500/10 border-amber-500/40 text-amber-200'
        : 'bg-sky-500/10 border-sky-500/30 text-sky-200';
  return (
    <div className={`rounded-2xl border p-3 sm:p-4 text-xs leading-relaxed ${toneClass}`}>
      {title && <div className="text-[11px] font-bold uppercase tracking-wider mb-1">{title}</div>}
      <div>{children}</div>
    </div>
  );
};

export const SimulatedBadge: React.FC = () => (
  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
    Simulated · fictional data
  </span>
);
