// ============================================================
//  PRODUTO CATALOG — IR3H IMVU Store (Expanded)
// ============================================================

export type ProductBadge = 'sale' | 'new' | 'hot' | 'exclusive';
export type ProductCategory = 'credits' | 'vip' | 'ap' | 'rooms' | 'nude' | 'combos' | 'service';
export type DeliveryMode = 'gift' | 'transfer' | 'login' | 'gift_or_transfer';

export interface ProductBenefit {
  icon: string;
  text: string;
}

export interface ProductReview {
  author: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
}

export interface Product {
  id: number;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  priceOnRequest?: boolean;
  originalPrice?: number;
  discount?: number;
  image: string;
  badge?: ProductBadge;
  rating: number;
  reviews: number;
  sold: string;
  category: ProductCategory;
  colors?: string[];
  isFavorite?: boolean;
  deliveryTime: string;         // e.g. "5 a 15 minutos"
  deliveryModes: DeliveryMode[]; // which modes are available
  benefits: ProductBenefit[];
  requirements?: string[];
  tags: string[];
  relatedIds: number[];
  featured?: boolean;
  isFlashSale?: boolean;
  isNewArrival?: boolean;
  isRecommended?: boolean;
  stock?: number;               // simulated, for urgency
  reviews_data: ProductReview[];
}

// ─── CREDITS ──────────────────────────────────────────────────

const credits5k: Product = {
  id: 1,
  slug: '5k-creditos-imvu',
  title: '5.000 Créditos IMVU (5k)',
  shortDescription: 'Pacote inicial perfeito para compras no catálogo IMVU.',
  longDescription:
    'Com 5.000 créditos IMVU, você pode comprar itens de moda, acessórios e personalizar seu avatar. É o pacote ideal para quem está começando ou quer fazer compras pontuais no catálogo oficial do IMVU. Entregamos diretamente por presente (Gift) ou por transferência, sem necessidade de fornecer senha.',
  price: 9.90,
  originalPrice: 13.00,
  discount: 24,
  image: '/images/credits.png',
  badge: 'new',
  rating: 4.9,
  reviews: 142,
  sold: '2.5k',
  category: 'credits',
  deliveryTime: '5 a 15 minutos',
  deliveryModes: ['gift', 'transfer'],
  benefits: [
    { icon: '⚡', text: 'Entrega em até 15 minutos via WhatsApp' },
    { icon: '🔒', text: 'Sem necessidade de senha da sua conta' },
    { icon: '💎', text: 'Créditos 100% originais e seguros' },
    { icon: '📞', text: 'Suporte em tempo real pelo WhatsApp' },
  ],
  requirements: [
    'Ter uma conta IMVU ativa',
    'Informar seu Nick (Avatar Name) corretamente',
  ],
  tags: ['créditos', 'imvu', '5k', 'iniciante', 'barato'],
  relatedIds: [2, 3, 21],
  featured: false,
  isFlashSale: false,
  isNewArrival: true,
  isRecommended: false,
  stock: 99,
  reviews_data: [
    { author: 'Mari_games', avatar: '🎀', rating: 5, text: 'Chegou em 10 minutos! Perfeito!', date: '3 dias atrás' },
    { author: 'LuanIMVU', avatar: '🎮', rating: 5, text: 'Muito rápido e seguro. Recomendo!', date: '1 semana atrás' },
    { author: 'Gab_digital', avatar: '⭐', rating: 4, text: 'Ótimo serviço, poucos minutos de espera.', date: '2 semanas atrás' },
  ],
};

const credits10k: Product = {
  id: 2,
  slug: '10k-creditos-imvu',
  title: '10.000 Créditos IMVU (10k)',
  shortDescription: 'O pacote mais popular da IR3H. Ótimo custo-benefício.',
  longDescription:
    'Com 10.000 créditos IMVU, você pode renovar completamente o visual do seu avatar, comprar móveis para sua room e explorar o catálogo com mais liberdade. É o pacote mais vendido da IR3H Store por oferecer o melhor custo-benefício para quem usa o IMVU com frequência.',
  price: 18.90,
  originalPrice: 27.00,
  discount: 30,
  image: '/images/10k_credits.png',
  badge: 'sale',
  rating: 4.9,
  reviews: 312,
  sold: '1.2k',
  category: 'credits',
  deliveryTime: '5 a 15 minutos',
  deliveryModes: ['gift', 'transfer'],
  benefits: [
    { icon: '⚡', text: 'Entrega em até 15 minutos via WhatsApp' },
    { icon: '🔒', text: 'Sem necessidade de senha da sua conta' },
    { icon: '💎', text: 'Créditos 100% originais e seguros' },
    { icon: '🎁', text: 'Pode ser enviado como presente para amigos' },
    { icon: '🏆', text: 'Pacote mais vendido da IR3H Store' },
  ],
  requirements: [
    'Ter uma conta IMVU ativa',
    'Informar seu Nick (Avatar Name) corretamente',
  ],
  tags: ['créditos', 'imvu', '10k', 'popular', 'desconto'],
  relatedIds: [1, 3, 4, 21],
  featured: true,
  isFlashSale: true,
  isNewArrival: false,
  isRecommended: true,
  stock: 87,
  reviews_data: [
    { author: 'Thay_IMVU', avatar: '💜', rating: 5, text: 'Melhor custo-benefício! Já comprei 3x aqui.', date: '2 dias atrás' },
    { author: 'Carlos_gamer', avatar: '🎮', rating: 5, text: 'Rápido e seguro. Nota 10!', date: '4 dias atrás' },
    { author: 'Ana_digital', avatar: '💎', rating: 5, text: 'Minha loja favorita de créditos IMVU.', date: '1 semana atrás' },
  ],
};

const credits20k: Product = {
  id: 3,
  slug: '20k-creditos-imvu',
  title: '20.000 Créditos IMVU (20k)',
  shortDescription: 'Para quem usa o IMVU com frequência e quer mais liberdade.',
  longDescription:
    'Com 20.000 créditos IMVU, você terá liberdade total para explorar o catálogo por semanas. Perfeito para quem está montando uma coleção de roupas, decorando uma room ou comprando itens premium. Economia real comparado a comprar dois pacotes de 10k.',
  price: 36.90,
  originalPrice: 48.00,
  discount: 23,
  image: '/images/credits.png',
  badge: 'hot',
  rating: 4.9,
  reviews: 290,
  sold: '1.8k',
  category: 'credits',
  deliveryTime: '5 a 15 minutos',
  deliveryModes: ['gift', 'transfer'],
  benefits: [
    { icon: '⚡', text: 'Entrega em até 15 minutos via WhatsApp' },
    { icon: '💰', text: 'Economize vs. comprar 2x o pacote de 10k' },
    { icon: '🔒', text: 'Sem necessidade de senha da sua conta' },
    { icon: '💎', text: 'Créditos 100% originais e seguros' },
  ],
  requirements: [
    'Ter uma conta IMVU ativa',
    'Informar seu Nick (Avatar Name) corretamente',
  ],
  tags: ['créditos', 'imvu', '20k', 'popular', 'hot'],
  relatedIds: [2, 4, 22],
  featured: true,
  isFlashSale: false,
  isNewArrival: true,
  isRecommended: true,
  stock: 62,
  reviews_data: [
    { author: 'Paty_IMVU', avatar: '✨', rating: 5, text: 'Durou semanas! Super vale a pena.', date: '5 dias atrás' },
    { author: 'Renan_g', avatar: '🎯', rating: 5, text: 'Entrega super rápida. Perfeito!', date: '2 semanas atrás' },
    { author: 'Vivi_games', avatar: '💜', rating: 4, text: 'Ótimo, só demorou um pouco mais que o esperado mas chegou!', date: '3 semanas atrás' },
  ],
};

