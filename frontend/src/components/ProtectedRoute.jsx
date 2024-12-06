import React from 'react'
import useAuth from '../../hooks/useAuth';
import {Navigate} from "react-router-dom";

const ProtectedRoute = ({children}) => {
  const {isAuthenticated, loading} = useAuth();

  if (loading) {
    return <div>Loading...</div>
  }
  return isAuthenticated ? children : <Navigate to="/signin" />
}

export default ProtectedRoute;