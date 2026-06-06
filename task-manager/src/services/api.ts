import type { Task } from '../types/index';


const FAKE_DELAY = 800; 


const SIMULATE_NETWORK_ERRORS = false;

const INITIAL_TASKS: Task[] = [
  {
    id: 'task-1',
    name: 'Learn React Hooks',
    description: 'Understand useState, useEffect, useContext',
    priority: 'High',
    status: 'Completed',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'task-2',
    name: 'Build Task Manager',
    description: 'Create a full CRUD task management app',
    priority: 'High',
    status: 'Completed',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: 'task-3',
    name: 'Learn TypeScript',
    description: 'Understand interfaces and types',
    priority: 'Medium',
    status: 'Pending',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
];

const getLocalDatabase = (): Task[] => {
  const data = localStorage.getItem('student_task_db');
  if (!data) {
    localStorage.setItem('student_task_db', JSON.stringify(INITIAL_TASKS));
    return INITIAL_TASKS;
  }
  return JSON.parse(data);
};

const saveLocalDatabase = (db: Task[]) => {
  localStorage.setItem('student_task_db', JSON.stringify(db));
};


const handleMockNetworkGuard = (reject: (reason?: any) => void): boolean => {
  if (SIMULATE_NETWORK_ERRORS && Math.random() < 0.25) {
    reject(new Error('Network error: Gateway timeout fetching live data packets.'));
    return true;
  }
  return false;
};


export async function fetchTasks(): Promise<Task[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (handleMockNetworkGuard(reject)) return;

      const fakeDatabase = getLocalDatabase();
      console.log('📡 API: Fetching all tasks');
      resolve([...fakeDatabase]);
    }, FAKE_DELAY);
  });
}


export async function createTask(task: Omit<Task, 'id' | 'createdAt'>): Promise<Task> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (handleMockNetworkGuard(reject)) return;

      const fakeDatabase = getLocalDatabase();
      const newTask: Task = {
        ...task,
        id: `task-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        createdAt: new Date().toISOString(),
      };
      
      fakeDatabase.push(newTask);
      saveLocalDatabase(fakeDatabase);
      
      console.log('📡 API: Task created', newTask);
      resolve(newTask);
    }, FAKE_DELAY);
  });
}


export async function updateTaskAPI(id: string, updates: Partial<Task>): Promise<Task> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (handleMockNetworkGuard(reject)) return;

      const fakeDatabase = getLocalDatabase();
      const taskIndex = fakeDatabase.findIndex((t) => t.id === id);
      
      if (taskIndex === -1) {
        reject(new Error(`Task with id ${id} not found`));
        return;
      }
      
      const updatedTask = { ...fakeDatabase[taskIndex], ...updates };
      fakeDatabase[taskIndex] = updatedTask;
      saveLocalDatabase(fakeDatabase);
      
      console.log('📡 API: Task updated', updatedTask);
      resolve(updatedTask);
    }, FAKE_DELAY);
  });
}


export async function deleteTaskAPI(id: string): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (handleMockNetworkGuard(reject)) return;

      const fakeDatabase = getLocalDatabase();
      const index = fakeDatabase.findIndex((t) => t.id === id);
      
      if (index === -1) {
        reject(new Error(`Task with id ${id} not found`));
        return;
      }
      
      const deleted = fakeDatabase.splice(index, 1);
      saveLocalDatabase(fakeDatabase);
      
      console.log('📡 API: Task deleted', deleted[0]);
      resolve();
    }, FAKE_DELAY);
  });
}


export async function searchTasks(query: string): Promise<Task[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (handleMockNetworkGuard(reject)) return;

      const fakeDatabase = getLocalDatabase();
      const results = fakeDatabase.filter((task) =>
        task.name.toLowerCase().includes(query.toLowerCase()) ||
        task.description.toLowerCase().includes(query.toLowerCase())
      );
      
      console.log(`📡 API: Search for "${query}" returned ${results.length} results`);
      resolve(results);
    }, FAKE_DELAY);
  });
}


export async function getTaskStats(): Promise<{
  total: number;
  completed: number;
  pending: number;
  highPriority: number;
  mediumPriority: number;
  lowPriority: number;
}> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (handleMockNetworkGuard(reject)) return;

      const fakeDatabase = getLocalDatabase();
      const stats = {
        total: fakeDatabase.length,
        completed: fakeDatabase.filter((t) => t.status === 'Completed').length,
        pending: fakeDatabase.filter((t) => t.status === 'Pending').length,
        highPriority: fakeDatabase.filter((t) => t.priority === 'High').length,
        mediumPriority: fakeDatabase.filter((t) => t.priority === 'Medium').length,
        lowPriority: fakeDatabase.filter((t) => t.priority === 'Low').length,
      };
      
      console.log('📡 API: Stats retrieved', stats);
      resolve(stats);
    }, FAKE_DELAY);
  });
}