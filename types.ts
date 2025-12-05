export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  price: number;
  imageUrl: string;
  category: string;
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface TicketTier {
  id: string;
  eventId: string; // Vínculo com o evento
  category: string; // Nome da categoria (ex: Pista, Camarote)
  name: string;
  price: number;
  description: string;
  features: string[];
  available: number;
}

export enum FilterType {
  ALL = 'ALL',
  MUSIC = 'MUSIC',
  THEATER = 'THEATER',
  SPORTS = 'SPORTS',
  CONFERENCE = 'CONFERENCE'
}