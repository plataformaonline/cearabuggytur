import { useState, useEffect } from "react";
import { Compass, Menu as MenuIcon, X, MessageCircle } from "lucide-react";
import { Config } from "../types";
import { getWhatsAppUrl } from "../utils/dataLoader";

interface NavbarProps {
  config: Config;
  onOpenAdmin: () => void;
}

export default function Navbar({ config, onOpenAdmin }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const menuItems = [
    { label: "Início", id: "inicio" },
    { label: "Sobre", id: "sobre" },
    { label: "Passeios", id: "passeios" },
    { label: "Galeria", id: "galeria" },
    { label: "Vídeos", id: "videos" },
    { label: "Depoimentos", id: "depoimentos" },
    { label: "Contato", id: "contato" }
  ];

  const waUrl = getWhatsAppUrl(
    config.whatsapp,
    "Olá! Vi o site de vocês e gostaria de informações sobre os passeios de buggy e 4x4 premium pelo Ceará!"
  );

  const [isAdminVisible, setIsAdminVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      const searchParams = new URLSearchParams(window.location.search);
      const isLocalOrPreview =
        hostname.includes("run.app") ||
        hostname.includes("localhost") ||
        hostname.includes("127.0.0.1");
      const hasAdminQuery =
        searchParams.get("admin") === "true" ||
        searchParams.get("admin") === "1" ||
        searchParams.get("painel") === "true";
      
      setIsAdminVisible(isLocalOrPreview || hasAdminQuery);
    }
  }, []);

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-lg py-4 text-slate-900 border-slate-200/50"
          : "bg-slate-950/20 backdrop-blur-sm border-white/10 py-6 text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => handleScrollTo("inicio")}
          >
            <img
              src="https://i.postimg.cc/SK7L2dtc/457034448-1071283451303960-8593804891191264571-n.jpg"
              alt={config.logo || "CEARÁ BUGGY TUR"}
              className="h-12 sm:h-14 md:h-16 w-auto object-contain rounded-xl bg-white/10 p-1.5 backdrop-blur-sm border border-white/20 shadow-md transition-all duration-300 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <span className="font-display font-extrabold text-lg sm:text-xl md:text-2xl tracking-wider select-none">
              {config.logo || "CEARÁ BUGGY TUR"}
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleScrollTo(item.id)}
                className={`font-medium text-sm tracking-wide uppercase transition-colors duration-200 cursor-pointer ${
                  scrolled
                    ? "text-slate-700 hover:text-[#0E5EA8]"
                    : "text-white/90 hover:text-[#F4C430]"
                }`}
              >
                {item.label}
              </button>
            ))}
            
            {/* Admin trigger embedded elegantly */}
            {isAdminVisible && (
              <button
                onClick={onOpenAdmin}
                className={`text-xs opacity-40 hover:opacity-100 transition-opacity font-mono uppercase border px-2 py-1 rounded cursor-pointer ${
                  scrolled ? "border-slate-300 text-slate-500" : "border-white/20 text-white"
                }`}
              >
                Painel
              </button>
            )}
          </div>

          {/* WhatsApp CTA Button */}
          <div className="hidden sm:block">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-[#0E5EA8] hover:bg-[#083c6b] text-white px-5 py-2.5 rounded-full font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-4 h-4 text-[#F4C430]" />
              <span>Reservar WhatsApp</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center space-x-4">
            {isAdminVisible && (
              <button
                onClick={onOpenAdmin}
                className={`text-xs opacity-40 hover:opacity-100 transition-opacity font-mono border px-2 py-0.5 rounded cursor-pointer ${
                  scrolled ? "border-slate-300 text-slate-500" : "border-white/20 text-white"
                }`}
              >
                Painel
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                scrolled ? "text-slate-800 hover:bg-slate-100" : "text-white hover:bg-white/10"
              }`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white/90 backdrop-blur-xl shadow-xl py-6 px-4 flex flex-col space-y-4 border-t border-slate-200/50 animate-fadeIn text-slate-800">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleScrollTo(item.id)}
              className="text-left py-2 px-3 font-semibold text-base text-slate-700 hover:text-[#0E5EA8] hover:bg-slate-50 rounded-lg transition-all"
            >
              {item.label}
            </button>
          ))}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 bg-[#0E5EA8] hover:bg-[#083c6b] text-white py-3 rounded-xl font-bold text-base shadow-md transition-all"
          >
            <MessageCircle className="w-5 h-5 text-[#F4C430]" />
            <span>Falar com Especialista</span>
          </a>
        </div>
      )}
    </nav>
  );
}
