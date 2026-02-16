// src/App.tsx
import { ThemeProvider } from './contexts/ThemeContext';
import { PomodoroProvider } from './contexts/PomodoroContext';
import PomodoroPage from "../src/components/pages/PomodoroPage";

function App() {
  return (
    <ThemeProvider>
      <PomodoroProvider>
        <PomodoroPage />
      </PomodoroProvider>
    </ThemeProvider>
  );
}

export default App;
