import { useState } from "react";
import { Camera, Instagram, X, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { Foto } from "../types";

interface GalleryProps {
  fotos: Foto[];
}

export default function Gallery({ fotos }: GalleryProps) {
  const [activeCategory, setActiveCategory] = useState<string>("todos");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Sorting based on "ordem" field
  const sortedFotos = fotos.sort((a, b) => a.ordem - b.ordem);

  const categories = ["todos", "Praias", "Buggy", "Clientes", "Paisagens", "Pôr do Sol"];

  const filteredFotos = activeCategory === "todos"
    ? sortedFotos
    : sortedFotos.filter(f => f.categoria.toLowerCase() === activeCategory.toLowerCase());

  const handlePrev = (e: any) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    const prevIndex = lightboxIndex === 0 ? filteredFotos.length - 1 : lightboxIndex - 1;
    setLightboxIndex(prevIndex);
  };

  const handleNext = (e: any) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    const nextIndex = lightboxIndex === filteredFotos.length - 1 ? 0 : lightboxIndex + 1;
    setLightboxIndex(nextIndex);
  };

  return (
    <section id="galeria" className="py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#0E5EA8] font-semibold text-sm tracking-widest uppercase font-mono">
            Mural de Aventuras
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 mt-2 mb-4 tracking-tight leading-none">
            Instagram Feed & Galeria
          </h2>
          <p className="text-slate-500 text-lg">
            Acompanhe cliques reais de nossos clientes vivendo momentos inesquecíveis pelo litoral do Ceará.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer border ${
                  activeCategory.toLowerCase() === cat.toLowerCase()
                    ? "bg-[#0E5EA8] text-white shadow-lg border-[#0E5EA8]/20"
                    : "bg-white/40 backdrop-blur-sm text-slate-600 border-white/80 hover:bg-white/80 hover:text-slate-900 shadow-sm"
                }`}
              >
                {cat === "todos" ? "Ver Tudo" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Grid (Pinterest Like) */}
        <div className="masonry-grid">
          {filteredFotos.map((f, idx) => (
            <div
              key={f.id}
              onClick={() => setLightboxIndex(idx)}
              className="masonry-item group bg-white/60 backdrop-blur-md rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-white/80 cursor-pointer"
            >
              <div className="relative overflow-hidden bg-slate-100">
                <img
                  src={f.linkImagem}
                  alt={f.alt || f.titulo}
                  referrerPolicy="no-referrer"
                  className="w-full object-cover max-h-[500px] transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 z-10 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-[#F4C430] text-slate-950 text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-0.5 rounded-full">
                      {f.categoria}
                    </span>
                    {f.linkInstagram && (
                      <Instagram className="w-5 h-5 text-slate-200 hover:text-white" />
                    )}
                  </div>
                  
                  <h4 className="font-display font-bold text-lg leading-tight">
                    {f.titulo}
                  </h4>
                  
                  <div className="flex items-center space-x-1 text-xs text-slate-300 mt-2 font-medium">
                    <Eye className="w-4 h-4 text-[#F4C430]" />
                    <span>Ampliar Foto</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredFotos.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200">
            <Camera className="w-12 h-12 text-slate-300 mx-auto" />
            <p className="text-slate-500 mt-4 font-semibold">Nenhuma foto adicionada nessa categoria ainda.</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredFotos[lightboxIndex] && (
        <div
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4 animate-fadeIn"
        >
          {/* Controls */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 text-white hover:text-slate-300 bg-white/10 p-2.5 rounded-full z-50 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={handlePrev}
            className="absolute left-4 text-white hover:text-[#F4C430] bg-white/5 hover:bg-white/15 p-3 rounded-full z-50 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 text-white hover:text-[#F4C430] bg-white/5 hover:bg-white/15 p-3 rounded-full z-50 transition-colors cursor-pointer"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Lightbox Content Card */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900/95 backdrop-blur-xl rounded-3xl max-w-4xl w-full overflow-y-auto md:overflow-hidden shadow-2xl border border-white/10 relative flex flex-col md:flex-row max-h-[90vh]"
          >
            {/* Left Side: Photo */}
            <div className="md:flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[220px] sm:min-h-[300px]">
              <img
                src={filteredFotos[lightboxIndex].linkImagem}
                alt={filteredFotos[lightboxIndex].alt}
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[50vh] md:max-h-[70vh] object-contain"
              />
            </div>

            {/* Right Side: Details & Actions */}
            <div className="p-5 sm:p-6 md:w-80 flex flex-col justify-between text-white border-t md:border-t-0 md:border-l border-white/10 bg-slate-950/40 backdrop-blur-md md:max-h-[90vh] md:overflow-y-auto flex-shrink-0">
              <div>
                <span className="bg-[#0E5EA8] text-white text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-full">
                  {filteredFotos[lightboxIndex].categoria}
                </span>

                <h3 className="font-display font-bold text-xl sm:text-2xl mt-4 text-white leading-tight">
                  {filteredFotos[lightboxIndex].titulo}
                </h3>

                <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                  {filteredFotos[lightboxIndex].alt || "Momento incrível capturado no litoral do Ceará."}
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-3">
                {filteredFotos[lightboxIndex].linkInstagram ? (
                  <a
                    href={filteredFotos[lightboxIndex].linkInstagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-500 hover:opacity-90 text-white py-3.5 rounded-xl font-bold text-sm transition-all"
                  >
                    <Instagram className="w-5 h-5 text-white" />
                    <span>Ver no Instagram</span>
                  </a>
                ) : (
                  <div className="text-xs text-slate-500 text-center border border-white/5 py-2.5 rounded-lg bg-black/25">
                    Post original do Instagram privado ou arquivado.
                  </div>
                )}
                
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="w-full border border-white/20 hover:bg-white/10 text-white py-3.5 rounded-xl font-bold text-sm transition-all"
                >
                  Fechar Visualização
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
