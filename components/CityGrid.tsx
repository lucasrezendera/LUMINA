import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';

const CITIES = [
  { id: 1, name: 'São Paulo', image: 'https://picsum.photos/seed/sp/800/400', count: 142 },
  { id: 2, name: 'Rio de Janeiro', image: 'https://picsum.photos/seed/rj/800/400', count: 89 },
  { id: 3, name: 'Curitiba', image: 'https://picsum.photos/seed/cwb/800/400', count: 34 },
  { id: 4, name: 'Belo Horizonte', image: 'https://picsum.photos/seed/bh/800/400', count: 56 },
];

export const CityGrid: React.FC = () => {
  return (
    <section className="w-full">
      <div className="flex items-end justify-between mb-8">
        <div>
           <h2 className="text-2xl font-bold font-display uppercase text-white tracking-wide flex items-center gap-2">
             <MapPin className="w-5 h-5 text-orange-500" /> Destinos em Alta
           </h2>
           <p className="text-gray-400 mt-1">Explore eventos nas principais capitais.</p>
        </div>
        <button className="hidden md:flex items-center gap-2 text-sm font-bold text-orange-500 hover:text-white transition-colors uppercase tracking-wider">
          Ver todas <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {CITIES.map((city) => (
          <div 
            key={city.id} 
            className="group relative h-40 rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-orange-500/50 transition-all duration-500"
          >
            {/* Imagem de Fundo */}
            <img 
              src={city.image} 
              alt={city.name} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
            />
            
            {/* Overlay Gradiente */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />

            {/* Conteúdo */}
            <div className="absolute bottom-0 left-0 p-5 w-full">
              <h3 className="text-xl font-bold text-white font-display uppercase tracking-wide group-hover:translate-x-1 transition-transform duration-300">
                {city.name}
              </h3>
              <div className="flex items-center justify-between mt-1 opacity-60 group-hover:opacity-100 transition-opacity">
                <span className="text-xs font-medium text-gray-300 uppercase tracking-wider">{city.count} Eventos</span>
                <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                   <ArrowRight className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};