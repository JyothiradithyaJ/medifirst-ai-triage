import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  MessageSquare, 
  Zap, 
  MapPin, 
  Mic, 
  ChevronRight,
  Activity,
  HeartPulse,
  Users,
  CheckCircle
} from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <HeartPulse size={24} />
            </div>
            <span className="text-xl font-black text-slate-900 tracking-tight">HealthAI</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-600">
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-primary transition-colors">How it Works</a>
            <Link to="/auth" className="btn-primary px-6 py-2.5 text-sm">Login / Signup</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10" />
        
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-slate-100 mb-8"
          >
            <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">AI-Powered Healthcare for everyone</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-6 max-w-4xl mx-auto"
          >
            Smart <span className="text-primary">Triage</span> & Rural Healthcare <span className="text-success">Assistant</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Experience medical-grade AI symptom checking, emergency detection, and community health support, even in the most remote areas.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/auth" className="btn btn-primary w-full sm:w-auto px-10">
              Get Started for Free
              <ChevronRight size={20} />
            </Link>
            <a href="#how-it-works" className="btn btn-secondary w-full sm:w-auto px-10">
              How it works
            </a>
          </motion.div>

          {/* Hero Illustration Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-20 relative max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border-8 border-white"
          >
            <div className="aspect-video bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
              <div className="text-white flex flex-col items-center gap-4">
                <Activity size={80} className="text-primary animate-pulse" />
                <span className="text-xl font-bold opacity-50 italic">AI Health Dashboard Preview</span>
              </div>
            </div>
            
            {/* Floating UI Elements */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-10 left-10 p-4 bg-white rounded-2xl shadow-xl border border-slate-100 hidden md:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center text-success">
                  <ShieldCheck size={20} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Status</p>
                  <p className="text-sm font-black text-slate-800 tracking-tight">Condition Normal</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-4">Powerful Features</h2>
          <p className="text-slate-500 mb-16 max-w-2xl mx-auto">Designed to be accessible, reliable, and fast across all network conditions.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                icon: MessageSquare, 
                title: "AI Triage", 
                desc: "Intelligent symptom checking with medical-grade accuracy.",
                color: "bg-primary/10 text-primary"
              },
              { 
                icon: Zap, 
                title: "Emergency Detection", 
                desc: "Real-time alerts for critical health conditions.",
                color: "bg-danger/10 text-danger"
              },
              { 
                icon: MapPin, 
                title: "Nearby PHCs", 
                desc: "Find and navigate to the nearest health centers.",
                color: "bg-success/10 text-success"
              },
              { 
                icon: Mic, 
                title: "Voice Assistant", 
                desc: "Speak in your local language to get health advice.",
                color: "bg-warning/10 text-warning"
              }
            ].map((f, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="p-8 rounded-3xl border border-slate-100 bg-slate-50 text-left group transition-all duration-300 hover:shadow-xl hover:bg-white"
              >
                <div className={`w-14 h-14 ${f.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <f.icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-left">
              <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">Simple process, <br/>smarter results.</h2>
              <div className="space-y-8">
                {[
                  { step: "01", title: "Chat with AI", desc: "Describe your symptoms naturally or use our body map." },
                  { step: "02", title: "Instant Analysis", desc: "Our AI evaluates the severity and provides clear advice." },
                  { step: "03", title: "Take Action", desc: "Get hospital recommendations or recovery tips immediately." }
                ].map((s, i) => (
                  <div key={i} className="flex gap-6">
                    <span className="text-4xl font-black text-primary/20">{s.step}</span>
                    <div>
                      <h4 className="text-xl font-bold mb-1">{s.title}</h4>
                      <p className="text-slate-500">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex-1 relative">
              <div className="w-full aspect-square bg-primary/10 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-3xl" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="relative z-10 p-12 border-4 border-white border-dashed rounded-full"
              >
                <div className="w-full aspect-square bg-white rounded-full shadow-2xl flex items-center justify-center overflow-hidden">
                  <Users size={120} className="text-primary/10" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 pt-20 pb-10 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
                  <HeartPulse size={24} />
                </div>
                <span className="text-xl font-black tracking-tight">HealthAI</span>
              </div>
              <p className="text-slate-400 max-w-sm mb-6 leading-relaxed">
                Empowering communities with accessible healthcare technology. Your trusted companion for medical triage and support.
              </p>
              <div className="flex gap-4">
                <CheckCircle size={16} className="text-success" />
                <span className="text-xs text-slate-400 italic">Medical disclaimer: This AI is for triage and support, not a replacement for professional medical advice.</span>
              </div>
            </div>
            
            <div>
              <h5 className="font-bold mb-6">Company</h5>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-bold mb-6">Resources</h5>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">PHC Network</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support Center</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:row items-center justify-between gap-4 text-slate-500 text-xs">
            <p>© 2024 HealthAI Technologies. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white">Accessibility</a>
              <a href="#" className="hover:text-white">Emergency Disclaimer</a>
              <a href="#" className="hover:text-white">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[40] md:hidden w-[calc(100%-3rem)] max-w-xs">
        <Link to="/auth" className="btn btn-primary w-full shadow-2xl py-4">
          Start AI Triage Now
        </Link>
      </div>
    </div>
  );
};

export default Landing;
