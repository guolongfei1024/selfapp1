import React, { useState, useRef, useEffect } from 'react';
import { SendHorizontal } from 'lucide-react';

interface InputAreaProps {
  onSend: (text: string) => void;
  isLoading: boolean;
}

export const InputArea: React.FC<InputAreaProps> = ({ onSend, isLoading }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [input]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;
    
    onSend(input);
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-md border-t border-gray-100 p-4 pb-6 z-10">
      <div className="max-w-2xl mx-auto relative">
        <form onSubmit={handleSubmit} className="relative flex items-end gap-2 bg-gray-50 p-2 rounded-3xl border border-gray-200 focus-within:border-gray-400 focus-within:ring-1 focus-within:ring-gray-400 transition-all shadow-sm">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything..."
            disabled={isLoading}
            rows={1}
            className="w-full bg-transparent border-none focus:ring-0 text-gray-800 placeholder-gray-400 resize-none py-3 px-4 max-h-[150px] overflow-y-auto"
            style={{ minHeight: '44px' }}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={`
              flex-shrink-0 p-3 rounded-full transition-all duration-200 mb-[2px] mr-[2px]
              ${!input.trim() || isLoading 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-black text-white hover:bg-gray-800 hover:scale-105 shadow-md'}
            `}
          >
            <SendHorizontal size={20} />
          </button>
        </form>
        <div className="text-center mt-2">
          <p className="text-[10px] text-gray-400">Powered by Gemini 2.5 Flash</p>
        </div>
      </div>
    </div>
  );
};