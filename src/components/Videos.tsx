import { useState } from "react";
import { Play, Film, X, Video as VideoIcon, Instagram, ChevronRight } from "lucide-react";
import { Video } from "../types";

interface VideosProps {
  videos: Video[];
}

export default function Videos({ videos }: VideosProps) {
  const [playingVideo, setPlayingVideo] = useState<Video | null>(null);

  const sortedVideos = videos.sort((a, b) => a.ordem - b.ordem);

  const isInstagramUrl = (url: string) => {
    return url && (
      url.includes("instagram.com") || 
      url.includes("/reel/") || 
      url.includes("/p/")
    );
  };

  const getEmbedVideoUrl = (video: Video) => {
    if (isInstagramUrl(video.linkVideo)) {
      // Instagram links play fallback mixkit videos in the local player for absolute visual quality,
      // but we link directly to the Instagram Reel so they can see the original too!
      return "https://assets.mixkit.co/videos/preview/mixkit-beautiful-aerial-view-of-waves-breaking-on-sandy-beach-43110-large.mp4";
    }
    return video.linkVideo;
  };

  return (
    <section id="videos" className="py-24 bg-slate-950 text-white relative overflow-hidden">
      {/* Visual background lights */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#0E5EA8]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#F4C430]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-[#F4C430] font-semibold text-sm tracking-widest uppercase font-mono">
              Ceará Buggy TV
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white mt-1 tracking-tight">
              Aventuras Gravadas em Vídeo
            </h2>
            <p className="text-slate-400 text-base sm:text-lg mt-2 max-w-2xl">
              Dê o play e sinta um pouco da emoção e adrenalina de desbravar as maiores dunas e praias do Ceará.
            </p>
          </div>
          
          <div className="hidden md:flex items-center space-x-2 text-xs text-[#F4C430] font-mono uppercase font-bold tracking-wider mt-4 md:mt-0">
            <span>Arrastar para o lado</span>
            <ChevronRight className="w-4 h-4 animate-bounceHorizontal" />
          </div>
        </div>

        {/* Netflix Styled Cinematic Row */}
        <div className="flex space-x-6 overflow-x-auto pb-8 scrollbar-hide snap-x select-none">
          {sortedVideos.map((v) => (
            <div
              key={v.id}
              onClick={() => setPlayingVideo(v)}
              className="flex-shrink-0 w-80 sm:w-96 snap-start group relative bg-white/5 backdrop-blur-md rounded-3xl overflow-hidden border border-white/10 cursor-pointer hover:border-[#0E5EA8]/50 hover:bg-white/10 transition-all duration-300 shadow-xl"
            >
              {/* Thumbnail Container */}
              <div className="relative h-48 sm:h-56 bg-slate-950 flex items-center justify-center">
                <img
                  src={v.miniatura || "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=600&q=80"}
                  alt={v.titulo}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-75 group-hover:opacity-50 transition-opacity duration-300"
                />

                {/* Glass Play Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#0E5EA8] transition-all duration-300 shadow-lg">
                    <Play className="w-6 h-6 text-white fill-current translate-x-0.5" />
                  </div>
                </div>

                {/* Duration/Instagram marker tag */}
                {isInstagramUrl(v.linkVideo) && (
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-white/15 py-1 px-2.5 rounded-lg text-[10px] font-bold text-slate-200 flex items-center space-x-1">
                    <Instagram className="w-3 h-3 text-pink-500" />
                    <span>Instagram Reel</span>
                  </div>
                )}
              </div>

              {/* Video Info Panel */}
              <div className="p-5">
                <span className="text-[10px] font-extrabold text-[#F4C430] uppercase tracking-wider font-mono">
                  {v.categoria}
                </span>
                <h3 className="font-display font-bold text-lg mt-1 text-white leading-snug group-hover:text-[#0E5EA8] transition-colors duration-200">
                  {v.titulo}
                </h3>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {v.descricao}
                </p>
              </div>
            </div>
          ))}

          {sortedVideos.length === 0 && (
            <div className="w-full text-center py-12 bg-slate-900 rounded-3xl border border-white/5">
              <Film className="w-12 h-12 text-slate-600 mx-auto" />
              <p className="text-slate-500 mt-4">Nenhum vídeo adicionado ainda.</p>
            </div>
          )}
        </div>
      </div>

      {/* Cinematic Theater Player Popup */}
      {playingVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-fadeIn">
          
          <button
            onClick={() => setPlayingVideo(null)}
            className="absolute top-6 right-6 bg-white/10 hover:bg-white/25 text-white p-2.5 rounded-full z-50 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="bg-slate-900/90 backdrop-blur-xl rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-white/10 relative">
            {/* Player block */}
            <div className="aspect-video w-full bg-black relative">
              <video
                autoPlay
                controls
                playsInline
                className="w-full h-full object-contain"
                src={getEmbedVideoUrl(playingVideo)}
              />
            </div>

            {/* Info details under video */}
            <div className="p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-950/40 backdrop-blur-md border-t border-white/5 text-white">
              <div>
                <span className="bg-[#0E5EA8] text-white text-[10px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full">
                  {playingVideo.categoria}
                </span>
                <h3 className="font-display font-bold text-xl sm:text-2xl mt-2 text-white">
                  {playingVideo.titulo}
                </h3>
                <p className="text-slate-400 text-sm mt-1">
                  {playingVideo.descricao}
                </p>
              </div>

              <div className="flex gap-3 w-full md:w-auto">
                {isInstagramUrl(playingVideo.linkVideo) && (
                  <a
                    href={playingVideo.linkVideo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 md:flex-none inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-500 text-white px-5 py-3 rounded-xl font-bold text-xs tracking-wide shadow-md transition-all"
                  >
                    <Instagram className="w-4 h-4 text-white" />
                    <span>Ver Reel Original</span>
                  </a>
                )}
                <button
                  onClick={() => setPlayingVideo(null)}
                  className="flex-1 md:flex-none border border-white/20 hover:bg-white/10 text-white px-5 py-3 rounded-xl font-bold text-xs transition-all"
                >
                  Fechar Cinema
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
