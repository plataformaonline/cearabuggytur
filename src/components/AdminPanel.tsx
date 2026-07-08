import React, { useState } from "react";
import {
  X, Save, Lock, Unlock, LayoutDashboard, Image, Video, Compass,
  MessageSquare, Settings, Globe, Plus, Trash, Edit, CheckCircle, AlertCircle, Eye, EyeOff
} from "lucide-react";
import { Config, Banner, Foto, Video as VideoType, Passeio, Depoimento, FAQ } from "../types";
import { saveData } from "../utils/dataLoader";

interface AdminPanelProps {
  onClose: () => void;
  config: Config;
  setConfig: (c: Config) => void;
  banner: Banner;
  setBanner: (b: Banner) => void;
  fotos: Foto[];
  setFotos: (f: Foto[]) => void;
  videos: VideoType[];
  setVideos: (v: VideoType[]) => void;
  passeios: Passeio[];
  setPasseios: (p: Passeio[]) => void;
  depoimentos: Depoimento[];
  setDepoimentos: (d: Depoimento[]) => void;
  faq: FAQ[];
  setFaq: (f: FAQ[]) => void;
}

type Tab = "dashboard" | "fotos" | "videos" | "passeios" | "depoimentos" | "contatos" | "seo" | "faq";

export default function AdminPanel({
  onClose,
  config, setConfig,
  banner, setBanner,
  fotos, setFotos,
  videos, setVideos,
  passeios, setPasseios,
  depoimentos, setDepoimentos,
  faq, setFaq
}: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Authentication validation
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === (config.adminPassword || "admin")) {
      setIsAuthenticated(true);
      setFeedback(null);
    } else {
      setFeedback({ type: "error", message: "Senha incorreta! Tente novamente." });
    }
  };

  // Helper trigger to execute a server JSON file save
  const handleSaveFile = async (key: string, data: any) => {
    setFeedback({ type: "success", message: "Salvando no servidor..." });
    const res = await saveData(key, data, config.adminPassword || "admin");
    if (res.success) {
      setFeedback({ type: "success", message: `Arquivo ${key}.json atualizado com sucesso!` });
    } else {
      setFeedback({ type: "error", message: `Erro ao salvar arquivo ${key}: ${res.message}` });
    }
    setTimeout(() => setFeedback(null), 4000);
  };

  // Sub-component state managers for creations/edits
  const [newFoto, setNewFoto] = useState<Partial<Foto>>({
    titulo: "", categoria: "Praias", linkImagem: "", linkInstagram: "", alt: "", destacada: false, ordem: fotos.length + 1
  });
  const [newVideo, setNewVideo] = useState<Partial<VideoType>>({
    titulo: "", categoria: "Buggy", linkVideo: "", miniatura: "", descricao: "", destacado: false, ordem: videos.length + 1
  });
  const [newPasseio, setNewPasseio] = useState<Partial<Passeio>>({
    titulo: "", descricao: "", imagem: "", tempo: "Dia Inteiro", local: "Litoral Oeste", preco: "0", destacado: false, ordem: passeios.length + 1
  });
  const [newDepoimento, setNewDepoimento] = useState<Partial<Depoimento>>({
    nome: "", foto: "", nota: 5, depoimento: "", data: ""
  });
  const [newFaq, setNewFaq] = useState<Partial<FAQ>>({
    pergunta: "", resposta: ""
  });

  // Photo handlers
  const handleAddFoto = () => {
    if (!newFoto.linkImagem || !newFoto.titulo) {
      setFeedback({ type: "error", message: "Preencha o título e o link da imagem." });
      return;
    }
    const added: Foto = {
      id: `foto-${Date.now()}`,
      titulo: newFoto.titulo || "",
      categoria: newFoto.categoria || "Praias",
      linkImagem: newFoto.linkImagem || "",
      linkInstagram: newFoto.linkInstagram || "",
      alt: newFoto.alt || newFoto.titulo || "",
      destacada: !!newFoto.destacada,
      ordem: Number(newFoto.ordem) || fotos.length + 1
    };
    const updated = [...fotos, added];
    setFotos(updated);
    handleSaveFile("fotos", updated);
    setNewFoto({ titulo: "", categoria: "Praias", linkImagem: "", linkInstagram: "", alt: "", destacada: false, ordem: updated.length + 1 });
  };

  const handleDeleteFoto = (id: string) => {
    const updated = fotos.filter(f => f.id !== id);
    setFotos(updated);
    handleSaveFile("fotos", updated);
  };

  // Video handlers
  const handleAddVideo = () => {
    if (!newVideo.linkVideo || !newVideo.titulo) {
      setFeedback({ type: "error", message: "Preencha o título e o link do vídeo." });
      return;
    }
    const added: VideoType = {
      id: `video-${Date.now()}`,
      titulo: newVideo.titulo || "",
      categoria: newVideo.categoria || "Buggy",
      linkVideo: newVideo.linkVideo || "",
      miniatura: newVideo.miniatura || "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=600&q=80",
      descricao: newVideo.descricao || "",
      destacado: !!newVideo.destacado,
      ordem: Number(newVideo.ordem) || videos.length + 1
    };
    const updated = [...videos, added];
    setVideos(updated);
    handleSaveFile("videos", updated);
    setNewVideo({ titulo: "", categoria: "Buggy", linkVideo: "", miniatura: "", descricao: "", destacado: false, ordem: updated.length + 1 });
  };

  const handleDeleteVideo = (id: string) => {
    const updated = videos.filter(v => v.id !== id);
    setVideos(updated);
    handleSaveFile("videos", updated);
  };

  // Tours handlers
  const handleAddPasseio = () => {
    if (!newPasseio.titulo || !newPasseio.imagem) {
      setFeedback({ type: "error", message: "Preencha o título e coloque uma imagem." });
      return;
    }
    const added: Passeio = {
      id: `passeio-${Date.now()}`,
      titulo: newPasseio.titulo || "",
      descricao: newPasseio.descricao || "",
      imagem: newPasseio.imagem || "",
      tempo: newPasseio.tempo || "Dia Inteiro",
      local: newPasseio.local || "Litoral",
      preco: newPasseio.preco || "Sob Consulta",
      destacado: !!newPasseio.destacado,
      ordem: Number(newPasseio.ordem) || passeios.length + 1
    };
    const updated = [...passeios, added];
    setPasseios(updated);
    handleSaveFile("passeios", updated);
    setNewPasseio({ titulo: "", descricao: "", imagem: "", tempo: "Dia Inteiro", local: "Litoral Oeste", preco: "0", destacado: false, ordem: updated.length + 1 });
  };

  const handleDeletePasseio = (id: string) => {
    const updated = passeios.filter(p => p.id !== id);
    setPasseios(updated);
    handleSaveFile("passeios", updated);
  };

  // Testimonials handlers
  const handleAddDepoimento = () => {
    if (!newDepoimento.nome || !newDepoimento.depoimento) {
      setFeedback({ type: "error", message: "Preencha o nome do cliente e o depoimento." });
      return;
    }
    const added: Depoimento = {
      id: `dep-${Date.now()}`,
      nome: newDepoimento.nome || "",
      foto: newDepoimento.foto || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
      nota: Number(newDepoimento.nota) || 5,
      depoimento: newDepoimento.depoimento || "",
      data: newDepoimento.data || "Março de 2026"
    };
    const updated = [...depoimentos, added];
    setDepoimentos(updated);
    handleSaveFile("depoimentos", updated);
    setNewDepoimento({ nome: "", foto: "", nota: 5, depoimento: "", data: "" });
  };

  const handleDeleteDepoimento = (id: string) => {
    const updated = depoimentos.filter(d => d.id !== id);
    setDepoimentos(updated);
    handleSaveFile("depoimentos", updated);
  };

  // FAQ handlers
  const handleAddFaq = () => {
    if (!newFaq.pergunta || !newFaq.resposta) {
      setFeedback({ type: "error", message: "Preencha a pergunta e a resposta." });
      return;
    }
    const added: FAQ = {
      id: `faq-${Date.now()}`,
      pergunta: newFaq.pergunta || "",
      resposta: newFaq.resposta || ""
    };
    const updated = [...faq, added];
    setFaq(updated);
    handleSaveFile("faq", updated);
    setNewFaq({ pergunta: "", resposta: "" });
  };

  const handleDeleteFaq = (id: string) => {
    const updated = faq.filter(f => f.id !== id);
    setFaq(updated);
    handleSaveFile("faq", updated);
  };

  // Configuration general saves
  const handleSaveGeneralConfig = () => {
    handleSaveFile("config", config);
  };

  const handleSaveBanner = () => {
    handleSaveFile("banner", banner);
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4">
        <div className="bg-slate-900 border border-white/10 p-8 rounded-3xl max-w-md w-full shadow-2xl text-white text-center relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
          
          <div className="w-16 h-16 rounded-2xl bg-[#0E5EA8] flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-[#F4C430]" />
          </div>

          <h2 className="font-display font-black text-2xl mb-2">Acesso Restrito</h2>
          <p className="text-slate-400 text-sm mb-6">Insira a senha do Painel Administrativo para alterar o conteúdo do site.</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Senha de Acesso (padrão: admin)"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0E5EA8] text-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {feedback && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs py-2 px-3 rounded-lg text-left flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{feedback.message}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#0E5EA8] hover:bg-[#083c6b] text-white py-3 rounded-xl font-bold text-sm tracking-wide shadow-md transition-all cursor-pointer"
            >
              Autenticar Painel
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex bg-slate-950 text-slate-100 font-sans animate-fadeIn">
      
      {/* SIDEBAR NAVIGATION */}
      <div className="w-64 bg-slate-900 border-r border-white/5 flex flex-col justify-between p-6">
        <div>
          {/* Header */}
          <div className="flex items-center space-x-2 mb-10 pb-6 border-b border-white/5">
            <Settings className="w-6 h-6 text-[#F4C430]" />
            <span className="font-display font-extrabold text-sm tracking-wider uppercase">Ceará Buggy CMS</span>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1">
            {[
              { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
              { id: "fotos", label: "Galeria (Fotos)", icon: <Image className="w-5 h-5" /> },
              { id: "videos", label: "Vídeos", icon: <Video className="w-5 h-5" /> },
              { id: "passeios", label: "Passeios", icon: <Compass className="w-5 h-5" /> },
              { id: "depoimentos", label: "Depoimentos", icon: <MessageSquare className="w-5 h-5" /> },
              { id: "faq", label: "FAQ / Dúvidas", icon: <AlertCircle className="w-5 h-5" /> },
              { id: "contatos", label: "Contatos & Menu", icon: <Settings className="w-5 h-5" /> },
              { id: "seo", label: "SEO & Google", icon: <Globe className="w-5 h-5" /> }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as Tab)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeTab === item.id
                    ? "bg-[#0E5EA8] text-white"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Lock / Close Panel */}
        <div className="space-y-3">
          <button
            onClick={() => setIsAuthenticated(false)}
            className="w-full flex items-center justify-center space-x-2 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            <Unlock className="w-4 h-4" />
            <span>Bloquear Painel</span>
          </button>
          <button
            onClick={onClose}
            className="w-full bg-[#F4C430] hover:bg-yellow-500 text-slate-950 py-3 rounded-xl text-xs font-black tracking-widest uppercase transition-all shadow-md cursor-pointer"
          >
            Sair do Painel
          </button>
        </div>
      </div>

      {/* DASHBOARD BODY AREA */}
      <div className="flex-1 flex flex-col min-h-0 bg-slate-950 overflow-y-auto">
        
        {/* Header */}
        <header className="py-6 px-8 border-b border-white/5 flex items-center justify-between">
          <div>
            <h1 className="font-display font-black text-2xl uppercase tracking-wider">
              {activeTab === "dashboard" && "Painel Geral"}
              {activeTab === "fotos" && "Editar Fotos (Instagram)"}
              {activeTab === "videos" && "Editar Vídeos"}
              {activeTab === "passeios" && "Gerenciar Passeios"}
              {activeTab === "depoimentos" && "Gerenciar Depoimentos"}
              {activeTab === "faq" && "Gerenciar FAQ"}
              {activeTab === "contatos" && "Configurações Globais & Contato"}
              {activeTab === "seo" && "Otimização de SEO & Google"}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              {activeTab === "dashboard" && "Bem-vindo ao gestor de conteúdo Ceará Buggy Tur."}
              {activeTab === "fotos" && "Cole o link direto do Postimages ou do Instagram para atualizar a galeria."}
              {activeTab === "videos" && "Adicione links diretos MP4 ou de Reels do Instagram."}
              {activeTab === "passeios" && "Edite preços, fotos, tempos e descrições dos roteiros."}
              {activeTab === "depoimentos" && "Gerencie depoimentos de clientes que viajam com você."}
              {activeTab === "faq" && "Altere as perguntas frequentes exibidas no rodapé."}
              {activeTab === "contatos" && "Atualize telefones, WhatsApp, Instagram e Links de Iframe do Google Maps."}
              {activeTab === "seo" && "Configure metatags, títulos e palavras-chave de busca no Google."}
            </p>
          </div>

          <button onClick={onClose} className="p-2 bg-white/5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Global Feedback Banner */}
        {feedback && (
          <div className="mx-8 mt-6">
            <div className={`p-4 rounded-2xl border flex items-center space-x-3 ${
              feedback.type === "success"
                ? "bg-[#0E5EA8]/20 border-[#0E5EA8]/40 text-blue-200"
                : "bg-red-500/20 border-red-500/40 text-red-200"
            }`}>
              {feedback.type === "success" ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
              <span className="text-sm font-semibold">{feedback.message}</span>
            </div>
          </div>
        )}

        {/* TAB WORKSPACES */}
        <div className="p-8">
          
          {/* TAB 1: DASHBOARD */}
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              {/* Stat Summary Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: "Passeios Ativos", value: passeios.length, desc: "Roteiros cadastrados no site" },
                  { label: "Fotos na Galeria", value: fotos.length, desc: "Imagens ativas no Masonry Grid" },
                  { label: "Vídeos no Cinema", value: videos.length, desc: "Clips ativos" },
                  { label: "Depoimentos", value: depoimentos.length, desc: "Relatos de clientes" }
                ].map((stat, idx) => (
                  <div key={idx} className="bg-slate-900 border border-white/5 p-6 rounded-2xl">
                    <span className="text-slate-400 text-xs font-semibold uppercase">{stat.label}</span>
                    <div className="font-display font-black text-3xl text-[#F4C430] mt-1">{stat.value}</div>
                    <span className="text-slate-500 text-[11px] mt-1 block">{stat.desc}</span>
                  </div>
                ))}
              </div>

              {/* Edit Hero Banner Information */}
              <div className="bg-slate-900 border border-white/5 rounded-2xl p-6">
                <h3 className="font-display font-bold text-lg mb-4 text-[#F4C430] flex items-center space-x-2">
                  <Compass className="w-5 h-5" />
                  <span>Banner Principal (Hero)</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">Título do Banner</label>
                      <input
                        type="text"
                        value={banner.titulo}
                        onChange={(e) => setBanner({ ...banner, titulo: e.target.value })}
                        className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0E5EA8]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">Subtítulo do Banner</label>
                      <input
                        type="text"
                        value={banner.subtitulo}
                        onChange={(e) => setBanner({ ...banner, subtitulo: e.target.value })}
                        className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0E5EA8]"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">Link de Vídeo MP4 (Postimages/Mixkit/Direct)</label>
                      <input
                        type="text"
                        value={banner.videoUrl}
                        onChange={(e) => setBanner({ ...banner, videoUrl: e.target.value })}
                        className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0E5EA8]"
                      />
                      <span className="text-[10px] text-slate-500 block mt-1">Exemplo: https://assets.mixkit.co/...video.mp4</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1">Botão Principal</label>
                        <input
                          type="text"
                          value={banner.botaoPrincipal}
                          onChange={(e) => setBanner({ ...banner, botaoPrincipal: e.target.value })}
                          className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#0E5EA8]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1">Botão Secundário</label>
                        <input
                          type="text"
                          value={banner.botaoSecundario}
                          onChange={(e) => setBanner({ ...banner, botaoSecundario: e.target.value })}
                          className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#0E5EA8]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex justify-end">
                  <button
                    onClick={handleSaveBanner}
                    className="inline-flex items-center space-x-2 bg-[#0E5EA8] hover:bg-[#083c6b] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Salvar Alterações do Banner</span>
                  </button>
                </div>
              </div>

              {/* Setup Notes */}
              <div className="bg-[#0E5EA8]/5 border border-[#0E5EA8]/20 rounded-2xl p-6">
                <h4 className="font-display font-bold text-base text-blue-300 mb-2">💡 Manual Prático de Atualização (Custo Zero)</h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Seu site está configurado para salvar todas as alterações diretamente em arquivos JSON na hospedagem. Isso significa <strong>custo zero de manutenção</strong> e segurança simplificada.
                </p>
                <ul className="text-xs text-slate-400 space-y-2 list-disc list-inside">
                  <li>Para hospedar novas fotos gratuitamente, acesse o <a href="https://postimages.org/" target="_blank" rel="noopener noreferrer" className="text-[#F4C430] hover:underline font-semibold">Postimages</a>, envie a imagem e copie o <strong>'Link Direto'</strong> (terminando com .jpg ou .png).</li>
                  <li>Para vídeos, prefira links diretos hospedados de forma semelhante ou links públicos do Instagram Reels.</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 2: FOTOS */}
          {activeTab === "fotos" && (
            <div className="space-y-8">
              {/* Form to add a new photo */}
              <div className="bg-slate-900 border border-white/5 rounded-2xl p-6">
                <h3 className="font-display font-bold text-lg mb-4 text-[#F4C430] flex items-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>Adicionar Nova Foto ao Mural</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Título da Foto (Ex: Sunset em Jeri)</label>
                    <input
                      type="text"
                      placeholder="Título da foto..."
                      value={newFoto.titulo}
                      onChange={(e) => setNewFoto({ ...newFoto, titulo: e.target.value })}
                      className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0E5EA8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Link Direto da Imagem (Ex: Postimages.jpg)</label>
                    <input
                      type="text"
                      placeholder="https://i.postimg.cc/xxxxx/foto.jpg"
                      value={newFoto.linkImagem}
                      onChange={(e) => setNewFoto({ ...newFoto, linkImagem: e.target.value })}
                      className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0E5EA8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Categoria</label>
                    <select
                      value={newFoto.categoria}
                      onChange={(e) => setNewFoto({ ...newFoto, categoria: e.target.value })}
                      className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0E5EA8]"
                    >
                      <option value="Praias">Praias</option>
                      <option value="Buggy">Buggy</option>
                      <option value="Clientes">Clientes</option>
                      <option value="Paisagens">Paisagens</option>
                      <option value="Pôr do Sol">Pôr do Sol</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Link opcional do Post no Instagram</label>
                    <input
                      type="text"
                      placeholder="https://www.instagram.com/p/xxxxx/"
                      value={newFoto.linkInstagram}
                      onChange={(e) => setNewFoto({ ...newFoto, linkInstagram: e.target.value })}
                      className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0E5EA8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Texto Alternativo (SEO e Acessibilidade)</label>
                    <input
                      type="text"
                      placeholder="Descreva o que aparece na foto..."
                      value={newFoto.alt}
                      onChange={(e) => setNewFoto({ ...newFoto, alt: e.target.value })}
                      className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0E5EA8]"
                    />
                  </div>

                  <div className="flex items-center space-x-6 pt-4">
                    <label className="flex items-center space-x-2 text-xs font-semibold text-slate-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newFoto.destacada}
                        onChange={(e) => setNewFoto({ ...newFoto, destacada: e.target.checked })}
                        className="rounded border-slate-700 bg-slate-950 text-[#0E5EA8] focus:ring-[#0E5EA8]"
                      />
                      <span>Destacar esta Foto?</span>
                    </label>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleAddFoto}
                    className="inline-flex items-center space-x-2 bg-[#F4C430] hover:bg-yellow-500 text-slate-950 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Adicionar à Galeria</span>
                  </button>
                </div>
              </div>

              {/* Photos List Grid */}
              <div className="bg-slate-900 border border-white/5 rounded-2xl p-6">
                <h3 className="font-display font-bold text-lg mb-6 text-white">Fotos Ativas no Site</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {fotos.map((f) => (
                    <div key={f.id} className="bg-slate-950 border border-white/5 rounded-2xl overflow-hidden flex flex-col justify-between">
                      <div className="relative h-40 bg-slate-900">
                        <img src={f.linkImagem} alt={f.titulo} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                        <span className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-sm text-[#F4C430] font-bold text-[9px] px-2 py-0.5 rounded-full">
                          {f.categoria}
                        </span>
                      </div>
                      <div className="p-4 flex-grow flex flex-col justify-between">
                        <div>
                          <h4 className="font-bold text-xs line-clamp-1">{f.titulo}</h4>
                          <p className="text-[10px] text-slate-500 mt-1 line-clamp-2">{f.alt}</p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                          <span className="text-[10px] text-slate-500">Ordem: {f.ordem}</span>
                          <button
                            onClick={() => handleDeleteFoto(f.id)}
                            className="p-1.5 bg-red-500/10 hover:bg-red-500 hover:text-white rounded-lg text-red-400 transition-colors cursor-pointer"
                          >
                            <Trash className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: VIDEOS */}
          {activeTab === "videos" && (
            <div className="space-y-8">
              {/* Form to add a new video */}
              <div className="bg-slate-900 border border-white/5 rounded-2xl p-6">
                <h3 className="font-display font-bold text-lg mb-4 text-[#F4C430] flex items-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>Adicionar Novo Vídeo</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Título do Vídeo</label>
                    <input
                      type="text"
                      placeholder="Título do vídeo..."
                      value={newVideo.titulo}
                      onChange={(e) => setNewVideo({ ...newVideo, titulo: e.target.value })}
                      className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0E5EA8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Link Direto MP4 ou Link Instagram Reels</label>
                    <input
                      type="text"
                      placeholder="https://assets.mixkit.co/...mp4 ou Reels link"
                      value={newVideo.linkVideo}
                      onChange={(e) => setNewVideo({ ...newVideo, linkVideo: e.target.value })}
                      className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0E5EA8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Link da Miniatura (Poster)</label>
                    <input
                      type="text"
                      placeholder="https://i.postimg.cc/xxxxx/banner.jpg"
                      value={newVideo.miniatura}
                      onChange={(e) => setNewVideo({ ...newVideo, miniatura: e.target.value })}
                      className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0E5EA8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Categoria</label>
                    <select
                      value={newVideo.categoria}
                      onChange={(e) => setNewVideo({ ...newVideo, categoria: e.target.value })}
                      className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0E5EA8]"
                    >
                      <option value="Buggy">Buggy</option>
                      <option value="Paisagens">Paisagens</option>
                      <option value="Praias">Praias</option>
                    </select>
                  </div>

                  <div className="lg:col-span-2">
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Pequena Descrição</label>
                    <input
                      type="text"
                      placeholder="Descrição curta para o slider..."
                      value={newVideo.descricao}
                      onChange={(e) => setNewVideo({ ...newVideo, descricao: e.target.value })}
                      className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0E5EA8]"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleAddVideo}
                    className="inline-flex items-center space-x-2 bg-[#F4C430] hover:bg-yellow-500 text-slate-950 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Cadastrar Vídeo</span>
                  </button>
                </div>
              </div>

              {/* Videos List */}
              <div className="bg-slate-900 border border-white/5 rounded-2xl p-6">
                <h3 className="font-display font-bold text-lg mb-6 text-white">Vídeos no Cinema Netflix</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videos.map((v) => (
                    <div key={v.id} className="bg-slate-950 border border-white/5 rounded-2xl overflow-hidden p-4 flex flex-col justify-between">
                      <div>
                        <div className="relative h-32 bg-slate-900 rounded-lg overflow-hidden">
                          <img src={v.miniatura} alt={v.titulo} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                          <span className="absolute bottom-2 left-2 bg-black/60 text-xs px-2 py-0.5 rounded">
                            {v.categoria}
                          </span>
                        </div>
                        <h4 className="font-bold text-sm mt-3">{v.titulo}</h4>
                        <p className="text-xs text-slate-500 line-clamp-2 mt-1">{v.descricao}</p>
                      </div>
                      
                      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                        <span className="text-[10px] text-slate-500">Ordem: {v.ordem}</span>
                        <button
                          onClick={() => handleDeleteVideo(v.id)}
                          className="p-1.5 bg-red-500/10 hover:bg-red-500 hover:text-white text-red-400 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PASSEIOS */}
          {activeTab === "passeios" && (
            <div className="space-y-8">
              {/* Form to add a new tour */}
              <div className="bg-slate-900 border border-white/5 rounded-2xl p-6">
                <h3 className="font-display font-bold text-lg mb-4 text-[#F4C430] flex items-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>Cadastrar Novo Passeio / Roteiro</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Título do Passeio (Ex: Cumbuco Emoção)</label>
                    <input
                      type="text"
                      placeholder="Ex: Cumbuco - Emoção Extrema..."
                      value={newPasseio.titulo}
                      onChange={(e) => setNewPasseio({ ...newPasseio, titulo: e.target.value })}
                      className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0E5EA8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Duração Estimada (Ex: 6 a 8 horas)</label>
                    <input
                      type="text"
                      placeholder="Ex: Dia Inteiro - 6 a 8 horas..."
                      value={newPasseio.tempo}
                      onChange={(e) => setNewPasseio({ ...newPasseio, tempo: e.target.value })}
                      className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0E5EA8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Localização (Ex: Litoral Leste)</label>
                    <input
                      type="text"
                      placeholder="Ex: Litoral Oeste (Caucaia)..."
                      value={newPasseio.local}
                      onChange={(e) => setNewPasseio({ ...newPasseio, local: e.target.value })}
                      className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0E5EA8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Preço Inicial (Sem cifrão, ex: 350 ou 'Sob Consulta')</label>
                    <input
                      type="text"
                      placeholder="Ex: 350 ou Sob Consulta..."
                      value={newPasseio.preco}
                      onChange={(e) => setNewPasseio({ ...newPasseio, preco: e.target.value })}
                      className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0E5EA8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Link de Imagem Ilustrativa (Postimages/Unsplash)</label>
                    <input
                      type="text"
                      placeholder="Ex: https://images.unsplash.com/..."
                      value={newPasseio.imagem}
                      onChange={(e) => setNewPasseio({ ...newPasseio, imagem: e.target.value })}
                      className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0E5EA8]"
                    />
                  </div>

                  <div className="flex items-center space-x-6 pt-4">
                    <label className="flex items-center space-x-2 text-xs font-semibold text-slate-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newPasseio.destacado}
                        onChange={(e) => setNewPasseio({ ...newPasseio, destacado: e.target.checked })}
                        className="rounded border-slate-700 bg-slate-950 text-[#0E5EA8]"
                      />
                      <span>Destacar como 'Mais Reservado'?</span>
                    </label>
                  </div>

                  <div className="lg:col-span-3">
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Descrição Completa</label>
                    <textarea
                      rows={3}
                      placeholder="Diga detalhadamente o que este passeio oferece..."
                      value={newPasseio.descricao}
                      onChange={(e) => setNewPasseio({ ...newPasseio, descricao: e.target.value })}
                      className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0E5EA8]"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleAddPasseio}
                    className="inline-flex items-center space-x-2 bg-[#F4C430] hover:bg-yellow-500 text-slate-950 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Cadastrar Passeio</span>
                  </button>
                </div>
              </div>

              {/* Passeios List */}
              <div className="bg-slate-900 border border-white/5 rounded-2xl p-6">
                <h3 className="font-display font-bold text-lg mb-6 text-white">Roteiros Existentes</h3>

                <div className="space-y-4">
                  {passeios.map((p) => (
                    <div key={p.id} className="bg-slate-950 border border-white/5 p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center space-x-4">
                        <img src={p.imagem} alt={p.titulo} referrerPolicy="no-referrer" className="w-16 h-16 rounded-xl object-cover" />
                        <div>
                          <h4 className="font-bold text-sm">{p.titulo}</h4>
                          <span className="text-[10px] text-slate-500 font-mono block uppercase mt-0.5">{p.local} • {p.tempo}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6 w-full sm:w-auto justify-between sm:justify-end">
                        <div className="text-right">
                          <span className="text-[10px] text-slate-500 block font-mono">VALOR</span>
                          <span className="text-xs font-bold text-[#F4C430]">{isNaN(Number(p.preco)) ? p.preco : `R$ ${p.preco}`}</span>
                        </div>
                        <button
                          onClick={() => handleDeletePasseio(p.id)}
                          className="p-2 bg-red-500/10 hover:bg-red-500 hover:text-white text-red-400 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: DEPOIMENTOS */}
          {activeTab === "depoimentos" && (
            <div className="space-y-8">
              {/* Form to add custom testimonial */}
              <div className="bg-slate-900 border border-white/5 rounded-2xl p-6">
                <h3 className="font-display font-bold text-lg mb-4 text-[#F4C430] flex items-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>Cadastrar Depoimento de Cliente</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Nome do Cliente (Ex: Amanda & Lucas)</label>
                    <input
                      type="text"
                      placeholder="Nome dos clientes..."
                      value={newDepoimento.nome}
                      onChange={(e) => setNewDepoimento({ ...newDepoimento, nome: e.target.value })}
                      className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0E5EA8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Foto do Cliente (Link do Avatar/Postimages)</label>
                    <input
                      type="text"
                      placeholder="Ex: https://images.unsplash.com/..."
                      value={newDepoimento.foto}
                      onChange={(e) => setNewDepoimento({ ...newDepoimento, foto: e.target.value })}
                      className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0E5EA8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Mês / Ano do Passeio</label>
                    <input
                      type="text"
                      placeholder="Ex: Março de 2026..."
                      value={newDepoimento.data}
                      onChange={(e) => setNewDepoimento({ ...newDepoimento, data: e.target.value })}
                      className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0E5EA8]"
                    />
                  </div>

                  <div className="lg:col-span-3">
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Depoimento do Cliente</label>
                    <textarea
                      rows={3}
                      placeholder="Escreva aqui o relato dos clientes sobre o passeio..."
                      value={newDepoimento.depoimento}
                      onChange={(e) => setNewDepoimento({ ...newDepoimento, depoimento: e.target.value })}
                      className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0E5EA8]"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleAddDepoimento}
                    className="inline-flex items-center space-x-2 bg-[#F4C430] hover:bg-yellow-500 text-slate-950 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Adicionar Depoimento</span>
                  </button>
                </div>
              </div>

              {/* Testimonials list */}
              <div className="bg-slate-900 border border-white/5 rounded-2xl p-6">
                <h3 className="font-display font-bold text-lg mb-6 text-white">Depoimentos Ativos</h3>

                <div className="space-y-4">
                  {depoimentos.map((d) => (
                    <div key={d.id} className="bg-slate-950 border border-white/5 p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center space-x-4">
                        <img src={d.foto} alt={d.nome} referrerPolicy="no-referrer" className="w-12 h-12 rounded-full object-cover" />
                        <div>
                          <h4 className="font-bold text-sm">{d.nome}</h4>
                          <span className="text-[10px] text-slate-500 block">{d.data}</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-400 max-w-xl italic flex-1 truncate sm:mx-4">"{d.depoimento}"</p>

                      <button
                        onClick={() => handleDeleteDepoimento(d.id)}
                        className="p-1.5 bg-red-500/10 hover:bg-red-500 hover:text-white text-red-400 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: FAQ */}
          {activeTab === "faq" && (
            <div className="space-y-8">
              {/* Form to add FAQ */}
              <div className="bg-slate-900 border border-white/5 rounded-2xl p-6">
                <h3 className="font-display font-bold text-lg mb-4 text-[#F4C430] flex items-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>Cadastrar Nova FAQ / Dúvida</span>
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Pergunta</label>
                    <input
                      type="text"
                      placeholder="Ex: Crianças podem ir?"
                      value={newFaq.pergunta}
                      onChange={(e) => setNewFaq({ ...newFaq, pergunta: e.target.value })}
                      className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0E5EA8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Resposta Consolidada</label>
                    <textarea
                      rows={3}
                      placeholder="Resposta simplificada..."
                      value={newFaq.resposta}
                      onChange={(e) => setNewFaq({ ...newFaq, resposta: e.target.value })}
                      className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0E5EA8]"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleAddFaq}
                    className="inline-flex items-center space-x-2 bg-[#F4C430] hover:bg-yellow-500 text-slate-950 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Adicionar FAQ</span>
                  </button>
                </div>
              </div>

              {/* FAQ list */}
              <div className="bg-slate-900 border border-white/5 rounded-2xl p-6">
                <h3 className="font-display font-bold text-lg mb-6 text-white">Perguntas Frequentes Ativas</h3>

                <div className="space-y-4">
                  {faq.map((item) => (
                    <div key={item.id} className="bg-slate-950 border border-white/5 p-4 rounded-xl flex items-start justify-between gap-4">
                      <div>
                        <h4 className="font-bold text-sm text-[#F4C430]">{item.pergunta}</h4>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.resposta}</p>
                      </div>

                      <button
                        onClick={() => handleDeleteFaq(item.id)}
                        className="p-1.5 bg-red-500/10 hover:bg-red-500 hover:text-white text-red-400 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: CONTATOS */}
          {activeTab === "contatos" && (
            <div className="bg-slate-900 border border-white/5 rounded-2xl p-6 space-y-6">
              <h3 className="font-display font-bold text-lg text-[#F4C430] border-b border-white/5 pb-2">Configurações Gerais de Contato</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Logo Textual</label>
                  <input
                    type="text"
                    value={config.logo}
                    onChange={(e) => setConfig({ ...config, logo: e.target.value })}
                    className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">WhatsApp (Número Completo, Ex: 5585999999999)</label>
                  <input
                    type="text"
                    value={config.whatsapp}
                    onChange={(e) => setConfig({ ...config, whatsapp: e.target.value })}
                    className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-500 block mt-1">Insira 55 + DDD + Número completo sem espaços ou traços.</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Telefone Exibido (Legível)</label>
                  <input
                    type="text"
                    value={config.telefone}
                    onChange={(e) => setConfig({ ...config, telefone: e.target.value })}
                    className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Instagram Username (Ex: cearabuggytur)</label>
                  <input
                    type="text"
                    value={config.instagram}
                    onChange={(e) => setConfig({ ...config, instagram: e.target.value })}
                    className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Endereço Físico Exibido no Rodapé</label>
                  <input
                    type="text"
                    value={config.endereco}
                    onChange={(e) => setConfig({ ...config, endereco: e.target.value })}
                    className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Google Maps Iframe Embed URL ('src' do iframe)</label>
                  <textarea
                    rows={2}
                    value={config.mapsIframe}
                    onChange={(e) => setConfig({ ...config, mapsIframe: e.target.value })}
                    className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-500 block mt-1">Copie apenas a URL contida em 'src=\"...\"' ao gerar o código para incorporar no Google Maps.</span>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Rodapé - Texto de Direitos Autorais</label>
                  <input
                    type="text"
                    value={config.rodape}
                    onChange={(e) => setConfig({ ...config, rodape: e.target.value })}
                    className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Senha do Painel Administrativo</label>
                  <input
                    type="text"
                    value={config.adminPassword}
                    onChange={(e) => setConfig({ ...config, adminPassword: e.target.value })}
                    className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex justify-end">
                <button
                  onClick={handleSaveGeneralConfig}
                  className="inline-flex items-center space-x-2 bg-[#0E5EA8] hover:bg-[#083c6b] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Salvar Dados de Contato</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 8: SEO */}
          {activeTab === "seo" && (
            <div className="bg-slate-900 border border-white/5 rounded-2xl p-6 space-y-6">
              <h3 className="font-display font-bold text-lg text-[#F4C430] border-b border-white/5 pb-2">Otimização de SEO (Busca Google)</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Título de SEO (Tag Title Principal)</label>
                  <input
                    type="text"
                    value={config.seoTitle}
                    onChange={(e) => setConfig({ ...config, seoTitle: e.target.value })}
                    className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0E5EA8]"
                    placeholder="Título da aba do navegador..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Metadescrição de SEO (Google Snippet)</label>
                  <textarea
                    rows={3}
                    value={config.seoDescription}
                    onChange={(e) => setConfig({ ...config, seoDescription: e.target.value })}
                    className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0E5EA8]"
                    placeholder="Descrição para aparecer na busca do Google..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Palavras-chave de Busca (Keywords separadas por vírgula)</label>
                  <input
                    type="text"
                    value={config.seoKeywords}
                    onChange={(e) => setConfig({ ...config, seoKeywords: e.target.value })}
                    className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0E5EA8]"
                    placeholder="Ex: buggy ceara, passeios cumbuco, buggy turismo, jericoacoara 4x4"
                  />
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex justify-end">
                <button
                  onClick={handleSaveGeneralConfig}
                  className="inline-flex items-center space-x-2 bg-[#0E5EA8] hover:bg-[#083c6b] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Salvar Metatags de SEO</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
