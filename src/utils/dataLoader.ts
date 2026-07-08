import { Config, Banner, Foto, Video, Passeio, Depoimento, FAQ } from "../types";

// Static Default fallbacks in case of load failures
export const DEFAULT_CONFIG: Config = {
  logo: "CEARÁ BUGGY TUR",
  whatsapp: "5585999999999",
  instagram: "cearabuggytur",
  telefone: "(85) 99999-9999",
  endereco: "Av. Beira Mar, 2500 - Meireles, Fortaleza - CE",
  mapsIframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15925.3216892557!2d-38.4878546193755!3d-3.725841499999993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7c748fa11111111%3A0x1111111111111111!2sAv.%20Beira%20Mar%20-%20Fortaleza%20-%20CE!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr",
  rodape: "© 2026 Ceará Buggy Tur. Todos os direitos reservados. Feito para os amantes de sol, dunas e emoção.",
  adminPassword: "admin",
  seoTitle: "Ceará Buggy Tur - Passeios de Buggy e 4x4 Premium no Ceará",
  seoDescription: "Descubra as praias mais paradisíacas do Ceará com a Ceará Buggy Tur. Passeios exclusivos de Buggy e 4x4 por Jericoacoara, Cumbuco, Canoa Quebrada e mais com segurança, conforto e guias experientes.",
  seoKeywords: "passeio de buggy, buggy ceara, cumbuco buggy, canoa quebrada buggy, morro branco 4x4, turismo ceara, passeio 4x4 ceara"
};

export const DEFAULT_BANNER: Banner = {
  titulo: "Descubra o Paraíso do Ceará em um Passeio Inesquecível",
  subtitulo: "Passeios de Buggy • 4x4 • Excursões • Litoral Cearense",
  videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-driving-in-the-desert-sands-40890-large.mp4",
  instagramBackupUrl: "https://www.instagram.com/reel/CeB_buggy_exemplo",
  botaoPrincipal: "Reservar Agora",
  botaoSecundario: "Ver Roteiros"
};

export const DEFAULT_FOTOS: Foto[] = [
  {
    id: "foto-1",
    titulo: "Aventura Suprema nas Dunas de Cumbuco",
    categoria: "Buggy",
    linkImagem: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1000&q=80",
    linkInstagram: "https://www.instagram.com/p/CumbucoBuggyTour/",
    alt: "Buggy subindo duna de areia dourada em Cumbuco Ceará com muita emoção",
    destacada: true,
    ordem: 1
  },
  {
    id: "foto-2",
    titulo: "Labirinto de Falésias de Morro Branco",
    categoria: "Paisagens",
    linkImagem: "https://images.unsplash.com/photo-1509233725247-49e657c54213?auto=format&fit=crop&w=1000&q=80",
    linkInstagram: "https://www.instagram.com/p/MorroBrancoFalesias/",
    alt: "Lindas falésias vermelhas e laranjas esculpidas pelo vento em Morro Branco Ceará",
    destacada: true,
    ordem: 2
  },
  {
    id: "foto-3",
    titulo: "Pôr do Sol Mágico na Duna do Pôr do Sol",
    categoria: "Pôr do Sol",
    linkImagem: "https://images.unsplash.com/photo-1495616811223-4d98c6e968ab?auto=format&fit=crop&w=1000&q=80",
    linkInstagram: "https://www.instagram.com/p/JeriSunsetMagic/",
    alt: "Duna do pôr do sol em Jericoacoara com sol se pondo no mar",
    destacada: true,
    ordem: 3
  },
  {
    id: "foto-4",
    titulo: "Grupo na Lagoa do Paraíso em Jeri",
    categoria: "Clientes",
    linkImagem: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=1000&q=80",
    linkInstagram: "https://www.instagram.com/p/JeriClientesFelizes/",
    alt: "Turistas deitados nas redes dentro da água cristalina da Lagoa do Paraíso",
    destacada: false,
    ordem: 4
  },
  {
    id: "foto-5",
    titulo: "Símbolo de Canoa Quebrada na Falésia",
    categoria: "Praias",
    linkImagem: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
    linkInstagram: "https://www.instagram.com/p/CanoaQuebradaSimbolo/",
    alt: "Praia de Canoa Quebrada com mar azul e falésias ao fundo",
    destacada: true,
    ordem: 5
  },
  {
    id: "foto-6",
    titulo: "Manobra Radical nas Dunas Móveis",
    categoria: "Buggy",
    linkImagem: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1000&q=80",
    linkInstagram: "https://www.instagram.com/p/BuggyDunasCeara/",
    alt: "Buggy fazendo manobra nas dunas de areia fina sob o céu azul",
    destacada: false,
    ordem: 6
  },
  {
    id: "foto-7",
    titulo: "Mirante Natural da Lagoinha",
    categoria: "Paisagens",
    linkImagem: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80",
    linkInstagram: "https://www.instagram.com/p/LagoinhaMirante/",
    alt: "Enseada paradisíaca da praia de Lagoinha Ceará cercada de coqueiros",
    destacada: true,
    ordem: 7
  },
  {
    id: "foto-8",
    titulo: "Buggy do Sol Poente",
    categoria: "Pôr do Sol",
    linkImagem: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80",
    linkInstagram: "https://www.instagram.com/p/BuggySunsetView/",
    alt: "Silhueta de buggy nas dunas durante um pôr do sol avermelhado espetacular",
    destacada: false,
    ordem: 8
  }
];

