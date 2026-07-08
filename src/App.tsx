/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Compass } from "lucide-react";
import { Config, Banner, Foto, Video, Passeio, Depoimento, FAQ } from "./types";
import {
  loadData,
  DEFAULT_CONFIG,
  DEFAULT_BANNER,
  DEFAULT_FOTOS,
  DEFAULT_VIDEOS,
  DEFAULT_PASSEIOS,
  DEFAULT_DEPOIMENTOS,
  DEFAULT_FAQ
} from "./utils/dataLoader";

// Import modular components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Tours from "./components/Tours";
import Gallery from "./components/Gallery";
import Videos from "./components/Videos";
import Testimonials from "./components/Testimonials";
import WhyChooseUs from "./components/WhyChooseUs";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import FloatingButtons from "./components/FloatingButtons";
import AdminPanel from "./components/AdminPanel";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // States loaded from files (or default static fallbacks)
  const [config, setConfig] = useState<Config>(DEFAULT_CONFIG);
  const [banner, setBanner] = useState<Banner>(DEFAULT_BANNER);
  const [fotos, setFotos] = useState<Foto[]>(DEFAULT_FOTOS);
  const [videos, setVideos] = useState<Video[]>(DEFAULT_VIDEOS);
  const [passeios, setPasseios] = useState<Passeio[]>(DEFAULT_PASSEIOS);
  const [depoimentos, setDepoimentos] = useState<Depoimento[]>(DEFAULT_DEPOIMENTOS);
  const [faq, setFaq] = useState<FAQ[]>(DEFAULT_FAQ);

  // Parallel data load on mount
  useEffect(() => {
    async function fetchAllData() {
      try {
        const [
          loadedConfig,
          loadedBanner,
          loadedFotos,
          loadedVideos,
          loadedPasseios,
          loadedDepoimentos,
          loadedFaq
        ] = await Promise.all([
          loadData<Config>("config", DEFAULT_CONFIG),
          loadData<Banner>("banner", DEFAULT_BANNER),
          loadData<Foto[]>("fotos", DEFAULT_FOTOS),
          loadData<Video[]>("videos", DEFAULT_VIDEOS),
          loadData<Passeio[]>("passeios", DEFAULT_PASSEIOS),
          loadData<Depoimento[]>("depoimentos", DEFAULT_DEPOIMENTOS),
          loadData<FAQ[]>("faq", DEFAULT_FAQ)
        ]);

        setConfig(loadedConfig);
        setBanner(loadedBanner);
        setFotos(loadedFotos);
        setVideos(loadedVideos);
        setPasseios(loadedPasseios);
        setDepoimentos(loadedDepoimentos);
        setFaq(loadedFaq);
      } catch (err) {
        console.error("Error fetching initial datasets from server:", err);
      } finally {
        // Add a small luxurious delay for smoother transition
        setTimeout(() => setLoading(false), 800);
      }
    }

    fetchAllData();
  }, []);

  // Update document headers dynamically for search engines
  useEffect(() => {
    if (config) {
      document.title = config.seoTitle || "Ceará Buggy Tur - Passeios de Buggy Premium no Ceará";
      
      // Update or create meta description
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement("meta");
        metaDesc.setAttribute("name", "description");
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute("content", config.seoDescription || "");

      // Update or create keywords description
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement("meta");
        metaKeywords.setAttribute("name", "keywords");
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute("content", config.seoKeywords || "");

      // SEO: Add Schema.org JSON-LD Structured Data
      const existingSchema = document.getElementById("tourism-schema");
      if (existingSchema) {
        existingSchema.remove();
      }
      const script = document.createElement("script");
      script.id = "tourism-schema";
      script.type = "application/ld+json";
      script.innerHTML = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "TravelAgency",
        "name": config.logo || "Ceará Buggy Tur",
        "description": config.seoDescription,
        "url": window.location.origin,
        "telephone": config.telefone,
        "image": fotos[0]?.linkImagem || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": config.endereco,
          "addressLocality": "Fortaleza",
          "addressRegion": "CE",
          "addressCountry": "BR"
        },
        "priceRange": "$$"
      });
      document.head.appendChild(script);
    }
  }, [config, fotos]);

  // View roteiros helper trigger
  const handleViewRoteiros = () => {
    const section = document.getElementById("passeios");
    if (section) {
      const offset = 80;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleBookNow = () => {
    const section = document.getElementById("contato");
    if (section) {
      const offset = 80;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center text-white z-50">
        <div className="relative flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-[#0E5EA8] border-t-[#F4C430] rounded-full animate-spin mb-4" />
          <Compass className="w-8 h-8 text-[#F4C430] absolute top-4 animate-pulse" />
          <span className="font-display font-black text-lg uppercase tracking-widest mt-2 animate-pulse">
            Ceará Buggy Tur
          </span>
          <span className="text-xs text-slate-500 font-mono mt-1">Carregando o Paraíso...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white text-slate-900 overflow-x-hidden">
      
      {/* Navigation bar */}
      <Navbar config={config} onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Hero Header */}
      <Hero banner={banner} onViewTours={handleViewRoteiros} onBookNow={handleBookNow} />

      {/* Brand narrative, about us, counters */}
      <About />

      {/* Trust Differentials */}
      <WhyChooseUs />

      {/* Modular Tour Listing Grid */}
      <Tours passeios={passeios} config={config} />

      {/* Visual Pinterest Grid gallery */}
      <Gallery fotos={fotos} />

      {/* Cinema Netflix Slider */}
      <Videos videos={videos} />

      {/* Glowing testimonials auto slider */}
      <Testimonials depoimentos={depoimentos} />

      {/* Frequently Asked Questions */}
      <Faq faq={faq} />

      {/* Call to action, Maps iframe and structured Footer */}
      <Footer config={config} />

      {/* Interactive Sticky Floating Action buttons */}
      <FloatingButtons config={config} onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Hidden/Toggled Administration CMS Dashboard */}
      {isAdminOpen && (
        <AdminPanel
          onClose={() => setIsAdminOpen(false)}
          config={config}
          setConfig={setConfig}
          banner={banner}
          setBanner={setBanner}
          fotos={fotos}
          setFotos={setFotos}
          videos={videos}
          setVideos={setVideos}
          passeios={passeios}
          setPasseios={setPasseios}
          depoimentos={depoimentos}
          setDepoimentos={setDepoimentos}
          faq={faq}
          setFaq={setFaq}
        />
      )}

    </div>
  );
}
