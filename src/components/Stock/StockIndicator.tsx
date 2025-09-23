import React from 'react';

interface StockIndicatorProps {
  currentStock: number;
  minimumStock: number;
  maximumStock?: number;
  showDetails?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const StockIndicator: React.FC<StockIndicatorProps> = ({
  currentStock,
  minimumStock,
  maximumStock,
  showDetails = false,
  size = 'md'
}) => {
  const getStockStatus = () => {
    if (currentStock === 0) return 'out_of_stock';
    if (currentStock <= minimumStock) return 'low_stock';
    if (maximumStock && currentStock > maximumStock) return 'overstock';
    return 'in_stock';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_stock': return 'text-green-600';
      case 'low_stock': return 'text-yellow-600';
      case 'out_of_stock': return 'text-red-600';
      case 'overstock': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in_stock': return '✅';
      case 'low_stock': return '⚠️';
      case 'out_of_stock': return '❌';
      case 'overstock': return '📈';
      default: return '📦';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in_stock': return 'Em Estoque';
      case 'low_stock': return 'Estoque Baixo';
      case 'out_of_stock': return 'Sem Estoque';
      case 'overstock': return 'Excesso';
      default: return 'Desconhecido';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'text-xs';
      case 'lg': return 'text-lg';
      default: return 'text-sm';
    }
  };

  const status = getStockStatus();

  return (
    <div className={`flex items-center space-x-2 ${getSizeClasses()}`}>
      <span className="text-lg">{getStatusIcon(status)}</span>
      
      <div className="flex flex-col">
        <span className={`font-semibold ${getStatusColor(status)}`}>
          {currentStock} unidades
        </span>
        
        {showDetails && (
          <div className="text-gray-500 text-xs">
            {getStatusText(status)}
            {status === 'low_stock' && (
              <span className="ml-1">(mín: {minimumStock})</span>
            )}
            {status === 'overstock' && maximumStock && (
              <span className="ml-1">(máx: {maximumStock})</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StockIndicator;
