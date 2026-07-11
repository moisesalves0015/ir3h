// ============================================================
//  FAQ DATA — IR3H IMVU Store
// ============================================================

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

export const faqItems: FAQItem[] = [
  // PAGAMENTO
  {
    id: 1,
    question: 'Como funciona o pagamento?',
    answer:
      'Aceitamos pagamento via Pix. Após registrar seu pedido no site, você será redirecionado ao nosso WhatsApp onde confirmaremos os produtos e enviaremos a chave Pix para pagamento. Após a confirmação do pagamento, iniciamos a entrega.',
    category: 'Pagamento',
  },
  {
    id: 2,
    question: 'O site processa pagamentos automaticamente?',
    answer:
      'Não. O site funciona como plataforma de pedido e organização. O pagamento é realizado manualmente via Pix diretamente com nossa equipe pelo WhatsApp. Isso garante mais segurança e suporte em tempo real.',
    category: 'Pagamento',
  },
  {
    id: 3,
    question: 'O Pix é seguro?',
    answer:
      'Sim! O Pix é o método de pagamento mais seguro do Brasil. Você tem comprovante instantâneo da transação e pode verificar a identidade do recebedor antes de confirmar.',
    category: 'Pagamento',
  },
  // ENTREGA
  {
    id: 4,
    question: 'Quanto tempo leva para receber meus créditos?',
    answer:
      'A entrega de créditos geralmente ocorre em 5 a 20 minutos após a confirmação do pagamento. Em horários de pico pode levar até 30 minutos. Você será acompanhado em tempo real pelo WhatsApp.',
    category: 'Entrega',
  },
  {
    id: 5,
    question: 'Quais são os métodos de entrega?',
    answer:
      'Oferecemos entrega por Presente (Gift) — sem necessidade de senha, apenas o seu Nick — e por Transferência Direta. Para VIP e AP, utilizamos ativação por Login temporário com total segurança. Você escolhe no momento do pedido.',
    category: 'Entrega',
  },
  {
    id: 6,
    question: 'Vocês entregam fora do horário comercial?',
    answer:
      'Sim! Nosso atendimento funciona todos os dias, incluindo finais de semana e feriados. A disponibilidade pode variar, mas geralmente atendemos das 8h às 23h pelo WhatsApp.',
    category: 'Entrega',
  },
  // SEGURANÇA
  {
    id: 7,
    question: 'É seguro fornecer meu Nick do IMVU?',
    answer:
      'Sim! Seu Nick (Avatar Name) é uma informação pública no IMVU, necessária apenas para envio dos presentes ou transferências. Nunca pedimos sua senha para entregas por Gift ou Transfer.',
    category: 'Segurança',
  },
  {
    id: 8,
    question: 'E para ativação de VIP e AP — precisam da minha senha?',
    answer:
      'Para ativação de VIP e AP via sistema oficial, precisamos de acesso temporário à sua conta (e-mail e senha). Este acesso é usado apenas para a ativação e imediatamente descartado. Recomendamos fortemente alterar sua senha logo após a ativação.',
    category: 'Segurança',
  },
  {
    id: 9,
    question: 'Meus dados são protegidos?',
    answer:
      'Sim. Não armazenamos senhas de contas IMVU em nenhum sistema. As informações são usadas apenas durante o processo de ativação e descartadas em seguida. Seus dados pessoais de contato (nome e WhatsApp) são usados apenas para comunicação do pedido.',
    category: 'Segurança',
  },
  // CRÉDITOS
  {
    id: 10,
    question: 'Os créditos são originais?',
    answer:
      'Sim! Todos os créditos vendidos pela IR3H Store são 100% originais, adquiridos através de métodos oficiais autorizados pelo IMVU. Não trabalhamos com créditos hackeados ou ilegais.',
    category: 'Créditos',
  },
  {
    id: 11,
    question: 'Posso comprar créditos para outra pessoa?',
    answer:
      'Sim! Você pode comprar créditos como presente para qualquer nick do IMVU. Basta informar o nick do destinatário no pedido. Usamos o método Gift para presentes.',
    category: 'Créditos',
  },
  {
    id: 12,
    question: 'Existe limite de créditos que posso comprar?',
    answer:
      'Não temos limite fixo. Para compras acima de 200k créditos ou valores elevados, nosso atendimento via WhatsApp pode fazer uma verificação rápida antes de confirmar.',
    category: 'Créditos',
  },
  // VIP
  {
    id: 13,
    question: 'O VIP substitui o que já tenho na conta?',
    answer:
      'Depende. Se você já tem VIP ativo, o novo VIP pode se acumular ou substituir dependendo do nível. Nossa equipe vai verificar e orientar antes da ativação para garantir que você aproveite ao máximo.',
    category: 'VIP',
  },
  {
    id: 14,
    question: 'O VIP é renovado automaticamente?',
    answer:
      'Não. O VIP vendido pela IR3H é ativado manualmente por nossa equipe pelo período contratado. Não há renovação automática. Você precisa fazer um novo pedido quando quiser renovar.',
    category: 'VIP',
  },
  // AP
  {
    id: 15,
    question: 'O que é o Access Pass (AP)?',
    answer:
      'O Access Pass é o sistema de verificação de idade do IMVU que libera acesso ao conteúdo adulto da plataforma. Com AP, você pode acessar salas adultas, itens exclusivos e funcionalidades restritas. É permanente na conta após ativação.',
    category: 'AP',
  },
  {
    id: 16,
    question: 'O AP é permanente?',
    answer:
      'Sim! Uma vez ativado, o AP fica permanente na sua conta IMVU. Você paga uma única vez e mantém o acesso para sempre, mesmo que troque de VIP ou faça outras alterações na conta.',
    category: 'AP',
  },
  // GERAL
  {
    id: 17,
    question: 'O que faço se tiver algum problema?',
    answer:
      'Entre em contato imediatamente pelo nosso WhatsApp. Nossa equipe responde em tempo real e resolverá qualquer problema rapidamente. Garantimos suporte até a entrega ser concluída com sucesso.',
    category: 'Geral',
  },
  {
    id: 18,
    question: 'Vocês têm garantia?',
    answer:
      'Sim! Garantimos a entrega de todos os pedidos confirmados. Se houver qualquer problema na entrega após o pagamento confirmado, reenviaremos ou reembolsaremos integralmente via Pix.',
    category: 'Geral',
  },
];

export const faqCategories = [...new Set(faqItems.map(f => f.category))];
