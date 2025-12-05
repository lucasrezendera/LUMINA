import React, { useState, useMemo, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { EventCard } from './components/EventCard';
import { EventDetails } from './components/EventDetails';
import { CategoryFilter } from './components/CategoryFilter';
import { CityGrid } from './components/CityGrid';
import { Footer } from './components/Footer';
import { CATEGORIES, MOCK_EVENTS } from './constants';
import { FilterType, Event } from './types';
import { Sparkles, Zap } from 'lucide-react';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>(FilterType.ALL);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Scroll to top when event opens
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedEvent]);

  // Filtragem de eventos
  const filteredEvents = useMemo(() => {
    if (activeCategory === FilterType.ALL) {
      return MOCK_EVENTS;
    }
    return MOCK_EVENTS.filter(event => event.category === activeCategory);
  }, [activeCategory]);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
  };

  const handleBack = () => {
    setSelectedEvent(null);
  };

  return (
    // Mudança de #020202 para #09090b (Zinc 950) para um fundo menos agressivo
    // REMOVIDO overflow-x-hidden para permitir sticky behavior
    <div className="min-h-screen bg-[#09090b] text-white selection:bg-orange-500/30 selection:text-white font-sans flex flex-col">
      {/* Background Gradient Base - Lighter mix */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#1a1a1a] via-[#09090b] to-[#050505] -z-20"></div>
      
      <Navbar />
      
      {selectedEvent ? (
        <EventDetails event={selectedEvent} onBack={handleBack} />
      ) : (
        <>
        <main className="relative flex-grow">
          {/* O Hero agora é autônomo e foca em branding */}
          <Hero />
          
          {/* Container ajustado para 1440px */}
          <div className="max-w-[1440px] mx-auto px-6 md:px-8 space-y-20 relative z-10 pb-24">
            
            {/* Nova Seção: Cidades */}
            <CityGrid />

            {/* Marketplace Section */}
            <section className="space-y-10">
              
              {/* Header da Seção */}
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-6">
                <div className="space-y-2 max-w-2xl">
                  <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-3 text-white font-display uppercase tracking-wide">
                    <Zap className="w-8 h-8 text-orange-500 fill-orange-500/20" />
                    Próximos Eventos
                  </h2>
                  <p className="text-gray-400 font-light text-lg">Curadoria exclusiva das melhores experiências.</p>
                </div>
                
                {/* Filtros Container */}
                <div className="w-full lg:w-auto overflow-hidden">
                  <CategoryFilter 
                    categories={CATEGORIES}
                    activeCategory={activeCategory}
                    onSelectCategory={setActiveCategory}
                  />
                </div>
              </div>

              {/* Grid de Eventos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                {filteredEvents.map(event => (
                  <EventCard key={event.id} event={event} onClick={handleEventClick} />
                ))}
              </div>

              {/* Estado Vazio */}
              {filteredEvents.length === 0 && (
                <div className="w-full py-32 flex flex-col items-center justify-center text-center space-y-6 rounded-3xl bg-white/[0.03] border border-white/10 border-dashed">
                  <div className="p-4 rounded-full bg-white/5">
                    <Sparkles className="w-8 h-8 text-gray-500" />
                  </div>
                  <div>
                    <p className="text-xl font-medium text-white">Nenhum evento encontrado</p>
                    <p className="text-gray-500 mt-2">Tente mudar a categoria selecionada.</p>
                  </div>
                  <button 
                    onClick={() => setActiveCategory(FilterType.ALL)}
                    className="text-orange-400 hover:text-orange-300 font-medium transition-colors"
                  >
                    Ver todos os eventos
                  </button>
                </div>
              )}

            </section>
          </div>
        </main>
        
        <Footer />
        </>
      )}

    </div>
  );
};

export default App;