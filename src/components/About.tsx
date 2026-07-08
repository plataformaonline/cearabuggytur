import { useEffect, useState } from "react";
import { Users, Sliders, Shield, Award, Camera, HeartHandshake } from "lucide-react";

export default function About() {
  const [followers, setFollowers] = useState(0);
  const [posts, setPosts] = useState(0);
  const [clients, setClients] = useState(0);

  // Animated counters trigger on load / viewport scroll mock
  useEffect(() => {
    const duration = 2000; // ms
    const steps = 50;
    const stepTime = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      setFollowers(Math.floor((48 / steps) * currentStep));
      setPosts(Math.floor((39 / steps) * currentStep));
      setClients(Math.floor((5000 / steps) * currentStep));

      if (currentStep >= steps) {
        setFollowers(48);
        setPosts(39);
        setClients(5000);
        clearInterval(interval);
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Users className="w-6 h-6 text-[#0E5EA8]" />,
      title: "Milhares Atendidos",
      desc: "Mais de 5.000 clientes felizes compartilhando sorrisos em nossas dunas."
    },
    {
      icon: <Sliders className="w-6 h-6 text-[#0E5EA8]" />,
      title: "Passeios Personalizados",
      desc: "Roteiros customizados para o seu grupo, parando onde e quando você quiser."
    },
    {
      icon: <Award className="w-6 h-6 text-[#0E5EA8]" />,
      title: "Motoristas Experientes",
      desc: "Guias altamente qualificados e credenciados, conhecedores de cada curva das praias."
    },
    {
      icon: <Shield className="w-6 h-6 text-[#0E5EA8]" />,
      title: "Segurança Absoluta",
      desc: "Buggys e veículos 4x4 revisados rigorosamente com cintos de segurança adaptados."
    },
    {
      icon: <Camera className="w-6 h-6 text-[#0E5EA8]" />,
      title: "Paisagens Incríveis",
      desc: "Visual exuberante de falésias, lagoas de águas cristalinas e dunas gigantes."
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-[#0E5EA8]" />,
      title: "Atendimento Humanizado",
      desc: "Do primeiro contato ao final do passeio, nossa equipe foca no seu bem-estar completo."
    }
  ];

  return (
    <section id="sobre" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0E5EA8]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F4C430]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7">
            <span className="text-[#0E5EA8] font-semibold text-sm tracking-widest uppercase font-mono">
              Quem Somos
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight mt-2 mb-6 leading-tight">
              A Agência de Turismo de Buggy e 4x4 Mais Premium de todo o Ceará
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              A <strong className="text-[#0E5EA8]">Ceará Buggy Tur</strong> nasceu com o propósito de transformar viagens convencionais em aventuras inesquecíveis. Especializados no litoral cearense, conectamos você às praias mais paradisíacas e segredos escondidos que só quem conhece as dunas há décadas pode revelar. Nosso foco é a exclusividade, o conforto e a segurança impecável.
            </p>

            {/* Grid of details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {features.map((feat, index) => (
                <div key={index} className="flex space-x-4">
                  <div className="flex-shrink-0 bg-white/50 backdrop-blur-sm shadow-md p-3 rounded-xl border border-white/80 flex items-center justify-center h-12 w-12 transition-all duration-300 hover:shadow-lg hover:border-[#0E5EA8]/30 hover:bg-white/80">
                    {feat.icon}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-slate-800">
                      {feat.title}
                    </h3>
                    <p className="text-slate-500 text-sm mt-1 leading-normal">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Counters & Visual Side */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="bg-gradient-to-br from-[#0E5EA8]/90 to-slate-900/90 backdrop-blur-xl text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-white/20 relative overflow-hidden transition-all duration-300 hover:scale-[1.02]">
              {/* Card visual background circles */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-8 -mt-8" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-16 -mb-16" />

              <h3 className="font-display font-extrabold text-2xl mb-8 border-b border-white/10 pb-4 text-center">
                Ceará Buggy em Números
              </h3>

              <div className="grid grid-cols-2 gap-8">
                {/* Followers */}
                <div className="text-center">
                  <div className="font-display font-extrabold text-4xl sm:text-5xl text-[#F4C430] tracking-tight">
                    +{followers}K
                  </div>
                  <div className="text-sm font-medium text-slate-200 mt-2">
                    Seguidores no Instagram
                  </div>
                </div>

                {/* Publications */}
                <div className="text-center">
                  <div className="font-display font-extrabold text-4xl sm:text-5xl text-[#F4C430] tracking-tight">
                    +{posts}
                  </div>
                  <div className="text-sm font-medium text-slate-200 mt-2">
                    Publicações Ativas
                  </div>
                </div>

                {/* Clients */}
                <div className="text-center">
                  <div className="font-display font-extrabold text-4xl sm:text-5xl text-[#F4C430] tracking-tight">
                    +{clients >= 5000 ? "5 Mil" : clients}
                  </div>
                  <div className="text-sm font-medium text-slate-200 mt-2">
                    Clientes Atendidos
                  </div>
                </div>

                {/* Satisfaction */}
                <div className="text-center">
                  <div className="font-display font-extrabold text-4xl sm:text-5xl text-[#F4C430] tracking-tight">
                    100%
                  </div>
                  <div className="text-sm font-medium text-slate-200 mt-2">
                    Satisfação Garantida
                  </div>
                </div>
              </div>

              {/* Extra micro statement */}
              <div className="mt-12 bg-white/10 rounded-2xl p-4 text-center text-xs text-slate-200 border border-white/10">
                ⭐ Avaliados com Nota Máxima de 5.0 Estrelas pelos clientes!
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
