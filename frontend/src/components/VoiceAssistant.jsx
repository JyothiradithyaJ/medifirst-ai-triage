import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Square } from 'lucide-react';
import { clsx } from 'clsx';

const VoiceAssistant = () => {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-3xl border border-slate-100 shadow-medical">
      <div className="relative">
        <AnimatePresence>
          {isRecording && (
            <>
              <motion.div
                initial={{ scale: 1, opacity: 0 }}
                animate={{ scale: 1.5, opacity: 0.2 }}
                exit={{ scale: 1, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 bg-primary rounded-full"
              />
              <motion.div
                initial={{ scale: 1, opacity: 0 }}
                animate={{ scale: 2, opacity: 0.1 }}
                exit={{ scale: 1, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                className="absolute inset-0 bg-primary rounded-full"
              />
            </>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsRecording(!isRecording)}
          className={clsx(
            "relative z-10 w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 shadow-xl",
            isRecording ? "bg-danger text-white scale-110" : "bg-primary text-white hover:bg-primary-dark"
          )}
        >
          {isRecording ? <Square size={32} /> : <Mic size={32} />}
        </button>
      </div>

      <div className="text-center">
        <h3 className="font-bold text-lg mb-1">
          {isRecording ? "Listening..." : "Voice Assistant"}
        </h3>
        <p className="text-slate-500 text-sm">
          {isRecording ? "Speak clearly about your symptoms" : "Tap the mic to speak in any language"}
        </p>
      </div>

      {isRecording && (
        <div className="flex items-center gap-1 h-8">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                height: [8, Math.random() * 24 + 8, 8]
              }}
              transition={{ 
                duration: 0.5 + Math.random() * 0.5, 
                repeat: Infinity 
              }}
              className="w-1 bg-primary rounded-full"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default VoiceAssistant;
