import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  MapPin, 
  FileText, 
  Phone, 
  Settings,
  PlusCircle,
  HelpCircle,
  LogOut,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CommunityWorker = () => {
  const navigate = useNavigate();

  const actions = [
    { 
      icon: PlusCircle, 
      label: 'New Patient Triage', 
      color: 'bg-primary', 
      desc: 'Start health checkup for a patient',
      path: '/chat'
    },
    { 
      icon: Users, 
      label: 'Patient Registry', 
      color: 'bg-success', 
      desc: 'Manage your assigned patient list',
      path: '/dashboard'
    },
    { 
      icon: MapPin, 
      label: 'Find Nearest PHC', 
      color: 'bg-warning', 
      desc: 'Get hospital locations & directions',
      path: '/dashboard'
    },
    { 
      icon: Phone, 
      label: 'Emergency SOS', 
      color: 'bg-danger', 
      desc: 'Quick call for ambulance or doctor',
      path: '#'
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Worker Header */}
      <header className="bg-white px-6 py-6 border-b-2 border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="flex items-center justify-between max-w-5xl mx-auto w-full">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Users size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-none mb-1">Worker Portal</h1>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
                Active Session
              </p>
            </div>
          </div>
          <button className="p-3 bg-slate-100 rounded-2xl text-slate-500 hover:bg-slate-200 transition-all">
            <Settings size={24} />
          </button>
        </div>
      </header>

      <main className="flex-1 p-6 max-w-5xl mx-auto w-full space-y-6">
        {/* Welcome Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-[2.5rem] shadow-xl border-b-4 border-slate-200"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-4xl font-black text-slate-900 leading-tight">Welcome, <br/>Sunita Sharma</h2>
            <div className="w-20 h-20 bg-slate-100 rounded-full border-4 border-white shadow-lg overflow-hidden">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sunita" alt="Worker" />
            </div>
          </div>
          <div className="flex gap-3">
            <div className="bg-success/10 text-success px-4 py-2 rounded-xl text-sm font-black flex items-center gap-2">
              <ShieldCheck size={18} />
              VERIFIED WORKER
            </div>
          </div>
        </motion.div>

        {/* Action Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {actions.map((action, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => action.path !== '#' && navigate(action.path)}
              className="bg-white p-8 rounded-[2.5rem] shadow-lg border-b-8 border-slate-200 active:translate-y-2 active:border-b-0 transition-all flex flex-col items-start text-left group"
            >
              <div className={`w-20 h-20 ${action.color} text-white rounded-3xl flex items-center justify-center mb-6 shadow-2xl shadow-slate-200 group-hover:scale-110 transition-transform`}>
                <action.icon size={40} strokeWidth={3} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2 leading-tight">{action.label}</h3>
              <p className="text-slate-500 font-bold leading-snug">{action.desc}</p>
            </motion.button>
          ))}
        </div>

        {/* Secondary Options */}
        <div className="grid grid-cols-1 gap-4">
          {[
            { icon: FileText, label: 'Download Field Reports' },
            { icon: HelpCircle, label: 'Worker Training Guide' },
            { icon: LogOut, label: 'Log Out of System', danger: true },
          ].map((opt, i) => (
            <button 
              key={i}
              className={`w-full bg-white p-6 rounded-3xl flex items-center justify-between shadow-md border-b-4 border-slate-200 active:translate-y-1 active:border-b-0 transition-all ${opt.danger ? 'text-danger' : 'text-slate-700'}`}
            >
              <div className="flex items-center gap-4">
                <opt.icon size={24} strokeWidth={3} />
                <span className="text-xl font-black">{opt.label}</span>
              </div>
              <ChevronRight size={24} />
            </button>
          ))}
        </div>
      </main>

      {/* Offline Status Footer */}
      <footer className="p-8 text-center text-slate-400">
        <p className="text-xs font-black uppercase tracking-widest">
          Secure Health Management System v2.4.0
        </p>
      </footer>
    </div>
  );
};

export default CommunityWorker;
