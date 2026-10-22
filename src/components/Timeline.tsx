"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { CONTENT } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Quando a barra de anos não cabe na tela (celular), mostra de que lado ainda tem conteúdo:
 * esmaecido + seta nas bordas e o aviso "deslize". Atualiza ao rolar e ao mudar o tamanho da tela.
 */
function useScrollEdges() {
  const ref = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: false, end: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      const pos = Math.abs(el.scrollLeft); // em RTL o scrollLeft é negativo
      setEdges({ start: pos > 4, end: pos < max - 4 });
    };
    // o ResizeObserver dispara logo ao começar a observar, então já mede a primeira vez
    const ro = new ResizeObserver(update);
    ro.observe(el);
    el.addEventListener("scroll", update, { passive: true });
    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", update);
    };
  }, []);

  const scrollBy = (direction: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const rtl = document.documentElement.dir === "rtl" ? -1 : 1;
    el.scrollBy({ left: direction * rtl * el.clientWidth * 0.7, behavior: "smooth" });
  };

  return { ref, edges, scrollBy };
}

/** Botão redondo de avançar/voltar a barra de anos (fica do lado de fora da barra). */
function EdgeButton({ label, disabled, onClick, children }: { label: string; disabled: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <Button
      variant="subtle"
      size="icon-lg"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="mt-[23px] size-9 shrink-0 self-start rounded-full disabled:opacity-30"
    >
      {children}
    </Button>
  );
}