const credits50k: Product = {
  id: 4,
  slug: '50k-creditos-imvu',
  title: '50.000 Créditos IMVU (50k)',
  shortDescription: 'Pacote avançado para usuários frequentes e colecionadores.',
  longDescription:
    'O pacote de 50.000 créditos é para o usuário sério do IMVU. Com ele, você tem autonomia para meses de compras, pode montar rooms completas, adquirir itens exclusivos e presentear amigos. Um dos melhores investimentos para quem ama a plataforma.',
  price: 89.90,
  originalPrice: 119.90,
  discount: 25,
  image: '/images/50k_credits.jpg',
  badge: 'sale',
  rating: 4.8,
  reviews: 145,
  sold: '580',
  category: 'credits',
  deliveryTime: '5 a 20 minutos',
  deliveryModes: ['gift', 'transfer'],
  benefits: [
    { icon: '⚡', text: 'Entrega em até 20 minutos via WhatsApp' },
    { icon: '💰', text: 'Melhor preço por crédito da linha' },
    { icon: '🔒', text: 'Sem necessidade de senha da sua conta' },
    { icon: '🎁', text: 'Pode ser dividido em presentes para amigos' },
    { icon: '📞', text: 'Suporte prioritário no WhatsApp' },
  ],
  requirements: [
    'Ter uma conta IMVU ativa',
    'Informar seu Nick (Avatar Name) corretamente',
  ],
  tags: ['créditos', 'imvu', '50k', 'avançado', 'desconto', 'popular'],
  relatedIds: [3, 5, 22, 23],
  featured: true,
  isFlashSale: true,
  isNewArrival: false,
  isRecommended: true,
  stock: 45,
  reviews_data: [
    { author: 'Dani_IMVU', avatar: '💰', rating: 5, text: 'Me durou meses! Melhor compra que fiz.', date: '1 semana atrás' },
    { author: 'Pedro_pro', avatar: '🏆', rating: 5, text: 'Pagamento fácil via Pix. Chegou rapidíssimo!', date: '2 semanas atrás' },
  ],
};

const credits100k: Product = {
  id: 5,
  slug: '100k-creditos-imvu',
  title: '100.000 Créditos IMVU (100k)',
  shortDescription: 'Máxima liberdade no IMVU. Para os verdadeiros entusiastas.',
  longDescription:
    'Com 100.000 créditos você é livre no IMVU. Explore qualquer seção do catálogo sem preocupações, monte rooms temáticas completas, colecione itens raros e ajude amigos. Ideal para criadores de conteúdo e usuários VIP que exigem o melhor da plataforma.',
  price: 174.90,
  originalPrice: 220.00,
  discount: 20,
  image: '/images/credits.png',
  badge: 'hot',
  rating: 5.0,
  reviews: 422,
  sold: '950',
  category: 'credits',
  deliveryTime: '10 a 25 minutos',
  deliveryModes: ['gift', 'transfer'],
  benefits: [
    { icon: '⚡', text: 'Entrega em até 25 minutos via WhatsApp' },
    { icon: '💰', text: 'Maior custo-benefício da IR3H Store' },
    { icon: '🔒', text: 'Sem necessidade de senha da sua conta' },
    { icon: '🎁', text: 'Pode ser fracionado em várias entregas' },
    { icon: '🏆', text: 'Suporte VIP com atendimento prioritário' },
    { icon: '📦', text: 'Nota de entrega com protocolo garantido' },
  ],
  requirements: [
    'Ter uma conta IMVU ativa',
    'Informar seu Nick (Avatar Name) corretamente',
    'Disponível apenas para contas com mais de 30 dias',
  ],
  tags: ['créditos', 'imvu', '100k', 'premium', 'hot', 'popular'],
  relatedIds: [4, 6, 23, 24],
  featured: true,
  isFlashSale: false,
  isNewArrival: false,
  isRecommended: true,
  stock: 30,
  reviews_data: [
    { author: 'Max_IMVU', avatar: '🏆', rating: 5, text: 'Melhor compra da minha vida no IMVU! Nunca mais fico sem créditos.', date: '3 dias atrás' },
    { author: 'Lara_collector', avatar: '💎', rating: 5, text: 'Comprei e em 20 minutos já estava tudo na conta. Incrível!', date: '1 semana atrás' },
    { author: 'Rog_gamer', avatar: '🎮', rating: 5, text: 'Serviço top. Já é minha 4ª compra.', date: '2 semanas atrás' },
  ],
};

const credits200k: Product = {
  id: 6,
  slug: '200k-creditos-imvu',
  title: '200.000 Créditos IMVU (200k)',
  shortDescription: 'O pacote mais completo para os maiores fãs do IMVU.',
  longDescription:
    'O maior pacote de créditos da IR3H Store. Com 200.000 créditos, você terá acesso ilimitado ao mundo do IMVU por muito tempo. Perfeito para quem quer o melhor do melhor ou para criadores que precisam de muitos recursos para seus projetos.',
  price: 329.90,
  originalPrice: 420.00,
  discount: 21,
  image: '/images/credits.png',
  badge: 'exclusive',
  rating: 5.0,
  reviews: 89,
  sold: '250',
  category: 'credits',
  deliveryTime: '15 a 30 minutos',
  deliveryModes: ['gift', 'transfer'],
  benefits: [
    { icon: '⚡', text: 'Entrega em até 30 minutos via WhatsApp' },
    { icon: '💰', text: 'Melhor preço absoluto por crédito' },
    { icon: '🔒', text: 'Sem necessidade de senha da sua conta' },
    { icon: '🏆', text: 'Atendimento VIP com gerente exclusivo' },
    { icon: '📦', text: 'Protocolo e nota de entrega garantidos' },
  ],
  requirements: [
    'Ter uma conta IMVU ativa',
    'Informar seu Nick (Avatar Name) corretamente',
    'Recomendado para contas com mais de 30 dias',
  ],
  tags: ['créditos', 'imvu', '200k', 'exclusivo', 'premium'],
  relatedIds: [5, 24],
  featured: true,
  isFlashSale: false,
  isNewArrival: false,
  isRecommended: false,
  stock: 15,
  reviews_data: [
    { author: 'Felipe_top', avatar: '💎', rating: 5, text: 'Investimento que vale muito a pena!', date: '1 semana atrás' },
    { author: 'Kari_VIP', avatar: '👑', rating: 5, text: 'Atendimento impecável e entrega rápida mesmo sendo quantidade grande.', date: '3 semanas atrás' },
  ],
};

