import React, { useState, useRef, useEffect } from 'react';
import { Message, Role } from './types';
import { generateResponse } from './services/gemini';
import { ChatMessage } from './components/ChatMessage';
import { InputArea } from './components/InputArea';
import { Sparkles } from 'lucide-react';

const INITIAL_MESSAGE: Message = {
  id: 'welcome',
  role: Role.Model,
  text: "Hello. I am Zen. \nSimple, fast, and ready to help. What's on your mind?",
  timestamp: Date.now(),
};

export default function App() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (text: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      role: Role.User,
      text: text.trim(),
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const responseText = await generateResponse(text);
      
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: Role.Model,
        text: responseText,
        timestamp: Date.now(),
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: Role.Model,
        text: "I encountered a momentary stillness (error). Please try again.",
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] text-gray-900 font-sans flex flex-col">
      
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100 py-4 px-6 flex items-center justify-center gap-2">
        <Sparkles className="text-gray-400 w-5 h-5" />
        <h1 className="font-semibold text-lg tracking-tight text-gray-800">Zen Chat</h1>
      </header>

      {/* Chat Area */}
      <main className="flex-1 w-full max-w-2xl mx-auto p-4 pb-32">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-400">
            <p>Start a conversation...</p>
          </div>
        ) : (
          messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))
        )}
        
        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex w-full mb-6 justify-start">
             <div className="flex gap-3 flex-row">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-600 flex items-center justify-center">
                   <Sparkles size={16} className="animate-pulse" />
                </div>
                <div className="p-4 rounded-2xl rounded-tl-none bg-white border border-gray-100 text-gray-500 text-sm shadow-sm flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
             </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </main>

      {/* Input */}
      <InputArea onSend={handleSend} isLoading={isLoading} />

    </div>
  );
}