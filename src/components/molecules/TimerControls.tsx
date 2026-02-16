import { usePomodoro } from '../../contexts/PomodoroContext';
import { IconButton } from '../atoms/IconButton';

const PlayIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PauseIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
    <rect x="6" y="4" width="4" height="16" />
    <rect x="14" y="4" width="4" height="16" />
  </svg>
);

const ResetIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
  </svg>
);

const SkipIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15,9 20,14 15,19" />
    <line x1="20" y1="14" x2="9" y2="14" />
    <polyline points="9,9 14,14 9,19" />
    <line x1="14" y1="14" x2="3" y2="14" />
  </svg>
);

export const TimerControls = () => {
  const { isRunning, playPause, reset, skip } = usePomodoro();

  return (
    <div className="flex items-center gap-6 w-full justify-center max-w-md px-4">
      {/* Botão PRINCIPAL - SVG COLORIDO */}
      <IconButton
        variant="primary"
        icon={isRunning ? <PauseIcon /> : <PlayIcon />}
        onClick={playPause}
        ariaLabel={isRunning ? 'Pausar' : 'Iniciar'}
      />

      <div className="flex gap-4">
        <IconButton
          variant="secondary"
          icon={<ResetIcon />}
          onClick={reset}
          ariaLabel="Resetar"
        />
        <IconButton
          variant="secondary"
          icon={<SkipIcon />}
          onClick={skip}
          ariaLabel="Pular sessão"
        />
      </div>
    </div>
  );
};
