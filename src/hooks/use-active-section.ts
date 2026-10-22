"use client";

import { useSyncExternalStore } from "react";
import { pickActiveSection } from "@/lib/active-section";

// Linha de referência logo abaixo do cabeçalho fixo (aviso + menu ≈ 110px) com uma folga
const OFFSET = 140;

function compute(ids: string[]) {
  const sections = ids.flatMap((id) => {
    const el = document.getElementById(id);
    return el ? [{ id, top: el.getBoundingClientRect().top + window.scrollY }] : [];
  });
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
  return pickActiveSection(sections, window.scrollY, OFFSET, atBottom);
}

/** Id da seção que está sendo lida agora (ou null no hero). Atualiza no scroll e no resize. */
export function useActiveSection(ids: string[]) {
  const key = ids.join(",");
  return useSyncExternalStore(
    // Avisa direto no scroll (sem requestAnimationFrame, que o navegador pausa em aba escondida).
    // É barato: o React só redesenha quando a seção ativa muda.
    (notify) => {
      window.addEventListener("scroll", notify, { passive: true });
      window.addEventListener("resize", notify);
      return () => {
        window.removeEventListener("scroll", notify);
        window.removeEventListener("resize", notify);
      };
    },
    () => compute(key.split(",")),
    () => null,
  );
}
