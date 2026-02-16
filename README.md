# 🍅 Pomodoro Timer React

**Pomodoro Timer moderno construído com React + TypeScript**. Interface glassmorphism, customização completa de cores/temas e transições automáticas entre sessões.

## ✨ **Funcionalidades**

- **⏰ Timer Pomodoro completo(configurável)** (25m/5m/15m)
- **🔄 Transição automática** entre sessões (4 trabalhos → pausa longa)
- **🎨 5 cores customizáveis** + tema claro/escuro
- **📱 Design responsivo** mobile-first
- **🔊 Som nativo BI-BIP** (Web Audio API)
- **⚙️ Configurações persistentes** (localStorage)
- **♿ Acessibilidade completa** (ARIA)

## 🛠️ **Stack Tecnológica**

```
Frontend: React 18 + TypeScript
Estilização: TailwindCSS + CSS HSL Vars
Estado: Context API (2 contextos)
Persistência: localStorage
Animações: requestAnimationFrame + CSS transitions
Som: Web Audio API (sem dependências)
Build: Vite
```

## 📱 **Demo**


[https://ritual-pomodoro.vercel.app/](https://ritual-pomodoro.vercel.app/)


## 🚀 **Como Usar**

```bash
# Clone o projeto
git clone https://github.com/LeticiaTrindade/pomodoro-app.git
cd pomodoro-app

# Instale dependências
npm install

# Rode localmente
npm run dev

# Build para produção
npm run build
```

## 🎮 **Como Funciona**

```
1. Configurações ⚙️ → Defina tempos (segundos para teste)
2. Escolha cor 💜 → Rosa, Roxo, Azul, Verde...
3. ▶️ Play → timer rosa
4. 00:00 → BI-BIP-BI-BIP + "Pausa Curta ☕"
5. ▶️ → Conta pausa automaticamente
6. 4 sessões → Pausa Longa automática ✨
```

## 🏗️ **Estrutura do Projeto**

```
src/
├── assets/
│   └── Logo.tsx              # Componente SVG da Logo
├── components/
│   ├── atoms/                # Componentes básicos e únicos
│   │   ├── Display.tsx       # O cronômetro (ex: 00:09)
│   │   └── IconButton.tsx    # Botões de controle (Play, Pause, Reset)
│   ├── molecules/            # Combinação de átomos
│   │   ├── SessionInfo.tsx   # Badge de status (Pausa Curta/Trabalho)
│   │   ├── ThemePicker.tsx   # Seletor de cores HSL e Modo Claro/Escuro
│   │   └── TimerControls.tsx # Grupo de botões de controle
│   └── organisms/            # Seções complexas da interface
│       └── Settings.tsx      # Painel de configurações de tempo
├── contexts/                 # Gerenciamento de estado global
│   ├── ThemeContext.tsx      # Lógica de cores HSL e temas
│   └── PomodoroContext.tsx   # Lógica do timer, intervalos e sons
├── pages/
│   └── PomodoroPage.tsx      # View principal que monta o app
├── index.css                 # Configurações globais e Tailwind
├── App.tsx                   # Provedores de contexto e roteamento
└── main.tsx                  # Ponto de entrada do React
