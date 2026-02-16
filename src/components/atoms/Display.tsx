import { usePomodoro } from '../../contexts/PomodoroContext';

export const Display = () => {

  const { timeLeft, sessionType } = usePomodoro();

  return (
    <div className="w-full flex flex-col items-center">
      {/* Tempo Principal */}
      <div
        className="text-center font-mono font-black drop-shadow-lg select-none"
        style={{ textShadow: '0 0 20px currentColor' }}
        aria-label={`Tempo restante: ${timeLeft}`}
        role="timer"
        aria-live="assertive"
      >
        <div className="text-6xl md:text-8xl lg:text-9xl leading-none bg-clip-text text-transparent"
          style={{ backgroundImage: `linear-gradient(to right, hsl(var(--accent-h), var(--accent-s), var(--accent-l)), hsl(var(--accent-h), 60%, 60%))` }}
        >
          {timeLeft}
        </div>
      </div>
    </div>
  );
};



