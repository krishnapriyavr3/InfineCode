import { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';

export default function TaskForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');

  const { addTask } = useTaskContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert('Please enter a task name');
      return;
    }

    const newTask = {
      name: name.trim(),
      description: description.trim(),
      priority,
      status: 'Pending' as const,
    };

    addTask(newTask);
    setName('');
    setDescription('');
    setPriority('Medium');
  };

  const inputClass = "w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm transition-all placeholder-slate-400 text-slate-800";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-sm p-6 mb-8 border border-slate-200/80"
    >
      <h2 className="text-xl font-bold mb-5 text-slate-800 tracking-tight">Create New Task</h2>

      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
            Task Title <span className="text-rose-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="What needs to be done?"
            className={inputClass}
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
            Context / Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add some notes or details..."
            rows={3}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="priority" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
            Set Priority
          </label>
          <div className="relative">
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as 'Low' | 'Medium' | 'High')}
              className={`${inputClass} appearance-none cursor-pointer bg-no-repeat bg-right pr-10`}
            >
              <option value="Low">🟢 Low Priority</option>
              <option value="Medium">🟡 Medium Priority</option>
              <option value="High">🔴 High Priority</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
              ▼
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-xl shadow-sm hover:shadow transition-all duration-150 text-sm tracking-wide mt-2"
        >
          ✨ Save Task
        </button>
      </div>
    </form>
  );
}