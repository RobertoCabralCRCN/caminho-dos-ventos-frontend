import React, { useState } from 'react';
import StockIndicator from "../components/Stock/StockIndicator";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  emoji: string;
  inStock: boolean;
  currentStock: number;
  minimumStock: number;
  maximumStock: number;
  unitCost: number;
}

function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Vela Branca",
      description: "Vela branca para trabalhos de luz e purificação",
      price: 5.0,
      category: "velas",
      emoji: "🕯️",
      inStock: true,
      currentStock: 45,
      minimumStock: 20,
      maximumStock: 100,
      unitCost: 3.50,
    },
    {
      id: 2,
      name: "Guia Amarela",
      description: "Guia amarela com detalhes dourados para prosperidade",
      price: 35.0,
      category: "guias",
      emoji: "📿",
      inStock: true,
      currentStock: 8,
      minimumStock: 15,
      maximumStock: 50,
      unitCost: 25.00,
    },
    {
      id: 3,
      name: "Brajá de Proteção",
      description: "Brajá vermelha e azul para força e proteção",
      price: 40.0,
      category: "brajas",
      emoji: "🌟",
      inStock: false,
      currentStock: 0,
      minimumStock: 10,
      maximumStock: 30,
      unitCost: 35.00,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    category: 'velas',
    emoji: '🕯️',
    inStock: true,
    currentStock: 0,
    minimumStock: 0,
    maximumStock: 100,
    unitCost: 0,
  });

  const categories = [
    { id: 'velas', name: 'Velas', emoji: '🕯️' },
    { id: 'guias', name: 'Guias', emoji: '📿' },
    { id: 'brajas', name: 'Brajás', emoji: '🌟' },
    { id: 'defumadores', name: 'Defumadores', emoji: '🌿' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingProduct) {
      // Editar produto existente
      setProducts(products.map(p => 
        p.id === editingProduct.id 
          ? { ...formData, id: editingProduct.id }
          : p
      ));
    } else {
      // Adicionar novo produto
      const newProduct: Product = {
        ...formData,
        id: Math.max(...products.map(p => p.id)) + 1,
      };
      setProducts([...products, newProduct]);
    }
    
    setShowForm(false);
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      price: 0,
      category: 'velas',
      emoji: '🕯️',
      inStock: true,
      currentStock: 0,
      minimumStock: 0,
      maximumStock: 100,
      unitCost: 0,
    });
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      emoji: product.emoji,
      inStock: product.inStock,
      currentStock: product.currentStock,
      minimumStock: product.minimumStock,
      maximumStock: product.maximumStock,
      unitCost: product.unitCost,
    });
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="umbanda-title text-3xl">
            🛍️ Gerenciar Produtos
          </h1>
          <button
            onClick={() => setShowForm(true)}
            className="umbanda-button"
          >
            ➕ Adicionar Produto
          </button>
        </div>

        {/* Formulário de Produto */}
        {showForm && (
          <div className="umbanda-card p-8 mb-8">
            <h2 className="umbanda-subtitle mb-6">
              {editingProduct ? '✏️ Editar Produto' : '➕ Novo Produto'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome do Produto
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ogum-blue focus:border-transparent"
                    placeholder="Ex: Vela Amarela"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preço (R$)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ogum-blue focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoria
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ogum-blue focus:border-transparent"
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.emoji} {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Emoji
                  </label>
                  <input
                    type="text"
                    value={formData.emoji}
                    onChange={(e) => setFormData({...formData, emoji: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ogum-blue focus:border-transparent"
                    placeholder="🕯️"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ogum-blue focus:border-transparent"
                  placeholder="Descrição do produto..."
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estoque Atual
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.currentStock}
                    onChange={(e) => setFormData({...formData, currentStock: parseInt(e.target.value) || 0})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ogum-blue focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estoque Mínimo
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.minimumStock}
                    onChange={(e) => setFormData({...formData, minimumStock: parseInt(e.target.value) || 0})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ogum-blue focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estoque Máximo
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.maximumStock}
                    onChange={(e) => setFormData({...formData, maximumStock: parseInt(e.target.value) || 0})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ogum-blue focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Custo Unitário (R$)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.unitCost}
                    onChange={(e) => setFormData({...formData, unitCost: parseFloat(e.target.value) || 0})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ogum-blue focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="inStock"
                  checked={formData.inStock}
                  onChange={(e) => setFormData({...formData, inStock: e.target.checked})}
                  className="mr-2"
                />
                <label htmlFor="inStock" className="text-sm font-medium text-gray-700">
                  Produto disponível
                </label>
              </div>
              
              <div className="flex gap-4">
                <button type="submit" className="umbanda-button">
                  {editingProduct ? '💾 Salvar Alterações' : '➕ Adicionar Produto'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingProduct(null);
                    setFormData({
                      name: '',
                      description: '',
                      price: 0,
                      category: 'velas',
                      emoji: '🕯️',
                      inStock: true,
                      currentStock: 0,
                      minimumStock: 0,
                      maximumStock: 100,
                      unitCost: 0,
                    });
                  }}
                  className="bg-gray-500 text-white px-6 py-3 rounded-full hover:bg-gray-600 transition-colors"
                >
                  ❌ Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Lista de Produtos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="umbanda-card p-6">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">{product.emoji}</div>
                <h3 className="umbanda-subtitle text-lg">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                <p className="text-2xl font-bold text-ogum-blue mb-2">
                  R$ {product.price.toFixed(2)}
                </p>
                
                {/* Indicador de Estoque */}
                <div className="mb-3">
                  <StockIndicator
                    currentStock={product.currentStock}
                    minimumStock={product.minimumStock}
                    maximumStock={product.maximumStock}
                    showDetails={true}
                    size="sm"
                  />
                </div>
                
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  product.inStock 
                    ? "bg-green-100 text-green-800" 
                    : "bg-red-100 text-red-800"
                }`}>
                  {product.inStock ? "Disponível" : "Indisponível"}
                </span>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="flex-1 bg-ogum-blue text-white py-2 px-4 rounded-lg hover:bg-ogum-blue-light transition-colors text-sm"
                >
                  ✏️ Editar
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="flex-1 bg-ogum-red text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors text-sm"
                >
                  🗑️ Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminProductsPage;