// ─── VIP ──────────────────────────────────────────────────────

const vipGold: Product = {
  id: 11,
  slug: 'vip-gold-1-mes',
  title: 'VIP Gold IMVU — 1 Mês',
  shortDescription: 'Benefícios Gold por 30 dias. Mais créditos diários e destaque na plataforma.',
  longDescription:
    'O VIP Gold é o primeiro nível de assinatura premium do IMVU. Com ele, você recebe créditos bônus diários, badge exclusivo no seu perfil, acesso a itens VIP do catálogo e destaque nas salas. É a forma mais rápida de melhorar sua experiência no IMVU sem gastar muito.',
  price: 24.90,
  originalPrice: 35.00,
  discount: 29,
  image: '/images/vip.png',
  badge: 'new',
  rating: 4.6,
  reviews: 64,
  sold: '350',
  category: 'vip',
  deliveryTime: '10 a 30 minutos',
  deliveryModes: ['gift', 'login'],
  benefits: [
    { icon: '👑', text: 'Badge Gold exclusivo no seu perfil' },
    { icon: '💰', text: 'Créditos bônus diários incluídos' },
    { icon: '🛍️', text: 'Acesso a itens VIP exclusivos do catálogo' },
    { icon: '⭐', text: 'Destaque nas salas de chat' },
    { icon: '⚡', text: 'Ativação rápida em até 30 minutos' },
  ],
  requirements: [
    'Ter uma conta IMVU ativa',
    'Informar Nick e e-mail da conta para ativação via Login',
    'Não ter VIP ativo no momento da compra',
  ],
  tags: ['vip', 'imvu', 'gold', 'assinatura', 'benefícios'],
  relatedIds: [12, 13, 2, 21],
  featured: false,
  isFlashSale: false,
  isNewArrival: true,
  isRecommended: false,
  stock: 99,
  reviews_data: [
    { author: 'Nati_IMVU', avatar: '👑', rating: 5, text: 'Badge incrível! Vale muito.', date: '1 semana atrás' },
    { author: 'Bruno_VIP', avatar: '⭐', rating: 4, text: 'Ativação foi rápida e o suporte me ajudou!', date: '2 semanas atrás' },
  ],
};

const vipPlatinum: Product = {
  id: 12,
  slug: 'vip-platinum-1-mes',
  title: 'VIP Platinum IMVU — 1 Mês',
  shortDescription: 'Mais créditos diários, destaque Platinum e acesso exclusivo a conteúdos.',
  longDescription:
    'O VIP Platinum eleva sua experiência no IMVU para outro nível. Além de tudo do Gold, você ganha mais créditos por dia, badge Platinum diferenciado, prioridade em salas populares e acesso antecipado a lançamentos. Para quem quer ser notado no IMVU.',
  price: 49.90,
  originalPrice: 65.00,
  discount: 23,
  image: '/images/vip.png',
  badge: 'new',
  rating: 4.8,
  reviews: 83,
  sold: '210',
  category: 'vip',
  deliveryTime: '10 a 30 minutos',
  deliveryModes: ['gift', 'login'],
  benefits: [
    { icon: '💎', text: 'Badge Platinum exclusivo e diferenciado' },
    { icon: '💰', text: 'Mais créditos diários que o Gold' },
    { icon: '🛍️', text: 'Acesso a itens Platinum exclusivos do catálogo' },
    { icon: '⭐', text: 'Prioridade em salas de chat populares' },
    { icon: '🔓', text: 'Acesso antecipado a lançamentos IMVU' },
  ],
  requirements: [
    'Ter uma conta IMVU ativa',
    'Informar Nick e e-mail da conta para ativação via Login',
    'Não ter VIP ativo no momento da compra (o novo sobrepõe)',
  ],
  tags: ['vip', 'imvu', 'platinum', 'assinatura', 'premium'],
  relatedIds: [11, 13, 3, 21],
  featured: true,
  isFlashSale: false,
  isNewArrival: true,
  isRecommended: true,
  stock: 60,
  reviews_data: [
    { author: 'Camila_P', avatar: '💎', rating: 5, text: 'Platinum é incrível. Badge muito bonito!', date: '4 dias atrás' },
    { author: 'Diego_IMVU', avatar: '⭐', rating: 5, text: 'Muito mais créditos que o Gold. Vale cada centavo.', date: '2 semanas atrás' },
  ],
};

const vipDiamond: Product = {
  id: 13,
  slug: 'vip-diamond-1-mes',
  title: 'VIP Diamond IMVU — 1 Mês',
  shortDescription: 'O nível VIP mais alto do IMVU. Benefícios exclusivos e máxima presença.',
  longDescription:
    'O VIP Diamond é o ápice da experiência VIP no IMVU. Com badge Diamond brilhante, o maior bônus de créditos diários, acesso total a conteúdos exclusivos, salas premium e status máximo no jogo. Se você quer ser reconhecido como um usuário premium de verdade, o Diamond é para você.',
  price: 79.90,
  originalPrice: 99.90,
  discount: 20,
  image: '/images/vip.png',
  badge: 'hot',
  rating: 4.8,
  reviews: 95,
  sold: '150',
  category: 'vip',
  deliveryTime: '10 a 30 minutos',
  deliveryModes: ['gift', 'login'],
  benefits: [
    { icon: '💠', text: 'Badge Diamond — o mais exclusivo do IMVU' },
    { icon: '💰', text: 'Máximo bônus de créditos diários' },
    { icon: '🛍️', text: 'Acesso total a todos os itens VIP' },
    { icon: '👑', text: 'Status máximo no jogo — seja notado!' },
    { icon: '🔓', text: 'Acesso a salas e eventos exclusivos Diamond' },
    { icon: '⚡', text: 'Ativação rápida com suporte prioritário' },
  ],
  requirements: [
    'Ter uma conta IMVU ativa',
    'Informar Nick e e-mail da conta para ativação via Login',
    'Funciona independentemente do VIP atual',
  ],
  tags: ['vip', 'imvu', 'diamond', 'premium', 'exclusivo', 'hot'],
  relatedIds: [12, 22],
  featured: true,
  isFlashSale: true,
  isNewArrival: false,
  isRecommended: true,
  stock: 40,
  reviews_data: [
    { author: 'Luana_D', avatar: '💠', rating: 5, text: 'Diamond é simplesmente perfeito. Todo mundo pergunta o meu badge!', date: '5 dias atrás' },
    { author: 'Rodrigo_VIP', avatar: '👑', rating: 5, text: 'Melhor investimento no IMVU. Ativação em 15 minutos.', date: '1 semana atrás' },
    { author: 'Bia_gamer', avatar: '✨', rating: 4, text: 'Incrível! Vale cada centavo.', date: '2 semanas atrás' },
  ],
};

