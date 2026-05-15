import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Activity, Pill, UserCheck } from 'lucide-react';
import SeverityBadge from './SeverityBadge';

const timelineEvents = [
  {
    id: 1,
    type: 'triage',
    title: 'Symptom Triage',
    date: 'Today, 10:45 AM',
    severity: 'medium',
    description: 'Mild fever and cough reported.',
    icon: Activity,
    color: 'text-primary',
  },
  {
    id: 2,
    type: 'medication',
    title: 'Medication Reminder',
    date: 'Today, 8:00 AM',
    description: 'Take Paracetamol 500mg after breakfast.',
    icon: Pill,
    color: 'text-success',
  },
  {
    id: 3,
    type: 'checkup',
    title: 'Follow-up Check',
    date: 'Yesterday, 4:20 PM',
    severity: 'low',
    description: 'Condition improved after rest.',
    icon: UserCheck,
    color: 'text-warning',
  },
];

const HealthTimeline = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <Calendar size={20} className="text-primary" />
          Health Timeline
        </h3>
        <button className="text-xs text-primary font-bold hover:underline">View All</button>
      </div>

      <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-slate-200">
        {timelineEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative flex items-start gap-6 pl-1"
          >
            <div className={`flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md border border-slate-100 z-10 ${event.color}`}>
              <event.icon size={20} />
            </div>

            <div className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-bold text-slate-800">{event.title}</h4>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">{event.date}</p>
                </div>
                {event.severity && <SeverityBadge severity={event.severity} />}
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                {event.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HealthTimeline;
