"use client";

import { useSyncExternalStore } from "react";

// Relógio compartilhado: um único setInterval para todos os componentes que precisam da hora atual
let now = typeof window === "undefined" ? 0 : Date.now();
const listeners = new Set<() => void>();
let timer: ReturnType<typeof setInterval> | undefined;

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!timer) {
    timer = setInterval(() => {
      now = Date.now();
      listeners.forEach((l) => l());
    }, 30_000);
  }
  return () => {
    listeners.delete(listener);
    if (!listeners.size && timer) {
      clearInterval(timer);
      timer = undefined;
    }
  };
}

/**
 * Hora atual, atualizada a cada 30s. No servidor (e na hidratação) usa `serverNow`,
 * então o HTML gerado bate com o primeiro render do navegador.
 */
export function useNow(serverNow: number) {
  return useSyncExternalStore(
    subscribe,
    () => now,
    () => serverNow,
  );
}
