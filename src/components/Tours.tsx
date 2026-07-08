import { useState } from "react";
import { Clock, MapPin, Compass, MessageCircle, X, ChevronRight, Info } from "lucide-react";
import { Passeio, Config } from "../types";
import { getWhatsAppUrl } from "../utils/dataLoader";

interface ToursProps {
  passeios: Passeio[];
  config: Config;
}

export default function Tours({ passeios, config }: ToursProps) {
  const [selectedPasseio, setSelectedPasseio] = useState<Passeio | null>(null);
  const [filter, setFilter] = useState<"todos" | "oeste" | "leste" | "especial">("todos");

  // Filter logic based on the "local" or type
  const filteredPasseios = passeios
    .sort((a, b) => a.ordem - b.ordem)
    .filter((p) => {
      if (filter === "todos") return true;
      if (filter === "oeste") return p.local.toLowerCase().includes("oeste");
      if (filter === "leste") return p.local.toLowerCase().includes("leste");
      if (filter === "especial") return !p.local.toLowerCase().includes("leste") && !p.local.toLowerCase().includes("oeste");
      return true;
    });

  const getWaUrlForPasseio = (p: Passeio) => {
    const text = `Olá Ceará Buggy Tur! Gostaria de reservar o passeio *${p.titulo}* (${p.tempo}) para o litoral. Poderia me passar a disponibilidade de datas?`;
    return getWhatsAppUrl(config.whatsapp, text);
  };

  return (
    <section id="passeios" className="py-24 bg-gradient-to-b from-white via-slate-50 to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#0E5EA8] font-semibold text-sm tracking-widest uppercase font-mono">
            Nossos Roteiros
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 mt-2 mb-4 tracking-tight leading-none">
            Escolha Sua Próxima Grande Aventura
          </h2>
          <p className="text-slate-500 text-lg">
            Selecione entre passeios de buggy radicais nas dunas, travessias 4x4 confortáveis ou excursões exclusivas pelo litoral cearense.
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {[
              { id: "todos", label: "Todos os Roteiros" },
              { id: "leste", label: "Litoral Leste" },
              { id: "oeste", label: "Litoral Oeste" },
              { id: "especial", label: "Especiais & 4x4" }
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setFilter(btn.id as any)}
                className={`px-5 py-2 rounded-full text-sm font-bold tracking-wide transition-all duration-300 cursor-pointer border ${
                  filter === btn.id
                    ? "bg-[#0E5EA8] text-white shadow-lg border-[#0E5EA8]/20 shadow-[#0E5EA8]/20"
                    : "bg-white/50 backdrop-blur-sm text-slate-600 border-white/80 hover:bg-white/80 hover:text-slate-900 shadow-sm"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of Tours */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPasseios.map((p) => (
            <div
              key={p.id}
              className="group bg-white/75 backdrop-blur-md rounded-3xl overflow-hidden border border-white/80 shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col h-full transform hover:-translate-y-2 relative"
            >
              {/* Highlight Tag */}
              {p.destacado && (
                <div className="absolute top-4 left-4 z-10 bg-[#F4C430] text-slate-950 font-bold text-[11px] tracking-wider uppercase px-3 py-1 rounded-full shadow-md">
                  ★ Mais Reservado
                </div>
              )}

              {/* Tour Image */}
              <div className="relative h-64 overflow-hidden bg-slate-100">
                <img
                  src={p.imagem}
                  alt={p.titulo}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content body */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center space-x-1 text-xs text-[#0E5EA8] font-bold font-mono tracking-wider uppercase mb-2">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{p.local}</span>
                </div>

                <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900 group-hover:text-[#0E5EA8] transition-colors duration-200">
                  {p.titulo}
                </h3>

                <p className="text-slate-500 text-sm mt-3 line-clamp-3 leading-relaxed flex-grow">
                  {p.descricao}
                </p>

                {/* Duration / Pricing details bar */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-slate-700">
                  <div className="flex items-center space-x-1.5 text-xs font-semibold text-slate-500">
                    <Clock className="w-4 h-4 text-[#F4C430]" />
                    <span>{p.tempo}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block font-mono">VALOR A PARTIR DE</span>
                    <span className="font-display font-extrabold text-base text-[#0E5EA8]">
                      {isNaN(Number(p.preco)) ? p.preco : `R$ ${p.preco}`}
                    </span>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSelectedPasseio(p)}
                    className="inline-flex items-center justify-center space-x-1 border border-slate-200 hover:border-[#0E5EA8] text-slate-700 hover:text-[#0E5EA8] py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>Saiba Mais</span>
                  </button>

                  <a
                    href={getWaUrlForPasseio(p)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center space-x-1 bg-[#0E5EA8] hover:bg-[#083c6b] text-white py-2.5 rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Reservar</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state when filters return nothing */}
        {filteredPasseios.length === 0 && (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <Compass className="w-12 h-12 text-slate-300 mx-auto animate-spin" />
            <p className="text-slate-500 mt-4 font-semibold">Nenhum roteiro disponível para essa categoria no momento.</p>
          </div>
        )}
      </div>

      {/* Saiba Mais Details Modal */}
      {selectedPasseio && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md animate-fadeIn">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-white/60 relative animate-scaleUp flex flex-col">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedPasseio(null)}
              className="absolute top-4 right-4 z-20 bg-slate-900/40 text-white p-2 rounded-full hover:bg-slate-900/60 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Banner Image */}
            <div className="relative h-48 sm:h-64 w-full bg-slate-100 flex-shrink-0">
              <img
                src={selectedPasseio.imagem}
                alt={selectedPasseio.titulo}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white">
                <span className="inline-flex items-center space-x-1 text-xs text-[#F4C430] font-bold font-mono tracking-wider uppercase mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{selectedPasseio.local}</span>
                </span>
                <h3 className="font-display font-extrabold text-xl sm:text-3xl md:text-4xl">
                  {selectedPasseio.titulo}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-8 overflow-y-auto flex-1">
              <div className="flex flex-wrap gap-4 items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center space-x-2 text-slate-600 font-medium text-sm">
                  <Clock className="w-5 h-5 text-[#0E5EA8]" />
                  <span>Tempo estimado: <strong>{selectedPasseio.tempo}</strong></span>
                </div>
                <div className="bg-[#0E5EA8]/5 border border-[#0E5EA8]/10 py-1.5 px-4 rounded-xl text-center">
                  <span className="text-[10px] text-slate-400 block font-mono">INVESTIMENTO</span>
                  <span className="font-display font-extrabold text-lg text-[#0E5EA8]">
                    {isNaN(Number(selectedPasseio.preco)) ? selectedPasseio.preco : `R$ ${selectedPasseio.preco}`}
                  </span>
                </div>
              </div>

              <h4 className="font-display font-bold text-slate-900 text-lg mb-2">
                O que espera por você
              </h4>
              <p className="text-slate-600 leading-relaxed text-sm mb-6">
                {selectedPasseio.descricao} O passeio conta com paradas estratégicas para fotos nas paisagens mais exuberantes, pontos de banho em lagoas refrescantes e almoço opcional nos melhores restaurantes à beira-mar de cada localidade. Tudo sob o comando seguro dos nossos guias credenciados.
              </p>

              {/* Safety/Inclusions notice */}
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl mb-8 flex items-start space-x-3">
                <Compass className="w-5 h-5 text-[#F4C430] flex-shrink-0 mt-0.5" />
                <div className="text-xs text-slate-500 leading-normal">
                  <strong className="text-slate-700 block mb-0.5">O que está incluso no passeio básico:</strong>
                  Veículo exclusivo (Buggy ou 4x4), motorista profissional credenciado, combustível e seguro para passageiros. Não inclui almoço, tirolesa e taxas de atrações locais.
                </div>
              </div>

              {/* Booking CTAs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => setSelectedPasseio(null)}
                  className="w-full border border-slate-200 hover:bg-slate-50 text-slate-700 py-3.5 rounded-full font-bold text-sm transition-all cursor-pointer"
                >
                  Voltar para o Site
                </button>
                <a
                  href={getWaUrlForPasseio(selectedPasseio)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center space-x-2 bg-[#0E5EA8] hover:bg-[#083c6b] text-white py-3.5 rounded-full font-bold text-sm shadow-lg hover:shadow-xl transition-all cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 text-[#F4C430]" />
                  <span>Garantir Vaga Agora</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
