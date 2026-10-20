// Dados fixos do evento (links, datas, preços, hotéis). Os textos ficam em content.ts.

export const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdj8OuXJPBoA6KJ5v-pE-EsQzpSDr4LsOLOKbs2W_ptbLp1eg/viewform";
export const INSTAGRAM_URL = "https://www.instagram.com/cdo60anos";
export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=ADC%20Eletropaulo%2C%20Rua%20Peixe%20Vivo%2C%20155%2C%20S%C3%A3o%20Paulo";
export const WAZE_URL = "https://waze.com/ul?q=Rua%20Peixe%20Vivo%20155%20Sao%20Paulo&navigate=yes";
export const WHATSAPP_SOCIAL = "5516992069540";

// Abertura do evento (horário de Brasília)
export const EVENT_START = "2027-01-22T08:00:00-03:00";

export type LoteId = "lote1" | "pacote" | "lote2" | "lote3";

// O status de cada lote (esgotado / disponível / em breve) sai dessas datas.
export const LOTES: { id: LoteId; preco: string; inicio?: string; fim: string; destaque?: boolean }[] = [
  { id: "lote1", preco: "280", fim: "2026-11-30T23:59:59-03:00" },
  { id: "pacote", preco: "1.300", fim: "2026-11-30T23:59:59-03:00", destaque: true },
  { id: "lote2", preco: "330", inicio: "2026-12-01T00:00:00-03:00", fim: "2026-12-31T23:59:59-03:00" },
  { id: "lote3", preco: "380", inicio: "2027-01-01T00:00:00-03:00", fim: "2027-01-24T23:59:59-03:00" },
];

// Prazo usado no aviso do topo
export const LOTE1_FIM = LOTES[0].fim;

export type LoteStatus = "encerrado" | "disponivel" | "em-breve";

export function loteStatus(lote: (typeof LOTES)[number], now: number): LoteStatus {
  if (now > new Date(lote.fim).getTime()) return "encerrado";
  if (lote.inicio && now < new Date(lote.inicio).getTime()) return "em-breve";
  return "disponivel";
}

export type HotelGroup = "green" | "orange" | "red";

export const GROUP_COLORS: Record<HotelGroup, string> = {
  green: "#22A447",
  orange: "#F2711C",
  red: "#D33A2C",
};

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
