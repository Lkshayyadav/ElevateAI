import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext(null);        // ✅ named export so useAuth.js can import it

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('prepai_session');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [loading, setLoading] = useState(true);       // ✅ added loading state

  return (
    // ✅ expose setUser + setLoading so useAuth.js hook can call them
    <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
}