import Image from "next/image";
import { IMG } from "@/assets/images";
import { H2, Lead, Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { CONTENT } from "@/lib/content";
import { INSTAGRAM_URL } from "@/lib/event-data";
import { EXTERNAL } from "@/lib/links";

export function Masters() {
  const t = CONTENT.masters;
  return (
    <Section className="pattern-cdo">
      <div className="wrap grid items-center gap-8 md:grid-cols-2 md:gap-14">
        <div>
          <H2>{t.title}</H2>
          <Lead>{t.lead}</Lead>
          <Button render={<a href={INSTAGRAM_URL} {...EXTERNAL} />} nativeButton={false} variant="gold" size="cta" className="mt-6">
            {t.cta}
          </Button>
        </div>
        {/* logo dentro de um anel de "cordão dourado" */}
        <div className="mx-auto grid aspect-square w-full max-w-[340px] place-items-center rounded-full bg-[radial-gradient(circle,var(--color-navy-800)_0_55%,transparent_56%),repeating-conic-gradient(var(--color-gold-400)_0_6deg,var(--color-gold-600)_6deg_9deg,var(--color-gold-200)_9deg_12deg)]">
          <Image src={IMG.logo} alt="" sizes="204px" className="h-auto w-3/5" />
        </div>
      </div>
    </Section>
  );
}
