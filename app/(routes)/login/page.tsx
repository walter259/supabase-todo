"use client";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/supabase/client";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: 'https://chipper-lollipop-cccd44.netlify.app'
        },
      });
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser(); // 👈 Aquí hacemos await
      if (!user) {
        router.push("/login");
      }
    };

    checkUser(); // 👈 Llamamos a la función async
  }, [router]);
  return (
    <div className="flex justify-center mt-2">
      <form action="" className="flex" onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          placeholder="youremail@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button>Send</Button>
      </form>
    </div>
  );
}