// ─── AP (Access Pass) ─────────────────────────────────────────

const accessPass: Product = {
  id: 21,
  slug: 'access-pass-ap-oficial',
  title: 'Access Pass (AP) Oficial IMVU',
  shortDescription: 'Desbloqueie o conteúdo adulto do IMVU. Permanente na conta.',
  longDescription:
    'O Access Pass (AP) é o desbloqueio oficial do conteúdo adulto do IMVU. Com ele, você acessa salas adultas, itens para maiores e recursos exclusivos que estão bloqueados para contas normais. O AP é ativado diretamente na sua conta pelo sistema oficial do IMVU e fica permanente. A ativação é feita por Login temporário com máxima segurança.',
  price: 99.90,
  originalPrice: 129.90,
  discount: 23,
  image: '/images/ap.png',
  badge: 'hot',
  rating: 4.7,
  reviews: 180,
  sold: '600',
  category: 'ap',
  deliveryTime: '15 a 40 minutos',
  deliveryModes: ['login'],
  benefits: [
    { icon: '🔓', text: 'Acesso permanente ao conteúdo adulto' },
    { icon: '🔒', text: 'Ativação oficial pelo sistema IMVU' },
    { icon: '🛡️', text: 'Processo seguro — altere sua senha após ativação' },
    { icon: '📜', text: 'Permanente na conta — pague uma vez, use sempre' },
    { icon: '💎', text: 'Abre acesso a salas, itens e recursos adultos' },
  ],
  requirements: [
    'Ter uma conta IMVU ativa',
    'Ser maior de 18 anos',
    'Fornecer e-mail e senha da conta temporariamente para ativação',
    'Alterar a senha após a ativação ser concluída',
    'Conta deve ter pelo menos 30 dias de existência',
  ],
  tags: ['ap', 'access pass', 'imvu', 'adulto', 'desbloqueio'],
  relatedIds: [13, 22, 31],
  featured: true,
  isFlashSale: false,
  isNewArrival: false,
  isRecommended: true,
  stock: 99,
  reviews_data: [
    { author: 'Alex_AP', avatar: '🔓', rating: 5, text: 'Ativou direitinho. Processo foi explicado passo a passo.', date: '3 dias atrás' },
    { author: 'Sara_IMVU', avatar: '💎', rating: 5, text: 'Tudo certo! Agora tenho acesso a muito mais no IMVU.', date: '1 semana atrás' },
    { author: 'Pedro_adult', avatar: '⭐', rating: 4, text: 'Demorou 30 min mas chegou. Ótimo atendimento.', date: '2 semanas atrás' },
  ],
};

// ─── ROOMS ────────────────────────────────────────────────────

const roomBasica: Product = {
  id: 31,
  slug: 'sala-chat-basica-imvu',
  title: 'Sala de Chat IMVU — Básica',
  shortDescription: 'Sua própria sala de chat no IMVU pronta para usar.',
  longDescription:
    'Tenha sua própria sala de chat no IMVU! A Sala Básica inclui um espaço personalizado no universo IMVU onde você pode receber amigos, organizar encontros virtuais e ter seu próprio cantinho digital. Configurada e enviada diretamente para sua conta.',
  price: 34.90,
  originalPrice: 50.00,
  discount: 30,
  image: '/images/rooms.png',
  badge: 'new',
  rating: 4.8,
  reviews: 45,
  sold: '180',
  category: 'rooms',
  deliveryTime: '20 a 60 minutos',
  deliveryModes: ['gift', 'login'],
  benefits: [
    { icon: '🏠', text: 'Sala própria no universo IMVU' },
    { icon: '👥', text: 'Receba amigos e organize encontros virtuais' },
    { icon: '🎨', text: 'Decoração básica incluída' },
    { icon: '⚡', text: 'Entrega e configuração em até 60 minutos' },
  ],
  requirements: [
    'Ter uma conta IMVU ativa',
    'Informar seu Nick para entrega',
  ],
  tags: ['rooms', 'sala', 'imvu', 'chat', 'básica'],
  relatedIds: [32, 21, 2],
  featured: false,
  isFlashSale: false,
  isNewArrival: true,
  isRecommended: true,
  stock: 99,
  reviews_data: [
    { author: 'Mel_rooms', avatar: '🏠', rating: 5, text: 'Sala linda! Todos os meus amigos adoraram.', date: '4 dias atrás' },
    { author: 'Joao_IMVU', avatar: '⭐', rating: 4, text: 'Boa opção para começar a ter sua sala.', date: '2 semanas atrás' },
  ],
};

const roomDecoracao: Product = {
  id: 32,
  slug: 'decoracao-completa-sala-imvu',
  title: 'Decoração Completa para Sala IMVU',
  shortDescription: 'Pacote de decoração premium para transformar sua sala no IMVU.',
  longDescription:
    'Transforme sua sala do IMVU com um pacote completo de decoração premium! Inclui móveis, iluminação, objetos decorativos e temática personalizada. Sua sala vai se tornar o ponto de encontro favorito dos seus amigos no IMVU. Aplicamos todos os itens diretamente na sua sala.',
  price: 0,
  priceOnRequest: true,
  image: '/images/rooms.png',
  badge: 'hot',
  rating: 4.9,
  reviews: 112,
  sold: '420',
  category: 'service',
  deliveryTime: '30 a 90 minutos',
  deliveryModes: ['login'],
  benefits: [
    { icon: '🛋️', text: 'Móveis premium incluídos no pacote' },
    { icon: '💡', text: 'Iluminação e efeitos especiais' },
    { icon: '🎨', text: 'Temática personalizada conforme seu gosto' },
    { icon: '✨', text: 'Objetos decorativos exclusivos' },
    { icon: '📸', text: 'Foto final da sala enviada para aprovação' },
  ],
  requirements: [
    'Ter uma conta IMVU active com sala existente',
    'Fornecer acesso temporário via Login para aplicação',
    'Informar tema/estilo de preferência ao solicitar',
  ],
  tags: ['rooms', 'decoração', 'imvu', 'sala', 'premium'],
  relatedIds: [31, 21, 13],
  featured: true,
  isFlashSale: false,
  isNewArrival: false,
  isRecommended: true,
  stock: 40,
  reviews_data: [
    { author: 'Rafa_decor', avatar: '🛋️', rating: 5, text: 'Ficou INCRÍVEL! Melhor que esperava.', date: '3 dias atrás' },
    { author: 'Bianca_room', avatar: '💜', rating: 5, text: 'Atendimento e resultado perfeitos. Sala dos sonhos!', date: '1 semana atrás' },
    { author: 'Leo_IMVU', avatar: '✨', rating: 5, text: 'Todos os amigos amaram. Nota 10!', date: '3 semanas atrás' },
  ],
};

