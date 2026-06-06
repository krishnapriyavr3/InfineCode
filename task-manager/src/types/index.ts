export interface Task {
  id: string;
  name: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Pending' | 'Completed';
  createdAt: string;
}

export interface TaskContextType {
  
  tasks: Task[];
  filter: 'All' | 'Completed' | 'Pending';
  searchQuery: string;
  loading: boolean;
  error: string | null;
  

  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => Promise<void>;
  updateTask: (id: string, updatedTask: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  setFilter: (filter: 'All' | 'Completed' | 'Pending') => void;
  setSearchQuery: (query: string) => void;
  fetchTasks: () => Promise<void>;
}

export interface TaskStats {
  total: number;
  completed: number;
  pending: number;
  highPriority: number;
  mediumPriority: number;
  lowPriority: number;
}