export function Timeline() {
  const { items, prev, next, swipeHint, scrollBack, scrollForward } = CONTENT.history;
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [fill, setFill] = useState(0);
  const nodesRef = useRef<(HTMLButtonElement | null)[]>([]);
  const swipeX = useRef<number | null>(null);
  const { ref: trackRef, edges, scrollBy } = useScrollEdges();
  const scrollable = edges.start || edges.end;

  const go = (i: number) => {
    const j = Math.max(0, Math.min(items.length - 1, i));
    if (j === index) return;
    setAnimate(true);
    setIndex(j);
  };

  // a barra azul acompanha o ano selecionado
  useEffect(() => {
    const measure = () => {
      const first = nodesRef.current[0];
      const cur = nodesRef.current[index];
      if (!first || !cur) return;
      setFill(Math.abs(cur.offsetLeft + cur.offsetWidth / 2 - (first.offsetLeft + first.offsetWidth / 2)));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [index]);

  useEffect(() => {
    if (animate) nodesRef.current[index]?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [index, animate]);

  const isRtl = () => document.documentElement.dir === "rtl";
  const item = items[index];

  return (
    <>
      {/* setas ficam FORA da barra (não cobrem os anos); só aparecem quando a barra não cabe na tela */}
      <div className="mt-[34px] flex items-center gap-1.5">
        {scrollable && (
          <EdgeButton label={scrollBack} disabled={!edges.start} onClick={() => scrollBy(-1)}>
            <ChevronLeftIcon className="size-5 rtl:-scale-x-100" />
          </EdgeButton>
        )}
        <div className="relative min-w-0 flex-1">
          <div ref={trackRef} className="overflow-x-auto px-1 pt-2 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div
              role="tablist"
              className="tl-rail relative flex min-w-[760px] justify-between pt-1"
              onKeyDown={(e) => {
                if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
                const forward = (e.key === "ArrowRight") !== isRtl();
                const j = Math.max(0, Math.min(items.length - 1, index + (forward ? 1 : -1)));
                go(j);
                nodesRef.current[j]?.focus();
              }}
            >
              <div
                className="absolute start-[18px] top-6 h-2.5 rounded-full bg-navy-600 transition-[width] duration-450 ease-[cubic-bezier(.2,.9,.3,1)]"
                style={{ width: fill }}
              />
              {items.map((it, i) => {
                const selected = i === index;
                return (
                  <button
                    key={it.year}
                    ref={(el) => {
                      nodesRef.current[i] = el;
                    }}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls="tl-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => go(i)}
                    className="group/node relative z-[1] flex min-w-[72px] cursor-pointer flex-col items-center gap-2.5 px-1 text-muted-foreground transition-colors hover:text-navy-600"
                  >
                    <i
                      className={cn(
                        "mt-3 block size-[34px] rounded-full border-4 transition-[transform,background] duration-250",
                        !selected && "group-hover/node:scale-110",
                        selected
                          ? "scale-[1.35] border-navy bg-gold"
                          : i < index
                            ? "border-navy-600 bg-navy-600"
                            : "border-gold-600 bg-card",
                      )}
                    />
                    <b className={cn("text-[15px] font-extrabold whitespace-nowrap", selected && "text-foreground")}>{it.year}</b>
                  </button>
                );
              })}
            </div>
          </div>

          {/* esmaecido nas bordas, só do lado onde ainda tem ano escondido */}
          <div
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-y-0 start-0 w-10 bg-linear-to-r from-background to-transparent transition-opacity duration-200",
              edges.start ? "opacity-100" : "opacity-0",
            )}
          />
          <div
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-y-0 end-0 w-10 bg-linear-to-l from-background to-transparent transition-opacity duration-200",
              edges.end ? "opacity-100" : "opacity-0",
            )}
          />
        </div>
        {scrollable && (
          <EdgeButton label={scrollForward} disabled={!edges.end} onClick={() => scrollBy(1)}>
            <ChevronRightIcon className="size-5 rtl:-scale-x-100" />
          </EdgeButton>
        )}
      </div>

      {/* aviso de deslizar: aparece só quando a barra não cabe inteira na tela */}
      {scrollable && (
        <p className="mt-2 flex items-center justify-center gap-1.5 text-sm font-bold text-muted-foreground">
          <ChevronLeftIcon className="size-4 animate-pulse" aria-hidden="true" />
          {swipeHint}
          <ChevronRightIcon className="size-4 animate-pulse" aria-hidden="true" />
        </p>
      )}

      <div
        id="tl-panel"
        role="tabpanel"
        key={index}
        className={cn(
          "mt-[30px] grid touch-pan-y items-center gap-6 rounded-[28px] border-2 bg-card p-[clamp(20px,4vw,44px)] md:grid-cols-[1fr_1.1fr] md:gap-12",
          animate && "animate-slide-up",
        )}
        onPointerDown={(e) => {
          swipeX.current = e.clientX;
        }}
        onPointerUp={(e) => {
          if (swipeX.current === null) return;
          const dx = e.clientX - swipeX.current;
          swipeX.current = null;
          if (Math.abs(dx) > 50) go(index + ((dx < 0) !== isRtl() ? 1 : -1));
        }}
      >
        <div className="grid place-items-center md:min-h-[300px]">
          <Image
            src={item.img}
            alt={item.title}
            sizes="(min-width: 768px) 420px, 90vw"
            className={cn(
              "h-auto w-auto",
              item.plain
                ? "max-h-[260px] md:max-h-[300px]"
                : "max-h-[280px] -rotate-2 rounded-md bg-white p-2 shadow-xl shadow-navy/25 md:max-h-[380px]",
            )}
          />
        </div>
        <div>
          <div className="tl-year text-[clamp(64px,9vw,120px)] leading-[.9] font-black tracking-[-0.03em]">{item.year}</div>
          <h3 className="my-2.5 text-[clamp(24px,3vw,34px)] leading-tight font-black">{item.title}</h3>
          <p className="mb-6 max-w-[30em] text-lg text-muted-foreground">{item.text}</p>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon-lg" className="size-12 rounded-full border-2" aria-label={prev} disabled={index === 0} onClick={() => go(index - 1)}>
              <ChevronLeftIcon className="size-5 rtl:-scale-x-100" />
            </Button>
            <Button
              variant="outline"
              size="icon-lg"
              className="size-12 rounded-full border-2"
              aria-label={next}
              disabled={index === items.length - 1}
              onClick={() => go(index + 1)}
            >
              <ChevronRightIcon className="size-5 rtl:-scale-x-100" />
            </Button>
            <span translate="no" className="notranslate text-[15px] font-bold text-muted-foreground">
              {index + 1} / {items.length}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
