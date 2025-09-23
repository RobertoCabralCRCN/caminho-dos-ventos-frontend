import React, { useState } from "react";
import LineChart from "../components/Charts/LineChart";
import PieChart from "../components/Charts/PieChart";

function AdminDashboardPage() {
  const [timeRange, setTimeRange] = useState('7d');

  // Dados simulados para demonstração
  const salesData = [
    { label: 'Jan', value: 1200 },
    { label: 'Fev', value: 1500 },
    { label: 'Mar', value: 1800 },
    { label: 'Abr', value: 1600 },
    { label: 'Mai', value: 2200 },
    { label: 'Jun', value: 2500 },
  ];

  const categoryData = [
    { label: 'Velas', value: 45, color: '#FFD700' },
    { label: 'Guias', value: 30, color: '#FF6B6B' },
    { label: 'Brajás', value: 15, color: '#4ECDC4' },
    { label: 'Defumadores', value: 10, color: '#45B7D1' },
  ];

  const orderStatusData = [
    { label: 'Aguardando', value: 8, color: '#F39C12' },
    { label: 'Em Produção', value: 12, color: '#3498DB' },
    { label: 'Pronto', value: 5, color: '#2ECC71' },
    { label: 'Entregue', value: 25, color: '#27AE60' },
  ];

  const metrics = [
    { title: 'Vendas Hoje', value: 'R$ 1.250', change: '+12%', color: 'text-green-600' },
    { title: 'Pedidos Ativos', value: '25', change: '+5%', color: 'text-blue-600' },
    { title: 'Clientes Novos', value: '8', change: '+20%', color: 'text-purple-600' },
    { title: 'Produtos Vendidos', value: '156', change: '+8%', color: 'text-orange-600' },
  ];

  return (
    <div className="min-h-screen p-4">
      <div className="container mx-auto py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="umbanda-title text-3xl mb-4 md:mb-0">
            📊 Dashboard Administrativo
          </h1>
          
          <div className="flex gap-2">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ogum-blue focus:border-transparent"
            >
              <option value="7d">Últimos 7 dias</option>
              <option value="30d">Últimos 30 dias</option>
              <option value="90d">Últimos 90 dias</option>
              <option value="1y">Último ano</option>
            </select>
            
            <button className="umbanda-button text-sm py-2 px-4">
              📄 Exportar Relatório
                      </button>
              </div>
          </div>

        {/* Métricas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div key={index} className="umbanda-card p-6">
              <div className="flex items-center justify-between">
          <div>
                  <p className="text-gray-600 text-sm">{metric.title}</p>
                  <p className="text-2xl font-bold text-ogum-blue mt-1">
                    {metric.value}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-semibold ${metric.color}`}>
                    {metric.change}
                        </span>
                  <div className="text-gray-400 text-xs">vs período anterior</div>
                </div>
              </div>
                      </div>
          ))}
                      </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <LineChart
            data={salesData}
            title="📈 Vendas por Mês"
            color="#2563EB"
          />
          
          <PieChart
            data={categoryData}
            title="🛍️ Vendas por Categoria"
                          />
                        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <PieChart
            data={orderStatusData}
            title="📦 Status dos Pedidos"
          />
          
          <div className="umbanda-card p-6">
            <h3 className="umbanda-subtitle mb-4">🔥 Produtos Mais Vendidos</h3>
            <div className="space-y-4">
              {[
                { name: 'Vela Branca', sales: 45, revenue: 'R$ 225' },
                { name: 'Guia de Iansã', sales: 32, revenue: 'R$ 1.120' },
                { name: 'Brajá de Ogum', sales: 28, revenue: 'R$ 1.120' },
                { name: 'Defumador', sales: 25, revenue: 'R$ 312' },
                { name: 'Vela Azul', sales: 22, revenue: 'R$ 110' },
              ].map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-ogum-blue text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.sales} vendas</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-ogum-blue">{product.revenue}</p>
                  </div>
                </div>
              ))}
                      </div>
                    </div>
              </div>

        {/* Ações Rápidas */}
        <div className="umbanda-card p-6">
          <h3 className="umbanda-subtitle mb-4">⚡ Ações Rápidas</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="umbanda-button p-4 text-center">
              <div className="text-2xl mb-2">➕</div>
              <div>Adicionar Produto</div>
            </button>
            <button className="umbanda-button-secondary p-4 text-center">
              <div className="text-2xl mb-2">📦</div>
              <div>Ver Pedidos</div>
            </button>
            <button className="bg-iansa-yellow text-ogum-blue font-semibold p-4 rounded-full text-center hover:bg-yellow-200 transition-colors">
              <div className="text-2xl mb-2">📊</div>
              <div>Relatórios</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardPage;