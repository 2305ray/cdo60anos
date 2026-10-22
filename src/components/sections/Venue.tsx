import { DropletsIcon, ShowerHeadIcon, SquareParkingIcon, TentIcon, ZapIcon } from "lucide-react";
import Image from "next/image";
import { IMG } from "@/assets/images";
import { Eyebrow, H2, Lead, Price, Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IconBox } from "@/components/ui/icon-box";
import { CONTENT } from "@/lib/content";
import { CAMPING_PRICE, MAPS_URL, PARKING_PRICES, VENUE, WAZE_URL } from "@/lib/event-data";
import { EXTERNAL } from "@/lib/links";
import { cn } from "@/lib/utils";

// um ícone para cada item de CONTENT.venue.camping.features, na mesma ordem
const CAMPING_ICONS = [ShowerHeadIcon, ZapIcon, DropletsIcon];

function ExtraCard({ icon: Icon, title, children }: { icon: typeof TentIcon; title: string; children: React.ReactNode }) {
  return (
    <Card variant="info" className="@container">
      <div className="mb-3.5 flex items-center gap-3">
        <IconBox>
          <Icon />
        </IconBox>
        <h3 className="text-xl font-extrabold">{title}</h3>
      </div>
      {children}
    </Card>
  );
}

export function Venue() {
  const t = CONTENT.venue;
  return (
    <Section id="local">
      <div className="wrap grid items-start gap-8 md:grid-cols-2 md:gap-14">
        {/* esquerda: fotos com camping e estacionamento logo embaixo (no celular vem depois do texto) */}
        <div className="order-last md:order-first">
          <div className="grid grid-cols-[1.3fr_1fr] grid-rows-[150px_150px] gap-3 sm:grid-rows-[200px_200px]">
            {IMG.local.map((src, i) => (
              <Image
                key={src.src}
                src={src}
                alt={i === 0 ? t.photoAlt : ""}
                sizes={i === 0 ? "(min-width: 768px) 330px, 55vw" : "(min-width: 768px) 250px, 45vw"}
                className={cn("size-full rounded-2xl object-cover", i === 0 && "row-span-2")}
              />
            ))}
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
            <ExtraCard icon={TentIcon} title={t.camping.title}>
              <Price value={CAMPING_PRICE} unit={t.camping.unit} />
              <ul className="mt-3.5 flex flex-wrap gap-1.5">
                {t.camping.features.map((f, i) => {
                  const Icon = CAMPING_ICONS[i];
                  return (
                    <li key={f}>
                      <Badge variant="chip-outline" size="lg">
                        {Icon && <Icon aria-hidden="true" />}
                        {f}
                      </Badge>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-2.5 text-[15px] text-muted-foreground">{t.camping.note}</p>
            </ExtraCard>
            <ExtraCard icon={SquareParkingIcon} title={t.parking.title}>
              <div className="grid gap-3.5 @[360px]:grid-cols-2">
                {[
                  [t.parking.car, PARKING_PRICES.carro],
                  [t.parking.bus, PARKING_PRICES.onibus],
                ].map(([label, price]) => (
                  <div key={label} className="border-s-[3px] border-gold ps-3">
                    <span className="block text-sm font-bold text-muted-foreground">{label}</span>
                    <Price value={price} unit={t.parking.unit} />
                  </div>
                ))}
              </div>
            </ExtraCard>
          </div>
        </div>

        {/* direita: endereço, mapas e como chegar (no celular vem primeiro, com o título) */}
        <div className="order-first md:order-last">
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <H2>{t.title}</H2>
          <Lead>{t.lead}</Lead>
          <address className="mt-1.5 mb-[18px] text-xl font-bold not-italic">
            {VENUE.name}
            <small className="block text-base font-medium text-muted-foreground">
              {VENUE.street}, {VENUE.district}
            </small>
            <small className="block text-base font-medium text-muted-foreground">
              {VENUE.city}, {VENUE.state}, {VENUE.postalCode}
            </small>
          </address>
          <div className="mb-7 flex flex-wrap gap-3">
            <Button render={<a href={MAPS_URL} {...EXTERNAL} />} nativeButton={false} variant="gold" size="cta-sm">
              {t.maps}
            </Button>
            <Button render={<a href={WAZE_URL} {...EXTERNAL} />} nativeButton={false} variant="line" size="cta-sm">
              {t.waze}
            </Button>
          </div>
          <h3 className="mb-3 text-[22px] font-extrabold">{t.arrivalTitle}</h3>
          <ul className="grid gap-3">
            {t.arrival.map((a) => (
              <li key={a} className="relative ps-5 text-muted-foreground before:absolute before:start-0 before:top-[.62em] before:size-2.5 before:rounded-full before:bg-gold">
                {a}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[15px] text-muted-foreground">{t.notIncluded}</p>
        </div>
      </div>
    </Section>
  );
}
