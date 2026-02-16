import { createContext, useContext, useState, useEffect, useCallback, useRef, type ReactNode } from 'react';

interface PomodoroContextType {
  timeLeft: string;
  sessionType: 'work' | 'short' | 'long';
  isRunning: boolean;
  workSessions: number;
  playPause: () => void;
  reset: () => void;
  skip: () => void;
  settings: {
    workTime: number;
    shortBreak: number;
    longBreak: number;
  };
  updateSettings: (newSettings: Partial<PomodoroContextType['settings']>) => void;
}

const PomodoroContext = createContext<PomodoroContextType | undefined>(undefined);

export const PomodoroProvider = ({ children }: { children: ReactNode }) => {
  // 1. ESTADOS PRINCIPAIS
  const [settings, setSettings] = useState({
    workTime: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  });
  const [sessionType, setSessionType] = useState<'work' | 'short' | 'long'>('work');
  const [secondsLeft, setSecondsLeft] = useState(settings.workTime);
  const [timeLeft, setTimeLeft] = useState('25:00');
  const [isRunning, setIsRunning] = useState(false);
  const [workSessions, setWorkSessions] = useState(0);

 const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // 2. HELPERS (FORMATAÇÃO E SOM)
  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const playBeep = useCallback(() => {
    try {
      if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }

      const ctx = audioContextRef.current;
      const playTone = (freq: number, start: number, duration: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.3, ctx.currentTime + start);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + start + duration);
        osc.start(ctx.currentTime + start);
        osc.stop(ctx.currentTime + start + duration);
      };

      playTone(800, 0, 0.3);
      playTone(1000, 0.4, 0.4);
      playTone(1200, 0.8, 0.4);
    } catch (e) {
      console.log('Audio blocked');
    }
  }, []);

  // 3. LÓGICA DE TRANSIÇÃO
  function handleSessionEnd() {
  setIsRunning(false);

  if (sessionType === 'work') {
    const newSessions = workSessions + 1;
    setWorkSessions(newSessions);

    if (newSessions >= 4) {
      setSessionType('long');
      setSecondsLeft(settings.longBreak);
      setWorkSessions(0);
    } else {
      setSessionType('short');
      setSecondsLeft(settings.shortBreak);
    }
  } else {
    setSessionType('work');
    setSecondsLeft(settings.workTime);
  }

  if ('Notification' in window && Notification.permission === 'granted') {
    const labels = { work: 'Trabalho', short: 'Pausa Curta', long: 'Pausa Longa' };
    new Notification(`${labels[sessionType]} finalizada! ⏰`);
  }
}
  // 4. EFFECTS
  // Carrega configurações iniciais
  useEffect(() => {
    const saved = localStorage.getItem('pomodoro-settings');
    if (saved) {
      const parsed = JSON.parse(saved);
      setSettings(parsed);
      setSecondsLeft(parsed.workTime);
    }
  }, []);

  // Timer principal
 useEffect(() => {
  setTimeLeft(formatTime(secondsLeft));

  if (isRunning && secondsLeft > 0) {
    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          
          handleSessionEnd();
          playBeep(); 
          return 0; 
        }
        return prev - 1;
      });
    }, 1000);
  }

  return () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };
}, [isRunning, secondsLeft, playBeep]); 
  // 5. AÇÕES DO USUÁRIO
  const updateSettings = useCallback((newSettings: Partial<typeof settings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem('pomodoro-settings', JSON.stringify(updated));
    if (!isRunning && sessionType === 'work') {
      setSecondsLeft(updated.workTime);
    }
  }, [settings, isRunning, sessionType]);

  const playPause = useCallback(() => {
    if (audioContextRef.current?.state === 'suspended') {
      audioContextRef.current.resume();
    }
    setIsRunning(prev => !prev);
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setSessionType('work');
    setWorkSessions(0);
    setSecondsLeft(settings.workTime);
  }, [settings.workTime]);

  const skip = useCallback(() => {
    setIsRunning(false);
    playBeep();
    handleSessionEnd();
  }, [playBeep, handleSessionEnd]);

  return (
    <PomodoroContext.Provider
      value={{
        timeLeft,
        sessionType,
        isRunning,
        workSessions,
        settings,
        playPause,
        reset,
        skip,
        updateSettings,
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
};

export const usePomodoro = () => {
  const context = useContext(PomodoroContext);
  if (!context) throw new Error('usePomodoro deve ser usado dentro de PomodoroProvider');
  return context;
};