const serviceCasamento: Product = {
  id: 61,
  slug: 'decoracao-casamento-imvu',
  title: 'Serviço de Casamento IMVU',
  shortDescription: 'Organização e decoração completa para o casamento dos seus sonhos no IMVU.',
  longDescription:
    'Realize o casamento perfeito no IMVU! Oferecemos assessoria completa, montagem do altar, recepção de convidados, iluminação especial, efeitos visuais, playlist e um ambiente romântico de alta qualidade para eternizar o seu momento.',
  price: 0,
  priceOnRequest: true,
  image: '/images/services_banner.jpg',
  badge: 'exclusive',
  rating: 5.0,
  reviews: 48,
  sold: '120',
  category: 'service',
  deliveryTime: 'Agendamento prévio',
  deliveryModes: ['login'],
  benefits: [
    { icon: '💒', text: 'Decoração temática e altar personalizado' },
    { icon: '🎶', text: 'Assessoria visual e playlist temática' },
    { icon: '📸', text: 'Ensaio fotográfico dos noivos incluído' },
    { icon: '💬', text: 'Suporte completo durante a cerimônia' }
  ],
  requirements: [
    'Ter uma conta IMVU ativa',
    'Fornecer acesso temporário via Login para aplicação do cenário',
    'Agendar data e horário com nossa equipe no WhatsApp'
  ],
  tags: ['serviço', 'casamento', 'imvu', 'romântico', 'festa'],
  relatedIds: [32, 63],
  reviews_data: [
    { author: 'Lara_e_Dan', avatar: '💍', rating: 5, text: 'Foi lindo demais! Perfeito nos mínimos detalhes.', date: '5 dias atrás' }
  ]
};

const serviceAniversario: Product = {
  id: 62,
  slug: 'decoracao-aniversario-imvu',
  title: 'Serviço de Aniversário IMVU',
  shortDescription: 'Sua festa de aniversário com decorações premium e diversão garantida.',
  longDescription:
    'Comemore seu aniversário em grande estilo no IMVU! Preparamos sua sala com balões, bolo interativo, pista de dança, efeitos especiais, luzes e áreas de pose exclusivas para fotos memoráveis com seus amigos.',
  price: 0,
  priceOnRequest: true,
  image: '/images/services_banner.jpg',
  badge: 'new',
  rating: 4.9,
  reviews: 32,
  sold: '90',
  category: 'service',
  deliveryTime: 'Agendamento prévio',
  deliveryModes: ['login'],
  benefits: [
    { icon: '🎂', text: 'Bolo temático e balões decorativos' },
    { icon: '🕺', text: 'Pista de dança com efeitos especiais' },
    { icon: '📸', text: 'Áreas de pose exclusivas para fotos' },
    { icon: '🎁', text: 'Brinde virtual para o aniversariante' }
  ],
  requirements: [
    'Ter uma conta IMVU ativa',
    'Fornecer acesso temporário via Login para aplicação das decorações',
    'Alinhamento do tema preferido com nossa equipe'
  ],
  tags: ['serviço', 'aniversário', 'imvu', 'festa', 'balada'],
  relatedIds: [64, 32],
  reviews_data: [
    { author: 'Gaby_star', avatar: '🎉', rating: 5, text: 'Minha festa foi a melhor! Todo mundo curtiu muito.', date: '1 semana atrás' }
  ]
};

const serviceRomanticRoom: Product = {
  id: 63,
  slug: 'room-romantica-imvu',
  title: 'Room Romântica Premium IMVU',
  shortDescription: 'Decoração de sala romântica com poses de casal e clima acolhedor.',
  longDescription:
    'Crie um refúgio acolhedor e apaixonante para você e seu par no IMVU. Sala decorada com lareira, pétalas de rosas, velas, poses de casal exclusivas e iluminação aconchegante de alta qualidade.',
  price: 0,
  priceOnRequest: true,
  image: '/images/services_banner.jpg',
  rating: 4.8,
  reviews: 77,
  sold: '210',
  category: 'service',
  deliveryTime: '24 a 48 horas',
  deliveryModes: ['login'],
  benefits: [
    { icon: '❤️', text: 'Poses de casal românticas inclusas' },
    { icon: '🌹', text: 'Pétalas, velas e lareira decorativa' },
    { icon: '🕯️', text: 'Iluminação acolhedora sob medida' }
  ],
  requirements: [
    'Ter uma conta IMVU ativa com sala existente',
    'Acesso temporário via Login para aplicação'
  ],
  tags: ['serviço', 'romântico', 'sala', 'poses', 'imvu'],
  relatedIds: [61, 32],
  reviews_data: [
    { author: 'Leo_love', avatar: '❤️', rating: 5, text: 'A sala ficou perfeita para passar o tempo com meu par.', date: '3 dias atrás' }
  ]
};

const serviceBalada: Product = {
  id: 64,
  slug: 'decoracao-balada-imvu',
  title: 'Serviço de Balada / Club IMVU',
  shortDescription: 'Transforme sua sala em uma balada eletrônica premium e moderna.',
  longDescription:
    'Monte a sua própria balada no IMVU! Oferecemos cabine de DJ completa, lasers animados, painel de LED interativo, som surround configurado, pistas de dança iluminadas e decoração neon incrível.',
  price: 0,
  priceOnRequest: true,
  image: '/images/services_banner.jpg',
  badge: 'hot',
  rating: 4.9,
  reviews: 55,
  sold: '140',
  category: 'service',
  deliveryTime: '24 a 48 horas',
  deliveryModes: ['login'],
  benefits: [
    { icon: '🎧', text: 'Cabine de DJ e painéis LED modernos' },
    { icon: '⚡', text: 'Lasers e luzes rítmicas animadas' },
    { icon: '🕺', text: 'Pista de dança ampla para muitos amigos' }
  ],
  requirements: [
    'Ter uma conta IMVU ativa com sala existente',
    'Acesso temporário via Login para aplicação da estrutura'
  ],
  tags: ['serviço', 'balada', 'club', 'dj', 'festa', 'imvu'],
  relatedIds: [62, 32],
  reviews_data: [
    { author: 'DJ_Tigo', avatar: '🎧', rating: 5, text: 'Ficou idêntico a um club real. Nota 1000!', date: '6 dias atrás' }
  ]
};

