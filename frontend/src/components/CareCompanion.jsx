import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

const CareCompanion = () => {
  return (
    <div className="flex flex-col items-center text-center p-6 card bg-gradient-to-br from-primary/5 to-success/5 border-primary/10">
      <div className="relative mb-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-r from-primary/20 via-success/20 to-primary/20 rounded-full blur-xl"
        />
        
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center border border-slate-100"
        >
          <div className="relative">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1 -right-1"
            >
              <Sparkles size={16} className="text-warning fill-warning" />
            </motion.div>
            <div className="text-4xl">🤖</div>
          </div>
        </motion.div>
      </div>

      <h3 className="text-xl font-bold mb-2">Hello, I'm Aira</h3>
      <p className="text-slate-600 text-sm mb-4 leading-relaxed">
        Your empathetic health companion. I'm here to listen and help you feel better.
      </p>

      <div className="flex items-center gap-2 text-primary font-medium text-xs bg-primary/10 px-4 py-2 rounded-full">
        <Heart size={14} className="fill-primary" />
        Always here for you
      </div>
    </div>
  );
};

export default CareCompanion;
