import { useTheme } from '../../contexts/ThemeContext';
import { usePomodoro } from '../../contexts/PomodoroContext';

export const SessionInfo = () => {
  const { theme } = useTheme();
  const { sessionType, workSessions } = usePomodoro();
  
  const getSessionLabel = () => {
    switch (sessionType) {
      case 'work': return '🎯 Trabalho';
      case 'short': return '☕ Pausa Curta';
      case 'long': return '✨ Pausa Longa';
      default: return 'Pomodoro';
    }
  };

  const getSessionColors = () => {
    switch (sessionType) {
      case 'work': 
        return theme === 'dark'
          ? 'from-red-600/40 to-orange-500/40 border-red-500/40 text-red-300'
          : 'from-red-500/30 to-orange-500/30 border-red-500/30 text-red-600';
      case 'short': 
        return theme === 'dark'
          ? 'from-emerald-600/40 to-teal-500/40 border-emerald-500/40 text-emerald-300'
          : 'from-emerald-500/30 to-teal-500/30 border-emerald-500/30 text-emerald-600';
      case 'long': 
        return theme === 'dark'
          ? 'from-blue-600/40 to-indigo-500/40 border-blue-500/40 text-blue-300'
          : 'from-blue-500/30 to-indigo-500/30 border-blue-500/30 text-blue-600';
      default: 
        return theme === 'dark'
          ? 'from-slate-600/40 to-slate-500/40 border-slate-500/40 text-slate-300'
          : 'from-slate-500/30 to-slate-600/30 border-slate-500/30 text-slate-600';
    }
  };

  return (
    <div className="text-center space-y-2">
      <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl backdrop-blur-sm shadow-lg transition-all duration-300 ${
        getSessionColors()
      }`}>
        <span className="text-lg font-semibold w-full">{getSessionLabel()}</span>
        
        {/* Contador de Sessões */}
        {sessionType === 'work' && (
          <div className="flex gap-1 ml-2">
            {Array.from({ length: 4 }, (_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i < workSessions 
                    ? 'bg-[hsl(var(--accent-h),var(--accent-s),var(--accent-l))]' 
                    : theme === 'dark' 
                      ? 'bg-slate-700/50' 
                      : 'bg-slate-300/50'
                }`}
                title={`Sessão ${i + 1} ${i < workSessions ? '✓ Completa' : 'Pendente'}`}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Legenda dos ciclos (desktop) */}
      <div className={`text-xs opacity-75 transition-all ${
        theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
      } hidden md:block`}>
        {sessionType === 'work' && workSessions > 0 && (
          <>Próxima: {workSessions >= 3 ? 'Pausa Longa ✨' : 'Pausa Curta ☕'}</>
        )}
      </div>
    </div>
  );
};
