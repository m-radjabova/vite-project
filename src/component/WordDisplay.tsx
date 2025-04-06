interface WordDisplayProps {
    word: string;
    showSuccess: boolean;
    timeLeft: number;
  }
  
function WordDisplay({ word, showSuccess, timeLeft }: WordDisplayProps) {
    return (
      <>
        <div className="word-display-container relative w-full text-center">
  
          <div className="text-emerald-500/80 text-sm mb-3 flex items-center justify-center gap-2 transition-all duration-300 hover:text-emerald-600">
            <span className="font-medium tracking-wide">Type this word:</span>
            <span className="text-emerald-500 animate-[bounce_1.5s_infinite]">✍️</span>
          </div>
  
          <div className={`
            word-box relative overflow-hidden 
            bg-gradient-to-br from-teal-50 to-emerald-50 
            border border-emerald-200
            text-emerald-800 text-4xl font-bold 
            py-6 px-8 rounded-xl 
            shadow-sm hover:shadow-md
            transition-all duration-300
            ${showSuccess ? 'scale-105' : ''}
          `}>
            <span className="relative z-10 tracking-wide">{word}</span>
            
            {showSuccess && (
              <div className="
                success-overlay absolute inset-0 
                flex items-center justify-center 
                bg-gradient-to-br from-emerald-500 to-teal-500 
                text-white font-bold
                animate-[fadeAndScale_0.8s_ease-out_forwards]
              ">
                <div className="flex flex-col items-center">
                  <span className="text-5xl animate-[bounce_1s]">+{timeLeft < 1 ? 4 : 3}s</span>
                  <span className="text-sm mt-2 opacity-80">Time Bonus!</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    );
}

export default WordDisplay;