import { useTaskContext } from '../context/TaskContext';
import TaskCard from './TaskCard';
import EmptyState from './Emptystate';

export default function TaskList() {
  
  const { tasks, filter, searchQuery } = useTaskContext();

  
  const filteredByStatus = tasks.filter((task) => {
    if (filter === 'All') return true;
    if (filter === 'Pending') return task.status === 'Pending';
    if (filter === 'Completed') return task.status === 'Completed';
    return true;
  });

  
  const filteredTasks = filteredByStatus.filter((task) =>
    task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {filter === 'All' && '📋 All Tasks'}
        {filter === 'Pending' && '⏳ Pending Tasks'}
        {filter === 'Completed' && '✅ Completed Tasks'}
      </h2>

      {filteredTasks.length === 0 ? (
        <EmptyState
          message={
            filter === 'All'
              ? 'No tasks yet. Create one to get started!'
              : `No ${filter.toLowerCase()} tasks.`
          }
        />
      ) : (
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}