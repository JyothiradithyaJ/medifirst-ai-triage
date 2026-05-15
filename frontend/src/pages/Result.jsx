import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Download, 
  Share2, 
  AlertCircle, 
  CheckCircle2, 
  MapPin, 
  Navigation,
  ShieldCheck,
  ChevronRight,
  Stethoscope,
  Pill,
  History
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer 
} from 'recharts';
import useStore from '../store/useStore';
import SeverityBadge from '../components/SeverityBadge';
import { getApiError } from '../api/apiClient';
import { downloadReportPdf, saveReport } from '../api/reportApi';
import toast from 'react-hot-toast';

const Result = () => {
  const navigate = useNavigate();
  const { isRuralMode, currentTriage } = useStore();
  const [isDownloading, setIsDownloading] = useState(false);

  const result = currentTriage || {
    symptoms: ['fever', 'cough'],
    symptoms_text: 'Fever and cough',
    severity_score: 65,
    severity_level: 'moderate',
    emergency_flag: false,
    recommendation: 'Visit a nearby PHC or clinic within 24 hours if symptoms continue.',
    precautions: [
      'Rest properly.',
      'Drink enough water.',
      'Visit a PHC if symptoms worsen.',
    ],
    suggested_care: 'Visit a nearby PHC or clinic within 24 hours if symptoms continue.',
  };

  const chartData = useMemo(() => {
    const risk = Math.min(result.severity_score || 0, 100);

    return [
      { name: 'Risk', value: risk },
      { name: 'Safe', value: 100 - risk },
    ];
  }, [result.severity_score]);

  const severityBadge = {
    low: 'low',
    moderate: 'medium',
    high: 'high',
    emergency: 'critical',
  }[result.severity_level] || 'low';

  const handleDownloadPdf = async () => {
    setIsDownloading(true);

    try {
      const report = await saveReport({
        symptoms_text: result.symptoms_text || result.symptoms?.join(', ') || 'Reported symptoms',
        selected_symptoms: result.symptoms || [],
        body_areas: result.body_areas || [],
        severity_score: result.severity_score,
        severity_level: result.severity_level,
        emergency_flag: result.emergency_flag,
        recommendation: result.recommendation,
        precautions: result.precautions || [],
        suggested_care: result.suggested_care,
        rural_mode: result.rural_mode || isRuralMode,
      });

      const blob = await downloadReportPdf(report.id);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');

      link.href = url;
      link.download = `medifirst-report-${report.id}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
      toast.success('PDF report downloaded');
    } catch (error) {
      toast.error(getApiError(error));
    } finally {
      setIsDownloading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-100 px-6 py-4 sticky top-0 z-30 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-50 rounded-full text-slate-500 transition-colors">
            <ArrowLeft size={20} />
          </button>
          <h1 className="font-black text-xl tracking-tight">Analysis Result</h1>
        </div>
        <div className="flex gap-2">
          <button className="p-2.5 bg-slate-50 text-slate-500 rounded-xl hover:bg-slate-100 transition-all">
            <Share2 size={20} />
          </button>
          <button
            onClick={handleDownloadPdf}
            disabled={isDownloading}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all active:scale-95 disabled:opacity-60"
          >
            <Download size={18} />
            <span className="hidden sm:inline">{isDownloading ? 'Preparing...' : 'Report PDF'}</span>
          </button>
        </div>
      </header>

      <motion.main 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto p-6 space-y-8"
      >
        {/* Severity Meter Section */}
        <motion.div variants={itemVariants} className="card p-8 flex flex-col md:row items-center gap-8">
          <div className="relative w-48 h-48 flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  startAngle={225}
                  endAngle={-45}
                  paddingAngle={0}
                  dataKey="value"
                  stroke="none"
                >
                  <Cell fill="#f59e0b" />
                  <Cell fill="#f1f5f9" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-4xl font-black text-slate-900 leading-none">{result.severity_score}%</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Severity Score</span>
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:row md:items-center gap-3 mb-4 justify-center md:justify-start">
              <SeverityBadge severity={severityBadge} className="text-sm px-4 py-1.5 w-fit mx-auto md:mx-0" />
              <span className="text-slate-400 font-bold text-xs uppercase tracking-tighter">Analyzed Today at 11:05 AM</span>
            </div>
            <h2 className="text-2xl font-black mb-3">{result.emergency_flag ? 'Emergency Priority' : 'Triage Recommendation'}</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              {result.recommendation}
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-500 bg-slate-100 px-4 py-2 rounded-xl">
                <AlertCircle size={16} className="text-warning" />
                {(result.symptoms || ['Symptoms']).slice(0, 1).join(', ')}
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-slate-500 bg-slate-100 px-4 py-2 rounded-xl">
                <CheckCircle2 size={16} className="text-success" />
                {result.suggested_care || 'Care suggested'}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* AI Advice */}
          <motion.div variants={itemVariants} className="card p-6 border-l-4 border-primary">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                <Stethoscope size={20} />
              </div>
              <h3 className="font-black text-lg">Recommended Steps</h3>
            </div>
            <ul className="space-y-4">
              {[
                result.recommendation,
                result.suggested_care,
                ...(result.precautions || []),
              ].map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-600">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center text-primary font-bold text-[10px]">
                    {i + 1}
                  </div>
                  {step}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Precautions */}
          <motion.div variants={itemVariants} className="card p-6 border-l-4 border-success">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-success/10 text-success rounded-xl flex items-center justify-center">
                <Pill size={20} />
              </div>
              <h3 className="font-black text-lg">Self-Care Tips</h3>
            </div>
            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-2xl">
                <p className="text-xs font-black text-slate-400 uppercase mb-2">Medication</p>
                <p className="text-sm text-slate-700">Standard OTC fever reducers like Paracetamol can be used. <span className="font-bold text-primary">Check dosage with a pharmacist.</span></p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl">
                <p className="text-xs font-black text-slate-400 uppercase mb-2">Isolation</p>
                <p className="text-sm text-slate-700">Wear a mask around family members to prevent potential spread.</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Nearby PHCs Section */}
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black">Nearby PHCs</h3>
            <button className="text-sm font-bold text-primary hover:underline flex items-center gap-1">
              View Map
              <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'Koramangala Health Center', dist: '1.2 km', open: true },
              { name: 'St. John’s Hospital', dist: '2.8 km', open: true }
            ].map((phc, i) => (
              <div key={i} className="card p-5 group hover:border-primary/30 transition-all cursor-pointer">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-primary border border-slate-100 group-hover:bg-primary group-hover:text-white transition-all">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">{phc.name}</h4>
                      <p className="text-xs text-slate-400 font-bold">{phc.dist} • Open Now</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 btn bg-slate-100 text-slate-700 py-2.5 text-sm hover:bg-slate-200">
                    Call
                  </button>
                  <button className="flex-1 btn btn-primary py-2.5 text-sm">
                    <Navigation size={16} />
                    Navigate
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Rural Friendly Options */}
        {isRuralMode && (
          <motion.div variants={itemVariants} className="bg-primary p-8 rounded-[2.5rem] text-white shadow-2xl">
            <h3 className="text-3xl font-black mb-4">Need help reading this?</h3>
            <p className="text-white/80 mb-8 text-lg">Tap below to hear the results in your local language.</p>
            <button className="w-full bg-white text-primary py-6 rounded-3xl font-black text-2xl shadow-xl active:scale-95 transition-all flex items-center justify-center gap-4">
              🔊 LISTEN TO RESULTS
            </button>
          </motion.div>
        )}

        {/* Footer Info */}
        <motion.div variants={itemVariants} className="text-center pt-8 border-t border-slate-200">
          <div className="inline-flex items-center gap-2 text-slate-400 mb-2">
            <ShieldCheck size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Medical Disclaimer</span>
          </div>
          <p className="text-[10px] text-slate-400 max-w-lg mx-auto leading-relaxed">
            This analysis is generated by AI based on your self-reported symptoms. It is NOT a professional diagnosis. If your condition worsens or you experience difficulty breathing, call emergency services immediately.
          </p>
        </motion.div>
      </motion.main>

      {/* Bottom Sticky Action */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-slate-100 md:hidden z-40">
        <button className="w-full btn btn-primary py-4 shadow-xl">
          <History size={20} />
          Save to My History
        </button>
      </div>
    </div>
  );
};

export default Result;
