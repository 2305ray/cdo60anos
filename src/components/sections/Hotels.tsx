import { HotelMap } from "@/components/HotelMap";
import { Eyebrow, H2, Lead, Section } from "@/components/layout/section";
import { CONTENT } from "@/lib/content";

export function Hotels() {
  return (
    <Section id="hospedagem" className="pattern-cdo">
      <div className="wrap">
        <Eyebrow>{CONTENT.hotels.eyebrow}</Eyebrow>
        <H2>{CONTENT.hotels.title}</H2>
        <Lead>{CONTENT.hotels.lead}</Lead>
        <HotelMap />
      </div>
    </Section>
  );
}
