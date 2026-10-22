import { HotelMap } from "@/components/HotelMap";
import { H2, Lead, Section } from "@/components/layout/section";
import { CONTENT } from "@/lib/content";

export function Hotels() {
  return (
    <Section id="hospedagem" className="pt-0 md:pt-0">
      <div className="wrap">
        <H2>{CONTENT.hotels.title}</H2>
        <Lead>{CONTENT.hotels.lead}</Lead>
        <HotelMap />
      </div>
    </Section>
  );
}
