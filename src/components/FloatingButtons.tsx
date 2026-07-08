import { MessageCircle, Settings } from "lucide-react";
import { Config } from "../types";
import { getWhatsAppUrl } from "../utils/dataLoader";

interface FloatingButtonsProps {
  config: Config;
  onOpenAdmin: () => void;
}

export default function FloatingButtons({ config, onOpenAdmin }: FloatingButtonsProps) {
  const waUrl = getWhatsAppUrl(
    config.whatsapp,
    "Olá Ceará Buggy Tur! Estou no site de vocês e gostaria de tirar uma dúvida sobre os passeios de buggy premium."
  );

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center space-y-4">
      {/* Admin Panel Quick Access Button */}
      <button
        onClick={onOpenAdmin}
        className="bg-slate-900/80 backdrop-blur-md hover:bg-slate-900 text-[#F4C430] border border-white/10 p-3.5 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer group"
        title="Painel do Administrador"
      >
        <Settings className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
      </button>

      {/* Floating Pulse WhatsApp Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#25D366] hover:bg-[#20ba5a] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center relative group cursor-pointer"
        title="Fale conosco no WhatsApp"
      >
        {/* Animated Ripple Effect */}
        <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping group-hover:hidden" />
        <MessageCircle className="w-6 h-6 text-white fill-current" />
      </a>
    </div>
  );
}
