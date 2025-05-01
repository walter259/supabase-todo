"use client";
import TaskForm from "@/components/TaskForm";
import { Button } from "@/components/ui/button";
import { supabase } from "@/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TaskList from "@/components/TaskList";
import { CheckCircle, Clock } from "lucide-react";
export default function Home() {
  const router = useRouter();
  const [showTaskDone, setShowTaskDone] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
      }
    };

    checkUser();
  }, [router]);

  return (
    <main>
      <div className="flex justify-between bg-primary w-full p-3 items-center">
        <p className="text-white">Tareas</p>
        <Button
          variant="secondary"
          onClick={() => supabase.auth.signOut()}
          className="cursor-pointer"
        >
          Salir
        </Button>
      </div>
      <div className="flex">
        <TaskForm />
      </div>

      <header className="flex justify-center mt-6 items-center gap-2">
        <span>{showTaskDone ? "Tareas hechas" : "Tareas pendientes"}</span>
        <Button onClick={() => setShowTaskDone(!showTaskDone)} className="cursor-pointer">
        {showTaskDone ? <Clock className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
        </Button>
      </header>
      <TaskList done={showTaskDone} />
    </main>
  );
}