const serviceVariado: Product = {
  id: 65,
  slug: 'servicos-variados-imvu',
  title: 'Serviços Variados sob Encomenda',
  shortDescription: 'Tem um projeto especial em mente? Nós criamos e aplicamos para você.',
  longDescription:
    'Precisa de um estilo de decoração específico que não está listado? Quer fazer uma alteração de layout na sua conta, salas temáticas, escritórios ou lounges? Entre em contato e desenvolvemos de acordo com seu orçamento e gosto.',
  price: 0,
  priceOnRequest: true,
  image: '/images/services_banner.jpg',
  rating: 5.0,
  reviews: 19,
  sold: '40',
  category: 'service',
  deliveryTime: 'A combinar',
  deliveryModes: ['login', 'gift'],
  benefits: [
    { icon: '🎨', text: 'Projeto 100% sob medida para sua necessidade' },
    { icon: '🤝', text: 'Atendimento e aprovação antes do pagamento' },
    { icon: '✨', text: 'Total flexibilidade na criação visual' }
  ],
  requirements: [
    'Explicar o projeto desejado para a nossa equipe no WhatsApp',
    'Orçamento calculado com base na complexidade'
  ],
  tags: ['serviço', 'encomenda', 'customizado', 'personalizado', 'imvu'],
  relatedIds: [32, 66],
  reviews_data: [
    { author: 'Carol_S', avatar: '⭐', rating: 5, text: 'Fizeram um lounge de praia incrível para mim. Muito atenciosos!', date: '2 semanas atrás' }
  ]
};

const serviceCutout: Product = {
  id: 66,
  slug: 'cutout-sob-encomenda-imvu',
  title: 'Cutout sob Encomenda IMVU',
  shortDescription: 'Seu avatar IMVU recortado em alta resolução para edições e banners.',
  longDescription:
    'Obtenha o seu avatar recortado com fundo transparente (PNG/Cutout) em altíssima qualidade gráfica, com pose customizada, iluminação realista e retoque de cabelo/pele. Ideal para fotos de perfil, banners do Instagram ou capas de salas.',
  price: 0,
  priceOnRequest: true,
  image: '/images/services_banner.jpg',
  badge: 'hot',
  rating: 4.9,
  reviews: 84,
  sold: '350',
  category: 'service',
  deliveryTime: '12 a 24 horas',
  deliveryModes: ['gift'],
  benefits: [
    { icon: '✂️', text: 'Fundo transparente em formato PNG' },
    { icon: '📸', text: 'Pose personalizada e tratamento de luz' },
    { icon: '👩', text: 'Retoque de cabelo e textura de pele premium' }
  ],
  requirements: [
    'Enviar print ou nick do avatar no IMVU',
    'Especificar a pose e o estilo de retoque desejado'
  ],
  tags: ['serviço', 'cutout', 'edição', 'avatar', 'arte', 'imvu'],
  relatedIds: [67, 65],
  reviews_data: [
    { author: 'Isa_bela', avatar: '🎨', rating: 5, text: 'Edição perfeita, meu avatar ficou maravilhoso!', date: '3 dias atrás' }
  ]
};

const serviceBackground: Product = {
  id: 67,
  slug: 'background-personalizado-imvu',
  title: 'Background Personalizado IMVU',
  shortDescription: 'Criação de cenários de fundo 2D/3D premium para fotos do seu avatar.',
  longDescription:
    'Adicione um cenário de fundo espetacular para as suas fotos e montagens do IMVU. Desenvolvemos cenários urbanos, praias, salas de luxo, paisagens de fantasia ou baladas com alta definição e enquadramento de câmera perfeito.',
  price: 0,
  priceOnRequest: true,
  image: '/images/services_banner.jpg',
  rating: 4.8,
  reviews: 62,
  sold: '190',
  category: 'service',
  deliveryTime: '24 a 48 horas',
  deliveryModes: ['gift'],
  benefits: [
    { icon: '🌅', text: 'Cenários realistas com alta definição' },
    { icon: '📐', text: 'Perspectiva ajustada ao seu avatar' },
    { icon: '🖥️', text: 'Arquivo final entregue em alta resolução' }
  ],
  requirements: [
    'Especificar o tema do cenário desejado',
    'Disponibilizar referências visuais caso possua'
  ],
  tags: ['serviço', 'background', 'cenário', 'foto', 'edição', 'imvu'],
  relatedIds: [66, 65],
  reviews_data: [
    { author: 'Rick_G', avatar: '🌅', rating: 5, text: 'Melhorou 100% as minhas edições no Instagram. Recomendo!', date: '1 semana atrás' }
  ]
};

// ─── NUDE ─────────────────────────────────────────────────────

const nudeSkinsAP: Product = {
  id: 41,
  slug: 'pacote-skins-nude-ap',
  title: 'Pacote de Skins Nude AP — Premium',
  shortDescription: 'Pacote de skins adultas para usar com AP ativo. Alta qualidade.',
  longDescription:
    'Pacote premium de skins Nude para usuários com Access Pass (AP) ativo. Inclui opções variadas de aparências para seu avatar com alta qualidade gráfica. Enviamos os itens diretamente como presentes para o seu avatar. Requer AP ativo na conta.',
  price: 49.90,
  originalPrice: 70.00,
  discount: 28,
  image: '/images/nude.png',
  badge: 'new',
  rating: 4.7,
  reviews: 78,
  sold: '250',
  category: 'nude',
  deliveryTime: '10 a 30 minutos',
  deliveryModes: ['gift'],
  benefits: [
    { icon: '💎', text: 'Skins de alta qualidade e resolução' },
    { icon: '🎁', text: 'Enviado como presente — sem login necessário' },
    { icon: '🔒', text: 'Conteúdo discreto e seguro' },
    { icon: '🔞', text: 'Exclusivo para usuários com AP ativo' },
  ],
  requirements: [
    'Ter AP (Access Pass) ativo na conta',
    'Ser maior de 18 anos',
    'Informar seu Nick corretamente',
  ],
  tags: ['nude', 'skins', 'ap', 'imvu', 'adulto'],
  relatedIds: [42, 21, 22],
  featured: false,
  isFlashSale: false,
  isNewArrival: true,
  isRecommended: true,
  stock: 99,
  reviews_data: [
    { author: 'Ana_nude', avatar: '🔞', rating: 5, text: 'Perfeito! Muito discreto e qualidade excelente.', date: '2 dias atrás' },
    { author: 'Marcos_AP', avatar: '💎', rating: 4, text: 'Boas skins. Entrega rápida!', date: '1 semana atrás' },
  ],
};

