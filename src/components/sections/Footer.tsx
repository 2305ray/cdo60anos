import Image from "next/image";
import { IMG } from "@/assets/images";
import { InstagramIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { CONTENT, NAV } from "@/lib/content";
import { FORM_URL, INSTAGRAM_URL } from "@/lib/event-data";
import { EXTERNAL } from "@/lib/links";

/** Rodapé do primeiro layout: frase, botão grande, menu e Instagram. */
export function Footer() {
  const t = CONTENT.footer;
  return (
    <footer className="relative overflow-hidden bg-navy bg-[linear-gradient(rgb(255_255_255/0.035)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.035)_1px,transparent_1px)] bg-size-[32px_32px] px-6 pt-[72px] pb-14 text-center">
      <div aria-hidden="true" className="absolute -end-16 -bottom-20 size-72 rotate-45 rounded-[2.5rem] bg-gold opacity-[0.04]" />
      <Image src={IMG.logo} alt="Cordão de Ouro Capoeira" sizes="128px" className="mx-auto mb-8 h-auto w-32" />
      <blockquote className="mx-auto mb-10 max-w-[700px] text-[clamp(24px,4vw,40px)] leading-snug font-bold text-white/90 italic">
        &ldquo;{t.quoteBefore}
        <span className="text-gold">{t.quoteHighlight}</span>&rdquo;
      </blockquote>
      <Button render={<a href={FORM_URL} {...EXTERNAL} />} nativeButton={false} variant="gold" size="cta-lg" className="mb-10 px-12 text-xl">
        {t.cta}
      </Button>
      <nav aria-label="Rodapé" className="mb-7 flex flex-wrap justify-center gap-x-7 gap-y-2">
        {NAV.map((n) => (
          <a key={n.href} href={n.href} className="text-sm font-semibold tracking-wider text-white/55 uppercase no-underline transition-colors hover:text-gold">
            {n.label}
          </a>
        ))}
      </nav>
      <div className="mb-1 text-sm text-white/60">{t.official}</div>
      <a
        href={INSTAGRAM_URL}
        {...EXTERNAL}
        className="mx-auto mb-8 flex w-fit items-center gap-2.5 rounded-full bg-white/7 px-8 py-3 text-lg font-extrabold tracking-wider text-gold uppercase no-underline transition-colors hover:bg-white/12"
      >
        <InstagramIcon />
        @cdo60anos
      </a>
      <p className="text-[13px] tracking-wide text-white/50">{t.copy}</p>
    </footer>
  );
}
