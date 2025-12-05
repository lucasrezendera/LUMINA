import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Share2,
  Heart,
  Music,
  Navigation,
  Map,
  Car,
  User,
  CheckCircle2,
  CreditCard,
  Ticket,
  Minus,
  Plus,
  Clock,
  Lock,
  Calendar,
  Zap,
  QrCode,
  Smartphone,
  Compass,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Event, TicketTier } from '../types';
import { MOCK_TICKETS } from '../constants';
import { FAQ } from './FAQ';

interface EventDetailsProps {
  event: Event;
  onBack: () => void;
}

type CheckoutStep = 'DETAILS' | 'CHECKOUT';
type PaymentMethod = 'CREDIT_CARD' | 'PIX';

interface GuestInfo {
  tempId: string;
  ticketId: string;
  ticketName: string;
  name: string;
  email: string;
}

const SERVICE_FEE_PERCENTAGE = 0.10; // 10% de taxa

export const EventDetails: React.FC<EventDetailsProps> = ({ event, onBack }) => {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('DETAILS');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('CREDIT_CARD');
  const [guests, setGuests] = useState<GuestInfo[]>([]);
  const [coupon, setCoupon] = useState('');
  
  // Estado para controlar quais categorias do accordion estão abertas
  // Inicializa vazio (tudo fechado)
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});

  // Filtrar ingressos do evento atual
  const eventTickets = MOCK_TICKETS.filter(t => t.eventId === event.id || (!t.eventId && event.id === '1')); // Fallback para manter compatibilidade se id nao bater nos mocks antigos
  
  // Agrupar ingressos por categoria
  const ticketsByCategory = eventTickets.reduce((acc, ticket) => {
    const category = ticket.category || 'Geral';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(ticket);
    return acc;
  }, {} as Record<string, TicketTier[]>);

  const toggleCategory = (category: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };
  
  // Extração da data para display
  const dateParts = event.date.split(' ');
  const day = dateParts[0];
  const month = dateParts[1];
  const time = dateParts.slice(3).join(' ');

  // Totais
  const totalItems = Object.values(quantities).reduce((a, b) => a + b, 0);
  
  const subtotal = Object.entries(quantities).reduce((acc, [ticketId, qtd]) => {
    const ticket = MOCK_TICKETS.find(t => t.id === ticketId);
    return acc + (ticket ? ticket.price * qtd : 0);
  }, 0);

  const serviceFee = subtotal * SERVICE_FEE_PERCENTAGE;
  
  // Lógica de Cupom (Mock)
  const discount = coupon === 'LUMINA10' ? subtotal * 0.1 : 0;
  
  const total = subtotal + serviceFee - discount;

  // Handlers
  const updateQuantity = (ticketId: string, delta: number) => {
    setQuantities(prev => {
      const current = prev[ticketId] || 0;
      const newValue = Math.max(0, current + delta);
      
      if (newValue === 0) {
        const { [ticketId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [ticketId]: newValue };
    });
  };

  const handleCheckout = () => {
    // Gerar campos para os titulares
    const newGuests: GuestInfo[] = [];
    Object.entries(quantities).forEach(([ticketId, qtd]) => {
      const ticket = MOCK_TICKETS.find(t => t.id === ticketId);
      if (ticket) {
        for (let i = 0; i < qtd; i++) {
          newGuests.push({
            tempId: `${ticketId}-${i}`,
            ticketId,
            ticketName: ticket.name,
            name: '',
            email: ''
          });
        }
      }
    });
    setGuests(newGuests);
    setCurrentStep('CHECKOUT');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white font-sans pb-20">
      
      {/* --- HERO SECTION TÁTICO --- */}
      <div className="relative h-[65vh] w-full overflow-hidden border-b border-white/10">
        
        {/* Background Image with Parallax feel */}
        <div className="absolute inset-0">
           <img 
             src={event.imageUrl} 
             alt={event.title} 
             className="w-full h-full object-cover"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/60 to-transparent" />
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]" />
        </div>

        {/* Tech Overlays (Cantoneiras e Grid) */}
        <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-white/10 rounded-tl-3xl m-8 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-white/10 rounded-br-3xl m-8 pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />

        {/* Content Container */}
        <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 md:p-12 max-w-[1440px] mx-auto">
           
           {/* Top Nav */}
           <div className="flex justify-between items-start">
             <button 
               onClick={onBack}
               className="group flex items-center gap-3 px-5 py-3 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
             >
               <ArrowLeft className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
               <span className="font-medium text-sm tracking-wider uppercase">Voltar</span>
             </button>

             <div className="flex gap-3">
               <button className="p-3 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-orange-500/50 hover:text-orange-500 transition-all">
                 <Share2 className="w-5 h-5" />
               </button>
               <button className="p-3 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-red-500/50 hover:text-red-500 transition-all">
                 <Heart className="w-5 h-5" />
               </button>
             </div>
           </div>

           {/* Hero Info - Alinhado Verticalmente (Items Center) */}
           <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12 pb-8">
              
              {/* Data Holográfica (Destaque) */}
              <div className="flex flex-col items-center justify-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 min-w-[120px] shadow-[0_8px_32px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="text-6xl font-black text-white font-display leading-none tracking-tight drop-shadow-lg">
                    {day}
                  </span>
                  <span className="text-xl font-bold text-orange-500 uppercase tracking-widest mt-2">
                    {month}
                  </span>
                  <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
              </div>

              {/* Títulos e Metadados */}
              <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-4">
                      <span className="px-3 py-1 rounded bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-bold uppercase tracking-widest">
                        {event.category}
                      </span>
                      <div className="flex items-center gap-2 text-gray-300 text-sm font-medium tracking-wide">
                        <MapPin className="w-4 h-4 text-orange-500" />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-2 text-gray-300 text-sm font-medium tracking-wide">
                        <Clock className="w-4 h-4 text-orange-500" />
                        {time}
                      </div>
                  </div>

                  <h1 className="text-5xl md:text-7xl font-black text-white uppercase font-display leading-[0.9] tracking-tight">
                    {event.title}
                  </h1>
              </div>

           </div>
        </div>
      </div>

      {/* --- MAIN LAYOUT (SPLIT) --- */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* --- LEFT COLUMN (CONTENT OR CHECKOUT) - 7 COLUNAS --- */}
        <div className="lg:col-span-7 pt-0 lg:pt-0">
          
          {currentStep === 'DETAILS' ? (
            <div className="space-y-16 animate-in slide-in-from-left-4 duration-500">
              
              {/* SOBRE */}
              <section className="p-8 rounded-3xl bg-white/[0.03] border border-white/5 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white font-display uppercase tracking-wide mb-6 flex items-center gap-3">
                  <Zap className="w-6 h-6 text-orange-500" /> Sobre o evento
                </h3>
                <div className="text-base md:text-lg text-gray-300 font-normal leading-relaxed max-w-none">
                  <p>{event.description}</p>
                </div>
              </section>

              {/* LINEUP */}
              <section>
                 <h3 className="text-2xl font-bold text-white font-display uppercase tracking-wide mb-8 flex items-center gap-3">
                    <Music className="w-6 h-6 text-orange-500" /> Line Up
                 </h3>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((artist) => (
                      <div key={artist} className="group relative aspect-square rounded-2xl overflow-hidden bg-white/5 cursor-pointer">
                        <img 
                          src={`https://picsum.photos/seed/artist${artist}/400/400`} 
                          alt="Artist" 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80" />
                        <div className="absolute bottom-4 left-4">
                           <p className="text-white font-bold uppercase font-display tracking-wide text-sm group-hover:text-orange-500 transition-colors">DJ {artist}</p>
                           <p className="text-xs text-gray-400">Techno / House</p>
                        </div>
                      </div>
                    ))}
                 </div>
              </section>

              {/* FAQ (PERGUNTAS FREQUENTES) - NOVO */}
              <FAQ />

              {/* LOCALIZAÇÃO */}
              <section className="rounded-3xl bg-white/[0.03] border border-white/5 backdrop-blur-sm overflow-hidden flex flex-col md:flex-row">
                 <div className="p-8 md:p-10 w-full md:w-1/2 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-white font-display uppercase tracking-wide mb-8 flex items-center gap-3">
                      <Navigation className="w-6 h-6 text-orange-500" /> Como Chegar
                    </h3>
                    
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h4 className="text-3xl font-bold text-white font-display leading-tight">{event.location}</h4>
                            <p className="text-gray-300 font-light text-lg leading-snug">Av. Pedro Álvares Cabral, s/n<br/>Vila Mariana, São Paulo - SP</p>
                        </div>
                        
                        <div className="space-y-3 pt-4">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Traçar rota com:</p>
                            <div className="grid grid-cols-1 gap-3">
                                {/* Google Maps */}
                                <button className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 hover:bg-orange-500 hover:text-black border border-white/10 transition-all duration-300 group">
                                  <div className="flex items-center gap-3">
                                      <Map className="w-5 h-5 text-gray-400 group-hover:text-black" />
                                      <span className="font-medium">Google Maps</span>
                                  </div>
                                  <ArrowLeft className="w-4 h-4 rotate-180 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>
                                
                                {/* Waze */}
                                <button className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 hover:bg-blue-400 hover:text-white border border-white/10 transition-all duration-300 group">
                                  <div className="flex items-center gap-3">
                                      <Compass className="w-5 h-5 text-gray-400 group-hover:text-white" />
                                      <span className="font-medium">Waze</span>
                                  </div>
                                  <ArrowLeft className="w-4 h-4 rotate-180 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>

                                {/* Uber */}
                                <button className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 hover:bg-black hover:text-white border border-white/10 transition-all duration-300 group">
                                  <div className="flex items-center gap-3">
                                      <Car className="w-5 h-5 text-gray-400 group-hover:text-white" />
                                      <span className="font-medium">Uber</span>
                                  </div>
                                  <ArrowLeft className="w-4 h-4 rotate-180 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>
                            </div>
                        </div>
                    </div>
                 </div>

                 <div className="relative w-full md:w-1/2 min-h-[400px]">
                    <img src="https://picsum.photos/seed/map/800/800?grayscale" alt="Map" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                    <div className="absolute inset-0 bg-orange-900/10 mix-blend-overlay"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="relative">
                          <div className="w-6 h-6 bg-orange-500 rounded-full animate-ping absolute top-0 left-0"></div>
                          <div className="w-6 h-6 bg-orange-500 rounded-full relative border-4 border-white shadow-lg"></div>
                        </div>
                    </div>
                    <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0d0d0f] to-transparent hidden md:block"></div>
                    <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#0d0d0f] to-transparent md:hidden"></div>
                 </div>
              </section>

              {/* ORGANIZADOR */}
              <section className="p-8 rounded-3xl bg-white/[0.03] border border-white/5 backdrop-blur-sm flex flex-col md:flex-row items-center justify-between gap-6">
                 <div className="flex items-center gap-6">
                    <div className="relative">
                       <div className="w-20 h-20 rounded-full p-[2px] bg-gradient-to-tr from-orange-500 to-red-600">
                          <img src="https://picsum.photos/seed/organizer/200/200" alt="Organizer" className="w-full h-full rounded-full object-cover border-4 border-[#09090b]" />
                       </div>
                       <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full border-4 border-[#09090b]" title="Verificado">
                          <CheckCircle2 className="w-3 h-3" />
                       </div>
                    </div>
                    <div>
                       <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Produzido por</p>
                       <h4 className="text-2xl font-bold text-white font-display">Lumina Productions</h4>
                       <p className="text-gray-400 text-sm mt-1">Criando experiências desde 2010.</p>
                    </div>
                 </div>
                 <div className="flex gap-4 w-full md:w-auto">
                    <button className="flex-1 md:flex-none px-6 py-3 rounded-xl border border-white/10 hover:bg-white hover:text-black transition-colors font-medium text-sm uppercase tracking-wide">
                       Seguir
                    </button>
                    <button className="flex-1 md:flex-none px-6 py-3 rounded-xl bg-white/5 hover:bg-orange-500 hover:text-white transition-colors font-medium text-sm uppercase tracking-wide">
                       Contato
                    </button>
                 </div>
              </section>

            </div>
          ) : (
            // --- FLUXO DE CHECKOUT ---
            <div className="space-y-10 animate-in slide-in-from-right-4 duration-500">
               <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                  <h2 className="text-3xl font-bold font-display uppercase tracking-wide">Checkout</h2>
                  <div className="h-px flex-1 bg-white/10"></div>
                  <span className="text-sm font-medium text-gray-400">Etapa 2 de 2</span>
               </div>

               {/* 1. Titulares */}
               <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/5">
                  <h3 className="text-xl font-bold text-white font-display uppercase mb-6 flex items-center gap-3">
                     <User className="w-5 h-5 text-orange-500" /> Titulares dos Ingressos
                  </h3>
                  <div className="space-y-6">
                     {guests.map((guest, index) => (
                        <div key={guest.tempId} className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl bg-black/20 border border-white/5">
                           <div className="md:col-span-2 flex items-center gap-3 border-b border-white/5 pb-4 mb-2">
                              <Ticket className="w-4 h-4 text-gray-500" />
                              <span className="text-sm font-bold text-white uppercase tracking-wider">{guest.ticketName} <span className="text-gray-500 text-xs ml-2">#{index + 1}</span></span>
                           </div>
                           <div className="space-y-2">
                              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Nome Completo</label>
                              <input type="text" className="w-full bg-white/5 border border-white/10 focus:border-orange-500 rounded-xl px-4 py-3 text-white outline-none transition-colors" placeholder="Ex: João Silva" />
                           </div>
                           <div className="space-y-2">
                              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">E-mail</label>
                              <input type="email" className="w-full bg-white/5 border border-white/10 focus:border-orange-500 rounded-xl px-4 py-3 text-white outline-none transition-colors" placeholder="joao@email.com" />
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               {/* 2. Pagamento */}
               <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/5">
                  <h3 className="text-xl font-bold text-white font-display uppercase mb-6 flex items-center gap-3">
                     <CreditCard className="w-5 h-5 text-orange-500" /> Pagamento
                  </h3>
                  <div className="flex gap-4 mb-8">
                     <button 
                        onClick={() => setPaymentMethod('CREDIT_CARD')}
                        className={`flex-1 p-4 rounded-xl border flex flex-col items-center gap-3 transition-all ${paymentMethod === 'CREDIT_CARD' ? 'bg-orange-500/10 border-orange-500 text-white' : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10'}`}
                     >
                        <CreditCard className="w-6 h-6" />
                        <span className="font-bold text-sm uppercase tracking-wide">Cartão de Crédito</span>
                     </button>
                     <button 
                        onClick={() => setPaymentMethod('PIX')}
                        className={`flex-1 p-4 rounded-xl border flex flex-col items-center gap-3 transition-all ${paymentMethod === 'PIX' ? 'bg-orange-500/10 border-orange-500 text-white' : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10'}`}
                     >
                        <QrCode className="w-6 h-6" />
                        <span className="font-bold text-sm uppercase tracking-wide">Pix (Instantâneo)</span>
                     </button>
                  </div>
                  {/* Inputs de cartão... */}
               </div>
            </div>
          )}

        </div>

        {/* --- RIGHT COLUMN (SIDEBAR) - 5 COLUNAS --- */}
        <div className="lg:col-span-5 h-full relative">
           
          {/* ESTRUTURA FLEX PARA SEPARAR LISTA (Scroll) DE FOOTER (Fixo) */}
          <div className="sticky top-24 flex flex-col gap-4 max-h-[calc(100vh-8rem)]">
            
            {/* 1. CONTAINER DOS INGRESSOS (SCROLLABLE AREA) */}
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 -mr-1">
               <div className="p-6 rounded-3xl bg-[#09090b]/80 border border-white/10 backdrop-blur-xl space-y-6 shadow-2xl shadow-black/80">
                  
                  {/* Header Sidebar */}
                  <div className="flex items-center justify-between">
                     <div className="space-y-1">
                        <h3 className="text-4xl font-black font-display uppercase tracking-wide text-white leading-none">INGRESSOS</h3>
                        <p className="text-lg text-gray-400 font-medium">Selecione seus acessos</p>
                     </div>
                     {currentStep === 'CHECKOUT' && (
                       <button 
                         onClick={() => setCurrentStep('DETAILS')} 
                         className="text-orange-500 hover:text-white text-xs font-bold uppercase tracking-widest underline decoration-orange-500/30 hover:decoration-white underline-offset-4 transition-all self-start"
                       >
                         Alterar
                       </button>
                     )}
                  </div>

                  {/* LISTA DE INGRESSOS (Accordion por Categoria) */}
                  <div className="space-y-4 pt-2">
                    
                    {Object.entries(ticketsByCategory).map(([categoryName, tickets]) => {
                      const isOpen = openCategories[categoryName];
                      const minPrice = Math.min(...tickets.map(t => t.price));

                      return (
                      <div key={categoryName} className="mb-4">
                        
                        {/* Categoria Header */}
                        <button 
                          onClick={() => toggleCategory(categoryName)}
                          className={`
                            w-full flex items-center justify-between p-6 rounded-2xl border transition-all duration-300 group
                            ${isOpen 
                              ? 'bg-white/10 border-orange-500/50 shadow-[0_0_30px_rgba(249,115,22,0.1)]' 
                              : 'bg-white/[0.03] border-white/5 hover:bg-white/5 hover:border-white/10'
                            }
                          `}
                        >
                          <div className="flex items-center gap-4">
                             <div className={`w-1 h-8 rounded-full transition-colors duration-300 ${isOpen ? 'bg-orange-500' : 'bg-white/10 group-hover:bg-orange-500/50'}`}></div>
                             <div className="text-left">
                               <span className="block text-xl font-bold text-white uppercase tracking-wide font-display">{categoryName}</span>
                               <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] bg-white/5 border border-white/5 text-gray-400 font-bold uppercase tracking-widest">{tickets.length} opções</span>
                             </div>
                          </div>
                          
                          <div className="flex items-center gap-6">
                              <div className="text-right hidden sm:block">
                                 <span className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-0.5">À partir de</span>
                                 <div className="flex items-baseline justify-end gap-1">
                                   <span className="text-xs text-orange-500 font-bold">R$</span>
                                   <span className="text-lg font-bold text-white font-display">{minPrice.toFixed(0)}</span>
                                 </div>
                              </div>
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 ${isOpen ? 'bg-orange-500 text-white border-orange-500' : 'bg-white/5 text-gray-400 border-white/5 group-hover:border-white/20 group-hover:text-white'}`}>
                                 {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                              </div>
                          </div>
                        </button>

                        {/* Tickets List */}
                        {isOpen && (
                          <div className="pt-4 pl-4 space-y-4 animate-in slide-in-from-top-2 duration-300">
                            {tickets.map(ticket => {
                              const quantity = quantities[ticket.id] || 0;
                              const isSelected = quantity > 0;
                              if (currentStep === 'CHECKOUT' && !isSelected) return null;

                              return (
                                <div key={ticket.id} className={`relative flex overflow-hidden rounded-xl border transition-all duration-300 ${isSelected ? 'bg-white/10 border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.1)]' : 'bg-white/5 border-white/10 hover:border-white/20'}`}>
                                  {/* Reduced padding (p-4), min-height (80px) and updated layout */}
                                  <div className="flex-1 p-4 flex flex-col justify-center min-h-[80px] min-w-0">
                                     <div className="flex items-center justify-between gap-4">
                                        {/* Name - Left */}
                                        <div className="flex flex-col flex-1 min-w-0">
                                           <h4 className="text-lg font-bold text-white font-sans uppercase tracking-wide leading-none break-words">{ticket.name}</h4>
                                        </div>
                                        {/* Price & Fee - Right Aligned Vertical */}
                                        <div className="text-right flex-shrink-0 whitespace-nowrap pl-2 flex flex-col items-end justify-center">
                                           <span className="block text-2xl font-bold text-white font-display tracking-tight">R$ {ticket.price}</span>
                                           <p className="text-sm text-gray-400 font-medium tracking-wide mt-1">+ R$ {(ticket.price * 0.10).toFixed(2)} taxa</p>
                                        </div>
                                     </div>
                                  </div>
                                  {currentStep === 'DETAILS' && (
                                    <div className={`w-14 flex-shrink-0 flex flex-col border-l transition-colors duration-300 ${isSelected ? 'border-orange-500 bg-orange-500/10' : 'border-white/10 bg-black/20'}`}>
                                       {quantity > 0 ? (
                                         <>
                                           <button onClick={() => updateQuantity(ticket.id, 1)} className="flex-1 flex items-center justify-center hover:bg-orange-500 hover:text-white text-orange-500 transition-colors"><Plus className="w-4 h-4" /></button>
                                           <div className="h-8 flex items-center justify-center font-bold text-white font-display text-lg bg-black/20">{quantity}</div>
                                           <button onClick={() => updateQuantity(ticket.id, -1)} className="flex-1 flex items-center justify-center hover:bg-red-500 hover:text-white text-gray-400 transition-colors"><Minus className="w-4 h-4" /></button>
                                         </>
                                       ) : (
                                         <button onClick={() => updateQuantity(ticket.id, 1)} className="w-full h-full flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 transition-colors group"><Plus className="w-6 h-6 group-hover:scale-110 transition-transform" /></button>
                                       )}
                                    </div>
                                  )}
                                  {currentStep === 'CHECKOUT' && (
                                     <div className="w-14 flex-shrink-0 flex items-center justify-center border-l border-white/10 bg-black/20 font-bold text-white font-display text-xl">{quantity}</div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                      );
                    })}
                  </div>
               </div>
            </div>

            {/* 2. RODAPÉ DO SIDEBAR (TOTALIZADORES) - FIXO FORA DO SCROLL */}
            {totalItems > 0 && (
               <div className="flex-shrink-0 rounded-2xl bg-[#09090b]/90 border border-white/10 p-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 backdrop-blur-xl shadow-2xl">
                  {currentStep === 'CHECKOUT' && (
                     <div className="flex gap-2">
                        <div className="relative flex-1">
                           <Ticket className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                           <input type="text" value={coupon} onChange={(e) => setCoupon(e.target.value.toUpperCase())} placeholder="CUPOM DE DESCONTO" className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-9 pr-3 text-sm text-white outline-none focus:border-orange-500 transition-colors font-mono tracking-wider uppercase placeholder-gray-600"/>
                        </div>
                        <button onClick={() => {}} className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors">Aplicar</button>
                     </div>
                  )}
                  <div className="space-y-3 pt-2">
                     <div className="flex justify-between text-gray-400 text-sm"><span>Subtotal ({totalItems} itens)</span><span>R$ {subtotal.toFixed(2)}</span></div>
                     <div className="flex justify-between text-gray-400 text-sm"><span>Taxa de serviço (10%)</span><span>R$ {serviceFee.toFixed(2)}</span></div>
                     {discount > 0 && (<div className="flex justify-between text-green-500 text-sm font-bold"><span>Desconto (LUMINA10)</span><span>- R$ {discount.toFixed(2)}</span></div>)}
                     <div className="h-px bg-white/10 my-2"></div>
                     <div className="flex justify-between items-end"><span className="text-white font-bold uppercase tracking-widest">Total</span><div className="text-right"><span className="text-3xl font-black text-white font-display tracking-tight">R$ {total.toFixed(2)}</span><p className="text-xs text-gray-500 mt-1 font-medium">em até 12x de R$ {(total / 12).toFixed(2)}</p></div></div>
                  </div>
                  <button onClick={currentStep === 'DETAILS' ? handleCheckout : () => alert('Fluxo finalizado!')} className="w-full group relative overflow-hidden bg-white text-black py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-orange-500/25">
                     <span className="relative z-10 flex items-center justify-center gap-2">{currentStep === 'DETAILS' ? 'COMPRAR INGRESSOS' : 'FINALIZAR COMPRA'}<ArrowLeft className="w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform duration-300" /></span>
                  </button>
                  <p className="text-center text-[10px] text-gray-600 uppercase tracking-widest font-bold flex items-center justify-center gap-2"><Lock className="w-3 h-3" /> Ambiente Seguro e Criptografado</p>
               </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};