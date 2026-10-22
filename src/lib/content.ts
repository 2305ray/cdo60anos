// Todo o texto da página (em português). A tradução para outros idiomas é feita pelo Google Tradutor.
// Preços, datas e endereço vêm de event-data.ts para não ficarem repetidos (e desencontrados) aqui.
import { IMG } from "@/assets/images";
import { CAMPING_PRICE, HOTELS, PARKING_PRICES } from "./event-data";

export const NAV = [
  { href: "#historia", label: "História" },
  { href: "#evento", label: "O evento" },
  { href: "#inscricao", label: "Valores e inscrição" },
  { href: "#local", label: "Local" },
  { href: "#hospedagem", label: "Hospedagem" },
  { href: "#duvidas", label: "Dúvidas" },
];

export const CONTENT = {
  meta: {
    title: "60 Anos Cordão de Ouro | Dia de Ouro 2027",
    description:
      "22 a 24 de janeiro de 2027, em São Paulo. O encontro mundial dos 60 anos do Cordão de Ouro Capoeira, com Mestre Suassuna: aulas, rodas, cultura e mestres do mundo inteiro.",
    shareDescription: "Três dias para reunir o mundo da capoeira em um só lugar. 22 a 24 de janeiro de 2027, em São Paulo.",
  },
  skipLink: "Pular para o conteúdo",
  ctaTop: "Inscreva-se",
  aviso: {
    dias: (n: number) => `1º lote com camiseta garantida termina em ${n} dias`,
    amanha: "1º lote com camiseta garantida termina amanhã",
    hoje: "Último dia do 1º lote com camiseta garantida",
    cta: "Garantir minha vaga",
  },
  hero: {
    tag: "Dia de Ouro",
    dateTag: "22, 23 e 24 de janeiro de 2027 • São Paulo/SP",
    sub: "Três dias para reunir o mundo da capoeira em um só lugar. Mestres, rodas, aulas e muita história, de 22 a 24 de janeiro de 2027, em São Paulo.",
    cta: "Fazer minha inscrição",
    cta2: "Ver valores",
  },
  countdown: {
    label: "Faltam para a grande roda",
    units: ["dias", "horas", "min", "seg"],
    done: "A roda já começou!",
  },
  stats: [
    ["+80", "nacionalidades no evento"],
    ["6", "continentes presentes"],
    ["27", "estados do Brasil"],
    ["60", "anos de história"],
  ],
  about: {
    title: "Um encontro que nunca aconteceu antes",
    paragraphs: [
      "Em 1967, Mestre Suassuna fundou o Cordão de Ouro em São Paulo. Sessenta anos depois, alunos, professores e mestres de mais de 80 nacionalidades, dos 6 continentes e de todos os estados do Brasil voltam para casa.",
      "Vão ser três dias de treino, roda, música e reencontro, com aulas de todos os mestres Cordão Dourado juntos, no mesmo espaço. Uma chance rara de aprender direto da fonte e de sentir a família CDO inteira na mesma roda.",
    ],
    // Os 3 cards de "O evento" já trazem as atividades (antes ficavam numa seção "O que vai ter")
    pillars: [
      {
        title: "Aulas & Rodas",
        tagline: "Treino e roda com os mestres Cordão Dourado",
        items: ["Rodas de capoeira", "Aulas com os mestres", "Miudinho", "Gingoterapia"],
      },
      {
        title: "Cultura & Expressão",
        tagline: "A cultura afro-brasileira em movimento",
        items: ["Maculelê", "Percussão e musicalidade", "Samba de roda", "Dança afro"],
      },
      {
        title: "Intercâmbio & Fraternidade",
        tagline: "O mundo inteiro na mesma roda",
        items: ["+80 nacionalidades", "6 continentes", "27 estados", "Mestres Cordão Dourado"],
      },
    ],
  },
  masters: {
    title: "Quem vai estar",
    lead: "Os mestres Cordão Dourado do grupo, vindos de várias cidades e países. Os nomes de quem vai dar aula serão anunciados mais perto do evento. Siga o perfil oficial para saber primeiro.",
    cta: "Seguir @cdo60anos",
  },
  history: {
    title: "60 anos de história",
    lead: "De uma academia em São Paulo para o mundo. Os jornais acompanharam cada passo dessa caminhada.",
    prev: "Anterior",
    swipeHint: "Deslize para ver os outros anos",
    scrollBack: "Ver anos anteriores",
    scrollForward: "Ver próximos anos",
    next: "Próximo",
    items: [
      { year: "1966", title: "Da Bahia para São Paulo", text: "Mestre Suassuna, aluno de Mestre Bimba, já dava aulas em Itabuna, na Bahia. Em 1966 ele chega a São Paulo com a missão de espalhar a capoeira.", img: IMG.jornal3 },
      { year: "1967", title: "Nasce o Cordão de Ouro", text: "Em São Paulo, Mestre Suassuna funda o Cordão de Ouro. A capoeira começa a criar raízes na cidade.", img: IMG.jornal5 },
      { year: "1974", title: "Campeonato Berimbau de Prata", text: "A Academia Cordão de Ouro organiza um campeonato que reúne academias da capital e do interior de São Paulo.", img: IMG.jornal4 },
      { year: "1976", title: "A capoeira pelo Brasil", text: "Mestre Suassuna viaja com seus alunos para mostrar a capoeira em outras cidades, como Londrina, no Paraná.", img: IMG.jornal1 },
      { year: "Anos 80", title: "Miudinho e Dança dos Quilombos", text: "Nascem o jogo miudinho e o espetáculo Dança dos Quilombos, duas marcas do Cordão de Ouro. A capoeira do grupo começa a ganhar o mundo.", img: IMG.jornal2 },
      { year: "Anos 90", title: "Começa o Capoeirando", text: "Nasce o Capoeirando, evento tradicional de capoeira na Bahia liderado pelo Cordão de Ouro.", img: IMG.logo, plain: true },
      { year: "Hoje", title: "Uma família no mundo inteiro", text: "O Cordão de Ouro está em mais de 80 países, com alunos, professores e mestres em todos os continentes.", img: IMG.world, plain: true },
      { year: "2027", title: "60 anos", text: "A família inteira se reencontra em São Paulo para celebrar seis décadas de história.", img: IMG.anos60, plain: true },
    ],
  },
  program: {
    title: "Programação",
    eyebrow: "Fique por dentro",
    // Enquanto for false, os cards ficam apagados e desfocados com "Em breve" no centro.
    // Quando a programação oficial sair, revise os dias abaixo e troque para true.
    pronta: false,
    soon: "Em breve",
    // Junção das duas versões: horário de início da 2ª + divisão por período da 1ª.
    // Sexta começa às 18h30, então só tem noite.
    days: [
      {
        num: "22",
        weekday: "Sexta-feira · Janeiro",
        hours: "A partir das 18h30",
        activities: [
          { period: "Noite", name: "Credenciamento & Recepção", desc: "Retirada de kits e boas-vindas" },
          { period: "Noite", name: "Roda de Abertura Oficial", desc: "Abertura dos 60 anos, primeiras aulas e musicalidade" },
        ],
      },
      {
        num: "23",
        weekday: "Sábado · Janeiro",
        hours: "A partir das 08h",
        activities: [
          { period: "Manhã", name: "Aulas & Rodas de Capoeira", desc: "Treinos técnicos e vivências pedagógicas" },
          { period: "Tarde", name: "Maculelê & Dança Afro", desc: "Oficinas de cultura e expressão afro-brasileira" },
          { period: "Noite", name: "Samba de Roda & Apresentações", desc: "Apresentações culturais e intercâmbio" },
        ],
      },
      {
        num: "24",
        weekday: "Domingo · Janeiro",
        hours: "A partir das 08h",
        activities: [
          { period: "Manhã", name: "Projetos Sociais & Rodas", desc: "O momento especial dos projetos sociais" },
          { period: "Tarde", name: "Apresentações & Formatura", desc: "Apresentações culturais e formatura de mestres" },
          { period: "Noite", name: "Grande Roda de Encerramento", desc: "A roda histórica dos 60 anos com Mestre Suassuna" },
        ],
      },
    ],
    note: "A programação completa, com horários, será divulgada em breve no Instagram.",
  },
  prices: {
    title: "Valores e inscrição",
    steps: [
      "Escolha seu lote ou o pacote para 5 pessoas.",
      "Clique em Garantir a vaga e preencha o formulário.",
      "Pague pelo PIX indicado no formulário e anexe o comprovante.",
    ],
    intlTitle: "Vem de fora do Brasil?",
    intlText: "Faça sua inscrição pelo formulário normalmente. O pagamento é feito no dia do evento.",
    lotes: {
      lote1: { nome: "1º lote", prazo: "Até 30/11/2026", inclui: "1 inscrição + 1 camiseta" },
      pacote: { nome: "Pacote para 5", prazo: "Até 30/11/2026", inclui: "5 inscrições + 5 camisetas" },
      lote2: { nome: "2º lote", prazo: "01/12 a 31/12/2026", inclui: "1 inscrição + 1 camiseta" },
      lote3: { nome: "3º lote", prazo: "01/01 a 24/01/2027", inclui: "1 inscrição + 1 camiseta" },
    },
    best: "Melhor preço",
    status: { encerrado: "Encerrado", esgotado: "Esgotado", disponivel: "Disponível", "em-breve": "Em breve" },
    lotCta: "Garantir a vaga",
    shirtTitle: "Atenção à Camiseta Oficial!",
    shirtText:
      "Inscrições garantidas no 1º lote e no pacote têm a camiseta oficial do evento assegurada. Para o 2º e 3º lotes, a entrega da camiseta estará sujeita à disponibilidade de estoque.",
  },
  venue: {
    eyebrow: "Onde vai ser",
    title: "Local do evento",
    lead: "Um clube grande e cheio de verde na Zona Sul de São Paulo, perto de Interlagos, com espaço para aulas, rodas e camping.",
    photoAlt: "Vista aérea da ADC Eletropaulo",
    maps: "Abrir no Google Maps",
    waze: "Abrir no Waze",
    arrivalTitle: "Como chegar",
    arrival: [
      "De avião: o aeroporto mais perto é Congonhas (CGH). Quem chega por Guarulhos (GRU) ou Viracopos (VCP) deve prever mais tempo de trânsito.",
      "De ônibus: o Terminal Rodoviário Jabaquara fica mais perto do que o Tietê.",
      "De carro ou excursão: tem estacionamento no local para carros e ônibus.",
    ],
    camping: {
      title: "Camping",
      unit: "por barraca / dia",
      features: ["Chuveiro quente", "Energia elétrica", "Bebedouro"],
      note: "Leve sua própria barraca.",
    },
    parking: { title: "Estacionamento", car: "Carro", bus: "Ônibus", unit: "por dia" },
    notIncluded: "Hospedagem fora do evento e alimentação não estão inclusas na inscrição.",
  },
  hotels: {
    eyebrow: "Hospedagem",
    title: "Onde ficar",
    lead: "Hotéis e pousadas a até 6 km do evento. As distâncias são aproximadas e podem variar conforme o trajeto. Janeiro é alta temporada, então reserve cedo.",
    filters: { all: "Todos", green: "Até 3,5 km", orange: "3,6 a 5 km", red: "5,1 a 6 km" },
    mapLabel: "Mapa de hospedagem em Interlagos",
    listTitle: "Toque para destacar no mapa",
    venueDist: "Local do evento",
    call: "Ligar",
    route: "Como chegar",
    booking: "Ver no Booking",
  },
  social: {
    title: "Tem um projeto social?",
    text: "No domingo teremos um momento especial para os projetos sociais. Não precisa fazer inscrição: o responsável só precisa enviar pelo WhatsApp uma lista com o nome do projeto e, de cada participante, nome completo, data de nascimento e CPF.",
    cta: "Enviar lista pelo WhatsApp",
    who: "Mestre Tigrin",
    message: "Olá, Mestre Tigrin! Quero enviar a lista do meu projeto social para o domingo do evento 60 anos CDO.",
  },
  faq: {
    title: "Dúvidas frequentes",
    items: [
      ["Onde posso me hospedar?", `Há ${HOTELS.length} hotéis e pousadas a até 6 km do local, com contatos na lista acima. Também tem camping dentro do evento, por R$ ${CAMPING_PRICE} por dia por barraca, com chuveiro quente, energia elétrica e bebedouro.`],
      ["Vai ter alimentação no local?", "As informações sobre alimentação serão divulgadas em breve no Instagram @cdo60anos."],
      ["Como é a programação?", "São três dias de aulas, rodas, oficinas e música, de sexta a domingo. O domingo tem os projetos sociais, apresentações culturais e a formatura de mestres. Os horários completos saem em breve."],
      ["Quem vai dar aula?", "Os mestres Cordão Dourado do grupo. Os nomes serão divulgados mais perto do evento."],
      ["Preciso ser do Cordão de Ouro para participar?", "Não. O evento é aberto a todos, de qualquer grupo, graduação ou idade."],
      ["A camiseta está incluída?", "Sim. No 1º lote e no pacote a camiseta oficial é garantida. Nos 2º e 3º lotes, depende da disponibilidade."],
      ["Como pago a inscrição?", "Os dados do PIX estão no formulário de inscrição. Faça o pagamento e anexe o comprovante no próprio formulário."],
      ["Moro fora do Brasil. Como pago?", "Faça sua inscrição pelo formulário normalmente. O pagamento é feito no dia do evento."],
      ["Tenho um projeto social. Como participo?", "Não precisa de inscrição. O responsável envia para o Mestre Tigrin, pelo botão \"Enviar lista pelo WhatsApp\" acima, uma lista com o nome do projeto e, de cada participante, nome completo, data de nascimento e CPF."],
      ["Tem estacionamento?", `Sim. Carro paga R$ ${PARKING_PRICES.carro} por dia e ônibus R$ ${PARKING_PRICES.onibus} por dia.`],
    ],
  },
  footer: {
    quoteBefore: "Venha honrar o passado, viver o presente e ",
    quoteHighlight: "fortalecer o futuro.",
    cta: "Garantir minha vaga",
    official: "Informações oficiais no Instagram",
    copy: "© 2027 Grupo Capoeira Cordão de Ouro · Mestre Suassuna · Todos os direitos reservados",
  },
};
