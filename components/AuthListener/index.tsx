// app/components/AuthListener.tsx (o en donde prefieras)
"use client";

import { useAuthListener } from "@/hooks/useAuthListener"; // Ajusta el path si es necesario

export default function AuthListener() {
  useAuthListener();
  return null; // No renderiza nada visible
}
