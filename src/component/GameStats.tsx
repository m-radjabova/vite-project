import { FaCheck, FaClock } from 'react-icons/fa';
import { BsLightningFill } from 'react-icons/bs';

interface GameStatsProps {
  score: number;
  timeLeft: number;
}

function GameStats({ score, timeLeft }: GameStatsProps) {
  return (
    <div className="flex items-center justify-between w-full">
      
      <div className="flex items-center space-x-2 bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-2 rounded-full shadow-sm border border-green-200 group hover:bg-emerald-100 transition-colors duration-200">
        <div className="p-1.5 bg-white rounded-full shadow-inner border border-green-100 group-hover:bg-emerald-50 transition-colors duration-200">
          <FaCheck className="text-green-600 text-sm" />
        </div>
        <span className="text-green-800 font-medium">
          Correct: <span className="font-bold text-emerald-700">{score}</span>
        </span>
      </div>
      
      <div className="flex items-center space-x-2 bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-2 rounded-full shadow-sm border border-green-200 hover:bg-emerald-100 transition-colors duration-200">
        <div className="p-1.5 bg-white rounded-full shadow-inner border border-green-100">
          <FaClock className="text-green-600 text-sm" />
        </div>
        <div className="relative">
          <span className={`font-bold text-lg ${
            timeLeft <= 5 ? "text-amber-600 animate-pulse" : "text-emerald-700"
          }`}>
            {timeLeft}
          </span>
          {timeLeft <= 5 && (
            <div className="absolute -right-5 -top-1 animate-[ping_1s_ease-in-out_infinite]">
              <BsLightningFill className="text-yellow-500 text-sm" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GameStats;