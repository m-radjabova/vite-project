import React, { ChangeEvent } from "react";

interface InputFieldProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onKeyPress: (e: React.KeyboardEvent) => void;
    onClear: () => void;
  }
  
function Input({ value, onChange, onKeyPress, onClear }: InputFieldProps) {
    return (
      <div className="relative mt-4">
        <input
          type="text"
          value={value}
          onChange={onChange}
          onKeyPress={onKeyPress}
          className="w-full p-4 pr-10 border-2 border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400 text-lg shadow-sm transition-all duration-200 bg-white placeholder-emerald-300/60 hover:border-emerald-300"
          placeholder="Type the word..."
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          autoFocus
        />
        
        {value && (
          <button
            onClick={onClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-500 hover:bg-emerald-200 hover:text-emerald-700 transition-colors duration-200"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" 
              fill="currentColor" 
              className="w-4 h-4"
            >
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        )}
      </div>
    );
}

export default Input;