import { useTheme } from '../../contexts/ThemeContext';

const PRESET_COLORS = [
  { name: 'Azul', h: 210, s: 40, l: 50 },
  { name: 'Roxo', h: 270, s: 50, l: 55 },
  { name: 'Rosa', h: 330, s: 60, l: 60 },
  { name: 'Verde', h: 160, s: 50, l: 45 },
  { name: 'Laranja', h: 30, s: 70, l: 55 },
];

export const ThemePicker = () => {
  const { theme, setTheme, setAccent } = useTheme();

  return (
    <div className={`flex flex-col sm:flex-row items-center gap-3 py-4 rounded-2xl transition-all duration-300 `}>
      
      {/* Toggle Tema Claro/Escuro */}
      <button
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className={`group p-3 rounded-xl border-2 transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          theme === 'dark'
            ? 'bg-slate-700/50 border-slate-600/50 hover:border-slate-400 hover:shadow-slate-500/25 from-slate-600 to-slate-500 text-slate-200'
            : 'bg-gradient-to-r from-accent/20 to-accent-fg/20 border-accent/30 hover:border-accent/50 hover:shadow-accent/25'
        }`}
        aria-label={`Alternar para ${theme === 'light' ? 'modo escuro' : 'modo claro'}`}
      >
        <span className="text-xl block sm:hidden transition-transform group-hover:rotate-12">
          {theme === 'light' ? '🌙' : '☀️'}
        </span>
        <span className={`hidden sm:block text-sm font-semibold capitalize tracking-wide ${
          theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
        }`}>
          {theme === 'light' ? 'Modo Escuro 🌙' : 'Modo Claro ☀️'}
        </span>
      </button>

      {/* Seletor de Cor dos Detalhes */}
      <div className="flex items-center gap-2">
        <span className={`text-xs font-semibold uppercase tracking-wide hidden sm:block whitespace-nowrap ${
          theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
        }`}>
          Cor:
        </span>
        <div className={`flex gap-1.5 p-1 rounded-lg border backdrop-blur-sm transition-all ${
          theme === 'dark'
            ? 'bg-slate-800/50 border-slate-700/50'
            : 'bg-white/50 border-slate-200/50'
        }`}>
          {PRESET_COLORS.map((color) => (
            <button
              key={color.name}
              onClick={() => setAccent({ h: color.h, s: color.s, l: color.l })}
              className="w-8 h-8 md:w-10 md:h-10 rounded-lg shadow-md hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-200 border-2 border-transparent hover:border-white focus:outline-none focus:ring-2 focus:ring-white/50 group"
              style={{
                backgroundColor: `hsl(${color.h}, ${color.s}%, ${color.l}%)`,
                boxShadow: `0 4px 12px hsl(${color.h}, ${color.s}%, 30%)`,
              }}
              aria-label={`Cor ${color.name}`}
              title={color.name}
            />
          ))}
        </div>
      </div>
     
    </div>
  );
};
