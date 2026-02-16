import { useTheme } from '../../contexts/ThemeContext';
import { Display } from '../../components/atoms/Display';
import { TimerControls } from '../../components/molecules/TimerControls';
import { SessionInfo } from '../../components/molecules/SessionInfo';
import { ThemePicker } from '../../components/molecules/ThemePicker';
import { Settings } from "../../components/organisms/Settings";
import { Logo } from '../../assets/Logo';

export default function PomodoroPage() {
  const { theme } = useTheme();


  return (
    <main
      className={`min-h-screen flex flex-col items-center justify-center p-4 md:p-8 gap-8 transition-all duration-500 ${theme === 'dark'
        ? 'bg-gradient-to-br from-slate-900 via-blue-900/30 to-indigo-900/50'
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'
        }`}
      role="main"
    >


      <header className={`text-center transition-all ${theme === 'dark' ? 'text-slate-300' : ''}`}>
        <div className='flex'>
          <Logo
            className="w-12 h-12 mt-[-8px] md:w-16 md:h-16 mt-[-10px] transition-all duration-500 hover:scale-110"
            style={{ color: 'hsl(var(--accent-h), var(--accent-s), var(--accent-l))' }}
          />
          <h1 className={`pl-2 sm:pl-4 text-3xl md:text-5xl font-bold bg-gradient-to-r from-accent to-accent-fg bg-clip-text mb-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}>
            Ritual Pomodoro
          </h1>
        </div>
        <p className={`text- md:text-base transition-colors ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
          }`}>
          Foque, pause, repita.
        </p>
      </header>

      {/* Card Principal */}
      <section className={`w-full max-w-md md:max-w-lg lg:max-w-2xl p-8 md:p-12 rounded-3xl shadow-2xl border flex flex-col items-center gap-8 transition-all duration-300 bg-opacity-5 ${theme === 'dark'
        ? 'bg-slate-800/50 backdrop-blur-xl border-slate-700/50 shadow-black/20'
        : 'bg-white/40 backdrop-blur-xl border-slate-200/50 shadow-lg'
        }`}>

        {/* Info da Sessão */}
        <SessionInfo />

        {/* Display Central */}
        <div className="flex flex-col items-center gap-4 flex-1 w-full">
          <Display />
          <TimerControls />
        </div>

        {/* Controles Inferiores */}
        <div className={`w-full flex flex-col sm:flex-row justify-around py-4 border-t transition-colors ${theme === 'dark'
          ? 'border-slate-700/50 bg-slate-800/50'
          : 'border-slate-200/50 bg-white/50'
          }`}>
          <ThemePicker />
          <Settings />
        </div>
      </section>

      {/* Rodapé */}
      <footer className={`text-xs text-center transition-colors ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'
        }`}>
        Feito com ❤️ para estudos | Letícia Trindade
      </footer>
    </main>
  );
}
