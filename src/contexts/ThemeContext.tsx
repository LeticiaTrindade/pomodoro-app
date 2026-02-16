import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type Theme = 'light' | 'dark';
type Color = { h: number; s: number; l: number };

interface ThemeContextType {
  theme: Theme;
  accent: Color;
  setTheme: (theme: Theme) => void;
  setAccent: (color: Color) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>('light');
  const [accent, setAccentState] = useState<Color>({ h: 210, s: 40, l: 50 });

  // Carrega do localStorage na inicialização
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const savedAccent = localStorage.getItem('accent');
    if (savedTheme) setThemeState(savedTheme);
    if (savedAccent) setAccentState(JSON.parse(savedAccent));
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  // Salva e aplica tema quando muda
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]); 

  // Salva e aplica cores quando mudam
  useEffect(() => {
    localStorage.setItem('accent', JSON.stringify(accent));
    document.documentElement.style.setProperty('--accent-h', accent.h.toString());
    document.documentElement.style.setProperty('--accent-s', `${accent.s}%`);
    document.documentElement.style.setProperty('--accent-l', `${accent.l}%`);
  }, [accent.h, accent.s, accent.l]);

  return (
    <ThemeContext.Provider value={{ theme, accent, setTheme, setAccent: setAccentState }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme deve ser usado dentro de ThemeProvider');
  return context;
};
