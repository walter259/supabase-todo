import { useTask } from "@/context/TaskContext";
import React, { useEffect } from "react";
import TaskCard from "../TaskCard";
import { Skeleton } from "../ui/skeleton";

interface TaskListProps{
  done: boolean;
}
export default function TaskList({done = false}:TaskListProps) {
  const { tasks, getTasks, loading } = useTask();

  useEffect(() => {
    getTasks(done);
  }, [done]);

  function renderTask() {
    if (loading) {
      return (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="p-4 border rounded mb-2">
              <Skeleton className="h-6 w-3/4 mb-2" /> {/* Simula el título */}
              <Skeleton className="h-4 w-1/4" /> {/* Simula el estado */}
            </div>
          ))}
        </div>
      );
    } else if (tasks.length === 0) {
      return <p className="text-center mt-20">No tasks found</p>;
    } else {
      return (
        <div className="mt-5 w-full flex flex-col items-center">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      );
    }
  }

  return <div>
    {renderTask()}
  </div>
}
