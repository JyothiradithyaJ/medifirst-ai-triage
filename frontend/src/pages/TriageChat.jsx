import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Send, 
  Mic, 
  ArrowLeft, 
  MoreVertical, 
  Info, 
  Sparkles,
  ChevronDown,
  User,
  Bot
} from 'lucide-react';
import useStore from '../store/useStore';
import ChatBubble from '../components/ChatBubble';
import SeverityBadge from '../components/SeverityBadge';
import EmergencyAlert from '../components/EmergencyAlert';

const BodyMap = ({ onSelect }) => {
  const [selectedPart, setSelectedPart] = useState(null);

  const bodyParts = [
    { id: 'head', label: 'Head', path: 'M50,15 A10,10 0 1,1 50,35 A10,10 0 1,1 50,15' },
    { id: 'chest', label: 'Chest', path: 'M40,35 L60,35 L65,60 L35,60 Z' },
    { id: 'stomach', label: 'Stomach', path: 'M35,60 L65,60 L60,80 L40,80 Z' },
    { id: 'leftArm', label: 'Left Arm', path: 'M35,35 L20,60 L25,65 L40,40 Z' },
    { id: 'rightArm', label: 'Right Arm', path: 'M65,35 L80,60 L75,65 L60,40 Z' },
    { id: 'leftLeg', label: 'Left Leg', path: 'M40,80 L35,115 L45,115 L48,80 Z' },
    { id: 'rightLeg', label: 'Right Leg', path: 'M60,80 L65,115 L55,115 L52,80 Z' },
  ];

  const handleClick = (part) => {
    setSelectedPart(part.id);
    onSelect(part.label);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <div className="relative w-48 h-72">
        <svg viewBox="0 0 100 120" className="w-full h-full">
          {bodyParts.map((part) => (
            <motion.path
              key={part.id}
              d={part.path}
              fill={selectedPart === part.id ? '#2563eb' : '#e2e8f0'}
              stroke="#cbd5e1"
              strokeWidth="0.5"
              whileHover={{ fill: '#93c5fd', cursor: 'pointer' }}
              onClick={() => handleClick(part)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          ))}
        </svg>
      </div>
      <p className="text-sm font-bold text-slate-500">Tap the area where you feel pain</p>
    </div>
  );
};

const TriageChat = () => {
  const navigate = useNavigate();
  const { messages, addMessage, isRuralMode } = useStore();
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showBodyMap, setShowBodyMap] = useState(false);
  const [isEmergencyAlertOpen, setIsEmergencyAlertOpen] = useState(false);
  
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        addMessage({ 
          text: "Hello! I'm your AI health assistant. How are you feeling today?", 
          isAI: true 
        });
        setIsTyping(false);
      }, 1000);
    }
  }, []);

  const handleSend = (text = inputText) => {
    if (!text.trim()) return;

    addMessage({ text, isAI: false });
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let response = "I understand. Could you tell me more about when this started?";
      
      if (text.toLowerCase().includes('chest pain') || text.toLowerCase().includes('heart')) {
        setIsEmergencyAlertOpen(true);
        response = "I'm detecting signs of a serious condition. Please look at the emergency alert on your screen immediately.";
      } else if (text.toLowerCase().includes('head')) {
        response = "Headaches can have many causes. Do you have any fever or sensitivity to light?";
      }

      addMessage({ text: response, isAI: true });
      setIsTyping(false);
    }, 2000);
  };

  const handleBodyPartSelect = (label) => {
    setShowBodyMap(false);
    handleSend(`I have pain in my ${label.toLowerCase()}.`);
  };

  return (
    <div className="flex flex-col h-screen bg-white md:bg-slate-50 overflow-hidden">
      {/* Header */}
      <header className="flex-shrink-0 bg-white border-b border-slate-100 px-4 md:px-6 py-4 flex items-center justify-between z-20 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-50 rounded-full text-slate-500">
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <Bot size={22} />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-success border-2 border-white rounded-full" />
            </div>
            <div>
              <h1 className="font-black text-slate-800 text-sm md:text-base leading-tight tracking-tight">Health Assistant</h1>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-success rounded-full" />
                <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-tighter">AI Online</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-50 text-slate-500 rounded-lg text-xs font-bold hover:bg-slate-100">
            <Info size={14} />
            Help
          </button>
          <button className="p-2 hover:bg-slate-50 rounded-full text-slate-500">
            <MoreVertical size={20} />
          </button>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-hidden flex flex-col max-w-4xl mx-auto w-full relative">
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 scroll-smooth"
        >
          {messages.map((msg) => (
            <ChatBubble key={msg.id} message={msg.text} isAI={msg.isAI} />
          ))}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start gap-3"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-1 border border-primary/20">
                <Bot size={18} />
              </div>
              <div className="bg-white border border-slate-100 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1 items-center">
                <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity }} className="w-1.5 h-1.5 bg-primary rounded-full" />
                <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
                <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
              </div>
            </motion.div>
          )}
        </div>

        {/* Floating Actions */}
        <AnimatePresence>
          {showBodyMap && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="absolute inset-0 bg-white/95 backdrop-blur-sm z-30 flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <h3 className="font-black text-xl">Interactive Body Map</h3>
                <button onClick={() => setShowBodyMap(false)} className="p-2 bg-slate-100 rounded-full">
                  <ChevronDown size={24} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <BodyMap onSelect={handleBodyPartSelect} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input Area */}
        <div className="bg-white md:bg-transparent md:p-6 flex-shrink-0">
          <div className="max-w-3xl mx-auto w-full">
            {/* Smart Suggestions */}
            {!showBodyMap && messages.length < 5 && (
              <div className="flex gap-2 overflow-x-auto pb-4 px-4 md:px-0 scrollbar-hide">
                {[
                  "Fever", "Headache", "Stomach Pain", "Cough", "Interactive Body Map"
                ].map((s, i) => (
                  <button 
                    key={i}
                    onClick={() => s === "Interactive Body Map" ? setShowBodyMap(true) : handleSend(s)}
                    className="flex-shrink-0 px-4 py-2 bg-white rounded-full border border-slate-200 text-xs md:text-sm font-bold text-slate-600 hover:border-primary hover:text-primary transition-all shadow-sm active:scale-95"
                  >
                    {s === "Interactive Body Map" && <Sparkles size={14} className="inline mr-1 text-warning" />}
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div className="bg-white border-t md:border border-slate-200 md:rounded-3xl shadow-xl p-3 md:p-4 flex items-center gap-3">
              <button 
                onClick={() => setShowBodyMap(true)}
                className="p-3 bg-slate-50 text-slate-500 rounded-2xl hover:bg-slate-100 transition-all"
                title="Body Map"
              >
                <User size={24} />
              </button>
              
              <div className="flex-1 relative">
                <input 
                  type="text" 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={isRuralMode ? "Speak or type here..." : "Describe your symptoms..."}
                  className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-5 pr-14 outline-none focus:ring-2 focus:ring-primary/10 text-base md:text-lg transition-all"
                />
                <button 
                  onClick={() => handleSend()}
                  disabled={!inputText.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center disabled:opacity-30 transition-all shadow-lg shadow-primary/20"
                >
                  <Send size={18} />
                </button>
              </div>

              <button className="p-4 bg-primary/10 text-primary rounded-2xl hover:bg-primary/20 transition-all animate-pulse">
                <Mic size={28} />
              </button>
            </div>
            
            <div className="hidden md:flex justify-between px-4 mt-4">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1">
                <ShieldCheck size={10} className="text-success" />
                Your data is encrypted
              </p>
              <button 
                onClick={() => navigate('/result')}
                className="text-xs text-primary font-black hover:underline"
              >
                SKIP TO RESULTS
              </button>
            </div>
          </div>
        </div>
      </main>

      <EmergencyAlert isOpen={isEmergencyAlertOpen} onClose={() => setIsEmergencyAlertOpen(false)} />
    </div>
  );
};

// Simplified ShieldCheck icon for local use if needed
const ShieldCheck = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export default TriageChat;
