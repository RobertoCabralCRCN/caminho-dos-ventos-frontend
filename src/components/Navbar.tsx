import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Navbar() {
  const { user, logout, isAdmin, isSuperAdmin } = useAuth();
  const [showAdminMenu, setShowAdminMenu] = useState(false);

  return (
    <nav className="bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="text-3xl">🌬️</div>
            <Link to="/" className="umbanda-title text-2xl md:text-3xl">
              Caminho dos Ventos
            </Link>
          </div>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/products" 
              className="text-white/90 hover:text-white font-medium transition-colors duration-300 flex items-center space-x-2"
            >
              <span>🕯️</span>
              <span>Produtos</span>
            </Link>
            <Link 
              to="/create-order" 
              className="text-white/90 hover:text-white font-medium transition-colors duration-300 flex items-center space-x-2"
            >
              <span>📿</span>
              <span>Fazer Pedido</span>
            </Link>
            <Link 
              to="/track-orders" 
              className="text-white/90 hover:text-white font-medium transition-colors duration-300 flex items-center space-x-2"
            >
              <span>🔍</span>
              <span>Acompanhar</span>
            </Link>
            
            {/* Admin Menu */}
            {isAdmin && (
              <div className="relative">
                <button
                  onClick={() => setShowAdminMenu(!showAdminMenu)}
                  className="text-white/90 hover:text-white font-medium transition-colors duration-300 flex items-center space-x-2"
                >
                  <span>⚡</span>
                  <span>Admin</span>
                  <span className="text-sm">▼</span>
                </button>
                
                {showAdminMenu && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                    <Link
                      to="/admin"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setShowAdminMenu(false)}
                    >
                      📊 Dashboard
                    </Link>
                    <Link
                      to="/admin/orders"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setShowAdminMenu(false)}
                    >
                      📦 Pedidos
                    </Link>
                    {isSuperAdmin && (
                      <Link
                        to="/admin/products"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setShowAdminMenu(false)}
                      >
                        🛍️ Produtos
                      </Link>
                    )}
                    <Link
                      to="/admin/stock"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setShowAdminMenu(false)}
                    >
                      📊 Estoque
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Auth Links */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-white/90 text-sm">
                  Olá, {user.nome}
                </span>
                <button
                  onClick={logout}
                  className="text-white/90 hover:text-white font-medium transition-colors duration-300"
                >
                  Sair
                </button>
              </div>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-white/90 hover:text-white font-medium transition-colors duration-300"
                >
                  Entrar
                </Link>
                <Link 
                  to="/register" 
                  className="umbanda-button text-sm py-2 px-4"
                >
                  Cadastrar
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
