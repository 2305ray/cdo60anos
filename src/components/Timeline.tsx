"use client";

import { useEffect, useRef, useState } from "react";
import { CONTENT } from "@/lib/content";
import { cn } from "@/lib/cn";

export function Timeline() {
  const { items, prev, next } = CONTENT.history;
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [fill, setFill] = useState(0);
  const nodesRef = useRef<(HTMLButtonElement | null)[]>([]);
  const swipeX = useRef<number | null>(null);

  const go = (i: number) => {
    const j = Math.max(0, Math.min(items.length - 1, i));
    if (j === index) return;
    setAnimate(true);
    setIndex(j);
  };

  // barra azul acompanha o ano selecionado
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

  const rtl = () => document.documentElement.dir === "rtl";
  const item = items[index];

  return (
    <>
      <div className="tl-track">
        <div
          className="tl-rail"
          role="tablist"
          onKeyDown={(e) => {
            if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
            const forward = (e.key === "ArrowRight") !== rtl();
            const j = Math.max(0, Math.min(items.length - 1, index + (forward ? 1 : -1)));
            go(j);
            nodesRef.current[j]?.focus();
          }}
        >
          <div className="fill" style={{ width: fill }} />
          {items.map((it, i) => (
            <button
              key={it.year}
              ref={(el) => {
                nodesRef.current[i] = el;
              }}
              type="button"
              role="tab"
              className={cn("tl-node", i < index && "done")}
              aria-selected={i === index}
              aria-controls="tl-panel"
              tabIndex={i === index ? 0 : -1}
              onClick={() => go(i)}
            >
              <i />
              <b>{it.year}</b>
            </button>
          ))}
        </div>
      </div>

      <div
        id="tl-panel"
        role="tabpanel"
        key={index}
        className={cn("tl-panel", animate && "tl-anim")}
        onPointerDown={(e) => {
          swipeX.current = e.clientX;
        }}
        onPointerUp={(e) => {
          if (swipeX.current === null) return;
          const dx = e.clientX - swipeX.current;
          swipeX.current = null;
          if (Math.abs(dx) > 50) go(index + ((dx < 0) !== rtl() ? 1 : -1));
        }}
      >
        <div className="tl-media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.img} alt={item.title} className={cn(item.plain && "plain")} loading="lazy" />
        </div>
        <div className="tl-text">
          <div className="yr">{item.year}</div>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
          <div className="tl-ctrl">
            <button type="button" aria-label={prev} disabled={index === 0} onClick={() => go(index - 1)}>
              <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                <path d="M11 3 5 9l6 6" fill="none" stroke="currentColor" strokeWidth="2.5" />
              </svg>
            </button>
            <button type="button" aria-label={next} disabled={index === items.length - 1} onClick={() => go(index + 1)}>
              <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                <path d="m7 3 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.5" />
              </svg>
            </button>
            <span className="notranslate" translate="no">
              {index + 1} / {items.length}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
