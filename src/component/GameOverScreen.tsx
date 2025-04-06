import { FaUndo, FaTrophy } from 'react-icons/fa';
import { GiFruitBowl } from 'react-icons/gi';

interface GameOverScreenProps {
  score: number;
  resetGame: () => void;
}

function GameOverScreen({ score, resetGame }: GameOverScreenProps) {
  return (
    <div className="card w-full max-w-md bg-white rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-300 hover:scale-[1.02] border border-green-50">
      
      <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-5 text-white shadow-inner">
        <div className="flex items-center justify-center space-x-3 animate-pulse">
          <FaTrophy className="text-2xl text-yellow-300 drop-shadow-md" />
          <h1 className="text-2xl font-bold text-center tracking-tight">
            Game Over! <span className="animate-bounce inline-block">🎉</span>
          </h1>
        </div>
      </div>
      
      
      <div className="p-6 flex flex-col items-center space-y-6 text-center">
       
        <div className="flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 rounded-full w-24 h-24 shadow-inner border border-green-200 animate-[pulse_2s_ease-in-out_infinite]">
          <GiFruitBowl className="text-4xl text-green-600 drop-shadow-sm" />
        </div>
        
        
        <div className="text-xl font-medium text-gray-700">
          You typed <span className="font-bold text-green-600 animate-[scaleUp_0.5s_ease-in-out] inline-block">
            {score}
          </span> words correctly! <span className="text-yellow-500">✨</span>
        </div>
        
        
        <div className={`text-lg px-4 py-2 rounded-full shadow-sm transition-all duration-300 ${
          score >= 19 ? 
            "bg-gradient-to-r from-green-50 to-emerald-100 text-emerald-700 border border-emerald-200" : 
            "bg-gradient-to-r from-yellow-50 to-amber-100 text-amber-700 border border-amber-200"
        }`}>
          {score >= 19 ? 
            "Great job! 😊" : 
            "Good try! 💪"}
        </div>
        
        
        <button 
          onClick={resetGame}
          className="mt-4 w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 group"
        >
          <FaUndo className="transition-transform duration-300 group-hover:rotate-180" />
          <span>Play Again</span>
        </button>
      </div>
    </div>
  );
}

export default GameOverScreen;