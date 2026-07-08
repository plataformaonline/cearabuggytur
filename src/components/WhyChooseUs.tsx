import { Shield, Check, Award, Camera, MessageCircle, Compass } from "lucide-react";

export default function WhyChooseUs() {
  const cards = [
    {
      icon: <Shield className="w-8 h-8 text-[#0E5EA8]" />,
      title: "Segurança Certificada",
      desc: "Todos os nossos motoristas e guias são autorizados, credenciados e rigorosamente treinados."
    },
    {
      icon: <Check className="w-8 h-8 text-[#0E5EA8]" />,
      title: "Veículos Revisados",
      desc: "Nossos buggys e veículos 4x4 passam por manutenções preventivas severas antes de cada saída."
    },
    {
      icon: <Award className="w-8 h-8 text-[#0E5EA8]" />,
      title: "Guias Experientes",
      desc: "Profissionais nascidos e criados no Ceará, dominando perfeitamente a navegação e histórias das dunas."
    },
    {
      icon: <Camera className="w-8 h-8 text-[#0E5EA8]" />,
      title: "Paisagens Incríveis",
      desc: "Acesso exclusivo a mirantes e locais selvagens restritos para veículos comuns."
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-[#0E5EA8]" />,
      title: "Atendimento Rápido",
      desc: "Suporte 24 horas via WhatsApp com agilidade, sanando dúvidas e fechando reservas em minutos."
    },
    {
      icon: <Compass className="w-8 h-8 text-[#0E5EA8]" />,
      title: "Passeios Exclusivos",
      desc: "Sem pressa e sem aglomeração. Passeios privados sob medida para você aproveitar cada segundo."
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#F4C430] font-semibold text-sm tracking-widest uppercase font-mono">
            Diferencial Premium
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white mt-2 mb-4 tracking-tight leading-none">
            Por que Escolher a Ceará Buggy Tur?
          </h2>
          <p className="text-slate-400 text-lg">
            Combinamos a adrenalina do buggy com o padrão de atendimento de hotéis 5 estrelas. Viva uma experiência verdadeiramente exclusiva.
          </p>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((item, index) => (
            <div
              key={index}
              className="group bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:border-[#0E5EA8]/60 hover:bg-white/10 transition-all duration-300 shadow-xl relative overflow-hidden"
            >
              {/* Highlight background light */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#0E5EA8]/10 rounded-full blur-2xl group-hover:scale-150 transition-all duration-500" />
              
              <div className="bg-white/5 rounded-2xl p-4 w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-[#0E5EA8]/20 transition-colors duration-300">
                {item.icon}
              </div>

              <h3 className="font-display font-bold text-xl text-white mb-3">
                {item.title}
              </h3>

              <p className="text-slate-400 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
