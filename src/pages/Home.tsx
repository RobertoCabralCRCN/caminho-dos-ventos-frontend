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
            🌟 Ateliê especializado em guias e brajás artesanais, onde cada peça é única e carregada de energia espiritual. Conecte-se conosco no Instagram e descubra nossa arte! ✨
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

        {/* Instagram Gallery Section */}
        <div className="umbanda-card p-8 md:p-12 mb-16">
          <h2 className="umbanda-subtitle mb-8 text-center">Nossas Guias Artesanais</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="aspect-square bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center text-white text-4xl">
              📿
            </div>
            <div className="aspect-square bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center text-white text-4xl">
              🔮
            </div>
            <div className="aspect-square bg-gradient-to-br from-green-400 to-teal-500 rounded-lg flex items-center justify-center text-white text-4xl">
              🌿
            </div>
            <div className="aspect-square bg-gradient-to-br from-red-400 to-pink-500 rounded-lg flex items-center justify-center text-white text-4xl">
              ⚡
            </div>
          </div>
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Cada guia é feita com amor e dedicação, seguindo tradições ancestrais
            </p>
            <a 
              href="https://www.instagram.com/caminho_dosventosatelie/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span className="font-semibold">Veja Mais no Instagram</span>
            </a>
          </div>
        </div>

        {/* About Section */}
        <div className="umbanda-card p-8 md:p-12 text-center">
          <h2 className="umbanda-subtitle mb-6">Sobre o Caminho dos Ventos Ateliê</h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-4xl mx-auto mb-6">
            Somos um ateliê especializado na criação de guias e brajás artesanais, onde cada peça é única e carregada de energia espiritual. 
            Nossa arte combina tradições ancestrais com técnicas modernas, criando peças que conectam você ao sagrado.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed max-w-4xl mx-auto mb-8">
            Siga-nos no Instagram <a href="https://www.instagram.com/caminho_dosventosatelie/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 font-semibold">@caminho_dosventosatelie</a> para acompanhar nosso processo criativo, 
            ver as peças em produção e conhecer as histórias por trás de cada guia. 🌟
          </p>
          <div className="mt-8 flex justify-center flex-wrap gap-4">
            <span className="text-2xl">⚡</span>
            <span className="text-2xl">🌬️</span>
            <span className="text-2xl">⚔️</span>
            <span className="text-2xl">🌊</span>
            <span className="text-2xl">🕯️</span>
            <span className="text-2xl">📿</span>
            <span className="text-2xl">🌿</span>
            <span className="text-2xl">🔮</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
