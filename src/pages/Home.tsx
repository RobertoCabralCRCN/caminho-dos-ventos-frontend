import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="min-h-screen p-4">
      {/* Hero Section */}
      <div className="container mx-auto py-16">
        <div className="text-center mb-16">
          <h1 className="umbanda-title mb-6">
            Bem-vindos ao Caminho dos Ventos
          </h1>
          <p className="text-white/90 text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            ✨ "Caminho dos Ventos Ateliê — onde cada guia carrega energia, história e personalidade únicas."
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link to="/products" className="umbanda-button">
              🕯️ Ver Produtos
            </Link>
            <Link to="/create-order" className="umbanda-button-secondary">
              📿 Fazer Pedido
            </Link>
          </div>
          
          {/* Instagram Logo Section */}
          <div className="flex justify-center items-center mb-8">
            <a 
              href="https://www.instagram.com/caminho_dosventosatelie/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span className="font-semibold">@caminho_dosventosatelie</span>
            </a>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="umbanda-card p-8 text-center">
            <div className="text-6xl mb-4">🕯️</div>
            <h3 className="umbanda-subtitle mb-4">Velas Sagradas</h3>
            <p className="text-gray-600">
              Velas de todas as cores para seus trabalhos espirituais e oferendas
            </p>
          </div>
          
          <div className="umbanda-card p-8 text-center">
            <div className="text-6xl mb-4">📿</div>
            <h3 className="umbanda-subtitle mb-4">Guias & Brajás</h3>
            <p className="text-gray-600">
              Guias personalizadas e brajás artesanais para proteção e força espiritual
            </p>
          </div>
          
          <div className="umbanda-card p-8 text-center">
            <div className="text-6xl mb-4">🌿</div>
            <h3 className="umbanda-subtitle mb-4">Defumadores</h3>
            <p className="text-gray-600">
              Defumadores e ervas sagradas para limpeza e purificação energética
            </p>
          </div>
        </div>

        {/* About Section */}
        <div className="umbanda-card p-8 md:p-12 text-center">
          <h2 className="umbanda-subtitle mb-6">Sobre Nós</h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-4xl mx-auto">
            No Caminho dos Ventos, oferecemos produtos sagrados e abençoados para fortalecer sua conexão espiritual, 
            abrir caminhos de prosperidade e trazer proteção divina para sua vida. 🌟
          </p>
          <div className="mt-8 flex justify-center flex-wrap gap-4">
            <span className="text-2xl">⚡</span>
            <span className="text-2xl">🌬️</span>
            <span className="text-2xl">⚔️</span>
            <span className="text-2xl">🌊</span>
            <span className="text-2xl">🕯️</span>
            <span className="text-2xl">📿</span>
            <span className="text-2xl">🌿</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
