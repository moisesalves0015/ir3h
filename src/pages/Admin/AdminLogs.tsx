import { useApp } from '../../contexts/AppContext';
import { Trash2, AlertCircle } from 'lucide-react';

export default function AdminLogs() {
  const { logs, clearLogs } = useApp();

  const handleClear = () => {
    if (confirm('Deseja realmente limpar todo o histórico de logs de auditoria do painel? Esta ação é irreversível.')) {
      clearLogs();
    }
  };

  return (
    <div className="admin-logs-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <h1 className="admin-page-title">Logs de Auditoria</h1>
        {logs.length > 0 && (
          <button className="admin-btn admin-btn--danger" onClick={handleClear}>
            <Trash2 size={18} style={{ marginRight: '6px' }} /> Limpar Logs
          </button>
        )}
      </div>
      <p className="admin-page-desc">Monitore todas as modificações, acessos e operações críticas de CMS efetuadas por administradores.</p>

      {logs.length === 0 ? (
        <div style={{ background: '#110b25', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
          <AlertCircle size={48} style={{ margin: '0 auto 16px auto', opacity: 0.3 }} />
          <p>Nenhum registro de auditoria disponível no momento.</p>
        </div>
      ) : (
        /* Logs Table */
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Data e Horário</th>
                <th>Responsável</th>
                <th>Operação (Ação)</th>
                <th>Descrição / Detalhes</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => {
                const date = new Date(log.timestamp);
                const dateTimeStr = date.toLocaleString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                });
                return (
                  <tr key={log.id}>
                    <td style={{ fontWeight: '700', whiteSpace: 'nowrap' }}>{dateTimeStr}</td>
                    <td style={{ fontWeight: '800', color: '#fff' }}>{log.user}</td>
                    <td>
                      <span className="admin-badge admin-badge--admin">{log.action}</span>
                    </td>
                    <td style={{ color: 'var(--text-secondary)' }}>{log.details}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
