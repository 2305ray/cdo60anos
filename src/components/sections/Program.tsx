import { Eyebrow, H2, Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CONTENT } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Program() {
  const t = CONTENT.program;
  return (
    <Section id="programacao">
      <div className="wrap">
        <Eyebrow>{t.eyebrow}</Eyebrow>
        <H2>{t.title}</H2>
        {/* Enquanto `pronta` for false, os cards ficam apagados e desfocados, com "Em breve" no centro */}
        <div className="relative mt-[26px]">
          <div
            aria-hidden={!t.pronta}
            className={cn("grid items-start gap-5 md:grid-cols-3", !t.pronta && "pointer-events-none opacity-35 blur-[3px] select-none")}
          >
            {t.days.map((d) => (
              <Card key={d.num} variant="feature">
                <div className="relative border-b border-navy/10 bg-linear-135 from-navy/8 to-navy/2 px-6 py-5 before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:bg-gold">
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <div className="text-5xl leading-none font-black text-gold-600">{d.num}</div>
                      <div className="mt-1 text-xs font-bold tracking-[0.18em] text-navy/55 uppercase">{d.weekday}</div>
                    </div>
                    <Badge variant="gold" size="md" className="mb-1 text-[13px] font-extrabold">
                      {d.hours}
                    </Badge>
                  </div>
                </div>
                <ul className="px-6 py-4">
                  {d.activities.map((a) => (
                    <li key={a.name} className="flex gap-3.5 border-b border-navy/10 py-3 last:border-b-0">
                      <span className="min-w-14 pt-0.5 text-[13px] font-bold text-gold-600">{a.period}</span>
                      <div className="min-w-0">
                        <div className="leading-snug font-bold text-navy">{a.name}</div>
                        <div className="mt-0.5 text-sm text-navy/55">{a.desc}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
          {!t.pronta && (
            <div className="absolute inset-0 grid place-items-center">
              <span className="rotate-[-3deg] rounded-2xl border-[3px] border-navy bg-gold px-8 py-4 text-[clamp(28px,4vw,44px)] leading-none font-black text-navy-900 uppercase shadow-[6px_6px_0_var(--color-navy-800)]">
                {t.soon}
              </span>
            </div>
          )}
        </div>
        {t.pronta && <p className="mt-[18px] text-[15px] text-muted-foreground">{t.note}</p>}
      </div>
    </Section>
  );
}
