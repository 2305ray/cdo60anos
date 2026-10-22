"use client";

import { useNow } from "@/hooks/use-now";
import { CONTENT } from "@/lib/content";
import { FORM_URL, LOTE1 } from "@/lib/event-data";
import { EXTERNAL } from "@/lib/links";
import { daysLeft, noticeText } from "@/lib/lote-notice";

/**
 * Faixa dourada do topo: "1º lote termina em N dias".
 * Some sozinha quando o lote acaba ou é fechado à mão (`fechado: true` em event-data.ts).
 * `buildTime` evita diferença de hidratação; depois de montar, a conta usa o relógio do visitante.
 */
export function NoticeBar({ buildTime }: { buildTime: number }) {
  const now = useNow(buildTime);
  const days = LOTE1.fechado ? -1 : daysLeft(LOTE1.fim, now);
  const text = noticeText(days, CONTENT.aviso);
  if (!text) return null;

  return (
    <div
      role="status"
      className="flex min-h-10 flex-wrap items-center justify-center gap-x-3 gap-y-1 bg-gold px-4 py-1.5 text-center text-[13.5px] leading-tight font-bold text-navy-900 sm:text-[15px]"
    >
      <span aria-hidden="true" className="size-2.5 shrink-0 animate-ping-dot rounded-full bg-destructive shadow-[0_0_0_0_color-mix(in_srgb,var(--color-destructive)_70%,transparent)]" />
      {/* key: remonta o texto quando o número muda, para o Google Tradutor traduzir de novo */}
      <span key={days}>{text}</span>
      <a
        href={FORM_URL}
        {...EXTERNAL}
        className="rounded-md px-1.5 py-0.5 font-extrabold whitespace-nowrap underline decoration-2 underline-offset-3 transition-colors hover:bg-navy-900 hover:text-gold hover:no-underline"
      >
        {CONTENT.aviso.cta} →
      </a>
    </div>
  );
}
