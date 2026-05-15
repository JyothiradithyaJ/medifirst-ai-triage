import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  MapPin, 
  Phone, 
  ChevronRight, 
  Activity, 
  TrendingUp, 
  History,
  AlertTriangle,
  HeartPulse,
  LogOut,
  Bell
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import useStore from '../store/useStore';
import SeverityBadge from '../components/SeverityBadge';
import HealthTimeline from '../components/HealthTimeline';
import CareCompanion from '../components/CareCompanion';

const data = [
  { name: 'Mon', value: 72 },
  { name: 'Tue', value: 75 },
  { name: 'Wed', value: 82 },
  { name: 'Thu', value: 78 },
  { name: 'Fri', value: 85 },
  { name: 'Sat', value: 90 },
  { name: 'Sun', value: 88 },
];

const Dashboard = () => {
  const { user, logout } = useStore();

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar - Hidden on mobile */}
      <aside className="hidden lg:flex w-72 bg-white border-r border-slate-100 flex-col">
        <div className="p-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <HeartPulse size={24} />
            </div>
            <span className="text-xl font-black text-slate-900 tracking-tight">HealthAI</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {[
            { icon: Activity, label: 'Overview', active: true },
            { icon: History, label: 'Triage History' },
            { icon: MapPin, label: 'Nearby PHCs' },
            { icon: Bell, label: 'Notifications' },
          ].map((item, i) => (
            <button
              key={i}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold transition-all ${
                item.active ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-6 mt-auto">
          <button 
            onClick={logout}
            className="w-full flex items-center gap-4 px-4 py-3.5 text-danger font-bold hover:bg-danger/5 rounded-2xl transition-all"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex items-center justify-between">
          <div className="lg:hidden flex items-center gap-2">
            <HeartPulse size={24} className="text-primary" />
            <span className="font-black">HealthAI</span>
          </div>

          <h1 className="hidden lg:block text-xl font-black">Medical Dashboard</h1>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search history..." 
                className="bg-slate-50 border-none rounded-xl pl-10 pr-4 py-2 text-sm w-64 focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-sm">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" alt="Avatar" />
            </div>
          </div>
        </header>

        <div className="p-6 max-w-7xl mx-auto w-full space-y-8">
          {/* Welcome Card */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 card bg-primary p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
              <div className="relative z-10">
                <h2 className="text-3xl font-black mb-2">Good morning, John!</h2>
                <p className="text-white/80 mb-8 max-w-md">Your health score is up by 5% this week. Keep maintaining a healthy routine!</p>
                <Link to="/chat" className="btn bg-white text-primary hover:bg-slate-50 w-fit">
                  <Plus size={20} />
                  Start New AI Triage
                </Link>
              </div>
            </div>

            <div className="card p-8 flex flex-col justify-center items-center text-center">
              <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center text-success mb-4 relative">
                <TrendingUp size={32} />
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 border-2 border-success rounded-full"
                />
              </div>
              <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-1">Health Score</p>
              <h3 className="text-4xl font-black text-slate-900">92/100</h3>
              <p className="text-success text-sm font-bold mt-2 flex items-center gap-1">
                +5.2% from last month
              </p>
            </div>
          </div>

          {/* Quick Actions & Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Chart */}
              <div className="card p-6">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="font-black text-lg">Symptom Trends</h3>
                    <p className="text-sm text-slate-500">Weekly health activity analysis</p>
                  </div>
                  <select className="bg-slate-50 border-none rounded-lg text-xs font-bold px-3 py-1.5 outline-none">
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                  </select>
                </div>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                      <YAxis hide />
                      <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                        itemStyle={{ fontWeight: 'bold', color: '#2563eb' }}
                      />
                      <Area type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* History */}
              <HealthTimeline />
            </div>

            <div className="space-y-8">
              {/* Emergency Quick Action */}
              <div className="card p-6 bg-danger/5 border-danger/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-danger text-white rounded-xl flex items-center justify-center shadow-lg shadow-danger/20">
                    <AlertTriangle size={20} />
                  </div>
                  <h3 className="font-black text-danger">Emergency SOS</h3>
                </div>
                <p className="text-sm text-slate-600 mb-6">In case of life-threatening emergency, use the quick SOS button.</p>
                <button className="w-full bg-danger text-white font-black py-4 rounded-2xl shadow-xl shadow-danger/20 active:scale-95 transition-all flex items-center justify-center gap-3">
                  <Phone size={20} />
                  ACTIVATE SOS
                </button>
              </div>

              {/* Nearby PHCs */}
              <div className="card p-6">
                <h3 className="font-black text-lg mb-6">Nearby PHCs</h3>
                <div className="space-y-4">
                  {[
                    { name: 'District Hospital', dist: '2.4 km', time: '10 min' },
                    { name: 'City Health Center', dist: '4.8 km', time: '18 min' },
                  ].map((phc, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors cursor-pointer group">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                          <MapPin size={18} />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-slate-800">{phc.name}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">{phc.dist} • {phc.time}</p>
                        </div>
                      </div>
                      <ChevronRight size={18} className="text-slate-300" />
                    </div>
                  ))}
                </div>
                <button className="w-full mt-6 py-3 text-sm font-bold text-primary hover:bg-primary/5 rounded-xl transition-all">
                  View map full screen
                </button>
              </div>

              {/* AI Care Companion */}
              <CareCompanion />
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Nav - Mobile only */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-4 flex items-center justify-between z-40">
        <button className="text-primary flex flex-col items-center gap-1">
          <Activity size={24} />
          <span className="text-[10px] font-bold uppercase">Home</span>
        </button>
        <Link to="/chat" className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-primary/30 -mt-12 border-4 border-white">
          <Plus size={28} />
        </Link>
        <button className="text-slate-400 flex flex-col items-center gap-1">
          <MapPin size={24} />
          <span className="text-[10px] font-bold uppercase">PHCs</span>
        </button>
      </nav>
    </div>
  );
};

export default Dashboard;
