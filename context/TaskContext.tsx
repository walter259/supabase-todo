"use client";

import { supabase } from "@/supabase/client";
import { createContext, ReactNode, useContext, useState } from "react";

// Definimos tipo de una Tarea
export interface Task {
  id: number;
  name: string;
  userId: string;
  done: boolean;
}

// Tipo del contexto
interface TaskContextType {
  tasks: Task[];
  getTasks: (done: boolean) => Promise<void>;
  createTask: (taskName: string) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  updateTask: (id: number, updateFields: Partial<Task>) => Promise<void>;
  adding: boolean;
  loading: boolean;
}

// Tipo del provider
interface TaskContextProviderProps {
  children: ReactNode;
}

// Creamos el contexto
export const TaskContext = createContext<TaskContextType>({
  tasks: [],
  getTasks: async () => {},
  createTask: async () => {},
  deleteTask: async () => {},
  updateTask: async () => {},
  adding: false,
  loading: false,
});

// Hook para consumir el contexto
export const useTask = () => {
  const context = useContext(TaskContext);
  return context;
};

// Provider
export const TaskContextProvider = ({ children }: TaskContextProviderProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  const getTasks = async (done = false) => {
    setLoading(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData.user?.id;
  
      if (!userId) {
        throw new Error("Usuario no autenticado");
      }
  
      const { data, error } = await supabase
        .from("task")
        .select()
        .eq("userId", userId)
        .eq("done", done)
        .order("id", { ascending: true });
      console.log(data)
      if (error) {
        console.error("Error fetching tasks:", error);
        throw error;
      }
  
      if (data) {
        setTasks(data as Task[]);
      }
    } catch (error) {
      console.error("Error en getTasks:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const createTask = async (taskName: string) => {
    setAdding(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from("task")
        .insert([{ name: taskName, userId: user?.id }])
        .select();

      if (error) throw error;

      if (data) {
        setTasks((prevTasks) => [...prevTasks, ...data]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setAdding(false);
    }
  };
  const deleteTask = async (id: number) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from("task")
        .delete()
        .eq("userId", user?.id)
        .eq("id", id);
      console.log(data);
      if (error) throw error;

      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const updateTask = async (id: number, updateFields: Partial<Task>) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from("task")
        .update(updateFields)
        .eq("userId", user?.id)
        .eq("id", id);
      console.log(data);

      if (error) throw error;

      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        getTasks,
        createTask,
        adding,
        loading,
        deleteTask,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
