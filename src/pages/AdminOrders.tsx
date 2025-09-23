import React, { useState } from 'react';

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  items: Array<{
    productName: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: 'aguardando produção' | 'em produção' | 'pronto para entrega' | 'entregue' | 'cancelado';
  deliveryAddress: string;
  createdAt: string;
  responsible?: string;
}

function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: '1',
      customerName: 'Maria Silva',
      customerEmail: 'maria@email.com',
      items: [
        { productName: 'Vela Branca', quantity: 3, price: 5.0 },
        { productName: 'Guia de Iansã', quantity: 1, price: 35.0 }
      ],
      total: 50.0,
      status: 'aguardando produção',
      deliveryAddress: 'Rua das Flores, 123, São Paulo, SP',
      createdAt: '2024-01-15',
      responsible: 'João'
    },
    {
      id: '2',
      customerName: 'Pedro Santos',
      customerEmail: 'pedro@email.com',
      items: [
        { productName: 'Brajá de Ogum', quantity: 1, price: 40.0 }
      ],
      total: 40.0,
      status: 'em produção',
      deliveryAddress: 'Av. Principal, 456, Rio de Janeiro, RJ',
      createdAt: '2024-01-14',
      responsible: 'Ana'
    }
  ]);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showResponsibleModal, setShowResponsibleModal] = useState(false);

  const statusOptions = [
    { value: 'aguardando produção', label: 'Aguardando Produção', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'em produção', label: 'Em Produção', color: 'bg-blue-100 text-blue-800' },
    { value: 'pronto para entrega', label: 'Pronto para Entrega', color: 'bg-green-100 text-green-800' },
    { value: 'entregue', label: 'Entregue', color: 'bg-emerald-100 text-emerald-800' },
    { value: 'cancelado', label: 'Cancelado', color: 'bg-red-100 text-red-800' }
  ];

  const responsibles = ['João', 'Ana', 'Carlos', 'Maria', 'Pedro'];

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus }
        : order
    ));
    setShowStatusModal(false);
    setSelectedOrder(null);
  };

  const assignResponsible = (orderId: string, responsible: string) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, responsible }
        : order
    ));
    setShowResponsibleModal(false);
    setSelectedOrder(null);
  };

  const getStatusColor = (status: Order['status']) => {
    const statusOption = statusOptions.find(opt => opt.value === status);
    return statusOption?.color || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen p-4">
      <div className="container mx-auto py-8">
        <h1 className="umbanda-title text-3xl mb-8">
          📦 Gerenciar Pedidos
        </h1>

        {/* Estatísticas */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="umbanda-card p-6 text-center">
            <div className="text-3xl mb-2">📋</div>
            <div className="text-2xl font-bold text-ogum-blue">
              {orders.length}
            </div>
            <div className="text-gray-600">Total de Pedidos</div>
          </div>
          
          <div className="umbanda-card p-6 text-center">
            <div className="text-3xl mb-2">⏳</div>
            <div className="text-2xl font-bold text-yellow-600">
              {orders.filter(o => o.status === 'aguardando produção').length}
            </div>
            <div className="text-gray-600">Aguardando</div>
          </div>
          
          <div className="umbanda-card p-6 text-center">
            <div className="text-3xl mb-2">⚡</div>
            <div className="text-2xl font-bold text-blue-600">
              {orders.filter(o => o.status === 'em produção').length}
            </div>
            <div className="text-gray-600">Em Produção</div>
          </div>
          
          <div className="umbanda-card p-6 text-center">
            <div className="text-3xl mb-2">✅</div>
            <div className="text-2xl font-bold text-green-600">
              {orders.filter(o => o.status === 'entregue').length}
            </div>
            <div className="text-gray-600">Entregues</div>
          </div>
        </div>

        {/* Lista de Pedidos */}
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="umbanda-card p-6">
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <h3 className="umbanda-subtitle text-xl">
                      Pedido #{order.id}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {statusOptions.find(opt => opt.value === order.status)?.label}
                    </span>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="font-semibold text-gray-900">Cliente:</p>
                      <p className="text-gray-600">{order.customerName}</p>
                      <p className="text-gray-600">{order.customerEmail}</p>
                    </div>
                    
                    <div>
                      <p className="font-semibold text-gray-900">Endereço:</p>
                      <p className="text-gray-600">{order.deliveryAddress}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="font-semibold text-gray-900 mb-2">Itens:</p>
                    <div className="space-y-1">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>{item.productName} x {item.quantity}</span>
                          <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
                      <span>Total:</span>
                      <span className="text-ogum-blue">R$ {order.total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    <p>Data: {order.createdAt}</p>
                    {order.responsible && <p>Responsável: {order.responsible}</p>}
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 lg:min-w-[200px]">
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowStatusModal(true);
                    }}
                    className="umbanda-button text-sm py-2 px-4"
                  >
                    📝 Atualizar Status
                  </button>
                  
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowResponsibleModal(true);
                    }}
                    className="bg-iansa-yellow text-ogum-blue font-semibold py-2 px-4 rounded-full hover:bg-yellow-200 transition-colors text-sm"
                  >
                    👤 Atribuir Responsável
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal de Status */}
        {showStatusModal && selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="umbanda-card p-8 max-w-md w-full">
              <h3 className="umbanda-subtitle mb-6">Atualizar Status do Pedido</h3>
              
              <div className="space-y-3">
                {statusOptions.map((status) => (
                  <button
                    key={status.value}
                    onClick={() => updateOrderStatus(selectedOrder.id, status.value as Order['status'])}
                    className={`w-full p-3 rounded-lg border-2 transition-colors ${
                      selectedOrder.status === status.value
                        ? 'border-ogum-blue bg-ogum-blue-light'
                        : 'border-gray-200 hover:border-ogum-blue'
                    }`}
                  >
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${status.color}`}>
                      {status.label}
                    </span>
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => {
                  setShowStatusModal(false);
                  setSelectedOrder(null);
                }}
                className="w-full mt-6 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Modal de Responsável */}
        {showResponsibleModal && selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="umbanda-card p-8 max-w-md w-full">
              <h3 className="umbanda-subtitle mb-6">Atribuir Responsável</h3>
              
              <div className="space-y-3">
                {responsibles.map((responsible) => (
                  <button
                    key={responsible}
                    onClick={() => assignResponsible(selectedOrder.id, responsible)}
                    className={`w-full p-3 rounded-lg border-2 transition-colors ${
                      selectedOrder.responsible === responsible
                        ? 'border-ogum-blue bg-ogum-blue-light'
                        : 'border-gray-200 hover:border-ogum-blue'
                    }`}
                  >
                    👤 {responsible}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => {
                  setShowResponsibleModal(false);
                  setSelectedOrder(null);
                }}
                className="w-full mt-6 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminOrdersPage;
