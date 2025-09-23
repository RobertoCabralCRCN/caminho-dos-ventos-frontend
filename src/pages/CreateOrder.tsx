import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { orderService } from "../services/api";
import { useAuth } from "../contexts/AuthContext";

interface Product {
  id: number;
  name: string;
  price: number;
  emoji: string;
  category: string;
}

function CreateOrderPage() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  // Verificar se o usuário está autenticado
  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    }
  }, [user, isLoading, navigate]);

  const [products] = useState<Product[]>([
    { id: 1, name: "Vela Branca", price: 5.0, emoji: "🕯️", category: "velas" },
    { id: 2, name: "Vela Azul", price: 5.0, emoji: "🕯️", category: "velas" },
    { id: 3, name: "Vela Vermelha", price: 5.0, emoji: "🕯️", category: "velas" },
    { id: 4, name: "Vela Verde", price: 5.0, emoji: "🕯️", category: "velas" },
    { id: 5, name: "Guia de Contas", price: 25.0, emoji: "📿", category: "guias" },
    { id: 6, name: "Guia de Iemanjá", price: 30.0, emoji: "📿", category: "guias" },
    { id: 7, name: "Brajá de Oxum", price: 35.0, emoji: "🌟", category: "brajas" },
    { id: 8, name: "Defumador", price: 12.5, emoji: "🌿", category: "defumadores" },
  ]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [orderItems, setOrderItems] = useState<
    Array<{ product: Product; quantity: number }>
  >([]);
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const [deliveryFee, setDeliveryFee] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleAddProduct = () => {
    if (selectedProduct && quantity > 0) {
      setOrderItems([...orderItems, { product: selectedProduct, quantity }]);
      setSelectedProduct(null);
      setQuantity(1);
    }
  };

  const removeProduct = (index: number) => {
    setOrderItems(orderItems.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    const subtotal = orderItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    return subtotal + deliveryFee;
  };

  const handlePlaceOrder = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Verificar se o usuário está autenticado
    if (!user) {
      setError("Você precisa estar logado para fazer um pedido.");
      setLoading(false);
      navigate("/login");
      return;
    }

    if (orderItems.length === 0) {
      setError("Adicione pelo menos um produto ao pedido.");
      setLoading(false);
      return;
    }

    if (
      !address.street ||
      !address.city ||
      !address.state ||
      !address.zipCode
    ) {
      setError("Preencha todos os campos do endereço de entrega.");
      setLoading(false);
      return;
    }

    const orderData = {
      items: orderItems.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      })),
      deliveryAddress: `${address.street}, ${address.city}, ${address.state}, ${address.zipCode}`,
      deliveryFee,
      total: calculateTotal(),
      status: "aguardando produção",
    };

    try {
      await orderService.createOrder(orderData);
      setSuccess("🌟 Pedido realizado com sucesso! Que os orixás abençoem sua compra! 🌟");
      setOrderItems([]);
      setAddress({ street: "", city: "", state: "", zipCode: "" });
      setDeliveryFee(0);
    } catch (err) {
      setError("Erro ao realizar o pedido. Tente novamente.");
      console.error("Create order error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Mostrar loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="min-h-screen p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <h2 className="umbanda-title text-2xl">Verificando autenticação...</h2>
        </div>
      </div>
    );
  }

  // Se não estiver autenticado, não renderizar nada (será redirecionado)
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen p-4">
      <div className="container mx-auto py-8">
        <div className="text-center mb-12">
          <h1 className="umbanda-title mb-4">
            Fazer Pedido Sagrado
          </h1>
          <p className="text-white/90 text-xl">
            🌟 Selecione os produtos abençoados para sua jornada espiritual 🌟
          </p>
          <p className="text-white/70 text-sm mt-2">
            Logado como: {user.nome}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <form onSubmit={handlePlaceOrder}>
            {/* Product Selection */}
            <div className="umbanda-card p-8 mb-8">
              <h2 className="umbanda-subtitle mb-6 text-center">
                🕯️ Selecionar Produtos
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Produto Sagrado
                  </label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-umbanda-purple focus:border-transparent"
                    value={selectedProduct?.id || ""}
                    onChange={(e) => {
                      const product = products.find(
                        (p) => p.id === parseInt(e.target.value)
                      );
                      setSelectedProduct(product || null);
                    }}
                  >
                    <option value="" disabled>
                      Escolha um produto sagrado
                    </option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.emoji} {product.name} - R$ {product.price.toFixed(2)}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantidade
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-umbanda-purple focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="text-center mt-6">
                <button
                  type="button"
                  onClick={handleAddProduct}
                  className="umbanda-button"
                  disabled={!selectedProduct}
                >
                  📿 Adicionar ao Pedido
                </button>
              </div>
            </div>

            {/* Order Summary */}
            {orderItems.length > 0 && (
              <div className="umbanda-card p-8 mb-8">
                <h2 className="umbanda-subtitle mb-6 text-center">
                  📿 Itens do Pedido
                </h2>
                
                <div className="space-y-4">
                  {orderItems.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <span className="text-2xl">{item.product.emoji}</span>
                        <div>
                          <h3 className="font-semibold text-gray-900">{item.product.name}</h3>
                          <p className="text-sm text-gray-600">Quantidade: {item.quantity}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-lg font-bold text-umbanda-purple">
                          R$ {(item.product.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeProduct(index)}
                          className="text-red-500 hover:text-red-700 font-bold"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span>Subtotal:</span>
                      <span className="text-umbanda-purple">
                        R$ {orderItems
                          .reduce((sum, item) => sum + item.product.price * item.quantity, 0)
                          .toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Delivery Address */}
            <div className="umbanda-card p-8 mb-8">
              <h2 className="umbanda-subtitle mb-6 text-center">
                🏠 Endereço de Entrega
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rua/Avenida
                  </label>
                  <input
                    type="text"
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-umbanda-purple focus:border-transparent"
                    placeholder="Digite sua rua"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cidade
                  </label>
                  <input
                    type="text"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-umbanda-purple focus:border-transparent"
                    placeholder="Digite sua cidade"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estado
                  </label>
                  <input
                    type="text"
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-umbanda-purple focus:border-transparent"
                    placeholder="Digite seu estado"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CEP
                  </label>
                  <input
                    type="text"
                    value={address.zipCode}
                    onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-umbanda-purple focus:border-transparent"
                    placeholder="Digite seu CEP"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Fee */}
            <div className="umbanda-card p-8 mb-8">
              <h2 className="umbanda-subtitle mb-6 text-center">
                🚚 Taxa de Entrega
              </h2>
              
              <div className="max-w-md mx-auto">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Taxa de Entrega (R$)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={deliveryFee}
                  onChange={(e) => setDeliveryFee(parseFloat(e.target.value) || 0)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-umbanda-purple focus:border-transparent"
                />
              </div>
            </div>

            {/* Total */}
            <div className="umbanda-card p-8 mb-8 text-center">
              <h2 className="umbanda-subtitle mb-4">💰 Total do Pedido</h2>
              <div className="text-4xl font-bold text-umbanda-purple">
                R$ {calculateTotal().toFixed(2)}
              </div>
            </div>

            {/* Messages */}
            {error && (
              <div className="umbanda-card p-6 mb-6 bg-red-50 border border-red-200">
                <p className="text-red-600 text-center">{error}</p>
              </div>
            )}
            
            {success && (
              <div className="umbanda-card p-6 mb-6 bg-green-50 border border-green-200">
                <p className="text-green-600 text-center">{success}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="umbanda-button-secondary text-xl px-12 py-4"
                disabled={loading || orderItems.length === 0}
              >
                {loading ? "🌟 Processando..." : "🌟 Finalizar Pedido Sagrado"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateOrderPage;