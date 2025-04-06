import { useState, useEffect, ChangeEvent } from 'react';
import GameHeader from '../component/GameHeader';
import GameStats from '../component/GameStats';
import WordDisplay from '../component/WordDisplay';
import Input from '../component/Input';
import GameOverScreen from '../component/GameOverScreen';

const words = [
  "IronMan", "SpiderMan", "Batman", "Superman", "Thor",
  "Hulk", "WonderWoman", "Flash", "Deadpool", "BlackPanther",

  "Hogwarts", "Voldemort", "Lightsaber", "Jedi", "Yoda",
  "Avengers", "Gotham", "Matrix", "Neo", "Avatar",

  "Galaxy", "Meteor", "Comet", "Satellite", "Orbit",
  "Nebula", "Asteroid", "Spaceship", "Rocket", "NASA",

  "Eiffel", "Colosseum", "Pyramid", "Sahara", "Amazon",
  "Everest", "Niagara", "Maldives", "Istanbul", "Dubai",


  "Dolphin", "Penguin", "Koala", "Chameleon", "Flamingo",
  "Crocodile", "Leopard", "Ostrich", "Octopus", "Scorpion",

  "Blockchain", "Robot", "Algorithm", "Drone", "Server",
  "Cybersecurity", "Quantum", "Virtual", "Pixel", "Cloud",

  "Macaron", "Gelato", "Tiramisu", "Cheesecake", "Souffle",
  "Baklava", "Donut", "Eclair", "Truffle", "Muffin",

  "Potion", "Spellbook", "Crystal", "Wizard", "Magic",
  "Dragon", "Phoenix", "Wand", "Enchanted", "Cursed",

  "Football", "Basketball", "Tennis", "Cricket", "Marathon",
  "Olympics", "Surfing", "Boxing", "Skating", "Archery",
];


function GameContainer() {
    const [randomWords, setRandomWords] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(10);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [startTime, setStartTime] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);
    
    const resetGame = () => {
      const shuffledWords = [...words].sort(() => Math.random() - 0.5);
      setRandomWords(shuffledWords);
      setCurrentIndex(0);
      setScore(0);
      setTimeLeft(15);
      setIsGameStarted(false);
      setIsGameOver(false);
      setInputValue('');
      setShowSuccess(false);
    };


    useEffect(() => {
      if (isGameStarted && !isGameOver) {
        setStartTime(Date.now());
      }
    }, [currentIndex, isGameStarted, isGameOver]);
  

    useEffect(() => {
      if (!isGameStarted || isGameOver) return;
  
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsGameOver(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
  
      return () => clearInterval(timer);
    }, [isGameStarted, isGameOver]);


    useEffect(() => {
        resetGame();
    }, []);


    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);
  
      if (!isGameStarted) setIsGameStarted(true);
  
      if (value === randomWords[currentIndex]) {
        handleCorrectAnswer();
      }
    };

    const handleCorrectAnswer = () => {
      const timeTaken = (Date.now() - startTime) / 1000;
      const bonusTime = timeTaken < 1 ? 4 : 3;

      setScore(prev => prev + 1);
      setTimeLeft(prev => prev + bonusTime);
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        goToNextWord();
      }, 500);
    };

  const goToNextWord = () => {
    const isLastWord = currentIndex >= randomWords.length - 1;
    if (isLastWord) {
      setIsGameOver(true);
    } else {
      setCurrentIndex(prev => prev + 1);
      setInputValue('');
    }
  };


  const handleNext = () => {
    if (inputValue === randomWords[currentIndex]) {
      handleCorrectAnswer();
    } else {
      goToNextWord();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleNext();
  };


  if (isGameOver) {
    return <GameOverScreen score={score} resetGame={resetGame} />;
  }

  return (
    <div className="card w-full max-w-md bg-white rounded-2xl overflow-hidden shadow-xl transform transition-all duration-300 hover:scale-[1.01] border border-emerald-50">
      <GameHeader />
      
      <div className="p-6">
        <div className="flex flex-col items-center space-y-6">
          <GameStats score={score} timeLeft={timeLeft} />
          
          <div className="w-full text-center">
            <WordDisplay 
              word={randomWords[currentIndex]} 
              showSuccess={showSuccess} 
              timeLeft={timeLeft}
            />
            
            <Input 
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              onClear={() => setInputValue("")}
            />
            
            <button
              onClick={handleNext}
              className="mt-6 w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-medium py-3 px-6 rounded-full transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
            >
              <span>Next</span>
              <span className="text-emerald-100">(Enter)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameContainer;