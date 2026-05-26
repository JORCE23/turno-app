import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('turno_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (username, password) => {
    if (
      (username === 'admin' && password === 'admin123') || 
      (username === 'cliente' && password === 'cliente123') ||
      (username === 'losalamos' && password === 'pizza2026')
    ) {
      const userData = { username, role: username === 'admin' ? 'admin' : 'client' };
      setUser(userData);
      localStorage.setItem('turno_user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('turno_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
