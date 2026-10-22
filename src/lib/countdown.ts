/**
 * Quebra o tempo até `target` em [dias, horas, minutos, segundos].
 * Dias sem zero à esquerda; o resto com dois dígitos. Retorna null quando o evento já começou.
 */
export function countdownParts(target: number, now: number): [string, string, string, string] | null {
  const d = target - now;
  if (d <= 0) return null;
  return [
    String(Math.floor(d / 864e5)),
    String(Math.floor(d / 36e5) % 24).padStart(2, "0"),
    String(Math.floor(d / 6e4) % 60).padStart(2, "0"),
    String(Math.floor(d / 1e3) % 60).padStart(2, "0"),
  ];
}
