import type { Task } from '../types/index';
import { useTaskContext } from '../context/TaskContext';

interface TaskCardProps {
  task: Task;
  onEdit?: (task: Task) => void;
}

export default function TaskCard({ task, onEdit }: TaskCardProps) {
  const { deleteTask, updateTask } = useTaskContext();

  const toggleStatus = () => {
    const newStatus = task.status === 'Pending' ? 'Completed' : 'Pending';
    updateTask(task.id, { status: newStatus });
  };

  const handleDelete = () => {
    if (window.confirm(`Delete task: "${task.name}"?`)) {
      deleteTask(task.id);
    }
  };

  const priorityStyles = {
    Low: 'bg-sky-50 text-sky-700 border-sky-100',
    Medium: 'bg-amber-50 text-amber-700 border-amber-100',
    High: 'bg-rose-50 text-rose-700 border-rose-100',
  };

  const isCompleted = task.status === 'Completed';

  return (
    <div
      className={`
        bg-white rounded-2xl shadow-sm p-6 border-l-4 transition-all duration-300
        ${isCompleted ? 'border-l-emerald-500 bg-slate-50/60 opacity-80' : 'border-l-indigo-600'}
        hover:shadow-md hover:-translate-y-0.5 group relative overflow-hidden
      `}
    >
      <div className="flex justify-between items-start gap-4 mb-3">
        <h3
          className={`text-lg font-bold tracking-tight transition-all duration-200 ${
            isCompleted ? 'line-through text-slate-400' : 'text-slate-800'
          }`}
        >
          {task.name}
        </h3>
        <span className={`px-2.5 py-0.5 text-xs rounded-full font-bold border shrink-0 ${priorityStyles[task.priority]}`}>
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p className={`text-sm mb-4 leading-relaxed ${isCompleted ? 'text-slate-400' : 'text-slate-600'}`}>
          {task.description}
        </p>
      )}

      <div className="flex justify-between items-center text-xs text-slate-400 font-medium mb-5 pb-4 border-b border-slate-100">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-bold ${
            isCompleted ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
          }`}
        >
          {isCompleted ? '✅ Finished' : '⏳ In Progress'}
        </span>
        <span className="font-mono">{new Date(task.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
      </div>

      {/* Sleek Minimalist Action row */}
      <div className="flex items-center gap-2 justify-end opacity-90 group-hover:opacity-100 transition-opacity">
        <button
          onClick={toggleStatus}
          className={`mr-auto text-xs font-bold px-3 py-2 rounded-xl border transition-all duration-200 ${
            isCompleted
              ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
              : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
          }`}
        >
          {isCompleted ? '↩️ Make Pending' : '✓ Done'}
        </button>

        {onEdit && (
          <button
            onClick={() => onEdit(task)}
            className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-xl transition-colors"
            title="Edit Task"
          >
            ✏️
          </button>
        )}

        <button
          onClick={handleDelete}
          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
          title="Delete Task"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}