import React from 'react';
import { Search, ChevronRight } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative w-full min-h-[70vh] flex flex-col items-center justify-center pt-32 pb-20 px-4 overflow-hidden">
      
      {/* Background Abstract Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        
        {/* Glows (Red/Orange) */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-orange-600/20 rounded-full blur-[120px] opacity-40 mix-blend-screen" />
        <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-red-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        
        {/* Badge */}
        <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-6 group cursor-pointer hover:border-orange-500/30 transition-colors">
          <span className="flex w-2 h-2 bg-orange-500 rounded-full mr-2 animate-pulse"></span>
          <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors tracking-wide font-sans">
            A nova era dos eventos ao vivo
          </span>
        </div>

        {/* Main Title / Phrase */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.1] font-display uppercase">
          Vivencie o <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-500">
            Inesquecível
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-sans font-light">
          Seu passaporte exclusivo para os festivais, teatros e experiências mais cobiçadas do mundo. Design, segurança e facilidade em um só lugar.
        </p>

        {/* Search / Action Bar */}
        <div className="w-full max-w-2xl mx-auto mt-10 p-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl shadow-orange-900/10 flex flex-col md:flex-row gap-2">
           <div className="relative flex-1">
             <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
               <Search className="h-5 w-5 text-gray-500" />
             </div>
             <input
               type="text"
               placeholder="Busque por eventos, artistas ou locais..."
               className="block w-full pl-12 pr-4 py-4 bg-transparent text-white placeholder-gray-500 focus:outline-none text-base font-sans"
             />
           </div>
           <button className="px-8 py-3 md:py-0 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 font-display uppercase tracking-wider text-sm">
             Explorar
             <ChevronRight className="w-4 h-4" />
           </button>
        </div>

        {/* Stats or Trust Indicators (Optional aesthetic touch) */}
        <div className="pt-12 flex items-center justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {['Spotify', 'Ticketmaster', 'LiveNation', 'RedBull'].map((brand) => (
             <span key={brand} className="text-sm font-bold tracking-widest text-white/40 uppercase font-display">{brand}</span>
          ))}
        </div>

      </div>
    </section>
  );
};