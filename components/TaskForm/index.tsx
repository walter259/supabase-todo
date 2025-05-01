import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useTask } from "@/context/TaskContext";
import { Loader2, Plus } from "lucide-react";

export default function TaskForm() {
  const [taskName, setTaskName] = useState("");
  const { createTask, adding } = useTask();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(adding);
    createTask(taskName);
    setTaskName("");
  };
  return (
    <div className="flex justify-center w-full mt-4">
      <form action="" onSubmit={handleSubmit} className="flex gap-1">
        <Input
          type="text"
          name="taskName"
          placeholder="Escribe una tarea"
          onChange={(e) => setTaskName(e.target.value)}
          value={taskName}
         className="w-full sm:max-w-md rounded-none"  
         required
        />
        <Button disabled={adding} className="rounded-none">
          {adding ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus/>}
        </Button>
      </form>
    </div>
  );
}
