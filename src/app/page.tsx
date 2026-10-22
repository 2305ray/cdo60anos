import { Rope } from "@/components/layout/section";
import { About } from "@/components/sections/About";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { History } from "@/components/sections/History";
import { Hotels } from "@/components/sections/Hotels";
import { Masters } from "@/components/sections/Masters";
import { Program } from "@/components/sections/Program";
import { Registration } from "@/components/sections/Registration";
import { Social } from "@/components/sections/Social";
import { Stats } from "@/components/sections/Stats";
import { Venue } from "@/components/sections/Venue";
import { SiteHeader } from "@/components/SiteHeader";
import { eventJsonLd, jsonLdScript } from "@/lib/seo";

// Momento em que a página foi gerada; os componentes do cliente trocam pela hora real ao abrir
async function getBuildTime() {
  "use cache";
  return Date.now();
}

export default async function Home() {
  const buildTime = await getBuildTime();

  return (
    <>
      <SiteHeader buildTime={buildTime} />
      <main id="conteudo">
        <Hero />
        <Rope />
        <Stats />
        <History />
        <About />
        <Program />
        <Masters />
        <Rope />
        <Registration buildTime={buildTime} />
        <Venue />
        <Hotels />
        <Social />
        <Rope />
        <Faq />
      </main>
      <Footer />
      {/* dados do evento para o Google (data, local, preços) */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(eventJsonLd(buildTime)) }} />
    </>
  );
}
