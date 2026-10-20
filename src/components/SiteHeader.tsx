"use client";

import { useEffect, useState } from "react";
import { LanguageMenu } from "./LanguageMenu";
import { CONTENT, NAV } from "@/lib/content";
import { FORM_URL, LOTE1_FIM } from "@/lib/event-data";
import { cn } from "@/lib/cn";

const DAY = 86_400_000;
const BRT_OFFSET = 3 * 3_600_000;
const END = new Date(LOTE1_FIM).getTime();

// Dias de calendário (horário de Brasília) até o fim do 1º lote: 0 = hoje é o último dia
function daysLeft(now: number) {
  if (now > END) return -1;
  const day = (t: number) => Math.floor((t - BRT_OFFSET) / DAY);
  return day(END) - day(now);
}

function noticeText(days: number) {
  if (days < 0) return null;
  if (days === 0) return CONTENT.aviso.hoje;
  if (days === 1) return CONTENT.aviso.amanha;
  return CONTENT.aviso.dias(days);
}

// `buildTime` evita diferença de hidratação; depois de montar, a contagem usa o relógio do visitante
export function SiteHeader({ buildTime }: { buildTime: number }) {
  const [days, setDays] = useState(() => daysLeft(buildTime));
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const update = () => setDays(daysLeft(Date.now()));
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const close = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);

  const notice = noticeText(days);

  return (
    <div className="top-stack">
      {notice && (
        <div className="notice" role="status">
          <span className="notice-dot" aria-hidden="true" />
          {/* key: remonta o texto quando o número muda, para o Google Tradutor traduzir de novo */}
          <span key={days}>{notice}</span>
          <a href={FORM_URL} target="_blank" rel="noopener">
            {CONTENT.aviso.cta} →
          </a>
        </div>
      )}
      <header className="site-header">
        <div className="wrap bar">
          <a className="brand" href="#top">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/logo.webp" alt="Cordão de Ouro Capoeira" width={42} height={45} />
            <span className="notranslate" translate="no">DIA DE OURO</span>
          </a>
          <nav className="main" aria-label="Menu">
            {NAV.map((n) => (
              <a key={n.href} href={n.href}>
                {n.label}
              </a>
            ))}
          </nav>
          <LanguageMenu />
          <a className="btn btn-gold btn-sm top-cta" href="#inscricao">
            {CONTENT.ctaTop}
          </a>
          <button
            type="button"
            className={cn("hamburger", open && "is-open")}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        <nav id="mobile-menu" className={cn("mobile-menu", open && "is-open")} aria-label="Menu" inert={!open}>
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)}>
              {n.label}
            </a>
          ))}
          <a className="btn btn-gold" href="#inscricao" onClick={() => setOpen(false)}>
            {CONTENT.ctaTop}
          </a>
        </nav>
      </header>
    </div>
  );
}
