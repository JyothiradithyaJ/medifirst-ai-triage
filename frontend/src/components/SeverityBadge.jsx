import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const severityConfig = {
  low: {
    color: 'bg-success/10 text-success border-success/20',
    icon: CheckCircle2,
    label: 'Low Risk',
    glow: 'shadow-success/20',
  },
  medium: {
    color: 'bg-warning/10 text-warning border-warning/20',
    icon: AlertTriangle,
    label: 'Medium Risk',
    glow: 'shadow-warning/20',
  },
  high: {
    color: 'bg-danger/10 text-danger border-danger/20',
    icon: AlertCircle,
    label: 'High Risk',
    glow: 'shadow-danger/20',
  },
  critical: {
    color: 'bg-danger text-white border-danger shadow-lg animate-pulse',
    icon: ShieldAlert,
    label: 'CRITICAL',
    glow: 'shadow-danger/40',
  },
};

const SeverityBadge = ({ severity = 'low', className }) => {
  const config = severityConfig[severity] || severityConfig.low;
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={twMerge(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-all duration-300 shadow-sm',
        config.color,
        config.glow,
        className
      )}
    >
      <Icon size={14} className={severity === 'critical' ? 'animate-bounce' : ''} />
      <span>{config.label}</span>
    </motion.div>
  );
};

export default SeverityBadge;
