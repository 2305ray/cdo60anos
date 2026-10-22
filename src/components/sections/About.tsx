import { DrumIcon, FootprintsIcon, GlobeIcon } from "lucide-react";
import { H2, Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { IconBox } from "@/components/ui/icon-box";
import { CONTENT } from "@/lib/content";

// ginga, ritmo e o mundo: um ícone para cada pilar, na mesma ordem de CONTENT.about.pillars
const PILLAR_ICONS = [FootprintsIcon, DrumIcon, GlobeIcon];

export function About() {
  const t = CONTENT.about;
  return (
    <Section id="evento" className="pattern-cdo">
      <div className="wrap">
        <div className="grid items-start gap-8 md:grid-cols-2 md:gap-14">
          <H2>{t.title}</H2>
          <div>
            {t.paragraphs.map((p) => (
              <p key={p} className="mb-4 max-w-[34em] text-[19px] text-muted-foreground">
                {p}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {t.pillars.map((p, i) => {
            const Icon = PILLAR_ICONS[i];
            return (
              <Card
                key={p.title}
                variant="feature"
                className="relative p-7 pt-8 transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/12"
              >
                <div className="rope-bg absolute inset-x-0 top-0 h-2" aria-hidden="true" />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-3 end-3 text-[110px] leading-none font-black text-gold/25 select-none"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <IconBox variant="solid" size="lg" className="mb-5">
                  {Icon && <Icon />}
                </IconBox>
                <h3 className="relative text-2xl leading-tight font-black">{p.title}</h3>
                <p className="relative mt-1.5 mb-5 font-medium text-muted-foreground">{p.tagline}</p>
                <ul className="relative mt-auto flex flex-wrap gap-2">
                  {p.items.map((item) => (
                    <li key={item}>
                      <Badge variant="chip" size="lg">
                        {item}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
