"use client";

import { MapPinIcon, PhoneIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { NumberBadge } from "@/components/ui/number-badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { CONTENT } from "@/lib/content";
import { HOTEL_FILTER_GROUPS, HOTELS, hotelLinks, type HotelGroup } from "@/lib/event-data";
import { cn } from "@/lib/utils";
import { EXTERNAL } from "@/lib/links";

// Cor de cada faixa de distância (paleta: dist-near / dist-mid / dist-far)
const GROUP_TONE: Record<HotelGroup, { bg: string; fill: string }> = {
  green: { bg: "bg-dist-near", fill: "fill-dist-near" },
  orange: { bg: "bg-dist-mid", fill: "fill-dist-mid" },
  red: { bg: "bg-dist-far", fill: "fill-dist-far" },
};

const VENUE = { pos: [345, 175] as const, nome: "ADC Eletropaulo", endereco: "Rua Peixe Vivo, 155, Jardim Santa Helena" };

function Dot({ group }: { group: HotelGroup }) {
  return <span className={cn("size-2.5 shrink-0 rounded-full", GROUP_TONE[group].bg)} />;
}

export function HotelMap() {
  const t = CONTENT.hotels;
  const [filter, setFilter] = useState<HotelGroup | "all">("all");
  const [selected, setSelected] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | "venue" | null>(null);

  const visible = (g: HotelGroup) => filter === "all" || filter === g;
  const toggle = (i: number) => setSelected((s) => (s === i ? null : i));

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

  return (
    <div className="mt-[26px] grid items-start gap-6 lg:grid-cols-[1fr_380px]">
      <div>
        <ToggleGroup
          variant="pill"
          size="pill"
          value={[filter]}
          onValueChange={(value: string[]) => {
            if (!value[0]) return; // não deixa desmarcar tudo
            setFilter(value[0] as HotelGroup | "all");
            setSelected(null);
          }}
          className="mb-3.5 flex-wrap"
        >
          {HOTEL_FILTER_GROUPS.map((group) => {
            const count = group === "all" ? HOTELS.length : HOTELS.filter((h) => h.group === group).length;
            return (
              <ToggleGroupItem key={group} value={group}>
                {group !== "all" && <Dot group={group} />}
                {t.filters[group]}
                <span className="rounded-full bg-navy px-1.5 text-xs font-extrabold text-white">{count}</span>
              </ToggleGroupItem>
            );
          })}
        </ToggleGroup>

        <Card variant="outline" className="relative aspect-[800/520] bg-sand">
          <svg viewBox="0 0 800 520" role="img" aria-label={t.mapLabel} className="block size-full">
            <defs>
              <filter id="mshadow" x="-40%" y="-40%" width="180%" height="180%">
                <feDropShadow dx="0" dy="2" stdDeviation="3.5" floodColor="rgba(0,0,0,.28)" />
              </filter>
              <filter id="vshadow" x="-60%" y="-60%" width="220%" height="220%">
                <feDropShadow dx="0" dy="0" stdDeviation="5" floodOpacity="0.55" style={{ floodColor: "var(--color-gold)" }} />
                <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="rgba(0,0,0,.3)" />
              </filter>
            </defs>
            <image href="/map-base.svg" width="800" height="520" />

            {HOTELS.map((h, i) =>
              visible(h.group) ? (
                <g
                  key={h.nome}
                  className="cursor-pointer"
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => toggle(i)}
                >
                  <circle
                    cx={h.pos[0]}
                    cy={h.pos[1]}
                    r={selected === i ? 16 : 13}
                    className={cn(GROUP_TONE[h.group].fill, selected === i ? "stroke-gold" : "stroke-white")}
                    strokeWidth={selected === i ? 3.5 : 2.5}
                    filter="url(#mshadow)"
                  />
                  <text x={h.pos[0]} y={h.pos[1] + 4.5} textAnchor="middle" fontSize="11" fontWeight="800" fill="white">
                    {i + 1}
                  </text>
                </g>
              ) : null,
            )}

            <g className="cursor-pointer" onMouseEnter={() => setHovered("venue")} onMouseLeave={() => setHovered(null)}>
              <circle cx={VENUE.pos[0]} cy={VENUE.pos[1]} r="20" className="fill-gold" opacity="0.25" />
              <circle cx={VENUE.pos[0]} cy={VENUE.pos[1]} r="16" className="fill-gold stroke-navy" strokeWidth="3" filter="url(#vshadow)" />
              <text x={VENUE.pos[0]} y={VENUE.pos[1] + 5} textAnchor="middle" fontSize="15" className="fill-navy">
                ★
              </text>
              <g transform="translate(362,159)">
                <rect width="96" height="22" rx="6" className="fill-navy stroke-gold" strokeWidth="1.5" />
                <text x="48" y="15" textAnchor="middle" fontSize="10" fontWeight="800" className="fill-gold" letterSpacing="0.06em">
                  ADC ELETROPAULO
                </text>
              </g>
            </g>
          </svg>

          {tip && (
            <div
              key={tip.key}
              className="pointer-events-none absolute z-[5] max-w-60 min-w-44 -translate-x-1/2 -translate-y-[calc(100%+22px)] rounded-xl border-2 border-gold bg-white px-3.5 py-2.5 text-navy shadow-lg shadow-navy/25"
              style={{ left: `${(tip.x / 800) * 100}%`, top: `${(tip.y / 520) * 100}%` }}
            >
              <strong className="block text-[15px] leading-tight">{tip.nome}</strong>
              <div className="my-0.5 text-[13px] font-extrabold text-gold-600">{tip.dist}</div>
              <div className="text-[12.5px] leading-snug text-navy-500">{tip.endereco}</div>
            </div>
          )}
        </Card>

        <div className="mt-3.5 flex flex-wrap gap-[18px] text-sm text-muted-foreground">
          {(["green", "orange", "red"] as const).map((g) => (
            <span key={g} className="inline-flex items-center gap-2">
              <Dot group={g} />
              {t.filters[g]}
            </span>
          ))}
        </div>
      </div>

      <Card variant="outline">
        <div className="border-b-2 px-[18px] py-3 text-[13px] font-bold text-muted-foreground">{t.listTitle}</div>
        <div className="max-h-[560px] overflow-y-auto">
          {HOTELS.map((h, i) => {
            if (!visible(h.group)) return null;
            const links = hotelLinks(h);
            return (
              <div
                key={h.nome}
                onClick={() => toggle(i)}
                className={cn(
                  "grid cursor-pointer grid-cols-[auto_1fr] gap-3 border-b px-[18px] py-3.5 transition-colors last:border-b-0 hover:bg-background",
                  selected === i && "bg-gold/20 shadow-[inset_4px_0_0_var(--color-gold-400)]",
                )}
              >
                <NumberBadge variant="plain" size="sm" className={GROUP_TONE[h.group].bg}>
                  {i + 1}
                </NumberBadge>
                <div className="min-w-0">
                  <div className="flex items-baseline justify-between gap-2.5">
                    <span translate="no" className="notranslate leading-tight font-extrabold">
                      {h.nome}
                    </span>
                    <span className="text-sm font-bold whitespace-nowrap text-muted-foreground">~{h.dist} km</span>
                  </div>
                  <div className="mt-0.5 text-sm leading-snug text-muted-foreground">{h.endereco}</div>
                  <div className="mt-2.5 flex flex-wrap gap-1.5" onClick={(e) => e.stopPropagation()}>
                    <Button
                      render={<a href={links.tel} aria-label={`${t.call}: ${h.telefone}`} />}
                      nativeButton={false}
                      variant="subtle"
                      size="sm"
                    >
                      <PhoneIcon />
                      <span dir="ltr">{h.telefone}</span>
                    </Button>
                    <Button
                      render={<a href={links.rota} {...EXTERNAL} />}
                      nativeButton={false}
                      variant="subtle"
                      size="sm"
                    >
                      <MapPinIcon />
                      {t.route}
                    </Button>
                    <Button
                      render={<a href={links.booking} {...EXTERNAL} />}
                      nativeButton={false}
                      variant="booking"
                      size="sm"
                    >
                      {t.booking}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