export const DEFAULT_VIDEOS: Video[] = [
  {
    id: "video-1",
    titulo: "Adrenalina Máxima nas Dunas Cearenses",
    categoria: "Buggy",
    linkVideo: "https://assets.mixkit.co/videos/preview/mixkit-driving-in-the-desert-sands-40890-large.mp4",
    miniatura: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=600&q=80",
    descricao: "Emoção pura nas curvas sinuosas das dunas gigantes do litoral oeste do Ceará.",
    destacado: true,
    ordem: 1
  },
  {
    id: "video-2",
    titulo: "As Maravilhas Fluviais do Litoral",
    categoria: "Paisagens",
    linkVideo: "https://assets.mixkit.co/videos/preview/mixkit-beautiful-aerial-view-of-waves-breaking-on-sandy-beach-43110-large.mp4",
    miniatura: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80",
    descricao: "Voo rasante sobre o mar turquesa e as falésias avermelhadas.",
    destacado: true,
    ordem: 2
  },
  {
    id: "video-3",
    titulo: "Mergulho de Tirar o Fôlego",
    categoria: "Praias",
    linkVideo: "https://assets.mixkit.co/videos/preview/mixkit-turquoise-sea-waves-crashing-on-shore-43572-large.mp4",
    miniatura: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    descricao: "As águas mornas e transparentes que banham o litoral cearense.",
    destacado: false,
    ordem: 3
  }
];

export const DEFAULT_PASSEIOS: Passeio[] = [
  {
    id: "passeio-cumbuco",
    titulo: "Cumbuco - Emoção Extrema",
    descricao: "O berço mundial do kitesurf e das dunas mais emocionantes. Inclui descida de tirolesa, esquibunda e parada na Lagoa do Parnamirim.",
    imagem: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80",
    tempo: "Dia Inteiro - 6 a 7 horas",
    local: "Litoral Oeste (Fortaleza/Caucaia)",
    preco: "350",
    destacado: true,
    ordem: 1
  },
  {
    id: "passeio-lagoinha",
    titulo: "Lagoinha - Cartão Postal",
    descricao: "Uma das praias mais lindas do Brasil. Enseada em forma de meia-lua repleta de coqueiros, lagoas de águas doces e dunas majestosas.",
    imagem: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    tempo: "Dia Inteiro - 8 horas",
    local: "Litoral Oeste (Paraipaba)",
    preco: "450",
    destacado: true,
    ordem: 2
  },
  {
    id: "passeio-morro-branco",
    titulo: "Morro Branco - Falésias Coloridas",
    descricao: "Famosa pelas dunas de areias coloridas e o incrível labirinto de falésias esculpidas pela ação da chuva e do vento.",
    imagem: "https://images.unsplash.com/photo-1509233725247-49e657c54213?auto=format&fit=crop&w=800&q=80",
    tempo: "Dia Inteiro - 6 horas",
    local: "Litoral Leste (Beberibe)",
    preco: "400",
    destacado: true,
    ordem: 3
  },
  {
    id: "passeio-praia-fontes",
    titulo: "Praia das Fontes - Grutas e Bicas",
    descricao: "Um espetáculo natural com bicas de água doce jorrando das falésias, além de lagoas calmas e a famosa Gruta da Mãe D'água.",
    imagem: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    tempo: "Dia Inteiro - 7 horas",
    local: "Litoral Leste (Beberibe)",
    preco: "420",
    destacado: false,
    ordem: 4
  },
  {
    id: "passeio-canoa-quebrada",
    titulo: "Canoa Quebrada - Misticismo e Beleza",
    descricao: "Famosa pela Broadway e o clássico símbolo esculpido nas falésias vermelhas. Passeio com direito a passeio de buggy nas dunas gigantes.",
    imagem: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
    tempo: "Dia Inteiro - 9 horas",
    local: "Litoral Leste (Aracati)",
    preco: "500",
    destacado: true,
    ordem: 5
  },
  {
    id: "passeio-personalizado",
    titulo: "Passeio de Buggy Personalizado",
    descricao: "Você define a rota! Escolha as paradas, lagoas e o nível de emoção. Nosso buggy e piloto experiente estarão 100% à sua disposição.",
    imagem: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=800&q=80",
    tempo: "Flexível",
    local: "Litoral Leste ou Oeste",
    preco: "Sob Consulta",
    destacado: true,
    ordem: 6
  },
  {
    id: "passeio-4x4",
    titulo: "Aventura 4x4 Off-Road",
    descricao: "Para quem busca conforto absoluto e capacidade off-road extrema. Veículos 4x4 blindados de poeira e prontos para dunas extremas.",
    imagem: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
    tempo: "Dia Inteiro - 7 horas",
    local: "Qualquer Loteamento / Litoral",
    preco: "600",
    destacado: false,
    ordem: 7
  },
  {
    id: "passeio-coletivo",
    titulo: "Excursões Coletivas",
    descricao: "Conheça as belezas do Ceará economizando. Vans ou micro-ônibus climatizados com guias locais credenciados pelo Ministério do Turismo.",
    imagem: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
    tempo: "Dia Inteiro - 8 a 10 horas",
    local: "Principais Praias",
    preco: "120",
    destacado: false,
    ordem: 8
  }
];

