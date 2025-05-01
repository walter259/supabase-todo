// TaskCard.tsx
import React from "react";

// Importas el tipo Task si quieres (opcional pero recomendado)
import { Task, useTask } from "@/context/TaskContext";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { CheckSquare, RotateCcw, Trash2 } from "lucide-react";

// Definimos las props que recibe
interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const { deleteTask, updateTask } = useTask();
  const handleDelete = () => {
    deleteTask(task.id);
  };

  const handleToggleDone = () => {
    updateTask(task.id, { done: !task.done });
  };
  return (
    <Card className="p-4 border rounded mb-2 grid grid-cols-[3fr_1fr] items-center w-full md:w-[400px]">
      <div className="">
        <h1 className="text-2xl">{task.name}</h1>
        <p className="text-muted-foreground">
          {task.done ? "Completado" : "Pendiente"}
        </p>
      </div>

      <div className="flex gap-2 justify-center">
        <Button variant="destructive" onClick={handleDelete}>
          <Trash2 className="w-4 h-4" />
        </Button>
        <Button onClick={handleToggleDone}>
          {task.done ? (
            <RotateCcw className="w-4 h-4 cursor-pointer" /> // Icono para deshacer
          ) : (
            <CheckSquare className="w-4 h-4 cursor-pointer" /> // Icono para marcar como hecho
          )}
        </Button>
      </div>
    </Card>
  );
}
