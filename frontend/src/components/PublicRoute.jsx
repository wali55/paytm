import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const PublicRoute = ({children}) => {
  const {isAuthenticated, loading} = useAuth();

  if (loading) {
    return <div>Loading...</div>
  }
  return isAuthenticated ? <Navigate to="/dashboard" /> : children;
}

export default PublicRoute