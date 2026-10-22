import Image from "next/image";
import { IMG } from "@/assets/images";
import { Countdown } from "@/components/Countdown";
import { Button } from "@/components/ui/button";
import { CONTENT } from "@/lib/content";
import { EVENT_START } from "@/lib/event-data";

export function Hero() {
  const t = CONTENT.hero;
  return (
    <div className="hero-bg relative overflow-hidden text-white">
      <Image
        src={IMG.cloud}
        alt=""
        sizes="(min-width: 1000px) 900px, 90vw"
        className="pointer-events-none absolute -end-[10%] -top-[8%] h-auto w-[min(900px,90vw)] opacity-75"
      />
      <div className="wrap">
        <div className="relative grid items-end gap-5 pt-5 md:grid-cols-[1.1fr_.9fr] md:pt-7">
          <div className="relative z-[1]">
            <div className="flex flex-wrap items-center gap-2.5">
              {/* data no formato do primeiro layout: faixa com borda dourada */}
              <span className="inline-flex border-s-4 border-gold bg-gold/10 px-4 py-1.5 text-[13px] font-bold tracking-[0.13em] text-gold uppercase sm:text-sm">
                {t.dateTag}
              </span>
              <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[15px] font-bold">
                {t.tag}
              </span>
            </div>
            <h1 className="m-0">
              {/* maior imagem da primeira tela: carrega antes das outras */}
              <Image
                src={IMG.anos60}
                alt="60 anos CDO"
                loading="eager"
                fetchPriority="high"
                sizes="330px"
                className="mt-[18px] h-auto w-[min(300px,58%)] animate-pop drop-shadow-[0_18px_30px_rgb(0_0_0/0.45)] md:mt-3.5 md:w-[min(330px,62%)]"
              />
              <span className="sr-only">Dia de Ouro, 60 anos do Cordão de Ouro Capoeira</span>
            </h1>
            <p className="mt-[18px] mb-6 max-w-[32em] text-[17px] text-navy-100 md:text-[19px]">{t.sub}</p>
            <div className="flex flex-wrap gap-3.5">
              <Button render={<a href="#inscricao" />} nativeButton={false} variant="gold" size="cta">
                {t.cta}
              </Button>
              <Button render={<a href="#inscricao" />} nativeButton={false} variant="line" size="cta" className="text-white">
                {t.cta2}
              </Button>
            </div>
          </div>

          {/* ilustração do mestre sobre o palco, com o logo no canto */}
          <div className="absolute -end-[6%] top-[70px] z-0 aspect-[520/600] w-[min(300px,60%)] md:relative md:end-auto md:top-auto md:w-[min(430px,100%)] md:justify-self-center">
            <Image src={IMG.heroBase} alt="" sizes="480px" className="absolute -start-[6%] bottom-0 h-auto w-[112%] opacity-95" />
            <Image
              src={IMG.mestre}
              alt=""
              sizes="370px"
              className="fade-edges absolute start-[8%] bottom-[6%] h-auto w-[86%] animate-rise drop-shadow-[0_20px_40px_rgb(0_0_0/0.4)]"
            />
            <Image
              src={IMG.logo}
              alt=""
              sizes="120px"
              className="absolute end-[8%] bottom-[12%] h-auto w-[26%] drop-shadow-[0_10px_18px_rgb(0_0_0/0.5)] md:-end-[2%] md:w-[28%]"
            />
          </div>
        </div>
        <Countdown target={EVENT_START} />
      </div>
      <Image src={IMG.wave} alt="" sizes="100vw" className="pointer-events-none absolute inset-x-0 -bottom-0.5 h-auto w-full opacity-80" />
    </div>
  );
}
