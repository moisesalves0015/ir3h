import { useApp } from '../../contexts/AppContext';
import { Package, ListCollapse, Users, History, Sparkles, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const { products, showcases, users, logs } = useApp();
  const navigate = useNavigate();

  // Metrics
  const totalProducts = products.length;
  const activeProducts = products.filter(p => (p.stock ?? 0) > 0).length; // simple metric
  const totalShowcases = showcases.length;
  const totalUsers = users.length;

  const recentProducts = products.slice(0, 3);
  const recentLogs = logs.slice(0, 5);

  return (
    <div className="admin-dashboard">
      <h1 className="admin-page-title">Painel Geral</h1>
      <p className="admin-page-desc">Bem-vindo ao centro de administração da IR3H Store.</p>

      {/* Stats Grid */}
      <div className="admin-grid-stats">
        <div className="admin-stat-card">
          <div className="admin-stat-card__icon-wrap">
            <Package size={22} />
          </div>
          <div className="admin-stat-card__details">
            <span className="admin-stat-card__value">{totalProducts}</span>
            <span className="admin-stat-card__label">Total Produtos</span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-card__icon-wrap" style={{ color: '#10b981', background: 'rgba(16,185,129,0.1)' }}>
            <CheckCircle2 size={22} />
          </div>
          <div className="admin-stat-card__details">
            <span className="admin-stat-card__value">{activeProducts}</span>
            <span className="admin-stat-card__label">Em Estoque</span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-card__icon-wrap" style={{ color: '#ec4899', background: 'rgba(236,72,153,0.1)' }}>
            <ListCollapse size={22} />
          </div>
          <div className="admin-stat-card__details">
            <span className="admin-stat-card__value">{totalShowcases}</span>
            <span className="admin-stat-card__label">Vitrines Ativas</span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-card__icon-wrap" style={{ color: '#3b82f6', background: 'rgba(59,130,246,0.1)' }}>
            <Users size={22} />
          </div>
          <div className="admin-stat-card__details">
            <span className="admin-stat-card__value">{totalUsers}</span>
            <span className="admin-stat-card__label">Usuários</span>
          </div>
        </div>
      </div>

      {/* Main Sections */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '30px', marginTop: '40px' }}>
        {/* Left Side: Recent Products and Operations */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {/* Quick Shortcuts */}
          <div style={{ background: '#110b25', padding: '24px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '16px', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={18} className="text-yellow-400" /> Ações Rápidas
            </h3>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button className="admin-btn" onClick={() => navigate('/admin/produtos')}>Gerenciar Catálogo</button>
              <button className="admin-btn admin-btn--secondary" onClick={() => navigate('/admin/landing')}>Editar Landing Page</button>
              <button className="admin-btn admin-btn--secondary" onClick={() => navigate('/admin/configuracoes')}>Ajustes SEO</button>
            </div>
          </div>

          {/* Recent Products */}
          <div className="admin-table-container">
            <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#fff', margin: 0 }}>Produtos Adicionados Recentemente</h3>
              <button className="admin-btn admin-btn--secondary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => navigate('/admin/produtos')}>Ver todos</button>
            </div>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Categoria</th>
                  <th>Preço</th>
                  <th>Estoque</th>
                </tr>
              </thead>
              <tbody>
                {recentProducts.map(p => (
                  <tr key={p.id}>
                    <td style={{ fontWeight: '700', color: '#fff' }}>{p.title}</td>
                    <td><span className="admin-badge admin-badge--user">{p.category}</span></td>
                    <td style={{ color: 'var(--brand-primary-light)', fontWeight: '700' }}>R$ {p.price.toFixed(2)}</td>
                    <td>{p.stock ?? 0} un</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Logs / Audit */}
        <div style={{ background: '#110b25', padding: '24px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '16px', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <History size={18} /> Auditoria do Painel (Logs Recentes)
          </h3>
          {recentLogs.length === 0 ? (
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Nenhuma alteração registrada ainda.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {recentLogs.map((log) => {
                const date = new Date(log.timestamp);
                const timeStr = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                return (
                  <div key={log.id} style={{ display: 'flex', gap: '12px', fontSize: '13px', borderBottom: '1px solid rgba(255,255,255,0.02)', paddingBottom: '10px' }}>
                    <span style={{ color: 'var(--text-original)', fontWeight: '600' }}>{timeStr}</span>
                    <div style={{ flex: 1 }}>
                      <span style={{ color: '#fff', fontWeight: '700' }}>{log.user}</span>: <span style={{ color: 'var(--brand-primary-light)', fontWeight: '600' }}>{log.action}</span> - {log.details}
                    </div>
                  </div>
                );
              })}
              <button className="admin-btn admin-btn--secondary" style={{ width: '100%', marginTop: '10px' }} onClick={() => navigate('/admin/logs')}>
                Ver Histórico Completo
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