const nudeRoupas: Product = {
  id: 42,
  slug: 'roupas-nude-premium-imvu',
  title: 'Roupas Especiais Nude Premium IMVU',
  shortDescription: 'Coleção de roupas adultas premium para seu avatar IMVU.',
  longDescription:
    'Coleção exclusiva de roupas adultas premium para usuários com AP ativo. Inclui peças variadas de vestuário para personalizar seu avatar de forma única. Todos os itens são do catálogo oficial do IMVU e enviados diretamente como presente.',
  price: 39.90,
  originalPrice: 55.00,
  discount: 27,
  image: '/images/nude.png',
  badge: 'hot',
  rating: 4.8,
  reviews: 93,
  sold: '310',
  category: 'nude',
  deliveryTime: '10 a 30 minutos',
  deliveryModes: ['gift'],
  benefits: [
    { icon: '👗', text: 'Coleção variada de roupas premium' },
    { icon: '🎁', text: 'Enviado como presente — sem login' },
    { icon: '🔒', text: 'Conteúdo 100% discreto' },
    { icon: '💎', text: 'Itens do catálogo oficial IMVU' },
  ],
  requirements: [
    'Ter AP (Access Pass) ativo na conta',
    'Ser maior de 18 anos',
    'Informar seu Nick corretamente',
  ],
  tags: ['nude', 'roupas', 'ap', 'imvu', 'adulto', 'premium'],
  relatedIds: [41, 21, 13],
  featured: false,
  isFlashSale: false,
  isNewArrival: false,
  isRecommended: true,
  stock: 80,
  reviews_data: [
    { author: 'Carol_AP', avatar: '👗', rating: 5, text: 'Adorei! Muito discreto e chegou rápido.', date: '6 dias atrás' },
    { author: 'Mark_IMVU', avatar: '🔞', rating: 4, text: 'Bom produto. Atendimento ótimo.', date: '2 semanas atrás' },
  ],
};

// ─── COMBOS ───────────────────────────────────────────────────

const combo50kVipGold: Product = {
  id: 51,
  slug: 'combo-50k-creditos-vip-gold',
  title: 'Combo: 50k Créditos + VIP Gold 1 Mês',
  shortDescription: 'O combo mais popular da IR3H. Créditos + VIP em um só pedido.',
  longDescription:
    'O combo perfeito para quem quer o melhor do IMVU! Você leva 50.000 créditos E 1 mês de VIP Gold em um único pedido, com desconto especial de combo. Isso significa mais créditos no bolso E mais status na plataforma. Muito mais econômico do que comprar separado.',
  price: 109.90,
  originalPrice: 145.00,
  discount: 24,
  image: '/images/combos.png',
  badge: 'hot',
  rating: 4.9,
  reviews: 204,
  sold: '500',
  category: 'combos',
  deliveryTime: '15 a 40 minutos',
  deliveryModes: ['gift_or_transfer', 'login'],
  benefits: [
    { icon: '💎', text: '50.000 créditos IMVU incluídos' },
    { icon: '👑', text: '1 mês de VIP Gold incluído' },
    { icon: '💰', text: 'Economize R$ 35 vs. comprar separado' },
    { icon: '⚡', text: 'Entrega simultânea em até 40 minutos' },
    { icon: '📞', text: 'Suporte dedicado para combos' },
  ],
  requirements: [
    'Ter uma conta IMVU ativa',
    'Nick para os créditos (Gift/Transfer)',
    'E-mail e senha para ativação do VIP Gold',
  ],
  tags: ['combo', 'créditos', 'vip gold', 'imvu', 'desconto', 'popular'],
  relatedIds: [4, 11, 52],
  featured: true,
  isFlashSale: false,
  isNewArrival: false,
  isRecommended: true,
  stock: 55,
  reviews_data: [
    { author: 'Paty_combo', avatar: '🎁', rating: 5, text: 'Melhor combo! Créditos + VIP de uma vez. Amei!', date: '2 dias atrás' },
    { author: 'Tiago_IMVU', avatar: '💰', rating: 5, text: 'Economia real. Não vou mais comprar separado.', date: '4 dias atrás' },
    { author: 'Julia_G', avatar: '👑', rating: 5, text: 'Perfeito! Entrega foi rápida e o suporte ajudou muito.', date: '2 semanas atrás' },
  ],
};

const combo100kAP: Product = {
  id: 52,
  slug: 'combo-100k-creditos-ap',
  title: 'Combo: 100k Créditos + Access Pass (AP)',
  shortDescription: 'O combo ultimate: créditos em quantidade + AP permanente.',
  longDescription:
    'O combo mais completo da IR3H Store! 100.000 créditos para suas compras no catálogo + Access Pass permanente para desbloquear todo o conteúdo adulto do IMVU. Um combo que transforma completamente sua experiência na plataforma. Ativamos tudo em um único atendimento.',
  price: 249.90,
  originalPrice: 320.00,
  discount: 21,
  image: '/images/combos.png',
  badge: 'sale',
  rating: 4.9,
  reviews: 188,
  sold: '300',
  category: 'combos',
  deliveryTime: '20 a 50 minutos',
  deliveryModes: ['gift_or_transfer', 'login'],
  benefits: [
    { icon: '💎', text: '100.000 créditos IMVU incluídos' },
    { icon: '🔓', text: 'Access Pass permanente incluído' },
    { icon: '💰', text: 'Economize R$ 70 vs. comprar separado' },
    { icon: '⚡', text: 'Ativação completa em até 50 minutos' },
    { icon: '🏆', text: 'Atendimento VIP para combo ultra' },
  ],
  requirements: [
    'Ter uma conta IMVU ativa',
    'Nick para os créditos',
    'E-mail e senha para ativação do AP',
    'Ser maior de 18 anos',
  ],
  tags: ['combo', 'créditos', 'ap', 'imvu', 'ultimate', 'desconto'],
  relatedIds: [5, 21, 53],
  featured: true,
  isFlashSale: true,
  isNewArrival: false,
  isRecommended: true,
  stock: 30,
  reviews_data: [
    { author: 'Rafa_ultimate', avatar: '🏆', rating: 5, text: 'Ultimate! Tudo ativado em 40 minutos. Incrível!', date: '1 semana atrás' },
    { author: 'Deb_IMVU', avatar: '🔓', rating: 5, text: 'Melhor investimento do IMVU. AP + 100k créditos!', date: '2 semanas atrás' },
  ],
};

const combo200kAP: Product = {
  id: 53,
  slug: 'combo-200k-creditos-ap',
  title: 'Combo: 200k Créditos + Access Pass (AP)',
  shortDescription: 'O combo definitivo para a experiência IMVU completa.',
  longDescription:
    'O combo definitivo da IR3H Store. Com 200.000 créditos e Access Pass permanente, você tem acesso total ao universo IMVU sem limitações. O maior pacote para quem quer realmente se destacar na plataforma e aproveitar tudo que ela oferece.',
  price: 399.90,
  originalPrice: 499.00,
  discount: 20,
  image: '/images/combos.png',
  badge: 'exclusive',
  rating: 5.0,
  reviews: 92,
  sold: '150',
  category: 'combos',
  deliveryTime: '20 a 60 minutos',
  deliveryModes: ['gift_or_transfer', 'login'],
  benefits: [
    { icon: '💎', text: '200.000 créditos IMVU incluídos' },
    { icon: '🔓', text: 'Access Pass permanente incluído' },
    { icon: '💰', text: 'Economize R$ 100 vs. comprar separado' },
    { icon: '🏆', text: 'Gerente exclusivo para seu atendimento' },
    { icon: '📦', text: 'Protocolo e comprovante de entrega garantidos' },
  ],
  requirements: [
    'Ter uma conta IMVU ativa',
    'Nick para os créditos',
    'E-mail e senha para ativação do AP',
    'Ser maior de 18 anos',
  ],
  tags: ['combo', 'créditos', 'ap', 'imvu', 'definitivo', 'exclusivo'],
  relatedIds: [6, 21, 52],
  featured: true,
  isFlashSale: false,
  isNewArrival: false,
  isRecommended: true,
  stock: 20,
  reviews_data: [
    { author: 'Max_pro', avatar: '💎', rating: 5, text: 'INCRÍVEL! Investimento que vale demais. Sem arrependimentos.', date: '2 semanas atrás' },
    { author: 'Kris_IMVU', avatar: '🏆', rating: 5, text: 'Atendimento perfeito. Entrega na hora prometida.', date: '3 semanas atrás' },
  ],
};

