import { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { usePomodoro } from '../../contexts/PomodoroContext';

export const Settings = () => {
  const { theme } = useTheme();
  const { settings, updateSettings } = usePomodoro();
  const [isOpen, setIsOpen] = useState(false);
  const [tempSettings, setTempSettings] = useState(settings);

  useEffect(() => {
    setTempSettings(settings);
  }, [settings]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(tempSettings);
    setIsOpen(false);
  };

  const minutesToSeconds = (minutes: number) => minutes * 60;
  const secondsToMinutes = (seconds: number) => Math.round(seconds / 60);

  return (
    <>
      {/* Botão Principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 rounded-2xl shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto font-medium ${
          theme === 'dark'
            ? 'bg-slate-700/80 hover:bg-slate-600/80 text-slate-200 border-2 border-slate-600/50'
            : 'bg-gradient-to-r from-slate-100/80 to-slate-200/80 hover:from-slate-200 hover:to-slate-300 text-slate-700 border-2 border-slate-300/50'
        } justify-center`}
        aria-label="Configurações de tempo"
      >
        <span className={`text-xl ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
          ⚙️
        </span>
        <span className={`sm:hidden block ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
          Configurações
        </span>
      </button>

      {/* Modal de Configurações */}
      {isOpen && (
        <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-4 sm:absolute sm:inset-auto sm:top-4 sm:right-4  rounded-2xl shadow-2xl backdrop-blur-xl border animate-in slide-in-from-top-4 duration-300 sm:w-full sm:border-t-0 ${
          theme === 'dark'
            ? 'bg-slate-800/90 border-slate-700/50 shadow-black/30'
            : 'bg-white/90 border-slate-200/50 shadow-slate-500/10'
        } ${isOpen ? 'absolute top-4 right-4' : 'static'}`}>
          
          <h3 className={`text-lg font-bold mb-6 flex items-center gap-2 ${
            theme === 'dark' ? 'text-slate-200' : 'text-slate-800'
          }`}>
            ⚙️ Configurações de Tempo (minutos)
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Trabalho */}
            <div className="flex flex-col gap-2">
              <label className={`text-sm font-semibold ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
              }`}>
                Trabalho
              </label>
              <input
                type="number"
                min="1"
                max="90"
                value={secondsToMinutes(tempSettings.workTime)}
                onChange={(e) => setTempSettings({
                  ...tempSettings,
                  workTime: minutesToSeconds(Number(e.target.value))
                })}
                className={`w-full p-3 rounded-xl border-2 text-lg font-mono text-center transition-all focus:ring-2 focus:ring-offset-2 backdrop-blur-sm ${
                  theme === 'dark'
                    ? 'bg-slate-700/50 border-slate-600 focus:border-accent-fg focus:ring-accent/20 text-slate-200 placeholder-slate-500'
                    : 'bg-white/50 border-slate-200 focus:border-accent focus:ring-accent/20 text-slate-900 placeholder-slate-500'
                }`}
              />
            </div>

            {/* Pausa Curta */}
            <div className="flex flex-col gap-2">
              <label className={`text-sm font-semibold ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
              }`}>
                Pausa Curta
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={secondsToMinutes(tempSettings.shortBreak)}
                onChange={(e) => setTempSettings({
                  ...tempSettings,
                  shortBreak: minutesToSeconds(Number(e.target.value))
                })}
                className={`w-full p-3 rounded-xl border-2 text-lg font-mono text-center transition-all focus:ring-2 focus:ring-offset-2 backdrop-blur-sm ${
                  theme === 'dark'
                    ? 'bg-slate-700/50 border-slate-600 focus:border-accent-fg focus:ring-accent/20 text-slate-200 placeholder-slate-500'
                    : 'bg-white/50 border-slate-200 focus:border-accent focus:ring-accent/20 text-slate-900 placeholder-slate-500'
                }`}
              />
            </div>

            {/* Pausa Longa */}
            <div className="flex flex-col gap-2">
              <label className={`text-sm font-semibold ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
              }`}>
                Pausa Longa
              </label>
              <input
                type="number"
                min="5"
                max="60"
                value={secondsToMinutes(tempSettings.longBreak)}
                onChange={(e) => setTempSettings({
                  ...tempSettings,
                  longBreak: minutesToSeconds(Number(e.target.value))
                })}
                className={`w-full p-3 rounded-xl border-2 text-lg font-mono text-center transition-all focus:ring-2 focus:ring-offset-2 backdrop-blur-sm ${
                  theme === 'dark'
                    ? 'bg-slate-700/50 border-slate-600 focus:border-accent-fg focus:ring-accent/20 text-slate-200 placeholder-slate-500'
                    : 'bg-white/50 border-slate-200 focus:border-accent focus:ring-accent/20 text-slate-900 placeholder-slate-500'
                }`}
              />
            </div>

            {/* Botões */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setTempSettings(settings);
                }}
                className={`flex-1 px-6 py-3 rounded-xl font-medium backdrop-blur-sm border-2 transition-all hover:shadow-md ${
                  theme === 'dark'
                    ? 'bg-slate-700/80 hover:bg-slate-600/80 text-slate-300 border-slate-600/50 hover:border-slate-500/50'
                    : 'bg-slate-200/80 hover:bg-slate-300/80 text-slate-700 border-slate-300/50 hover:border-slate-400/50'
                }`}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className={`flex-1 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all backdrop-blur-sm border ${
                  theme === 'dark'
                    ? 'bg-gradient-to-r from-slate-600 to-slate-500 hover:from-slate-500 hover:to-slate-400 text-slate-100 border-slate-500/50 text-white'
                    : 'bg-gradient-to-r from-accent to-accent-fg/80 hover:from-accent/90 hover:to-accent-fg text-slate-700 border-accent/30'
                }`}
              >
                Salvar
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
