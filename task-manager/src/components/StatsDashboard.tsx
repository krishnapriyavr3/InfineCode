import { useState, useEffect } from 'react';
import { useTaskContext } from '../context/TaskContext';
import * as api from '../services/api';
import type { TaskStats } from '../types/index';

export default function StatsDashboard() {
  const { tasks } = useTaskContext();
  const [stats, setStats] = useState<TaskStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(false);
  const [statsError, setStatsError] = useState<string | null>(null);

  useEffect(() => {
    loadStats();
  }, [tasks]);

  const loadStats = async () => {
    try {
      setStatsLoading(true);
      setStatsError(null);
      const data = await api.getTaskStats();
      setStats(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load stats';
      setStatsError(message);
    } finally {
      setStatsLoading(false);
    }
  };

  if (statsLoading) {
    return (
      <div className="bg-slate-50/50 rounded-2xl p-6 mb-8 border border-slate-100 animate-pulse grid grid-cols-2 md:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-24 bg-slate-200/60 rounded-xl"></div>
        ))}
      </div>
    );
  }

  if (statsError) {
    return (
      <div className="bg-rose-50/50 rounded-2xl p-5 mb-8 border border-rose-100 flex items-center gap-3 text-rose-700">
        <span className="text-xl">⚠️</span>
        <p className="font-medium text-sm">{statsError}</p>
      </div>
    );
  }

  if (!stats) return null;

  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  const cardStyle = "bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-0.5";

  return (
    <div className="bg-slate-50/60 backdrop-blur-md rounded-2xl p-6 mb-8 border border-slate-200/60">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <span>📊</span> Performance Insights
        </h2>
        <button
          onClick={loadStats}
          className="p-2 text-slate-500 hover:text-indigo-600 rounded-xl hover:bg-white border border-transparent hover:border-slate-200 transition-all shadow-sm group"
          title="Refresh Stats"
        >
          <span className="inline-block group-hover:rotate-180 transition-transform duration-500 text-sm">🔄</span>
        </button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className={cardStyle}>
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Total Tasks</p>
          <p className="text-3xl font-black text-indigo-600 mt-1">{stats.total}</p>
        </div>

        <div className={`${cardStyle} border-l-4 border-l-emerald-500`}>
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">✅ Completed</p>
          <p className="text-3xl font-black text-emerald-600 mt-1">{stats.completed}</p>
        </div>

        <div className={`${cardStyle} border-l-4 border-l-amber-500`}>
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">⏳ Pending</p>
          <p className="text-3xl font-black text-amber-600 mt-1">{stats.pending}</p>
        </div>

        <div className={cardStyle}>
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">🔴 High Priority</p>
          <p className="text-3xl font-black text-rose-600 mt-1">{stats.highPriority}</p>
        </div>

        <div className={cardStyle}>
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">🟡 Medium</p>
          <p className="text-3xl font-black text-orange-500 mt-1">{stats.mediumPriority}</p>
        </div>

        <div className={cardStyle}>
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">🟢 Low</p>
          <p className="text-3xl font-black text-sky-600 mt-1">{stats.lowPriority}</p>
        </div>
      </div>

      {/* Modern Progress Tracking */}
      <div className="mt-6 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <p className="text-slate-700 font-bold text-sm tracking-tight">Project Completion Profile</p>
          <span className="text-xs font-black bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-200">
            {completionRate}% Complete
          </span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5 border border-slate-200/50">
          <div
            className="bg-gradient-to-r from-emerald-400 to-teal-500 h-full rounded-full transition-all duration-700 ease-out shadow-[0_0_12px_rgba(16,185,129,0.3)]"
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}