import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { FAQ } from "../types";

interface FaqProps {
  faq: FAQ[];
}

export default function Faq({ faq }: FaqProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#0E5EA8] font-semibold text-sm tracking-widest uppercase font-mono">
            Dúvidas Comuns
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 mt-2 mb-4 tracking-tight leading-none">
            Perguntas Frequentes
          </h2>
          <p className="text-slate-500 text-base sm:text-lg">
            Tem alguma pergunta sobre o passeio, horários ou formas de pagamento? Confira as respostas rápidas abaixo.
          </p>
        </div>

        {/* FAQ Accordion Grid */}
        <div className="space-y-4">
          {faq.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="bg-white/60 backdrop-blur-md rounded-2xl border border-white/80 shadow-md overflow-hidden transition-all duration-300 hover:bg-white/80 hover:shadow-lg"
              >
                <button
                  onClick={() => toggle(item.id)}
                  className="w-full flex items-center justify-between p-6 text-left font-display font-bold text-base sm:text-lg text-slate-800 hover:text-[#0E5EA8] transition-colors focus:outline-none cursor-pointer"
                >
                  <div className="flex items-center space-x-3 pr-4">
                    <HelpCircle className="w-5 h-5 text-[#0E5EA8] flex-shrink-0" />
                    <span>{item.pergunta}</span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-0 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-200/40 animate-fadeIn">
                    {item.resposta}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
