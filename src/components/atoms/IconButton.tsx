import { type ReactNode } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface IconButtonProps {
  icon: ReactNode;
  onClick: () => void;
  ariaLabel: string;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export const IconButton = ({ 
  icon, 
  onClick, 
  ariaLabel, 
  className = '', 
  variant = 'secondary'
}: IconButtonProps) => {
  const { theme } = useTheme();

  const baseClasses = `flex items-center justify-center font-medium select-none transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-lg backdrop-blur-sm`;

  const styles = {
    primary: theme === 'dark'
      ? 'bg-gradient-to-r from-slate-600 to-slate-500 text-slate-100 border-4 border-slate-500/50 hover:shadow-slate-400/50 px-8 py-6 rounded-2xl text-3xl md:text-4xl'
      : 'bg-gradient-to-r from-accent to-accent-fg/80 text-white border-4 border-accent/20 hover:shadow-accent/25 px-8 py-6 rounded-2xl text-3xl md:text-4xl',
    
    secondary: theme === 'dark'
      ? 'bg-slate-700/60 text-slate-300 border-2 border-slate-600/50 hover:bg-slate-600/60 hover:border-slate-500/60 text-2xl px-6 py-5 rounded-xl shadow-xl'
      : 'bg-white/60 text-slate-700 border-2 border-slate-300/50 hover:bg-accent/20 hover:border-accent/30 text-2xl px-6 py-5 rounded-xl shadow-xl'
  };

  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={`${baseClasses} ${styles[variant]} ${className}`}
    >
           <span 
        className="inline-block"
        style={{ 
          color: 'hsl(var(--accent-h), var(--accent-s), var(--accent-l))',
          filter: `drop-shadow(0 0 8px hsl(var(--accent-h), var(--accent-s), 60%))`
        }}
      >
        {icon}
      </span>
    </button>
  );
};
