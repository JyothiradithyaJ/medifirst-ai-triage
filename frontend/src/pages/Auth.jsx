import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { 
  HeartPulse, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck,
  Smartphone,
  Check
} from 'lucide-react';
import useStore from '../store/useStore';
import toast from 'react-hot-toast';
import { getApiError } from '../api/apiClient';
import { loginUser, registerUser } from '../api/authApi';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  
  const navigate = useNavigate();
  const { setAuth } = useStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get('name') || 'MediFirst User',
      email: formData.get('email'),
      password: formData.get('password'),
      role: 'patient',
    };

    try {
      const data = isLogin
        ? await loginUser(payload)
        : await registerUser(payload);

      setAuth({ user: data.user, token: data.token });
      toast.success(isLogin ? 'Welcome back!' : 'Account created successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(getApiError(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-success/5 rounded-full blur-[100px] -ml-48 -mb-48" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <HeartPulse size={24} />
            </div>
            <span className="text-2xl font-black text-slate-900 tracking-tight">HealthAI</span>
          </Link>
          <h1 className="text-3xl font-black text-slate-900 mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-slate-500 font-medium">
            {isLogin ? 'Login to access your health dashboard' : 'Join thousands of users prioritizing health'}
          </p>
        </div>

        <motion.div
          layout
          className="bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden"
        >
          <form onSubmit={handleSubmit} className="p-8 md:p-10">
            <AnimatePresence mode="wait">
              {!isOtpSent ? (
                <motion.div
                  key="form-fields"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  {!isLogin && (
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                      <input 
                        type="text" 
                        name="name"
                        required 
                        placeholder="John Doe" 
                        className="input"
                      />
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-slate-700 ml-1">
                      {isLogin ? 'Email or Mobile' : 'Mobile Number'}
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        {isLogin ? <Mail size={20} /> : <Smartphone size={20} />}
                      </div>
                      <input 
                        type="email"
                        name="email"
                        required 
                        placeholder="name@email.com"
                        className="input pl-12"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        <Lock size={20} />
                      </div>
                      <input 
                        name="password"
                        type={showPassword ? "text" : "password"} 
                        required 
                        placeholder="••••••••" 
                        className="input pl-12 pr-12"
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  {isLogin && (
                    <div className="flex items-center justify-end">
                      <button type="button" className="text-sm font-bold text-primary hover:underline">
                        Forgot Password?
                      </button>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="otp-field"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6 text-center"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto">
                    <ShieldCheck size={32} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-1">Verify Mobile</h3>
                    <p className="text-sm text-slate-500">Enter the 6-digit code sent to your phone</p>
                  </div>
                  <div className="flex justify-between gap-2">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <input
                        key={i}
                        type="text"
                        maxLength="1"
                        className="w-full h-12 text-center text-xl font-black rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                    ))}
                  </div>
                  <p className="text-xs text-slate-400">
                    Didn't receive code? <button type="button" className="text-primary font-bold">Resend</button>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              type="submit" 
              disabled={isLoading}
              className="btn btn-primary w-full mt-10 h-14 relative overflow-hidden group"
            >
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div 
                    key="loading"
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </motion.div>
                ) : (
                  <motion.div 
                    key="text"
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    {isLogin ? 'Login' : 'Create Account'}
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </form>

          <div className="p-6 bg-slate-50 border-t border-slate-100 text-center">
            <p className="text-slate-600 text-sm font-medium">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <button 
                onClick={() => {
                  setIsLogin(!isLogin);
                  setIsOtpSent(false);
                }}
                className="text-primary font-bold hover:underline"
              >
                {isLogin ? 'Sign up' : 'Login'}
              </button>
            </p>
          </div>
        </motion.div>

        <div className="mt-10 flex items-center justify-center gap-8 text-slate-400">
          <div className="flex items-center gap-2">
            <Check size={16} className="text-success" />
            <span className="text-xs font-bold uppercase tracking-widest">Medical Trust</span>
          </div>
          <div className="flex items-center gap-2">
            <Check size={16} className="text-success" />
            <span className="text-xs font-bold uppercase tracking-widest">Data Secure</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
