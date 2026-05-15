import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, RefreshCw } from 'lucide-react';
import useStore from '../store/useStore';

const OfflineBanner = () => {
  const { isOffline } = useStore();

  return (
    <AnimatePresence>
      {isOffline && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-[100] bg-danger text-white py-2 px-4 flex items-center justify-center gap-3 shadow-lg"
        >
          <WifiOff size={18} className="animate-pulse" />
          <span className="font-medium text-sm">You are currently offline. Some features may be limited.</span>
          <button 
            onClick={() => window.location.reload()}
            className="flex items-center gap-1 bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg text-xs font-bold transition-all"
          >
            <RefreshCw size={12} />
            Retry
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OfflineBanner;
