import { FaKeyboard } from 'react-icons/fa';

function GameHeader() {
  return (
    <div className="game-header bg-gradient-to-r from-teal-500 to-emerald-600 p-5 text-white shadow-md">
      <div className="flex items-center justify-center gap-3">
        <FaKeyboard className="text-2xl text-emerald-100 opacity-90" />
        <h1 className="text-2xl font-bold tracking-tight text-white drop-shadow-sm">
          Fast Typing Game
        </h1>
      </div>
      <div className="mt-2 flex justify-center">
        <div className="h-1 w-12 rounded-full bg-emerald-300 opacity-80"></div>
      </div>
    </div>

  );
}

export default GameHeader;