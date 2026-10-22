import { GlobeIcon, ShieldCheckIcon } from "lucide-react";
import { H2, Section } from "@/components/layout/section";
import { Tickets } from "@/components/Tickets";
import { NumberBadge } from "@/components/ui/number-badge";
import { CONTENT } from "@/lib/content";

/** Valores e inscrição: passo a passo, aviso da camiseta e os lotes, tudo num lugar só. */
export function Registration({ buildTime }: { buildTime: number }) {
  const t = CONTENT.prices;
  return (
    <Section id="inscricao" className="bg-navy text-white">
      <div className="wrap">
        <H2>{t.title}</H2>
        <ol className="mt-7 mb-8 grid gap-4 md:grid-cols-3">
          {t.steps.map((s, i) => (
            <li key={s} className="flex items-center gap-3.5 rounded-2xl border border-white/12 bg-white/5 px-4 py-3.5 font-medium">
              <NumberBadge>{i + 1}</NumberBadge>
              {s}
            </li>
          ))}
        </ol>

        <div className="flex items-start gap-4 border-[1.5px] border-gold/40 bg-gold/8 px-6 py-5">
          <ShieldCheckIcon className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden="true" />
          <p className="text-[15px] leading-relaxed text-white/90">
            <strong className="text-gold">{t.shirtTitle}</strong> {t.shirtText}
          </p>
        </div>

        <Tickets buildTime={buildTime} />

        <p className="mt-6 flex items-start gap-2.5 text-[15px] text-navy-200">
          <GlobeIcon className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
          <span>
            <b className="text-white">{t.intlTitle}</b> {t.intlText}
          </span>
        </p>
      </div>
    </Section>
  );
}
