import React from 'react';
import { Message, Role } from '../types';
import { User, Bot } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === Role.User;

  return (
    <div className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[85%] md:max-w-[70%] gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        
        {/* Avatar Icon */}
        <div className={`
          flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
          ${isUser ? 'bg-black text-white' : 'bg-white border border-gray-200 text-gray-600'}
        `}>
          {isUser ? <User size={16} /> : <Bot size={16} />}
        </div>

        {/* Message Bubble */}
        <div className={`
          p-4 rounded-2xl text-sm leading-relaxed shadow-sm
          ${isUser 
            ? 'bg-black text-white rounded-tr-none' 
            : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'}
        `}>
          <div className="whitespace-pre-wrap break-words">
            {message.text}
          </div>
        </div>

      </div>
    </div>
  );
};