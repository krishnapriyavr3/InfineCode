import { useTaskContext } from '../context/TaskContext';

export default function FilterSection() {
  const { filter, setFilter, tasks } = useTaskContext();

  const completedCount = tasks.filter((t) => t.status === 'Completed').length;
  const pendingCount = tasks.filter((t) => t.status === 'Pending').length;

  const filterOption = (value: 'All' | 'Completed' | 'Pending', label: string, count: number, activeColor: string) => {
    const isActive = filter === value;
    return (
      <button
        type="button"
        onClick={() => setFilter(value)}
        className={`w-full flex items-center justify-between p-3 rounded-xl border text-sm font-semibold transition-all ${
          isActive 
            ? `${activeColor} border-current shadow-sm` 
            : 'bg-white border-slate-100 hover:bg-slate-50/80 text-slate-600 hover:text-slate-800'
        }`}
      >
        <span>{label}</span>
        <span className={`text-xs px-2 py-0.5 rounded-full ${isActive ? 'bg-white/30' : 'bg-slate-100 text-slate-500'}`}>
          {count}
        </span>
      </button>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 mb-6 border border-slate-200/80">
      <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">View Matrix</h2>
      <div className="space-y-2">
        {filterOption('All', '📋 All Commitments', tasks.length, 'bg-indigo-600 text-white border-indigo-600')}
        {filterOption('Pending', '⏳ Remaining Tasks', pendingCount, 'bg-amber-500 text-white border-amber-500')}
        {filterOption('Completed', '✅ Logged Complete', completedCount, 'bg-emerald-600 text-white border-emerald-600')}
      </div>
    </div>
  );
}