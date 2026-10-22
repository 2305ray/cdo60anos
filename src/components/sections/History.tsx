import { H2, Lead, Section } from "@/components/layout/section";
import { Timeline } from "@/components/Timeline";
import { CONTENT } from "@/lib/content";

export function History() {
  return (
    <Section id="historia">
      <div className="wrap">
        <H2>{CONTENT.history.title}</H2>
        <Lead>{CONTENT.history.lead}</Lead>
        <Timeline />
      </div>
    </Section>
  );
}
