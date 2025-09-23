import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '../services/api';
import { jwtDecode } from 'jwt-decode';

interface User {
  id: string;
  nome: string;
  email: string;
  role: 'client' | 'admin' | 'super_admin';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar se há token salvo no localStorage
    const savedToken = localStorage.getItem('accessToken');
    if (savedToken) {
      try {
        setToken(savedToken);
        // Decodificar o token JWT para obter dados do usuário
        const decoded: any = jwtDecode(savedToken);
        setUser({
          id: decoded.sub || decoded.id,
          nome: decoded.nome || decoded.username,
          email: decoded.email || decoded.username,
          role: decoded.role || 'client',
        });
      } catch (error) {
        // Se o token for inválido, remover do localStorage
        localStorage.removeItem('accessToken');
        setToken(null);
        setUser(null);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, senha: string) => {
    try {
      // Tentar login com o backend real
      const response = await authService.login({ email, senha });
      const token = response.data.access_token;
      
      // Salvar token no localStorage
      localStorage.setItem('accessToken', token);
      setToken(token);
      
      // Decodificar o token para obter dados do usuário
      const decoded: any = jwtDecode(token);
      setUser({
        id: decoded.sub || decoded.id,
        nome: decoded.nome || decoded.username,
        email: decoded.email || decoded.username,
        role: decoded.role || 'client',
      });
    } catch (error: any) {
      // Se o backend não estiver rodando ou com problemas, usar modo demonstração
      if (error && (
        error.message?.includes('Network Error') || 
        error.message?.includes('ERR_NETWORK') ||
        error.response?.status === 500 ||
        error.response?.status === 404
      )) {
        // Credenciais de demonstração
        if (email === 'admin@caminho.com' && senha === 'admin123') {
          const demoToken = 'demo-super-admin-token';
          localStorage.setItem('accessToken', demoToken);
          setToken(demoToken);
          setUser({
            id: 'demo-1',
            nome: 'Super Admin Demo',
            email: 'admin@caminho.com',
            role: 'super_admin',
          });
          return;
        }
        
        if (email === 'gerente@caminho.com' && senha === 'gerente123') {
          const demoToken = 'demo-admin-token';
          localStorage.setItem('accessToken', demoToken);
          setToken(demoToken);
          setUser({
            id: 'demo-2',
            nome: 'Gerente Demo',
            email: 'gerente@caminho.com',
            role: 'admin',
          });
          return;
        }
        
        if (email === 'cliente@caminho.com' && senha === 'cliente123') {
          const demoToken = 'demo-client-token';
          localStorage.setItem('accessToken', demoToken);
          setToken(demoToken);
          setUser({
            id: 'demo-3',
            nome: 'Cliente Demo',
            email: 'cliente@caminho.com',
            role: 'client',
          });
          return;
        }
      }
      
      // Se não for erro de rede, re-lançar o erro original
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('accessToken');
  };

  const isAdmin = user?.role === 'admin' || user?.role === 'super_admin';
  const isSuperAdmin = user?.role === 'super_admin';

  const value: AuthContextType = {
    user,
    token,
    login,
    logout,
    isAdmin,
    isSuperAdmin,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
