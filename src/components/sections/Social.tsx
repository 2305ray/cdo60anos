import { HeartHandshakeIcon } from "lucide-react";
import { WhatsappIcon } from "@/components/icons";
import { H2, Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IconBox } from "@/components/ui/icon-box";
import { CONTENT } from "@/lib/content";
import { whatsappLink } from "@/lib/event-data";
import { EXTERNAL } from "@/lib/links";

/** Chamada para os projetos sociais: mesmo estilo de card dos pilares de "O evento". */
export function Social() {
  const t = CONTENT.social;
  return (
    <Section className="pt-0 md:pt-0">
      <div className="wrap">
        <Card variant="feature" className="relative flex-row flex-wrap items-center justify-between gap-8 p-8 md:p-10">
          <div className="rope-bg absolute inset-x-0 top-0 h-2" aria-hidden="true" />
          <div className="flex max-w-[44em] gap-5">
            <IconBox variant="solid" size="lg" className="hidden sm:grid">
              <HeartHandshakeIcon />
            </IconBox>
            <div>
              <H2 className="mb-3 text-[clamp(28px,4vw,44px)]">{t.title}</H2>
              <p className="text-lg text-muted-foreground">{t.text}</p>
            </div>
          </div>
          <div className="grid justify-items-center gap-2.5">
            <Button render={<a href={whatsappLink(t.message)} {...EXTERNAL} />} nativeButton={false} variant="whatsapp" size="cta-lg">
              <WhatsappIcon size={22} />
              {t.cta}
            </Button>
            {/* só o nome: o número fica apenas dentro do link do botão */}
            <small className="text-center font-bold text-navy">{t.who}</small>
          </div>
        </Card>
      </div>
    </Section>
  );
}
