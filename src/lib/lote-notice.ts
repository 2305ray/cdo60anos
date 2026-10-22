const DAY = 86_400_000;
const BRT_OFFSET = 3 * 3_600_000; // Brasília é UTC-3 (sem horário de verão)

/** Dias de calendário em Brasília até `end`: 0 = hoje é o último dia, -1 = já terminou. */
export function daysLeft(end: string | number, now: number): number {
  const endMs = typeof end === "number" ? end : new Date(end).getTime();
  if (now > endMs) return -1;
  const day = (t: number) => Math.floor((t - BRT_OFFSET) / DAY);
  return day(endMs) - day(now);
}

export type NoticeCopy = { dias: (n: number) => string; amanha: string; hoje: string };

/** Texto do aviso do topo, ou null quando o lote já acabou. */
export function noticeText(days: number, copy: NoticeCopy): string | null {
  if (days < 0) return null;
  if (days === 0) return copy.hoje;
  if (days === 1) return copy.amanha;
  return copy.dias(days);
}
