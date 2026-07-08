import { MapPin, Phone, Instagram, MessageCircle, Mail, Compass } from "lucide-react";
import { Config } from "../types";
import { getWhatsAppUrl } from "../utils/dataLoader";

interface FooterProps {
  config: Config;
}

export default function Footer({ config }: FooterProps) {
  const waUrl = getWhatsAppUrl(
    config.whatsapp,
    "Olá! Estou muito interessado(a) nos passeios de buggy e 4x4 da Ceará Buggy Tur. Gostaria de agendar um passeio!"
  );

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <footer id="contato" className="bg-slate-950 text-white pt-24 pb-8 relative overflow-hidden">
      
      {/* 1. CHAMADA FINAL */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 relative z-10">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl h-auto py-12 sm:py-16 flex items-center justify-center text-center px-4">
          {/* High Contrast Beach Background Image with Dark Overlay */}
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80"
            alt="Fundo Ceará Buggy"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />

          <div className="relative z-10 max-w-2xl bg-slate-950/50 backdrop-blur-md border border-white/10 p-8 sm:p-12 rounded-3xl shadow-2xl">
            <span className="text-[#F4C430] font-semibold text-sm tracking-widest uppercase font-mono mb-3 block">
              RESERVA FACILITADA
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight mb-6">
              Pronto para viver a maior aventura do Ceará?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mb-8 max-w-xl mx-auto leading-relaxed">
              Garanta seu buggy ou 4x4 privado agora mesmo. Vagas limitadas de acordo com as marés. Chame nossa equipe!
            </p>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 bg-[#0E5EA8] hover:bg-[#083c6b] text-white px-8 py-3.5 sm:px-10 sm:py-4 rounded-full font-extrabold text-base tracking-wide shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 text-[#F4C430]" />
              <span>Reservar pelo WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAPA E CONTATOS GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 relative z-10">
        
        {/* Contact Info (LHS) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-6 cursor-pointer" onClick={() => handleScrollTo("inicio")}>
              <Compass className="w-8 h-8 text-[#F4C430]" />
              <span className="font-display font-extrabold text-2xl tracking-wider uppercase">
                {config.logo || "CEARÁ BUGGY TUR"}
              </span>
            </div>
            
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Oferecemos passeios sofisticados, emocionantes e totalmente sob medida pelo litoral leste e oeste do Ceará. Fale conosco e personalize sua experiência.
            </p>

            <div className="space-y-4 text-sm text-slate-300">
              {/* Telefone */}
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-[#F4C430] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-500 block text-xs font-mono">TELEFONE</span>
                  <a href={`tel:${config.telefone}`} className="hover:text-white font-medium">
                    {config.telefone}
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start space-x-3">
                <MessageCircle className="w-5 h-5 text-[#F4C430] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-500 block text-xs font-mono">WHATSAPP</span>
                  <a href={waUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white font-medium">
                    {config.telefone}
                  </a>
                </div>
              </div>

              {/* Endereço */}
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#F4C430] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-500 block text-xs font-mono">ENDEREÇO</span>
                  <p className="font-medium">{config.endereco}</p>
                </div>
              </div>

              {/* Instagram */}
              <div className="flex items-start space-x-3">
                <Instagram className="w-5 h-5 text-[#F4C430] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-500 block text-xs font-mono">INSTAGRAM</span>
                  <a
                    href={`https://instagram.com/${config.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white font-medium"
                  >
                    @{config.instagram}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Embedded Google Maps (RHS) */}
        <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-white/10 h-80 sm:h-96 relative shadow-2xl backdrop-blur-sm">
          <iframe
            src={config.mapsIframe}
            className="w-full h-full border-0 absolute inset-0"
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localização Ceará Buggy Tur"
          />
        </div>

      </div>

      {/* 3. FOOTER COPYRIGHT SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5 pt-8 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-4 relative z-10">
        <p className="text-slate-500 text-xs">
          {config.rodape || "© 2026 Ceará Buggy Tur. Todos os direitos reservados."}
        </p>

        {/* Quick Footer Links */}
        <div className="flex flex-wrap justify-center gap-6 text-slate-500 text-xs">
          <button onClick={() => handleScrollTo("sobre")} className="hover:text-[#F4C430] cursor-pointer">Sobre</button>
          <button onClick={() => handleScrollTo("passeios")} className="hover:text-[#F4C430] cursor-pointer">Roteiros</button>
          <button onClick={() => handleScrollTo("galeria")} className="hover:text-[#F4C430] cursor-pointer">Galeria</button>
          <button onClick={() => handleScrollTo("videos")} className="hover:text-[#F4C430] cursor-pointer">Vídeos</button>
          <button onClick={() => handleScrollTo("depoimentos")} className="hover:text-[#F4C430] cursor-pointer">Depoimentos</button>
        </div>
      </div>

    </footer>
  );
}
