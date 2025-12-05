import React from 'react';
import { Ticket, Instagram, Twitter, Facebook, Mail, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-[#050505] pt-20 pb-10 mt-24">
      {/* Container ajustado para 1440px */}
      <div className="max-w-[1440px] mx-auto px-6">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-gradient-to-tr from-orange-600 to-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-900/20">
                 <Ticket className="w-5 h-5 text-white" />
               </div>
               <span className="text-2xl font-black text-white tracking-widest font-display uppercase">Lumina</span>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm">
              A plataforma definitiva para experiências ao vivo. Conectamos você aos momentos que definem sua vida com segurança, design e exclusividade.
            </p>
            <div className="flex gap-4">
               {[Instagram, Twitter, Facebook].map((Icon, i) => (
                 <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white transition-all duration-300">
                   <Icon className="w-5 h-5" />
                 </a>
               ))}
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="text-white font-bold font-display uppercase tracking-widest mb-6">Descubra</h4>
            <ul className="space-y-4 text-gray-400 text-sm font-medium">
              <li><a href="#" className="hover:text-orange-500 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span> Shows & Festivais</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span> Teatro & Cultura</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span> Esportes</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span> Conferências</a></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="text-white font-bold font-display uppercase tracking-widest mb-6">Institucional</h4>
            <ul className="space-y-4 text-gray-400 text-sm font-medium">
              <li><a href="#" className="hover:text-orange-500 transition-colors">Sobre a Lumina</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Carreiras</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Central de Ajuda</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Política de Privacidade</a></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="text-white font-bold font-display uppercase tracking-widest mb-6">Fique por dentro</h4>
            <p className="text-gray-400 text-sm mb-4">Receba ofertas exclusivas e pré-vendas no seu e-mail.</p>
            <div className="space-y-3">
               <div className="relative">
                 <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
                 <input 
                   type="email" 
                   placeholder="seu@email.com" 
                   className="w-full bg-white/5 border border-white/10 focus:border-orange-500 rounded-xl py-3 pl-12 pr-4 text-white text-sm outline-none transition-all placeholder-gray-600"
                 />
               </div>
               <button className="w-full py-3 bg-white text-black hover:bg-orange-500 hover:text-white font-bold uppercase tracking-wider text-sm rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
                 Inscrever-se <ArrowRight className="w-4 h-4" />
               </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 uppercase tracking-wider font-medium">
          <p>© 2024 Lumina Tickets. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <span>Brasil</span>
            <span>English (US)</span>
          </div>
        </div>

      </div>
    </footer>
  );
};