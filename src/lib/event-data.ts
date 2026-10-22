// Dados fixos do evento (links, datas, preços, hotéis). Os textos ficam em content.ts.

export const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdj8OuXJPBoA6KJ5v-pE-EsQzpSDr4LsOLOKbs2W_ptbLp1eg/viewform";
export const INSTAGRAM_URL = "https://www.instagram.com/cdo60anos";
export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=ADC%20Eletropaulo%2C%20Rua%20Peixe%20Vivo%2C%20155%2C%20S%C3%A3o%20Paulo";
export const WAZE_URL = "https://waze.com/ul?q=Rua%20Peixe%20Vivo%20155%20Sao%20Paulo&navigate=yes";
// WhatsApp do Mestre Tigrin (projetos sociais). Só aparece dentro do link, nunca escrito na página.
const WHATSAPP_SOCIAL = "5516992069540";
export const whatsappLink = (message: string) =>
  `https://wa.me/${WHATSAPP_SOCIAL}?text=${encodeURIComponent(message)}`;

// Abertura e encerramento do evento (horário de Brasília)
export const EVENT_START = "2027-01-22T08:00:00-03:00";
export const EVENT_END = "2027-01-24T23:59:59-03:00";

export const VENUE = {
  name: "ADC Eletropaulo",
  street: "Rua Peixe Vivo, 155",
  district: "Jardim Santa Helena",
  city: "São Paulo",
  state: "SP",
  postalCode: "04772-100",
  country: "BR",
};

// Valores cobrados no local, por dia
export const CAMPING_PRICE = "50";
export const PARKING_PRICES = { carro: "25", onibus: "50" };

export type LoteId = "lote1" | "pacote" | "lote2" | "lote3";

export type Lote = {
  id: LoteId;
  preco: string;
  inicio?: string;
  fim: string;
  destaque?: boolean;
  /** Lote que vem antes na sequência; se ele for fechado antes do prazo, este abre na hora. */
  anterior?: LoteId;
  /** Encerrar antes do prazo (ex.: vagas acabaram): mude para `true` e publique de novo. */
  fechado?: boolean;
};

// O status de cada lote sai das datas abaixo. Para fechar um lote antes da hora, use `fechado: true`.
export const LOTES: Lote[] = [
  { id: "lote1", preco: "280", fim: "2026-11-30T23:59:59-03:00", fechado: false },
  { id: "pacote", preco: "1.300", fim: "2026-11-30T23:59:59-03:00", destaque: true, fechado: false },
  { id: "lote2", preco: "330", inicio: "2026-12-01T00:00:00-03:00", fim: "2026-12-31T23:59:59-03:00", anterior: "lote1", fechado: false },
  { id: "lote3", preco: "380", inicio: "2027-01-01T00:00:00-03:00", fim: "2027-01-24T23:59:59-03:00", anterior: "lote2", fechado: false },
];

export type LoteStatus = "esgotado" | "encerrado" | "disponivel" | "em-breve";

/**
 * Status de todos os lotes num instante.
 * - `fechado: true` → "esgotado" (vale antes de qualquer data)
 * - passou do `fim` → "encerrado"
 * - ainda não começou → "em-breve"
 *
 * Um lote "começa" na data de `inicio` ou antes, se o anterior já tinha começado e foi fechado à mão.
 * Assim, fechar o 1º lote abre o 2º na hora, mas fechar o 2º antes da data dele não abre o 3º.
 */
export function loteStatuses(lotes: Lote[], now: number): Record<LoteId, LoteStatus> {
  const byId = new Map(lotes.map((l) => [l.id, l]));

  const started = (lote: Lote): boolean => {
    if (!lote.inicio || now >= new Date(lote.inicio).getTime()) return true;
    const prev = lote.anterior ? byId.get(lote.anterior) : undefined;
    return !!prev?.fechado && started(prev);
  };

  const statusOf = (lote: Lote): LoteStatus => {
    if (lote.fechado) return "esgotado";
    if (now > new Date(lote.fim).getTime()) return "encerrado";
    return started(lote) ? "disponivel" : "em-breve";
  };

  return Object.fromEntries(lotes.map((l) => [l.id, statusOf(l)])) as Record<LoteId, LoteStatus>;
}

// Usados pelo aviso do topo
export const LOTE1 = LOTES[0];

export type HotelGroup = "green" | "orange" | "red";

export const HOTEL_FILTER_GROUPS: (HotelGroup | "all")[] = ["all", "green", "orange", "red"];

export type Hotel = {
  nome: string;
  dist: string;
  endereco: string;
  telefone: string;
  group: HotelGroup;
  pos: [number, number];
};

export const HOTELS: Hotel[] = [
  { nome: "Sunny Interlagos Suite", dist: "1,5", endereco: "Av. Pascoal da Rocha Falcão, 777, Jardim Santa Helena", telefone: "(11) 97445-4068", group: "green", pos: [235, 174] },
  { nome: "Hotel Faf's", dist: "2,8", endereco: "Av. Atlântica, 5989, Parque Atlântico", telefone: "(11) 5669-3821", group: "green", pos: [535, 208] },
  { nome: "Porto Hotel", dist: "2,9", endereco: "Av. Atlântica, 6018, Interlagos", telefone: "(11) 97825-1491", group: "green", pos: [560, 222] },
  { nome: "Hotel San Milena", dist: "3,2", endereco: "Rua Amaro Luz, 172, Socorro", telefone: "(11) 5685-0420", group: "green", pos: [455, 156] },
  { nome: "Hotel Paddock", dist: "3,4", endereco: "Av. Interlagos, 6330, Interlagos", telefone: "(11) 5668-7796", group: "green", pos: [298, 244] },
  { nome: "Hotel Bells", dist: "3,4", endereco: "Av. Interlagos, 6318, Interlagos", telefone: "(11) 5668-8641", group: "green", pos: [318, 252] },
  { nome: "Alba Hotel", dist: "3,6", endereco: "Av. Interlagos, 6535, Interlagos", telefone: "(11) 96468-1517", group: "orange", pos: [290, 266] },
  { nome: "Hotel Malibú", dist: "3,8", endereco: "Rua Marcílio Dias, 168, Socorro", telefone: "(11) 5685-4183", group: "orange", pos: [510, 163] },
  { nome: "Chalé Castelo Interlagos", dist: "4,0", endereco: "Rua Ana Cardoso dos Santos, 03, Parque do Castelo", telefone: "(11) 93146-7430", group: "orange", pos: [350, 297] },
  { nome: "Novo Hotel Pousada", dist: "4,2", endereco: "Av. Sen. Teotônio Vilela, 162, Interlagos", telefone: "(11) 95423-2773", group: "orange", pos: [325, 316] },
  { nome: "Pousada dos Sonhos Interlagos", dist: "4,5", endereco: "Rua Antônio Carlos Monteiro Teixeira, 264", telefone: "(11) 99699-7839", group: "orange", pos: [310, 337] },
  { nome: "Hotel Guarapiranga", dist: "5,5", endereco: "Rua João de Abreu, 104, Jardim Tupã", telefone: "(11) 5518-4147", group: "red", pos: [450, 400] },
];

export const hotelLinks = (h: Hotel) => {
  const destino = encodeURIComponent(`${h.nome}, ${h.endereco}, São Paulo, SP`);
  return {
    tel: `tel:+55${h.telefone.replace(/\D/g, "")}`,
    rota: `https://www.google.com/maps/dir/?api=1&destination=${destino}`,
    booking: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(`${h.nome} São Paulo`)}`,
  };
};
