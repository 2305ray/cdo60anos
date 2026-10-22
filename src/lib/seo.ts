import { CONTENT } from "./content";
import {
  EVENT_END,
  EVENT_START,
  FORM_URL,
  INSTAGRAM_URL,
  LOTES,
  VENUE,
  loteStatuses,
  type LoteStatus,
} from "./event-data";

/**
 * Endereço público do site, usado no link canônico, sitemap, robots, imagem de compartilhamento e dados do Google.
 * 1. `NEXT_PUBLIC_SITE_URL`, se configurada à mão;
 * 2. senão `URL`, que o Netlify preenche sozinho no build com o endereço principal do site
 *    (o domínio próprio, quando estiver conectado; antes disso, o xxx.netlify.app);
 * 3. senão localhost, para rodar no computador.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? process.env.URL ?? "http://localhost:3000").replace(/\/$/, "");

// Como cada status de lote aparece para o Google (https://schema.org/ItemAvailability)
const AVAILABILITY: Record<LoteStatus, string> = {
  disponivel: "https://schema.org/InStock",
  "em-breve": "https://schema.org/PreOrder",
  esgotado: "https://schema.org/SoldOut",
  encerrado: "https://schema.org/SoldOut",
};

/**
 * Dados estruturados do evento (schema.org/Event). É o que permite ao Google mostrar
 * data, local e preços direto no resultado da busca.
 */
export function eventJsonLd(now: number) {
  const statuses = loteStatuses(LOTES, now);
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: CONTENT.meta.title,
    description: CONTENT.meta.description,
    startDate: EVENT_START,
    endDate: EVENT_END,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    inLanguage: "pt-BR",
    url: SITE_URL,
    image: [`${SITE_URL}/opengraph-image`],
    location: {
      "@type": "Place",
      name: VENUE.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: VENUE.street,
        addressLocality: VENUE.city,
        addressRegion: VENUE.state,
        postalCode: VENUE.postalCode,
        addressCountry: VENUE.country,
      },
    },
    organizer: {
      "@type": "Organization",
      name: "Grupo de Capoeira Cordão de Ouro",
      url: INSTAGRAM_URL,
    },
    offers: LOTES.map((l) => ({
      "@type": "Offer",
      name: CONTENT.prices.lotes[l.id].nome,
      price: l.preco.replace(".", ""), // "1.300" → "1300"
      priceCurrency: "BRL",
      availability: AVAILABILITY[statuses[l.id]],
      ...(l.inicio && { validFrom: l.inicio }),
      validThrough: l.fim,
      url: FORM_URL,
    })),
  };
}

/** JSON seguro para colocar dentro de <script>: impede que um "</script>" no texto feche a tag. */
export function jsonLdScript(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
