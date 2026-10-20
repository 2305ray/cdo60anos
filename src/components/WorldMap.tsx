"use client";

import { useEffect, useRef, useState } from "react";
import { CONTENT } from "@/lib/content";

const CONTINENTS = ["NA", "SA", "EU", "AF", "AS", "OC"] as const;
type Continent = (typeof CONTINENTS)[number];

type MapData = {
  countries: { k: Continent; d: string }[];
  pts: Record<Continent | "SP", [number, number]>;
};

// Os contornos dos países (~110 KB) vêm de /world-map.json só quando o mapa aparece na tela
export function WorldMap() {
  const t = CONTENT.world;
  const [data, setData] = useState<MapData | null>(null);
  const [sel, setSel] = useState<Continent | null>(null);
  const [drawn, setDrawn] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const arcsRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        fetch("/world-map.json")
          .then((r) => r.json())
          .then(setData)
          .catch(() => {});
      },
      { rootMargin: "300px" },
    );
    io.observe(svg);
    return () => io.disconnect();
  }, []);

  // anima os arcos quando o mapa entra na tela
  useEffect(() => {
    const g = arcsRef.current;
    if (!data || !g || drawn) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        g.querySelectorAll<SVGPathElement>(".arc").forEach((a, i) => {
          a.style.setProperty("--len", String(a.getTotalLength()));
          a.style.animationDelay = `${i * 0.18}s`;
          a.classList.add("draw");
        });
        setDrawn(true);
        io.disconnect();
      },
      { threshold: 0.35 },
    );
    io.observe(g.ownerSVGElement ?? g);
    return () => io.disconnect();
  }, [data, drawn]);

  const pick = (k: Continent) => setSel((s) => (s === k ? null : k));
  const sp = data?.pts.SP;

  return (
    <div className="mapbox">
      <svg ref={svgRef} viewBox="0 0 1000 520" role="img" aria-label={t.title}>
        <defs>
          <pattern id="gold" patternUnits="userSpaceOnUse" width="140" height="140">
            <image href="/img/gold-texture.jpg" width="140" height="140" />
          </pattern>
        </defs>
        {data && sp && (
          <>
            <g className="countries" data-sel={sel ?? undefined}>
              {data.countries.map((c, i) => (
                <path key={i} className="c" data-k={c.k} d={c.d} onClick={() => pick(c.k)} />
              ))}
            </g>
            <g ref={arcsRef}>
              {CONTINENTS.filter((k) => k !== "SA").map((k) => {
                const [x, y] = data.pts[k];
                const mx = (x + sp[0]) / 2;
                const my = Math.min(y, sp[1]) - 90;
                return <path key={k} className="arc" d={`M${x} ${y} Q${mx} ${my} ${sp[0]} ${sp[1]}`} />;
              })}
            </g>
            <g>
              {CONTINENTS.map((k, i) => (
                <g
                  key={k}
                  className="pin"
                  tabIndex={0}
                  role="button"
                  aria-label={t.continents[i]}
                  aria-pressed={sel === k}
                  transform={`translate(${data.pts[k][0]} ${data.pts[k][1]})`}
                  onClick={() => pick(k)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      pick(k);
                    }
                  }}
                >
                  <circle className="halo" r="6" />
                  <circle className="dot" r="6.5" />
                </g>
              ))}
              <g className="pin sp" transform={`translate(${sp[0]} ${sp[1]})`}>
                <circle className="halo" r="6" />
                <circle className="dot" r="7" />
              </g>
            </g>
          </>
        )}
      </svg>
      <div className="wcard" aria-live="polite">
        <svg className="globe" viewBox="0 0 24 24" width="38" height="38" aria-hidden="true">
          <circle cx="12" cy="12" r="10" fill="#FFC93C" stroke="#0A1C5E" strokeWidth="1.6" />
          <path
            d="M2 12h20M12 2c3 3 4.5 6.5 4.5 10S15 19 12 22M12 2C9 5 7.5 8.5 7.5 12S9 19 12 22"
            fill="none"
            stroke="#0A1C5E"
            strokeWidth="1.6"
          />
        </svg>
        {/* key: remonta o texto a cada troca para o Google Tradutor acompanhar */}
        <div key={sel ?? "all"}>
          <b>{sel ? t.continents[CONTINENTS.indexOf(sel)] : t.card}</b>
          <span>{sel ? t.present : t.hint}</span>
        </div>
      </div>
      <div className="cchips">
        {CONTINENTS.map((k, i) => (
          <button key={k} type="button" aria-pressed={sel === k} onClick={() => pick(k)}>
            {t.continents[i]}
          </button>
        ))}
      </div>
    </div>
  );
}
