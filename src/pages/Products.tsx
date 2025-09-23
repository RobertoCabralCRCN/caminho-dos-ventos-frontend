import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  emoji: string;
  inStock: boolean;
}

function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Vela Branca",
      description: "Vela branca para trabalhos de luz e purificação",
      price: 5.0,
      category: "velas",
      emoji: "🕯️",
      inStock: true,
    },
    {
      id: 2,
      name: "Vela Azul",
      description: "Vela azul para trabalhos de Oxalá e paz",
      price: 5.0,
      category: "velas",
      emoji: "🕯️",
      inStock: true,
    },
    {
      id: 3,
      name: "Vela Vermelha",
      description: "Vela vermelha para trabalhos de força e proteção",
      price: 5.0,
      category: "velas",
      emoji: "🕯️",
      inStock: true,
    },
    {
      id: 4,
      name: "Guia de Contas",
      description: "Guia personalizada com contas de proteção",
      price: 25.0,
      category: "guias",
      emoji: "📿",
      inStock: true,
    },
    {
      id: 5,
      name: "Brajá de Oxum",
      description: "Brajá dourada para trabalhos de Oxum",
      price: 35.0,
      category: "brajas",
      emoji: "🌟",
      inStock: true,
    },
    {
      id: 6,
      name: "Defumador",
      description: "Defumador de ervas sagradas para limpeza",
      price: 12.5,
      category: "defumadores",
      emoji: "🌿",
      inStock: true,
    },
    {
      id: 7,
      name: "Guia de Iemanjá",
      description: "Guia azul e branca para trabalhos de Iemanjá",
      price: 30.0,
      category: "guias",
      emoji: "📿",
      inStock: true,
    },
    {
      id: 8,
      name: "Vela Verde",
      description: "Vela verde para trabalhos de Oxóssi e prosperidade",
      price: 5.0,
      category: "velas",
      emoji: "🕯️",
      inStock: true,
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", name: "Todos", emoji: "🌟" },
    { id: "velas", name: "Velas", emoji: "🕯️" },
    { id: "guias", name: "Guias", emoji: "📿" },
    { id: "brajas", name: "Brajás", emoji: "🌟" },
    { id: "defumadores", name: "Defumadores", emoji: "🌿" },
  ];

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="min-h-screen p-4">
      <div className="container mx-auto py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="umbanda-title mb-4">
            Nossos Produtos Sagrados
          </h1>
          <p className="text-white/90 text-xl">
            🌟 Produtos abençoados para sua jornada espiritual 🌟
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? "umbanda-button"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              <span className="mr-2">{category.emoji}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredProducts.map((product) => (
            <div key={product.id} className="umbanda-card p-6 hover:scale-105 transition-transform duration-300">
              <div className="text-center">
                <div className="text-6xl mb-4">{product.emoji}</div>
                <h3 className="umbanda-subtitle text-xl mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-umbanda-purple">
                    R$ {product.price.toFixed(2)}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    product.inStock 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }`}>
                    {product.inStock ? "Disponível" : "Indisponível"}
                  </span>
                </div>
                <Link 
                  to="/create-order" 
                  className="umbanda-button w-full text-center block"
                >
                  📿 Fazer Pedido
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="umbanda-card p-8 text-center">
          <h2 className="umbanda-subtitle mb-4">Pronto para fazer seu pedido?</h2>
          <p className="text-gray-600 mb-6">
            Todos os nossos produtos são abençoados e preparados com muito amor e respeito às tradições sagradas.
          </p>
          <Link to="/create-order" className="umbanda-button-secondary">
            🌟 Fazer Pedido Agora
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
