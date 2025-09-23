import React, { useState } from 'react';
import { StockItem } from '../../types/stock';

interface StockMovementModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: StockItem | null;
  onConfirm: (movement: StockMovementData) => void;
}

interface StockMovementData {
  productId: string;
  type: 'in' | 'out' | 'adjustment' | 'transfer';
  quantity: number;
  reason: string;
  reference?: string;
  notes?: string;
  unitCost?: number;
}

const StockMovementModal: React.FC<StockMovementModalProps> = ({
  isOpen,
  onClose,
  product,
  onConfirm
}) => {
  const [formData, setFormData] = useState<StockMovementData>({
    productId: product?.productId || '',
    type: 'in',
    quantity: 0,
    reason: '',
    reference: '',
    notes: '',
    unitCost: product?.unitCost || 0
  });

  const movementTypes = [
    { id: 'in', label: 'Entrada', icon: '📥', description: 'Adicionar produtos ao estoque' },
    { id: 'out', label: 'Saída', icon: '📤', description: 'Remover produtos do estoque' },
    { id: 'adjustment', label: 'Ajuste', icon: '🔧', description: 'Correção de inventário' },
    { id: 'transfer', label: 'Transferência', icon: '🔄', description: 'Movimentação entre locais' }
  ];

  const commonReasons = [
    'Compra de fornecedor',
    'Venda',
    'Devolução de cliente',
    'Ajuste de inventário',
    'Transferência entre lojas',
    'Perda/Dano',
    'Doação',
    'Promoção/Evento'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.quantity <= 0 || !formData.reason.trim()) return;
    
    onConfirm(formData);
    onClose();
  };

  const handleTypeChange = (type: StockMovementData['type']) => {
    setFormData({ ...formData, type });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="umbanda-card p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="umbanda-subtitle">
            📦 {product ? `Movimentação - ${product.productName}` : 'Nova Movimentação'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tipo de Movimentação */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Tipo de Movimentação
            </label>
            <div className="grid grid-cols-2 gap-3">
              {movementTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => handleTypeChange(type.id as any)}
                  className={`p-4 border-2 rounded-lg text-left transition-colors ${
                    formData.type === type.id
                      ? 'border-ogum-blue bg-ogum-blue-light'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-2">{type.icon}</span>
                    <span className="font-semibold">{type.label}</span>
                  </div>
                  <p className="text-sm text-gray-600">{type.description}</p>
                </button>
              ))}
            </div>
          </div>

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

          {/* Quantidade */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantidade
            </label>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, quantity: Math.max(0, formData.quantity - 1) })}
                className="w-10 h-10 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-colors"
              >
                -
              </button>
              <input
                type="number"
                min="0"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ogum-blue focus:border-transparent text-center text-lg font-semibold"
                required
              />
              <button
                type="button"
                onClick={() => setFormData({ ...formData, quantity: formData.quantity + 1 })}
                className="w-10 h-10 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Motivo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Motivo
            </label>
            <select
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ogum-blue focus:border-transparent"
              required
            >
              <option value="">Selecione um motivo</option>
              {commonReasons.map((reason) => (
                <option key={reason} value={reason}>{reason}</option>
              ))}
            </select>
          </div>

          {/* Referência */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Referência (Opcional)
            </label>
            <input
              type="text"
              value={formData.reference}
              onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
              placeholder="Ex: Pedido #123, Lote #LOT-001, etc."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ogum-blue focus:border-transparent"
            />
          </div>

          {/* Custo Unitário (apenas para entradas) */}
          {formData.type === 'in' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Custo Unitário (R$)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.unitCost}
                onChange={(e) => setFormData({ ...formData, unitCost: parseFloat(e.target.value) || 0 })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ogum-blue focus:border-transparent"
              />
            </div>
          )}

          {/* Observações */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Observações (Opcional)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Informações adicionais sobre a movimentação..."
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ogum-blue focus:border-transparent"
            />
          </div>

          {/* Resumo */}
          {formData.quantity > 0 && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Resumo da Movimentação</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Produto:</span>
                  <span className="font-semibold">{product?.productName || 'Selecionar produto'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tipo:</span>
                  <span className="font-semibold">
                    {movementTypes.find(t => t.id === formData.type)?.label}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Quantidade:</span>
                  <span className={`font-semibold ${
                    formData.type === 'in' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {formData.type === 'in' ? '+' : '-'}{formData.quantity}
                  </span>
                </div>
                {formData.type === 'in' && formData.unitCost && formData.unitCost > 0 && (
                  <div className="flex justify-between">
                    <span>Valor Total:</span>
                    <span className="font-semibold text-ogum-blue">
                      R$ {(formData.quantity * formData.unitCost).toFixed(2)}
                    </span>
                  </div>
                )}
              </div>
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
              disabled={formData.quantity <= 0 || !formData.reason.trim()}
              className="flex-1 umbanda-button disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ✅ Confirmar Movimentação
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StockMovementModal;
