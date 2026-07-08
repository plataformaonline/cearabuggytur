import { useEffect, useState, useRef } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, Award } from "lucide-react";
import { Depoimento } from "../types";

interface TestimonialsProps {
  depoimentos: Depoimento[];
}

export default function Testimonials({ depoimentos }: TestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setActiveIndex((prevIndex) =>
          prevIndex === depoimentos.length - 1 ? 0 : prevIndex + 1
        ),
      6000 // auto slide every 6 seconds
    );

    return () => {
      resetTimeout();
    };
  }, [activeIndex, depoimentos.length]);

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? depoimentos.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === depoimentos.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section id="depoimentos" className="py-24 bg-gradient-to-b from-white via-slate-50 to-white relative overflow-hidden">
      {/* Decorative Beach Dunes Silhouette in background if any */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#0E5EA8] via-[#F4C430] to-[#0E5EA8]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#0E5EA8] font-semibold text-sm tracking-widest uppercase font-mono">
            Depoimentos Reais
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 mt-2 mb-4 tracking-tight leading-none">
            A Opinião de Quem Já Viveu a Emoção
          </h2>
          <p className="text-slate-500 text-lg">
            Nossa maior conquista é o sorriso e a satisfação de cada viajante. Confira os relatos de quem escolheu a melhor agência do Ceará.
          </p>
        </div>

        {/* Carousel layout + Google Reviews Badge Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Dynamic Auto Carousel */}
          <div className="lg:col-span-8 relative">
            <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-white/80 shadow-lg relative min-h-[350px] flex flex-col justify-between">
              
              {/* Quote Mark Icon */}
              <div className="absolute -top-5 -left-5 bg-[#F4C430] text-slate-900 p-4 rounded-3xl shadow-lg">
                <Quote className="w-8 h-8 fill-current" />
              </div>

              {/* Slider Content */}
              {depoimentos.length > 0 && depoimentos[activeIndex] && (
                <div className="animate-fadeIn">
                  {/* Stars */}
                  <div className="flex items-center space-x-1 mb-6">
                    {[...Array(depoimentos[activeIndex].nota || 5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <blockquote className="text-slate-700 text-lg sm:text-xl italic leading-relaxed font-sans mb-8">
                    "{depoimentos[activeIndex].depoimento}"
                  </blockquote>

                  {/* Customer Avatar & Meta */}
                  <div className="flex items-center space-x-4">
                    <img
                      src={depoimentos[activeIndex].foto}
                      alt={depoimentos[activeIndex].nome}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-full object-cover border-2 border-[#0E5EA8] shadow-md"
                    />
                    <div>
                      <h4 className="font-display font-bold text-slate-900 text-base">
                        {depoimentos[activeIndex].nome}
                      </h4>
                      <p className="text-slate-400 text-xs font-medium uppercase font-mono">
                        {depoimentos[activeIndex].data} • Cliente Verificado
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {depoimentos.length === 0 && (
                <div className="text-center text-slate-400 py-12">
                  Nenhum depoimento carregado.
                </div>
              )}

              {/* Slider Arrow Buttons */}
              <div className="flex items-center justify-end space-x-3 mt-8">
                <button
                  onClick={handlePrev}
                  className="bg-white border border-slate-200 text-slate-600 hover:text-[#0E5EA8] hover:border-[#0E5EA8] p-3 rounded-full shadow-md transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="bg-white border border-slate-200 text-slate-600 hover:text-[#0E5EA8] hover:border-[#0E5EA8] p-3 rounded-full shadow-md transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

            </div>

            {/* Carousel Dot Indicators */}
            <div className="flex items-center justify-center space-x-2 mt-6">
              {depoimentos.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === activeIndex ? "w-8 bg-[#0E5EA8]" : "w-2.5 bg-slate-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right Side: Google Reviews Rating Integration Badge */}
          <div className="lg:col-span-4">
            <div className="bg-gradient-to-br from-slate-900/90 to-slate-950/95 backdrop-blur-xl text-white rounded-3xl p-8 border border-white/10 shadow-2xl text-center flex flex-col items-center">
              
              {/* Google G Logo simulation (using high contrast badge) */}
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-6 shadow-lg">
                <svg viewBox="0 0 24 24" className="w-10 h-10">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              </div>

              <h3 className="font-display font-bold text-xl text-white mb-2">
                Google Reviews
              </h3>

              {/* Total Stars */}
              <div className="flex items-center space-x-1 mb-4 text-[#F4C430]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>

              {/* Big Score */}
              <div className="font-display font-black text-5xl text-[#F4C430] tracking-tight mb-2">
                5.0 <span className="text-xl font-normal text-slate-400">/ 5.0</span>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed max-w-xs mb-6">
                Eleito o serviço de turismo em buggy com maior pontuação de todo o Ceará! Mais de <strong>1.450 clientes</strong> nos avaliaram no Google.
              </p>

              {/* Quality Seal */}
              <div className="inline-flex items-center space-x-1.5 bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-xs text-slate-300 font-mono">
                <Award className="w-4 h-4 text-[#F4C430]" />
                <span>Excelente • Selo Ouro de Qualidade</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
