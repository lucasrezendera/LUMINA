import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  hoverEffect = false 
}) => {
  return (
    <div 
      className={`
        relative overflow-hidden rounded-2xl
        bg-gray-800/50 backdrop-blur-md
        border border-white/10
        ${hoverEffect ? 'transition-all duration-500 hover:border-white/20 hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-900/10' : ''}
        ${className}
      `}
    >
      {/* Camada de ruído opcional para textura (noise) */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
      {/* Conteúdo */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
};