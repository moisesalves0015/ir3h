import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../AboutPage/AboutPage.css';
import { ChevronLeft } from 'lucide-react';

export default function PrivacyPage() {
  const navigate = useNavigate();
  useEffect(() => { document.title = 'Política de Privacidade — IR3H Store'; }, []);

  return (
    <div className="simple-page">
      <div className="simple-page__header">
        <button className="simple-page__back" onClick={() => navigate(-1)} aria-label="Voltar">
          <ChevronLeft size={20} />
        </button>
        <h1 className="simple-page__title">Política de Privacidade</h1>
      </div>

      <div className="simple-page__body">
        <p className="simple-page__text">
          <em>Última atualização: Julho de 2025</em>
        </p>

        {[
          {
            title: '1. Informações que coletamos',
            text: 'Coletamos apenas as informações necessárias para processar seu pedido: nome, número de WhatsApp e Nick do IMVU. Não coletamos dados de pagamento — o pagamento é realizado via Pix diretamente com nossa equipe.',
          },
          {
            title: '2. Como usamos suas informações',
            text: 'Suas informações são usadas exclusivamente para identificar e entregar seu pedido, e para comunicação sobre o status do mesmo via WhatsApp. Não compartilhamos seus dados com terceiros.',
          },
          {
            title: '3. Dados de Login (VIP/AP)',
            text: 'Quando necessário para ativação de VIP ou AP, solicitamos acesso temporário à sua conta IMVU. Essas credenciais são usadas apenas durante o processo de ativação e não são armazenadas em nenhum sistema após a conclusão.',
          },
          {
            title: '4. Armazenamento local',
            text: 'Utilizamos o localStorage do seu navegador para salvar seu carrinho, favoritos e histórico de pedidos. Esses dados ficam apenas no seu dispositivo e podem ser limpos a qualquer momento.',
          },
          {
            title: '5. Seus direitos',
            text: 'Você pode solicitar a exclusão de qualquer dado pessoal a qualquer momento entrando em contato via WhatsApp. Responderemos em até 48 horas.',
          },
          {
            title: '6. Contato',
            text: 'Para dúvidas sobre privacidade, entre em contato via WhatsApp: (27) 98800-3025.',
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
