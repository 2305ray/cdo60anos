"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNow } from "@/hooks/use-now";
import { CONTENT } from "@/lib/content";
import { FORM_URL, LOTES, loteStatuses } from "@/lib/event-data";
import { cn } from "@/lib/utils";
import { EXTERNAL } from "@/lib/links";

const STATUS_BADGE = { disponivel: "success", "em-breve": "info", encerrado: "muted", esgotado: "destructive-solid" } as const;

// O status de cada lote sai das datas (e da chave `fechado`) em event-data.ts
export function Tickets({ buildTime }: { buildTime: number }) {
  const t = CONTENT.prices;
  const statuses = loteStatuses(LOTES, useNow(buildTime));

  return (
    <div className="mt-[30px] grid gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
      {LOTES.map((l) => {
        const status = statuses[l.id];
        const txt = t.lotes[l.id];
        const best = l.destaque && status === "disponivel";
        return (
          <div
            key={`${l.id}-${status}`}
            className={cn(
              "ticket-cut flex flex-col gap-1 rounded-[18px] px-5 pt-[22px] pb-5 text-navy",
              best ? "bg-gold" : status === "em-breve" ? "bg-navy-100" : "bg-white",
              (status === "encerrado" || status === "esgotado") && "opacity-60",
            )}
          >
            <div className="mb-1.5 flex flex-wrap gap-1.5">
              {best && (
                <Badge variant="navy" size="md">
                  {t.best}
                </Badge>
              )}
              <Badge variant={STATUS_BADGE[status]} size="md">
                {t.status[status]}
              </Badge>
            </div>
            <h3 className="text-[22px] font-black">{txt.nome}</h3>
            <div className={cn("text-sm", best ? "text-gold-800" : "text-navy-500")}>{txt.prazo}</div>
            <div className={cn("mt-2 border-b-2 border-dashed pb-4 text-[15px]", best ? "border-navy/25" : "border-navy-200")}>
              {txt.inclui}
            </div>
            <div className="mt-3.5 flex items-start gap-1 text-[42px] leading-none font-black">
              <small className="mt-1.5 text-base">R$</small>
              {l.preco}
            </div>
            {status === "disponivel" && (
              <Button
                render={<a href={FORM_URL} {...EXTERNAL} />}
                nativeButton={false}
                variant={best ? "navy" : "gold"}
                size="cta"
                className="mt-4 w-full"
              >
                {t.lotCta}
              </Button>
            )}
          </div>
        );
      })}
    </div>
  );
}
