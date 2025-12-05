import React from 'react';
import { Search, Ticket, User, Bell, Menu } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
      {/* Container ajustado para 1440px (pouco mais fechado que 1600px) */}
      <div className="max-w-[1440px] mx-auto">
        <div className="bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-3 flex items-center justify-between shadow-2xl shadow-black/50">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-white text-black p-1.5 rounded-lg">
              <Ticket className="w-4 h-4 fill-black" />
            </div>
            <span className="text-lg font-bold text-white tracking-widest font-display uppercase">
              Lumina
            </span>
          </div>

          {/* Nav Links - Desktop */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#" className="text-white hover:text-orange-500 transition-colors">Home</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Eventos</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Categorias</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Ofertas</a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/5 md:hidden">
              <Search className="w-5 h-5" />
            </button>
            
            <button className="relative p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/5">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
            </button>
            
            <div className="h-6 w-px bg-white/10 mx-1 hidden sm:block"></div>
            
            <button className="hidden sm:flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border border-white/5 hover:bg-white/5 hover:border-white/10 transition-all group">
              <div className="w-7 h-7 rounded-full bg-gray-800 flex items-center justify-center border border-white/10 group-hover:border-orange-500/50 group-hover:bg-gray-700">
                <User className="w-3.5 h-3.5 text-gray-300" />
              </div>
              <span className="text-sm text-gray-300 font-medium">Entrar</span>
            </button>

             <button className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/5 md:hidden">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};