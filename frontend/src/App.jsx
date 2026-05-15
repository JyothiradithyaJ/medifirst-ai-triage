import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import useStore from './store/useStore';

// Pages (Lazy Loaded)
const Landing = React.lazy(() => import('./pages/Landing'));
const Auth = React.lazy(() => import('./pages/Auth'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const TriageChat = React.lazy(() => import('./pages/TriageChat'));
const Result = React.lazy(() => import('./pages/Result'));
const CommunityWorker = React.lazy(() => import('./pages/CommunityWorker'));

// Components
import OfflineBanner from './components/OfflineBanner';
import RuralModeToggle from './components/RuralModeToggle';

const App = () => {
  const { isRuralMode, setOffline } = useStore();

  useEffect(() => {
    const handleOnline = () => setOffline(false);
    const handleOffline = () => setOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [setOffline]);

  return (
    <div className={isRuralMode ? 'rural-mode' : ''}>
      <Router>
        <OfflineBanner />
        
        <React.Suspense fallback={
          <div className="flex items-center justify-center h-screen bg-slate-50">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/chat" element={<TriageChat />} />
            <Route path="/result" element={<Result />} />
            <Route path="/worker" element={<CommunityWorker />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </React.Suspense>

        <Toaster position="top-right" />
        <RuralModeToggle />
      </Router>
    </div>
  );
};

export default App;
