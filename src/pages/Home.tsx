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
            🌟 Loja espiritual de guias e brajás. Produtos sagrados para fortalecer sua conexão espiritual e abrir caminhos de luz. 🌊⚔️
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products" className="umbanda-button">
              🕯️ Ver Produtos
            </Link>
            <Link to="/create-order" className="umbanda-button-secondary">
              📿 Fazer Pedido
            </Link>
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
