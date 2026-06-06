import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Task, TaskContextType } from '../types/index';
import * as api from '../services/api';


const TaskContext = createContext<TaskContextType | undefined>(undefined);


export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  
  const [filter, setFilter] = useState<'All' | 'Completed' | 'Pending'>('All');
  
  const [searchQuery, setSearchQuery] = useState('');
  
  const [loading, setLoading] = useState(false);
  
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.fetchTasks();
      setTasks(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch tasks';
      setError(message);
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (task: Omit<Task, 'id' | 'createdAt'>) => {
    try {
      setError(null);
      const newTask = await api.createTask(task);
      setTasks([...tasks, newTask]);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to add task';
      setError(message);
      console.error('Error adding task:', err);
    }
  };

  const updateTask = async (id: string, updatedTask: Partial<Task>) => {
    try {
      setError(null);
      const updated = await api.updateTaskAPI(id, updatedTask);
      setTasks(tasks.map((task) => (task.id === id ? updated : task)));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update task';
      setError(message);
      console.error('Error updating task:', err);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      setError(null);
      await api.deleteTaskAPI(id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete task';
      setError(message);
      console.error('Error deleting task:', err);
    }
  };

  const value: TaskContextType = {
    tasks,
    filter,
    searchQuery,
    loading,
    error,
    addTask,
    updateTask,
    deleteTask,
    setFilter,
    setSearchQuery,
    fetchTasks,
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
}