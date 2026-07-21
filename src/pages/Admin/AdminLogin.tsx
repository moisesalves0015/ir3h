import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import { Gem, Lock, Mail, ShieldAlert } from 'lucide-react';
import './AdminLogin.css';

export default function AdminLogin() {
  const { login, currentUser } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect to admin panel
  if (currentUser && currentUser.role === 'admin') {
    navigate('/admin');
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const success = login(email, password);
      setLoading(false);
      if (success) {
        navigate('/admin');
      } else {
        setError('E-mail ou senha incorretos. Tente novamente.');
      }
    }, 800);
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-card__header">
          <div className="admin-login-card__logo">
            <Gem size={28} />
            <span>IR3H<strong>ADMIN</strong></span>
          </div>
          <p className="admin-login-card__subtitle">Acesso restrito para administradores</p>
        </div>

        {error && (
          <div className="admin-login-card__error">
            <ShieldAlert size={18} />
            <span>{error}</span>
          </div>
        )}

        <form className="admin-login-card__form" onSubmit={handleSubmit}>
          <div className="admin-login-field">
            <label htmlFor="email">E-mail Corporativo</label>
            <div className="admin-login-field__input-wrap">
              <Mail size={16} className="admin-login-field__icon" />
              <input
                id="email"
                type="email"
                placeholder="ex: admin@ir3h.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="admin-login-field">
            <label htmlFor="password">Senha de Segurança</label>
            <div className="admin-login-field__input-wrap">
              <Lock size={16} className="admin-login-field__icon" />
              <input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="admin-login-submit" disabled={loading}>
            {loading ? 'Autenticando...' : 'Acessar Painel'}
          </button>
        </form>

        <div className="admin-login-footer">
          <p>Dica: Use as credenciais padrão de desenvolvimento:</p>
          <code>admin@ir3h.com / admin123</code>
        </div>
      </div>
    </div>
  );
}
