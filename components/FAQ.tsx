import React, { useState } from 'react';
import { HelpCircle, Plus, Minus } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const questions = [
    {
      question: "Qual a classificação etária do evento?",
      answer: "Evento destinado exclusivamente para maiores de 18 anos. É obrigatória a apresentação de documento original com foto (RG, CNH ou Passaporte) na entrada. Não será aceita entrada de menores mesmo acompanhados."
    },
    {
      question: "Haverá estacionamento no local?",
      answer: "Sim, o local conta com estacionamento oficial terceirizado com segurança 24h. Recomendamos a compra antecipada do voucher de estacionamento para garantir sua vaga e agilizar a entrada."
    },
    {
      question: "Política de cancelamento e reembolso",
      answer: "O cancelamento pode ser solicitado em até 7 dias corridos após a compra, desde que a solicitação seja feita até 48 horas antes do início do evento. Após esse prazo, não realizamos estornos."
    },
    {
      question: "O evento é coberto ou open-air?",
      answer: "O evento possui formato híbrido. A pista principal e os bares são cobertos, garantindo conforto em caso de chuva. A área de descanso e food park são open-air."
    },
    {
      question: "Pode levar câmera fotográfica?",
      answer: "Não é permitida a entrada de câmeras profissionais (com lentes intercambiáveis) sem credenciamento prévio de imprensa. Câmeras compactas e celulares são permitidos."
    }
  ];

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="p-8 rounded-3xl bg-white/[0.03] border border-white/5 backdrop-blur-sm">
      <h3 className="text-2xl font-bold text-white font-display uppercase tracking-wide mb-8 flex items-center gap-3">
        <HelpCircle className="w-6 h-6 text-orange-500" /> Perguntas Frequentes
      </h3>

      <div className="space-y-4">
        {questions.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index} 
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen ? 'bg-white/5 border-orange-500/30' : 'bg-transparent border-white/5 hover:bg-white/[0.02]'}`}
            >
              <button
                onClick={() => toggleIndex(index)}
                className="w-full flex items-center justify-between p-5 text-left group"
              >
                <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                  {item.question}
                </span>
                <div className={`p-2 rounded-full border transition-all ${isOpen ? 'bg-orange-500 border-orange-500 text-white' : 'border-white/10 text-gray-400 group-hover:border-white/30 group-hover:text-white'}`}>
                  {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="p-5 pt-0 text-gray-400 leading-relaxed text-base border-t border-white/5 mt-2">
                  {item.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};