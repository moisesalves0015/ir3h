import { useApp } from '../../contexts/AppContext';
import { ShieldCheck, UserX, UserCheck, AlertOctagon } from 'lucide-react';
import type { User } from '../../contexts/AppContext';

export default function AdminUsers() {
  const { users, updateUserRole, updateUserStatus, currentUser } = useApp();

  const handlePromote = (user: User) => {
    const newRole = user.role === 'admin' ? 'user' : 'admin';
    const actionText = newRole === 'admin' ? 'promover a Administrador' : 'rebaixar a Usuário Comum';
    if (confirm(`Deseja realmente ${actionText} o usuário "${user.name}"?`)) {
      updateUserRole(user.id, newRole);
    }
  };

  const handleToggleStatus = (user: User, newStatus: User['status']) => {
    if (confirm(`Deseja alterar o status de "${user.name}" para ${newStatus.toUpperCase()}?`)) {
      updateUserStatus(user.id, newStatus);
    }
  };

  return (
    <div className="admin-users-page">
      <h1 className="admin-page-title">Gerenciamento de Usuários</h1>
      <p className="admin-page-desc">Visualize os usuários cadastrados e controle suas permissões e status de acesso ao sistema.</p>

      {/* Users Table */}
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Whatsapp</th>
              <th>Cargo</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => {
              const isSelf = currentUser?.id === u.id;
              return (
                <tr key={u.id}>
                  <td style={{ fontWeight: '700' }}>#{u.id}</td>
                  <td style={{ fontWeight: '800', color: '#fff' }}>
                    {u.name} {isSelf && <span style={{ fontSize: '10px', color: 'var(--brand-accent)', marginLeft: '6px' }}>(Você)</span>}
                  </td>
                  <td>{u.email}</td>
                  <td>{u.whatsapp || '-'}</td>
                  <td>
                    <span className={`admin-badge ${u.role === 'admin' ? 'admin-badge--admin' : 'admin-badge--user'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td>
                    <span className={`admin-badge ${u.status === 'active' ? 'admin-badge--active' : u.status === 'blocked' ? 'admin-badge--inactive' : 'admin-badge--suspended'}`}>
                      {u.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    {!isSelf ? (
                      <div style={{ display: 'inline-flex', gap: '8px' }}>
                        {/* Toggle Role */}
                        <button
                          className="admin-btn admin-btn--secondary"
                          style={{ padding: '6px 12px', fontSize: '12px' }}
                          title="Alternar Cargo"
                          onClick={() => handlePromote(u)}
                        >
                          <ShieldCheck size={14} style={{ marginRight: '4px' }} />
                          {u.role === 'admin' ? 'Rebaixar' : 'Promover'}
                        </button>

                        {/* Change Status */}
                        {u.status === 'active' ? (
                          <>
                            <button
                              className="admin-btn admin-btn--secondary"
                              style={{ padding: '6px', color: '#f59e0b' }}
                              title="Suspender Conta"
                              onClick={() => handleToggleStatus(u, 'suspended')}
                            >
                              <AlertOctagon size={16} />
                            </button>
                            <button
                              className="admin-btn admin-btn--danger"
                              style={{ padding: '6px' }}
                              title="Bloquear Conta"
                              onClick={() => handleToggleStatus(u, 'blocked')}
                            >
                              <UserX size={16} />
                            </button>
                          </>
                        ) : (
                          <button
                            className="admin-btn admin-btn--secondary"
                            style={{ padding: '6px 12px', fontSize: '12px', color: '#10b981' }}
                            title="Reativar Conta"
                            onClick={() => handleToggleStatus(u, 'active')}
                          >
                            <UserCheck size={14} style={{ marginRight: '4px' }} /> Ativar
                          </button>
                        )}
                      </div>
                    ) : (
                      <span style={{ fontSize: '12px', color: 'var(--text-original)', fontStyle: 'italic' }}>Sem ações</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