const comboPrimeira: Product = {
  id: 54,
  slug: 'combo-primeira-compra-especial',
  title: '🎁 Combo Primeira Compra — Desconto Especial',
  shortDescription: 'Exclusivo para novos clientes! 10k créditos + VIP Gold com desconto especial.',
  longDescription:
    'Bem-vindo à IR3H Store! Este combo exclusivo foi criado especialmente para quem está fazendo sua primeira compra. Você leva 10.000 créditos IMVU + 1 mês de VIP Gold por um preço especial de boas-vindas. A forma perfeita de começar sua jornada conosco com o pé direito!',
  price: 34.90,
  originalPrice: 60.00,
  discount: 42,
  image: '/images/combos.png',
  badge: 'exclusive',
  rating: 5.0,
  reviews: 67,
  sold: '320',
  category: 'combos',
  deliveryTime: '10 a 30 minutos',
  deliveryModes: ['gift_or_transfer', 'login'],
  benefits: [
    { icon: '💎', text: '10.000 créditos IMVU incluídos' },
    { icon: '👑', text: '1 mês de VIP Gold incluído' },
    { icon: '🎁', text: 'Desconto de boas-vindas exclusivo' },
    { icon: '💰', text: 'Economize R$ 25 — melhor oferta para iniciantes' },
    { icon: '⚡', text: 'Entrega rápida em até 30 minutos' },
  ],
  requirements: [
    'Ter uma conta IMVU ativa',
    'Válido apenas para primeiro pedido na IR3H Store',
    'Nick para os créditos e e-mail para o VIP',
  ],
  tags: ['combo', 'primeira compra', 'créditos', 'vip', 'desconto', 'iniciante'],
  relatedIds: [2, 11, 51],
  featured: true,
  isFlashSale: true,
  isNewArrival: false,
  isRecommended: true,
  stock: 99,
  reviews_data: [
    { author: 'Novo_user', avatar: '🎁', rating: 5, text: 'Primeira compra incrível! Preço absurdamente bom.', date: '1 dia atrás' },
    { author: 'Ingrid_N', avatar: '✨', rating: 5, text: 'Que desconto! Adorei a experiência de compra.', date: '4 dias atrás' },
  ],
};

// ─── Master Catalog ────────────────────────────────────────────

export const allProducts: Product[] = [
  credits5k,
  credits10k,
  credits20k,
  credits50k,
  credits100k,
  credits200k,
  vipGold,
  vipPlatinum,
  vipDiamond,
  accessPass,
  roomBasica,
  roomDecoracao,
  serviceCasamento,
  serviceAniversario,
  serviceRomanticRoom,
  serviceBalada,
  serviceVariado,
  serviceCutout,
  serviceBackground,
  nudeSkinsAP,
  nudeRoupas,
  combo50kVipGold,
  combo100kAP,
  combo200kAP,
  comboPrimeira,
];

export const getProductBySlug = (slug: string): Product | undefined =>
  allProducts.find(p => p.slug === slug);

export const getProductById = (id: number): Product | undefined =>
  allProducts.find(p => p.id === id);

export const getProductsByCategory = (category: ProductCategory): Product[] =>
  allProducts.filter(p => p.category === category);

export const getFlashSaleProducts = (): Product[] =>
  allProducts.filter(p => p.isFlashSale);

export const getNewArrivals = (): Product[] =>
  allProducts.filter(p => p.isNewArrival);

export const getRecommended = (): Product[] =>
  allProducts.filter(p => p.isRecommended);

export const getFeatured = (): Product[] =>
  allProducts.filter(p => p.featured);

export const searchProducts = (query: string): Product[] => {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return allProducts.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.shortDescription.toLowerCase().includes(q) ||
    p.tags.some(t => t.toLowerCase().includes(q)) ||
    p.category.toLowerCase().includes(q)
  );
};

export const getRelated = (product: Product, limit = 4): Product[] => {
  const related = product.relatedIds
    .map(id => getProductById(id))
    .filter(Boolean) as Product[];
  if (related.length < limit) {
    const sameCategory = allProducts.filter(
      p => p.category === product.category && p.id !== product.id && !product.relatedIds.includes(p.id)
    );
    return [...related, ...sameCategory].slice(0, limit);
  }
  return related.slice(0, limit);
};

// Category metadata
export const categoryMeta: Record<string, { label: string; description: string; emoji: string; color: string; image: string }> = {
  credits: {
    label: 'Créditos IMVU',
    description: 'Pacotes de créditos originais para compras no catálogo IMVU. Entrega rápida por Presente ou Transferência.',
    emoji: '💎',
    color: '#312e81',
    image: '/images/cover_all.png',
  },
  vip: {
    label: 'VIP IMVU',
    description: 'Assinaturas VIP para ter mais benefícios, badge exclusivo e créditos diários no IMVU.',
    emoji: '👑',
    color: '#5b21b6',
    image: '/images/cover_all.png',
  },
  ap: {
    label: 'Access Pass (AP)',
    description: 'Desbloqueie o conteúdo adulto oficial do IMVU de forma segura e permanente.',
    emoji: '🔓',
    color: '#9d174d',
    image: '/images/cover_all.png',
  },
  rooms: {
    label: 'Rooms IMVU',
    description: 'Salas personalizadas e decorações para seu espaço virtual no IMVU.',
    emoji: '🏠',
    color: '#1e3a8a',
    image: '/images/cover_all.png',
  },
  nude: {
    label: 'Conteúdo Adulto',
    description: 'Skins e roupas adultas premium para usuários com AP ativo. Conteúdo discreto e seguro.',
    emoji: '🔞',
    color: '#85144b',
    image: '/images/cover_all.png',
  },
  combos: {
    label: 'Combos Especiais',
    description: 'Pacotes combinados com desconto especial. A forma mais econômica de aproveitar o IMVU.',
    emoji: '🎁',
    color: '#111827',
    image: '/images/cover_all.png',
  },
  service: {
    label: 'Serviço',
    description: 'Serviços especializados, decorações e personalizações para o seu avatar e conta IMVU.',
    emoji: '🔧',
    color: '#db2777',
    image: '/images/services_banner.jpg',
  },
};
