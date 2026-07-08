export interface Config {
  logo: string;
  whatsapp: string;
  instagram: string;
  telefone: string;
  endereco: string;
  mapsIframe: string;
  rodape: string;
  adminPassword?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
}

export interface Banner {
  titulo: string;
  subtitulo: string;
  videoUrl: string;
  instagramBackupUrl?: string;
  botaoPrincipal: string;
  botaoSecundario: string;
}

export interface Foto {
  id: string;
  titulo: string;
  categoria: string;
  linkImagem: string;
  linkInstagram?: string;
  alt: string;
  destacada: boolean;
  ordem: number;
}

export interface Video {
  id: string;
  titulo: string;
  categoria: string;
  linkVideo: string;
  miniatura?: string;
  descricao: string;
  destacado: boolean;
  ordem: number;
}

export interface Passeio {
  id: string;
  titulo: string;
  descricao: string;
  imagem: string;
  tempo: string;
  local: string;
  preco: string;
  destacado: boolean;
  ordem: number;
}

export interface Depoimento {
  id: string;
  nome: string;
  foto: string;
  nota: number;
  depoimento: string;
  data: string;
}

export interface FAQ {
  id: string;
  pergunta: string;
  resposta: string;
}
