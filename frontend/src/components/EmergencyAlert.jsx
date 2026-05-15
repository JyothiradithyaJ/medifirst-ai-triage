import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneCall, AlertTriangle, X } from 'lucide-react';

const EmergencyAlert = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
        >
          <div className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border-4 border-danger/20">
            <div className="bg-danger p-6 text-white text-center relative overflow-hidden">
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-white rounded-full opacity-10 -m-12"
              />
              
              <AlertTriangle size={48} className="mx-auto mb-4 animate-bounce" />
              <h2 className="text-2xl font-black mb-1 tracking-tight">CRITICAL ALERT</h2>
              <p className="text-white/90 font-medium">Immediate medical attention required!</p>
              
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-white/60 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="bg-danger/5 border border-danger/10 p-4 rounded-2xl">
                <p className="text-slate-700 text-sm leading-relaxed mb-4">
                  Based on your symptoms, we strongly recommend calling emergency services immediately.
                </p>
                <div className="flex flex-col gap-3">
                  <a 
                    href="tel:108" 
                    className="w-full bg-danger hover:bg-danger-dark text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-danger/20 transition-all active:scale-95"
                  >
                    <PhoneCall size={24} />
                    CALL AMBULANCE (108)
                  </a>
                  <button className="w-full py-3 text-danger font-bold hover:bg-danger/5 rounded-xl transition-all">
                    Find Nearest Hospital
                  </button>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-slate-400 text-xs">
                  Your location has been shared with emergency services to expedite assistance.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EmergencyAlert;