export const DEFAULT_DEPOIMENTOS: Depoimento[] = [
  {
    id: "dep-1",
    nome: "Mariana e Rodrigo Silva",
    foto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
    nota: 5,
    depoimento: "O passeio de buggy em Cumbuco com a Ceará Buggy Tur foi disparado a melhor experiência da nossa viagem! O motorista era super experiente, fez manobras emocionantes e nos levou em lagoas que parecem o caribe brasileiro. Vale cada centavo!",
    data: "Janeiro de 2026"
  },
  {
    id: "dep-2",
    nome: "Dr. Carlos Eduardo Menezes",
    foto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
    nota: 5,
    depoimento: "Fizemos o passeio de 4x4 em família para Canoa Quebrada. Carro impecável, super limpo e seguro. O guia tirou fotos espetaculares da nossa família nas falésias vermelhas. Recomendo fortemente para quem quer turismo premium.",
    data: "Fevereiro de 2026"
  },
  {
    id: "dep-3",
    nome: "Amanda Oliveira",
    foto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80",
    nota: 5,
    depoimento: "Fiz o passeio personalizado de buggy e foi incrível. Pedi 'com emoção' e foi indescritível! Sentir o vento no rosto nas dunas, com motorista extremamente cuidadoso, me deu muita segurança. Atendimento maravilhoso no WhatsApp.",
    data: "Março de 2026"
  }
];

export const DEFAULT_FAQ: FAQ[] = [
  {
    id: "faq-1",
    pergunta: "Quanto tempo dura o passeio?",
    resposta: "Nossos passeios de buggy e 4x4 duram em média de 6 a 8 horas, dependendo do roteiro escolhido. Geralmente iniciamos por volta das 08:30 ou 09:00 e retornamos no fim da tarde, após o pôr do sol."
  },
  {
    id: "faq-2",
    pergunta: "Posso levar crianças no passeio de buggy?",
    resposta: "Sim, com total segurança! Crianças a partir de 2 anos podem ir no buggy acompanhadas pelos pais. Possuímos adaptadores de segurança e cintos reforçados para que toda a família aproveite sem preocupações."
  },
  {
    id: "faq-3",
    pergunta: "Quais são as formas de pagamento aceitas?",
    resposta: "Aceitamos PIX, cartões de crédito (com possibilidade de parcelamento em até 3x sem juros) e cartões de débito. Você pode efetuar um sinal para reserva no Pix e o restante no dia do passeio."
  },
  {
    id: "faq-4",
    pergunta: "Como funciona o processo de reserva?",
    resposta: "É extremamente simples e rápido. Basta clicar em qualquer botão de 'Reservar Agora' ou 'Chamar no WhatsApp' no site. Você será direcionado para um de nossos guias especialistas, que confirmará as datas disponíveis e finalizará sua reserva de forma humanizada."
  },
  {
    id: "faq-5",
    pergunta: "O que já está incluso no valor do passeio?",
    resposta: "Está incluso o veículo (buggy ou 4x4) exclusivo, motorista profissional credenciado, combustível e seguro para passageiros. Despesas de alimentação, bebidas e ingressos de atrações extras (como tirolesa ou esquibunda) são pagos à parte pelos clientes."
  }
];

// Helper to fetch data
export async function loadData<T>(key: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`/api/dados/${key}`);
    if (!res.ok) {
      throw new Error(`Failed to load ${key}`);
    }
    return await res.json();
  } catch (err) {
    console.warn(`Could not load /api/dados/${key}, falling back to local storage or defaults`, err);
    // Attempt local storage fallback
    const local = localStorage.getItem(`cearabuggy_${key}`);
    if (local) {
      try {
        return JSON.parse(local);
      } catch (e) {
        // use default
      }
    }
    return fallback;
  }
}

// Helper to save data
export async function saveData<T>(key: string, data: T, password?: string): Promise<{ success: boolean; message: string }> {
  // Always save locally in localStorage as a direct, instant backup
  localStorage.setItem(`cearabuggy_${key}`, JSON.stringify(data));

  try {
    const res = await fetch(`/api/dados/${key}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        password: password || "admin",
        data
      })
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.error || "Erro ao salvar no servidor.");
    }

    return await res.json();
  } catch (err: any) {
    console.error(`Could not save /api/dados/${key} on server`, err);
    return {
      success: true, // we still mark success because localStorage is updated for immediate preview!
      message: `Salvo localmente no navegador! (Servidor offline/não autenticado: ${err.message})`
    };
  }
}

// WhatsApp link helper with prefilled customizable message
export function getWhatsAppUrl(phoneNumber: string, message: string): string {
  const cleanPhone = phoneNumber.replace(/\D/g, "");
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
