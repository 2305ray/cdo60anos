"use client";

import { useState } from "react";
import { PhoneIcon, PinIcon } from "./icons";
import { CONTENT } from "@/lib/content";
import { GROUP_COLORS, HOTEL_FILTER_GROUPS, HOTELS, hotelLinks, type HotelGroup } from "@/lib/event-data";
import { cn } from "@/lib/cn";

const VENUE = { pos: [345, 175] as const, nome: "ADC Eletropaulo", endereco: "Rua Peixe Vivo, 155, Jardim Santa Helena" };

export function HotelMap() {
  const t = CONTENT.hotels;
  const [filter, setFilter] = useState<HotelGroup | "all">("all");
  const [selected, setSelected] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | "venue" | null>(null);

  const visible = (g: HotelGroup) => filter === "all" || filter === g;
  const active = hovered ?? selected;
  const tip =
    active === null
      ? null
      : active === "venue"
        ? { key: "venue", nome: VENUE.nome, dist: t.venueDist, endereco: VENUE.endereco, x: VENUE.pos[0], y: VENUE.pos[1] }
        : {
            key: String(active),
            nome: HOTELS[active].nome,
            dist: `~${HOTELS[active].dist} km`,
            endereco: HOTELS[active].endereco,
            x: HOTELS[active].pos[0],
            y: HOTELS[active].pos[1],
          };

  const toggle = (i: number) => setSelected((s) => (s === i ? null : i));

  return (
    <div className="hotels-layout">
      <div>
        <div className="map-filter-bar">
          {HOTEL_FILTER_GROUPS.map((group) => {
            const count = group === "all" ? HOTELS.length : HOTELS.filter((h) => h.group === group).length;
            return (
              <button
                key={group}
                type="button"
                className="map-filter-btn"
                aria-pressed={filter === group}
                onClick={() => {
                  setFilter(group);
                  setSelected(null);
                }}
              >
                {group !== "all" && <span className="map-filter-dot" style={{ background: GROUP_COLORS[group] }} />}
                {t.filters[group]}
                <span className="map-filter-count">{count}</span>
              </button>
            );
          })}
        </div>

        <div className="hotel-map-wrap">
          <svg viewBox="0 0 800 520" role="img" aria-label={t.mapLabel}>
            <defs>
              <filter id="mshadow" x="-40%" y="-40%" width="180%" height="180%">
                <feDropShadow dx="0" dy="2" stdDeviation="3.5" floodColor="rgba(0,0,0,.28)" />
              </filter>
              <filter id="vshadow" x="-60%" y="-60%" width="220%" height="220%">
                <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="rgba(245,197,0,.55)" />
                <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="rgba(0,0,0,.3)" />
              </filter>
            </defs>
            <image href="/map-base.svg" width="800" height="520" />

            {HOTELS.map((h, i) =>
              visible(h.group) ? (
                <g
                  key={h.nome}
                  style={{ cursor: "pointer" }}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => toggle(i)}
                >
                  <circle
                    cx={h.pos[0]}
                    cy={h.pos[1]}
                    r={selected === i ? 16 : 13}
                    fill={GROUP_COLORS[h.group]}
                    stroke={selected === i ? "#FFC93C" : "white"}
                    strokeWidth={selected === i ? 3.5 : 2.5}
                    filter="url(#mshadow)"
                  />
                  <text x={h.pos[0]} y={h.pos[1] + 4.5} textAnchor="middle" fontSize="11" fontWeight="800" fill="white">
                    {i + 1}
                  </text>
                </g>
              ) : null,
            )}

            <g style={{ cursor: "pointer" }} onMouseEnter={() => setHovered("venue")} onMouseLeave={() => setHovered(null)}>
              <circle cx={VENUE.pos[0]} cy={VENUE.pos[1]} r="20" fill="#FFC93C" opacity="0.25" />
              <circle cx={VENUE.pos[0]} cy={VENUE.pos[1]} r="16" fill="#FFC93C" stroke="#0A1C5E" strokeWidth="3" filter="url(#vshadow)" />
              <text x={VENUE.pos[0]} y={VENUE.pos[1] + 5} textAnchor="middle" fontSize="15" fill="#0A1C5E">
                ★
              </text>
              <g transform="translate(362,159)">
                <rect width="96" height="22" rx="6" fill="#0A1C5E" stroke="#FFC93C" strokeWidth="1.5" />
                <text x="48" y="15" textAnchor="middle" fontSize="10" fontWeight="800" fill="#FFC93C" letterSpacing="0.06em">
                  ADC ELETROPAULO
                </text>
              </g>
            </g>
          </svg>

          {tip && (
            <div
              key={tip.key}
              className="map-tooltip"
              style={{ left: `${(tip.x / 800) * 100}%`, top: `${(tip.y / 520) * 100}%` }}
            >
              <strong>{tip.nome}</strong>
              <div className="tt-dist">{tip.dist}</div>
              <div className="tt-addr">{tip.endereco}</div>
            </div>
          )}
        </div>

        <div className="legend">
          {(["green", "orange", "red"] as const).map((g) => (
            <span key={g}>
              <span className="map-filter-dot" style={{ background: GROUP_COLORS[g] }} />
              {t.filters[g]}
            </span>
          ))}
        </div>
      </div>

      <div className="hotel-list">
        <div className="hotel-list-title">{t.listTitle}</div>
        <div className="hotel-list-scroll">
          {HOTELS.map((h, i) => {
            if (!visible(h.group)) return null;
            const links = hotelLinks(h);
            return (
              <div
                key={h.nome}
                className={cn("hotel-item", selected === i && "selected")}
                onClick={() => toggle(i)}
              >
                <div className="hotel-badge" style={{ background: GROUP_COLORS[h.group] }}>
                  {i + 1}
                </div>
                <div>
                  <div className="hotel-top">
                    <span className="hotel-name notranslate" translate="no">
                      {h.nome}
                    </span>
                    <span className="hotel-dist">~{h.dist} km</span>
                  </div>
                  <div className="hotel-addr">{h.endereco}</div>
                  <div className="hotel-actions" onClick={(e) => e.stopPropagation()}>
                    <a href={links.tel} aria-label={`${t.call}: ${h.telefone}`}>
                      <PhoneIcon size={13} />
                      <span dir="ltr">{h.telefone}</span>
                    </a>
                    <a href={links.rota} target="_blank" rel="noopener">
                      <PinIcon size={13} />
                      {t.route}
                    </a>
                    <a className="bk" href={links.booking} target="_blank" rel="noopener">
                      {t.booking}
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
