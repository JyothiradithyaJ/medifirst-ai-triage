import React from 'react';
import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';
import { clsx } from 'clsx';

const ChatBubble = ({ message, isAI = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={clsx(
        "flex w-full gap-3 mb-4",
        isAI ? "justify-start" : "justify-end"
      )}
    >
      {isAI && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-1 border border-primary/20 shadow-sm">
          <Bot size={18} />
        </div>
      )}

      <div className={clsx(
        "max-w-[80%] px-4 py-3 rounded-2xl shadow-sm text-sm md:text-base leading-relaxed",
        isAI 
          ? "bg-white text-slate-800 border border-slate-100 rounded-tl-none" 
          : "bg-primary text-white rounded-tr-none shadow-md shadow-primary/10"
      )}>
        <p>{message}</p>
        <div className={clsx(
          "text-[10px] mt-1.5 opacity-60",
          isAI ? "text-slate-500" : "text-white/80 text-right"
        )}>
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {!isAI && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white mt-1 shadow-md">
          <User size={18} />
        </div>
      )}
    </motion.div>
  );
};

export default ChatBubble;
