import { useTaskContext } from '../context/TaskContext';

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useTaskContext();

  return (
    <div className="relative mb-6">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 text-sm">
        🔍
      </div>
      <input
        id="search"
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Filter through search indices..."
        className="w-full pl-10 pr-12 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 text-sm shadow-sm placeholder-slate-400 text-slate-800 transition-all"
      />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery('')}
          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs font-bold text-slate-400 hover:text-slate-700 transition-colors"
        >
          Clear
        </button>
      )}
    </div>
  );
}