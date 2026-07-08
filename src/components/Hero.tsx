import { Compass, Play, ArrowRight } from "lucide-react";
import { Banner } from "../types";

interface HeroProps {
  banner: Banner;
  onViewTours: () => void;
  onBookNow: () => void;
}

export default function Hero({ banner, onViewTours, onBookNow }: HeroProps) {
  // Check if videoUrl is an Instagram link
  const isInstagram = banner.videoUrl && (
    banner.videoUrl.includes("instagram.com") || 
    banner.videoUrl.includes("/p/") || 
    banner.videoUrl.includes("/reel/")
  );

  // Fallback high-quality direct video URL if Instagram URL is set, so background is always beautiful
  const finalVideoUrl = isInstagram
    ? "https://assets.mixkit.co/videos/preview/mixkit-driving-in-the-desert-sands-40890-large.mp4"
    : banner.videoUrl;

  return (
    <section
      id="inicio"
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-slate-950"
    >
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute min-w-full min-h-full w-auto h-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover opacity-60 scale-105 transition-all duration-1000"
        >
          <source src={finalVideoUrl} type="video/mp4" />
        </video>
        {/* Modern multi-layer dark gradient overlays for luxury feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/60 z-1" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-slate-950/80 z-1" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        {/* Exclusive Tag */}
        <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-8 animate-fadeIn">
          <Compass className="w-4 h-4 text-[#F4C430]" />
          <span className="text-white text-xs font-semibold tracking-wider uppercase font-sans">
            Litoral do Ceará • Turismo de Experiência
          </span>
        </div>

        {/* Heading */}
        <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-none mb-6 drop-shadow-md">
          {banner.titulo || "Descubra o Paraíso do Ceará em um Passeio Inesquecível"}
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-2xl text-slate-200 font-light max-w-3xl mx-auto mb-10 leading-relaxed font-sans">
          {banner.subtitulo || "Passeios de Buggy • 4x4 • Excursões • Litoral Cearense"}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          {/* Primary button */}
          <button
            onClick={onBookNow}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#F4C430] hover:bg-yellow-500 text-slate-950 px-8 py-4 rounded-full font-extrabold text-base tracking-wide shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl cursor-pointer"
          >
            <span>{banner.botaoPrincipal || "Reservar Agora"}</span>
            <ArrowRight className="w-5 h-5 text-slate-950" />
          </button>

          {/* Secondary button */}
          <button
            onClick={onViewTours}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full font-bold text-base tracking-wide transition-all duration-300 transform hover:-translate-y-1 hover:border-white/50 cursor-pointer"
          >
            <Play className="w-4 h-4 text-[#F4C430]" />
            <span>{banner.botaoSecundario || "Ver Roteiros"}</span>
          </button>
        </div>

        {/* Stats Overlay */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-4 sm:gap-8 animate-fadeIn">
          <div className="bg-white/10 backdrop-blur-xl px-6 py-3.5 rounded-2xl border border-white/20 text-white min-w-[130px] sm:min-w-[150px] text-center shadow-lg transition-all duration-300 hover:bg-white/25 hover:scale-105">
            <div className="text-2xl sm:text-3xl font-black text-[#F4C430] tracking-tight font-display">+48K</div>
            <div className="text-[10px] uppercase tracking-widest opacity-80 font-semibold font-mono mt-0.5">Seguidores</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xl px-6 py-3.5 rounded-2xl border border-white/20 text-white min-w-[130px] sm:min-w-[150px] text-center shadow-lg transition-all duration-300 hover:bg-white/25 hover:scale-105">
            <div className="text-2xl sm:text-3xl font-black text-[#F4C430] tracking-tight font-display">100%</div>
            <div className="text-[10px] uppercase tracking-widest opacity-80 font-semibold font-mono mt-0.5">Satisfação</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xl px-6 py-3.5 rounded-2xl border border-white/20 text-white min-w-[130px] sm:min-w-[150px] text-center shadow-lg transition-all duration-300 hover:bg-white/25 hover:scale-105">
            <div className="text-2xl sm:text-3xl font-black text-[#F4C430] tracking-tight font-display">+5 Mil</div>
            <div className="text-[10px] uppercase tracking-widest opacity-80 font-semibold font-mono mt-0.5">Clientes</div>
          </div>
        </div>

        {/* Custom Banner Info for Instagram fallback */}
        {isInstagram && (
          <div className="mt-8">
            <a
              href={banner.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-xs text-white/50 hover:text-white transition-colors duration-200 border border-white/10 hover:border-white/30 bg-black/30 backdrop-blur-sm rounded-lg py-1 px-3"
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              <span>Vídeo oficial do Instagram @cearabuggytur - Assistir Original</span>
            </a>
          </div>
        )}
      </div>

      {/* Decorative Wave Separator */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-[40px] text-slate-50 fill-current"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,8.75,57.05,18.3,88.47,26.85,152.42,44.3,222.2,66.44,321.39,56.44Z" />
        </svg>
      </div>
    </section>
  );
}
