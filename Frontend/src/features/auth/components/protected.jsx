import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';    // ✅ pulls from the hook, not context directly

export default function Protected({ children }) {
  const { user, loading } = useAuth();

  // Wait for session check to finish before redirecting
  if (loading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}