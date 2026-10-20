"use client";

import { useEffect, useState } from "react";
import { CONTENT } from "@/lib/content";
import { FORM_URL, LOTES, loteStatus } from "@/lib/event-data";
import { cn } from "@/lib/cn";

// O status de cada lote sai das datas em event-data.ts, então muda sozinho sem precisar republicar
export function Tickets({ buildTime }: { buildTime: number }) {
  const t = CONTENT.prices;
  const [now, setNow] = useState(buildTime);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="tickets">
      {LOTES.map((l) => {
        const status = loteStatus(l, now);
        const txt = t.lotes[l.id];
        return (
          <div
            key={`${l.id}-${status}`}
            className={cn(
              "ticket",
              l.destaque && status === "disponivel" && "best",
              status === "encerrado" && "off",
              status === "em-breve" && "soon",
            )}
          >
            <div className="ticket-tags">
              {l.destaque && status === "disponivel" && <span className="flag">{t.best}</span>}
              <span className={cn("flag", status === "disponivel" ? "ok" : status === "em-breve" ? "soon" : "muted")}>
                {t.status[status]}
              </span>
            </div>
            <h3>{txt.nome}</h3>
            <div className="d">{txt.prazo}</div>
            <div className="inc">{txt.inclui}</div>
            <div className="price">
              <small>R$</small>
              {l.preco}
            </div>
            {status === "disponivel" && (
              <a
                className={cn("btn", l.destaque ? "btn-navy" : "btn-gold")}
                href={FORM_URL}
                target="_blank"
                rel="noopener"
              >
                {t.lotCta}
              </a>
            )}
          </div>
        );
      })}
    </div>
  );
}
