import { Event, Category, FilterType, TicketTier } from './types';

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Todos', slug: FilterType.ALL },
  { id: '2', name: 'Música & Shows', slug: FilterType.MUSIC },
  { id: '3', name: 'Festivais', slug: FilterType.THEATER },
  { id: '4', name: 'Clubs', slug: FilterType.SPORTS },
  { id: '5', name: 'Conferências', slug: FilterType.CONFERENCE },
];

export const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'VINTAGE CULTURE @ ARCA',
    description: 'Lukas Ruiz retorna a São Paulo para uma apresentação histórica na ARCA. Um long set de 12 horas explorando novas sonoridades, com uma produção audiovisual inédita que promete redefinir os padrões da cena eletrônica nacional. Prepare-se para uma imersão completa no universo Vintage Culture.',
    date: '15 Nov 2024 • 22:00',
    location: 'ARCA, São Paulo',
    price: 350.00,
    imageUrl: 'https://picsum.photos/seed/vintage/800/1000',
    category: FilterType.MUSIC,
    featured: true
  },
  {
    id: '2',
    title: 'MUSIC ON FESTIVAL',
    description: 'Marco Carola traz sua label lendária para o Brasil. Music On é sinônimo de techno de alta qualidade e vibes inigualáveis. O lineup conta com grandes nomes internacionais e uma estrutura open air desenhada para imersão total no Parque Maeda.',
    date: '02 Dez 2024 • 14:00',
    location: 'Parque Maeda, Itu',
    price: 420.00,
    imageUrl: 'https://picsum.photos/seed/musicon/800/1000',
    category: FilterType.THEATER
  },
  {
    id: '3',
    title: 'MOCHAKK CALLING',
    description: 'O fenômeno global Mochakk aterrissa em sua terra natal para o projeto "Mochakk Calling". Uma festa curada pelo próprio artista, trazendo convidados especiais e aquela energia caótica e contagiante que conquistou o mundo.',
    date: '20 Dez 2024 • 23:00',
    location: 'Novo Anhangabaú, SP',
    price: 280.00,
    imageUrl: 'https://picsum.photos/seed/mochakk/800/1000',
    category: FilterType.MUSIC
  },
  {
    id: '4',
    title: 'DNA CAR ART',
    description: 'A fusão perfeita entre exposições de carros superesportivos e música eletrônica. Um evento lifestyle único no Hangar Campo de Marte que reúne máquinas raras e um lineup de Tech House sofisticado. Durante o dia, uma exposição exclusiva de hypercars; à noite, o hangar se transforma em um club de classe mundial.',
    date: '10 Jan 2025 • 16:00',
    location: 'Hangar Campo de Marte',
    price: 600.00,
    imageUrl: 'https://picsum.photos/seed/dnacar/800/1000',
    category: FilterType.SPORTS
  },
  {
    id: '5',
    title: 'TIME WARP BRASIL',
    description: 'A celebração de 30 anos do festival alemão em solo brasileiro. Dois dias de imersão no mais puro Techno e House underground, com visuais minimalistas e som de altíssima fidelidade no Autódromo de Interlagos.',
    date: '05 Mai 2025 • 18:00',
    location: 'Autódromo de Interlagos',
    price: 550.00,
    imageUrl: 'https://picsum.photos/seed/timewarp/800/1000',
    category: FilterType.THEATER
  },
  {
    id: '6',
    title: 'SOLOMUN (ALL NIGHT LONG)',
    description: 'O rei de Ibiza retorna para comandar a pista do início ao fim. Uma jornada musical sem precedentes no Complexo Canindé, onde Solomun dita o ritmo da noite com sua maestria e carisma inconfundíveis.',
    date: '18 Fev 2025 • 22:00',
    location: 'Complexo Canindé',
    price: 480.00,
    imageUrl: 'https://picsum.photos/seed/solomun/800/1000',
    category: FilterType.MUSIC
  }
];

export const MOCK_TICKETS: TicketTier[] = [
  // --- DNA CAR ART TICKETS (ID 4) ---
  
  // Categoria: EXPOSIÇÃO (DAY PASS)
  {
    id: 'dna_day_1',
    eventId: '4',
    category: 'Exposição (Day Pass)',
    name: 'VISITAÇÃO HYPERCARS',
    price: 150.00,
    description: 'Acesso à exposição de carros das 10h às 16h.',
    features: [],
    available: 200
  },
  {
    id: 'dna_day_2',
    eventId: '4',
    category: 'Exposição (Day Pass)',
    name: 'VIP LOUNGE DAY',
    price: 350.00,
    description: 'Acesso à exposição + Área VIP com buffet.',
    features: [],
    available: 50
  },

  // Categoria: PARTY (NIGHT)
  {
    id: 'dna_night_1',
    eventId: '4',
    category: 'Party (Night)',
    name: 'PISTA PREMIUM - LOTE 1',
    price: 450.00,
    description: 'Acesso à festa a partir das 22h.',
    features: [],
    available: 500
  },
  {
    id: 'dna_night_2',
    eventId: '4',
    category: 'Party (Night)',
    name: 'FRONT STAGE - LOTE 2',
    price: 780.00,
    description: 'Área exclusiva frente palco.',
    features: [],
    available: 200
  },

  // Categoria: EXPERIÊNCIA COMPLETA
  {
    id: 'dna_full_1',
    eventId: '4',
    category: 'Full Experience',
    name: 'FULL PASS (DAY + NIGHT)',
    price: 1200.00,
    description: 'Acesso total ao evento.',
    features: [],
    available: 100
  },
  {
    id: 'dna_full_2',
    eventId: '4',
    category: 'Full Experience',
    name: 'BACKSTAGE OWNERS',
    price: 3500.00,
    description: 'Acesso irrestrito + Open Bar Premium + Estacionamento.',
    features: [],
    available: 20
  },


  // --- GENERIC TICKETS FOR OTHER EVENTS ---
  {
    id: 'gen_1',
    eventId: '1',
    category: 'Geral',
    name: 'PISTA LOTE 1',
    price: 350.00,
    description: 'Acesso padrão.',
    features: [],
    available: 1000
  },
  {
    id: 'gen_2',
    eventId: '1',
    category: 'Área VIP',
    name: 'AREA VIP FRONT',
    price: 650.00,
    description: 'Frente palco.',
    features: [],
    available: 200
  },
  {
    id: 'gen_3',
    eventId: '2',
    category: 'Geral',
    name: 'PASSAPORTE 2 DIAS',
    price: 420.00,
    description: 'Acesso aos dois dias.',
    features: [],
    available: 500
  }
];