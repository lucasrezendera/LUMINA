import React from 'react';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
  onClick: (event: Event) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  // Extração inteligente da data para o novo layout (Ex: "15 Out 2024")
  const dateParts = event.date.split(' ');
  const day = dateParts[0];
  const month = dateParts[1]; // Assume formato "15 Out..."

  return (
    <div onClick={() => onClick(event)} className="group relative w-full h-full bg-[#0a0a0a] cursor-pointer overflow-hidden rounded-xl border border-white/5 hover:border-orange-500/50 transition-colors duration-500 flex flex-col shadow-2xl shadow-black/50">
      
      {/* --- Tech Decorations (Cantoneiras) --- */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/10 rounded-tl-xl group-hover:border-orange-500 transition-colors duration-500 z-30"></div>
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/10 rounded-tr-xl group-hover:border-orange-500 transition-colors duration-500 z-30"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/10 rounded-bl-xl group-hover:border-orange-500 transition-colors duration-500 z-30"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/10 rounded-br-xl group-hover:border-orange-500 transition-colors duration-500 z-30"></div>
      
      {/* Scanning Line (Animation) */}
      <div className="absolute top-0 left-0 w-full h-1 bg-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.5)] -translate-y-full group-hover:translate-y-[500%] transition-transform duration-[1.5s] ease-in-out z-20 pointer-events-none opacity-0 group-hover:opacity-100"></div>

      {/* --- Image Section --- */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <img 
          src={event.imageUrl} 
          alt={event.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.8] group-hover:grayscale-0"
        />
        
        {/* Tech Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_2px,transparent_2px),linear-gradient(90deg,rgba(0,0,0,0)_2px,transparent_2px)] bg-[size:40px_40px] border-white/5 z-10 opacity-20 pointer-events-none"></div>
        
        {/* Gradiente de fundo para legibilidade */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent opacity-90 z-10"></div>
        
        {/* --- Top Floating Content --- */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-30">
            {/* Category Badge */}
            <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono font-bold text-gray-300 uppercase tracking-widest rounded shadow-lg group-hover:bg-orange-500 group-hover:text-black group-hover:border-orange-500 transition-all duration-500">
              {event.category}
            </span>

            {/* NEW DATE DISPLAY: Glassmorphism Puro */}
            <div className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-2.5 min-w-[65px] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] group-hover:bg-white/20 group-hover:border-white/30 transition-all duration-500">
                <span className="text-3xl font-black text-white font-display leading-none tracking-widest drop-shadow-md">
                  {day}
                </span>
                <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest mt-0.5 group-hover:text-white transition-colors">
                  {month}
                </span>
            </div>
        </div>

        {/* --- Bottom Content --- */}
        <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end z-20">
            <div className="space-y-4 transform transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                
                {/* Título com Reveal Effect (Surge no Hover) */}
                <h3 className="text-2xl font-black text-white font-display uppercase leading-[0.9] tracking-wide group-hover:text-orange-500 transition-all duration-500 opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 delay-100 line-clamp-2">
                    {event.title}
                </h3>
                
                <div className="flex items-center gap-2 text-gray-400 text-xs font-mono tracking-wider border-l-2 border-white/10 pl-3 group-hover:border-orange-500 transition-colors duration-500 delay-200">
                    <MapPin className="w-3 h-3 group-hover:text-orange-500 transition-colors" />
                    <span className="truncate">{event.location}</span>
                </div>

                {/* Cyber Divider */}
                <div className="flex items-center gap-2 opacity-30 group-hover:opacity-100 transition-opacity duration-500 delay-300">
                    <div className="h-px bg-white/20 flex-1"></div>
                    <div className="w-1 h-1 bg-white/50 rounded-full"></div>
                    <div className="h-px bg-white/20 w-4"></div>
                </div>

                {/* Price & Action */}
                <div className="flex items-center justify-between pt-1">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-0.5">A partir de</span>
                        <div className="flex items-baseline gap-1">
                           <span className="text-sm text-orange-500 font-bold">R$</span>
                           <span className="text-2xl font-bold text-white font-display tracking-tighter shadow-orange-500/50 drop-shadow-sm">
                                {event.price.toFixed(0)}
                           </span>
                        </div>
                    </div>
                    
                    <button className="w-12 h-12 relative flex items-center justify-center overflow-hidden bg-white/5 border border-white/10 group-hover:bg-orange-500 group-hover:border-orange-500 transition-all duration-300 rounded-lg group-hover:scale-110">
                        <ArrowUpRight className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors relative z-10 transform group-hover:rotate-45 duration-300" />
                    </button>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};