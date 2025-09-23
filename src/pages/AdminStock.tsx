import React, { useState } from 'react';
import { StockItem, StockMovement, StockAlert, StockReport } from '../types/stock';
import StockMovementModal from '../components/Stock/StockMovementModal';
import StockAdjustmentModal from '../components/Stock/StockAdjustmentModal';

function AdminStockPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'items' | 'movements' | 'alerts'>('overview');
  const [selectedProduct, setSelectedProduct] = useState<StockItem | null>(null);
  const [showMovementModal, setShowMovementModal] = useState(false);
  const [showAdjustmentModal, setShowAdjustmentModal] = useState(false);

  // Dados simulados
  const [stockItems] = useState<StockItem[]>([
    {
      id: '1',
      productId: '1',
      productName: 'Vela Branca',
      currentStock: 45,
      minimumStock: 20,
      maximumStock: 100,
      unitCost: 3.50,
      totalValue: 157.50,
      lastUpdated: new Date('2024-01-15'),
      status: 'in_stock'
    },
    {
      id: '2',
      productId: '2',
      productName: 'Guia de Iansã',
      currentStock: 8,
      minimumStock: 15,
      maximumStock: 50,
      unitCost: 25.00,
      totalValue: 200.00,
      lastUpdated: new Date('2024-01-14'),
      status: 'low_stock'
    },
    {
      id: '3',
      productId: '3',
      productName: 'Brajá de Ogum',
      currentStock: 0,
      minimumStock: 10,
      maximumStock: 30,
      unitCost: 35.00,
      totalValue: 0,
      lastUpdated: new Date('2024-01-13'),
      status: 'out_of_stock'
    },
    {
      id: '4',
      productId: '4',
      productName: 'Defumador',
      currentStock: 120,
      minimumStock: 25,
      maximumStock: 80,
      unitCost: 8.00,
      totalValue: 960.00,
      lastUpdated: new Date('2024-01-12'),
      status: 'overstock'
    }
  ]);

  const [stockMovements] = useState<StockMovement[]>([
    {
      id: '1',
      productId: '1',
      productName: 'Vela Branca',
      type: 'out',
      quantity: -5,
      reason: 'Venda - Pedido #123',
      reference: 'ORD-123',
      userId: '1',
      userName: 'Sistema',
      date: new Date('2024-01-15T10:30:00'),
      notes: 'Venda realizada'
    },
    {
      id: '2',
      productId: '1',
      productName: 'Vela Branca',
      type: 'in',
      quantity: 50,
      reason: 'Compra de fornecedor',
      userId: '1',
      userName: 'Admin',
      date: new Date('2024-01-14T14:20:00'),
      notes: 'Lote #LOT-001'
    },
    {
      id: '3',
      productId: '2',
      productName: 'Guia de Iansã',
      type: 'out',
      quantity: -2,
      reason: 'Venda - Pedido #122',
      reference: 'ORD-122',
      userId: '1',
      userName: 'Sistema',
      date: new Date('2024-01-14T09:15:00')
    }
  ]);

  const [stockAlerts] = useState<StockAlert[]>([
    {
      id: '1',
      productId: '2',
      productName: 'Guia de Iansã',
      type: 'low_stock',
      currentStock: 8,
      threshold: 15,
      severity: 'medium',
      createdAt: new Date('2024-01-14T09:15:00'),
      acknowledged: false
    },
    {
      id: '2',
      productId: '3',
      productName: 'Brajá de Ogum',
      type: 'out_of_stock',
      currentStock: 0,
      threshold: 10,
      severity: 'critical',
      createdAt: new Date('2024-01-13T16:30:00'),
      acknowledged: false
    },
    {
      id: '3',
      productId: '4',
      productName: 'Defumador',
      type: 'overstock',
      currentStock: 120,
      threshold: 80,
      severity: 'low',
      createdAt: new Date('2024-01-12T11:45:00'),
      acknowledged: true,
      acknowledgedBy: 'Admin',
      acknowledgedAt: new Date('2024-01-12T12:00:00')
    }
  ]);

  const [stockReport] = useState<StockReport>({
    totalProducts: 4,
    totalValue: 1317.50,
    lowStockItems: 1,
    outOfStockItems: 1,
    overstockItems: 1,
    topMovingProducts: [
      { productId: '1', productName: 'Vela Branca', movements: 12, quantity: 45 },
      { productId: '2', productName: 'Guia de Iansã', movements: 8, quantity: 8 },
      { productId: '4', productName: 'Defumador', movements: 6, quantity: 120 }
    ],
    stockValueByCategory: [
      { category: 'Velas', value: 157.50, percentage: 12 },
      { category: 'Guias', value: 200.00, percentage: 15 },
      { category: 'Brajás', value: 0, percentage: 0 },
      { category: 'Defumadores', value: 960.00, percentage: 73 }
    ]
  });

  const getStatusColor = (status: StockItem['status']) => {
    switch (status) {
      case 'in_stock': return 'bg-green-100 text-green-800';
      case 'low_stock': return 'bg-yellow-100 text-yellow-800';
      case 'out_of_stock': return 'bg-red-100 text-red-800';
      case 'overstock': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: StockItem['status']) => {
    switch (status) {
      case 'in_stock': return 'Em Estoque';
      case 'low_stock': return 'Estoque Baixo';
      case 'out_of_stock': return 'Sem Estoque';
      case 'overstock': return 'Excesso';
      default: return 'Desconhecido';
    }
  };

  const getSeverityColor = (severity: StockAlert['severity']) => {
    switch (severity) {
      case 'low': return 'bg-blue-100 text-blue-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMovementIcon = (type: StockMovement['type']) => {
    switch (type) {
      case 'in': return '📥';
      case 'out': return '📤';
      case 'adjustment': return '🔧';
      case 'transfer': return '🔄';
      default: return '📦';
    }
  };

  const getMovementColor = (type: StockMovement['type']) => {
    switch (type) {
      case 'in': return 'text-green-600';
      case 'out': return 'text-red-600';
      case 'adjustment': return 'text-blue-600';
      case 'transfer': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="container mx-auto py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="umbanda-title text-3xl mb-4 md:mb-0">
            📦 Controle de Estoque
          </h1>
          
          <div className="flex gap-2">
            <button
              onClick={() => setShowMovementModal(true)}
              className="umbanda-button text-sm py-2 px-4"
            >
              📥 Nova Movimentação
            </button>
            <button
              onClick={() => setShowAdjustmentModal(true)}
              className="umbanda-button-secondary text-sm py-2 px-4"
            >
              🔧 Ajuste de Estoque
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg">
          {[
            { id: 'overview', label: '📊 Visão Geral', icon: '📊' },
            { id: 'items', label: '📦 Itens', icon: '📦' },
            { id: 'movements', label: '📈 Movimentações', icon: '📈' },
            { id: 'alerts', label: '⚠️ Alertas', icon: '⚠️' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-ogum-blue shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Conteúdo das Tabs */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Métricas Principais */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="umbanda-card p-6 text-center">
                <div className="text-3xl mb-2">📦</div>
                <div className="text-2xl font-bold text-ogum-blue">
                  {stockReport.totalProducts}
                </div>
                <div className="text-gray-600">Total de Produtos</div>
              </div>
              
              <div className="umbanda-card p-6 text-center">
                <div className="text-3xl mb-2">💰</div>
                <div className="text-2xl font-bold text-green-600">
                  R$ {stockReport.totalValue.toFixed(2)}
                </div>
                <div className="text-gray-600">Valor Total</div>
              </div>
              
              <div className="umbanda-card p-6 text-center">
                <div className="text-3xl mb-2">⚠️</div>
                <div className="text-2xl font-bold text-yellow-600">
                  {stockReport.lowStockItems}
                </div>
                <div className="text-gray-600">Estoque Baixo</div>
              </div>
              
              <div className="umbanda-card p-6 text-center">
                <div className="text-3xl mb-2">❌</div>
                <div className="text-2xl font-bold text-red-600">
                  {stockReport.outOfStockItems}
                </div>
                <div className="text-gray-600">Sem Estoque</div>
              </div>
            </div>

            {/* Produtos Mais Movimentados */}
            <div className="umbanda-card p-6">
              <h3 className="umbanda-subtitle mb-4">🔥 Produtos Mais Movimentados</h3>
              <div className="space-y-4">
                {stockReport.topMovingProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-ogum-blue text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{product.productName}</p>
                        <p className="text-sm text-gray-600">{product.movements} movimentações</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-ogum-blue">{product.quantity} unidades</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Valor por Categoria */}
            <div className="umbanda-card p-6">
              <h3 className="umbanda-subtitle mb-4">📊 Valor por Categoria</h3>
              <div className="space-y-3">
                {stockReport.stockValueByCategory.map((category, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{category.category}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-ogum-blue h-2 rounded-full transition-all duration-300"
                          style={{ width: `${category.percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-ogum-blue w-20 text-right">
                        R$ {category.value.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'items' && (
          <div className="umbanda-card p-6">
            <h3 className="umbanda-subtitle mb-6">📦 Itens em Estoque</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Produto</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Estoque Atual</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Mínimo</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Máximo</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Valor Unit.</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Valor Total</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {stockItems.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-semibold text-gray-900">{item.productName}</p>
                          <p className="text-sm text-gray-600">ID: {item.productId}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-lg">{item.currentStock}</span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{item.minimumStock}</td>
                      <td className="py-3 px-4 text-gray-600">{item.maximumStock}</td>
                      <td className="py-3 px-4 text-gray-600">R$ {item.unitCost.toFixed(2)}</td>
                      <td className="py-3 px-4 font-semibold text-ogum-blue">
                        R$ {item.totalValue.toFixed(2)}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                          {getStatusText(item.status)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setSelectedProduct(item);
                              setShowMovementModal(true);
                            }}
                            className="text-ogum-blue hover:text-ogum-blue-light text-sm"
                          >
                            📥 Entrada
                          </button>
                          <button
                            onClick={() => {
                              setSelectedProduct(item);
                              setShowAdjustmentModal(true);
                            }}
                            className="text-ogum-red hover:text-red-600 text-sm"
                          >
                            🔧 Ajustar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'movements' && (
          <div className="umbanda-card p-6">
            <h3 className="umbanda-subtitle mb-6">📈 Histórico de Movimentações</h3>
            
            <div className="space-y-4">
              {stockMovements.map((movement) => (
                <div key={movement.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">{getMovementIcon(movement.type)}</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{movement.productName}</h4>
                      <p className="text-sm text-gray-600">{movement.reason}</p>
                      {movement.reference && (
                        <p className="text-xs text-gray-500">Ref: {movement.reference}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`font-bold text-lg ${getMovementColor(movement.type)}`}>
                      {movement.quantity > 0 ? '+' : ''}{movement.quantity}
                    </div>
                    <div className="text-sm text-gray-600">
                      {movement.userName}
                    </div>
                    <div className="text-xs text-gray-500">
                      {movement.date.toLocaleDateString('pt-BR')} {movement.date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'alerts' && (
          <div className="space-y-6">
            {/* Alertas Críticos */}
            <div className="umbanda-card p-6">
              <h3 className="umbanda-subtitle mb-4">🚨 Alertas de Estoque</h3>
              
              <div className="space-y-4">
                {stockAlerts.map((alert) => (
                  <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${
                    alert.severity === 'critical' ? 'border-red-500 bg-red-50' :
                    alert.severity === 'high' ? 'border-orange-500 bg-orange-50' :
                    alert.severity === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                    'border-blue-500 bg-blue-50'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">
                          {alert.type === 'low_stock' ? '⚠️' :
                           alert.type === 'out_of_stock' ? '❌' :
                           alert.type === 'overstock' ? '📈' : '🔔'}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{alert.productName}</h4>
                          <p className="text-sm text-gray-600">
                            {alert.type === 'low_stock' ? 'Estoque abaixo do mínimo' :
                             alert.type === 'out_of_stock' ? 'Produto sem estoque' :
                             alert.type === 'overstock' ? 'Estoque acima do máximo' : 'Alerta de estoque'}
                          </p>
                          <p className="text-sm text-gray-600">
                            Estoque atual: {alert.currentStock} | Limite: {alert.threshold}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                          {alert.severity === 'critical' ? 'Crítico' :
                           alert.severity === 'high' ? 'Alto' :
                           alert.severity === 'medium' ? 'Médio' : 'Baixo'}
                        </span>
                        
                        {!alert.acknowledged ? (
                          <button className="umbanda-button text-sm py-1 px-3">
                            ✅ Reconhecer
                          </button>
                        ) : (
                          <span className="text-sm text-green-600">
                            ✅ Reconhecido por {alert.acknowledgedBy}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Modais */}
        <StockMovementModal
          isOpen={showMovementModal}
          onClose={() => {
            setShowMovementModal(false);
            setSelectedProduct(null);
          }}
          product={selectedProduct}
          onConfirm={(movement) => {
            console.log('Nova movimentação:', movement);
            // Aqui você implementaria a lógica para salvar a movimentação
          }}
        />

        <StockAdjustmentModal
          isOpen={showAdjustmentModal}
          onClose={() => {
            setShowAdjustmentModal(false);
            setSelectedProduct(null);
          }}
          product={selectedProduct}
          onConfirm={(adjustment) => {
            console.log('Ajuste de estoque:', adjustment);
            // Aqui você implementaria a lógica para salvar o ajuste
          }}
        />
      </div>
    </div>
  );
}

export default AdminStockPage;
