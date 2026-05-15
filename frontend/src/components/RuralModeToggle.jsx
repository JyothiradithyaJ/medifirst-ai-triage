import React from 'react';
import { motion } from 'framer-motion';
import { Accessibility, Languages } from 'lucide-react';
import useStore from '../store/useStore';
import { clsx } from 'clsx';

const RuralModeToggle = () => {
  const { isRuralMode, toggleRuralMode } = useStore();

  return (
    <div className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-50 flex flex-col gap-3">
      {/* Language Toggle Placeholder */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="p-3 bg-white text-slate-600 rounded-full shadow-lg border border-slate-100 flex items-center justify-center"
        title="Change Language"
      >
        <Languages size={20} />
      </motion.button>

      {/* Rural Mode Toggle */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleRuralMode}
        className={clsx(
          "flex items-center gap-2 px-4 py-3 rounded-full font-bold shadow-xl transition-all duration-300",
          isRuralMode 
            ? "bg-primary text-white scale-110" 
            : "bg-white text-primary border border-primary/20"
        )}
      >
        <Accessibility size={20} className={isRuralMode ? "animate-bounce" : ""} />
        <span className="text-sm md:text-base">
          {isRuralMode ? "Standard Mode" : "Rural Mode"}
        </span>
      </motion.button>
    </div>
  );
};

export default RuralModeToggle;
