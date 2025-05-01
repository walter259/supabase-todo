"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation"; // 👈 También importamos usePathname
import { supabase } from "../supabase/client"; // Ajusta el path si necesitas

export function useAuthListener() {
  const router = useRouter();
  const pathname = usePathname(); // 👈 Saber en qué página estoy

  useEffect(() => {
    // Función para verificar sesión actual
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session && pathname !== "/login") {
        // Si NO hay sesión y NO estamos en /login, mandar a login
        router.push("/login");
      } 
      if (session && pathname === "/login") {
        // Si HAY sesión y estamos en login, mandar al home
        router.push("/");
      }
    };

    checkSession(); // Chequeamos sesión apenas inicia la app

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Evento de auth:", _event);
      console.log("Sesión:", session);

      if (!session) {
        router.push("/login");
      } else {
        router.push("/");
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [router, pathname]);
}
