import { TaskProvider, useTaskContext } from './context/TaskContext';
import Header from './components/Header';
import FilterSection from './components/FilterSection';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import SearchBar from './components/SearchBar';
import StatsDashboard from './components/StatsDashboard';
import './App.css';

function AppContent() {
  const { loading, error } = useTaskContext();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <p className="font-semibold text-red-800">Error</p>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-center gap-3">
            <div className="animate-spin text-2xl">⏳</div>
            <p className="text-blue-700 font-semibold">Loading tasks...</p>
          </div>
        )}

        {/* Statistics Dashboard */}
        <StatsDashboard />

        {/* Search Bar */}
        <SearchBar />

        {/* Create Task Form */}
        <TaskForm />

        {/* Filter Section */}
        <FilterSection />

        {/* Task List */}
        <TaskList />
      </main>
    </div>
  );
}

function App() {
  return (
    <TaskProvider>
      <AppContent />
    </TaskProvider>
  );
}

export default App;