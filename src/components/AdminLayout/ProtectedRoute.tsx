import { Navigate } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';

export default function ProtectedRoute({ children }: { children: React.JSX.Element }) {
  const { currentUser } = useApp();

  if (!currentUser || currentUser.role !== 'admin') {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
