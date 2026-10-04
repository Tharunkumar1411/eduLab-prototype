import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.tsx';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  showLabel = false,
}) => {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-amber-400 transition-all duration-150 flex items-center gap-2 cursor-pointer shadow-xs ${className}`}
      title={isLight ? 'Switch to Dark Theme' : 'Switch to Light Theme'}
      aria-label={isLight ? 'Switch to Dark Theme' : 'Switch to Light Theme'}
    >
      {isLight ? (
        <Moon className="w-4 h-4 text-indigo-500 fill-indigo-500/20 transition-transform duration-200" />
      ) : (
        <Sun className="w-4 h-4 text-amber-400 fill-amber-400/20 transition-transform duration-200" />
      )}
      {showLabel && (
        <span className="text-xs font-semibold text-slate-200">
          {isLight ? 'Dark Theme' : 'Light Theme'}
        </span>
      )}
    </button>
  );
};
