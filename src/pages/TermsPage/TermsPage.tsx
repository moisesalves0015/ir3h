import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../AboutPage/AboutPage.css';
import { ChevronLeft } from 'lucide-react';

export default function TermsPage() {
  const navigate = useNavigate();
  useEffect(() => { document.title = 'Termos de Uso — IR3H Store'; }, []);

  return (
    <div className="simple-page">
      <div className="simple-page__header">
        <button className="simple-page__back" onClick={() => navigate(-1)} aria-label="Voltar">
          <ChevronLeft size={20} />
        </button>
        <h1 className="simple-page__title">Termos de Uso</h1>
      </div>

      <div className="simple-page__body">
        <p className="simple-page__text">
          <em>Última atualização: Julho de 2025</em>
        </p>

        {[
          {
            title: '1. Sobre o serviço',
            text: 'A IR3H Store é uma plataforma de venda de produtos digitais relacionados ao IMVU. Não realizamos pagamentos automáticos — todo pagamento é via Pix manual confirmado pelo WhatsApp.',
          },
          {
            title: '2. Produtos digitais',
            text: 'Todos os nossos produtos são digitais (créditos, VIP, AP). Não há entrega física, frete ou estoque físico. A entrega é realizada digitalmente após confirmação do pagamento.',
          },
          {
            title: '3. Garantia',
            text: 'Garantimos a entrega de todos os pedidos pagos e confirmados. Em caso de problema na entrega, realizamos nova tentativa ou reembolso integral via Pix.',
          },
          {
            title: '4. Responsabilidade do cliente',
            text: 'O cliente é responsável por fornecer informações corretas (nick, e-mail) para entrega. A IR3H não se responsabiliza por entregas feitas para o nick/conta errado por informação incorreta do cliente.',
          },
          {
            title: '5. Uso adequado',
            text: 'Ao utilizar nossos serviços, o cliente declara ser maior de 18 anos para produtos adultos (AP, Nude) e que tem direito de usar a conta IMVU informada.',
          },
          {
            title: '6. Alterações',
            text: 'A IR3H reserva-se o direito de alterar preços, produtos e condições a qualquer momento. Pedidos já confirmados não são afetados por alterações posteriores.',
          },
          {
            title: '7. Contato',
            text: 'Dúvidas sobre os termos: WhatsApp (27) 98800-3025.',
          },
        ].map((section, i) => (
          <div key={i} className="policy-section">
            <h3>{section.title}</h3>
            <p>{section.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
