import React, { useState } from 'react';
import { StockItem } from '../../types/stock';

interface StockAdjustmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: StockItem | null;
  onConfirm: (adjustment: StockAdjustmentData) => void;
}

interface StockAdjustmentData {
  productId: string;
  currentStock: number;
  newStock: number;
  reason: string;
  notes?: string;
}

const StockAdjustmentModal: React.FC<StockAdjustmentModalProps> = ({
  isOpen,
  onClose,
  product,
  onConfirm
}) => {
  const [formData, setFormData] = useState<StockAdjustmentData>({
    productId: product?.productId || '',
    currentStock: product?.currentStock || 0,
    newStock: product?.currentStock || 0,
    reason: '',
    notes: ''
  });

  const adjustmentReasons = [
    'Inventário físico',
    'Correção de erro',
    'Produto danificado',
    'Furto/Roubo',
    'Vencimento',
    'Doação',
    'Transferência',
    'Outros'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newStock < 0 || !formData.reason.trim()) return;
    
    onConfirm(formData);
    onClose();
  };

  const handleNewStockChange = (value: number) => {
    setFormData({ ...formData, newStock: Math.max(0, value) });
  };

  const getDifference = () => {
    return formData.newStock - formData.currentStock;
  };

  const getDifferenceColor = () => {
    const diff = getDifference();
    if (diff > 0) return 'text-green-600';
    if (diff < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="umbanda-card p-8 max-w-lg w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="umbanda-subtitle">
            🔧 {product ? `Ajuste - ${product.productName}` : 'Ajuste de Estoque'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Produto (se não foi selecionado) */}
          {!product && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Produto
              </label>
              <select
                value={formData.productId}
                onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ogum-blue focus:border-transparent"
                required
              >
                <option value="">Selecione um produto</option>
                <option value="1">Vela Branca</option>
                <option value="2">Guia de Iansã</option>
                <option value="3">Brajá de Ogum</option>
                <option value="4">Defumador</option>
              </select>
            </div>
          )}

          {/* Estoque Atual */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Estoque Atual</h4>
            <div className="text-2xl font-bold text-ogum-blue">
              {formData.currentStock} unidades
            </div>
            {product && (
              <div className="text-sm text-gray-600 mt-1">
                Mínimo: {product.minimumStock} | Máximo: {product.maximumStock}
              </div>
            )}
          </div>

          {/* Novo Estoque */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Novo Estoque
            </label>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => handleNewStockChange(formData.newStock - 1)}
                className="w-10 h-10 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-colors"
              >
                -
              </button>
              <input
                type="number"
                min="0"
                value={formData.newStock}
                onChange={(e) => handleNewStockChange(parseInt(e.target.value) || 0)}
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ogum-blue focus:border-transparent text-center text-lg font-semibold"
                required
              />
              <button
                type="button"
                onClick={() => handleNewStockChange(formData.newStock + 1)}
                className="w-10 h-10 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Diferença */}
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Diferença</h4>
            <div className={`text-2xl font-bold ${getDifferenceColor()}`}>
              {getDifference() > 0 ? '+' : ''}{getDifference()} unidades
            </div>
            <div className="text-sm text-gray-600 mt-1">
              {getDifference() > 0 ? 'Aumento no estoque' : 
               getDifference() < 0 ? 'Redução no estoque' : 'Sem alteração'}
            </div>
          </div>

          {/* Motivo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Motivo do Ajuste
            </label>
            <select
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ogum-blue focus:border-transparent"
              required
            >
              <option value="">Selecione um motivo</option>
              {adjustmentReasons.map((reason) => (
                <option key={reason} value={reason}>{reason}</option>
              ))}
            </select>
          </div>

          {/* Observações */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Observações (Opcional)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Detalhes sobre o ajuste realizado..."
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ogum-blue focus:border-transparent"
            />
          </div>

          {/* Alertas */}
          {product && (
            <div className="space-y-2">
              {formData.newStock <= product.minimumStock && formData.newStock > 0 && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-yellow-600 mr-2">⚠️</span>
                    <span className="text-sm text-yellow-800">
                      Estoque ficará abaixo do mínimo ({product.minimumStock})
                    </span>
                  </div>
                </div>
              )}
              
              {formData.newStock === 0 && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-red-600 mr-2">❌</span>
                    <span className="text-sm text-red-800">
                      Produto ficará sem estoque
                    </span>
                  </div>
                </div>
              )}
              
              {formData.newStock > product.maximumStock && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-blue-600 mr-2">📈</span>
                    <span className="text-sm text-blue-800">
                      Estoque ficará acima do máximo ({product.maximumStock})
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Botões */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-500 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={formData.newStock < 0 || !formData.reason.trim()}
              className="flex-1 umbanda-button disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🔧 Confirmar Ajuste
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StockAdjustmentModal;
