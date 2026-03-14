import React, { useState } from 'react';
import { GameState, Phase, Character } from './types';
import Gate from './components/Gate';
import PoetryClub from './components/PoetryClub';
import DestinyWheel from './components/DestinyWheel';
import Reveal from './components/Reveal';
import { evaluateCharacter } from './services/gemini';

const INITIAL_STATE: GameState = {
  phase: Phase.GATE,
  answers: {},
  result: null,
};

function App() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);

  const handleEnter = () => {
    setGameState((prev) => ({ ...prev, phase: Phase.QUIZ }));
  };

  const handleQuizComplete = async (answers: Record<number, string>) => {
    setGameState((prev) => ({
      ...prev,
      answers,
      phase: Phase.LOADING,
    }));

    try {
      const result = await evaluateCharacter(answers);
      setGameState((prev) => ({
        ...prev,
        result,
        phase: Phase.REVEAL,
      }));
    } catch (error) {
      console.error("Failed to evaluate character:", error);
      // Fallback is handled in the service
    }
  };

  const handleReset = () => {
    setGameState(INITIAL_STATE);
  };

  return (
    <div className="w-screen h-screen bg-[#f3e5d8] text-[#333333] flex flex-col overflow-hidden relative font-serif">
      
      {/* Top Bar Logo */}
      <div className="absolute top-6 left-6 z-50 flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity">
        <div className="w-10 h-10 rounded-full border-2 border-[#c03f3c] flex items-center justify-center text-[#c03f3c] font-bold text-lg shadow-md bg-[#f3e5d8]">
            梦
        </div>
        <span className="font-bold tracking-widest text-lg text-[#9d2933] hidden md:inline-block">大观园梦中人</span>
      </div>

      <main className="flex-1 w-full h-full relative z-10">
        {gameState.phase === Phase.GATE && (
          <Gate onEnter={handleEnter} />
        )}

        {gameState.phase === Phase.QUIZ && (
          <PoetryClub onComplete={handleQuizComplete} />
        )}

        {gameState.phase === Phase.LOADING && (
          <DestinyWheel />
        )}

        {gameState.phase === Phase.REVEAL && gameState.result && (
          <Reveal character={gameState.result} onReset={handleReset} />
        )}
      </main>

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-30">
         <div className="absolute top-0 left-0 w-full h-full" 
              style={{ 
                backgroundImage: 'repeating-linear-gradient(45deg, #e4c6d0 25%, transparent 25%, transparent 75%, #e4c6d0 75%, #e4c6d0), repeating-linear-gradient(45deg, #e4c6d0 25%, #f3e5d8 25%, #f3e5d8 75%, #e4c6d0 75%, #e4c6d0)',
                backgroundPosition: '0 0, 10px 10px',
                backgroundSize: '20px 20px',
                opacity: 0.1
              }}>
         </div>
      </div>
    </div>
  );
}

export default App;
