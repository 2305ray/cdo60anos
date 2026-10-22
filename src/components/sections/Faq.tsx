import { H2, Section } from "@/components/layout/section";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CONTENT } from "@/lib/content";

export function Faq() {
  return (
    <Section id="duvidas">
      <div className="wrap">
        <H2>{CONTENT.faq.title}</H2>
        <Accordion className="max-w-[820px]">
          {CONTENT.faq.items.map(([q, a]) => (
            <AccordionItem key={q} value={q} className="border-b-2 first:border-t-2">
              <AccordionTrigger className="py-5 text-[19px] font-bold transition-colors hover:text-navy-600 hover:no-underline">{q}</AccordionTrigger>
              <AccordionContent className="max-w-[40em] pb-5 text-base text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}
